import { login } from 'util'

// 授权域名网络接口基础路径
// export const baseUrl ='http://192.168.0.13:8765/app-api/appapi'
export const baseUrl ='https://api.dev.vivino.cc/app-api/appapi'
// export const baseUrl ='https://api.vivino.cc/app-api/appapi'
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
  // const token = 'dc51bde8-06ce-4d91-850d-2d109afb5809'
  // const token = '4cf4c585-98bb-49e4-b462-a1164e9cc870'
  // const token = '44f07484-de56-44d6-a963-0ac65825d431'
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
          // getApp().log('responce', res.data)
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
// 不带权限 token请求
const whiteRequest = query => {
  let { url, method, header, data, params, responseType, local } = query
  const formHeader = { 'content-type': 'application/x-www-form-urlencoded'}
  const jsonHeader = { 'content-type': 'application/json' }
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
          getApp().log('responce', res.data)
          resolve(res.data)
        },
        fail: err => reject(err),
        complete: () => wx.hideLoading()
      })
    })
  }
  return req()
}


export default { baseUrl, request,whiteRequest }