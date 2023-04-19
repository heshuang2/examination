// pages/components/drawing/drawing.ts
// 绘制开始
let begin = false;
// 开始坐标 x y
let startX = 0,
  startY = 0;
// 存储线条  
let curDrawArr = [];
let drawInfos = [];
var lastCoord = null; // 记录画笔上一个坐标
let beginPosition = null; // 记录后续笔画的其实坐标

Component({
  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    context: null,
    // 画笔颜色
    currentColor: '#000',
    // 线条宽度
    curWidthIndex: 1,
  },
  lifetimes: {
    // 在组件实例刚刚被创建时执行
    created: function () {

    },
    // 在组件实例进入页面节点树时执行
    attached: function () {
      this.data.context = wx.createCanvasContext("firstCanvas", this);
      console.log(this.data.context);
      
      this.init();
      this.draw();

    },
    // 在组件实例被从页面节点树移除时执行
    detached: function () {
      this.setData({
        visible: false
      })
    },
  },
  methods: {
    handleDrawing() {
      this.setData({
        visible: !this.data.visible
      })
    },
    // 初始化
    init() {
      this.data.context.setLineCap('round'); // 让线条圆润
      this.data.context.strokeStyle = this.data.currentColor;
      this.data.context.setLineWidth(this.data.curWidthIndex);
      this.setData({
        currentColor: this.data.currentColor,
        curWidthIndex: this.data.curWidthIndex
      });
    },
    // 绘制canvas
    // isReverse: 是否保留之前的像素
    draw: function (isReverse = false, cb) {
      this.data.context.draw(isReverse, () => {
        if (cb && typeof (cb) == "function") {
          cb();
        }
      });
    },
    // 开始绘制线条
    lineBegin: function (x, y) {
      begin = true;
      this.data.context.beginPath()
      startX = x;
      startY = y;
      this.data.context.moveTo(startX, startY)
      this.lineAddPoint(x, y);
    },
    // 绘制线条中间添加点
    lineAddPoint: function (x, y) {
      this.data.context.moveTo(startX, startY)
      this.data.context.lineTo(x, y)
      this.data.context.stroke();
      startX = x;
      startY = y;
    },
    // 绘制线条结束
    lineEnd: function () {
      this.data.context.closePath();
      begin = false;
    },


    /*--------------------- UI事件 --------------------------------------------------- */
    // 绘制开始 手指开始按到屏幕上
    touchStart: function (e) {
      this.lineBegin(e.touches[0].x, e.touches[0].y);
      // this.recordPredictStroke(e.touches[0].x, e.touches[0].y);
      this.draw(true);
      curDrawArr.push({
        x: e.touches[0].x,
        y: e.touches[0].y
      });
    },
    // 绘制中 手指在屏幕上移动
    touchMove: function (e) {
      if (begin) {
        this.lineAddPoint(e.touches[0].x, e.touches[0].y);
        this.draw(true);
        curDrawArr.push({
          x: e.touches[0].x,
          y: e.touches[0].y
        });
      }
    },
    // 绘制结束 手指抬起
    touchEnd: function () {
      drawInfos.push({
        drawArr: curDrawArr,
        color: this.data.currentColor,
        lineWidth: this.data.curWidthIndex,
      });

      // 后续笔画的起始坐标
      beginPosition = [curDrawArr[curDrawArr.length - 1]['x'], curDrawArr[curDrawArr.length - 1]['y']];

      curDrawArr = [];
      this.lineEnd();
    },
    // 点击清空canvas
    clickClearAll: function () {
      this.draw();
      drawInfos = [];
      this.init();
    },
  },
})