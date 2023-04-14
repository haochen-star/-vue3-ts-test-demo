import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router/index'
const service = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截
service.interceptors.request.use(config => {
  config.headers = config.headers || {}
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token') || ''
  }
  return config
})

// 响应拦截
service.interceptors.response.use(
  res => {
    const status: number = res.status
    if (status == 200 || status == 201 || status == 204) {
      return res.data
    }
    return Promise.reject(res)
  },
  error => {
    let errMsg = '<span>'
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          errMsg = errMsg + '客户端错误'
          if (error.response.data.msg) {
            errMsg = errMsg + '<br/>信息：' + error.response.data.msg
          }
          if (error.response.data.data) {
            errMsg = errMsg + '<br/>原因：' + error.response.data.data
          }
          break
        // 401: 用户认证失败
        case 401:
          errMsg = errMsg + '客户端错误'
          if (error.response.data.msg) {
            errMsg = errMsg + '<br/>信息：' + error.response.data.msg
          } else {
            errMsg = errMsg + '<br/>信息：用户无权限'
          }
          if (error.response.data.data) {
            errMsg = errMsg + '<br/>原因：' + error.response.data.data
          }
          break
        // 访问受限
        case 403:
          errMsg = errMsg + '其他错误'
          if (error.response.data.msg) {
            errMsg = errMsg + '<br/>信息：' + error.response.data.msg
          }
          if (error.response.data.data) {
            errMsg = errMsg + '<br/>原因：' + error.response.data.data
          }
          // 只有在没有权限列表中的才跳转到无权限页面

          router.push({
            name: 'permission',
            params: {
              msg: error.response.data.msg
            }
          })

          break
        // 404: 访问的路径不存在
        case 404:
          errMsg = errMsg + '客户端错误'
          if (error.response.data.msg) {
            errMsg = errMsg + '<br/>信息：' + error.response.data.msg
          } else {
            errMsg = errMsg + '<br/>信息：访问的路径不存在'
          }
          if (error.response.data.data) {
            errMsg = errMsg + '<br/>原因：' + error.response.data.data
          }
          break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          errMsg =
            errMsg + '服务器错误' + '<br/>状态码：' + error.response.status
          if (error.response.data.msg) {
            errMsg = errMsg + '<br/>信息：' + error.response.data.msg
          }
          if (error.response.data.data) {
            errMsg = errMsg + '<br/>原因：' + error.response.data.data
          }
          if (error.response.data && typeof error.response.data === 'string') {
            errMsg = errMsg + '<br/>原因：' + error.response.data
          }
          break
        // 其他错误，直接抛出错误提示
        default:
          errMsg = errMsg + '其他错误'
          if (error.response.data.msg) {
            errMsg = errMsg + '<br/>信息：' + error.response.data.msg
          }
          if (error.response.data.data) {
            errMsg = errMsg + '<br/>原因：' + error.response.data.data
          }
      }
      errMsg = errMsg + '</span>'
      ElMessage({
        type: 'error',
        showClose: true,
        customClass: 'custom-message',
        message: errMsg,
        dangerouslyUseHTMLString: true,
        duration: 3000
      })
      return Promise.reject(error.response)
    } else {
      ElMessage({
        type: 'error',
        showClose: true,
        customClass: 'custom-message',
        message: error,
        dangerouslyUseHTMLString: true,
        duration: 3000
      })
    }
  }
)

export default service
