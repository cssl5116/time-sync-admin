const contentConfig = {
  firstLevel: 'system',
  pageName: 'message',
  header: {
    title: '消息列表',
    btnText: '发布消息'
  },
  propsList: [
    {
      type: 'normal',
      prop: 'id',
      label: '编号'
    },
    {
      type: 'normal',
      prop: 'senderName',
      label: '发送人',
      width: '110px'
    },
    {
      type: 'custom',
      prop: 'senderPhoto',
      slotName: 'photo',
      label: '头像',
      width: '150px'
    },
    {
      type: 'normal',
      prop: 'msg',
      label: '内容',
      width: '200px'
    },
    {
      type: 'timer',
      label: '发送时间',
      prop: 'sendTime'
    },
    {
      type: 'custom',
      slotName: 'handler',
      label: '操作'
    }
  ]
}

export default contentConfig
