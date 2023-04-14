<template>
  <div class="no-permission">
    <!-- 直接使用了 require 函数来引入图片 -->
    <el-empty
      :description="msg"
      :image="require('@/assets/404-error.webp')"
      :image-size="400"
    >
      <!-- 使用了 TypeScript 的类型声明，两种方式本质上是一样 -->
      <!-- <el-empty v-if="loaded" :description="msg" :image="image" :image-size="400"> -->
      <el-button type="primary" @click="backHome">回到首页</el-button>
    </el-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const msg =
      (route.params.msg as string | undefined) || '暂无查看该页面的权限' // 类型断言为 string 类型
    // const image = ref('') // 使用 ref 包装
    // const loaded = ref(false) // 解决闪烁问题
    // import('@/assets/404-error.webp').then(res => {
    //   // 这里要定义webp的类型，因为ts无法识别webp
    //   image.value = res.default
    //   loaded.value = true
    // }) // 异步引入图片
    const backHome = () => {
      router.push('./')
    }
    return {
      msg,
      // image,
      // loaded,
      backHome
    }
  }
})
</script>

<style scoped lang="scss">
.no-permission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .el-button {
    margin-top: 20px;
  }
}
</style>
