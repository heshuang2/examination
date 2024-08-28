
// pages/column/column.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tenAddSubtract: [
      {name: '十位+十位', value: 900, method: '+', },
      {name: '十位-十位', value: 901,  method: '-'},
      {name: '百位+百位', value: 902, method: '+'},
      {name: '百位-百位', value: 903,  method: '-'},
      {name: '十位 × 个位', value: 904, method: '×'},
      {name: '百位 × 个位', value: 906, method: '×'},
      {name: '十位 × 十位', value: 905, method: '×'},
    ],
    tenMultiply: [
      {name: '平方数', value: 300, method: '×'},
      {name: '百化分', value: 301, method: '%'},
    ],
    hundredMultiply: [
      {name: '1*×1*', value: 100, method: '×'},
      {name: '9*×9*', value: 101, method: '×'},
      {name: '*5×*5', value: 102, method: '×'},
      {name: 'mn×(10-m)n', value: 103, method: '×'},
      {name: 'mn×m(10-n)', value: 104, method: '×'},
      {name: 'm(10-m)×nn', value: 105, method: '×'},
    ],
    division: [
      {name: '分母特殊', value: 200, method: '÷'},
      {name: '分母 9×n', value: 201, method: '÷'},
      {name: '百位/10n', value: 202, method: '÷'},
      {name: '百位/111', value: 203, method: '÷'},
      {name: '百位/百位', value: 204, method: '÷'},
    ],
    active: null,
  },

  bindViewTap: function (e: { currentTarget: { dataset: { [x: string]: any; }; }; }) {
    // 传递的参数
    const value = e.currentTarget.dataset['value'];
    const method = e.currentTarget.dataset['method'];
    const name = e.currentTarget.dataset['name'];
    console.log(name);
    
    this.setData({
      active: e.currentTarget.dataset['value']
    })
    wx.navigateTo({
      url: `/pages/compute/compute?index=${value}&method=${method}&name=${name}`,
    })
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