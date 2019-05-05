const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
   * 封装微信小程序request API
   * @type {Object}
   */
function request(url, method = "POST", data = {}, ) {
    return new Promise(function (resolve, reject) {
      wx.getNetworkType({
        success: function (res) {
          if (res.networkType != 'none') {
            wx.request({
              url: url,
              data: data,
              method: method,
              header: {
                'Content-Type': 'application/json',
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  resolve(res.data);
                } else {
                  reject(res.errMsg);
                }

              },
              fail: function (err) {
                reject(err)
                console.log("failed")
              },
              complete: function (res) {
                // console.log(res);
              }
            })
          } else {
            wx.showToast({
              title: "请检查网络",
              image: '/images/error.png',
              duration: 1000
            })
          }
        },
        fail: function (res) {
          //
        }
      })
    })
  }

//删除数组中的某个元素 返回新元素

var arrayDelete = function (arr, obj) {
  let newArr = arr;
  if (typeof (obj) == "object") {
    obj.map(function (val, index) {
      let parent = val;
      let parentIndex = index;
      newArr.map(function (val, index) {
        if (parent == val) {
          newArr.splice(index, 1);
        }
      })
    });
  } else {
    newArr.map(function (val, index) {
      if (obj == val) {
        newArr.splice(index, 1);
      }
    })
  }

  return newArr;
}

module.exports = {
  formatTime: formatTime,
  request: request,
  arrayDelete: arrayDelete,
}

