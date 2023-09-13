const routeList = [
  {
    path: '/main/analysis/dashboard',
    name: 'dashboard',
    component: () => import('@/views/analysis/dashboard.vue')
  },
  {
    path: '/main/system/user',
    name: 'user',
    component: () => import('@/views/system/user/user.vue')
  },
  {
    path: '/main/system/role',
    name: 'role',
    component: () => import('@/views/system/role/role.vue')
  },
  {
    path: '/main/system/check',
    name: 'check',
    component: () => import('@/views/system/check/check.vue')
  },
  {
    path: '/main/system/meeting',
    name: 'meeting',
    component: () => import('@/views/system/meeting/meeting.vue')
  }
]

export default routeList