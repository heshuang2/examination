// pages/components/keyboard/keyboard.ts
Component({

  /**
   * 页面的初始数据
   */
  data: {
    nums: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0 , '下一题', '重开', '清空', '退格'],
    active: null,
    result: ''
  },

  methods: {
    keyStart: function(e) {
      const index = e.currentTarget.dataset?.index;
      const value = this.data.nums[index]; 
      this.setData({
        active: index
      });
      if ((value === '.' && !this.data.result.includes('.')) || typeof value === 'number') {
        this.setData({
          result: this.data.result + value.toString()
        })
        return this.triggerEvent('myevent', this.data.result);
      }
      if (value === '清空') {
        this.setData({
          result: ''
         })
        return this.triggerEvent('myevent', this.data.result);
      }
      if (value === '退格') {
        const newResult = this.data.result.slice(0, this.data.result.length - 1);
        this.setData({
          result: newResult
        });
        return this.triggerEvent('myevent', this.data.result);
      }
      if (value === '下一题') {
        this.setData({
          result: ''
        })
        return this.triggerEvent('saveResult');
      }
      if (value === '重开') {
        this.setData({
          result: ''
        })
        return this.triggerEvent('reload');
      }
    },
  
    keyEnd: function() {
      this.setData({
        active: null
      })
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