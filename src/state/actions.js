import {CHANGE_HEADER, CHANGE_STYLE, CHANGE_TEXT, TABLE_RESIZE} from '@/state/types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  }
}

export function changeHeader(data) {
  return {
    type: CHANGE_HEADER,
    data,
  }
}

export function changeStyle(data) {
  return {
    type: CHANGE_STYLE,
    data,
  }
}
