import {TABLE_RESIZE} from '@/state/types'

export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.tableState || {}
      prevState[action.data.id] = action.data.size
      return {...state, tableState: prevState}
    default: return state
  }
}
