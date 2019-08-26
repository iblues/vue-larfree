import request from '@/utils/request'

export function larSchemas(model, module = 'base.table', query = '') {
  return request({
    url: '/api/admin/system/component/' + model + '/' + module,
    method: 'get',
    params: query
  })
}

export function larData(api) {
  return request({
    url: api,
    method: 'get'
  })
}

export function larDetail(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
