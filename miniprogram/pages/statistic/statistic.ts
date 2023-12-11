import { isToday } from "../../utils/util";

// pages/statistic/statistic.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
      total: 0,
      rate: '-',
      nowTotal: 0,
      nowRate: '-',
      recordData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const statisticData = Array.isArray(wx.getStorageSync('statisticData'))
    ? wx.getStorageSync('statisticData')
    : JSON.parse(wx.getStorageSync('statisticData'));
    const total = statisticData.reduce((result, current) => result + current.total,0);
    const rate = (statisticData.reduce((result, current) => result + current.rightNum,0) / total * 100 ).toFixed(1) + '%';
    const nowData = statisticData.filter(item => isToday(item.date));
    const nowTotal = nowData.reduce((result, current) => result + current.total,0);
    const nowRate = nowTotal !== 0 ? (nowData.reduce((result, current) => result + current.rightNum,0) / nowTotal * 100 ).toFixed(1) + '%' : '-';
    this.setData({
      total,
      rate,
      nowTotal,
      nowRate,
      recordData: statisticData.reverse()
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