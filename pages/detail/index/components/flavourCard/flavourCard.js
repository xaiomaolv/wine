// pages/detail/index/components/flavourCard.js
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    wineCharacteristicsVO: {
      type: Object,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 下载
    toDownApp() {
      wx.navigateTo({
        url: '/pages/detail/downApp/downApp',
      })
    },
  }
})