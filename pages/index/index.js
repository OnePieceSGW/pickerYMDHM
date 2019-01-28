//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    date:'2019-01-01 12:38'
  },
  onLoad: function () {

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
