// pages/search/search.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: {
      hour: '00',
      min: '00',
      second: '00'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let groupNo = options.groupNo || 100627295;
    // let groupNo = options.groupNo ;
    console.log(groupNo)
    this.setData({
      groupNo: groupNo
    });
    this.getData();
  },
  getData() {
    const that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      groupNo: that.data.groupNo
    };
    if (userId) {
      obj.userId = userId
    };
    app.util.request(app.api.getGroupDetail, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        let obj = res.data;
        obj.redNum = obj.groupNum - obj.innerNum;
        let localUserId = wx.getStorageSync('userId');
        //判断是不是团长
        if (obj.orders.length > 0) {
          let userId = obj.orders[0].userId;
          if (localUserId == userId) {
            obj.isLeader = true;
          } else {
            obj.isLeader = false;
          }
        }
        this.setData({
          groupData: obj,
          goodsId: res.data.goodsId
        });
        let nowTime = parseInt(new Date().getTime() / 1000);
        let endTime = parseInt(new Date(res.data.endTime.replace(/-/g, '/')).getTime() / 1000);
        this.timer(endTime - nowTime);
      }
    }).catch((error) => {

    })
  },
  timer: function (timeArgu) {
    let time = timeArgu;
    let pan = true;
    --time;
    if (time < 0) {
      pan = false
    } else {
      let hour = parseInt(time / 3600);
      let min = parseInt((time - 3600 * hour) / 60);
      let second = (time - 3600 * hour) % 60;
      let obj = {
        hour: hour,
        min: min,
        second: second
      }
      this.setData({
        time: obj
      })
    }
    const that = this;
    if (pan) {
      setTimeout(function () {
        that.timer(time)
      }, 1000)
    }

  },
  onShareAppMessage: function () {
    let path = '/pages/group/joinGroup?groupNo=' + this.data.groupNo;
    var shareObj = {
      title: "拼团商品",
      imgUrl: '',
      path: path,
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete: function () {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    };

    // 返回shareObj
    return shareObj;
  },
  //邀请好友
  inviteGroup: function () {
    this.onShareAppMessage();
  },
  //查看所有拼团
  lookGroup: function () {
    wx.navigateTo({
      url: '/pages/cat-list-assemble/cat-detail-assemble?goodsId=' + this.data.goodsId,
    })
  },
  //返回拼团首页
  backGroup: function () {
    wx.navigateTo({
      url: '/pages/group/index',
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  //返回上一页
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //参团
  joinGroup: function () {
    wx.navigateTo({
      url: '/pages/cat-list-assemble/cat-detail-assemble?groupNo=' + this.data.groupNo + '&goodsId=' + this.data.groupData.goodsId,
    })
  },
  //开团
  openGroup: function () {
    console.log(this.data.groupData.goodsId)
    wx.navigateTo({
      url: '/pages/cat-list-assemble/cat-detail-assemble?goodsId=' + this.data.groupData.goodsId,
    })
  },

})