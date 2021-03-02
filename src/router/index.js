import { createRouter,createWebHashHistory  } from 'vue-router'

export const constantRoutes = [
    {
      path: '/',
      name: '主页',
      meta: { auth: true },
      redirect: '/home',
      component: () => import('@/components/layout/index.vue'),
      children: [
        {
          path: '/home',
          name: '首页',
          meta: {
            affix: true,
            auth: false,
            componentName: 'Home'
          },
          component: () => import('../pages/home/index.vue')
        }
      ]
    },
    {
      path:'/login',
      name:'登录页',
      meta:{auth:false},
      component:()=>import('@/pages/login/index.vue')
    }
]

const router = createRouter({
  // ...
  routes:constantRoutes,
  history: createWebHashHistory(),
})

export default router