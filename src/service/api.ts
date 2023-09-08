import type {
  Account,
  DashboardResult,
  PageInfo,
  ProviderResult,
  UserLoginResult
} from '@/vite-env'
import { http } from '.'

export function fetchLogin(userModel: Account) {
  return http.post<UserLoginResult>({ url: '/user/login', data: userModel })
}

export function fetchProviderList() {
  return http.get<ProviderResult>({ url: '/provider/info' })
}

export function fetchPageListData(pageName: string, pageInfo: PageInfo) {
  return http.get({ url: `/${pageName}/list`, params: pageInfo })
}

export function fetchEditPageInfo(pageName: string, pageInfo: any) {
  let url = `/${pageName}/update`
  // 判断是否存在userBy
  if (Object.keys(pageInfo).includes('userBy')) {
    url = `/${pageName}/update/${pageInfo.userBy}`
  }
  return http.patch({ url, data: pageInfo })
}

export function fetchAddPageInfo(pageName: string, pageInfo: any) {
  let url = `/${pageName}/save`
  // 判断是否存在userBy
  if (Object.keys(pageInfo).includes('userBy')) {
    url = `/${pageName}/save/${pageInfo.userBy}`
  }
  return http.post({ url, data: pageInfo })
}

export function fetchDeletePageInfo(pageName: string, id: number) {
  return http.delete({ url: `/${pageName}/delete/${id}` })
}

// 验证密码
export function fetchCheckPwd(userId: string, pwd: string) {
  return http.post({ url: `/user/check`, data: { pwd: pwd, userId: userId } })
}

export function fetchUpdatePwd(userId: string, pwdModel: any) {
  return http.post({ url: `/user/updatePwd/${userId}`, data: pwdModel })
}

export function fetchCardInfo() {
  return http.get<DashboardResult>({ url: '/bill/other' })
}