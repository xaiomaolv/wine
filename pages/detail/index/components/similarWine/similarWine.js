// pages/detail/index/components/similarWine/similarWine.js
const app = getApp();
import {
  getSimilarWine, //相似酒款
  getImgUrl //图片地址
} from '../../../../../api/detail.js'
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    detailInfo: {
      type: Object,
      value: ''
    },
    scanDate: {
      type: String
    },
    wineUUID: {
      type: String
    },
    scannedPhotoUUID: {
      type: String
    }
  },
  observers: {
    'scannedPhotoUUID': function (scannedPhotoUUID) {
      this.data.fileUUID = scannedPhotoUUID
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    showSimilar: false,
    similarList: [],
    //轮播图当前的下标
    current: 0,
    //是否自动播放轮播图
    autoplay: false,
    fileUUID: '',

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //相似酒款列表
    getSimilarWineList() {
      // console.log(this.data.fileUUID,'this.data.fileUUID,');
      let params = {
        fileUUID: this.data.fileUUID,
        excludeWineUUID: this.data.wineUUID
      }
      getSimilarWine(params).then(res => {
        // console.log(res,'ddddd');
        if (res.code == 200) {
          this.setData({
            similarList: res.data.list,
            // showSimilar:res.data.list.length > 0 ? true : false
          })
          // console.log(this.data.similarList);
          // this.getImgZip()
        }
      })
    },
    getImgZip(list) {
      var that = this;
      that.data.similarList.forEach((item, index) => {
        getImgUrl(item.wineImg).then(resimg => {
          if (resimg.code == 200) {
            that.setData({
              [`similarList[${index}].imgzip`]: resimg.data,
              similarList: that.data.similarList
            })
            // console.log(that.data.similarList,'similarList');
          }
        })
      })
    },
    // 跳转详情
    toDetail(e) {
      let uuid = e.currentTarget.dataset.item
      const pageSize = getCurrentPages().length
      const cutPage = getCurrentPages();
      // console.log(cutPage,999)
      const list = cutPage.map(item => item.route).filter(item => item == 'pages/detail/index/index')
      // console.log(list)
      if (list.length == 2) {
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
      that.getSimilarWineList()
      // that.getImgZip()
    },
  }
})