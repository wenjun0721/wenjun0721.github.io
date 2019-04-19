const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    isShareIdStatus:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("********")
    console.log(options)
    console.log("********")
    var type = options.type || 0;
    switch (type) {
      case 'kefu':
        var urlVal =app.api.getKefu;
        break;
      case 'wxlists':
        var urlVal = options.url + "?app=1";
        if (options.id) {
          urlVal = urlVal + "&" + "id=" + options.id;
        }
        if (options.bargainUserId) {
          urlVal = urlVal + "&" + "bargainUserId=" + options.bargainUserId;
        }
      case 'isShareId':
        var urlVal = options.url + "?app=1";
        break;

      default:
        var urlVal = app.api.webUrl+options.url + "?app=1";
        if (options.areaId) {
          urlVal = urlVal + "&" + "areaId=" + options.areaId;
        }
        if (options.shopId) {
          urlVal = urlVal + "&" + "shopId=" + options.shopId;
        }
        if (options.id) {
          urlVal = urlVal + "&" + "id=" + options.id;
        }
        if (options.ordId) {
          urlVal = urlVal + "&" + "oId=" + options.ordId+ "&" + "type=" + type;
        }
        
    }
    console.log("web-view地址是:" + urlVal)
    this.setData({
      url: urlVal
    })
  },
  msgHandler(e) {
    let that = this;
    //接收web-view传递的参数
    var dataArr = e.detail.data
    var dataArrLength = dataArr.length;
    var data = e.detail.data[dataArrLength - 1]
    var bargainUserId="";
    if (data.bargainUserId) {
      bargainUserId = data.bargainUserId;
    }
    that.setData({
      //存储状态
      title: data.title,
      urlVal: data.url,
      img: data.img,
      id: data.id,
      bargainUserId: bargainUserId,
      type: data.type || '',
    })
  },
  onShareAppMessage(opt) {
    console.log(opt)
      var title = this.data.title;
      var img =  this.data.img;
      var urlVal =  this.data.url;
      var id =  this.data.id;
      var bargainUserId =  this.data.bargainUserId;
      // var type =  this.data.type;
      var type = 'isShareId';
      
      // urlVal = '/pages/index/web?type=' + type + '&url=' + urlVal + '&id=' + id + '&bargainUserId=' + bargainUserId + '&isShareId=1';
      urlVal = '/pages/index/web?type=' + type + '&url=' + urlVal;
      console.log('---------');
      console.log(urlVal);
      return {
        title: title,
        imageUrl: img,
        path: urlVal,
        success: function (res) {
          console.log('-----------------')
          console.log(res)
          // 转发成功
          //webViewUrl=https://www.isp-cn.com//wechat/favorites/list_app.html?app=1
        },
        fail: function (res) {
          console.log(res)
          // 转发失败
        }
      
    }
  },
})