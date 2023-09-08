<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </el-config-provider>
</template>

<style lang="less">
html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
