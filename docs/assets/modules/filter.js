/**
 * filter.ts
 * 責務: Works セクションのカテゴリフィルター
 */
/** FilterCategory のガード関数（XSS・型安全） */
function isFilterCategory(value) {
    return (typeof value === 'string' &&
        ['all', 'game', 'tool', 'cont'].includes(value));
}
/**
 * カードの表示/非表示を切り替える（単一責任）
 * style.display を直接操作し、gridColumn はCSSクラスに委ねる
 */
function setCardVisibility(card, visible) {
    card.style.display = visible ? '' : 'none';
    card.style.gridColumn = ''; // CSSクラス (.card-full) に委ねる
}
/**
 * フィルターボタンのアクティブ状態を更新する（単一責任）
 * aria-pressed を同期して支援技術（スクリーンリーダー等）に現在状態を通知する
 */
function updateFilterButtons(buttons, activeBtn) {
    buttons.forEach(b => {
        b.classList.remove('on');
        b.setAttribute('aria-pressed', 'false');
    });
    activeBtn.classList.add('on');
    activeBtn.setAttribute('aria-pressed', 'true');
}
/**
 * カテゴリでカードを絞り込む（単一責任）
 */
function applyFilter(cards, category) {
    for (const { element, category: cardCategory } of cards) {
        const visible = category === 'all' || cardCategory === category;
        setCardVisibility(element, visible);
    }
}
/**
 * Works カード一覧を DOM から安全に構築する
 * data-cat の値をバリデーションして型安全にする
 */
function buildWorkCards() {
    return Array.from(document.querySelectorAll('.work-card')).reduce((acc, el) => {
        const cat = el.dataset.cat;
        if (!isFilterCategory(cat)) {
            console.warn(`[filter] Unknown category "${cat}" on`, el);
            return acc;
        }
        acc.push({ element: el, category: cat });
        return acc;
    }, []);
}
/**
 * フィルター機能を初期化する
 */
export function initFilter() {
    const buttons = document.querySelectorAll('.ftag');
    if (buttons.length === 0)
        return;
    const cards = buildWorkCards();
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const raw = btn.dataset.f;
            // ユーザー入力（data-f 属性）をバリデーション
            if (!isFilterCategory(raw)) {
                console.warn(`[filter] Invalid filter value: "${raw}"`);
                return;
            }
            updateFilterButtons(buttons, btn);
            applyFilter(cards, raw);
        });
    });
}
//# sourceMappingURL=filter.js.map