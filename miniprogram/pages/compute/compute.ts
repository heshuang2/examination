// pages/compute/compute.ts

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
  value: number
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
  },

  // 十位数乘法返回结果
  generateRandomNums(num, method) {
    let numbers: Ilist[] = [];
    let count = 0;
    const max = wx.getStorageSync('questionCount');

    while (count < max) {
      // let num = 10 + Math.floor(Math.random() * 10);
      const { num1, num2 } = this.generate(num);
    
      const map = new Map([
        ['+', { compute: () => num1 + num2}],
        ['-', { compute: () => num1 - num2}],
        ['×', { compute: () => num1 * num2}],
        ['÷', { compute: () => num1 / num2}],
      ])
      
      let product = map.get(method)?.compute(); // 计算两数积
      
      if(method === '÷') {
        product = Number(product?.toFixed(2))
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
  generate(num) {
    if ([10, 90].includes(num)) {
      return {
        num1: num + Math.floor(Math.random() * 10),
        num2: num + Math.floor(Math.random() * 10)
      }
    } else if (num === 5) {
      return {
        num1:  Math.ceil(Math.random()*1000000000%9) * 10 + num,
        num2:  Math.ceil(Math.random()*1000000000%9) * 10 + num,
      } 
    } else if (num === 0) {
      const ones = Math.ceil(Math.random()*1000000000%9);
      const place = Math.ceil(Math.random()*1000000000%9);
      return {
        num1: place * 10 + ones,
        num2: (10 - place) * 10 + ones
      }
    } else if (num === 1) {
      const ones = Math.ceil(Math.random()*1000000000%9);
      const place = Math.ceil(Math.random()*1000000000%9);
      return {
        num1: place * 10 + ones,
        num2: place * 10 + (10 - ones)
      }
    } else if (num === 2) {
      const first = Math.ceil(Math.random()*1000000000%9);
      const second =  Math.ceil(Math.random()*1000000000%9);
      return {
        num1: first * 10 + (10 - first),
        num2: second * 10 + second
      }
    } else if (num === 99) {
      // 生成10到99之间的随机整数，十位数为1~9，个位数为0~9
      const num1 = Math.floor(Math.random() * 90 + 10);  
      //  生成10到99之间的随机整数，十位数为1~9，个位数为0~9
      const num2 = Math.floor(Math.random() * 90 + 10);  
      return { num1, num2 }
    } else if (num === -99) {
      // 生成10到99之间的随机整数，十位数为1~9，个位数为0~9
      const num1 = Math.floor(Math.random() * 90 + 10);  
       // 生成10到num1-1之间的随机整数
      const num2 = Math.floor(Math.random() * (num1 - 10) + 10); 
      return { num1, num2 }
    } else if (num === 999) {
       // 生成100到999之间的随机整数，百位数为1~9， 十位数为1~9，个位数为0~9,
       const num1 = Math.floor(Math.random() * 900 + 100);  
       //  生成100到999之间的随机整数，百位数为1~9，十位数为1~9，个位数为0~9
       const num2 = Math.floor(Math.random() * 900 + 100);  
       return { num1, num2 }
    } else if (num === -999) {
      // 生成100到999之间的随机整数，百位数为1~9，十位数为1~9，个位数为0~9
      const num1 = Math.floor(Math.random() * 900 + 100);  
       // 生成10到num1-1之间的随机整数
      const num2 = Math.floor(Math.random() * (num1 - 100) + 100); 
      return { num1, num2 }
    } else if (num === 888) {
      // 生成100到999之间的随机整数，百位数为1~9，十位数为1~9，个位数为0~9
      const num1 = Math.floor(Math.random() * 900 + 100);  
      const arr = [50, 5, 333, 25, 250, 20, 200, 167, 143, 125, 111 ];
      // const float = Math.floor(Math.random() * 3) - 1;
      const num2 = arr[Math.floor(Math.random() * arr.length)];
      return { num1, num2 }
    } else if (num === 889) {
      const num1 = Math.floor(Math.random() * 900 + 100); 
      const float = Math.floor(Math.random() * 9 + 1);
      const num2 = 9 * float;
      return { num1, num2 }
     }
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
    const time: string = timer.saveOnceTime();
    this.data.timeList.push(time);
    this.setData({
      timeList: this.data.timeList
    })
    this.data.myResults.push(Number(this.data.result));
    this.setData({
      myResults: this.data.myResults
    })
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
      let rightNum  = 0;
      if (this.data.method !== '÷') {
        rightNum = this.data.list.filter((item, index) => item.product === Number(this.data.myResults[index])).length;
      } else {
        rightNum = this.data.list.filter((item, index) => Number(this.data.myResults[index]) <= item.product + 0.3 && Number(this.data.myResults[index]) >= item.product - 0.3 ).length;
      }
      
      this.setData({
        rate: (rightNum / this.data.list.length) * 100,
        duration: timer.data.minutes + ':' + timer.data.seconds,
        showResult: false
      })
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
      myResults: []
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option: { index: any; method: any }) {
    let randomNums = this.generateRandomNums(Number(option.index), option.method);
    this.setData({
      list: randomNums,
      value: Number(option.index),
      method: option.method
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