// components/navTabs/navTabs.js
const tools = require('../../utils/tools');
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    wineVOList: {
      type: Array
    },
    customStyle: {
      type: String,
      value: ''
    },

    active: {
      type: Number,
      value: 0,
      observer(val) {
        this.change(val);
      }
    },
    scrollable: {
      type: Boolean,
      value: true
    }
  },
  data: {
    list:[
      {
        name: "详情",
        opt: 'blurbCard',
        type: 0
      }, {
        name: "评价",
        opt: 'evaluateCard',
        type: 1
      }, {
        name: "攻略",
        opt: 'tasteCard',
        type: 2
      },
      //  {
      //   name: "推荐",
      //   opt: 'likeCard',
      //   type: 3
      // }
    ],
    scrollLeft: 0,
    currentIndex: 0,
    lineOffsetLeft: 0,
    lineWidth: 20
  },
  lifetimes: {
    //在组件在视图层布局完成后执行
    ready: function () {
      let that = this;
      // console.log(this.data.wineVOList,'this.data.wineVOList');
      if (this.data.wineVOList.length > 0) {
        that.data.list.push({
          name: "推荐",
          opt: 'likeCard',
          type: 3
        })
      }
      this.setData({
        list:that.data.list,
        currentIndex: this.data.active,
        scrollable: this.data.list.length <= 5 ? false : true
      }, function () {
        const currentIndex = that.data.currentIndex;
        Promise.all([
          tools.getAllRect(this, '.cl-tab'),
          tools.getRect(this, '.cl-tabs__line'),
        ]).then(([rects = [], lineRect]) => {
          const rect = rects[currentIndex];
          if (rect == null) {
            return;
          }
          let lineOffsetLeft = rects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
          lineOffsetLeft += (rect.width - lineRect.width) / 2;
          that.setData({
            lineOffsetLeft
          });
        });
      });
    }
  },
  methods: {
    //切换组件
    swich: function (e) {
      const {
        data
      } = this;
      const currentIndex = e.currentTarget.dataset.index;
      const item = e.currentTarget.dataset.item;
      if (currentIndex === data.currentIndex) {
        return;
      }
      const shouldEmitChange = data.currentIndex !== null;
      this.setData({
        currentIndex
      });
      tools.nextTick(() => {
        this.resize(false);
        this.scrollIntoView();
        if (shouldEmitChange) {
          //绑定事件到change
          this.triggerEvent('change', {
            index: currentIndex,
            item: item
          })
        }
      });
    },
    change: function (index) {
      this.setData({
        currentIndex: index
      }, () => {
        this.resize(false);
        this.scrollIntoView();
      })
    },
    resize() {
      const {
        currentIndex
      } = this.data;
      Promise.all([
        tools.getAllRect(this, '.cl-tab'),
        tools.getRect(this, '.cl-tabs__line'),
      ]).then(([rects = [], lineRect]) => {
        const rect = rects[currentIndex];
        if (rect == null) {
          return;
        }
        let lineOffsetLeft = rects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
        lineOffsetLeft += (rect.width - lineRect.width) / 2;
        this.setData({
          lineOffsetLeft
        });
      });
    },
    scrollIntoView() {
      const {
        currentIndex,
        scrollable
      } = this.data;
      if (!scrollable) {
        return;
      }
      Promise.all([
        tools.getAllRect(this, '.cl-tab'),
        tools.getRect(this, '.cl-tabs-nav'),
      ]).then(([tabRects, navRect]) => {

        const tabRect = tabRects[currentIndex];
        const offsetLeft = tabRects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width, 0);
        this.setData({
          scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2,
        });
      });
    },
  }
})