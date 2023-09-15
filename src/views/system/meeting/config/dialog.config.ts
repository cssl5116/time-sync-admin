import useUserStore from '@/stores/user/user'

const userStore = useUserStore()
const dialogConfig = {
  firstLevel: 'system',
  pageName: 'message',
  header: {
    newTitle: '发布消息',
    editTitle: '编辑消息'
  },
  formItems: [
    {
      type: 'select',
      label: '发送人:',
      prop: 'senderId',
      placeholder: '请选择发送人',
      options: [
        {
          label: '系统消息',
          value: 0
        },
        {
          label: userStore.user.nickname,
          value: userStore.user.id
        }
      ]
    },
    {
      type: 'input',
      label: '消息内容:',
      prop: 'msg',
      placeholder: '请输入消息内容'
    },
    {
      type: 'custom',
      label: '接收人:',
      prop: 'ref',
      slotName: 'refer'
    }
  ]
}
export default dialogConfig
