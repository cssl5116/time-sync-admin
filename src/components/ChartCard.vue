<script setup lang="ts">
// import { ref, reactive } from 'vue'
defineProps<{ header?: string }>()
</script>

<template>
  <div class="chart-cart">
    <el-card class="box-card" :header="header">
      <slot>默认内容</slot>
    </el-card>
  </div>
</template>

<style scoped lang="less"></style>
