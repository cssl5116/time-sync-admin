<script setup lang="ts"></script>

<template>
  <div class="phone-panel">
    <el-form label-width="60px" size="large">
      <el-form-item prop="phone" label="手机号">
        <el-input placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <div class="verify-code flex-center">
          <el-input placeholder="请输入验证码" />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
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
