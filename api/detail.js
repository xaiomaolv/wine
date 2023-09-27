const request = getApp().request
// 扫酒记录
// /node/api/getUserBehaviorPage?type=1
export function scanWineInfo() {
  return request({
    url: '/general/api/findHistoryByUser',
    method: 'get'
  })
}

// 扫酒详情
export function getDetailInfo(params) {
  return request({
    url: '/wine/web/findWineDetailsWeb',
    method: 'get',
    data: params
  })
}
// 醒酒时间
export function getDecanterTime(params) {
  return request({
    url: '/node/api/queryUserDecanterTimeTypeAndDetail',
    method: 'get',
    data: params
  })
}
// 详情视频
// node/api/getDetailPageVideo  
export function getDetailPageVideo(params) {
  return request({
    url: '/node/api/getDetailPageVideo',
    method: 'get',
    data: params
  })
}

// 我的日志 /node/api/queryMyVintageCommentLogAndScanCount
export function queryMyVintageCommentLog(params) {
  return request({
    url: '/node/api/queryMyVintageCommentLogAndScanCount',
    method: 'get',
    data: params
  })
}
// 点评笔记 /general/api/getVintageCommentInfoDetailList
export function getVintageCommentInfo(params) {
  return request({
    url: '/general/api/getVintageCommentInfoDetailList',
    method: 'get',
    data: params
  })
}
// 酒庄最佳酒款 general/api/getWineInfoListWineryTop
export function getWineryTop(params) {
  return request({
    url: '/general/api/getWineInfoListWineryTop',
    method: 'get',
    data: params
  })
}

// 图片地址
export function getImgUrl(params) {
  return request({
    url: '/wine/web/find-path-by-uuid?uuid=' + params,
    method: 'get'
  })
}

// 相似酒款
export function getSimilarWine(params) {
  return request({
    url: '/general/api/scanList',
    method: 'post',
    params: params
  })
}