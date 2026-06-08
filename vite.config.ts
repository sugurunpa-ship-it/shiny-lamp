/**
 * vite.config.ts
 *
 * パフォーマンス改善: tsc の個別モジュール出力（5 HTTP リクエスト）を
 * Vite バンドルにより 1 ファイルに集約する。
 *
 * Before: main.js + modules/navigation.js + modules/filter.js +
 *         modules/reveal.js + types/portfolio.js（空） = 5 リクエスト
 * After:  main.js（バンドル済み・minified）               = 1 リクエスト
 */
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'docs/assets',
    // docs/assets/ には Vite 管理外の style.css が存在するため true にできない。
    // 旧成果物が累積しないよう、main.js の更新日時を定期確認すること。
    // 理想は outDir を dist/ に分離し、デプロイ時に docs/ へコピーする構成。
    emptyOutDir: false,
    // Vite 8 では esbuild は別途インストール必須 → デフォルト (oxc) を使用
    minify: true,
    sourcemap: false,
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: '[name].js',
        format: 'es',
      },
    },
  },
})
