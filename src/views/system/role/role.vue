<script setup lang="ts">
import PageContent from '@/components/page/PageContent.vue'
import PageSearch from '@/components/page/PageSearch.vue'
// import PageDialog from '@/components/page-dialog/PageDialog.vue'

import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
// import dialogConfig from './config/dialog.config'

// import usePageDialog from '@/hooks/usePageDialog'
import usePageContent from '@/hooks/usePageContent'

const { contentRef, handleQueryEvent } = usePageContent()
// const { dialogRef, handelAddEvent, handelEditEvent } = usePageDialog()
</script>

<template>
  <div class="role">
    <PageSearch :search-config="searchConfig" @query="handleQueryEvent" />
    <PageContent ref="contentRef" :content-config="contentConfig"></PageContent>
  </div>
</template>

<style scoped lang="less"></style>
