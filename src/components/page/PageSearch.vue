<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'

// 传递Props: 父向子传参
const props = defineProps<{ searchConfig: any }>()

// 自定义事件: 子传父emit
const emit = defineEmits(['query'])

// 定义form数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

const formRef = ref<InstanceType<typeof ElForm>>()
const handelResetClick = () => {
  formRef.value?.resetFields()
  emit('query', searchForm)
}
const handelQueryClick = () => emit('query', searchForm)
</script>

<template>
  <div class="page-search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="10">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-pricker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  value-format="YYYY-MM-DD"
                  range-separator="—"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item?.options" :key="option?.value">
                    <el-option :label="option?.label" :value="option?.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" @click="handelResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handelQueryClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-search {
  background-color: #fff;
  padding: 10px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
    .el-button {
      height: 36px;
    }
  }
}
</style>
