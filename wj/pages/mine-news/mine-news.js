// pages/mine-news/mine-news.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    messageLists: [],
    loadingText: '正在加载...',
    loading: false,
    pageSize: 30,
    selectIds: [],
    isSelectAll: false,



    selectedAllStatus: false,
    showCheckbox: false,
    showGoods: true,
    datas: [{
      read:false,
      selected: false,
      title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
    },
    {
     read:true,
      selected: false,
      title: '2韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
    },
    {
      selected: false,
      read: true,
      title: '3韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
    },
    {
     read:true,
      selected: false,
      title: '4韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInitData();
  },
  getInitData() {
    let obj = {
      userId: wx.getStorageSync('userId'),
      page: 1,
      pageSize: this.data.pageSize
    }
    app.util.request(app.api.getMyMess, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        let rows = res.data.Rows;
        rows.map((val, index) => {
          val.select = false;
        });
        this.setData({
          messageLists: rows
        });
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  //获取更多信息
  getMessageList: function () {
    let page = this.data.page;
    let messageLists = this.data.messageLists;
    page++;
    let obj = {
      userId: wx.getStorageSync('userId'),
      page: page,
      pageSize: this.data.pageSize
    }
    app.util.request(app.api.getMyMess, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        let rows = res.data.Rows || [];
        if (rows.length == 0) {
          this.setData({
            loadingText: '全部加载完毕'
          })
        } else {
          rows.map((val, index) => {
            val.select = false;
          });
          this.setData({
            page: page,
            messageLists: messageLists.concat(rows),
            loadingText: '正在加载...'
          });
        }

      }
    }).catch((error) => {
      console.log(error)
    })
  },
  onReachBottom: function () {
    this.setData({
      loading: true
    });
    this.getMessageList();
  },
  //选择单个
  select: function (e) {
    let messageLists = this.data.messageLists;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let selectIds = this.data.selectIds;
    let isSelect = messageLists[index].select;
    if (isSelect == false) {
      //如果未选中 则加入选中样式并且id加入selectIds中
      messageLists[index].select = true;
      selectIds.push(id);

    } else {
      messageLists[index].select = false;
      messageLists = app.util.arrayDelete(messageLists, id);
      selectIds = app.util.arrayDelete(selectIds, id);
    };
    //判断是否全部选中了
    let pan = true;
    messageLists.map((val, index) => {
      if (val.select == false) {
        pan = false;
      }
    });
    if (pan) {
      this.setData({
        isSelectAll: true,
        selectedAllStatus:true
      })
    } else {
      this.setData({
        isSelectAll: false,
        selectedAllStatus:false
      })
    }
    this.setData({
      messageLists: messageLists
    });
    

  },
  //全选
  selectAll: function () {
    
    let isSelectAll = this.data.isSelectAll;
    let messageLists = this.data.messageLists;
    let arr = [];
    if (isSelectAll) {
      messageLists.map((val, index) => {
        val.select = false;
      });
      this.setData({
        isSelectAll: false,
        selectIds: []
      })
    } else {
      messageLists.map((val, index) => {
        val.select = true;
        arr.push(val.id)
      });
      this.setData({
        isSelectAll: true,
        selectIds: arr
      })
    };
    this.setData({
      messageLists: messageLists
    })

    var selectedAllStatus = this.data.selectedAllStatus ? false : true;
    var datas = this.data.datas;
    for (var i = 0; i < datas.length; i++) {
      datas[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus
    });
  },
  //删除消息
  deleteMessage: function () {
    const that = this;
    let selectIds = this.data.selectIds || [];
    if (selectIds.length == 0) {
      wx.showToast({
        title: '请选择消息',
        icon: 'none'
      })
    } else {
      wx.showModal({
        title: '确定删除？',
        content: '',
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            let obj = {
              userId: wx.getStorageSync('userId'),
              msgIds: selectIds.join(',')
            }
            app.util.request(app.api.delMyMess, 'GET', obj).then((res) => {
              if (res.status && res.status == 1) {
                wx.showToast({
                  title: '删除成功',
                });
                that.setData({
                  page: 1
                });
                that.getInitData();
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                })
              }
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

  },
  //查看详情
  goDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let messageLists = this.data.messageLists;
    messageLists[index].msgStatus = 1;
    this.setData({
      messageLists: messageLists
    })
    wx.navigateTo({
      url: '/pages/mine-news/messageDetail?id=' + id,
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },















  bindCheckbox: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var datas = this.data.datas;
    var selected = datas[index].selected;
    datas[index].selected = !selected;
    var allSelect = true;
    for (var i = 0; i < datas.length; i++) {

      if (!datas[i].selected) {
        allSelect = false;
      }
    }
    this.setData({
      datas: datas,
      selectedAllStatus: allSelect
    });
  },
  bindSelectAll: function () {
    var selectedAllStatus = this.data.selectedAllStatus ? false : true;
    var datas = this.data.datas;
    for (var i = 0; i < datas.length; i++) {
      datas[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      datas: datas
    });
  },
  changeCheckbox: function (e) {
    let isSelectAll = this.data.isSelectAll;
    var datas = this.data.datas;
    for (var i = 0; i < datas.length; i++) {
      datas[i].selected = false;
    }
    this.setData({
      datas: datas,
      showCheckbox: !this.data.showCheckbox,
      selectedAllStatus: isSelectAll,
    });
  },
  delete: function (e) {
    var datas = this.data.datas;
    var delJson = [];
    delJson = datas.filter(item => {
      if (item.selected) {
        return item;
      }
    });
    datas = datas.filter(item => {
      if (!item.selected) {
        return item;
      }
    });
    if (delJson.length < 1) {
      wx.showToast({
        icon: 'none',
        title: '您未选择删除内容喔',
      })
    } else {
      this.setData({
        datas: datas
      });
      wx.showToast({
        title: '删除成功',
      })
    }
  }
})