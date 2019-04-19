// pages/me/me.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    let userId = wx.getStorageSync('userId');
    app.util.request(app.api.getSysConfig, 'GET').then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          sysConfig: res.data,
        })
      }
    }).catch((error) => {
      console.log(error)
    })
    console.log(userId)
    if (!userId) {
      wx.navigateTo({
        url: '/pages/login',
      })
    }
    
    app.util.request(app.api.getSysMsg + "?userId=" + userId, 'GET').then(function (res) {
      if (res.status && res.status == 1) {
        let data = res.data;
        that.setData({
          message: data.message.num,
          waitAppraise: data.order.waitAppraise, //评价
          waitPay: data.order.waitPay, //待支付
          waitReceive: data.order.waitReceive, //待收货
          waitSend: data.order.waitSend, //待发货,
          waitGrouPon: data.order.waitGrouPon || 0, //拼团
          waitIsAppraise: data.order.waitIsAppraise || 0, //评价
        })
      }

    }).catch((error) => {
      console.log(error)
    })
  },
  getData() {
    const that = this;
    let userId = wx.getStorageSync('userId');
    let openId = wx.getStorageSync('openId');
    app.util.request(app.api.me + "?userId=" + userId, 'GET').then(function (res) {

      if (res.status && res.status == 1) {
        let data = res.data;
        wx.setStorageSync("nickName", data.nickName);
        wx.setStorageSync("gender", data.gender);
        wx.setStorageSync("avatarUrl", data.userPhoto);
        that.setData({
          rankName: data.rankName,
          headerSrc: data.userPhoto,
          userName: data.userName,
          isSharer: data.isSharer,
          userType: data.userType,
          shareRank: data.shareRank,
        })
      }

    }).catch((error) => {
      console.log(error)
    });
    app.util.request(app.api.getSysMsg + "?userId=" + userId, 'GET').then(function (res) {
      if (res.status && res.status == 1) {
        let data = res.data;
        that.setData({
          message: data.message.num,
          waitAppraise: data.order.waitAppraise, //已完成
          waitPay: data.order.waitPay, //待支付
          waitReceive: data.order.waitReceive, //待评价
          waitSend: data.order.waitSend //待收货
        })
      }

    }).catch((error) => {
      console.log(error)
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
    const that = this;
    //判断是否为游客  如果是游客这去登录页面
    let userType = wx.getStorageSync('userType');
    if (userType == -1) {
      that.setData({
        isLogin: false
      })
    } else {
      that.setData({
        isLogin: true
      })
    }
    let openId = wx.getStorageSync('openId');
    let userId = wx.getStorageSync('userId');
    app.util.request(app.api.me + "?userId=" + userId, 'GET').then(function (res) {

      if (res.status && res.status == 1) {
        let data = res.data;
        wx.setStorageSync("nickName", data.nickName);
        wx.setStorageSync("gender", data.gender);
        wx.setStorageSync("avatarUrl", data.userPhoto);
        that.setData({
          rankName: data.rankName,
          headerSrc: data.userPhoto,
          userName: data.userName,
          isSharer: data.isSharer, 
          userType: data.userType,
          shareRank: data.shareRank,
          //wenjun 2019/2/25 重新判断用户身份
          real_shop: data.real_shop,
        })
      }

    }).catch((error) => {
      console.log(error)
      }); app.util.request(app.api.me + "?userId=" + userId, 'GET').then(function (res) {

        if (res.status && res.status == 1) {
          let data = res.data;
          wx.setStorageSync("nickName", data.nickName);
          wx.setStorageSync("gender", data.gender);
          wx.setStorageSync("avatarUrl", data.userPhoto);
          that.setData({
            rankName: data.rankName,
            headerSrc: data.userPhoto,
            userName: data.userName,
            isSharer: data.isSharer,
            userType: data.userType,
            shareRank: data.shareRank,
          })
        }

      }).catch((error) => {
        console.log(error)
      });
    //如果存在opendId 先获取用户微信信息 再获取小程序里面信息 如果有则覆盖
    app.util.request(app.api.getUsers, 'GET', { openid: openId }).then((res) => {
      if (res.status && res.status == 1) {
        let data = res.data.usersinfo;
        if (data.userId && data.userId != '') {
          wx.setStorageSync('userId', data.userId);
          that.setUserInfo(data.userName, data.userSex, data.userPhoto);
        }
      }
    }).catch((error) => {
      console.log('通过getUsers获取用户信息失败' + error)
    });
    //this.getData();
    app.util.request(app.api.getSysMsg + "?userId=" + userId, 'GET').then(function (res) {
      if (res.status && res.status == 1) {
        let data = res.data;
        that.setData({
          message: data.message.num,
          waitAppraise: data.order.waitAppraise, //评价
          waitPay: data.order.waitPay, //待支付
          waitReceive: data.order.waitReceive, //待收货
          waitSend: data.order.waitSend, //待发货,
          waitGrouPon: data.order.waitGrouPon || 0, //拼团
          waitIsAppraise: data.order.waitIsAppraise || 0, //评价
        })
      }

    }).catch((error) => {
      console.log(error)
    })
  },
  //赋值头像性别名字
  setUserInfo(nameArgu, genderArgu, avatarUrlArgu) {
    let nickName = wx.getStorageSync("nickName");
    if (nameArgu) {
      nickName = nameArgu;
    }
    let gender = wx.getStorageSync("gender");
    if (genderArgu) {
      gender = genderArgu;
    }
    let avatarUrl = wx.getStorageSync("avatarUrl");
    if (avatarUrlArgu) {
      avatarUrl = avatarUrlArgu;
    }
    this.setData({
      headerSrc: avatarUrl,
      userName: nickName
    })
  },
  goMineOrder: function (e) {
    var url = '/pages/mine-order/mine-order?status=' + e.currentTarget.dataset.status;
    wx.navigateTo({
      url: url,
    })
  },
  getAdURL:function(e){
    var url = e.currentTarget.dataset.url;
    var type = e.currentTarget.dataset.type;
    switch (type){
      case 'reLaunch':
      wx.reLaunch({
        url: url,
      })
        break;
      case 'redirectTo':
        wx.redirectTo({
          url: url,
        })
        break;
      case 'switchTab':
        wx.switchTab({
          url: url,
        })
        break;
      default:
        wx.navigateTo({
          url: url,
        })
        break;
    }
  },

  indexClick:function(e){
    console.log(e.currentTarget.dataset.str);
    console.log(e.currentTarget.dataset.url);
   // ['1'=>'商品详情','2'=>'商品分类','3'=>'商品关键词',
   //  '4'=>'早餐','5'=>'平行车行','6'=>'拼团','7'=>'砍价','8'=>'秒杀',
   //  '9'=>'加入爱搜品','10'=>'商家入驻','11'=>'成为店长'];
    let str = e.currentTarget.dataset.str;
    let id  = e.currentTarget.dataset.url;
    switch (str) {
      case '1':
        var urlVal ='/pages/shopsDetail/shopsDetail?goodsId='+id;
        break;
      case '2':
        var urlVal ='/pages/cat-list/cat-list?catId='+id;
        break;
      case '3':
        var urlVal ='/pages/cat-list/cat-list?keyword='+id;
        break;
      case '4':
        var urlVal ='/pages/index/imgAd?type=2';
        break;
      case '5':
        var urlVal ='/pages/index/imgAd?type=0';
        break;
      case '6':
        var urlVal ='/pages/cat-list-assemble/cat-list-assemble';
        break;
      case '7':
        let arr        = wx.getStorageSync('selectArea');
        let currAreaId = arr.id;
        var urlVal ='web?url=addon/bargain-goods-wxlists_app.html&areaId=' + currAreaId;
        break;
      case '8':
        let rs        = wx.getStorageSync('selectArea');
        let AreaId = rs.id;
        var urlVal ='web?url=wechat/seckill/list_app.html&areaId=' + AreaId;
        break;
      case '9':
        var urlVal ='web?url=wechat/sharerapplys/keeper_app.html';
        break;
      case '10':
        var urlVal ='web?url=/wechat/consult/consult';
        break;
      case '11':
        var urlVal ='web?url=wechat/sharerapplys/keeper_app.html';
        break;
      default:
        var urlVal ='/pages/index/index';
        break;
    }
    console.log('============');
    console.log(urlVal);
    wx.navigateTo({
        url: '/pages/index/'+urlVal,
      })
    }
})