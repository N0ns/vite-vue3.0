// 首字母大写
const firstUpperCase = function(str) {
  return str.toLowerCase().replace(/(_|^)[a-z]/g, (L) => L.toUpperCase())
}

// 首字母小写
const firstLowerCase = function(str) {
  return str.substring(0, 1).toLowerCase() + str.substring(1)
}

// 过滤符合命名规范的types的键值
const filterObj = function(obj) {
  const reg = /^\w+([_]\w+)+$/
  const list = []
  for (const item in obj) {
    if (reg.test(item)) {
      list.push(item)
    }
  }
  return list
}

const formatStr = function(str) {
  str = str.replace(/_/g, '')
  return str
}

export {
  firstUpperCase,
  firstLowerCase,
  filterObj,
  formatStr
}
