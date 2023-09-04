const app = getApp();
import {
  getWineryTop, //酒庄最佳酒款
  getImgUrl
} from '../../../../../api/detail.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // wineryTopList: {
    //   type: Array
    // },
    wineryId: {
      type: String,
      default () {
        return ""
      }
    }
  },
  observers: {
    'wineryId': function (wineryId) {
      this.data.wineId = wineryId
      // console.log(wineryId,'wineryId');
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 图片地址
    wineId: '',
    imgUrl: app.globalData.imgUrl,
    isWineBottle: false, // 是否是酒瓶
    wineryTop: [],
    wineryTopList: [],
    timeOut: null, //定时器
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
    // 最佳酒款
    getWineryTop(wineryId) {
      let params = {
        // wineryId:'879'
        wineryId: wineryId
      }
      getWineryTop(params).then(res => {
        // console.log(res, 'getWineryTop');
        if (res.code == 200) {
          // res.data.items.forEach(item => {
            // wx.getImageInfo({
            //   src: this.data.imgUrl + item.wineImg,
            //   success: function (res) {
            //     let isBottle = (res.width / res.height).toFixed(2) < 0.75 ? true : false;
            //     // console.log(isBottle, 'isBottle');
            //     item.isBottle = isBottle
            //   }
            // })
          // })
          this.setData({
            wineryTopList: res.data.items
          })
          // this.getImageInfo(res.data.items)
          // console.log(this.data.wineryTopList, 'wineryTopList');
        }
      })
    },
    getImageInfo(arr) {
      var that = this;
      that.data.wineryTopList.forEach((item, index) => {
        // console.log(item,'itemdddddddddddddddddddddd');
        getImgUrl(item.wineImg).then(resimg => {
          if (resimg.code == 200) {
            that.setData({
              [`wineryTopList[${index}].imgzip`]: resimg.data,
              wineryTopList: that.data.wineryTopList
            })
          }
        })
      })
    },
    // 跳转详情
    toDetail(e) {
      // console.log(e,'eeeeettttttooooo');
      let uuid = e.currentTarget.dataset.item.wineUUID

      const pageSize = getCurrentPages().length
      const cutPage = getCurrentPages();
      // console.log(cutPage,999)
      const list = cutPage.map(item => item.route).filter(item => item == 'pages/detail/index/index')
      // console.log(list)
      if (list.length == 2) {
        // app.goBack(1, {
        //   params: {
        //     uuid
        //   }
        // })
        wx.redirectTo({
          url: `/pages/detail/index/index?uuid=${uuid}`,
        })
      } else {
        wx.navigateTo({
          url: `/pages/detail/index/index?uuid=${uuid}`,
        })
      }
    },
  },
  lifetimes: {
    ready: function () {
      let that = this
      that.data.timeout = setTimeout(() => {
        that.getWineryTop(this.data.wineId)
      }, 1000)
    },
    detached: function () {
      clearTimeout(this.data.timeOut);
    }
  }
})