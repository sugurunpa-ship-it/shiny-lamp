# デザイン仕様書 — ポートフォリオサイト

> 出典デザインYAML: `design-prompts/corporate-nature-minimal.yaml`
> コンセプト: 自然・信頼・誠実さを軸にしたコーポレートミニマル。有機的なグリーンアクセント + 清潔なホワイトベース。

---

## 1. 実績画像リスト（Worksカード用）

`docs/images/` にコピー済み。各画像の用途と推奨コピーは以下のとおり。

| # | ファイルパス | 推定内容 | Worksカード用途 | 推奨タイトル | 説明文 |
|---|------------|---------|----------------|------------|--------|
| 1 | `docs/images/image-1780011618012.png` | 落ち物パズルゲーム「ぷよぷよ」クローン（GAME OVER画面・NEXT/LEVEL/操作説明UI付き） | ゲーム開発の実績カード | ぷよぷよ風 落ち物パズルゲーム | HTML/JavaScript で実装した連鎖型パズルゲーム。スコア・レベル・NEXT表示、キーボード操作（移動・回転・落下・一気落とし）に対応したブラウザ完結のクライアントサイドゲーム。 |
| 2 | `docs/images/image-1780011671926.png` | Antigravity IDE（Claude Code ベース）の操作画面。README自己紹介生成・ターミナル・ファイルプレビューの3ペイン構成 | AI開発環境・ツール構築の実績カード | AI支援開発環境 Antigravity IDE | Claude Code をベースにカスタム Skills / SubAgents / Commands を組み込んだAI支援開発環境。チャットからのドキュメント自動生成やコード支援をワンストップで実現。 |
| 3 | `docs/images/article.png` | 不動産業界のテクノロジー進化に関するSEO記事本文（デジタル内見・AI査定・電子契約） | コンテンツ制作・ライティングの実績カード | SEO記事制作（不動産×テクノロジー） | 「不動産業界の進化が止まらない」をテーマにした構造化SEO記事。リード文・H2見出し・まとめで構成し、検索意図に沿った網羅的なコンテンツを生成。 |

---

## 2. CSS変数定義（`:root`）

```css
:root {
  /* ---------- Color: Base ---------- */
  --color-bg:            #ffffff;
  --color-bg-alt:        #f7f7f7;
  --color-text:          #000000;
  --color-text-muted:    #888888;

  /* ---------- Color: Accent ---------- */
  --color-accent:        #79b661;  /* 自然グリーン: CTA・リンク・強調 */
  --color-accent-hover:  #5a9e47;

  /* ---------- Color: Secondary ---------- */
  --color-blue:          #5ab8e4;
  --color-blue-hover:    #88c9e7;
  --color-yellow:        #eddf47;
  --color-orange-red:    #e45539;
  --color-orange-red-hover: #c83e26;
  --color-teal:          #58c190;

  /* ---------- Gradient ---------- */
  --gradient-hero: linear-gradient(131deg, rgb(245, 232, 90) 0%, rgb(121, 182, 97) 100%);

  /* ---------- Shadow ---------- */
  --shadow-subtle:    5px 8.66px 20px 0px rgba(0, 0, 0, 0.07);
  --shadow-medium:    7.5px 12.99px 30px 0px rgba(0, 0, 0, 0.20);
  --shadow-warm-glow: 5px 8.66px 120px 0px rgba(255, 182, 143, 0.25);

  /* ---------- Typography: Font Family ---------- */
  --font-heading: 'Jost', 'futura-pt', sans-serif;       /* 英文見出し代替 */
  --font-body:    'Noto Sans JP', "游ゴシック体", "Yu Gothic", YuGothic,
                  "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
                  "Meiryo", "メイリオ", sans-serif;
  --font-label:   'Jost', 'Boston', sans-serif;

  /* ---------- Typography: Scale (1rem = 10px) ---------- */
  --font-xs:   1.2rem;   /* 12px */
  --font-sm:   1.4rem;   /* 14px */
  --font-base: 1.6rem;   /* 16px */
  --font-md:   1.8rem;   /* 18px */
  --font-lg:   2.4rem;   /* 24px */
  --font-xl:   3.2rem;   /* 32px */
  --font-xxl:  4.8rem;   /* 48px */
  --font-hero: 7.2rem;   /* 72px */

  /* ---------- Typography: Weight / Spacing / Line-height ---------- */
  --weight-light:   300;
  --weight-regular: 400;
  --weight-medium:  500;
  --weight-bold:    700;

  --ls-japanese: 0.05em;
  --ls-latin:    0.00em;
  --ls-caps:     0.15em;

  --lh-tight:  1.0;
  --lh-normal: 1.5;
  --lh-body:   1.8;
  --lh-loose:  2.0;

  /* ---------- Spacing / Layout ---------- */
  --container-wide:    1200px;
  --container-content: 1120px;
  --container-text:    800px;
  --container-narrow:  720px;

  --section-padding-desktop: 100px 0;
  --section-padding-mobile:  8vw 0;
  --wrapper-padding-desktop: 0 60px;
  --wrapper-padding-mobile:  0 6.25vw;
  --grid-gap: 40px;

  /* ---------- Border Radius ---------- */
  --radius-card:    10px;
  --radius-section: 20px;
  --radius-pill:    2em;
  --radius-gallery: 8px;

  /* ---------- Animation / Easing ---------- */
  --ease-quick:  all ease-out 0.2s;
  --ease-smooth: all cubic-bezier(0.19, 1, 0.22, 1) 1.6s;
  --ease-load:   cubic-bezier(0.230, 1.000, 0.320, 1.000) 1.2s;
}

/* ベースサイズ設定: rem を 10px 基準で扱う */
html { font-size: 10px; }
body {
  font-family: var(--font-body);
  font-size: var(--font-base);
  line-height: var(--lh-body);
  letter-spacing: var(--ls-japanese);
  color: var(--color-text);
  background: var(--color-bg);
}
```

---

## 3. フォント設定（Google Fonts）

YAMLの英文見出しは `futura-pt`（有料Adobe Font）のため、代替として **Jost**（幾何学的サンセリフ）を採用。本文は **Noto Sans JP**。

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet">
```

CSS `@import` 版:

```css
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap');
```

---

## 4. コンポーネントスタイル仕様

### ボタン（Button）

```css
.btn {
  display: inline-block;
  width: 240px;
  padding: 1.0em 2em;
  background: var(--color-blue);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-pill);   /* pill 形状 */
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: 1.7rem;
  letter-spacing: var(--ls-japanese);
  text-align: center;
  cursor: pointer;
  transition: var(--ease-quick);
}
.btn:hover {
  background: var(--color-blue-hover);
  opacity: 0.85;
}

/* グリーン（メインCTA） */
.btn--primary { background: var(--color-accent); }
.btn--primary:hover { background: var(--color-accent-hover); opacity: 1; }

/* アクション強調（送信・申込） */
.btn--action { background: var(--color-orange-red); }
.btn--action:hover { background: var(--color-orange-red-hover); opacity: 1; }
```

### カード（Card / Worksカード）

```css
.card {
  background: var(--color-bg);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-subtle);
  padding: 40px;
  transition: var(--ease-quick);
}
.card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-4px);
}
/* Worksサムネイル: 4/3 アスペクト */
.card__thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-gallery);
}
```

### セクションボックス（Section Box）

```css
.section-box {
  background: var(--color-bg-alt);
  border-radius: var(--radius-section);
  padding: 60px 80px;
}
```

### バッジ / ラベル（Badge）

```css
.badge {
  display: inline-block;
  padding: 0.4em 1.2em;
  border-radius: var(--radius-pill);
  background: var(--gradient-hero);
  color: #ffffff;
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-caps);
  text-transform: uppercase;
  font-size: var(--font-xs);
}
```

### テキストリンク（Link）

```css
.link {
  color: var(--color-accent);
  text-decoration: none;
  transition: opacity 0.2s ease-out;
}
.link:hover { opacity: 0.7; }
```

### 区切り線（Divider）

```css
.divider {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  margin: 40px 0;
}
```

### コンテナ / セクション

```css
.container {
  max-width: var(--container-wide);
  margin: 0 auto;
  padding: var(--wrapper-padding-desktop);
}
.section { padding: var(--section-padding-desktop); }
.section--alt { background: var(--color-bg-alt); }

@media (max-width: 599px) {
  .container { padding: var(--wrapper-padding-mobile); }
  .section   { padding: var(--section-padding-mobile); }
}
```

### Worksギャラリーグリッド

```css
.works-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
@media (max-width: 599px) {
  .works-grid { grid-template-columns: repeat(2, 1fr); }
}
```

---

## 5. レスポンシブブレークポイント

| 名称 | 条件 |
|------|------|
| mobile | `max-width: 599px` |
| desktop | `min-width: 600px` |
| large | `min-width: 1400px` |
| xlarge | `min-width: 1600px` |

戦略: モバイルファースト。デスクトップで余白・フォントをスケールアップし、モバイルは `vw` 単位で流動対応。

---

## 6. デザイン適用チェックリスト（atmosphere.do / dont）

**やる:**
- たっぷりの余白でコンテンツに呼吸させる
- グリーンは差し色として節度を持って使う
- タイポグラフィの階層を明確に（3階層まで）
- 実績・数字・認証を目立たせる
- CTAは1セクションに1つ、明確に

**避ける:**
- ネオン・派手なビビッドカラー
- 目を引きすぎるアニメーション
- 複雑な背景（白・グレーを守る）
- フォントサイズ・ウェイトの多用
- コンテンツの詰め込みすぎ
