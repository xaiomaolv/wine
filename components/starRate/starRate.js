// components/starRate/starRate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 要展示的评分
    remark_num: {
      type: Number,
      value: '',
    },
    iconStyle: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 整颗星的个数
    int: "",
    // 非整颗星的百分比
    percent: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
   // 在组件实例进入页面节点树时执行
    attached: function () {
      var _this = this;
      var int = Math.floor(_this.data.remark_num); // 向下取整-得到整颗星的个数
      var percents = (_this.data.remark_num - int) * 100; // 非整颗星的百分比
      let percent = percents + '%'
      _this.setData({
        int: int,
        percent: percent,
      })
    }
  }
})