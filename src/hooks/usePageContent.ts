import { ref } from 'vue'
import type PageContent from '@/components/page/PageContent.vue'

export default function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  
  const handleQueryEvent = (queryInfo: any) => {
    contentRef.value?.getPageDataList(queryInfo)
  }

  return {
    contentRef,
    handleQueryEvent
  }
}