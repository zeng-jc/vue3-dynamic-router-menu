import { defineStore } from 'pinia'
import piniaPersistConfig from '../presistedstate'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      username: ''
    },
    token: ''
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo
    }
  },
  persist: piniaPersistConfig('user')
})
