/**
 * utils/dom.ts
 * 責務: DOM 操作の汎用ユーティリティ
 *
 * 特定の機能モジュール（navigation / filter / reveal）から切り出した
 * 共有ヘルパー群。単一責任原則（SRP）のため機能モジュールに混在させない。
 */

/**
 * セレクタで DOM 要素を安全に取得する
 * 見つからない場合は Error をスローし、呼び出し元のモジュールに
 * ヌルチェックの責務を委ねない。
 *
 * @param selector - CSS セレクタ文字列
 * @param context  - 検索対象の親ノード（省略時は document）
 * @returns 型付き HTMLElement
 * @throws {Error} 要素が見つからない場合
 *
 * @example
 * const nav = requireElement<HTMLElement>('#main-nav')
 */
export function requireElement<T extends HTMLElement>(
  selector: string,
  context: ParentNode = document
): T {
  const el = context.querySelector<T>(selector)
  if (!el) throw new Error(`[dom] Element not found: "${selector}"`)
  return el
}
