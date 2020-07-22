import {getStorageDataByKey} from '@core/utils'

const defaultState = {
  tableState: {},
}

export const initialState = getStorageDataByKey('excel-state')
  ? getStorageDataByKey('excel-state')
  : defaultState
