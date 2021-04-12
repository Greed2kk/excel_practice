import { INPUT_TEXT, TABLE_RESIZE } from '@/redux/types'

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
