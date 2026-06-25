import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    component:import('@/views/Layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: import('@/views/Home/index.vue')
      },
      {
        path: 'category/:id',
        name: 'category',
        component: import('@/views/Category/index.vue')
      },
      {
        path: 'category/sub/:id',
        name: 'subcategory',
        component: import('@/views/SubCategory/index.vue')
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: import('@/views/Detail/index.vue')
      },
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: import('@/views/Login/index.vue'),
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: ()=>({ top : 0}),
})


export default router
