<script setup lang="ts">
import useUserStore from '@/stores/user/user.ts'
import {ref, nextTick} from 'vue'

const userStore = useUserStore()
import PageContent from '@/components/page/PageContent.vue'
import PageSearch from '@/components/page/PageSearch.vue'
import type {ElTree} from 'element-plus'
// import PageDialog from '@/components/page-dialog/PageDialog.vue'

import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
import dialogConfig from './config/dialog.config'

import usePageDialog from '@/hooks/usePageDialog'
import usePageContent from '@/hooks/usePageContent'
import PageDialog from "@/components/page/PageDialog.vue";
import {mapMenusToIds, mapIdsToRole} from "@/utils/map-menu.ts";

const {contentRef, handleQueryEvent} = usePageContent()
const {dialogRef, handelAddEvent, handelEditEvent} = usePageDialog(newCallBack, editCallBack)
const treeRef = ref<InstanceType<typeof ElTree>>()

const otherInfo = ref({})
const handleElTreeCheck = (checkedNodes: any, treeStatus: any) => {
  let menuList = [...treeStatus.checkedKeys]
  menuList = mapIdsToRole(userStore.menus, menuList)
  otherInfo.value = {menuList}
}

function newCallBack() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

function editCallBack(info: any) {
  nextTick(() => {
    let menulast = mapMenusToIds(userStore.menus, JSON.parse(info.permissions));
    let permissions = mapIdsToRole(userStore.menus, menulast)
    otherInfo.value = {permissions}
    treeRef.value?.setCheckedKeys(menulast)
  })
}
</script>

<template>
  <div class="role">
    <PageSearch :search-config="searchConfig" @query="handleQueryEvent"/>
    <PageContent ref="contentRef" :content-config="contentConfig" @newly="handelAddEvent"
                 @edit="handelEditEvent"></PageContent>
    <PageDialog :other-info="otherInfo" :dialog-config="dialogConfig" ref="dialogRef">
      <template #menus>
        <el-tree
            ref="treeRef"
            :data="userStore.menus"
            show-checkbox
            node-key="id"
            highlight-current
            :props="{ children: 'children', label: 'name' }"
            @check="handleElTreeCheck"
        />
      </template>
    </PageDialog>
  </div>
</template>

<style scoped lang="less"></style>
