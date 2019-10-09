import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/admin/user/session',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/admin/user/admin/0',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/admin/user/session',
    method: 'delete'
  })
}
export function getNav() {
  return request({
    url: '/api/admin/admin/nav/tree',
    method: 'get'
  })
}
