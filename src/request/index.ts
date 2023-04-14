import axios from 'axios'
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
    if (status != 200) {
      return Promise.reject()
    }
    return res.data
  },
  err => console.log(err)
)

export default service
