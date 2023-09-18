// pages/scan/scan.js
import {
  scanWine,
  appletLogin, //登录
} from '../../api/api'
import {
  scanWineInfo, //扫酒记录
  getImgUrl //图片地址
} from '../../api/detail.js'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏高度
    navHeight: app.globalData.navHeight,
    // 导航栏距离顶部距离
    navTop: app.globalData.navTop,
    // 胶囊的高度
    navObj: app.globalData.navObj,
    // 胶囊宽度+距右距离
    navObjWid: app.globalData.navObjWid,
    sShowCamera: false,
    imgUrl: app.globalData.imgUrl,
    wineInfo: {},
    imgInfo: {}, // 图片弹窗
    cameraImg: '', //canvas转图片
    isShowImage: false,
    identifying: 0,
    system: app.globalData.system, //设备信息
    isToken: app.getToken(),
    timeOut: null, //定时器
    toView: '',
    scannedPhotoUUID: '', //扫描酒款返回的scannedPhotoUUID字段
    scrollLeft: 0
  },
  code: '', //手机号码code
  userInfoCode: '', //用户信息code
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.ctx = wx.createCameraContext(); //初始化 创建 camera 上下文 CameraContext 对象。
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // console.log('showwwwwwwwwww');
    this.scanResult = this.selectComponent(".scanResult");
    this.setData({
      isToken: app.getToken()
    })
    this.getUserCode()
    this.getIphoneCode()
    this.scanWineInfo()
    // this.authCamera()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // const self = this
    // clearTimeout(self.data.timeOut);
    // clearInterval(self)
  },
  onReady() {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    const self = this
    clearTimeout(self.data.timeOut);
    clearInterval(self)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  /**
   * 图片截取
   * 自定义计算位置  截取自己需要的那一部分图片
   */
  generate(imgSrc) {
    let that = this
    wx.createSelectorQuery()
      .select("#cover_image")
      .boundingClientRect((rect) => {
        wx.getImageInfo({
          src: imgSrc,
          success: function (res) {
            that.canvas = wx.createCanvasContext("myCanvas", that) //画布
            //过渡页面中，图片的路径坐标和大小
            that.canvas.drawImage(imgSrc, 0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight * 0.75)
            // that.canvas.setStrokeStyle('black')
            // that.canvas.strokeRect(rect.left, rect.top, rect.width, rect.height)
            that.canvas.draw()
            // setTimeout(function () {
            wx.canvasToTempFilePath({ //裁剪对参数
              canvasId: "myCanvas",
              x: rect.left, //画布x轴起点
              y: rect.top - wx.getSystemInfoSync().windowHeight * 0.066, //画布y轴起点
              width: rect.width, //画布宽度
              height: rect.height, //画布高度
              destWidth: rect.width, //输出图片宽度
              destHeight: rect.height, //输出图片高度
              success: function (res) {
                let imgInfo = {
                  tempFilePaths: res.tempFilePath
                }
                //清除画布上在该矩形区域内的内容。
                // that.canvas.clearRect(0, 0, that.data.width, that.data.height)
                // that.canvas.drawImage(res.tempFilePath, image_x, image_y, image_width, image_height)
                that.canvas.draw()
                // console.log(res.tempFilePath, 'ewsssss');
                that.setData({
                  canvasWidth: rect.width,
                  canvasHight: rect.height,
                  cameraImg: res.tempFilePath,
                  imgInfo: imgInfo
                })
                that.scanResult.showScanResult()
                that.scanWine()
              }
            })
            // }, 1000);
          }
        })
      })
      .exec();
  },
  /**
   * 拍照
   */
  takePhotoAction: function () {
    var that = this
    that.ctx.takePhoto({
      quality: 'medium', //质量
      success: (res) => {
        that.generate(res.tempImagePath);
        // console.log(res, 'takePhotoAction');
      },
    })
  },
  // 图库选择
  chooseImg() {
    let that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'], //只打开相册
      success: function (res) {
        // console.log(res, 'chooseImage');
        let imgInfo = {
          tempFilePaths: res.tempFiles[0].tempFilePath,
        }
        that.setData({
          cameraImg: res.tempFiles[0].tempFilePath,
          imgInfo: imgInfo
        })
        that.scanResult.showScanResult()
        that.scanWine()
        // 裁剪图片
        // wx.editImage({
        //   src: res.tempFiles[0].tempFilePath, // 图片路径
        //   success: function (res) {
        //     console.log(res, 'dddddccccc');
        //     let imgInfo = {
        //       tempFilePaths: res.tempFilePath,
        //     }
        //     that.setData({
        //       cameraImg: res.tempFilePath,
        //       imgInfo: imgInfo
        //     })
        //     that.scanResult.showScanResult()
        //     that.scanWine()
        //   }
        // })
      }
    })
  },
  // 查看教程
  seeTutorial() {
    wx.navigateTo({
      url: '/pages/scan/videoView/videoView',
    })
  },
  // 跳转详情
  toDetail(e) {
    // console.log(e,'ddddd');
    let uuid = e.currentTarget.dataset.item.wineUUID
    let scanImg = e.currentTarget.dataset.item.scannedImageUrl
    let scannedPhotoUUID = e.currentTarget.dataset.item.scannedImageUUID
    let date = e.currentTarget.dataset.item.createdAt.split(" ");
    let scanDate = date[0]
    // let uuid = "139a3308-4617-11ec-8373-066b4187bf04"
    this.scanResult.hideScanResult()
    wx.navigateTo({
      url: `/pages/detail/index/index?uuid=${uuid}&scanImg=${scanImg}&scannedPhotoUUID=${scannedPhotoUUID}&scanDate=${scanDate}`
    })
  },
  // 返回
  handleBackClick() {
    // console.log("reLaunch");
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }, 100)
  },
  // 扫酒记录
  scanWineInfo() {
    // console.log(this.data.isToken, 'token');
    if (this.data.isToken) {
      scanWineInfo().then(res => {
        if (res.code == 200) {
          this.setData({
            imgarr: res.data.items.reverse(),
            scrollLeft: 2000
          })
          // 获取scroll-view内容宽度
          // const query = wx.createSelectorQuery().in(this);
          // query.select('.scrolls').boundingClientRect(rect => {
            // this.setData({
              // scrollLeft: rect.width
            //   scrollLeft: 2000
            // })
          // }).exec();
          // this.getImageZip(res.data.items)
        }
        // this.queryDel()
      })
    }
  },
  // 调用压缩图片接口
  getImageZip(arr) {
    var that = this;
    that.data.imgarr.forEach((item, index) => {
      getImgUrl(item.scannedImageUUID).then(resimg => {
        if (resimg.code == 200) {
          that.setData({
            [`imgarr[${index}].imgzip`]: resimg.data,
            // scrollLeft: 2000
          })
        }
      })
    })
  },
  // 扫酒结果
  scanWine() {
    let that = this
    // 将图片上传到服务器
    wx.uploadFile({
      url: app.globalData.scanWine, // 上传的服务器地址
      filePath: that.data.imgInfo.tempFilePaths, // 图片的本地地址
      header: {
        "content-type": "multipart/form-data",
        "token": app.getToken()
      },
      name: 'file', // 服务端用于接收文件的参数名
      success: function (res) {
        let data = JSON.parse(res.data)
        // 上传成功
        if (data.code == 200) {
          var wine = data.data.items[0].wine
          getImgUrl(wine.img).then(resimg => {
            if (resimg.code == 200) {
              wine.imgzip = resimg.data
              that.setData({
                identifying: 1,
                wineInfo: wine,
                scannedPhotoUUID: data.data.items[0].scannedPhotoUUID
              })
            }
          })
        }
        if (data.code == 302) {
          that.setData({
            identifying: 2,
          })
        }
      }
    })
  },
  // 关闭识别结果弹窗
  handleCancel() {
    this.setData({
      cameraImg: ''
    })
  },
  // 识别结果 --再试一次
  handleAgain() {
    this.setData({
      cameraImg: ''
    })
    this.scanResult.hideScanResult()
  },
  // 识别结果弹窗 --跳转详情
  handleToDetail() {
    // console.log('ttttt');
    let uuid = this.data.wineInfo.uuid
    let scannedPhotoUUID = this.data.scannedPhotoUUID
    let scanDate = app.formatData(new Date())
    // let scanImg = e.currentTarget.dataset.item.img
    // let uuid = "139a3308-4617-11ec-8373-066b4187bf04"
    this.setData({
      cameraImg: ''
    })
    this.scanResult.hideScanResult()
    wx.navigateTo({
      url: `/pages/detail/index/index?uuid=${uuid}&scannedPhotoUUID=${scannedPhotoUUID}&scanDate=${scanDate}`,
    })

  },
  // 识别结果弹窗 --授权
  handleAuthPhone(e) {
    var that = this
    that.getUserCode()
    that.getIphoneCode()
    wx.getUserInfo({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        var ency = res.encryptedData;
        var iv = res.iv;
        if (iv == null || ency == null) {
          wx.showToast({
            title: "授权失败,请重新授权！",
            icon: 'none',
          })
          return false
        } else {
          var userInfo = {
            iv: iv,
            encryptedData: ency,
            code: that.userInfoCode
          }
        }
        if (e.detail.detail.iv == null || e.detail.detail.encryptedData == null) {
          that.getUserCode()
          that.getIphoneCode()
          wx.showToast({
            title: "授权失败,请重新授权！",
            icon: 'none',
          })
          return false
        } else {
          let userPhone = {
            iv: e.detail.detail.iv,
            encryptedData: e.detail.detail.encryptedData,
            code: that.code
          }
          let params = {
            userInfo: userInfo,
            userPhone: userPhone,
            system: that.data.system
          }
          appletLogin(params).then(res => {
            if (res.code == 200) {
              this.setData({
                cameraImg: ''
              })
              this.scanResult.hideScanResult()
              // console.log(res.data, 'dacccc');
              wx.setStorageSync('token', res.data)
              let uuid = that.data.wineInfo.uuid
              // let uuid = "139a3308-4617-11ec-8373-066b4187bf04"
              wx.navigateTo({
                url: '/pages/detail/index/index?uuid=' + uuid,
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.message,
                showCancel: false,
                confirmText: "重新登录",
                success(res) {
                  if (res.confirm) {
                    that.getUserCode()
                    that.getIphoneCode()
                    // console.log('用户点击确定')
                    that.setData({
                      cameraImg: ''
                    })
                    that.scanResult.hideScanResult()
                  }
                }
              })
            }
          })
        }
      },
    })
  },
  // 获取用户信息code
  getUserCode() {
    getApp().login().then(loginRes => {
      this.userInfoCode = loginRes.code
    })
  },
  // 获取手机号码code
  getIphoneCode() {
    getApp().login().then(loginRes => {
      this.code = loginRes.code
    })
  },

})