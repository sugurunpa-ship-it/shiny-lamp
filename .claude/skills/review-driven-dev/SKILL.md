---
name: review-driven-dev
description: 実装前にタスクごとのレビュー観点を洗い出し、セキュリティ・パフォーマンス・可読性の3観点でレビューしながら実装を進めるスキル。「コードレビューしながら実装して」「観点を洗い出してから実装して」「レビュー駆動で進めて」「3観点でチェックしながら実装」「セキュリティ・パフォーマンス・可読性を重視して実装」「レビュー観点を整理してから」などと言ったときに使用してください。
---

# review-driven-dev — レビュー駆動実装スキル

実装とレビューを同時進行する2フェーズのワークフローです。
**チェックリスト先行 → 実装中にレビュー → 問題即修正** のサイクルで品質を担保します。

> このスキルは **2025年 Antigravity IDE ポートフォリオ開発** で体系化しました。
> HTML/CSS/TypeScript/GitHub Pages 構成のフロントエンドプロジェクトに特に有効です。

---

## 2フェーズの進め方

### フェーズ 1：観点の洗い出し（実装前）

タスクを細分化し、各タスクに対して3観点でチェック項目を列挙する。

> **ルール**：ユーザーが「洗い出しのみ」「項目を洗い出すだけ」と指定した場合は
> このフェーズで**必ず停止**し、実装には進まない。

### フェーズ 2：実装（レビューしながら）

フェーズ1のチェックリストを参照しながらコードを実装する。
問題を発見したら即修正し、修正内容をレポート表に記録する。
デプロイ前に `tsc --noEmit` で型チェックを実行する。

---

## 3観点の詳細チェックリスト

### 🔴 1. セキュリティ：入力値バリデーション・XSS対策・CSP

#### HTML / CSP
- [ ] `Content-Security-Policy` meta タグが設定されているか
- [ ] `style-src` に `'unsafe-inline'` を使っていないか
  → CSS を外部ファイル（`style.css`）に移行して除去する
- [ ] `script-src` に `'unsafe-inline'` を使っていないか
  → `<script type="module" src="...">` に移行して除去する
- [ ] インライン `style=` 属性が存在しないか → CSS クラスに置き換える
- [ ] インライン JS イベントハンドラー（`onclick`, `onload` 等）がないか
  - NG 例: `<link onload="this.rel='stylesheet'">` (Google Fonts の非同期ハック)
  - OK 例: `<link rel="stylesheet" href="...">` で直接読み込む
- [ ] `target="_blank"` リンクに `rel="noopener noreferrer"` があるか
- [ ] `<a href>` に `javascript:` URL がないか

#### JavaScript / TypeScript
- [ ] `innerHTML` への直接代入をしていないか（`textContent` / DOM API を使う）
- [ ] ユーザー由来の値（`data-*` 属性・URL パラメータ・フォーム入力）を
  型ガード関数で検証しているか
  ```typescript
  // ✅ 推奨パターン：型ガードで許可リスト検証
  function isFilterCategory(value: unknown): value is FilterCategory {
    return typeof value === 'string' &&
      (['all', 'game', 'tool', 'content'] as const).includes(value as FilterCategory)
  }
  ```
- [ ] DOM 取得で null を無視していないか
  ```typescript
  // ✅ 推奨パターン：見つからない場合は Error をスロー
  function requireElement<T extends HTMLElement>(selector: string): T {
    const el = document.querySelector<T>(selector)
    if (!el) throw new Error(`[dom] Element not found: "${selector}"`)
    return el
  }
  ```
- [ ] `eval()` / `new Function()` を使っていないか

---

### 🟡 2. パフォーマンス：画像遅延読み込み・バンドルサイズ

#### 画像
- [ ] ファーストビューより下の画像に `loading="lazy"` があるか
- [ ] ファーストビュー内（LCP 候補）の画像に `fetchpriority="high"` を付けているか
- [ ] `<img>` に `width` / `height` 属性があり CLS（レイアウトシフト）を防止しているか
- [ ] WebP / AVIF フォーマットの利用を検討したか（PNG/JPG より 30〜70% 小さい）

#### フォント・外部リソース
- [ ] `<link rel="preconnect">` で外部ドメインを事前接続しているか
- [ ] Google Fonts を `display=swap` 付きで読み込んでいるか
- [ ] `onload` ハックではなく `<link rel="stylesheet">` で直接読み込んでいるか
  （`onload` ハックは `script-src` 制限下でフォントが未適用になる場合がある）

#### JavaScript / バンドルサイズ
- [ ] `tsc` の個別モジュール出力（N HTTP リクエスト）になっていないか
  → Vite / esbuild でバンドル化して 1 リクエストに削減する
  ```
  Before: main.js + navigation.js + filter.js + reveal.js + portfolio.js = 5 req
  After:  main.js（バンドル済み、minified）                              = 1 req
  ```
- [ ] 型定義のみのファイル（コンパイル後 `export {}` になる）が
  ブラウザへリクエストとして飛んでいないか（tree-shaking で除去する）
- [ ] `scroll` / `resize` / `wheel` リスナーに `{ passive: true }` が付いているか
- [ ] `IntersectionObserver` で `unobserve()` を呼んでメモリリークを防いでいるか
- [ ] イベントリスナーのクリーンアップ関数（`removeEventListener`）を返しているか
  ```typescript
  // ✅ クリーンアップ関数を返すパターン
  export function initNavigation(): () => void {
    const handle = () => { /* ... */ }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }
  ```

#### CSS
- [ ] CSS が外部ファイルになっていてブラウザキャッシュを活用できるか
- [ ] `prefers-reduced-motion: reduce` でアニメーションを無効化しているか

---

### 🟢 3. 可読性：TypeScript 型定義・関数の単一責任

#### HTML の意味論・アクセシビリティ
- [ ] `<main>` で主コンテンツをラップしているか（スクリーンリーダーのランドマーク）
- [ ] スキップリンクがあるか（キーボードユーザー向け）
  ```html
  <!-- body の先頭に配置 -->
  <a class="skip-link" href="#main-content">コンテンツへスキップ</a>
  ```
- [ ] トグルボタンに `aria-pressed="true/false"` があり、支援技術に選択状態を伝えているか
  ```html
  <button aria-pressed="true" data-f="all">All</button>
  ```
  ```typescript
  // JS 側でも同期させる
  btn.setAttribute('aria-pressed', isActive ? 'true' : 'false')
  ```
- [ ] 装飾要素に `aria-hidden="true"` があるか
- [ ] `<img>` に意味のある `alt` テキストがあるか（装飾のみなら `alt=""`）
- [ ] ファビコン `<link rel="icon">` が設定されているか
- [ ] OGP タグ（og:title / og:description / og:image / **og:image:alt**）が設定されているか

#### TypeScript の型設計
- [ ] マジックストリングを Union 型に定義しているか
  ```typescript
  // ❌ 避ける: 文字列リテラルが散在
  if (category === 'cont') { ... }

  // ✅ 推奨: Union 型で一元管理・略語より完全な単語
  type FilterCategory = 'all' | 'game' | 'tool' | 'content'
  ```
- [ ] 設定値（数値・文字列定数）を型付きオブジェクトで管理しているか
  ```typescript
  // ✅ マジックナンバーをなくす
  const NAV_CONFIG: NavScrollConfig = {
    scrollThreshold: 80,
    activeOffset: 120,
  }
  ```
- [ ] `strictNullChecks: true` で型エラーが出ていないか（`tsc --noEmit` で確認）
- [ ] `as HTMLElement` の強制キャストを最小化しているか

#### モジュール設計（単一責任原則 / SRP）
- [ ] 1ファイル・1関数が1つの責務しか持っていないか

  | モジュール | 責務 |
  |-----------|------|
  | `navigation.ts` | スクロール背景・アクティブリンク管理 |
  | `filter.ts` | カテゴリフィルター（XSS対策付き） |
  | `reveal.ts` | スクロールフェードイン（IntersectionObserver）|
  | `utils/dom.ts` | 汎用 DOM ユーティリティ |
  | `types/portfolio.ts` | 型定義のみ |

- [ ] 複数モジュールで使う汎用ユーティリティ（`requireElement` 等）が
  `utils/` に分離されているか（機能モジュールに混在させない）
- [ ] 型定義と実装が分離されているか（`types/*.ts` に集約）

---

## 出力フォーマット

### フェーズ 1：観点の洗い出し時

```markdown
## タスク別 レビュー観点

### タスク 1｜タスク名

| # | 観点 | チェック項目 |
|---|------|------------|
| 1-1 | 🔴 セキュリティ | CSP meta タグが設定されているか |
| 1-2 | 🟡 パフォーマンス | loading="lazy" が設定されているか |
| 1-3 | 🟢 可読性 | 型ガードで data-* 属性を検証しているか |
```

### フェーズ 2：実装後レポート

```markdown
## コードレビュー → 修正 レポート

| # | 優先度 | 問題 | 対応 | ファイル |
|---|--------|------|------|---------|
| 1 | 🔴 | style-src に 'unsafe-inline' | CSS を外部化・CSP を修正 | docs/index.html |
| 2 | 🟡 | IntersectionObserver に disconnect なし | クリーンアップ関数を追加 | src/modules/reveal.ts |
| 3 | 🟢 | 'cont' が略語で意味不明 | 'content' にリネーム | src/types/portfolio.ts |
```

---

## ルール

1. **フェーズ1で「洗い出しのみ」と指定されたら、実装には一切進まない**
2. 各チェック項目は検証し、問題なしの場合も「✅ 問題なし」と記録する（省略しない）
3. 修正は🔴→🟡→🟢の優先度順に行う（高優先度から潰す）
4. 1コミットに複数ファイルの修正をまとめてよいが、コミットメッセージは観点別に説明する
5. デプロイ前に必ず `tsc --noEmit` で型チェックを実行してエラーがないことを確認する
6. `git push` 後にデプロイ URL を提示する

---

## 参照プロジェクト

このスキルは以下のプロジェクトで実際に使用して体系化されました：

- **プロジェクト**: Antigravity IDE ポートフォリオサイト
- **リポジトリ**: https://github.com/sugurunpa-ship-it/shiny-lamp
- **公開URL**: https://sugurunpa-ship-it.github.io/shiny-lamp/
- **技術スタック**: HTML / CSS / TypeScript / Vite 8 / GitHub Pages
