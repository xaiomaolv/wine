// 更改默认微信Page构造器
export const initPage = app => {
  const wxPage = Page
  Page = obj => {
    let wxOnLoad = obj.onLoad
    let wxOnHide = obj.onHide
    let wxOnUnload = obj.onUnload
    // // 页面加载
    obj.onLoad = (query) => {
      onPageLoad(app)
      if (wxOnLoad) {
        wxOnLoad.call(getCurrentPage(), query)
      }
    }
    // 隐藏页面
    obj.onHide = () => { 
      onPageLeave(app)
      if (wxOnHide) {
        wxOnHide.call(getCurrentPage())
      }
    }
    // 离开页面
    obj.onUnload = () => {
      onPageLeave(app)
      if (wxOnUnload) {
        wxOnUnload.call(obj)
      }
    }
    wxPage(obj)
  }
}

// 页面加载完会执行此钩子函数
export const onPageLoad = (app) => {
  app.log('钩子函数', 'onPageLoad', '当前app', app)
}

// 离开页面时执行此钩子
const onPageLeave = (app) => {
}

/**
 * 返回当前页
 */
const getCurrentPage = () => {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}
