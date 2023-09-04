// pages/detail/index/components/logCard/logCard.js
import {
  queryMyVintageCommentLog, //我的日志
} from '../../../../../api/detail.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    wineUUID: {
      type: String
    }
  },
  observers: {
    'wineUUID': function (wineUUID) {
      this.data.wineId = wineUUID
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 我的日志
    logList: {},
    wineId: '',
    // 图片地址
    imgUrl: app.globalData.imgUrl,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDownApp() {
      wx.navigateTo({
        url: '/pages/detail/downApp/downApp',
      })
    },
    // 我的日志
    queryMyVintageCommentLog(uuid) {
      let params = {
        wineUUID: uuid
      }
      queryMyVintageCommentLog(params).then(res => {
        if (res.code == 200) {
          this.setData({
            logList: res.data,
          })
        }

      })
    },
  },
  lifetimes: {
    ready: function () {
      let that = this
      that.queryMyVintageCommentLog(that.data.wineId)
    }
  }
})