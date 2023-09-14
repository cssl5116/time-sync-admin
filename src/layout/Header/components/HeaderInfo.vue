<script setup lang="ts">
import router from '@/router'
import { localCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'
import { IMG_URL } from '@/service/config'
import { QuestionFilled } from '@element-plus/icons-vue'
import useUserStore from '@/stores/user/user'

const handleExitClick = () => {
  localCache.clear()
  ElMessage({ message: '退出成功!', type: 'success' })
  router.push('/login')
}

const userStore = useUserStore()
</script>

<template>
  <div class="header-info flex-level-center">
    <div class="operation">
      <span class="flex-center">
        <el-icon><Bell /></el-icon>
      </span>
      <span class="flex-center">
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span class="flex-center">
        <span class="dot"></span>
        <el-icon><Postcard /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info flex-level-center">
          <el-avatar :size="30" :src="IMG_URL + userStore.user.photo" />
          <span class="name">{{ userStore.user.nickname }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><CircleClose /></el-icon>
              <el-popconfirm
                width="220"
                confirm-button-text="退出"
                confirm-button-type="danger"
                cancel-button-text="取消"
                cancel-button-type="primary"
                :icon="QuestionFilled"
                icon-color="#626AEF"
                title="确认退出登录?"
                @confirm="handleExitClick"
              >
                <template #reference>
                  <span>退出系统</span>
                </template>
              </el-popconfirm>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Lock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-info {
  .operation {
    display: inline-flex;
    margin-right: 20px;

    span {
      position: relative;
      width: 40px;
      height: 35px;

      &:hover {
        background-color: #f2f2f2;
      }

      i {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background-color: red;
        border-radius: 100%;
      }
    }
  }
  .info {
    .user-info {
      cursor: pointer;
      margin-right: 10px;
      .name {
        margin-left: 10px;
      }
    }
    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
  }
}
</style>
