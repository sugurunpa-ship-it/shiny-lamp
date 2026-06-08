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
    targetId: el.getAttribute('href')?.replace('#', '') ?? '',
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
 */
function updateActiveLink(
  sections: ObservedSection[],
  navLinks: NavLink[]
): void {
  let currentId = ''

  for (const { element, id } of sections) {
    if (window.scrollY >= element.offsetTop - NAV_CONFIG.activeOffset) {
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

  const handleScroll = (): void => {
    updateNavBackground(nav)
    updateActiveLink(sections, navLinks)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  // クリーンアップ関数を返す（テスト・SPA対応）
  return () => window.removeEventListener('scroll', handleScroll)
}
