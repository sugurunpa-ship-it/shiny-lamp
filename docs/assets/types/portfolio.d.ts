/**
 * ポートフォリオサイトの型定義
 * toyota-premium-minimal デザインシステム準拠
 */
/** Works フィルターカテゴリ（マジックストリング排除） */
export type FilterCategory = 'all' | 'game' | 'tool' | 'cont';
/** Works カード1件のデータ */
export interface WorkCard {
    element: HTMLElement;
    category: FilterCategory;
}
/** ナビゲーションリンク1件 */
export interface NavLink {
    element: HTMLAnchorElement;
    targetId: string;
}
/** スクロール監視対象のセクション */
export interface ObservedSection {
    element: HTMLElement;
    id: string;
}
/** IntersectionObserver の設定 */
export interface RevealConfig {
    threshold: number;
    rootMargin: string;
    delayStep: number;
    groupSize: number;
}
/** ナビゲーションのスクロール制御設定 */
export interface NavScrollConfig {
    scrollThreshold: number;
    activeOffset: number;
}
