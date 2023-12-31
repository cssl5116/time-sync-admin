import type {
  Account,
  Phone,
  PageInfo,
  UserLoginResult,
  BaseResult
} from '@/vite-env'
import { http } from '.'

export function fetchLogin(userModel: Account) {
  return http.post<UserLoginResult>({ url: '/user/login', data: userModel })
}

export function fetchPhoneLogin(userModel: Phone) {
  return http.post<UserLoginResult>({
    url: '/user/loginH',
    data: userModel,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function fetchRoleList() {
  return http.get({
    url: '/role/roleList',
  })
}

export function fetchDeptList() {
  return http.get({
    url: '/dept/deptList',
  })
}
export function fetchPhoneCode(phone: string) {
  return http.post<BaseResult>({
    url: '/user/check',
    data: { phone: phone },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function getUserMenusByRole() {
  return http.post({ url: '/menu/list' })
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

export function fetchAllUser() {
  return http.get({ url: '/user/all' })
}
