import {CHANGE_TEXT, TABLE_RESIZE} from '@/state/types'

export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.tableState || {}
      prevState[action.data.id] = action.data.size
      return {...state, tableState: prevState}
    case CHANGE_TEXT:
      prevState = state['dataState'] || {}
      prevState[action.data.id] = action.data.text
      return {...state, currentText: action.data.text, dataState: prevState}
    default: return state
  }
}
