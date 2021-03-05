import axios from 'axios'
import { Message } from 'element-plus'
import localStorage from './localStorage'
import store from '@/store'
import router from '@/router'
import FUNC from '@/utils/func.js'

const url = import.meta.env.VITE_BASE_API

const CancelToken = axios.CancelToken
let cancel; const pendingList = []
const cancelPending = (config) => {
  pendingList.forEach((item, index) => {
    if (config) {
      if (item.u === config.url) {
        item.c() // 取消请求
        pendingList.splice(index, 1) // 移除当前请求记录
      }
    } else {
      item.c() // 取消请求
      pendingList.splice(index, 1) // 移除当前请求记录
    }
  })
}
// create an axios instance
const service = axios.create({
  baseURL: url, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  cancelRepeatReq: false, // 是否取消发起重复请求 true:取消false:不取消 默认false
  // timeout: 300 * 1000, // request timeoutgit
  cancelToken: new CancelToken(c => { // 强行中断请求要用到的
    cancel = c
    // pendingList.push({ 'u': url, 'c': c })
  })
})
// 判断当前登录用户是否有变化
const checkUserInfo = () => {
  const hadLogin = store.getters.USER_BASIC_INFOR && store.getters.USER_BASIC_INFOR.userCn
  const lclCn = localStorage.get('basicUserInfo').userCn
  if (hadLogin && localStorage.get('basicUserInfo') && store.getters.USER_BASIC_INFOR.userCn !== lclCn) {
    store.dispatch('setUserBasicInfo', localStorage.get('basicUserInfo'))
  }
}
const tidyTheData = (data) => {
  if (typeof data === 'object') {
    for (const key in data) {
      typeof data[key] === 'string' ? data[key] = FUNC.strTrim(data[key]) : typeof data[key] === 'object' ? tidyTheData(data[key]) : ''
    }
  }
  return data
}
// request interceptor
service.interceptors.request.use(
  config => {
    // 对string型参数做前后去空格处理
    if (config.method === 'get') {
      // console.log('get', config)
    } else if (config.method === 'post') {
      // console.log('post', config)
      if (config.data) {
        config.data = tidyTheData(config.data)
      }
    }
    if (localStorage.get('accessToken')) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = localStorage.get('accessToken')
      // 头部用户信息检查并更新
      checkUserInfo()
    }
    if (config.cancelRepeatReq) {
      cancelPending(config)
      config.cancelToken = new CancelToken((c) => {
        pendingList.push({ 'u': config.url, 'c': c })
      })
    }

    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (response.config && response.config.cancelRepeatReq) {
      cancelPending(response.config)
    }
    sessionStorage.setItem('ResHeaderInfo', JSON.stringify(response.headers))
    if (response.headers.export) {
      localStorage.set('downLoadResult', decodeURIComponent(response.headers.export))
    }
    // 系统异常5000时打印接口
    if (response.data.errcode === 5000) {
      console.error('接口异常：', response.config.url)
    }
    return res
  },
  error => {
    console.log(error.response)
    console.log('err' + error) // for debug
    if (error && error.response) {
      if (error.response.status === 401) {
        console.log(error.response.data)
        error.message = error.response.data.errmsg

        // store.dispatch('resetToken').then(() => {
        // Message({
        //   message: '未授权，请重新登录',
        //   type: 'error'
        // })
        // location.reload()
        if (error.response.data.errcode === 401 || error.response.data.errcode === 4002) {
          store.dispatch('resetToken').then(() => {
            router.push('/login').catch(err => {
            })
          })
        // } else if (error.response.data.errcode === 4002) {
          // location.reload()
          // router.push(`/login?redirect=${router.currentRoute.fullPath}`)
        }
        // })
      } else {
        console.log('error', error)
        error.message = '系统错误，请稍后重试'
      }
    }
    if ('err' + error === 'errCancel') {
      console.log('请求被取消')
    } else {
      Message.closeAll()
      console.log(error.message)
      Message({
        message: error.message || '系统错误，请稍后重试',
        type: 'error',
        duration: 5 * 1000
      })
    }

    return Promise.reject(error)
  }
)

export default service

// router.beforeEach((to, from, next) => { // 路由切换检测是否强行中断，
//   console.log('http')
//   if (cancel) {
//     cancel('interrupt')
//   }
//   console.log(cancel)
//   next()
// })
export { cancel }
