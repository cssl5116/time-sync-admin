<script setup lang="ts">
import useUserStore from '@/stores/user/user'
import { mapPathTobreadCrumb } from '@/utils/map-menu'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const userMenu = useUserStore().menus
const breadcrumb = computed(() => {
  return mapPathTobreadCrumb(route.path, userMenu) 
})
</script>

<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item style="font-weight: 700;">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

