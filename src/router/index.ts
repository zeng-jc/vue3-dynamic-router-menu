import { createRouter, createWebHistory } from 'vue-router'
import { errorRouter, staticRouter } from './module/staticRouter'
import { useUserStore } from '@/stores/module/user'
import { useAuthStore } from '@/stores/module/auth'
import { initDynamicRouter } from './module/dynamicRouter'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }), // 路由跳转后回到顶部
  strict: false, //关闭严格模式
  routes: [...staticRouter, ...errorRouter]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  console.log('to.path', to.path)

  // 1.判断是访问登陆页
  if (to.path.toLocaleLowerCase() === '/login') {
    return next()
  }

  document.title = to.meta?.title ? `${to.meta.title}` : ''

  // 判断有没有token
  if (!userStore.token) return next({ path: '/login', replace: true })

  // 如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!authStore.menuList.length) {
    await initDynamicRouter()
    console.log('加载菜单')
    // 重点：防止动态路由刷新空白
    return next({ ...to, replace: true })
    // return next()
  }

  return next()
})

export default router
