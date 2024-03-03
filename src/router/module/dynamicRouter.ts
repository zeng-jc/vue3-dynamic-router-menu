import { useAuthStore } from '@/stores/module/auth'
import router from '..'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/module/user'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*vue')

export const initDynamicRouter = async () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  // 1.获取用户菜单
  await authStore.getAuthMenuList()

  // 2.判断当前用户有没有菜单权限
  if (!authStore.menuList.length) {
    userStore.setToken('')
    router.replace('/login')
    return Promise.reject('No permission')
  }

  // 3.添加动态路由
  authStore.flatMenuListGet.forEach((item) => {
    item.children && delete item.children // 因为flatMenuListGet拿到的扁平化路由的children没有删除
    if (item.component && typeof item.component === 'string') {
      // 从modules中拿到对应的路由懒加载函数：() => import('/src/views/xxx/xxx.vue')
      item.component = modules['/src/views' + item.component + '.vue']
    }
    // 把路由添加到layout下
    router.addRoute('layout', item as unknown as RouteRecordRaw)
  })
}
