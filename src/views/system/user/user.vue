<script setup lang='ts'>
import { IMG_URL } from '@/service/config'
import useUserStore from '@/stores/user/user'

const userStore = useUserStore()
userStore.fetchDeptList()
userStore.fetchRoleList()
import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
import dialogConfig from './config/dialog.config'

import usePageDialog from '@/hooks/usePageDialog'
import usePageContent from '@/hooks/usePageContent'

const { contentRef, handleQueryEvent } = usePageContent()
const { dialogRef, handelAddEvent, handelEditEvent } = usePageDialog()

import PageContent from '@/components/page/PageContent.vue'
import PageSearch from '@/components/page/PageSearch.vue'
import PageDialog from '@/components/page/PageDialog.vue'
import { reactive } from 'vue';


const otherInfo = reactive({
  deptId: '',
  role: [],
  hiredate: ''
})
</script>

<template>
  <div class='user'>
    <PageSearch :search-config="searchConfig" @query="handleQueryEvent" />
    <PageContent ref="contentRef" @newly="handelAddEvent" @edit="handelEditEvent" :content-config="contentConfig">
      <template #photo="row">
        <el-image preview-teleported style="width: 60px; height: 60px" :src="IMG_URL + row.photo"
          :preview-src-list="[IMG_URL + row.photo]" />
      </template>
      <template #status="row">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'">{{ row.status === 1 ? "在职" : "离职" }}</el-tag>
      </template>
    </PageContent>
    <PageDialog ref="dialogRef" :other-info="otherInfo" :dialog-config="dialogConfig">
      <template #dept>
        <el-select v-model="otherInfo.deptId" placeholder="请选择部门" style="width: 100%">
          <template v-for="option in userStore.deptList" :key="option?.value">
            <el-option :label="option?.label" :value="option?.value" />
          </template>
        </el-select>
      </template>
      <template #role>
        <!-- <el-select v-model="otherInfo.role" placeholder="请选择角色" style="width: 100%">
          <template v-for="option in userStore.roleList" :key="option?.id">
            <el-option :label="option?.roleName" :value="option?.id" />
          </template>
        </el-select> -->
        <el-checkbox-group v-model="otherInfo.role" size="small">
          <template v-for="option in userStore.roleList" :key="option?.id">
            <el-checkbox :label="option?.roleName" :value="option?.id" border />
          </template>


        </el-checkbox-group>
      </template>
      <template #hiredate>
        <el-date-picker v-model="otherInfo.hiredate" type="date" placeholder="请选择一个日期" />
      </template>
    </PageDialog>
  </div>
</template>

<style scoped lang='less'></style>