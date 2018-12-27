//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  onLoad: function () {

  },
  /**
 * 日历控件绑定函数 
 * 点击日期返回
 */
  onPickerChange: function (e) {
    console.log(e.detail);
  },
})
