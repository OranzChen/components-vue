import request from '@/utils/request2'
import qs from 'qs'

export function getMenuList(data) {
  return request({
    url: '/getMenuList',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getSession() {
  return request({
    url: '/getSession',
    method: 'get'
  })
}
