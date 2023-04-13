// pages/components/timer/timer.ts
Component({
  /**
   * 页面的初始数据
   */
  data: {
    hours: '0',
    minutes: '00',
    seconds: '00',
    duration: 0, // 总时长
    timer: null,
    countdown: 100,
    countdownTimer: null,
    preDuration: 0, // 上一题时长
    durationList: [], // 时长list
  },

  lifetimes: {
    // 在组件实例刚刚被创建时执行
    created: function () {
      if (!this.data.time) {
        this.changeTime();
        this.changeCountdown();
      }
    },
    // 在组件实例进入页面节点树时执行
    attached: function () {
    },
    // 在组件实例被从页面节点树移除时执行
    detached: function () {
      console.log('destory');
      clearInterval(this.data.timer as unknown as number);
      clearInterval(this.data.countdownTimer as unknown as number);
    },
  },
  methods: {
    changeTime() {
      let m = 0,
      s = 0;
      const timer = setInterval(() => {
        s++;
        if (s === 60) {
          m++;
          this.setData({
            minutes: m < 10 ? '0' + m : m.toString()
          })
          s = 0;
        }
        this.setData({
          seconds: s < 10 ? '0' + s : s.toString()
        })
        this.setData({
          duration: this.data.duration + 1
        })
      }, 1000);
      this.setData({
        timer: timer
      })
    },
    changeCountdown() {
      let p = 100;
      const timer = setInterval(() => {
        p -= 1;
        this.setData({
          countdown: p
        })
        if(p <= 0) {
          p = 100;
        }
        
      }, 600);
      this.setData({
        countdownTimer: timer
      })
    },
    saveOnceTime() {      
      const diff = this.data.duration - this.data.preDuration;
      this.setData({
        preDuration: this.data.duration
      });
      const m = Math.floor(diff / 60);
      const s = Math.round(diff % 60);
      return m + '分' + s + '秒';
    },
    destoryTime() {
      clearTimeout(this.data.timer as unknown as number);
    },
    reload() {
      this.setData({
        minutes: '00',
        seconds: '00',
        duration: 0, // 总时长
        preDuration: 0, // 上一题时长
        durationList: [], // 时长list
      })
      clearTimeout(this.data.timer as unknown as number);
      this.changeTime();
    }
  }
})