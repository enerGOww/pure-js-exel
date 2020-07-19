import {TABLE_RESIZE} from '@/state/types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}
