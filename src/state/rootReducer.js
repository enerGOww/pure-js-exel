import {CHANGE_HEADER, CHANGE_STYLE, CHANGE_TEXT, TABLE_RESIZE} from '@/state/types'

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
      return {...state, dataState: prevState, currentText: action.data.text}
    case CHANGE_HEADER:
      return {...state, headerState: action.data.text}
    case CHANGE_STYLE:
      prevState = state['styleState'] || {}
      prevState[action.data.id] = {...prevState[action.data.id], ...action.data.style}
      return {...state, styleState: prevState}

    default: return state
  }
}
