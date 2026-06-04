/**
 * reveal.ts
 * 責務: スクロールフェードイン（IntersectionObserver）
 */
/** 設定定数 */
const REVEAL_CONFIG = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
    delayStep: 0.1, // s
    groupSize: 4,
};
/**
 * アニメーション遅延を計算する（グループ内での順番ベース）
 */
function calcDelay(index, config) {
    return `${(index % config.groupSize) * config.delayStep}s`;
}
/**
 * prefers-reduced-motion が有効な場合はアニメーションをスキップする
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
/**
 * スクロールリビール機能を初期化する
 * @returns クリーンアップ関数（Observer の disconnect）
 */
export function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    // reduced-motion: アニメーションなしで即表示
    if (prefersReducedMotion()) {
        elements.forEach(el => el.classList.add('visible'));
        return () => { };
    }
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.classList.add('visible');
                observer.unobserve(target); // メモリリーク防止
            }
        }
    }, {
        threshold: REVEAL_CONFIG.threshold,
        rootMargin: REVEAL_CONFIG.rootMargin,
    });
    elements.forEach((el, i) => {
        el.style.transitionDelay = calcDelay(i, REVEAL_CONFIG);
        observer.observe(el);
    });
    return () => observer.disconnect();
}
//# sourceMappingURL=reveal.js.map