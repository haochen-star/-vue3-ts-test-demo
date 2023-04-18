<template>
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="@/assets/myLogo.png" class="logo" />
          </el-col>
          <el-col :span="16"><h3>管理系统</h3></el-col>
          <el-col :span="4"><span class="quit-login">退出登录</span></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            router
          >
            <!-- router是开启路由模式，通过index属性来进行跳转 -->
            <el-menu-item
              v-for="item in menuList"
              :key="item.path"
              :index="item.path"
            >
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'layout',
  setup() {
    const router = useRouter()
    console.log(router.getRoutes())
    const menuList = router.getRoutes().filter(route => route.meta.isShow)
    return {
      menuList
    }
  }
})
</script>

<style scoped lang="scss">
.el-header {
  background-color: #666;
  height: 60px;
  .logo {
    height: 60px;
  }
  h3,
  .quit-login {
    text-align: center;
    height: 60px;
    line-height: 60px;
    color: #fff;
  }
}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}
</style>
