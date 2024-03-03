import authMenuList1 from '../authMenuList1.json'
import authMenuList2 from '../authMenuList2.json'

export function fetchMenuList() {
  return new Promise<{ data: MenuOptions[] }>((resolve) => {
    setTimeout(() => {
      // 根据token加载不同的用户菜单，实际开发中会通过拦截器添加到请求头中，不需要在这里获取
      // 使用定时器是因为token持久化是因为异步存储的
      const token = JSON.parse(localStorage.getItem('user') ?? '{}').token
      console.log('token', token)
      if (token === 'token') {
        resolve(authMenuList1 as unknown as { data: MenuOptions[] })
      } else {
        resolve(authMenuList2 as unknown as { data: MenuOptions[] })
      }
    }, 10)
  })
}
