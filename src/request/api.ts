import service from './index'
interface loginData {
  username: string
  password: string
}
export function login(data: loginData) {
  return service({
    url: '/api/user',
    method: 'post',
    data,
  })
}
