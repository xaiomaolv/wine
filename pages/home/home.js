import {
  getPlatform,
  getAppletImgList
} from '../../api/api'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // imglist: [],
    randomImage: '', // 随机图片
    showAgree: false,
    toScanAgree: false, //是否同意隐私协议
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    const self = this
    clearInterval(self)
    clearTimeout(self)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let that = this
    // 获取本地存储中的数据 
    const imageHomeList = wx.getStorageSync('imageHomeList');
    // console.log(imageHomeList,'imageHomeList');
    // 判断
    if (!imageHomeList) {
      // 不存储旧数据  调用请求
      this.getAppletImgList();
    } else {
      this.imageHomeList = imageHomeList;
      // this.setData({
      //   imageHomeList
      // });
      this.getrandomImage(this.imageHomeList)
    }
    // 获取图片列表
    // that.getAppletImgList()
    that.agreement = that.selectComponent(".agreement");
  },
  // 用户同意隐私协议
  agree(e) {
    // console.log("用户同意隐私授权, 接下来可以调用隐私协议中声明的隐私接口")
    wx.navigateTo({
      url: '/pages/scan/scan',
    })
  },
  // 用户拒绝隐私协议
  disagree(e) {
    // console.log("用户拒绝隐私授权, 未同意过的隐私协议中的接口将不能调用")
  },
  getrandomImage(img) {
    // 随机选择一张图片
    let randomIndex = Math.floor(Math.random() * img.length);
    this.setData({
      randomImage: img[randomIndex]
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 获取图片信息
  getAppletImgList() {
    getAppletImgList().then(res => {
      // this.setData({
      //   imglist: res.data
      // })
      this.getrandomImage(res.data)
      wx.setStorageSync('imageHomeList', res.data)
    })
  },
  // 跳转识别酒款
  toScan() {
    let that = this
    that.selectComponent('#privacyPopup').openPrivacyPopup();
  },
  // 协议查看
  seeAgreement(e) {
    let that = this
    that.agreement.showlog()
    this.setData({
      showAgree: true
    })
  },
  // 确认阅读
  handConfirm() {
    this.setData({
      showAgree: false
    })
  },
  // 关闭
  handCancel() {
    this.setData({
      showAgree: false
    })
  },
})