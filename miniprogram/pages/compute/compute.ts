// pages/compute/compute.ts

import { getNum } from "../../utils/getNum";
import { toDay } from "../../utils/util";

interface IIntroPage {
  generateRandomNums: (value: number, method: any) => Ilist[];
  handleChange: (e: { detail: string }) => void;
  handelSaveResult: (e: { detail: number }) => void;
  handelOverlay: () => void;
  generate: (num: number) => ({ num1: number, num2: number })
}

interface Ilist { num1: number, num2: number, product: number };

interface IIntroData {
  list: Ilist[],
  method: string,
  count: number,
  result: string,
  myResults: number[],
  dutations: number[],
  showResult: boolean,
  timeList: string[],
  resultVisible: boolean,
  rate: number,
  duration: string,
  value: number,
  name: string
}

Page<IIntroData, IIntroPage>({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    value: 0,
    method: '',
    count: 1,
    result: '',
    myResults: [],
    dutations: [],
    showResult: true,
    timeList: [],
    resultVisible: false,
    rate: 0, // 正确率
    duration: '', //时长
    name: ''
  },

  // 十位数乘法返回结果
  generateRandomNums(num, method) {
    let numbers: Ilist[] = [];
    let count = 0;
    const max = wx.getStorageSync('questionCount') == '' ? 10 : wx.getStorageSync('questionCount');

    while (count < max) {
      // let num = 10 + Math.floor(Math.random() * 10);
      const { num1, num2 } = this.generate(num);

      const map = new Map([
        ['+', { compute: () => num1 + num2 }],
        ['-', { compute: () => num1 - num2 }],
        ['×', { compute: () => num1 * num2 }],
        ['÷', { compute: () => num1 / num2 }],
        ['%', { compute: () => num2 }],
      ])

      let product = map.get(method)?.compute(); // 计算两数积

      if (method === '÷') {
        product = Number(product?.toFixed(3))
      }

      if (!numbers.some(item => item.product === product)) {
        numbers.push({
          num1: num1,
          num2: num2,
          product: product
        });
        count++;
      }
    }

    return numbers;
  },

  // 返回的两个数字
  generate(num: number) {
    return getNum(num);
  },

  handleChange(e) {
    this.setData({
      result: e.detail
    })
  },

  // 存储计算结果
  handelSaveResult() {
    if (this.data.result === '') {
      return;
    }
    const timer = this.selectComponent('#timer');
    const drawing = this.selectComponent('#drawing');
    drawing.clickClearAll();
    const time: string = timer.saveOnceTime();

    this.data.timeList.push(time);
    this.setData({
      timeList: this.data.timeList
    })
    this.data.myResults.push(Number(this.data.result));
    this.setData({
      myResults: this.data.myResults
    })
    // 判断题目是否答完
    if (this.data.count < this.data.list.length) {
      this.setData({
        result: ''
      })
      const newCount = this.data.count + 1;
      this.setData({
        count: newCount
      })

    } else {
      timer.destoryTime();
      let rightNum = 0;
      if (this.data.method !== '÷') {
        rightNum = this.data.list.filter((item, index) => item.product === Number(this.data.myResults[index])).length;
      } else {
        rightNum = this.data.list.filter((item, index) => Number(this.data.myResults[index]) <= item.product + 0.3 && Number(this.data.myResults[index]) >= item.product - 0.3).length;
      }

      this.setData({
        rate: (rightNum / this.data.list.length) * 100,
        duration: timer.data.minutes + ':' + timer.data.seconds,
        showResult: false
      })
      // 存储答题数据
      const statisticData = wx.getStorageSync('statisticData') == '' ? [] : wx.getStorageSync('statisticData');
      console.log(wx.getStorageSync('statisticData'));
      
      wx.setStorageSync('statisticData', JSON.stringify([
        ...statisticData,
        {
          name: this.data.name,
          rate: this.data.rate,
          duration: this.data.duration,
          total: this.data.list.length,
          rightNum,
          date: toDay().date,
          time: toDay().time
        }
      ]));
      this.handelOverlay();
    }
  },

  // 重开
  reload() {
    let randomNums = this.generateRandomNums(this.data.value, this.data.method);
    this.setData({
      list: randomNums,
      result: '',
      count: 1,
      myResults: [],
      timeList: []
    })
    this.onReady();
    const timer = this.selectComponent('#timer');
    timer.reload();
  },

  refresh() {
    this.setData({
      showResult: true
    });
    this.reload();
  },

  toStatistic() {
    wx.navigateTo({
      url: '../statistic/statistic',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option: { index: string; method: string, name: string }) {

    let randomNums = this.generateRandomNums(Number(option.index), option.method);
    this.setData({
      list: randomNums,
      value: Number(option.index),
      method: option.method,
      name: option.name
    })
  },

  handelOverlay() {
    this.setData({
      resultVisible: !this.data.resultVisible
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