import axios from 'axios'
const service = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
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
    const code: number = res.data.code
    if (code != 200) {
      return Promise.reject()
    }
    return res.data.data
  },
  err => console.log(err)
)

export default service
