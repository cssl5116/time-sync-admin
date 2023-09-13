import router from '@/router'
import { defineStore } from 'pinia'
import type { UserData,Account, Menus, Phone } from '@/vite-env'
import {
  fetchLogin,
  fetchPhoneCode,
  fetchPhoneLogin,
  getUserMenusByRole
} from '@/service/api'
import { localCache } from '@/utils/cache'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menu'
import { ElMessage } from 'element-plus'

const useUserStore = defineStore('user', {
  state: () => ({
    user: <UserData>{},
    token: '',
    permission: [],
    menus: <Menus[]>[]
  }),
  actions: {
    async login(userModel: Account) {
      const userLoginResult = await fetchLogin(userModel)
      if (userLoginResult.code === 200) {
        this.user = userLoginResult.user
        this.token = userLoginResult.token
        this.permission = userLoginResult.permission
        // 保存用户信息到本地
        localCache.setCache('token', this.token)
        router.push('/main')
      } else {
        ElMessage.error(userLoginResult.msg)
        return
      }
    },
    async phoneLogin(userModel: Phone) {
      const userLoginResult = await fetchPhoneLogin(userModel)
      if (userLoginResult.code === 200) {
        this.user = userLoginResult.user
        this.token = userLoginResult.token
        this.permission = userLoginResult.permission
        // 保存用户信息到本地
        localCache.setCache('user', this.user)
        localCache.setCache('token', this.token)
        localCache.setCache('permission', this.permission)
        // 查询权限菜单
        this.fetchUserMenus()
        // 跳转到主页
        router.push('/main')
      } else {
        ElMessage.error(userLoginResult as any)
        return
      }
    },
    async fetchPhoneCode(phone: string) {
      const result = await fetchPhoneCode(phone)
      if (result.code === 200) {
        ElMessage.success('验证码已发送')
      } else {
        ElMessage.error(result as any)
        return
      }
    },
    async fetchUserMenus() {
      const result = await getUserMenusByRole()
      if (result.code === 200) {
        this.menus = result.list
        localCache.setCache('menus', this.menus)
        // 动态添加路由
        const routes = mapMenusToRoutes(this.menus)
        routes.forEach((route) => {
          console.log(route)
          return router.addRoute('main', route)
        })
      } else {
        ElMessage.error(result as any)
        return
      }
    },
    // 防止页面刷新数据丢失
    async loadLocalCache() {
      const user = localCache.getCache('user')
      const token = localCache.getCache('token')
      const menus = localCache.getCache('menus')
      const permission = localCache.getCache('permission')
      if (user && token && permission && menus) {
        this.user = user
        this.token = token
        this.permission = permission
        this.menus = menus
        // 动态添加路由
        const routes = mapMenusToRoutes(menus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useUserStore
