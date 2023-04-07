import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Mock from 'mockjs'
import './mock/user'

createApp(App).use(router).mount('#app')

if (process.env.NODE_ENV === 'development') {
  // 在开发环境中使用 Mock.js 模拟接口
  Mock.setup({
    timeout: '200-600',
  })
}
