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
    stDate: '',//开始日期
    enDate: ''//结束日期
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
      let month = [];
      let day = [];
      let time = [];
      let division = [];
      let startDate = '';
      let endDate = ''
      let tpData = {};
      if (this.data.startDate != null && this.data.endDate == null) {
        //如果存在开始时间，则默认设置结束时间为2099
        startDate = this._getDefaultDate(this.data.startDate);
        endDate = this._getDefaultDate("2099-12-31 23:59");
        tpData = this._getModify(date, startDate, endDate);
      }
      if (this.data.endDate != null && this.data.startDate == null) {
        //如果存在结束时间，不存在开始时间 则默认设置开始时间为1900
        startDate = this._getDefaultDate("1900-01-01 00:00");
        endDate = this._getDefaultDate(this.data.endDate);
        tpData = this._getModify(date, startDate, endDate);
      }
      if (this.data.endDate != null && this.data.startDate != null) {
        startDate = this._getDefaultDate(this.data.startDate);
        endDate = this._getDefaultDate(this.data.endDate);
        tpData = this._getModify(date, startDate, endDate);
      }
      // console.log(year);
      if (this.data.startDate == null && this.data.endDate == null) {
        startDate = this._getDefaultDate("1901-01-01 00:00");
        endDate = this._getDefaultDate("2099-12-31 23:59");
        tpData = this._getModify(date, startDate, endDate);
      }
      
      if (date > endDate || date < startDate) {
        this.setData({
          dateString: "默认日期不在时间范围内"
        })
        return;
      }
      // console.log(division);
      pickerArray[0] = tpData.year;
      pickerArray[1] = tpData.month;
      pickerArray[2] = tpData.day;
      pickerArray[3] = tpData.time;
      pickerArray[4] = tpData.division;
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
        pickerIndex: tpData.index,
        chooseIndex: tpData.index,
        chooseArray: pickerArray,
        dateString: this.data.placeholder != null ? this.data.placeholder : mdate.dateString,
        stDate: startDate,
        enDate: endDate
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
     */
    _getDefaultDate(date) {
      date = date.replace(/-/g, "/");
      return new Date(date);
    },
    /**
	 * 
	 * 获取开始日期 结束日期 中间日期
	 * @param {date} newDate 默认日期
	 * @param {date} startDate 设置开始日期
	 * @param {date} stopDate 设置结束日期
	 * @returns data 包含年月日时分数组
	 */
    _getModify(newDate, startDate, stopDate) {
      let data = {
        year: [],
        month: [],
        day: [],
        time: [],
        division: [],
        index:[0,0,0,0,0]
      }
      let nYear = newDate.getFullYear();
      let nMonth = newDate.getMonth() + 1;
      let nDay = newDate.getDate();
      let nHours = newDate.getHours();
      let nMinutes = newDate.getMinutes();

      let tYear = startDate.getFullYear();
      let tMonth = startDate.getMonth() + 1;
      let tDay = startDate.getDate();
      let tHours = startDate.getHours();
      let tMinutes = startDate.getMinutes();

      let pYear = stopDate.getFullYear();
      let pMonth = stopDate.getMonth() + 1;
      let pDay = stopDate.getDate();
      let pHours = stopDate.getHours();
      let pMinutes = stopDate.getMinutes();
      for (let i = tYear; i <= pYear; i++) {
        data.year.push({ id: i, name: i + "年" });
      }
      data.index[0] = nYear - tYear;
      //判断年份是否相同 相同则继续
      if (nYear == tYear){
        //判断结束年份 赋值月份 如果结束年份相同则把结束月份 一并赋值
        if (nYear == pYear){
          for (let i = tMonth; i <= pMonth; i++) {
            data.month.push({ id: i, name: i + "月" });
          }
          data.index[1] = nMonth - tMonth < 0 ? 0 : nMonth - tMonth;

          if (nMonth == tMonth){
            if (nMonth == pMonth){
              for (let i = tDay; i <= pDay; i++) {
                data.day.push({ id: i, name: i + "日" });
              }
              data.index[2] = nDay - tDay < 0 ? 0 : nDay - tDay;

              if (nDay == tDay){
                if (nDay == pDay){
                  for (let i = tHours; i <= pHours; i++) {
                    if (i < 10) {
                      data.time.push({ id: i, name: "0" + i + "时" });
                    } else {
                      data.time.push({ id: i, name: i + "时" });
                    }
                  }
                  
                  data.index[3] = nHours - tHours < 0 ? 0 : nHours - tHours;

                  if (nHours == tHours){
                    if (nHours == pHours){
                      for (let i = tMinutes; i <= pMinutes; i++) {
                        if (i < 10) {
                          data.division.push({ id: i, name: "0" + i + "分" });
                        } else {
                          data.division.push({ id: i, name: i + "分" });
                        }
                      }
                      data.index[4] = nMinutes - tMinutes < 0 ? 0 : nMinutes - tMinutes;
                    } else {
                      for (let i = tMinutes; i <= 59; i++) {
                        if (i < 10) {
                          data.division.push({ id: i, name: "0" + i + "分" });
                        } else {
                          data.division.push({ id: i, name: i + "分" });
                        }
                      }
                      data.index[4] = nMinutes - tMinutes < 0 ? 0 : nMinutes - tMinutes;
                    }
                  } else {
                    if (nHours == pHours){
                      for (let i = 0; i <= pMinutes; i++) {
                        if (i < 10) {
                          data.division.push({ id: i, name: "0" + i + "分" });
                        } else {
                          data.division.push({ id: i, name: i + "分" });
                        }
                      }
                      data.index[4] = nMinutes;
                    } else {
                      for (let i = 0; i <= 59; i++) {
                        if (i < 10) {
                          data.division.push({ id: i, name: "0" + i + "分" });
                        } else {
                          data.division.push({ id: i, name: i + "分" });
                        }
                      }
                      data.index[4] = nMinutes;
                    }
                  }
                } else {
                  for (let i = tHours; i <= 23; i++) {
                    if (i < 10) {
                      data.time.push({ id: i, name: "0" + i + "时" });
                    } else {
                      data.time.push({ id: i, name: i + "时" });
                    }
                  }
                  
                  data.index[3] = nHours - tHours < 0 ? 0 : nHours - tHours;
                  if (nHours == tHours) {
                    for (let i = tMinutes; i <= 59; i++) {
                      if (i < 10) {
                        data.division.push({ id: i, name: "0" + i + "分" });
                      } else {
                        data.division.push({ id: i, name: i + "分" });
                      }
                    }
                    data.index[4] = nMinutes - tMinutes < 0 ? 0 : nMinutes - tMinutes;
                  } else {
                    for (let i = 0; i <= 59; i++) {
                      if (i < 10) {
                        data.division.push({ id: i, name: "0" + i + "分" });
                      } else {
                        data.division.push({ id: i, name: i + "分" });
                      }
                    }
                    data.index[4] = nMinutes;
                  }
                }
              } else {
                if (nDay == pDay){
                  for (let i = 0; i <= pHours; i++) {
                    if (i < 10) {
                      data.time.push({ id: i, name: "0" + i + "时" });
                    } else {
                      data.time.push({ id: i, name: i + "时" });
                    }
                  }
                  data.index[3] = nHours;
                  if (nHours == pHours){
                    for (let i = 0; i <= pMinutes; i++) {
                      if (i < 10) {
                        data.division.push({ id: i, name: "0" + i + "分" });
                      } else {
                        data.division.push({ id: i, name: i + "分" });
                      }
                    }
                    data.index[4] = nMinutes;
                  } else {
                    for (let i = 0; i <= 59; i++) {
                      if (i < 10) {
                        data.division.push({ id: i, name: "0" + i + "分" });
                      } else {
                        data.division.push({ id: i, name: i + "分" });
                      }
                    }
                    data.index[4] = nMinutes;
                  }
                } else {
                  for (let i = 0; i <= 23; i++) {
                    if (i < 10) {
                      data.time.push({ id: i, name: "0" + i + "时" });
                    } else {
                      data.time.push({ id: i, name: i + "时" });
                    }
                  }

                  data.index[3] = nHours;
                  // console.log(time);
                  for (let i = 0; i <= 59; i++) {
                    if (i < 10) {
                      data.division.push({ id: i, name: "0" + i + "分" });
                    } else {
                      data.division.push({ id: i, name: i + "分" });
                    }
                  }
                  data.index[4] = nMinutes;
                }
              }
            } else {
              let dayNum = this._getNumOfDays(nYear, nMonth);
              for (let i = tDay; i <= dayNum; i++) {
                data.day.push({ id: i, name: i + "日" });
              }
              data.index[2] = nDay - tDay < 0 ? 0 : nDay - tDay;
              if (nDay == tDay) {
                for (let i = tHours; i <= 23; i++) {
                  if (i < 10) {
                    data.time.push({ id: i, name: "0" + i + "时" });
                  } else {
                    data.time.push({ id: i, name: i + "时" });
                  }
                }
                
                data.index[3] = nHours - tHours < 0 ? 0 : nHours - tHours;
                if (nHours == tHours) {
                  for (let i = tMinutes; i <= 59; i++) {
                    if (i < 10) {
                      data.division.push({ id: i, name: "0" + i + "分" });
                    } else {
                      data.division.push({ id: i, name: i + "分" });
                    }
                  }
                  data.index[4] = nMinutes - tMinutes < 0 ? 0 : nMinutes - tMinutes;
                } else {
                  for (let i = 0; i <= 59; i++) {
                    if (i < 10) {
                      data.division.push({ id: i, name: "0" + i + "分" });
                    } else {
                      data.division.push({ id: i, name: i + "分" });
                    }
                  }
                  data.index[4] = nMinutes;
                }
              } else {
                for (let i = 0; i <= 23; i++) {
                  if (i < 10) {
                    data.time.push({ id: i, name: "0" + i + "时" });
                  } else {
                    data.time.push({ id: i, name: i + "时" });
                  }
                }
                
                data.index[3] = nHours;
                // console.log(time);
                for (let i = 0; i <= 59; i++) {
                  if (i < 10) {
                    data.division.push({ id: i, name: "0" + i + "分" });
                  } else {
                    data.division.push({ id: i, name: i + "分" });
                  }
                }
                data.index[4] = nMinutes;
              }
            }
          } else {
            if (nMonth == pMonth){
              for (let i = 1; i <= pDay; i++) {
                data.day.push({ id: i, name: i + "日" });
              }
              data.index[2] = nDay - 1;
              if (nDay == pDay){
                for (let i = 0; i <= pHours; i++) {
                  if (i < 10) {
                    data.time.push({ id: i, name: "0" + i + "时" });
                  } else {
                    data.time.push({ id: i, name: i + "时" });
                  }
                }
                data.index[3] = nHours;
                if (nHours == pHours){
                  for (let i = 0; i <= pMinutes; i++) {
                    if (i < 10) {
                      data.division.push({ id: i, name: "0" + i + "分" });
                    } else {
                      data.division.push({ id: i, name: i + "分" });
                    }
                  }
                  data.index[4] = nMinutes;
                } else {
                  for (let i = 0; i <= 59; i++) {
                    if (i < 10) {
                      data.division.push({ id: i, name: "0" + i + "分" });
                    } else {
                      data.division.push({ id: i, name: i + "分" });
                    }
                  }
                  data.index[4] = nMinutes;
                }
              } else {
                for (let i = 0; i <= 23; i++) {
                  if (i < 10) {
                    data.time.push({ id: i, name: "0" + i + "时" });
                  } else {
                    data.time.push({ id: i, name: i + "时" });
                  }
                }
                data.index[3] = nHours;
                // console.log(time);
                for (let i = 0; i <= 59; i++) {
                  if (i < 10) {
                    data.division.push({ id: i, name: "0" + i + "分" });
                  } else {
                    data.division.push({ id: i, name: i + "分" });
                  }
                }
                data.index[4] = nMinutes;
              }
            } else {
              let dayNum = this._getNumOfDays(nYear, nMonth);
              for (let i = 1; i <= dayNum; i++) {
                data.day.push({ id: i, name: i + "日" });
              }
              data.index[2] = nDay - 1;
              for (let i = 0; i <= 23; i++) {
                if (i < 10) {
                  data.time.push({ id: i, name: "0" + i + "时" });
                } else {
                  data.time.push({ id: i, name: i + "时" });
                }
              }

              data.index[3] = nHours;
              // console.log(time);
              for (let i = 0; i <= 59; i++) {
                if (i < 10) {
                  data.division.push({ id: i, name: "0" + i + "分" });
                } else {
                  data.division.push({ id: i, name: i + "分" });
                }
              }
              data.index[4] = nMinutes;
            }
          } 
        } else {//只需要开始日期 因为结束年份不同 所以不会用到结束日期
          for (let i = tMonth; i <= 12; i++) {
            data.month.push({ id: i, name: i + "月" });
          }
          data.index[1] = nMonth - tMonth < 0 ? 0 : nMonth - tMonth;
          if (nMonth == tMonth){
            let dayNum = this._getNumOfDays(nYear, nMonth);
            for (let i = tDay; i <= dayNum; i++) {
             data.day.push({ id: i, name: i + "日" });
            }
            data.index[2] = nDay - tDay < 0 ? 0 : nDay - tDay;
            if (nDay == tDay){
              for (let i = tHours; i <= 23; i++) {
                if (i < 10) {
                  data.time.push({ id: i, name: "0" + i + "时" });
                } else {
                  data.time.push({ id: i, name: i + "时" });
                }
              }
              
              data.index[3] = nHours - tHours < 0 ? 0 : nHours - tHours;
              if (nHours == tHours){
                for (let i = tMinutes; i <= 59; i++) {
                  if (i < 10) {
                    data.division.push({ id: i, name: "0" + i + "分" });
                  } else {
                    data.division.push({ id: i, name: i + "分" });
                  }
                }
                data.index[4] = nMinutes - tMinutes < 0 ? 0 : nMinutes - tMinutes;
              } else {
                for (let i = 0; i <= 59; i++) {
                  if (i < 10) {
                    data.division.push({ id: i, name: "0" + i + "分" });
                  } else {
                    data.division.push({ id: i, name: i + "分" });
                  }
                }
                data.index[4] = nMinutes;
              }
            } else {
              for (let i = 0; i <= 23; i++) {
                if (i < 10) {
                  data.time.push({ id: i, name: "0" + i + "时" });
                } else {
                  data.time.push({ id: i, name: i + "时" });
                }
              }
              
              data.index[3] = nHours;
              // console.log(time);
              for (let i = 0; i <= 59; i++) {
                if (i < 10) {
                  data.division.push({ id: i, name: "0" + i + "分" });
                } else {
                  data.division.push({ id: i, name: i + "分" });
                }
              }
              data.index[4] = nMinutes;
            }
          } else {
            let dayNum = this._getNumOfDays(nYear, nMonth);
            for (let i = 1; i <= dayNum; i++) {
              data.day.push({ id: i, name: i + "日" });
            }
            data.index[2] = nDay - 1;
            for (let i = 0; i <= 23; i++) {
              if (i < 10) {
                data.time.push({ id: i, name: "0" + i + "时" });
              } else {
                data.time.push({ id: i, name: i + "时" });
              }
            }
            
            data.index[3] = nHours;
            // console.log(time);
            for (let i = 0; i <= 59; i++) {
              if (i < 10) {
                data.division.push({ id: i, name: "0" + i + "分" });
              } else {
                data.division.push({ id: i, name: i + "分" });
              }
            }
            data.index[4] = nMinutes;
          }
        }        
      } else {
        if (nYear == pYear) {
          for (let i = 1; i <= pMonth; i++) {
            data.month.push({ id: i, name: i + "月" });
          }
          data.index[1] = nMonth - 1;
          if (nMonth == pMonth){
            for (let i = 1; i <= pDay; i++) {
              data.day.push({ id: i, name: i + "日" });
            }
            data.index[2] = nDay - 1;
            if (nDay == pDay){
              for (let i = 0; i <= pHours; i++) {
                if (i < 10) {
                  data.time.push({ id: i, name: "0" + i + "时" });
                } else {
                  data.time.push({ id: i, name: i + "时" });
                }
              }
              data.index[3] = nHours;
              if (nHours == pHours){
                for (let i = 0; i <= pMinutes; i++) {
                  if (i < 10) {
                    data.division.push({ id: i, name: "0" + i + "分" });
                  } else {
                    data.division.push({ id: i, name: i + "分" });
                  }
                }
                data.index[4] = nMinutes;
              } else {
                for (let i = 0; i <= 59; i++) {
                  if (i < 10) {
                    data.division.push({ id: i, name: "0" + i + "分" });
                  } else {
                    data.division.push({ id: i, name: i + "分" });
                  }
                }
                data.index[4] = nMinutes;
              }
            } else {
              for (let i = 0; i <= 23; i++) {
                if (i < 10) {
                  data.time.push({ id: i, name: "0" + i + "时" });
                } else {
                  data.time.push({ id: i, name: i + "时" });
                }
              }
            
              data.index[3] = nHours;
              // console.log(time);
              for (let i = 0; i <= 59; i++) {
                if (i < 10) {
                  data.division.push({ id: i, name: "0" + i + "分" });
                } else {
                  data.division.push({ id: i, name: i + "分" });
                }
              }
              data.index[4] = nMinutes;
            }
          } else {
            let dayNum = this._getNumOfDays(nYear, nMonth);
            for (let i = 1; i <= dayNum; i++) {
              data.day.push({ id: i, name: i + "日" });
            }
            data.index[2] = nDay - 1;
            for (let i = 0; i <= 23; i++) {
              if (i < 10) {
                data.time.push({ id: i, name: "0" + i + "时" });
              } else {
                data.time.push({ id: i, name: i + "时" });
              }
            }
          
            data.index[3] = nHours;
            // console.log(time);
            for (let i = 0; i <= 59; i++) {
              if (i < 10) {
                data.division.push({ id: i, name: "0" + i + "分" });
              } else {
                data.division.push({ id: i, name: i + "分" });
              }
            }
            data.index[4] = nMinutes;
          }
        } else {
          for (let i = 1; i <= 12; i++) {
            data.month.push({ id: i, name: i + "月" });
          }
          data.index[1] = nMonth - 1;
          let dayNum = this._getNumOfDays(nYear, nMonth);
          for (let i = 1; i <= dayNum; i++) {
            data.day.push({ id: i, name: i + "日" });
          }
          data.index[2] = nDay - 1;
          for (let i = 0; i <= 23; i++) {
            if (i < 10) {
              data.time.push({ id: i, name: "0" + i + "时" });
            } else {
              data.time.push({ id: i, name: i + "时" });
            }
          }
          
          data.index[3] = nHours;
          // console.log(time);
          for (let i = 0; i <= 59; i++) {
            if (i < 10) {
              data.division.push({ id: i, name: "0" + i + "分" });
            } else {
              data.division.push({ id: i, name: i + "分" });
            }
          }
          data.index[4] = nMinutes;
        }
      }
      return data
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
      let data = {
        pickerArray: this.data.pickerArray,
        pickerIndex: this.data.pickerIndex
      };
      //首先获取 修改后的日期 然后重新赋值列表数据
      data.pickerIndex[e.detail.column] = e.detail.value;
      let cYear = data.pickerArray[0][data.pickerIndex[0]].id;
      let cMonth = data.pickerArray[1][data.pickerIndex[1]].id;
      let cDay = data.pickerArray[2][data.pickerIndex[2]].id;
      let cTime = data.pickerArray[3][data.pickerIndex[3]].id;
      let cDivision = data.pickerArray[4][data.pickerIndex[4]].id;
      //需要先判断修改后的日期是否是正确的天数 不正确会导致日期错乱等未知情况
      let daysn = this._getNumOfDays(cYear, cMonth);
      //不正确 重新赋值
      if (cDay > daysn){
        cDay = daysn;
      }
      
      // console.log(cYear + '-' + cMonth + '-' + cDay + ' ' + cTime + ':' + cDivision);
      let newDate = this._getDefaultDate(cYear + '-' + cMonth + '-' + cDay + ' ' + cTime + ':' + cDivision);
      //判断修改后的日期是否在限制范围内 不在则重新赋值
      if (newDate > this.data.enDate) {
        newDate = this.data.enDate;
      }
      if (newDate < this.data.stDate){
        newDate = this.data.stDate;
      }
      let tpData = this._getModify(newDate, this.data.stDate, this.data.enDate);
      data.pickerArray[0] = tpData.year;
      data.pickerArray[1] = tpData.month;
      data.pickerArray[2] = tpData.day;
      data.pickerArray[3] = tpData.time;
      data.pickerArray[4] = tpData.division;
      data.pickerIndex = tpData.index;
      
      for (let i = 0; i <=4; i++) {
        if (data.pickerArray[i].length - 1 < data.pickerIndex[i]) {
          data.pickerIndex[i] = data.pickerArray[i].length - 1;
        }
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
    // console.log('进入ready外层节点=', this.data.date);
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
      // console.log('进入ready节点=', this.data.date);
      this._onInit();
    }
  }
})
