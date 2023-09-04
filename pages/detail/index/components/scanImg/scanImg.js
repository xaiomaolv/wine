// pages/detail/index/components/scanImg/scanImg.js
const app = getApp();
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    scanDate: {
      type: String
    },
    scanImg: {
      type: String
    },
    scannedPhotoUUID: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 弹窗
    showSimilar: false,
    // 导航栏高度
    navBarHeight: app.globalData.navBarHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //监听轮播图的下标
    monitorCurrent: function () {
      this.setData({
        current: current
      })
    },
    // 关闭
    closeSimilar() {
      this.setData({
        showSimilar: false
      })
    },
    // 打开弹窗
    toSimilar(e) {
      this.setData({
        showSimilar: true,
      })
    },
    // 发布动态
    toDownApp() {
      wx.navigateTo({
        url: '/pages/detail/downApp/downApp',
      })
    },
  }
})