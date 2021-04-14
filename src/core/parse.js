/**
 * todo: убрать eval переработать логику с парсингом, а именно изменение формул в ячейках
 * @param text
 * @return {string|any}
 */

export function parse(text = '') {
  if (text.startsWith('=')) {
    try {
      // eslint-disable-next-line no-eval
      return eval(text.slice(1))
    } catch (e) {
      return text
    }
  }

  return text
}
