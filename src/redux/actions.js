import {
  INPUT_TEXT,
  TABLE_RESIZE,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
} from '@/redux/types'

// action creator
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function inputText(text) {
  return {
    type: INPUT_TEXT,
    data: text,
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  }
}

/**
 * Применение стилей для ячеек
 * @param data {object}
 * @param {object} data.value
 * @param {object} data.ids
 * @returns {object} {type, data}
 */
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  }
}

/**
 * Изменять title
 * @param data {string}
 * @returns {object} {type, data}
 */
export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  }
}
