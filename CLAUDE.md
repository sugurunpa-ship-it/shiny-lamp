# Antigravity IDE — Claude Code プロジェクト設定

## プロジェクト概要

Antigravity IDE は Claude Code をベースとした AI 支援開発環境です。
カスタム Skills・SubAgents・Commands を組み合わせて、コンテンツ制作・開発業務を自動化します。

---

## 利用可能なスキル（`.claude/skills/`）

| スキル名 | 呼び出し | 概要 |
|---------|---------|------|
| `count-chars` | `/count-chars` | テキストを4パターンで文字数カウント（改行・スペース有無の組み合わせ） |
| `cleaning-report` | `/cleaning-report` | 清掃作業報告書を Excel(.xlsx) 形式で自動生成 |
| `web-research` | `/web-research` | 指定テーマをWeb調査してリスト形式にまとめる |
| `database-tips` | `/database-tips` | DB設計・クエリ最適化・インデックス・トランザクション管理のベストプラクティス |
| `security-checks` | `/security-checks` | OWASP Top 10 準拠のセキュリティレビュー・脆弱性チェック |
| `performance-guide` | `/performance-guide` | バックエンド・DB・フロントエンドのパフォーマンス最適化ガイド |
| `git-commit-writer` | `/git-commit-writer` | git diff から Conventional Commits 形式のコミットメッセージを生成 |
| `code-reviewer` | `/code-reviewer` | バグ・セキュリティ・パフォーマンス・可読性の総合コードレビュー |
| `test-writer` | `/test-writer` | pytest / Jest のテストケースを自動生成 |
| `api-designer` | `/api-designer` | RESTful API 設計・OpenAPI スキーマ生成 |
| `readme-writer` | `/readme-writer` | リポジトリを解析して README.md を自動生成 |
| `changelog-writer` | `/changelog-writer` | git log から Keep a Changelog 形式の CHANGELOG.md を生成 |
| `docstring-writer` | `/docstring-writer` | 関数・クラスに Google スタイルの docstring を追記 |
| `proofreader` | `/proofreader` | 日本語文章の誤字脱字・文体統一・冗長表現を校正 |
| `seo-keyword-planner` | `/seo-keyword-planner` | 記事テーマからキーワード戦略・見出し構成を提案 |
| `sns-post-writer` | `/sns-post-writer` | 記事・情報から X/LinkedIn/Instagram の投稿文を生成 |
| `meeting-notes` | `/meeting-notes` | 会議メモからアクションアイテム付き議事録を生成 |
| `requirement-doc` | `/requirement-doc` | ヒアリング内容から要件定義書・ユーザーストーリーを生成 |
| `estimate-maker` | `/estimate-maker` | 開発タスクを分解して工数・リスク・スケジュールを見積もる |
| `dockerfile-guide` | `/dockerfile-guide` | Dockerfile / Docker Compose の作成・最適化・セキュリティ強化 |
| `ci-cd-setup` | `/ci-cd-setup` | GitHub Actions CI/CD パイプラインのワークフローを生成 |
| `skill-creator` | `/skill-creator` | 新規スキルの作成・改善・評価 |

---

## 利用可能なエージェント（`.claude/agents/`）

| エージェント名 | 呼び出し | 概要 |
|-------------|---------|------|
| `seo-blog-writer` | `/seo-blog-writer <テーマ> <文字数>` | SEO構造の記事を執筆し、char-counter で文字数を計測・最適化 |

---

## 利用可能なコマンド（`.claude/commands/`）

| コマンド | 引数 | 概要 |
|---------|------|------|
| `/seo-blog-writer` | `<テーマ> <文字数>` | SEOブログ記事を執筆（seo-blog-writer エージェントに委譲） |
| `/count-chars` | `<テキスト>` | 文字数を4パターンで表示 |

---

## ディレクトリ構造

```
.claude/
├── settings.json          # チーム共有の設定（権限・フック・モデル）
├── settings.local.json    # 個人設定・上書き（Git 管理外）
├── agents/
│   └── seo-blog-writer.md # SEO記事執筆 SubAgent
├── commands/
│   ├── seo-blog-writer.md # /seo-blog-writer スラッシュコマンド
│   └── count-chars.md     # /count-chars スラッシュコマンド
└── skills/
    ├── count-chars/       # 文字数カウント（4パターン）
    ├── cleaning-report/   # 清掃報告書 Excel 生成
    ├── web-research/      # Web調査・リスト化
    └── skill-creator/     # スキル作成・評価ツール
```

---

## コンベンション

- スキル追加時は `.claude/skills/<name>/SKILL.md` に配置する
- SubAgent 追加時は `.claude/agents/<name>.md` に配置する
- コマンド追加時は `.claude/commands/<name>.md` に配置し、このファイルの表を更新する
- `settings.local.json` はチームに共有しない個人設定のみ記載する

---

## よく使うコマンド

```bash
# SEOブログ記事を執筆（5000文字）
/seo-blog-writer Claude Codeの使い方 5000文字

# テキストの文字数をカウント
/count-chars

# 新しいスキルを作成
/skill-creator

# Web調査
/web-research
```
