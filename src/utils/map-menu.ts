import type {Children, Menus} from '@/vite-env'
import type {RouteRecordRaw} from 'vue-router'
import routerList from '@/router/routerList.ts'

export let firstMenu = <Children>{}
export const mapMenusToRoutes = (menus: Menus[]) => {
    // 获取所有路由列表
    const allRoutes = routerList

    // 2.根据菜单去匹配正确的路由
    const routes: RouteRecordRaw[] = []
    for (const menu of menus) {
        if (!menu.children) continue

        for (const submenu of menu.children) {
            const route = allRoutes.find((item) => item.path === submenu.url)
            if (route) {
                // 给一级菜单增加重定向功能
                if (!routes.find((item) => item.path === menu.url)) {
                    routes.push({path: menu.url, redirect: route.path})
                }
                // 添加所有菜单
                routes.push(route)
            }

            // 记录第一个被匹配到的菜单
            if (Object.keys(firstMenu).length == 0 && route) {
                firstMenu = submenu
            }
        }
    }
    return routes
}

/**
 * 拿当前菜单去匹配菜单里的某一项
 * @param path 当前路径
 * @param menus 所有的菜单
 */
export const mapPathToMenus = (path: string, menus: Menus[]) => {
    for (const menu of menus) {
        if (!menu.children) continue

        for (const submenu of menu.children) {
            if (submenu.url === path) return submenu
        }
    }
}

export const mapPathTobreadCrumb = (path: string, menus: Menus[]) => {
    // 1.定义面包屑对象
    const breadcrumbs: { name: string; path: string }[] = []
    for (const menu of menus) {
        if (!menu.children) continue

        for (const submenu of menu.children) {
            if (submenu.url === path) {
                breadcrumbs.push({name: menu.name, path: menu.url})
                breadcrumbs.push({name: submenu.name, path: submenu.url})
            }
        }
    }
    return breadcrumbs
}

export const mapMenusToIds = (menuList: any[], permissionList: any[]) => {
    // debugger
    const ids: number[] = []
    const recurseGetId = (menus: any) => {
        for (const item of menus) {
            if (item.children) {
                recurseGetId(item.children)
            } else {
                if (permissionList.find(i => i === item.permissionId)) ids.push(item.id)
            }
        }
    }
    recurseGetId(menuList)
    return ids
}

export const mapIdsToRole = (menuList: any[], menues: any[]) => {
    // debugger
    const ids: number[] = []
    const recurseGetId = (menus: any) => {
        for (const item of menus) {
            if (item.children) {
                recurseGetId(item.children)
            } else {
                menues.find(i => {
                    if (i === item.id) {
                        ids.push(item.permissionId)
                    }
                })
            }
        }
    }
    recurseGetId(menuList)
    return ids
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单列表
 * @returns 权限<String[]>数组
 */
export const mapMenusToPermissions = (menuList: any[]) => {
    const permissions: string[] = []

    function recurseGetPermission(menus: any[]) {
        for (const item of menus) {
            if (item.type === 3) {
                permissions.push(item.permission)
            } else {
                recurseGetPermission(item.children ?? [])
            }
        }
    }

    recurseGetPermission(menuList)
    return permissions
}
