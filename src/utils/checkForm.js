// 验证内容长度
const checkLong = (rule, value, callback, long) => {
  if (value && value.length) {
    if (value.length <= long) {
      callback()
    } else {
      callback(new Error(`长度不能超过${long}`))
    }
  } else {
    callback()
  }
}
const specialName = (rule, value, callback, long) => {
  if (value) {
    const arr = value.split(' ')
    if (arr.length !== 1) {
      callback(new Error('不可录入空格'))
    } else {
      callback()
    }
  }
}
// 验证金额（大于0）
const check_2 = (rule, value, callback) => {
  const re = /^0{1}([.]([1-9][0-9]?)|[.][0-9][1-9])$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/
  if (value === '') {
    callback()
  } else {
    if (re.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确格式'))
    }
  }
}
// 验证0-100之间
const check_100 = (rule, value, callback, str) => {
  const re = /^[0-1]{1}([.]([0-9]){2})?$/
  if (value.length) {
    if (re.test(value)) {
      callback()
    } else {
      callback(new Error(str))
    }
  }
}
// 验证0-1之间
const check_01 = (rule, value, callback, str) => {
  const re = /^([01](\.0+)?|0\.[0-9]+)$/
  console.log(value)
  if (!value.length) {
    callback()
  }
  if (re.test(value)) {
    callback()
  } else {
    if (value > 1) {
      callback(new Error('不能大于1'))
    } else if (value < 0) {
      callback(new Error('不能小于0'))
    } else {
      callback(new Error(str))
    }
  }
}
// 验证数字
const check_num = (rule, value, callback, str) => {
  if (!value) {
    callback()
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    callback()
  } else {
    callback(new Error('必须为数字'))
  }
}
// 验证序号
const check_serial = (rule, value, callback, str) => {
  const re = /^-?[0-9]+$/
  if (!value) {
    callback()
  }
  if (re.test(value)) {
    value < 0 ? callback(new Error('排序值不能低于0')) : callback()
  } else {
    callback(new Error('格式有误'))
  }
}
// 验证金额（可以为0）
const check_money = (rule, value, callback, str) => {
  const re = /((^[1-9]\d*)|^0)(\.\d{1,2}){0,1}$/
  if (!value.length) {
    callback()
  }
  if (re.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确格式'))
  }
}
// 验证double类型
const check_double = (rule, value, callback) => {
  // const re = /^[0-9,.]*$/
  const re = /^[-\+]?\d+(\.\d+)?$/
  if (!value.length) {
    callback()
  }
  if (re.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确格式'))
  }
}
// 正整数 ^-?[1-9][0-9]
const check_init = (rule, value, callback) => {
  // const re = /^[0-9,.]*$/
  const re = /^-?([1-9][0-9]*|0)$/
  if (!value.length) {
    callback()
  }
  if (re.test(value)) {
    callback()
  } else {
    callback(new Error('请输入整数'))
  }
}
// 路由校验
const check_url = (rule, value, callback) => {
  const re = /^\/{1}[a-zA-Z_]+/g
  if (!value.length) {
    callback()
  }
  if (re.test(value)) {
    callback()
  } else {
    callback(new Error('拦截URL前缀格式不正确'))
  }
}
const checkChinese = (rule, value, callback) => {
  const re = /[\u4E00-\u9FA5]/g
  if (!value.length) {
    callback()
  }
  if (!re.test(value)) {
    callback()
  } else {
    callback(new Error('请勿输入中文'))
  }
}
const haveChinese = (rule, value, callback) => {
  const re = /[\u4E00-\u9FA5]/g
  if (!value.length) {
    callback()
  }
  if (re.test(value)) {
    callback()
  } else {
    callback(new Error('必须包含中文'))
  }
}
const checkVarCode = (rule, value, callback, msg) => {
  const re = /^[a-zA-Z\$_][a-zA-Z\d_]*$/
  if (!value.length) {
    callback()
  }
  if (re.test(value)) {
    callback()
  } else {
    callback(new Error(msg || '代码格式有误'))
  }
}
// 校验 仅为字母或数字或字母与数字组合
const checkNumCode = (rule, value, callback, msg) => {
  const re = /^[A-Za-z0-9]+$/
  if (!value.length) {
    callback()
  }
  if (re.test(value)) {
    callback()
  } else {
    callback(new Error(msg || '代码格式有误'))
  }
}
const specialCode = (rule, value, callback, msg) => {
  // var reg=/^[\u4E00-\u9FA5a-z0-9_()-]+$/i
  const re = /^[\u4e00-\u9fa5-_+{}/()?a-zA-Z0-9]+$/
  if (!value || !value.length) {
    callback()
  }
  if (re.test(value)) {
    callback()
  } else {
    callback(new Error(msg || '输入的格式有误'))
  }
}
export { checkLong, check_2, check_100, check_num, check_serial, check_01, check_money, check_double, check_init, check_url, checkChinese, checkVarCode, checkNumCode, specialCode, specialName, haveChinese }
