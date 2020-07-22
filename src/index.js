import '@/scss/index.scss'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Store} from '@core/stateStore/Store'
import {rootReducer} from '@/state/rootReducer'
import {updateStorageByKeyAndState} from '@core/utils'
import {initialState} from '@/state/initialState'

const store = new Store(rootReducer, initialState)

store.subscribe(state => {
  updateStorageByKeyAndState('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
