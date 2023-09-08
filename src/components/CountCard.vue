<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'
import type { BillInfo } from '@/vite-env'

const props = defineProps<{ card: BillInfo }>()
const countRef = ref<HTMLElement>()
const countRef2 = ref<HTMLElement>()
const countOption = {
  prefix: props.card.title.includes('订单金额') ? '￥' : ' '
}
onMounted(() => {
  const countup = new CountUp(countRef.value!, props.card.number, countOption)
  const countup2 = new CountUp(countRef2.value!, props.card.number, countOption)
  countup.start()
  countup2.start()
})
</script>

<template>
  <div class="count-card">
    <div class="header flex-beside">
      <span class="title">{{ card.title }}</span>
      <el-tooltip :content="card.tip" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content flex-level-center">
      <span class="count" ref="countRef">{{ card.number }}</span>
    </div>
    <div class="footer">
      <span>{{ card.subtitle }}</span>
      <span ref="countRef2">{{ card.number }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.count-card {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  .header {
    align-items: flex-end;
    height: 38px;
    .title {
      font-size: 14px;
      color: #333;
    }
    .el-icon {
      font-size: 14px;
      color: #999;
      cursor: pointer;
    }
  }
  .content {
    flex: 1;
    margin-left: 0;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }
  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
