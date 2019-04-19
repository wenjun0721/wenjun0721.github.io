// pages/address/getAddress.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areas:[],
    areaGrade:0,
    preId:[
      {grade:0,id:0},
      { grade: 1, id: 0 },
      { grade: 2, id: 0 },
      { grade: 3, id: 0 },
      { grade: 4, id: 0 },
    ],
    hiddenLoading:true,
    modalHidden:true,
    tips:"数据加载失败",
    parentId:0,
    parentText: '全国',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that =this;
    app.util.request(app.api.areaList).then(function(res){
      that.setData({
        areas:res.data
      })
    }).catch(function(err){
      console.log(err)
    })
    //wenjun 2019/1/31 修改于2/15
    //获取历史定位
    this.GetHistorical_dw();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  //返回上一级
  goBack:function(){
    console.log(11)
    wx.navigateBack({
      delta: 1
    })
  },
  //wenjun 2019/1/31
  //历史定位
  GetHistorical_dw:function(){
      const that =this;
      
      let userId   = wx.getStorageSync('userId');
      var datas = {
        userId:userId
      };
      app.util.request(app.api.GetHistorical_dw, 'GET', datas).then(function (res) {
          console.log(res)
          that.setData({
            His: res
          });
        }).catch((error) => {
          console.log(error)
        })
  },
  //地区选择
  areaSelect:function(e){
    this.setData({
      hiddenLoading:false
    })
    const that =this;
    let gradeArr = that.data.preId;
    let id =e.target.id;
    let parentId = e.target.dataset.parentid;
    let text = e.target.dataset.val;
    let data={
      parentId:id
    }
    this.setData({
      parentId: id,
      parentText: text
    })
    app.util.request(app.api.areaList+"/?parentId="+id).then(function (res) {
      console.log(res)
      if(res.status==1 && res.status){
        that.setData({
          hiddenLoading: true
        });
        if (res.data && res.data.length > 0) {
          that.setData({
            areas: res.data,
            areaGrade: that.data.areaGrade + 1
          });
          gradeArr.forEach(function (val, index) {
            if (val.grade == that.data.areaGrade) {
              gradeArr[index].id = id;
            }
          });
          that.setData({
            preId: gradeArr,
          });
        }else{
          let address={
            id:id,
            text:text
          }
          wx.setStorageSync('selectArea', address);
          wx.reLaunch({
            url: '/pages/index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onShow();
            } 
          });
        }
      }

    }).catch(function (err) {
      that.setData({
        hiddenLoading:true,
        modalHidden:false
      })
      console.log(err)
    })
  },
  //返回上一级
  backGrade:function(){
    const that =this;
    this.setData({
      areaGrade: this.data.areaGrade-1
    });
    app.util.request(app.api.areaList + "/?parentId=" + this.data.preId[this.data.areaGrade].id).then(function (res) {
      if (res.data && res.data.length > 0) {
        that.setData({
          areas: res.data,
        });
      }
    }).catch(function (err) {
      console.log(err)
    })
  },
  //隐藏对话框
  modalBindcancel:function(){
    this.setData({
      modalHidden:true
    })
  },
  //选取所有区域
  selectAllArea:function(){
    let address = {
      id: this.data.parentId,
      text: this.data.parentText
    }
    console.log(address)
    try {
      wx.setStorageSync('selectArea', address);
    } catch (e) {
      console.log(e)
     }
    wx.reLaunch({
      url: '/pages/index/index',
    });
  },
  getAuth:function(){
    let that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] == true){
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              console.log(res)
              var datas = {
                latitude: res.latitude,
                longitude: res.longitude
              };
              app.util.request(app.api.getTown, 'GET', datas).then((res) => {
                if (res.status == 1) {
                  let address = {
                    id: res.data.areaId,
                    text: res.data.areaName,
                  }
                  wx.setStorageSync('selectArea', address);
                  wx.reLaunch({
                    url: '/pages/index/index',
                  });
                }
              }).catch((error) => {
                console.log(error)
              })
            }
          })
        }else if (res.authSetting['scope.userLocation']==false) {
          that.openConfirm()
        } else {
          that.getTown()
        } 
      }
    })
  }

  ,
  getTown: function () {
    let that = this;
    let selectArea = wx.getStorageSync('selectArea');
   
    if (selectArea == '') {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          console.log(res)
          var datas = {
            latitude: res.latitude,
            longitude: res.longitude
          };
          app.util.request(app.api.getTown, 'GET', datas).then((res) => {
            if (res.status == 1) {
              let address = {
                id: res.data.areaId,
                text: res.data.areaName,
              }

              console.log("2222")
              try {
                wx.setStorageSync('selectArea', address);
              } catch (e) {
                console.log(e)
              }
              wx.reLaunch({
                url: '/pages/index/index',
              });
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    }
  },
  openConfirm: function () {
    let that =this;
    wx.showModal({
      content: '检测到您没打开Isp的定位权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          that.getTown()
          wx.openSetting({
            success: (res) => { }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },

})