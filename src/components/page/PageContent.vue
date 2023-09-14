<script setup lang="ts">
// import { BASE_URL } from '@/service/config'
import usePageStore from '@/stores/page/page'
import { formateTime } from '@/utils/formate-day'
import { storeToRefs } from 'pinia'

const props = defineProps<{ contentConfig: any }>()
const { pageName } = props.contentConfig
// 新增
const emit = defineEmits(['newly', 'edit'])

const pageStore = usePageStore()
// 0. 定义详细查询对象,保证条件查询下,条件信息不丢失
let detailQuery: any | null = null

// 1. 发送action,请求usrList列表
const { pageSize, currentPage, pageList, totalCount } = storeToRefs(pageStore)

// 2. 从pinia中获取userList列表数据
getPageDataList()

// 3. 分页
const handleSizeChange = () => getPageDataList()
const handleCurrentChange = () => getPageDataList()

// 4.统一函数发送请求
function getPageDataList(searchForm?: any) {
  // 获取offset、size
  const size = pageSize.value
  const offset = currentPage.value
  // 只有searchForm不为undefined时,重置详细查询对象
  if (searchForm) detailQuery = searchForm
  pageStore.getPageListAction(pageName, { offset, size, ...detailQuery })
}

// 删除用户
const handleDeleteEvent = (id: number) => {
  pageStore.deletePageDataAction(props.contentConfig.pageName, id)
}

// 新增用户
const handleNewUserEvent = () => emit('newly')

// 编辑用户
const handleUpdateEvent = (info: any) => emit('edit', info)

// 5.向外暴露请求方法,使得ref引用的组件能使用到此方法
defineExpose({ getPageDataList })
</script>

<template>
  <div class="page-content">
    <div class="header flex-beside">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <div class="btns">
        <template v-if="contentConfig?.header?.btnText">
          <el-button type="primary" @click="handleNewUserEvent">
            {{ contentConfig.header.btnText ?? '新增数据' }}
          </el-button>
        </template>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        stripe
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.label">
          <template v-if="item.type == 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formateTime(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type == 'handler'">
            <el-table-column align="center" label="操作">
              <template #default="scope">
                <div class="option flex-center">
                  <el-button
                    text
                    icon="Edit"
                    type="primary"
                    @click="handleUpdateEvent(scope.row)"
                  >
                    编辑
                  </el-button>
                  <span style="color: #999">|</span>
                  <el-popconfirm
                    width="220"
                    confirm-button-text="删除"
                    confirm-button-type="danger"
                    cancel-button-text="取消"
                    cancel-button-type="primary"
                    icon="QuestionFilled"
                    icon-color="#626AEF"
                    title="确认是否删除?"
                    @confirm="handleDeleteEvent(scope.row.id)"
                  >
                    <template #reference>
                      <el-button text icon="Delete" type="danger">
                        删除
                      </el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type == 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope.row"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              show-overflow-tooltip
              align="center"
              v-bind="item"
            />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination" v-if="contentConfig.isPagination ?? true">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.page-content {
  margin-top: 8px;
  margin-bottom: 80px;
  padding: 15px;
  background-color: #fff;
  .header {
    align-items: flex-end;
    margin-bottom: 10px;
    .title {
      font-size: 22px;
    }
  }
  .table {
    margin-bottom: 10px;
    :deep(.el-table__cell) {
      padding: 12px 0;
    }
    .el-button {
      margin: 0;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
