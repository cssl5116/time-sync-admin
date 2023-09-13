<script setup lang="ts">
import { ref } from 'vue'

import AccountPanel from './AccountPanel.vue'
import PhonePanel from './PhonePanel.vue'
import { ElMessage } from 'element-plus';

const activeName = ref('phone')

// 获取组件实例 (先typeof推断组件类型, 再InstanceType获取返回类型)
const accountRef = ref<InstanceType<typeof AccountPanel>>()
const phoneRef = ref<InstanceType<typeof PhonePanel>>()
const handleLoginEvent = () => {
  if (activeName.value === 'account') {
    ElMessage.error('暂不支持账户登录')
  } else {
    phoneRef.value?.loginAction()
  }
}
</script>

<template>
  <div class="login-panel">
    <h2 class="title">时刻在线协同办公管理系统</h2>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="phone">
          <template #label>
            <div class="label flex-center">
              <el-icon>
                <Iphone />
              </el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PhonePanel ref="phoneRef"/>
        </el-tab-pane>
        <el-tab-pane name="account">
          <template #label>
            <div class="label flex-center">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <AccountPanel ref="accountRef" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginEvent"
    >
      立即登录
    </el-button>
  </div>
</template>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label .text {
    margin-left: 5px;
  }
  .controls {
    margin-top: 12px;
  }
  .login-btn {
    margin-top: 12px;
    width: 100%;
  }
}
</style>
