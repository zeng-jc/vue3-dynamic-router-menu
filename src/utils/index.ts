// 路由扁平化
export function getFlatMenuList(menuList: MenuOptions[]): MenuOptions[] {
  // 进行浅拷贝
  const newMenuList: MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : [])
  ])
}
