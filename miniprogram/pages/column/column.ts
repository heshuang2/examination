
// pages/column/column.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tenAddSubtract: [
      {name: '十位+十位', value: 99, method: '+'},
      {name: '十位-十位', value: -99,  method: '-'},
    ],
    tenMultiply: [
      {name: '1*×1*', value: 10},
      {name: '9*×9*', value: 90},
      {name: '*5×*5', value: 5},
      {name: 'mn×(10-m)n', value: 0},
      {name: 'mn×m(10-n)', value: 1},
      {name: 'm(10-m)×nn', value: 2},
    ],
    hundredMultiply: [
      {name: '百位+百位', value: 999, method: '+'},
      {name: '百位-百位', value: -999,  method: '-'},
    ],
    division: [
      {name: '分母特殊', value: 888, method: '÷'},
      {name: '分母 9×n', value: 889, method: '÷'}
    ],
    active: null,
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

  bindViewTap: function (e: { currentTarget: { dataset: { [x: string]: any; }; }; }) {
    // 传递的参数
    const value = e.currentTarget.dataset['value'];
    const method = e.currentTarget.dataset['method'];
    this.setData({
      active: e.currentTarget.dataset['value']
    })
    wx.navigateTo({
      url: `/pages/compute/compute?index=${value}&method=${method}`,
    })
  },

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const count = wx.getStorageSync('questionCount') == '' ? 10 : wx.getStorageSync('questionCount');
    this.setData({
      questionCount: count || 10
    })
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
    this.setData({
      active: null
    })
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