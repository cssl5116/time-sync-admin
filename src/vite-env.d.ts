/// <reference types="vite/client" />
declare module 'element-plus/dist/locale/zh-cn.mjs';

export interface Menus {
  text: string
  url: string
  icon: string
  submenu?: Menus[]
}
export interface Account {
  name: string
  password: string
}

export interface UserData {
  id: string
  userCode: string
  userName: string
  userPassword: string
  gender: number
  birthday: string
  phone: string
  address: string
  userRole: number
  createdBy: number
  creationDate: string
  modifyBy?: any
  modifyDate?: any
}
export interface BaseResult {
  code: string
  msg: string
}
export interface UserLoginResult extends BaseResult {
  data: UserData
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
	name: string;
	value: number;
}

export interface BillInfo {
	tip: string;
	title: string;
	number: number;
	subtitle: string;
}

export interface LineInfo {
	yAxis: number[];
	xAxis: string[];
}

export interface DashboardInfo {
	pieInfo: PieInfo[];
	billInfo: BillInfo[];
	lineInfo: LineInfo;
}

export interface DashboardResult extends BaseResult{
  data: DashboardInfo
}