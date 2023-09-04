// pages/detail/index/components/teamRate/teamRate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailInfo: {
      type: Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showTeam: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //下载app
    toDownApp() {
      wx.navigateTo({
        url: '/pages/detail/downApp/downApp',
      })
    },
    // 权威评价弹窗
    teamTip(e) {
      this.setData({
        showTeam: true,
        teamDesrc:e.currentTarget.dataset.item
      })
    },
    // 关闭弹窗
    onClose() {
      this.setData({
        showTeam: false,
      })
    },
  }
})