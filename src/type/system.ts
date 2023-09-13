export interface UserList {
  id: number
  name: string
  password: string
  cellphone: string
  departmentId: number
  enable: number
  roleId: number
  createAt: string
  updateAt: string
  realname: string
}

export interface UserListData {
  list: UserList[]
  totalCount: number
}

export interface UserListResult {
  code: number
  data: UserListData
  msg: string
}

/* - - - - - - - - - - - - */
export interface PageInfo {
  offset: number
  size: number
}

export interface SearchForm {
  name: string
  realname: string
  cellphone: string
  enable: number
  createAt: []
}

export interface UserFormDate {
  name: string
  realname: string
  password: string
  cellphone: string
  roleId: string
  departmentId: string
}
