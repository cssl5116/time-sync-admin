

const dialogConfig = {
  pageName: 'role',
  header: {
    newTitle: '新增角色',
    editTitle: '修改角色'
  },
  formItems: [
    {
      type: 'hiden',
      prop: 'id'
    },
    {
      type: 'input',
      prop: 'roleName',
      label: '角色名称:'
    },
    {
      type: 'custom',
      prop: 'roles',
      slotName: 'menus',
      label: '权限分配:'
    }
  ]
}
export default dialogConfig
