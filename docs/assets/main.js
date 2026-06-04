/**
 * main.ts — エントリーポイント
 *
 * 各モジュールを初期化する。
 * DOMContentLoaded を待ってから実行することで、
 * <script type="module"> の defer 相当動作を保証する。
 */
import { initNavigation } from './modules/navigation.js';
import { initFilter } from './modules/filter.js';
import { initReveal } from './modules/reveal.js';
function bootstrap() {
    // 各機能の初期化（クリーンアップ関数を保持）
    const cleanupNav = initNavigation();
    const cleanupReveal = initReveal();
    initFilter();
    // ページ離脱時のクリーンアップ（SPA化・テスト対応）
    window.addEventListener('beforeunload', () => {
        cleanupNav();
        cleanupReveal();
    }, { once: true });
}
// DOM が構築済みなら即実行、そうでなければ DOMContentLoaded を待つ
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
}
else {
    bootstrap();
}
//# sourceMappingURL=main.js.map