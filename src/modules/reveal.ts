/**
 * reveal.ts
 * 責務: スクロールフェードイン（IntersectionObserver）
 */

import type { RevealConfig } from '../types/portfolio.js'

/** 設定定数 */
const REVEAL_CONFIG: RevealConfig = {
  threshold:  0.08,
  rootMargin: '0px 0px -40px 0px',
  delayStep:  0.1,    // s
  groupSize:  4,
}

/**
 * アニメーション遅延を計算する（グループ内での順番ベース）
 */
function calcDelay(index: number, config: RevealConfig): string {
  return `${(index % config.groupSize) * config.delayStep}s`
}

/**
 * prefers-reduced-motion が有効な場合はアニメーションをスキップする
 */
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * スクロールリビール機能を初期化する
 * @returns クリーンアップ関数（Observer の disconnect）
 */
export function initReveal(): () => void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal')

  // reduced-motion: アニメーションなしで即表示
  if (prefersReducedMotion()) {
    elements.forEach(el => el.classList.add('visible'))
    return () => { /* no observer to disconnect */ }
  }

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          target.classList.add('visible')
          observer.unobserve(target)   // メモリリーク防止
        }
      }
    },
    {
      threshold:  REVEAL_CONFIG.threshold,
      rootMargin: REVEAL_CONFIG.rootMargin,
    }
  )

  elements.forEach((el, i) => {
    el.style.transitionDelay = calcDelay(i, REVEAL_CONFIG)
    observer.observe(el)
  })

  return () => observer.disconnect()
}
