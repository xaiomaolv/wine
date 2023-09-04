// pages/detail/index/components/likeCard/likeCard.js
import {
  getImgUrl //图片地址
} from '../../../../../api/detail.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailInfo: {
      type: Object,
      value: ''
    },
  },
  observers: {
    'detailInfo': function (detailInfo) {
      // console.log(detailInfo.wineVOList,'detailInfo');
      this.data.detailList = detailInfo.wineVOList
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    detailList: [],
    timeOut: null, //定时器
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转详情
    toDetail(e) {
      // console.log(e, 'eeee');
      let uuid = e.currentTarget.dataset.item.wineUUID
      let wineImg = e.currentTarget.dataset.item.wineImg
      // let wineryId = e.currentTarget.dataset.item.wineryId
      const pageSize = getCurrentPages().length
      const cutPage = getCurrentPages();
      // console.log(cutPage,'like')
      const list = cutPage.map(item => item.route).filter(item => item == 'pages/detail/index/index')
      // console.log(list,'like')
      if (list.length == 2) {
        // app.goBack(1,{params:{uuid}})
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
    ready: function () { },
    detached: function () { }
  }
})