export interface ChildrenMenu {
	id: number;
	url?: any;
	icon?: any;
	name: string;
	sort: number;
	type: number;
	createAt: string;
	updateAt: string;
	permission: string;
}

export interface ChildrenMenuList {
	id: number;
	url: string;
	icon?: any;
	name: string;
	sort: number;
	type: number;
	children: ChildrenMenu[];
	createAt: string;
	updateAt: string;
}

export interface RolesMenuList {
	id: number;
	name: string;
	type: number;
	url: string;
	icon: string;
	sort: number;
	createAt: string;
	updateAt: string;
	children: ChildrenMenuList[];
}

export interface RolesList {
	id: number;
	name: string;
	intro: string;
	createAt: string;
	updateAt: string;
	menuList: RolesMenuList[];
}

export interface RolesData {
	list: RolesList[];
	totalCount: number;
}

export interface RolesResult {
	code: number;
	msg: string;
	data: RolesData;
}

/* - - - - - - - - - - - - - - */ 

export interface DepartmentList {
	id: number;
	name: string;
	leader: string;
	parentId: number;
	createAt: string;
	updateAt: string;
}

export interface DepartmentData {
	list: DepartmentList[];
	totalCount: number;
}

export interface DepartmentResult {
	code: number;
	msg: string;
	data: DepartmentData;
}

/* - - - - - - 所有菜单信息类型约束 - - - - - - - */ 
export interface ChildrenMenus {
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

export interface MenusList {
	id: number;
	name: string;
	type: number;
	url: string;
	icon: string;
	sort: number;
	createAt: string;
	updateAt: string;
	children: ChildrenMenus[];
}

export interface MenusData {
	list: MenusList[];
	totalCount: number;
}

export interface MenusResult {
	code: number;
	msg: string;
	data: MenusData;
}