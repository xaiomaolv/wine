// components/gauage/gauage.js
import * as echarts from "../echarts/echarts"
const app = getApp();
// 价值体系计算
function getLevelValue(level) {
  if (level == null || typeof (level) == "undefined" || level == "") {
    return 0;
  }
  const prefix = level.substring(0, 1);
  let subLevel = parseInt(level.substring(2));
  let baseValue;
  switch (prefix) {
    case 'C':
      baseValue = 0;
      break;
    case 'B':
      baseValue = 5;
      break;
    case 'A':
      baseValue = 10;
      break;
    default:
      baseValue = 0;
  }
  if (subLevel < 1 || subLevel > 5) {
    subLevel = 0;
  }
  return baseValue + subLevel;
}

function setOption(wineLevelNum, wineLevel) {
  const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
      offset: 0,
      color: '#F5D683', // 0% 处的颜色
    },
    {
      offset: 0.5,
      color: '#D5965B', // 100% 处的颜色
    },
    {
      offset: 1,
      color: '#B65C4D', // 100% 处的颜色
    },
  ])
  const option = {
    series: [{
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '100%',
        splitNumber: '41',
        axisLine: {
          // 仪表背景颜色，这是是渐变
          lineStyle: {
            width: 40,
            color: [
              [1, color]
            ],
          },
        },
        axisLabel: {
          // 刻度文字 如数字
          show: false,
          // fontSize: 14,
          // lineHeight: 20,
          // color: '#999999',
          // distance: 35,
          // formatter: function (value) {
          //   return ''
          // }
        },
        axisTick: {
          // 刻度，不展示
          show: false,
        },
        pointer: {
          // 指针
          show: false,
        },
        splitLine: {
          // 分割线
          show: true,
          length: 90,
          distance: -90,
          lineStyle: {
            width: 6,
            color: '#ffffff',
          },
        },
        anchor: {
          // 指针下那个圈
          show: false,
        },
      },
      {
        name: '内圈',
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 15,
        radius: '72%',
        // 进度条
        progress: {
          show: false,
        },
        // 刻度基础条
        axisLine: {
          lineStyle: {
            width: 5,
            color: [
              [1, '#e8e8e8']
            ],
          },
        },
        // 刻度
        axisTick: {
          show: false,
        },
        // 刻度标签
        axisLabel: {
          show: false,
        },
        // 分割线
        splitLine: {
          show: false,
        },
        title: {
          offsetCenter: [0, '40%'],
          fontSize: 35,
          fontWeight: 'bolder'
        },
        pointer: {
          // 指针
          length: '70%',
          width: 10,
          itemStyle: {
            color: '#B81728',
          },
        },
        anchor: {
          // 指针下那个圈
          show: true,
          showAbove: true,
          size: 20,
          itemStyle: {
            borderWidth: 8,
            borderColor: '#B81728',
          },
        },
        // 中间显示的数字
        detail: {
          show: false,
          fontSize: 35,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + '';
          },
          color: 'inherit'
        },
        data: [{
          value: wineLevelNum,
          name: wineLevel
        }]
      },
    ]
  }
  return option
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    wineLevel: {
      type: String,
      value: ''
    },
    wineLevelDes: {
      type: String,
      value: ''
    },
    isshowChart: { // 是否首次加载
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ecGauage: {
      lazyLoad: true,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initCharts: function (wineLevelNum, wineLevel) {
      //获取像素比
      const getPixelRatio = () => {
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
      }
      var dpr = getPixelRatio()
      // 上述代码是wx获取设备的像素值 dpr
      this.ecComponent.init((canvas, width, height, dpr) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        let value = wineLevelNum
        chart.clear(); //清空ECharts
        chart.setOption(setOption(value, wineLevel));
        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        this.chart = chart;
        chart.resize({
          width: 400,
          height: 320
        })
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    },
  },
  lifetimes: {
    //在组件在视图层布局完成后执行
    ready: function () {
      this.ecComponent = this.selectComponent('#echarts');
      // this.isshowChart ? this.initCharts(getLevelValue(this.data.wineLevel), this.data.wineLevel):'' ;
      this.initCharts(getLevelValue(this.data.wineLevel), this.data.wineLevel);
      // console.log(getLevelValue(this.data.wineLevel), 'getLevelValue(this.data.wineLevel)');
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      this.chart.clear(); //清空ECharts
      // this.ecComponent = null
      // this.echarts = null
    },
  }
})