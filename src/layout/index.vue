<script setup lang="ts">
import { ref } from 'vue'
import Content from './Content/Content.vue'
import Header from './Header/Header.vue'
import Menu from './Menu/Menu.vue'

// 处理 emnu-icon 点击事件 => 菜单折叠
const isFold = ref(false)
const handleEmnuIconClick = (flag: boolean) => {
  isFold.value = flag
}
</script>

<template>
  <div class="layout-content">
    <div
      class="layout-content-left"
      :style="{ width: isFold ? '60px' : '200px' }"
    >
      <Menu :is-fold="isFold"></Menu>
    </div>
    <div class="layout-content-right">
      <Header @flod-change="handleEmnuIconClick"></Header>
      <Content></Content>
    </div>
  </div>
</template>

<style scoped lang="less">
.layout-content {
  display: flex;
  height: 100%;
  &-left {
    border-right: 1px solid #ccc;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;
    transition: width 0.3s linear;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  &-right {
    box-sizing: content-box;
    width: 0;
    flex: 1;
  }
}
</style>
