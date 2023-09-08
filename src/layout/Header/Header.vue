<script setup lang="ts">
import { ref } from 'vue'
import HeaderCrumb from './components/HeaderCrumb.vue'
import HeaderInfo from './components/HeaderInfo.vue'

const isFold = ref(false)
const emit = defineEmits(['flodChange'])

const handleMenuIconClick = () => {
  isFold.value = !isFold.value
  emit('flodChange', isFold.value)
}
</script>

<template>
  <div class="header flex-level-center">
    <div class="menu-icon">
      <el-icon size="24px" @click="handleMenuIconClick">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content flex-beside">
      <div class="breadcrumb">
        <HeaderCrumb />
      </div>
      <div class="info">
        <HeaderInfo />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  height: 60px;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .menu-icon {
    cursor: pointer;
  }
  .content {
    flex: 1;
    align-items: center;
    padding: 0 18px;
  }
}
</style>
