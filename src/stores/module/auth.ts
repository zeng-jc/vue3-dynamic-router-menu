import { defineStore } from 'pinia'

import { fetchMenuList } from '@/api/module/auth'
import { getFlatMenuList } from '@/utils'

export const useAuthStore = defineStore('auth', {
  state: (): { menuList: MenuOptions[] } => ({
    menuList: []
  }),
  getters: {
    flatMenuListGet: (state) => getFlatMenuList(state.menuList)
  },
  actions: {
    async getAuthMenuList() {
      const { data } = await fetchMenuList()
      this.menuList = data
      return data
    }
  }
})
