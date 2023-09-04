// pages/scan/components/scanResult/scanResult.js
import lottie from 'lottie-miniprogram'
let frameFn = function () {};
let rid = 0;
let canvasDom = null;
let ani = null;
import {
  appletLogin, //登录
} from '../../../../api/api.js'
const app = getApp();
Component({
  options:{
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    imgInfo: {
      type: Object,
    },
    cameraImg: {
      type: String,
    },
    identifying: {
      type: Number,
      value: 0
    },
    wineInfo: {
      type: Object,
    },
    isToken: {
      type: String,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    showResult: false,
    // identifying: 0, //识别，0正在识别，1 识别成功 2 识别失败
    imgUrl: app.globalData.imgUrl,
    // isToken: app.getToken(),
    isWineBottle: false,
    timeOut: null, //定时器
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      if (this.inited) {
        return
      }
      // this.createSelectorQuery().select('#lottie_demo').node((res) => {
      //   const canvas = res.node;
      //   const requestAnimationFrame = canvas.requestAnimationFrame;
      //   const context = canvas.getContext('2d')
      //   canvas.width = 300
      //   canvas.height = 340
      //   canvas.requestAnimationFrame = function () {
      //     frameFn = arguments[0];
      //     rid = requestAnimationFrame.apply(canvas, arguments);
      //     return rid;
      //   }
      //   // 页面第二次打开时动画默认不会开始，这里需要手动调用一次动画
      //   canvas.requestAnimationFrame(frameFn);
      //   canvasDom = canvas;
      //   lottie.setup(canvas);
      //   lottie.loadAnimation({
      //     autoplay: true,
      //     loop: true,
      //     animationData: require('../../../../json/data'),
      //     rendererSettings: {
      //       context,
      //     }
      //   });
      // }).exec();

      this.createSelectorQuery().selectAll('#lottie_demo').node(res => {
        // console.log(res, 'ressss');
        const canvas = res[0].node
        const context = canvas.getContext('2d')
        context.scale(this.getPixelRatio(), this.getPixelRatio())
        canvas.width = 160 * this.getPixelRatio() //160是图片的宽度
        canvas.height = 240 * this.getPixelRatio() //240是图片的高度
        lottie.setup(canvas)
        ani = lottie.loadAnimation({
          loop: true,
          autoplay: true,
          animationData: require('../../../../json/data'),
          rendererSettings: {
            context,
          },
        })
        this.inited = true
      }).exec()
      // this.ani.pause()  //结束动画
    },
    //获取设备的像素比
    getPixelRatio() {
      let pixelRatio = 0
      // wx.getSystemInfo({
      //   success: function (res) {
      //     pixelRatio = res.pixelRatio
      //   },
      //   fail: function () {
      //     pixelRatio = 0
      //   }
      // })
      if (app.globalData.pixelRatio) {
        pixelRatio = app.globalData.pixelRatio
      }
      return pixelRatio
    },
    // 判断图片大小
    onImgLoad(event) {
      const {
        width,
        height
      } = event.detail
      // console.log(width, height);
      let isBottle = (width / height).toFixed(2) < 0.75 ? true : false;
      this.setData({
        isWineBottle: isBottle
      })
    },
    showScanResult: function () {
      this.setData({
        showResult: true,
        identifying: 0,
        wineInfo: {},
      })
      this.inited = undefined
      this.data.timeOut = setTimeout(() => {
        this.init()
      }, 300)

    },
    hideScanResult: function () {
      this.setData({
        showResult: false,
        cameraImg: ''
      })
    },
    // 关闭弹窗
    onClose() {
      this.setData({
        showResult: false,
        cameraImg: ''
      })
      this.triggerEvent('cancel')
    },
    //授权获取手机号
    getUserProfile: function (e) {
      // console.log(this.data.isToken, 'token');
      this.triggerEvent('getAuthPhone', e)
    },
    //已有token跳转详情
    toDetail: function (e) {
      // console.log(this.data.isToken, 'token2222');
      this.triggerEvent('toDetail')
    },
    // 再次识别
    tryAgain() {
      // this.setData({
      //   identifying: 0
      // })
      this.setData({
        showResult: false,
        cameraImg: ''
      })
      this.triggerEvent('tryAgain')
      // this.inited = undefined
      // console.log(this.inited,'this.inited');
      // this.init()
    },
  },
  pageLifetimes: {
    hide: function() {
      // 页面被隐藏
      // 在这里进行清除计时器的操作
      clearTimeout(this.data.timeOut);
    },
  },
  lifetimes: {
    //在组件实例已移除页面节点树时执行
    detached: function () {
      ani = null
      // 销毁动画对象
      // this.ani.destroy()
      // 销毁页面时 关闭动画
      clearInterval(timer);
      clearTimeout(this.data.timeOut);
      // canvasDom.cancelAnimationFrame(rid);
      const timer = setInterval(() => {
        canvasDom
      }, 500);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。0
      clearInterval(timer);
    }
  }
})