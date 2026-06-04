/**
 * navigation.ts
 * 責務: ナビゲーションの状態管理（スクロール背景・アクティブリンク）
 */
/** 設定定数 — マジックナンバー排除 */
const NAV_CONFIG = {
    scrollThreshold: 80, // px
    activeOffset: 120, // px
};
/**
 * DOM要素を安全に取得する（null チェック込み）
 * @throws HTMLElement が見つからない場合に Error
 */
function requireElement(selector, context = document) {
    const el = context.querySelector(selector);
    if (!el)
        throw new Error(`Element not found: "${selector}"`);
    return el;
}
/**
 * ナビゲーションリンクの一覧を構築する
 */
function buildNavLinks() {
    return Array.from(document.querySelectorAll('.nav-links a')).map(el => ({
        element: el,
        targetId: el.getAttribute('href')?.replace('#', '') ?? '',
    }));
}
/**
 * セクション一覧を構築する
 */
function buildSections() {
    return Array.from(document.querySelectorAll('section[id]')).map(el => ({ element: el, id: el.id }));
}
/**
 * スクロール量に応じてナビバーの背景クラスを切り替える
 */
function updateNavBackground(nav) {
    const shouldBeScrolled = window.scrollY > NAV_CONFIG.scrollThreshold;
    nav.classList.toggle('scrolled', shouldBeScrolled);
}
/**
 * 現在のスクロール位置に基づいてアクティブなナビリンクを更新する
 */
function updateActiveLink(sections, navLinks) {
    let currentId = '';
    for (const { element, id } of sections) {
        if (window.scrollY >= element.offsetTop - NAV_CONFIG.activeOffset) {
            currentId = id;
        }
    }
    for (const { element, targetId } of navLinks) {
        element.classList.toggle('active', targetId === currentId);
    }
}
/**
 * ナビゲーション全体を初期化する
 * @returns クリーンアップ関数
 */
export function initNavigation() {
    const nav = requireElement('#main-nav');
    const navLinks = buildNavLinks();
    const sections = buildSections();
    const handleScroll = () => {
        updateNavBackground(nav);
        updateActiveLink(sections, navLinks);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // クリーンアップ関数を返す（テスト・SPA対応）
    return () => window.removeEventListener('scroll', handleScroll);
}
//# sourceMappingURL=navigation.js.map