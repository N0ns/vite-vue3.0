import { createStore } from 'vuex'
import './modules/common'
import actions from './modules/actions'
import { state, mutations } from './modules/mutations'
import getters from './modules/getters'

export default createStore({
  state,
  mutations,
  actions,
  getters
})
