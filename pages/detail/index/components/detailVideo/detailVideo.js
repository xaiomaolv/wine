// pages/detail/index/components/detailVideo/detailVideo.js
import {
  getDetailPageVideo, //品酒视频
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
      this.data.wineId = wineUUID
      // console.log(wineUUID, 'wineUUID');
      // this.getDetailPageVideo(wineUUID)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    videoList: [],
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
    // 详情页视频
    getDetailPageVideo(uuid) {
      // console.log(uuid, "wineUuidwineUuidwineUuidwineUuidwineUuid");
      let params = {
        page: 1,
        pageSize: 3,
        wineUUID: uuid
      }
      getDetailPageVideo(params).then(res => {
        if (res.code == 200) {
          res.data.items.forEach(item => {
            if (item.coverURL.indexOf("file-cdn.vivino.cc")!=-1) {
              item.coverURL = item.coverURL +'?width=200&height=300&webp=1'
            } else {
              let url = item.coverURL.replace('http', 'https')
              // console.log(url,'url');
              item.coverURL = url
            }
          })
          this.setData({
            videoList: [...res.data.items]
          })
        }
      })
    },
  },
  lifetimes: {
    ready: function () {
      let that = this
      // console.log(this.data.wineUUID,'attached');
      that.getDetailPageVideo(that.data.wineId)
    }
  }
})