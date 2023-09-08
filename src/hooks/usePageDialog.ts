import type PageDialog from '@/components/page/PageDialog.vue'
import { ref } from 'vue'

type EditFnType = (data?: any) => void

export default function usePageDialog(
  newCallBack?: EditFnType,
  editCallBack?: EditFnType
) {
  const dialogRef = ref<InstanceType<typeof PageDialog>>()

  const handelAddEvent = () => {
    dialogRef.value?.setDialogVisible()
    if (newCallBack) newCallBack()
  }

  const handelEditEvent = (info: any) => {
    dialogRef.value?.setDialogVisible(false, info)
    if (editCallBack) editCallBack(info)
  }

  return {
    dialogRef,
    handelAddEvent,
    handelEditEvent
  }
}
