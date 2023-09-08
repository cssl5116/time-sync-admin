<script setup lang="ts">
import LoginPanel from './components/LoginPanel.vue'
</script>

<template>
  <div class="login flex-center">
    <LoginPanel />
  </div>
</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url('@/assets/img/login-bg.svg');
}
</style>