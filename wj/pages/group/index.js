
const app = getApp().globalData;
var timeMachine;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: {
      hour: '00',
      min: '00',
      second: '00'
    },
    tabs: [
      {
        top: '尖叫好货',
        bottom: '人气最高',
        type: 2
      }, {
        top: '超值特惠',
        bottom: '爆款推荐',
        type: 1
      }, {
        top: '今日上新',
        bottom: '加入疯抢',
        type: 3
      },
    ],
    tabsIndex: 0,
    page: 1,
    loadingText: '正在加载。。。',
    shopLists: [],
    loadingOver: false,
    opacity: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData() {
    const that = this;
    let obj = {
      page: that.data.page,
      pagesize: 20,
      areaId: wx.getStorageSync('selectArea').id || ''
    };
    this.getShopsList(obj);
    this.toggleAd(2);
    app.util.request(app.api.groupImg, 'GET').then((res) => {
      this.setData({
        img: res.data.top,
        wxapp_group_ads: res.data.wxapp_group_ads
      })
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
      let day = parseInt(time / 3600 / 24);
      let hour = parseInt(time / 3600 % 24);
      if (hour < 10) {
        hour = '0' + hour;
      }
      let min = parseInt((time - hour * 3600 - day * 24 * 3600) / 60);
      if (min < 10) {
        min = '0' + min;
      }
      let second = parseInt((time - hour * 3600 - day * 24 * 3600) % 60);
      if (second < 10) {
        second = '0' + second;
      }
      let obj = {
        day: day,
        hour: hour,
        min: min,
        second: second
      }
      this.setData({
        timer: obj
      })
    }
    const that = this;
    if (pan) {
      timeMachine = setTimeout(function () {
        that.timer(time)
      }, 1000)
    }

  },
  onShareAppMessage: function () {

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
  onReachBottom: function () {
    let page = this.data.page;
    if (this.data.loadingOver) return;
    ++page;
    this.getShopsList({ page: page })
  },
  onPageScroll: function (res) {
    let top = res.scrollTop / 500;
    if (top > 1) {
      top = 1;
    } else {
      this.setData({
        opacity: top
      })
    }
  },
  //切换tab栏
  toggleTab: function (e) {
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;
    this.setData({
      tabsIndex: index
    });
    this.toggleAd(type);
  },
  //切换广告信息
  toggleAd: function (typeArgu) {
    let type = typeArgu || 1;
    app.util.request(app.api.grouGoods, 'GET', { type: typeArgu }).then((res) => {
      if (res.status && res.status == 1) {
        let nowTime = parseInt(new Date().getTime() / 1000);
        let endTime = parseInt(new Date(res.goods[0].endTime.replace(/-/g, '/')).getTime() / 1000);
        clearTimeout(timeMachine);
        this.timer(endTime - nowTime)
        this.setData({
          adData: res.goods[0],
        })
      }
    })
  },
  //获取商品列表
  getShopsList(objArgu) {
    const that = this;
    let obj = {
      pagesize: 20,
      page: 1,
      goodsName: that.data.searchText || ''
    };
    Object.assign(obj, objArgu);
    that.setData({
      page: obj.page
    });
    let pageSize = obj.pagesize;
    let loadingText = '正在加载。。。';
    let loadingOver = false;
    app.util.request(app.api.groupListPageQuery, 'GET', obj).then((res) => {
      if (res.status == 1) {
        let goodsLength = res.data.Rows.length;
        if (goodsLength < pageSize) {
          loadingText = '没有更多';
          loadingOver = true
        }
        that.setData({
          shopLists: that.data.shopLists.concat(res.data.Rows),
          loadingText: loadingText,
          loadingOver: loadingOver
        })
      }
    }).catch((error) => {

    });
  },
  //去拼单
  goGroup(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cat-list-assemble/cat-detail-assemble?goodsId=' + id,
    })
  },
  //搜索关键字
  searchText: function (e) {
    let value = e.detail.value || '';
    this.setData({
      searchText: value
    })
  },
  //搜索
  search: function () {
    let searchText = this.data.searchText || '';
    const that = this;
    that.setData({
      page: 1
    })
    let obj = {
      pagesize: 20,
      page: 1,
      goodsName: searchText
    };
    let pageSize = obj.pagesize;
    let loadingText = '正在加载。。。';
    let loadingOver = false;
    app.util.request(app.api.groupListPageQuery, 'GET', obj).then((res) => {
      if (res.status == 1) {
        let goodsLength = res.data.Rows.length;
        if (goodsLength < pageSize) {
          loadingText = '没有更多';
          loadingOver = true
        }
        that.setData({
          shopLists: res.data.Rows,
          loadingText: loadingText,
          loadingOver: loadingOver
        })
      }
    }).catch((error) => {

    });
  }



})