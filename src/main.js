import { createApp } from 'vue' // Vue3 引入一个新的 API createApp 方法，返回一个实例
import App from './App.vue'
import router from './router'
import './styles/main.scss'
import ElementPlus from 'element-plus'
import './styles/theme.scss'
import store from './store'

const app = createApp(App)
app.directive('dbClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      if (!el.disabled) {
        el.disabled = true
        el.style.cursor = 'not-allowed'
        setTimeout(() => {
          el.style.cursor = 'pointer'
          el.disabled = false
        }, 1500)
      }
    })
  }
})
console.log(import.meta.env)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
// Vue.prototype.$test = '' 2.x => app.config.globalProperties.$test = '' 3.x Vue3 我们类似这样的挂载需要用一个新的属性 globalProperties
