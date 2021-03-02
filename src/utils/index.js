/* eslint-disable eqeqeq */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
function querySour(e) {
  // e = e.replace(/(^\s*)|(\s*$)/g, '')// 先过滤掉字符串中的空格
  // 用test函数判断字符串中有没有定义的特殊字符
  const arr = []
  const arr2 = []
  for (let i = 0; i < e.length; i++) {
    if (/(\+|\-|\&|\||\!|\(|\)|\{|\}|\[|\]|\^|\”|\~|\*|\?|\:|\\)/g.test(e[i])) {
      arr.push(e[i])
    }
    arr2.push(e[i])
  }
  arr2.forEach((item, index) => {
    arr.forEach((item2, index2) => {
      if (item === item2) {
        arr2.splice(index, 1, '\\' + item)
      }
    })
  })
  return arr2.join('')
}
// 深拷贝
const deepClone = target => {
  let result
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      result = []
      for (const i in target) {
        result.push(deepClone(target[i]))
      }
    } else if (target === null) {
      result = null
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      result = {}
      for (const i in target) {
        result[i] = deepClone(target[i])
      }
    }
  } else {
    result = target
  }
  return result
}
// 防抖
const debounce = (func, wait) => {
  let timer
  return function() {
    const context = this
    const args = arguments // arguments中存着e
    if (timer) clearTimeout(timer)
    const callNow = !timer

    timer = setTimeout(() => {
      timer = null
    }, wait)

    if (callNow) func.apply(context, args)
  }
}
const throttle = (timeout, fn, delay) => {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(fn, delay)
  return timeout
}
// 树形数据的find方法

const treeFind = (tree, searchValue, searchName = 'id', children = 'children') => {
  for (const data of tree) {
    if (data[searchName] === searchValue) {
      return data
    }
    if (data[children]) {
      const res = treeFind(data[children], searchValue, searchName, children)
      if (res) return res
    }
  }
  return null
}
// 求两个数组差集
const subSet = (arr1, arr2) => {
  var set1 = new Set(arr1)
  var set2 = new Set(arr2)

  var subset = []

  for (const item of set1) {
    if (!set2.has(item)) {
      subset.push(item)
    }
  }

  return subset
}
// 去重
const unique = (arr) => {
  return Array.from(new Set(arr))
}
// 跟据键值进行分类
const classifyArr = (arr, key) => {
  const resArr = []
  arr = deepClone(arr)
  arr = arr.map(item => {
    item[key] = item[key] || '未命名'
    return item
  })
  arr.map(mapItem => {
    // eslint-disable-next-line eqeqeq
    if (resArr.length == 0) {
      resArr.push({ [key]: mapItem[key], list: [mapItem] })
    } else {
      const res = resArr.some(item => { // 判断相同键值，有就添加到当前项
        // eslint-disable-next-line eqeqeq
        if (item[key] == mapItem[key]) {
          item.list.push(mapItem)
          return true
        }
      })
      if (!res) { // 如果没找相同键值添加一个新对象
        resArr.push({ [key]: mapItem[key], list: [mapItem] })
      }
    }
  })
  return resArr
}
// 数字转中文
const toChinesNum = (num) => {
  const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const unit = ['', '十', '百', '千', '万']
  num = parseInt(num)
  const getWan = (temp) => {
    const strArr = temp.toString().split('').reverse()
    let newNum = ''
    for (var i = 0; i < strArr.length; i++) {
      // eslint-disable-next-line eqeqeq
      newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum
    }
    return newNum
  }
  const overWan = Math.floor(num / 10000)
  let noWan = num % 10000
  if (noWan.toString().length < 4) {
    noWan = '0' + noWan
  }
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}
// 获取textarea焦点位置
const getNewSelectPosition = (textarea) => {
  var rangeData = { text: '', start: 0, end: 0 }
  if (textarea.setSelectionRange) { // W3C
    textarea.focus()
    rangeData.start = textarea.selectionStart
    rangeData.end = textarea.selectionEnd
    // console.log('get', rangeData)
    rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : ''
  } else if (document.selection) { // IE
    textarea.focus()
    var i,
      oS = document.selection.createRange(),
      oR = document.body.createTextRange()
    oR.moveToElementText(textarea)
    rangeData.text = oS.text
    rangeData.bookmark = oS.getBookmark()
    for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart('character', -1) !== 0; i++) {
      if (textarea.value.charAt(i) == '\r') {
        i++
      }
    }
    rangeData.start = i
    rangeData.end = rangeData.text.length + rangeData.start
  }
  return rangeData
}
const setSelectPosition = (textarea, rangeData) => {
  var oR
  if (!rangeData) {
    alert('You must get cursor position first.')
  }
  textarea.focus()
  if (textarea.setSelectionRange) { // W3C
    textarea.setSelectionRange(rangeData.start, rangeData.end)
  } else if (textarea.createTextRange) { // IE
    oR = textarea.createTextRange()
    oR.moveStart('character', -textarea.value.length)
    oR.moveEnd('character', -textarea.value.length)
    oR.moveStart('character', rangeData.end)
    oR.moveEnd('character', 0)
    oR.select()
  }
}
// 生成唯一id
const uuid = () => {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  const uuid = s.join('')
  return uuid
}
// 判断是否为json数据
const isJSON = (str) => {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
  console.log('It is not a string!')
}
const hexToRgba = (bgColor) => {
  if (typeof bgColor === 'string' && bgColor.includes('rgb')) return bgColor
  else {
    const color = bgColor.slice(1) // 去掉'#'号
    const rgba = [
      parseInt('0x' + color.slice(0, 2)),
      parseInt('0x' + color.slice(2, 4)),
      parseInt('0x' + color.slice(4, 6)),
      0.2
    ]
    return 'rgba(' + rgba.toString() + ')'
  }
}
// 获取字符串占位数量（文字两个字节，字母一个）
const getStrlen = (str) => {
  var len = 0
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i)
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len
}
// 数字数组排序
const sortNum = (arr) => {
  const a = arr.sort(function(a, b) {
    return a - b
  })
  return a
}
// 计算字符串长度
const strLenComputed = (list, nameArr, params) => {
  console.log(list, nameArr, params)
  const { labelStr, max } = params
  const numArr = []
  list.map((item) => {
    let str = ''
    if (typeof nameArr === 'string') {
      str = `${item[nameArr]}`
    } else if (typeof nameArr === 'object' && nameArr.length > 0) {
      nameArr.map((it, i) => {
        if (i === 0) str = `${item[nameArr[i]]}`
        else str += `-${item[nameArr[i]]}`
      })
    }
    numArr.push(getStrlen(str) * 6)
  })
  // 表头
  if (labelStr) numArr.push(getStrlen(labelStr) * 6)
  let maxNum = numArr.length > 0 && sortNum(numArr)[numArr.length - 1] >= 100 ? sortNum(numArr)[numArr.length - 1] : '100'
  if (max && maxNum > max) maxNum = max
  return maxNum
}
// 数组中随机选取n个元素
const sampleSize = ([...arr], n = 1) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr.slice(0, n)
}
// 获取由当前时间作为判断的时间
const getJudTime = (type, cFormat) => {
  const date = new Date()
  let time = ''
  switch (type) {
    case 'preMonth':// 上月
      time = `${date.getMonth() < 1 ? date.getFullYear() - 1 : date.getFullYear()}-${date.getMonth() < 1 ? '12' : date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}`
      break
    case 'curMonth':// 当月
      time = `${date.getFullYear()}-${date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}`
      break
    case 'nextMonth':// 下月
      time = `${date.getMonth() > 10 ? date.getFullYear() + 1 : date.getFullYear()}-${date.getMonth() < 9 ? '0' + (date.getMonth() + 2) : date.getMonth() > 10 ? '01' : date.getMonth() + 2}`
      break
    default:// 当前时间
      time = date
      break
  }
  if (cFormat) time = parseTime(time, cFormat)
  return time
}
// 过滤树结构
const filterTreeData = (arr, key, value, children = 'children') => {
  const newArr = arr.filter(item => item[key] !== value)
  return newArr.map(item => {
    if (item[children]) {
      item[children] = filterTreeData(item[children], key, value, children)
    }
    return item
  })
}
const dataURLtoFile = (urlData, file) => {
  var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], file.name, { type: mime })
}
// 压缩图片
const compressionImg = (file) => {
  return new Promise((resolve, reject) => {
    // 大于1MB的jpeg和png图片都缩小像素上传
    if (/\/(?:jpeg|png|jpg|bmp)/i.test(file.file.type) && file.file.size > 1000000) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const img = new Image()
      // 指定图片的DataURL(图片的base64编码数据)
      img.src = file.content
      img.onload = () => {
      // 画布大小按照图片的比例生成
        // const height = width / (img.naturalWidth / img.naturalHeight)
        // 指定canvas画布大小，该大小为最后生成图片的大小
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点， canvas.width, canvas.height 是将图片按给定的像素进行缩小。*/
        /* 如果不指定缩小的像素，图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后得到的图片就是张局部图。图片小于画布就会有黑边。*/
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
        file.content = canvas.toDataURL(file.file.type, 0.8)
        // 将base64编码的图片转成文件(file)格式
        const lastfile = dataURLtoFile(file.content, file.file)
        resolve(lastfile)
      }
    } else {
      resolve(file.file)
    }
    if (!file)reject()
  })
}
export { parseTime, deepClone, isExternal, debounce, treeFind, subSet, throttle, unique, classifyArr, toChinesNum, getNewSelectPosition, setSelectPosition, uuid, isJSON,
  hexToRgba, getStrlen, sortNum, strLenComputed, sampleSize, getJudTime, compressionImg, querySour, filterTreeData }
