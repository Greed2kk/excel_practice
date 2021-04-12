import { storage } from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  currentText: '',
  cellState: {},
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
