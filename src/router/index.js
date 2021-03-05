import { createRouter, createWebHashHistory } from 'vue-router'

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
      }, {
        path: '/demo',
        name: '测试',
        meta: {
          affix: false,
          auth: false,
          componentName: 'Demo'
        },
        component: () => import('@/pages/demo/index.vue')
      }, {
        path: '/father',
        name: '父子组件传值',
        meta: {
          affix: false,
          auth: false,
          componentName: 'Father'
        },
        component: () => import('@/pages/father/father.vue')
      },
      {
        path: '/position',
        name: '鼠标位置',
        meta: {
          affix: false,
          auth: false,
          componentName: 'Position'
        },
        component: () => import('@/pages/position/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登录页',
    meta: { auth: false },
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login',
    hidden: true
  }
]

const router = createRouter({
  // ...
  routes: constantRoutes,
  history: createWebHashHistory()
})

export default router
