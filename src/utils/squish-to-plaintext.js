/**
 * Flattens HTML into plain text.
 * @function squish
 * @return {String}
 */
export const squish = el => (el.innerHTML = el.innerText || el.textContent)
