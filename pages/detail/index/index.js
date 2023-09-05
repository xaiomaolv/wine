// pages/detail/index/index.js
import {
  getDetailInfo, //详情
  getDetailPageVideo, //品酒视频
  getDecanterTime, // 醒酒时间
  queryMyVintageCommentLog, //我的日志
  getVintageCommentInfo, //点评笔记
  getWineryTop, //酒庄最佳酒款
} from '../../../api/detail.js'
const app = getApp();
Page({
  data: {
    isShowNav: false, //是否显示顶部导航
    isShowBtn: true, //是否显示左侧按钮
    backgroundColor: '#B81728', //背景颜色
    navTitle: '酒款详情页', //标题
    isWhite: true, //是否白色胶囊
    titleColor: 'white', //字体颜色
    // 导航栏高度
    navBarHeight: app.globalData.navBarHeight,
    // 导航栏距离顶部距离
    navTop: app.globalData.navTop,
    // 胶囊的高度
    navObj: app.globalData.navObj,
    // 胶囊宽度+距右距离
    navObjWid: app.globalData.navObjWid,
    // ————————吸顶tab————————//
    toView: '',
    activeIndex: 0,
    // customStyle:{
    //   width:560rpx,margin:auto;width:560rpx;margin:auto;
    // },
    markdownHeight: 0,
    isHidden: false,
    scrollLock: false, //滑动枷锁
    isScroll: '',
    detailInfo: {},
    // 图片地址
    imgUrl: app.globalData.imgUrl,
    // ————————————//
    // 背景图
    wine_bg: '',
    // 推荐年份
    recomeYear: [],
    // 编者注
    wineEditorNotes: [],
    // 简介
    blurbCurrent: '0',
    blurbHight: ['亮点', '标签'],
    // 点评笔记
    commentInfo: {},
    // 评价
    // evaluateHight: ["参考酒评", "最新", "朋友"],
    evaluateHight: [],
    // 评价
    evaluateCurrent: 0,

    // 评酒视频
    videoList: [],
    coverdisplay: 'none',
    wineryTopList: [], //最佳酒款
    // 评分组件开始
    isStartRate: false,
    // 醒酒时间
    DecanteList: [],
    // 推荐场合
    recommendList: [],
    isShowBlurb: false, //展开收缩
    locationMap: {
      latitude: 44.7,
      longitude: 8.03
    },
    articleEdit: {}, //编者注
    isOpen: false,
    isFold: false, // 是否显示'展开' 默认不显示
    // 口味特征
    wineCharacteristicsVO: {},
    // 风味描述
    flavorsWebVOS: [],
    // 食物搭配
    wineFoodsList: [],
    // 国旗
    countryCode: '',
    isWineBottle: false, //是否是红酒瓶
    wineryId: '', //酒庄id
    wineUUID: '',
    showBottle: false, //酒瓶展示切换
    timeOut: null, //定时器,
    scrollTop: '',
    scannedPhotoUUID: '',
    // isLoad: false
  },
  rateCardHeight: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options,'options');
    let that = this

    if (options) {
      let wineUuid = options.uuid ? options.uuid : ''
      // let wineryId = options.wineryId
      that.setData({
        scanImg: options.scanImg ? options.scanImg : '',
        wineImg: options.wineImg ? options.wineImg : '',
        scanDate: options.scanDate ? options.scanDate : '',
        scannedPhotoUUID: options.scannedPhotoUUID ? options.scannedPhotoUUID : '',
        wineUUID: wineUuid
      })
      that.detailInfo(wineUuid) //详情
      that.getVintageCommentInfo(wineUuid) //点评笔记
    }
    // console.log(that.data,'data');
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // // setData 性能监听
    // this.setUpdatePerformanceListener({withDataPaths: true}, (res) => {
    //   console.log(res,'res');
    //   // 更新运算结束时的时间戳，更新运算开始时的时间戳，此次更新进入等待队列时的时间戳
    //   const { updateStartTimestamp, updateEndTimestamp, pendingStartTimestamp, dataPaths = [] } = res;
    //   const cost = updateEndTimestamp - updateStartTimestamp;
    //   const waiting = updateStartTimestamp - pendingStartTimestamp;
    //   console.log({ duration: cost, waiting, from: this.is, dataPaths });
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let that = this
    that.navTabs = that.selectComponent(".navtabs");
    that.showDownApp = that.selectComponent(".downApp");
    that.scanImgCom = that.selectComponent(".scanImgCom");
    // if (this.data.wineUUID) {
    //   that.detailInfo(this.data.wineUUID) //详情
    //   that.getVintageCommentInfo(this.data.wineUUID) //点评笔记
    // }

    // // 返回页面带参数处理
    // const cutPage = getCurrentPages();
    // const list = cutPage.map(item => item.route)
    // // .filter(item => item == 'pages/detail/index/index')

    // // 上一页返回带的参数
    // let prevPageParams = app.getPrevPageData().params
    // console.log(prevPageParams, 'prevPageParams回退');
    // if (prevPageParams) {
    //   this.setData({
    //     wineUUID: prevPageParams.uuid,
    //   })
    //   that.detailInfo(prevPageParams.uuid)
    //   that.getVintageCommentInfo(prevPageParams.uuid) //点评笔记
    // }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // let that = this
    // clearTimeout(that.data.timeOut);
    // that.rateCardHeight = 0,
    //   // console.log('hhide')
    //   that.setData({
    //     scannedPhotoUUID: '',
    //     scrollTop: 0,
    //     // isLoad: true,
    //     detailInfo: {},
    //     wine_bg: '',
    //     // scanImg: '',
    //     "locationMap.latitude": null,
    //     "locationMap.longitude": null,
    //     wineCharacteristicsVO: null,
    //     flavorsWebVOS: [],
    //     wineFoodsList: [],
    //     wineEditorNotes: [],
    //     wineryId: '',
    //     isStartRate: false,
    //     isWineBottle: false,
    //     showBottle: false,
    //     commentInfo: {},
    //     evaluateHight: [],
    //     evaluateCurrent: 0
    //   })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    let that = this
    // that.rateCardHeight = 0,
    clearTimeout(that.data.timeOut);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 详情页信息
  detailInfo(uuid) {
    let that = this
    let params = {
      wineUUID: uuid
    }
    getDetailInfo(params).then(res => {
      if (res.code == 200) {
        that.setData({
          detailInfo: res.data,
          wine_bg: res.data.background,
          "locationMap.latitude": res.data.wineryRegionLatitude ? res.data.wineryRegionLatitude : null,
          "locationMap.longitude": res.data.wineryRegionLongitude ? res.data.wineryRegionLongitude : null,
          wineCharacteristicsVO: res.data.wineCharacteristicsVO.avg ? res.data.wineCharacteristicsVO.avg : null,
          flavorsWebVOS: res.data.flavorsWebVOS ? res.data.flavorsWebVOS : [],
          wineFoodsList: res.data.wineFoodsList ? res.data.wineFoodsList : [],
          wineEditorNotes: res.data.wineEditorNotes ? res.data.wineEditorNotes : [],
          wineryId: res.data.wineryId,
          isStartRate: true
        })
        //获取锚点的节点信息
        that.slideAnchor(res.data);
        that.getRateCardHeight()
        that.data.timeOut = setTimeout(function () {
          if (that.data.wineEditorNotes.length > 0) {
            that.editCard()
            that.editMarkdown()
          }
        }, 100)
        // console.log(res, 'wineUUID=139a3308-4617-11ec-8373-066b4187bf04');
        // that.getWineryTop(that.data.wineryId) //最佳酒款
      } else {
        wx.showModal({
          title: '提示',
          content: res.message,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })

      }
    })
  },
  // 点评笔记
  getVintageCommentInfo(uuid) {
    let params = {
      // wineUUID: '1397b48c-4617-11ec-8373-066b4187bf04'
      wineUUID: uuid
    }
    getVintageCommentInfo(params).then(res => {
      // console.log(res, 'getVintageCommentInfo');
      if (res.code == 200) {
        let evaluateHight = []
        if (res.data.referenceList.length > 0) {
          evaluateHight.push({
            name: '参考酒评',
            type: '0'
          })
        }
        if (res.data.newList.length > 0) {
          evaluateHight.push({
            name: '最新',
            type: '1'
          })
        }
        if (res.data.friendList.length > 0) {
          evaluateHight.push({
            name: '朋友',
            type: '2'
          })
        }
        this.setData({
          commentInfo: res.data,
          evaluateHight: evaluateHight,
          evaluateCurrent: evaluateHight.length > 0 ? evaluateHight[0].type : 0
        })
      }

    })
  },

  // 编者注计算markdown高度
  editMarkdown() {
    // console.log("markdown");
    let that = this
    let query = wx.createSelectorQuery();
    query.select('.content').boundingClientRect();
    query.exec(function (rect) {
      if (rect[0] === null) {
        that.setData({
          markdownHeight: 0
        })
        return
      } else if (rect[0].height > 320) { // 自定义一个边界高度
        that.setData({
          isFold: true,
          markdownHeight: rect[0].height - 320
        })
      }
    })
  },
  // 编者注点击展开或收起
  open() {
    this.setData({
      isOpen: this.data.isOpen ? false : true
    })
  },
  // // 返回
  handleBackClick(e) {
    app.goBack(1)
  },
  // //markdown展示
  editCard() {
    let markdown = this.data.wineEditorNotes.length > 0 ? this.data.wineEditorNotes[0].editorNote : ""
    let obj = app.towxml(markdown, 'markdown', {
      theme: 'light', //主题 dark 黑色，light白色，不填默认是light
      base: "www.xxx.com",
      events: { //为元素绑定的事件方法
        tap: e => {
          if (e.currentTarget.dataset.data && e.currentTarget.dataset.data.attr && (e.currentTarget.dataset.data.attr.class == "h2w__p")) {}
          // console.log('tap', e);
        },
        change: e => {
          // console.log('todo', e);
        }
      }
    });
    //更新解析数据
    this.setData({
      articleEdit: obj,
    });
  },
  // 简介按钮高亮切换
  handleClick(e) {
    this.setData({
      blurbCurrent: e.target.dataset.blurbid
    })
  },
  // 评价按钮高亮切换
  evaluateBtnClick(e) {
    this.setData({
      evaluateCurrent: e.target.dataset.evaluateid
    })
  },
  // tab滑
  //获取锚点的节点信息
  slideAnchor(e) {
    // console.log(e, 'eeeeeeeeeeeeeeeeeee');
    let that = this
    let wineVOList = e.wineVOList ? e.wineVOList : []
    new Promise(resolve => {
      let query = wx.createSelectorQuery().in(that);
      query.select('#blurbCard').boundingClientRect();
      query.select('#evaluateCard').boundingClientRect();
      query.select('#tasteCard').boundingClientRect();
      wineVOList.length > 0 ? query.select('#likeCard').boundingClientRect() : '';
      query.exec(function (res) {
        resolve(res);
      });
    }).then(res => {
      const windowHeight = wx.getSystemInfoSync().windowHeight;
      let heightArray = [],
        topArray = [];
      res.forEach(rect => {
        // console.log(rect,'rect');
        let top = Math.floor(rect.top)
        heightArray.push(top);
        topArray.push(rect.height)
      });
      that.setData({
        scrollHeight: windowHeight,
        heightArray,
        topArray,
        scrollLock: true,
        isScroll: true,
      });
    });
  },
  // 获取ratecard的top
  getRateCardHeight() {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#rateCard').boundingClientRect()
    query.exec(function (res) {
      // console.log(res, 'rate');
      that.rateCardHeight = res[0].top
    })
  },

  //点击锚点跳转
  jumpTo: function (e) {
    let that = this
    let target = e.detail.item.opt;
    let activeIndex = e.detail.item.type;
    let {
      topArray,
      scrollHeight,
      isHidden
    } = that.data;
    let numHeight = 0;
    //计算当前锚点是否能根据tab的点击至顶部
    for (var i = activeIndex; i < topArray.length; i++) {
      numHeight += topArray[i]
    }
    isHidden = target === 'blurbCard' ? false : isHidden;
    that.setData({
      toView: target,
      activeIndex,
      isHidden,
      scrollLock: numHeight >= scrollHeight ? true : false //如果界面出现锚点位置过低的情况防止tab的active回弹
    })
  },

  //scroll-view滚动监听事件
  toScroll: app.throttle(function (e) {
    // console.log(this.rateCardHeight,'rateCardHeight');
    let that = this
    const {
      heightArray,
      scrollLock,
      toView
    } = that.data;
    let rateCardHeight = that.rateCardHeight
    let scrollTop = e[0].detail.scrollTop;
    let isHidden = scrollTop >= heightArray[0] ? true : false; //控制tab显示与隐藏
    let isShowNav = scrollTop >= rateCardHeight ? true : false; //控制topnav显示与隐藏
    if (that.data.isShowNav != isShowNav) {
      that.setData({
        isShowNav
      })
    }
    // that.data.isShowNav = that.data.isShowNav != isShowNav ? isShowNav : that.data.isShowNav
    if (that.data.isHidden != isHidden) {
      that.setData({
        isHidden,
        toView: '',
        activeIndex: 0,
      })
    }
    //锚点高度足够时，滑动到相应的位置，tab的active发生相应的改变
    if (scrollLock) {
      let len = heightArray.length;
      let lastIndex = len - 1;
      let activeIndex = 0;
      for (let i = 0; i < len; i++) {
        if (scrollTop >= 0 && scrollTop < heightArray[0]) {
          activeIndex = 0;
        } else if (scrollTop >= heightArray[i] && scrollTop < heightArray[i + 1]) {
          activeIndex = i;
        } else if (scrollTop >= heightArray[lastIndex]) {
          activeIndex = lastIndex;
        }
      }
      that.setData({
        activeIndex
      })
    }
  }, 100),
  //停止滚动，防止锚点位置过低，界面滚动时无效的情况
  endScroll: function (e) {
    this.setData({
      scrollLock: true
    });
  },
  // 扫码
  toScan() {
    wx.redirectTo({
      url: '/pages/scan/scan',
    })
  },
  // 发布动态
  toDownApp() {
    wx.navigateTo({
      url: '/pages/detail/downApp/downApp',
    })
  },
  //展开收缩
  listToggle: function () {
    this.setData({
      isShowBlurb: !this.data.isShowBlurb
    })
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
      // showBottle: event.detail.showBottle,
      // isWineBottle: event.detail.isWineBottle,
      showBottle: true,
      isWineBottle: isBottle
    })
  },
  // 扫描图片评价、编辑
  toscanImg(e){
    let that = this
    that.scanImgCom.toSimilar()
  }
})