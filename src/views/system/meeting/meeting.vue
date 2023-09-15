<script setup lang="ts">
import { IMG_URL } from '@/service/config'
import PageContent from '@/components/page/PageContent.vue'
import PageDialog from '@/components/page/PageDialog.vue'
import useUserStore from '@/stores/user/user'

import contentConfig from './config/content.config'
import dialogConfig from './config/dialog.config'

import usePageDialog from '@/hooks/usePageDialog'
import usePageContent from '@/hooks/usePageContent'
import { reactive } from 'vue'
import usePageStore from '@/stores/page/page'
const pageStore = usePageStore()

const userStore = useUserStore()
userStore.fetchAllUser()

const { contentRef } = usePageContent()
const { dialogRef, handelAddEvent } = usePageDialog()

const otherInfo = reactive({ ref: [] })
const handleDeleteEvent = (id: number) => {
  pageStore.deletePageDataAction('message', id)
}
</script>

<template>
  <div class="meeting">
    <PageContent
      ref="contentRef"
      @newly="handelAddEvent"
      :content-config="contentConfig"
    >
      <template #photo="row">
        <el-image
          preview-teleported
          style="width: 35px"
          :src="IMG_URL + row?.senderPhoto"
          :preview-src-list="[IMG_URL + row.senderPhoto]"
        />
      </template>
      <template #handler="row">
        <div class="option flex-center">
          <template v-if="row.ref.length <= 0">
            <el-popconfirm
              width="220"
              confirm-button-text="删除"
              confirm-button-type="danger"
              cancel-button-text="取消"
              cancel-button-type="primary"
              icon="QuestionFilled"
              icon-color="#626AEF"
              title="确认是否删除?"
              @confirm="handleDeleteEvent(row.uuid)"
            >
              <template #reference>
                <el-button text icon="Delete" type="danger"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
          <template v-else>
            <span>暂无操作</span>
          </template>
        </div>
      </template>
    </PageContent>
    <PageDialog
      :other-info="otherInfo"
      ref="dialogRef"
      :dialog-config="dialogConfig"
    >
      <template #refer>
        <el-checkbox-group v-model="otherInfo.ref">
          <template v-for="option in userStore.users" :key="option.id">
            <el-checkbox :label="option.nickname" :value="option.id" />
          </template>
        </el-checkbox-group>
      </template>
    </PageDialog>
  </div>
</template>

<style scoped lang="less"></style>
