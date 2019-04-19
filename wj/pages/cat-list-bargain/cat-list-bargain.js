// pages/cat-list-bargain/cat-list-bargain.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    side: { //滑动操作
      pageX: 0,
      newpageX: 0,
      open: false,
      newopen: false, //判断侧边栏是否打开-显示
    },
    open: false,
    shopLists: [ ],
    TimeVal:[],
    Timeindex:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //bargainWxapplists
    var that = this;
    wx.setNavigationBarTitle({
      title: '全民砍价'
    })
  that.getData();
  },
  //初始化数据
  getData:function(){
    var that = this;
    app.util.request(app.api.bargainWxapplists, 'GET').then((res) => {
      console.log(res)
      if (res.Rows.length == 0) {
        that.setData({
          loadingText: '暂无商品'
        })
      } else {
        for(var i = 0 ;i < res.Rows.length;i++){
          res.Rows[i].startTime = Date.parse(res.Rows[i].startTime) ;
          res.Rows[i].endTime = Date.parse(res.Rows[i].endTime);
          that.GetInterval(res.Rows[i].endTime,i)
        }
        that.setData({
          shopLists: res.Rows
        })
      }
    })
  },
  GetInterval: function (endTime,index){
   var that = this;
   var timestamp = Date.parse(new Date());

    
    setInterval(function () {
      var nowTime = (endTime - timestamp) //计算剩余的毫秒数 
      endTime = endTime - 1000;
      //计算剩余的天数 
      var days = parseInt(nowTime / 1000 / 60 / 60 / 24, 10);
      //计算剩余的小时 
      var hours = parseInt(nowTime / 1000 / 60 / 60 % 24, 10);
      //计算剩余的分钟 
      var minutes = parseInt(nowTime / 1000 / 60 % 60, 10);
      //计算剩余的秒数 
      var seconds = parseInt(nowTime / 1000 % 60, 10);
       var obj ={};
      obj[index] =  days + "天" + hours + "小时" + minutes + "分" + seconds + "秒",
      that.setData({
        TimeVal: obj
      })
       }, 1000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  goCatDetailBargain: function (e) {
    var url = '../cat-list-bargain/cat-detail-bargain'
    wx.navigateTo({
      url: url,
    })
  },
  // 打开/关闭侧边栏
  // tap_ch: function (e) {
  //   console.log(e)
  //   if (this.data.open) {
  //     this.setData({
  //       open: false
  //     });
  //   } else {
  //     this.setData({
  //       open: true
  //     });
  //   }
  // },
  tap_click: function () { //点击菜单
    console.log('hh')
    this.data.side.open = !this.data.side.open;
    this.setData({
      'side.newopen': this.data.side.open
    });
  },
  tap_start: function (e) { //touchstart事件
    this.data.side.pageX = this.data.side.newpageX = e.touches[0].pageX;
  },
  tap_move: function (e) { //touchmove事件
    this.data.side.newpageX = e.touches[0].pageX;
  },
  tap_end: function () { //touchend事件
    if (this.data.side.pageX != this.data.side.newpageX) {
      this.data.side.open = this.data.side.pageX > this.data.side.newpageX ? true : false;
      this.setData({
        'side.newopen': this.data.side.open
      });
    }
  },
})