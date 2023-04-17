// pages/components/drawing/drawing.ts
const systemInfo = wx.getSystemInfoSync()
const screenWidth = systemInfo.screenWidth
const screenHeight = systemInfo.screenHeight

Component({
  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    context: null,
    bufferContext: null,
    paths: [],
    currentPath: null,
    isDrawing: false,
    isUndoable: false,
    isRedoable: false,
    lastX: 0,
    lastY: 0,
    cacheData: null
  },
  lifetimes: {
    // 在组件实例刚刚被创建时执行
    created: function () {

    },
    // 在组件实例进入页面节点树时执行
    attached: function () {
      this.initPainterboard();
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
    // 初始化绘画板
    initPainterboard() {
      const context = wx.createCanvasContext('canvas', this);
      context.lineCap = 'round';
      context.lineWidth = 1;
       // 初始化双缓冲
      const bufferContext = wx.createCanvasContext('tempCanvas', this);
      
      bufferContext.lineCap = 'round';
      bufferContext.lineWidth = 1;
      this.setData({
        context: context,
        bufferContext: bufferContext
      })

    },
    touchStart(e) {
      const x =  e.changedTouches[0].x;
      const y = e.changedTouches[0].y;
      this.setData({
        isDrawing: true,
        currentPath: { color: '#000', lineWidth: 1, points: [{ x: x, y: y }] },
        lastX: x,
        lastY: y
      })
      this.data.context.beginPath();
      this.data.context.moveTo(x, y);
    },

    touchMove(e) {
      if (!this.data.isDrawing) {
        return
      }
      const x = e.changedTouches[0].x;
      const y = e.changedTouches[0].y;
      const { bufferContext, currentPath, lastX, lastY } = this.data;
      this.data.context.lineTo(x, y);
      this.data.context.stroke();

      // this.drawPath(currentPath, this.data.lastX, this.data.lastY, x, y)
      this.setData({
        currentPath: currentPath,
        isUndoable: true,
        lastX: x,
        lastY: y,
      })

      this.draCache();
    },

    touchEnd(e) {
      if (!this.data.isDrawing) {
        return
      }
      this.saveCache()
      // const x = e.changedTouches[0].x;
      // const y = e.changedTouches[0].y;
      // // context.drawImage(bufferContext,)
      // this.setData({
      //   isDrawing: false,
      //   paths: [...this.data.paths, currentPath],
      //   currentPath: null,
      //   isUndoable: true,
      //   isRedoable: false,
      // })
    },
    // 绘制路径
    drawPath(path) {
      const context = this.data.context
      context.beginPath()
      context.strokeStyle = path.color
      context.lineWidth = path.lineWidth
      path.points.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y)
        } else {
          context.lineTo(point.x, point.y)
        }
      })
      context.stroke()
      context.draw(true)
    },
    draCache() {
      const {lastX, lastY, bufferContext, context} = this.data;
      bufferContext.clearRect(0, 0, 1000,  1000);
      bufferContext.beginPath();
      bufferContext.moveTo(lastX, lastY);
      bufferContext.lineTo(lastX, lastY);
      bufferContext.stroke();
      context.drawImage(bufferContext.canvas, 0, 0);
    },
    saveCache() {
      const {cacheData, bufferContext} = this.data;
      if(!cacheData) {
        this.setData({
          cacheData: bufferContext.getImageData(0, 0 ,1000,  1000)
        })
      } else {
        bufferContext.putImageData(cacheData, 0, 0);
        this.setData({
          cacheData: null
        })
      }
    }
  },
})