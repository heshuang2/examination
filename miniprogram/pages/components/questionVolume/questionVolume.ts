// pages/components/questionVolume/questionVolume.ts
Component({

  /**
   * 页面的初始数据
   */
  data: {
    fabButton: {
      theme: 'primary',
      variant: 'outline',
      size: 'small'
    },
    question: [
      {label: '5题', value: 5},
      {label: '10题', value: 10},
      {label: '15题', value: 15},
    ],
    questionCount: 10
  },

  lifetimes: {
    // 在组件实例刚刚被创建时执行
    created: function () {

    },
    // 在组件实例进入页面节点树时执行
    attached: function () {
      const count = wx.getStorageSync('questionCount') == '' ? 10 : wx.getStorageSync('questionCount');
      this.setData({
        questionCount: count || 10
      })
    },
    // 在组件实例被从页面节点树移除时执行
    detached: function () {
     
    },
  },

  methods: {
    handlePopup() {
      this.setData({
        visible: true
      })
    },
    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
    onChange(e) {
      this.setData({ 
        questionCount: e.detail.value,
        visible: false,
       });
      wx.setStorageSync('questionCount', e.detail.value);
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

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

  }
})