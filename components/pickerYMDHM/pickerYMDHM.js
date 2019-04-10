// components/pickerYMDHM/pickerYMDHM.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {            // 属性名
      type: null,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: null     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    startDate: {
      type: null,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: null     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    endDate: {
      type: null,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: null     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    disabled: {
      type: null,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    placeholder: {
      type: null,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: null     // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pickerArray: [],//日期控件数据list
    pickerIndex: [],//日期控件选择的index
    chooseIndex: [],//日期控件确认选择的index
    chooseArray: [],//日期控件确认选择后的list
    dateString: '',//页面显示日期
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onInit() {
      let date = new Date();
      if (this.data.date != null) {
        let str = this.data.date;
        str = str.replace(/-/g, "/");
        date = new Date(str);
      }
      let pickerArray = this.data.pickerArray;
      // console.log(date.getFullYear());
      //默认选择3年内
      let year = [];
      let startDate = date.getFullYear() - 1;
      let endDate = date.getFullYear() + 1;
      if (this.data.startDate != null) {
        //如果存在开始时间，则默认设置结束时间为2099
        startDate = this.data.startDate;
        endDate = 2099;
      }
      if (this.data.endDate != null && this.data.startDate == null) {
        //如果存在结束时间，不存在开始时间 则默认设置开始时间为1900
        endDate = this.data.endDate;
        startDate = 1900;
      }
      if (this.data.endDate != null && this.data.startDate != null) {
        endDate = this.data.endDate;
      }
      if (startDate > date.getFullYear() || endDate < date.getFullYear()){
        this.setData({
          dateString: "默认日期不在时间范围内"
        })
        return;
      }
      for (let i = startDate; i <= endDate; i++) {
        year.push({ id: i, name: i + "年" });
      }
      // console.log(year);
      let month = [];
      for (let i = 1; i <= 12; i++) {
        month.push({ id: i, name: i + "月" });
      }
      // console.log(month);
      let dayNum = this._getNumOfDays(date.getFullYear(), date.getMonth() + 1);
      let day = [];
      for (let i = 1; i <= dayNum; i++) {
        day.push({ id: i, name: i + "日" });
      }
      // console.log(day);
      let time = [];
      for (let i = 0; i <= 23; i++) {
        if (i < 10) {
          time.push({ id: i, name: "0" + i + "时" });
        } else {
          time.push({ id: i, name: i + "时" });
        }
      }
      // console.log(time);
      let division = [];
      for (let i = 0; i <= 59; i++) {
        if (i < 10) {
          division.push({ id: i, name: "0" + i + "分" });
        } else {
          division.push({ id: i, name: i + "分" });
        }
      }
      // console.log(division);
      pickerArray[0] = year;
      pickerArray[1] = month;
      pickerArray[2] = day;
      pickerArray[3] = time;
      pickerArray[4] = division;
      let mdate = {
        date: date,
        year: date.getFullYear() + '',
        month: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 + '',
        day: date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '',
        time: date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + '',
        division: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ''
      }
      mdate.dateString = mdate.year + '-' + mdate.month + '-' + mdate.day + ' ' + mdate.time + ':' + mdate.division;
      this.setData({
        pickerArray,
        pickerIndex: [date.getFullYear() - startDate, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()],
        chooseIndex: [date.getFullYear() - startDate, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()],
        chooseArray: pickerArray,
        dateString: this.data.placeholder != null ? this.data.placeholder : mdate.dateString
      })
      // console.log(date);
      //设置placeholder属性后 初始化不返回日期
      if (this.data.placeholder == null){
        this.triggerEvent('onPickerChange', mdate);
      }
      // console.log(this.data.pickerArray);
      // console.log(this._getNumOfDays(2018, 10));
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
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      let indexArr = e.detail.value;
      // console.log(this.data.pickerArray[0][indexArr[0]].id + "\n" + this.data.pickerArray[1][indexArr[1]].id + "\n" + this.data.pickerArray[2][indexArr[2]].id);
      const year = this.data.pickerArray[0][indexArr[0]].id;
      const month = this.data.pickerArray[1][indexArr[1]].id;
      const day = this.data.pickerArray[2][indexArr[2]].id;
      const time = this.data.pickerArray[3][indexArr[3]].id;
      const division = this.data.pickerArray[4][indexArr[4]].id;
      let date = {
        date: new Date(year + '-' + month + '-' + day + ' ' + time + ':' + division),
        year: year + '',
        month: month < 10 ? '0' + month : month + '',
        day: day < 10 ? '0' + day : day + '',
        time: time < 10 ? '0' + time : time + '',
        division: division < 10 ? '0' + division : division + ''
      }
      date.dateString = date.year + '-' + date.month + '-' + date.day + ' ' + date.time + ':' + date.division;
      // console.log(date);
      this.setData({
        chooseIndex: e.detail.value,
        chooseArray: this.data.pickerArray,
        dateString: date.dateString
      })
      this.triggerEvent('onPickerChange', date);
    },
    pickerColumnChange: function (e) {
      // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
      // console.log("取消");
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
    // this._onInit();
  },
  ready() {
    console.log('进入ready外层节点=', this.data.date);
    this._onInit();
  },
  // 以下为新方法 >=2.2.3
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      // this._onInit();
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
    ready() {
      console.log('进入ready节点=', this.data.date);
      this._onInit();
    }
  }
})
