import { INPUT_TEXT, TABLE_RESIZE } from '@/redux/types'

// Чистая функция
export function rootReducer(state, action) {
  let prevState, field
  switch (action.type) {
    case TABLE_RESIZE:
      field =
        action.data.type === 'col' ? 'colState' : 'rowState'
      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value
      return { ...state, [field]: prevState }
    case INPUT_TEXT:
      prevState = state.dataState || {}
      prevState[action.data.id] = action.data.value
      return {
        ...state,
        currentText: action.data.value,
        dataState: prevState,
      }
    default:
      return state
  }
}
