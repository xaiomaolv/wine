import { login } from 'util'

// 授权域名网络接口基础路径
// export const baseUrl ='http://192.168.0.13:8765/app-api/appapi'
// export const baseUrl ='https://api.dev.vivino.cc/app-api/appapi'
export const baseUrl ='https://api.vivino.cc/app-api/appapi'
// export const baseUrl ='http://localhost:8080'

// --------------------以下为网络请求-------------------------
/**
 * 通用请求
 * 使用data为 表单 提交
 * 使用params 为 json提交
 * @param {url , method, header, data, params, responseType, local, cancleAuth} query 
 */
const request = query => {
  let { url, method, header, data, params, responseType, local, cancleAuth } = query

  const token = getApp().getToken() 
  // const code = getApp().getCode() 

  const formHeader = { 'content-type': 'application/x-www-form-urlencoded', 'token': token ,'platform':'applet'}
  const jsonHeader = { 'content-type': 'application/json', 'token': token ,'platform':'applet'}
  // wx.showLoading({
  //   title: getApp().T.common ? getApp().T.common.loading : '加载中...',
  //   mask: true
  // })

  // 微信不支持await Promise，先定义
  const req = () => {
    return new Promise((resolve, reject) => {
      getApp().log('request', query)
      wx.request({
        url: local ? url : baseUrl + url,
        method: method,
        header: params ? { ...formHeader, ...header } : { ...jsonHeader, ...header },
        data: params || data,
        responseType: responseType,
        success: res => {
          // console.log(getCurrentPages(),'getCurrentPages()');
          resolve(res.data)
        },
        fail: err => reject(err),
        complete: () => wx.hideLoading()
      })
    })
  }
  // // 权限验证
  // if (!cancleAuth) {
  //   return new Promise((resolve, reject) => {
  //     getApp().login().then(loginRes => {
  //       header = {
  //         // 'wx-code': loginRes.code,
  //         ...header
  //       }
  //       getApp().setCode(loginRes.code)
  //       req().then(res => resolve(res)).catch(err => reject(err))
  //     })
  //   })
  // }
  return req()
}


export default { baseUrl, request }