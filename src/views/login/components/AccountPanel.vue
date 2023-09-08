<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import useUserStore from '@/stores/user/user'

import type { Account } from '@/vite-env'
import type { ElForm, FormRules } from 'element-plus'

const form = reactive<Account>({
  name: '',
  password: ''
})

const accountRules: FormRules = {
  name: [
    { required: true, message: '请填写用户信息', trigger: 'blur' },
    { min: 1, message: '用户名长度最少为1', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请填写用户信息', trigger: 'blur' },
    { min: 5, message: '密码长度最少为5', trigger: 'blur' }
  ]
}
const userStore = useUserStore()
// 获取组件实例, 用于调用组件内部方法(先typeof推断组件类型, 再InstanceType获取返回类型)
const formRef = ref<InstanceType<typeof ElForm>>()
const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      userStore.login(form)
    } else {
      ElMessage({ message: '验证失败', type: 'error' })
    }
  })
}

defineExpose({ loginAction })
</script>

<template>
  <div class="account-panel">
    <el-form
      :model="form"
      :rules="accountRules"
      label-width="60px"
      status-icon
      size="large"
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="form.name" placeholder="请输入帐号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          show-password
          v-model="form.password"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less"></style>
