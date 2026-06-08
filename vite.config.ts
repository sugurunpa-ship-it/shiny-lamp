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
    // style.css・favicon.svg・images/ を保持しつつ旧 tsc 出力は上書き
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
