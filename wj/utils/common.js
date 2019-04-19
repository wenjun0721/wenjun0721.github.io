var app = getApp();
//判断登录状态

//

//
function _getRequest(url, data, method, reLaunch, fun) {
  if (fun == "" || fun == null) {
    fun = function (res) {
      var reLaunchUrl = null;
      if (res.data.code) {
        reLaunchUrl = reLaunch;
      }
      _getShow(res.data.msg, null, res.data.code, reLaunchUrl, 1500);
    }
  }
  wx.request({
    url: _getApiUrl + url,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    method: method,
    success: fun
  })
}

function _getShow(msg, fun, type, url, time) {
  var imgVal = null;
  if (type == "success" || type == true) {
    imgVal = "../static/fail.png";
  } else if (type == "error" || type == false) {
    imgVal = "../static/fail.png";
  } else if (type == "loading") {
    imgVal = "../static/fail.png";
  }
  wx.showToast({
    title: msg,
    image: imgVal,
    duration: time,
    success: function (res) {
      if (!_isBlank(url)) { _getReLaunch(url) }
    }
  });
}

//判断是否null
function _isBlank(str) {
  if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }

}
function _getReLaunch(url) {
  setTimeout(function () {
    wx.reLaunch({
      url: url
    });
  }, 2000)
}



function _getShopType(value) {
  //分销商等级1系统 2经理 3 店长 4 销售经理
  var Str = "";
  switch (value){
    case 1:
      Str = "系统";
    break;
    case 2:
      Str = "ISP联盟旗舰店";
      break;
    case 3:
      Str = "isp联盟店";
      break;
    case 4:
      Str = "isp会员店";
      break;
  }
  return Str;
}

// module.exports._getformateData = _getformateData;
module.exports = {
  getShow: _getShow,
  getRequest: _getRequest,
  getShopType: _getShopType
}

