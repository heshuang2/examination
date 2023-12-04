// pages/countCapital/countCapital.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jqSubtract: [
      {name: '已知现期、增长率，选项差距大', value: 1,},
      {name: '已知现期、增长率，选项差距小', value: 2,},
    ],
    active: null,
  },

  bindViewTap: function (e: { currentTarget: { dataset: { [x: string]: any; }; }; }) {
    // 传递的参数
    const value = e.currentTarget.dataset['value'];
    this.setData({
      active: e.currentTarget.dataset['value']
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