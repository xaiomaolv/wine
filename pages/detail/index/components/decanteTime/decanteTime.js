// pages/detail/index/components/decanteTime/decanteTime.js
import {
  getDecanterTime, // 醒酒时间
} from '../../../../../api/detail.js'
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
      // console.log(wineUUID,'wineUUID');
      this.data.wineId = wineUUID
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    DecanteList: [],
    wineId: ''
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
    // 醒酒时间
    getDecanterTime(uuid) {
      let params = {
        wineUUID: uuid
      }
      getDecanterTime(params).then(res => {
        if (res.code == 200) {
          // console.log(res.data.decanterTimeVotes, 'time');
          let time = res.data.decanterTimeVotes
          let sum = time.fourHours + time.oneHour + time.tenMinutes + time.thirtyMinutes + time.twoHours
          this.setData({
            DecanteList: res.data.decanterTimeVotes,
            "DecanteList.sum": sum
          })
          // console.log(this.data.DecanteList.tenMinutes,'tenMinutestenMinutes');
        }
      })
    },
  },
  ready: function () {
    let that = this
    that.getDecanterTime(that.data.wineId)
  }
})