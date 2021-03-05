import * as types from './types'
import { filterObj, firstUpperCase, firstLowerCase, formatStr } from './common'
// import { constantRoutes } from '@/router'
const state = {

}
const mutations = {

}

const list = filterObj(types)
list.forEach((item) => {
  let str = ''
  str = firstUpperCase(item)
  str = firstLowerCase(str)
  str = formatStr(str)
  state[str] = ''
  mutations[str] = function(state, params) {
    state[str] = params
  }
})
console.log(state)
export {
  state,
  mutations
}
