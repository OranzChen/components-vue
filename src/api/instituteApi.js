import request from '@/utils/request'

export function getTableList(params) {
  return request({
    url: '/admin/modelFile/list',
    method: 'get',
    params
  })
}
export function upload(data) {
  return request({
    url: '/admin/modelFile/upload',
    method: 'post',
    data
  })
}
export function download(params) {
  return request({
    url: '/admin/modelFile/download',
    method: 'GET',
    params
  })
}
// 上线
export function switchOn(data) {
  return request({
    url: '/admin/modelFile/switchOn',
    method: 'POST',
    data
  })
}
// 上线
export function switchOff(data) {
  return request({
    url: '/admin/modelFile/switchOff',
    method: 'POST',
    data
  })
}
// 搜索更新人
export function listCreateUser(params) {
  return request({
    url: '/admin/modelFile/listCreateUser',
    method: 'get',
    params
  })
}
// 搜索版本
export function listModelVersion(params) {
  return request({
    url: '/admin/modelFile/listModelVersion',
    method: 'get',
    params
  })
}