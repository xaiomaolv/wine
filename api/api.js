const whiteRequest = getApp().whiteRequest
const request = getApp().request
// 首页图片
// miniProgram/api/getAppletImgList
export function getAppletImgList() {
  return request({
    url: '/miniProgram/api/getAppletImgList',
    method: 'get'
  })
}

// 扫酒
// http://dev.vivino.cc/app-api/appapi/miniProgram/api/appletScan
export function scanWine(data) {
  return request({
    url: '/miniProgram/api/appletScan',
    method: 'post',
    data: data
  })
}

// 登录 /miniProgram/api/appletLogin
export function appletLogin(data) {
  return request({
    url: '/miniProgram/api/appletLogin',
    method: 'post',
    data: data
  })
}