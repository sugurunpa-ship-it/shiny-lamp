/**
 * main.ts — エントリーポイント
 *
 * 各モジュールを初期化する。
 * DOMContentLoaded を待ってから実行することで、
 * <script type="module"> の defer 相当動作を保証する。
 */

import { initNavigation } from './modules/navigation.js'
import { initFilter }     from './modules/filter.js'
import { initReveal }     from './modules/reveal.js'
import { initContact }    from './modules/contact.js'

function bootstrap(): void {
  // 各機能の初期化（クリーンアップ関数を保持）
  const cleanupNav    = initNavigation()
  const cleanupReveal = initReveal()
  initFilter()
  initContact()   // mailto: リンクをスパム対策のため JS で組み立て

  // ページ離脱時のクリーンアップ
  // 注意: 静的サイトでは通常不要だが、SPA 化・テスト環境向けに実装を維持
  window.addEventListener('beforeunload', () => {
    cleanupNav()
    cleanupReveal()
  }, { once: true })
}

// DOM が構築済みなら即実行、そうでなければ DOMContentLoaded を待つ
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  bootstrap()
}
