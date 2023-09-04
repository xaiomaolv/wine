/**
 * 登录
 */
const login = function () {
  return new Promise((resolve, reject) =>
    wx.login({
      success: resolve,
      fail: reject
    })
  )
}

const log = function (msg, ...objs) {
  if (getApp().loggerEnable) {
    console.info(msg, ...objs)
  }
}

const info = function (msg, ...objs) {
  if (getApp().loggerEnable) {
    console.info(msg, ...objs)
  }
}
const warn = function (msg, ...objs) {
  if (getApp().loggerEnable) {
    console.info(msg, ...objs)
  }
}

const error = function (msg, ...objs) {
  if (getApp().loggerEnable) {
    console.info(msg, ...objs)
  }
}

//返回上一页并传参数 num::自定义页数 params：参数 Object 不传默认为null
const goBack = function (num, params) {
  let pages = getCurrentPages();
  let prevPage = pages[pages.length - (num + 1)];
  if (params) {
    //调用上一个页面的setData 方法，将数据存储
    prevPage.setData(params)
  }
  wx.navigateBack({
    delta: num,
    success: function () {
      // beforePage.onShow({})
    }
  })
}
//获取上一页传回的参数 
const getPrevPageData = function (num, params) {
  const pages = getCurrentPages()
  const currPage = pages[pages.length - 1] // 当前页
  return currPage.data
}
const formatNumber = function(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//获取系统当前时间
const formatData = function (date){
  // var date = new Date();
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
 
  return [year, month, day].map(formatNumber).join('-')
}
/*函数节流*/
function throttle(fn, interval) {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 1500 ;//间隔时间，如果interval不传，则默认300ms
  return function() {
    var context = this;
    var backTime = new Date();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context,arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 1500;//间隔时间，如果interval不传，则默认1000ms
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context,args);
    }, gapTime);
  };
}

function getRect(selector) {
  console.log(selector,'selector');
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery().in(this);
    query.select(selector).boundingClientRect(rect => {
      console.log(rect,'rect');
      if (!rect) {
        reject(new Error('获取元素rect失败'));
      }
      resolve(rect);
    }).exec();
  })
}

export default { login, log, info, warn, error, goBack, getPrevPageData, formatData, throttle, debounce, getRect}