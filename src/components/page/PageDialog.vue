<script setup lang="ts">
import usePageStore from '@/stores/page/page'
import useUserStore from '@/stores/user/user'
import { ref, reactive } from 'vue'

interface DialogProps {
  dialogConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<DialogProps>()
const pageStore = usePageStore()

const initialForm: any = {}
for (const item of props.dialogConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const formDate = reactive<any>(initialForm)

const isNewRef = ref(true)
const editData = ref()

const dialogVisible = ref(false)
const setDialogVisible = (isnew = true, info?: any) => {
  dialogVisible.value = true
  isNewRef.value = isnew
  if (!isnew && info) {
    // 给表单数据赋值
    for (const key in formDate) {
      formDate[key] = info[key]
    }
    editData.value = info
  } else {
    // 清空表单数据
    for (const key in formDate) {
      formDate[key] = ''
    }
    editData.value = null
  }
  if (Object.keys(formDate).includes('userBy')) {
    formDate.userBy = useUserStore().user.id
  }
}
// 对话框表单提交事件
const handleSubmitEvent = () => {
  let infoDate = formDate

  if (props.otherInfo) infoDate = { ...infoDate, ...props.otherInfo }

  if (!isNewRef.value && editData.value) {
    // 编辑信息
    pageStore
      .editPageDateAction(props.dialogConfig.pageName, infoDate)
      .then((flag) => {
        if (flag) dialogVisible.value = false
      })
  } else {
    // 新增信息
    pageStore
      .addPageDateAction(props.dialogConfig.pageName, infoDate)
      .then((flag) => {
        if (flag) dialogVisible.value = false
      })
  }
}

// 只向外暴露set方法、属性私有
defineExpose({ setDialogVisible })
</script>

<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? dialogConfig.header.newTitle : dialogConfig.header.editTitle
      "
      width="35%"
      center
    >
      <div class="form">
        <el-form :model="formDate" label-width="100px">
          <template v-for="item in dialogConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formDate[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-pricker'">
                <el-date-picker
                  v-model="formDate[item.prop]"
                  type="daterange"
                  range-separator="—"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formDate[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
              <template v-if="item.type === 'time-pricker'">
                <el-date-picker
                  v-model="formDate[item.prop]"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY/MM/DD"
                  style="width: 100%"
                />
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmitEvent">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.form {
  padding: 0 20px;
}
:deep(.el-dialog__body) {
  padding: 0;
}
</style>
