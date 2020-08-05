import {getStorageDataByKey} from '@core/utils'

const defaultState = {
  tableState: {},
  dataState: {},
  styleState: {},
  headerState: 'New Table',
  currentText: '',
}

export const initialState = getStorageDataByKey('excel-state')
  ? getStorageDataByKey('excel-state')
  : defaultState
