<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import useUserStore from '@/stores/user/user'

import type { Phone } from '@/vite-env'
import type { ElForm, FormRules } from 'element-plus'

let timer: NodeJS.Timer
let time = ref(60)
const form = reactive<Phone>({
  code: '',
  phone: ''
})

const phoneRules: FormRules = {
  phone: [
    { required: true, message: '请填写手机号', trigger: 'blur' },
    { min: 11, message: '用户名长度最少为11', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请填写验证码', trigger: 'blur' },
    { min: 6, message: '验证码长度最少为6', trigger: 'blur' }
  ]
}

const userStore = useUserStore()
// 获取组件实例, 用于调用组件内部方法(先typeof推断组件类型, 再InstanceType获取返回类型)
const formRef = ref<InstanceType<typeof ElForm>>()
const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      userStore.phoneLogin(form)
    } else {
      ElMessage({ message: '验证失败', type: 'error' })
    }
  })
}

const fetchCode = () => {
  if (!form.phone) {
    ElMessage({ message: '请填写手机号', type: 'error' })
    return
  }
  userStore.fetchPhoneCode(form.phone)
  timer = setInterval(() => {
    time.value--
    if (time.value === 0) {
      time.value = 60
      clearInterval(timer)
    }
  }, 1000)
}

defineExpose({ loginAction })
</script>

<template>
  <div class="phone-panel">
    <el-form
      ref="formRef"
      :model="form"
      :rules="phoneRules"
      label-width="80px"
      size="large"
    >
      <el-form-item prop="phone" label="手机号">
        <el-input v-model="form.phone" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <div class="verify-code flex-center">
          <el-input v-model="form.code" placeholder="请输入验证码" />
          <el-button
            v-if="time === 60"
            @click="fetchCode()"
            class="get-btn"
            type="primary"
          >
            获取验证码
          </el-button>
          <el-button type="primary" disabled v-else class="get-btn"
            >{{ time }}s</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.get-btn {
  width: 90px;
  margin-left: 8px;
}
</style>
