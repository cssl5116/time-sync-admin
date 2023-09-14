/// <reference types="vite/client" />
declare module 'element-plus/dist/locale/zh-cn.mjs'

export interface Children {
  id: number
  icon: string
  name: string
  url: string
  permissionId?: any
  type: number
  parent: number
  createAt: string
  updateAt?: any
  permissionName?: any
  children?: any
}

export interface Menus {
  id: number
  icon: string
  name: string
  url: string
  permissionId?: any
  type: number
  parent?: any
  createAt: string
  updateAt?: any
  permissionName?: any
  children?: Children[]
}

export interface Account {
  name: string
  password: string
}

export interface Phone {
  code: string
  phone: string
}

export interface UserData {
  id: number
  openId: string
  nickname?: string
  photo: string
  name?: any
  sex?: any
  tel: string
  email?: any
  hiredate?: any
  role: string
  root: number
  deptId?: any
  status: number
  createTime: string
}

export interface BaseResult {
  code: number
  msg: string
}
export interface UserLoginResult extends BaseResult {
  user: any
  token: string
  permission: string[]
}

export interface ProviderListData {
  id: number
  proCode: string
  proName: string
  proDesc: string
  proContact: string
  proPhone: string
  proAddress: string
  proFax: string
  createdBy: number
  creationDate: string
  modifyDate?: any
  modifyBy?: any
}

export interface ProviderResult extends BaseResult {
  data: ProviderListData[]
}
export interface PageInfo {
  page: number
  size: number
}

export interface PieInfo {
  name: string
  value: number
}

export interface BillInfo {
  tip: string
  title: string
  number: number
  subtitle: string
}

export interface LineInfo {
  yAxis: number[]
  xAxis: string[]
}

export interface DashboardInfo {
  pieInfo: PieInfo[]
  billInfo: BillInfo[]
  lineInfo: LineInfo
}

export interface DashboardResult extends BaseResult {
  data: DashboardInfo
}
