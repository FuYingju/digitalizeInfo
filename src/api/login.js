import { request } from '@/utils/request'
/**
 * 用户登录
 * @param username
 * @param password
 */
export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  console.log(data)
  return request({
    url: 'api/login',
    data,
    method: 'post'
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: 'api/ruoyi/getInfo',
    method: 'get'
  })
}
// export function login (data) {
//   return request({
//     url: admin/login/token,
//     method: 'post',
//     data: data
//   })
// }
