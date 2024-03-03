<template>
  <div>
    <h2>登录页面</h2>
    <button @click="login('token')">登录1</button>
    <button @click="login('xxx')">登录2</button>
  </div>
</template>

<script setup lang="ts" name="login">
import { fetchUserLogin } from '@/api/module/login'
import router from '@/router'
import { initDynamicRouter } from '@/router/module/dynamicRouter'
import { useUserStore } from '@/stores/module/user'
const userStore = useUserStore()
async function login(str: string) {
  // 请求登录接口：传入str用于区分不同的登录按钮
  const { userInfo, token } = await fetchUserLogin(str)
  // 存储token和用户信息
  userStore.setToken(token)
  userStore.setUserInfo(userInfo)

  // 初始化动态路由
  await initDynamicRouter()

  // 跳转到首页
  router.push('home/index')
}
</script>

<style scoped lang="scss"></style>
