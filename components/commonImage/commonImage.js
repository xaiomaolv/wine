// components/commonImage/commonImage.js
import {
  getImgUrl //图片地址
} from '../../api/detail.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrl: {
      type: String,
      default: ''
    },
    imgUuid: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      value: 'scaleToFill'
    },
    width:{
      type:String,
      value: '200'
    },
    height:{
      type:String,
      value: '200',
    },
    // 样式字符串
    styleStr: {
      type: String,
      value: '',
    },
    classStr:{
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: '',
    // 图片地址
    imgAddress: app.globalData.imgUrl,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadImageById(uuid) {
      // 调用接口根据 id 获取图片地址
      getImgUrl(uuid).then(resimg => {
        if (resimg.code == 200) {
          this.setData({
            imageUrl: resimg.data
          });
        }
      })
    },
    // 判断图片大小
    onImgLoad(event) {
      // console.log(event, 'event');
      const {
        width,
        height
      } = event.detail
      // console.log(width, height);
      let isBottle = (width / height).toFixed(2) < 0.75 ? true : false;
      let bottleList = {
        showBottle: true,
        isWineBottle: isBottle
      }
      this.triggerEvent('onImgLoad', bottleList)
    },
  },
  lifetimes: {
    ready() {
      // console.log(this.properties.imgUrl, 'this.properties.imgUrl');
      // console.log(this.data.imgUrl, '00000');
      if (this.properties.imgUrl) {
        this.setData({
          imageUrl: `${this.properties.imgUrl}?width=${this.properties.width}&height=${this.properties.height}&webp=1`
        });
      } else {
        console.log(this.properties.imgUuid,'this.properties.imgUuid');
        this.setData({
          imageUrl: app.globalData.imgUrl + this.properties.imgUuid
        });
        // this.loadImageById(this.properties.imgUuid);
      }
    }
  },
})