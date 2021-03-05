
import { filterObj, firstUpperCase, firstLowerCase, formatStr } from './common'
import * as types from './types'
const getters = {

}
const list = filterObj(types)
list.forEach(item => {
  let str = ''
  let key = ''
  let val = ''

  str = firstUpperCase(item)
  str = formatStr(str)
  key = 'get' + str
  val = firstLowerCase(str)

  getters[key] = function(state) {
    return state[val]
  }
})
export default getters
