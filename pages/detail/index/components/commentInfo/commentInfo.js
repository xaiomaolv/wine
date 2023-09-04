// pages/detail/index/components/commentInfo/commentInfo.js
import {
  getImgUrl //图片地址
} from '../../../../../api/detail.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentInfoList: {
      type: Array,
      value: ''
    }
  },
  observers: {
    // 'commentInfoList': function (commentInfoList) {
    //   this.data.commentList = commentInfoList
    // }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 图片地址
    imgUrl: app.globalData.imgUrl,
    commentList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    ready: function () { }
  }
})