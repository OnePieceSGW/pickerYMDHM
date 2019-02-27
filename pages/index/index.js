//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    date:'2019-01-01 12:38',
    disabled:true//设置是否能点击 false可以 true不能点击
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
