// pages/area-select/area-select.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areas: [],
    areaGrade: 0,
    preId: [
      { grade: 0, id: 0 },
      { grade: 1, id: 0 },
      { grade: 2, id: 0 },
      { grade: 3, id: 0 },
      { grade: 4, id: 0 },
    ],
    hiddenLoading: true,
    modalHidden: true,
    tips: "数据加载失败",
    parentId: 0,
    parentText: '全国',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    app.util.request(app.api.areaList).then(function (res) {
      that.setData({
        areas: res.data
      })
    }).catch(function (err) {
      console.log(err)
    })
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
  goBack: function () {
    console.log(11)
    wx.navigateBack({
      delta: 1
    })
  },
  //地区选择
  areaSelect: function (e) {
    this.setData({
      hiddenLoading: false
    })
    const that = this;
    let gradeArr = that.data.preId;
    let id = e.target.id;
    let parentId = e.target.dataset.parentid;
    let text = e.target.dataset.val;
    let data = {
      parentId: id
    }
    this.setData({
      parentId: id,
      parentText: text
    })
    app.util.request(app.api.areaList + "/?parentId=" + id).then(function (res) {
      console.log(res)
      if (res.status == 1 && res.status) {
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
        } else {
          let address = {
            id: id,
            text: text
          }
          wx.setStorageSync('selectArea', address);
          wx.switchTab({
            url: '/pages/index/index',
          });
        }
      }

    }).catch(function (err) {
      that.setData({
        hiddenLoading: true,
        modalHidden: false
      })
      console.log(err)
    })
  },
  //返回上一级
  backGrade: function () {
    const that = this;
    this.setData({
      areaGrade: this.data.areaGrade - 1
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
  modalBindcancel: function () {
    this.setData({
      modalHidden: true
    })
  },
  //选取所有区域
  selectAllArea: function () {
    let address = {
      id: this.data.parentId,
      text: this.data.parentText
    }
    wx.setStorageSync('selectArea', address);
    wx.switchTab({
      url: '/pages/index/index',
    });
  }

})