/**
 * contact.ts
 * 責務: コンタクトリンクの初期化（メールアドレスのスパム対策）
 *
 * HTML では data-user / data-domain に分割して記載し、
 * JavaScript で組み立てることでスパムボットによる自動収集を防ぐ。
 *
 * スクレイパーは HTML ソースの "mailto:" を優先的に収集するため、
 * JS 実行前の静的 HTML に mailto: を直書きしない。
 */

/**
 * .js-mail 要素の href を data-user / data-domain から組み立てる
 */
export function initContact(): void {
  document.querySelectorAll<HTMLAnchorElement>('.js-mail').forEach(el => {
    const user   = el.dataset.user
    const domain = el.dataset.domain
    if (user && domain) {
      el.href = `mailto:${user}@${domain}`
    } else {
      console.warn('[contact] .js-mail に data-user / data-domain が未設定です', el)
    }
  })
}
