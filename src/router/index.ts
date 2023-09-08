import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: '/show',
          name: 'show',
          component: () => import('@/views/system/dashboard/Dashboard.vue')
        },
        {
          path: '/manage/order',
          name: 'order',
          component: () => import('@/views/manage/order/OrderPage.vue')
        },
        {
          path: '/manage/provider',
          name: 'provider',
          component: () => import('@/views/manage/provider/ProviderPage.vue')
        },
        {
          path: '/system/user',
          name: 'user',
          component: () => import('@/views/system/user/UserPage.vue')
        },
        {
          path: '/system/pwd',
          name: 'pwd',
          component: () => import('@/views/system/user/UserUpdatePwd.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('@/views/404/NotFound.vue')
    }
  ]
})

router.beforeEach((to) => {
  const user = localStorage.getItem('user')
  if (to.path.startsWith('/system/out')) {
    localStorage.removeItem('user')
    return '/login'
  }
  if (!to.path.startsWith('/login') && !user) {
    return '/login'
  }
  if (to.path === '/main') {
    return '/manage/order' //firstMenu?.url
  }
})

export default router
