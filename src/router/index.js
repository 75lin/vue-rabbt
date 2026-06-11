import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';
import { createRouter, createWebHistory } from 'vue-router'
const Layout = import('@/views/Layout/index.vue');
const Login = import('@/views/Login/index.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: import('@/views/Home/index.vue')
      },
      {
        path: 'category',
        component: import('@/views/Category/index.vue')
      }
    ]
  },

  {
    path: '/login',
    component: Login,
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
