// pages/home/homes.ts

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../column/column',
    })
  },

  countCapitalTap() {
    wx.navigateTo({
      url: '../countCapital/countCapital',
    })
  },


  //第一次获取用户信息
  getUserProfile: function () {
    wx.getUserProfile({
      desc: '获取您的微信个人信息',
      success: (res) => {
        this.setData({
          userinfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('userinfo', res.userInfo)
      },
      fail: function () {
        wx.showToast({
          title: '你选择了取消',
          icon: "none",
          duration: 1500,
          mask: true
        })
      }
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