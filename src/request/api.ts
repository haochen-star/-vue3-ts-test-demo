import service from './index'
import { AxiosResponse } from 'axios'
interface loginData {
  username: string
  password: string
}
export function login(data: loginData): Promise<AxiosResponse> {
  return service({
    url: '/api/user',
    method: 'post',
    data,
  })
}
