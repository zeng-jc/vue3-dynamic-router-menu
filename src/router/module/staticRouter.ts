const HOME_PATH = '/home/index'

export const staticRouter = [
  {
    path: '/',
    redirect: HOME_PATH
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: HOME_PATH,
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  }
]

export const errorRouter = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/ErrorMessage/404.vue')
  }
]
