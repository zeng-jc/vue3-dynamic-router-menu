<script setup lang="ts">
import { useAuthStore } from '@/stores/module/auth'
import { useUserStore } from '@/stores/module/user'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()
function logout() {
  userStore.setToken('')
  router.replace('/login')
}
</script>

<template>
  <div class="layout">
    <h2>header</h2>
    <button @click="logout">退出登录</button>
    <h2>menu</h2>
    <!-- 目前菜单只有两层，实际开发中需要递归组件实现 -->
    <div style="display: flex">
      <ul>
        <li v-for="(itemX, index) in authStore.menuList" :key="index">
          <div v-if="itemX.children?.length">
            <ul>
              <li v-for="(itemY, index) in itemX.children" :key="index">
                <router-link :to="itemY.path">{{ itemY.path }}</router-link>
              </li>
            </ul>
          </div>
          <div v-else>
            <router-link :to="itemX.path">{{ itemX.path }}</router-link>
          </div>
        </li>
      </ul>
      <div style="background-color: #ddd; width: 100%">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style></style>
