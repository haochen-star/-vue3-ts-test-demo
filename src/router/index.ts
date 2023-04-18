import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          isShow: true,
          title: '主页'
        },
        component: () => import('../views/dashboard/Index.vue')
      },
      {
        path: '/table',
        name: 'table',
        meta: {
          isShow: true,
          title: '表格'
        },
        component: () => import('../views/table/TableRowspan.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/permission',
    name: 'permission',
    component: () => import('../views/permission/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
