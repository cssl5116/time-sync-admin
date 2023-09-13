import type { Menus, ProviderListData } from '@/vite-env'

/**
 * 拿当前菜单去匹配菜单里的某一项
 * @param path 当前路径
 * @param menus 所有的菜单
 */
export const mapPathToMenus = (path: string, menus: Menus[]) => {
  for (const menu of menus) {
    if (!menu.children) continue

    for (const submenu of menu.submenu) {
      if (submenu.url === path) return submenu
    }
  }
}

export const mapPathTobreadCrumb = (path: string, menus: Menus[]) => {
  // 1.定义面包屑对象
  const breadcrumbs: { name: string; path: string }[] = []
  for (const menu of menus) {
    if (!menu.submenu) continue

    for (const submenu of menu.submenu) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.text, path: menu.url })
        breadcrumbs.push({ name: submenu.text, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

export const mapProviderList = (data: ProviderListData[]) => {
  return data.map((item) => {
    return {
      label: item.proName,
      value: item.id
    }
  })
}
