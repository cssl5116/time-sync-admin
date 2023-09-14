const contentConfig = {
  firstLevel: 'system',
  pageName: 'role',
  header: {
    title: '角色列表',
    btnText: '创建角色'
  },
  propsList: [
    {
      type: 'normal',
      prop: 'id',
      label: '编号',
      width: '80px'
    },
    {
      type: 'normal',
      prop: 'roleName',
      label: '角色名称',
      width: '150px'
    },
    {
      type: 'timer',
      label: '创建时间',
      prop: 'createAt'
    },
    {
      type: 'timer',
      label: '更新时间',
      prop: 'updateAt'
    },
    {
      type: 'handler',
      label: '操作'
    }
  ]
}

export default contentConfig
