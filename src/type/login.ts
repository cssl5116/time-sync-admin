export interface LoginData {
  id: number
  name: string
  token: string
}

export interface LoginResult {
  code: number
  data: LoginData
}

/* - - - - - - - - - - - - - - - */

export interface Account {
  name: string
  password: string
}

/* - - - - - - - - - - - - - - - */ 

export interface Role {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface Department {
  id: number
  name: string
  createAt: string
  updateAt: string
}

export interface UserInfoData {
  id: number
  name: string
  cellphone: string
  createAt: string
  updateAt: string
  role: Role
  department: Department
}

export interface UserInfo {
  code: number
  msg: string
  data: UserInfoData
}

/* - - - - - - - - - - - - - - - */ 

export interface Children {
	id: number;
	url: string;
	icon?: any;
	name: string;
	sort: number;
	type: number;
	children?: any;
	createAt: string;
	updateAt: string;
}

export interface Menus {
	id: number;
	name: string;
	type: number;
	url: string;
	icon: string;
	createAt: string;
	updateAt: string;
	children: Children[];
}

export interface MenuList {
	code: number;
	msg: string;
	data: Menus[];
}
