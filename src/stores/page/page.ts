import { defineStore } from 'pinia'
import {
  fetchAddPageInfo,
  fetchDeletePageInfo,
  fetchEditPageInfo,
  fetchPageListData
} from '@/service/api'
import type { PageInfo } from '@/vite-env'
import { ElMessage } from 'element-plus'

const usePageStore = defineStore('page', {
  state: () => ({
    currentPage: 1,
    pageSize: 5,
    pageList: [],
    totalCount: 0
  }),
  actions: {
    async getPageListAction(pageName: string, pageInfo: PageInfo) {
      const pageListDataResult = await fetchPageListData(pageName, pageInfo)
      const { records, total } = pageListDataResult.data
      this.pageList = records
      this.totalCount = total
    },
    async editPageDateAction(pageName: string, pageInfo: any) {
      const pageEditResult = await fetchEditPageInfo(pageName, pageInfo)
      const flag = pageEditResult.code === '200'
      if (flag) {
        ElMessage.success('修改成功')
        // 刷新页面
        this.getPageListAction(pageName, {
          size: this.pageSize,
          page: this.currentPage
        })
      } else {
        ElMessage.error(pageEditResult.msg ?? '修改失败')
      }
      return flag
    },
    async addPageDateAction(pageName: string, pageInfo: any) {
      const pageAddResult = await fetchAddPageInfo(pageName, pageInfo)
      const flag = pageAddResult.code === '200'
      if (flag) {
        ElMessage.success('新增成功')
        // 刷新页面
        this.getPageListAction(pageName, {
          size: this.pageSize,
          page: this.currentPage
        })
      } else {
        ElMessage.error(pageAddResult.msg ?? '新增失败')
      }
      return flag
    },
    async deletePageDataAction(pageName: string, id: number) {
      const pageDeleteResult = await fetchDeletePageInfo(pageName, id)
      if (pageDeleteResult.code === '200') {
        ElMessage.success('删除成功')
        // 刷新页面
        this.getPageListAction(pageName, {
          size: this.pageSize,
          page: this.currentPage
        })
      } else {
        ElMessage.error(pageDeleteResult.msg ?? '删除失败')
      }
    }
  }
})

export default usePageStore
