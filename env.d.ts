/// <reference types="vite/client" />

declare interface UserState {
  userInfo: {
    username: string
  }
  token: string
}

declare interface MenuOptions {
  path: string
  name: string
  component?: null | string | (() => Promise<unknown>)
  redirect?: null | string
  meta: MetaProps
  children?: MenuOptions[]
}
interface MetaProps {
  icon: string
  title: string
}
