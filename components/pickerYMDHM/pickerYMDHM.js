// components/pickerYMDHM/pickerYMDHM.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    pickerArray: [],//日期控件数据list
    pickerIndex: [],//日期控件选择的index
    chooseIndex: [],//日期控件确认选择的index
    chooseArray: [],//日期控件确认选择后的list
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onInit(){
      const date = new Date()
      let pickerArray = this.data.pickerArray;
      //默认选择3年内
      let year = [];
      for (let i = date.getFullYear() - 1; i <= date.getFullYear() + 1; i++) {
        year.push({ id: i, name: i + "年" });
      }
      let month = [];
      for (let i = 1; i <= 12; i++) {
        month.push({ id: i, name: i + "月" });
      }
      let dayNum = this._getNumOfDays(date.getFullYear(), date.getMonth() + 1);
      let day = [];
      for (let i = 1; i <= dayNum; i++) {
        day.push({ id: i, name: i + "日" });
      }
      let time = [];
      for (let i = 0; i <= 23; i++) {
        if (i < 10) {
          time.push({ id: i, name: "0" + i + "时" });
        } else {
          time.push({ id: i, name: i + "时" });
        }
      }
      let division = [];
      for (let i = 0; i <= 59; i++) {
        if (i < 10) {
          division.push({ id: i, name: "0" + i + "分" });
        } else {
          division.push({ id: i, name: i + "分" });
        }
      }
      pickerArray[0] = year;
      pickerArray[1] = month;
      pickerArray[2] = day;
      pickerArray[3] = time;
      pickerArray[4] = division;
      this.setData({
        pickerArray,
        pickerIndex: [1, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()],
        chooseIndex: [1, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()],
        chooseArray: pickerArray
      })
    },
    /**
	 * 
	 * 获取本月天数
	 * @param {number} year 
	 * @param {number} month 
	 * @param {number} [day=0] 0为本月0最后一天的
	 * @returns number 1-31
	 */
    _getNumOfDays(year, month, day = 0) {
      return new Date(year, month, day).getDate()
    },
    pickerChange: function (e) {
      
      let indexArr = e.detail.value;

      this.setData({
        chooseIndex: e.detail.value,
        chooseArray: this.data.pickerArray
      })
      let date = {
        date: new Date(this.data.pickerArray[0][indexArr[0]].id + '-' + this.data.pickerArray[1][indexArr[1]].id + '-' + this.data.pickerArray[2][indexArr[2]].id + ' ' + this.data.pickerArray[3][indexArr[3]].id + ':' + this.data.pickerArray[4][indexArr[4]].id),
        year: this.data.pickerArray[0][indexArr[0]].id,
        month: this.data.pickerArray[1][indexArr[1]].id,
        day: this.data.pickerArray[2][indexArr[2]].id,
        time: this.data.pickerArray[3][indexArr[3]].id,
        division: this.data.pickerArray[4][indexArr[4]].id
      }

    
      this.triggerEvent('onPickerChange', date);
    },
    pickerColumnChange: function (e) {
      
      var data = {
        pickerArray: this.data.pickerArray,
        pickerIndex: this.data.pickerIndex
      };
      data.pickerIndex[e.detail.column] = e.detail.value;
      if (e.detail.column == 1) {
        let dayNum = this._getNumOfDays(data.pickerArray[0][data.pickerIndex[0]].id, e.detail.value + 1);
        let day = [];
        for (let i = 1; i <= dayNum; i++) {
          day.push({ id: i, name: i + "日" });
        }
        if (dayNum < data.pickerIndex[2] + 1) {
          data.pickerIndex[2] = dayNum - 1;
        }
        data.pickerArray[2] = day;
      }
      this.setData(data);
    },
    pickerCancel: function (e) {
      console.log("取消");
      this.setData({
        pickerIndex: this.data.chooseIndex,
        pickerArray: this.data.chooseArray
      })
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached() {
    // 在组件实例进入页面节点树时执行
    // 在组件实例进入页面节点树时执行
    this._onInit();
  },
  // 以下为新方法 >=2.2.3
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      this._onInit();
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
