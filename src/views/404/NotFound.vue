<script setup lang="ts"></script>

<template>
  <div class="notFound flex-center">
    <div class="img"></div>
  </div>
</template>

<style scoped lang="less">
.notFound {
  width: 100%;
  height: 100%;
  .img {
    height: 500px;
    width: 500px;
    margin-bottom: 120px;
    background: no-repeat center/80% url('@/assets/img/404.png');
  }
}
</style>