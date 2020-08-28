//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    date:'2019/01/01 12:37',
    disabled:false,//设置是否能点击 false可以 true不能点击
    startDate: '2019/01/01 12:37',
    endDate: '2020/01/01 12:38',
  }, 
  onLoad: function () {
    let that = this;
    setTimeout(function () {
      console.log('doSomething')
      that.setData({
        date: '2019/01/01 13:37',
        placeholder: '2019-01-01 13:37'
      })
    }, 2000);
    // setTimeout(function () {
    //   that.setData({
    //     date: '',
    //     placeholder: '请选择时间'
    //   })
    // }, 5000);
  },
  /**
 * 日历控件绑定函数 
 * 点击日期返回
 */
  onPickerChange: function (e) {
    console.log(e.detail);
    this.setData({
      date: e.detail.dateString
    })
  },
})
