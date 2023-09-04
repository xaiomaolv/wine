// pages/detail/index/components/recomeYear/recomeYear.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newYear: {
      type: Array
    },
    wineMoreYearList: {
      type: Array
    },
  },
  observers: {
    'newYear': function (newYear) {
      // console.log(newYear,'newYear');
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