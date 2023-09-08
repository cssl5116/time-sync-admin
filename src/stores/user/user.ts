import { defineStore } from 'pinia'
import type { Account, BillInfo, LineInfo, PieInfo, UserData } from '@/vite-env'
import {
  fetchCardInfo,
  fetchCheckPwd,
  fetchLogin,
  fetchProviderList,
  fetchUpdatePwd
} from '@/service/api'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { mapProviderList } from '@/utils/map'

const useUserStore = defineStore('user', {
  state: () => ({
    user: <UserData>{},
    menus: [
      {
        text: '系统总览',
        url: '/show',
        icon: 'Reading',
        submenu: [
          {
            text: '系统纵览',
            url: '/show',
            icon: 'DataAnalysis'
          }
        ]
      },
      {
        text: '经营管理',
        url: '/main/manage',
        icon: 'Guide',
        submenu: [
          {
            text: '订单管理',
            url: '/manage/order',
            icon: 'List'
          },
          {
            text: '供应商管理',
            url: '/manage/provider',
            icon: 'Avatar'
          }
        ]
      },
      {
        text: '系统管理',
        url: '/system',
        icon: 'Setting',
        submenu: [
          {
            text: '用户管理',
            url: '/system/user',
            icon: 'User'
          },
          {
            text: '密码修改',
            url: '/system/pwd',
            icon: 'Lock'
          },
          {
            text: '退出系统',
            url: '/system/out',
            icon: 'SwitchButton'
          }
        ]
      }
    ],
    cardList: <BillInfo[]>[],
    pieInfo: <PieInfo[]>[],
    lineInfo: <LineInfo>{},
    providerList: <{ label: string; value: number }[]>[]
  }),
  actions: {
    async login(userModel: Account) {
      const userLoginResult = await fetchLogin(userModel)
      if (userLoginResult.code === '200') {
        this.user = userLoginResult.data
        // 保存用户信息到本地
        localCache.setCache('user', this.user)
        router.push('/main')
      } else {
        ElMessage.error(userLoginResult.msg)
        return
      }
      const providerResult = await fetchProviderList()
      this.providerList = mapProviderList(providerResult.data)
      localCache.setCache('provider', this.providerList)
    },
    // 防止页面刷新数据丢失
    async loadLocalCache() {
      const user = localCache.getCache('user')
      const provider = localCache.getCache('provider')
      if (user) this.user = user
      if (provider) this.providerList = provider
    },
    async checkPwd(pwd: string) {
      const chekcResult = await fetchCheckPwd(this.user.id, pwd)
      return chekcResult.code === '200'
    },
    async updateUserPwd(pwdModel: any) {
      const updateResult = await fetchUpdatePwd(this.user.id, pwdModel)
      if (updateResult.code === '200') {
        ElMessage.success('修改成功')
        router.push('/login')
      } else {
        ElMessage.error(updateResult.msg)
      }
    },
    async getCradListAction() {
      const cradResult = await fetchCardInfo()
      const { billInfo, pieInfo, lineInfo } = cradResult.data
      this.cardList = billInfo
      this.pieInfo = pieInfo
      this.lineInfo = lineInfo
    }
  }
})

export default useUserStore
