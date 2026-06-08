/**
 * navigation.ts
 * 責務: ナビゲーションの状態管理（スクロール背景・アクティブリンク）
 */

import type { NavScrollConfig, NavLink, ObservedSection } from '../types/portfolio.js'
import { requireElement } from '../utils/dom.js'

/** 設定定数 — マジックナンバー排除 */
const NAV_CONFIG: NavScrollConfig = {
  scrollThreshold: 80,   // px
  activeOffset:   120,   // px
}

/**
 * ナビゲーションリンクの一覧を構築する
 */
function buildNavLinks(): NavLink[] {
  return Array.from(
    document.querySelectorAll<HTMLAnchorElement>('.nav-links a')
  ).map(el => ({
    element: el,
    targetId: el.getAttribute('href')?.slice(1) ?? '',
  }))
}

/**
 * セクション一覧を構築する
 */
function buildSections(): ObservedSection[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>('section[id]')
  ).map(el => ({ element: el, id: el.id }))
}

/**
 * スクロール量に応じてナビバーの背景クラスを切り替える
 */
function updateNavBackground(nav: HTMLElement): void {
  const shouldBeScrolled = window.scrollY > NAV_CONFIG.scrollThreshold
  nav.classList.toggle('scrolled', shouldBeScrolled)
}

/**
 * 現在のスクロール位置に基づいてアクティブなナビリンクを更新する
 *
 * getBoundingClientRect() + scrollY を使う理由:
 * offsetTop は「最も近い positioned 親」からの相対値のため、
 * 遅延読み込み後のリフローや position 変更でズレが生じる。
 * getBoundingClientRect() は常にビューポート基準の動的な値を返す。
 */
function updateActiveLink(
  sections: ObservedSection[],
  navLinks: NavLink[]
): void {
  let currentId = ''

  for (const { element, id } of sections) {
    const top = element.getBoundingClientRect().top + window.scrollY
    if (window.scrollY >= top - NAV_CONFIG.activeOffset) {
      currentId = id
    }
  }

  for (const { element, targetId } of navLinks) {
    element.classList.toggle('active', targetId === currentId)
  }
}

/**
 * ナビゲーション全体を初期化する
 * @returns クリーンアップ関数
 */
export function initNavigation(): () => void {
  const nav = requireElement<HTMLElement>('#main-nav')
  const navLinks = buildNavLinks()
  const sections = buildSections()

  // rAF で間引き: 連続スクロールイベントを1フレーム1回に制限し
  // getBoundingClientRect() による Layout 再計算コストを抑える
  let rafId = 0

  const handleScroll = (): void => {
    if (rafId) return
    rafId = requestAnimationFrame(() => {
      updateNavBackground(nav)
      updateActiveLink(sections, navLinks)
      rafId = 0
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  // クリーンアップ関数を返す（テスト・SPA対応）
  return () => {
    window.removeEventListener('scroll', handleScroll)
    if (rafId) cancelAnimationFrame(rafId)
  }
}
