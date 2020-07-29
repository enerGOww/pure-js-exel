import {getStorageDataByKey} from '@core/utils'

const defaultState = {
  tableState: {},
  dataState: {},
  currentText: '',
  headerState: 'New Table',
}

export const initialState = getStorageDataByKey('excel-state')
  ? getStorageDataByKey('excel-state')
  : defaultState
