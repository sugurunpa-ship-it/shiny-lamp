/**
 * ポートフォリオサイトの型定義
 * toyota-premium-minimal デザインシステム準拠
 */

/**
 * Works フィルターカテゴリ（マジックストリング排除）
 * 'cont' → 'content' に変更: 略語より完全な単語で意図を明示
 */
export type FilterCategory = 'all' | 'game' | 'tool' | 'content';

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
  delayStep: number;   // s — 各要素のアニメーション遅延ステップ
  groupSize: number;   // 遅延をリセットするグループサイズ
}

/** ナビゲーションのスクロール制御設定 */
export interface NavScrollConfig {
  scrollThreshold: number;   // px — この値を超えると .scrolled クラスを付与
  activeOffset: number;      // px — セクション上端からこの分だけ手前でアクティブ判定
}
