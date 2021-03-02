import { createApp } from 'vue' // Vue3 引入一个新的 API createApp 方法，返回一个实例
import App from './App.vue'
// import router from 'vue-router'
import router from './router'
const app = createApp(App)
app.use(router)
app.mount('#app')
// Vue.prototype.$test = '' 2.x => app.config.globalProperties.$test = '' 3.x Vue3 我们类似这样的挂载需要用一个新的属性 globalProperties
