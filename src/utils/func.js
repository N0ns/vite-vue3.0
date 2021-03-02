import store from '@/store'
// 权限
const getPermissionDepts = (arr, ruleCode) => {
  let list = []
  arr.forEach((item) => {
    if (item.ruleCode === ruleCode) list = item.ruleValue
  })
  return list
}
const checkDeptPermission = (pmsList, target) => {
  return pmsList.includes('00000000') || pmsList.includes(target)
}
const checkDeptArrpermission = (pmslist, deptArr) => {
  // 用户拥有的权限与传入权限数组作对比，完全匹配时为true
  return !deptArr.filter(v => !pmslist.includes(v)).length || pmslist.includes('00000000') || pmslist.includes('ALL')
}
// 匹配表格是否显示该列
const tableColumnShow = (attrs, name) => {
  return attrs.includes(name) || (attrs.find((item) => item.value === name && item.checked) || {}).checked
}
// 判断当前删除操作结束是否需要修改获取数据的页码
const getPageToSet = (len, limit, page) => {
  if (len === Number(limit)) {
    if (page > 1) {
      return page - 1
    } else {
      return 1
    }
  } else {
    return page
  }
}
// 将所有有访问权限的页面路径存在一个数组里
const toTidyUrlDatas = (data) => {
  let urls = []
  if (typeof data === 'object') {
    data.map(item => {
      urls.push(item)
      if (item.children && item.children.length > 0) {
        urls = urls.concat(toTidyUrlDatas(item.children))
      }
    })
  }
  return urls
}
// 获取当前页面名称
const getCurPageName = (curUrl) => {
  let name = ''
  const urlDatas = toTidyUrlDatas(store.getters.getMenuTree || [])
  urlDatas.map((item, index) => {
    if (item.url === curUrl) {
      name = item.name
    }
  })
  return name
}
const strTrim = (str) => {
  // str.replace(/\s+/g, '')去除所有空格
  return str.replace(/^\s+|\s+$/g, '')
}
const getYearList = () => {
  const year = new Date().getFullYear()
  const num = year - 2016
  const arr = [...new Array(num).keys()]
  return arr.map(item => 2017 + item)
}
const getMonthList = () => {
  const num = 12
  const arr = [...new Array(num).keys()]
  return arr.map(item => item + 1)
}
export default {
  getPermissionDepts,
  checkDeptPermission,
  checkDeptArrpermission,
  tableColumnShow,
  getPageToSet,
  toTidyUrlDatas,
  getCurPageName,
  strTrim,
  getYearList,
  getMonthList
}
