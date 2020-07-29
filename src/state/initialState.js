import {getStorageDataByKey} from '@core/utils'

const defaultState = {
  tableState: {},
  dataState: {},
  currentText: '',
}

export const initialState = getStorageDataByKey('excel-state')
  ? getStorageDataByKey('excel-state')
  : defaultState
