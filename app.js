// app.js
import {
  initPage,
  onPageLoad
} from './utils/page'
import request from './utils/request'
import util from './utils/util'
import tools from './utils/tools'
App({
  onShow() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  onLaunch() {
    // 重构Page对象
    initPage(this)
    // 自定义头部
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let sys = res.system
        let system = sys.indexOf("iOS") != -1 ? 'iOS' : 'Android'
        this.globalData.pixelRatio = res.pixelRatio
        this.globalData.system = system
        // 导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          // 胶囊按钮与右侧的距离=windowWidth-right+胶囊宽度
          navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight; //导航栏总体高度
        this.globalData.navTop = navTop; //胶囊距离顶部距离
        this.globalData.navObj = menuButtonObject.height; //胶囊高度
        this.globalData.navObjWid = navObjWid; //胶囊宽度（包括右边距离)
        this.globalData.windowWidth = res.windowWidth;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.navBarHeight = 44 + res.statusBarHeight
        this.globalData.capsule = wx.getMenuButtonBoundingClientRect() //获取胶囊宽高及位置
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  //  挂载全局request，使用app.request 替代wx.request
  ...request,
  // 挂载全局工具类
  ...util,
  ...tools,
  // api: [...api],
  setToken(token) {
    wx.setStorageSync('token', token)
  },
  getToken() {
    return wx.getStorageSync('token')
  },
  setCode(code) {
    wx.setStorageSync('code', code)
  },
  getCode() {
    return wx.getStorageSync('code')
  },
  // 引入`towxml3.0`解析方法
  towxml: require('/towxml/index'),
  //声明一个数据请求方法
  getText: (url, callback) => {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (typeof callback === 'function') {
          callback(res);
        };
      }
    });
  },
  globalData: {
    capsule: '',
    isLogin: false, // 是否授权登录
    isFirst: false, // 是否第一次使用
    // 图片访问地址
    // imgUrl: 'https://api.dev.vivino.cc/api/files/sc/find-by-uuid?uuid=',  //dev
    imgUrl: 'https://static-cdn.vivino.cc/api/files/sc/find-by-uuid?uuid=',  //prod
    // --------------------------老版本-------------------------
    // imgUrl: 'https://api.dev.vivino.cc/app-api/appapi/api/files/sc/find-by-uuid?uuid=', //老版本dev
    // imgUrl: 'https://api.vivino.cc/app-api/appapi/api/files/sc/find-by-uuid?uuid=',  //老版本prod
    // 扫酒
    // scanWine:'https://api.dev.vivino.cc/app-api/appapi/miniProgram/api/appletScan',  //dev
    scanWine: 'https://api.vivino.cc/app-api/appapi/miniProgram/api/appletScan',  //prod
    // 扫酒教学视频
    scanWineTip: 'https://api.vivino.cc/app-api/appapi/general/api/getScanStudyVideo'
  }
})
// api需要等待app初始化完成
getApp().api = require('./api/api').default