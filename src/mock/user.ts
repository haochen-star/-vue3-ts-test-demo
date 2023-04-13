// mock/user.js
import Mock from 'mockjs'

const user = {
  name: 'John',
  age: 18,
  gender: 'male',
}

Mock.mock('/api/user', 'get', user)

Mock.mock('/api/user', 'post', (options: { body: string }) => {
  const { username, password } = JSON.parse(options.body)
  // return 的是请求中的res.data
  return {
    code: 200,
    data: {
      msg: '登录成功',
      success: true,
      token: 'admin_token',
      username,
      password,
    },
  }
})
