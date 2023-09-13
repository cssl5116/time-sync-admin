<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenus } from '@/utils/map-menu'
import { Menus } from '@/vite-env'
import useUserStore from '@/stores/user/user'
defineProps<{ isFold: boolean }>()

const userStore = useUserStore()
const menu = userStore.menus

// 2. 菜单点击,切换路由
const router = useRouter()
const handleMenuItemClick = (item: Menus) => {
  router.push(item.url)
}

// 3. 默认菜单选中
const route = useRoute()
// 一旦路由变化,就会重新计算
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenus(route.path, menu)
  return `${pathMenu?.url}`
})
</script>

<template>
  <div class="aside">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="" />
      <div class="text">协同办公管理系统</div>
    </div>
    <div class="menu">
      <el-menu
        :collapse-transition="false"
        :default-active="defaultActive"
        :collapse="isFold"
      >
        <template v-for="item in menu" :key="item.id">
          <template v-if="Object.keys(item).includes('children')">
            <el-sub-menu :index="item.url">
              <template #title>
                <el-icon>
                  <component :is="item?.icon" />
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="subitem in item.children" :key="subitem.id">
                <el-menu-item
                  :index="subitem.url"
                  @click="handleMenuItemClick(subitem)"
                >
                  <template #title>
                    <el-icon>
                      <component :is="subitem?.icon" />
                    </el-icon>
                    <span>{{ subitem.name }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.url" @click="handleMenuItemClick(item)">
              <template #title>
                <el-icon>
                  <component :is="item?.icon" />
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="less">
.aside {
  .logo {
    height: 60px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    img {
      margin: 0 15px;
      width: 30px;
    }
    .text {
      width: 140px;
    }
  }
  .menu {
    .el-menu {
      border-right: none;
      transition: width 0.15s;
      -webkit-transition: width 0.15s;
      -moz-transition: width 0.15s;
      -webkit-transition: width 0.15s;
      -o-transition: width 0.15s;
    }
  }
}
</style>
