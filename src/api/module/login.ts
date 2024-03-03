export function fetchUserLogin(str = 'token') {
  return new Promise<UserState>((resolve) => {
    resolve({
      userInfo: { username: '123456' },
      token: str
    })
  })
}
