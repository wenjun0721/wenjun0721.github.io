// pages/mine-address/mine-address.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    editModal:false,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    addressTagsIndex: 0,
    editpathName:"",
    selectAreaText: {
      text: '请选择',
      id: 0,
    },
    addressTags: [
      { text: '公司' },
      { text: '住宅' },
      { text: '学校' },
      { text: '其它' },
    ],
    selectAreasParent: [{
      text: '全国',
      id: 0
    }],
    areaSelectIndex: 1,
    isBottom: false,
    isLoading: true,
    isShowSelectArea: false,
    areaLists: [],





    editregion: ['广东省', '广州市', '海珠区'],
    editcustomItem: '全部',
    editaddressTagsIndex: 0,
    editselectAreaText: {
      text: '请选择',
      id: 0,
    },
    editaddressTags: [
      { text: '公司' },
      { text: '住宅' },
      { text: '学校' },
      { text: '其它' },
    ],
    editselectAreasParent: [{
      text: '全国',
      id: 0
    }],
    editareaSelectIndex: 1,
    editisBottom: false,
    editisLoading: true,
    editisShowSelectArea: false,
    editareaLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '地址管理'
    })
    if (options.orderType == "group"){
      this.setData({
        orderType: options.orderType
      })
    }
    if (options.order) {
      this.setData({
        isOrder: true
      })
    }
    if (options.groupOrder) {
      this.setData({
        groupOrder: true
      })
    }
    const that = this;
    
    app.util.request(app.api.areaList, 'GET').then((res) => {
      if (res.data) {
        that.setData({
          areaLists: res.data
        })
      }
    }).catch((error) => {
      console.log(error)
    })


    this.getData();


  },
  
  showModal: function (e) {
    this.setData({
      showModal: true
    })
  },
  hideModal: function (e) {
    this.setData({
      showModal: false,
      editModal: false
    })
  },
  //切换地址类型
  toggleAddressTags: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      addressTagsIndex: index
    })
  },
  //选择区域
  selectArea: function (e) {
    console.log(e)
    const that = this;
    let text = e.currentTarget.dataset.value;
    let selfId = e.currentTarget.dataset.selfid;
    let parentId = e.currentTarget.dataset.parentid;
    let selectAreasParent = that.data.selectAreasParent;
    let areaSelectIndex = that.data.areaSelectIndex;//区域选取顺序 0:省 1:市 2:区 ....
    let isBottom = that.data.isBottom;
    if (!isBottom) {
      //拼接这个对象的文字 id 给父级区域选择
      let obj = {
        text: text,
        id: selfId
      };
      //赋值
      selectAreasParent[areaSelectIndex] = obj;
      //赋值完后 父级区域选择变成下一步
      areaSelectIndex++;
      that.setData({
        areaSelectIndex: areaSelectIndex,
        selectAreasParent: selectAreasParent
      })
      //console.log(that.data.areaSelectIndex)
    } else {
      let obj = {
        text: text,
        id: selfId
      };
      //赋值
      selectAreasParent[areaSelectIndex - 1] = obj;
      //赋值
      that.setData({
        selectAreasParent: selectAreasParent
      })
    }
    app.util.request(app.api.areaList + "?parentId=" + selfId, 'GET').then((res) => {
      if (res.data) {
        that.setData({
          areaLists: res.data,
          isBottom: false,
          isLoading: true
        });
      } else {
        //选取为最底级别
        let text = '';
        let selectAreasParent = that.data.selectAreasParent;
        selectAreasParent.map((val, index) => {
          if (index == 0) return;
          text += val.text;
        })
        let obj = {
          text: text,
          id: selfId
        }
        that.setData({
          isBottom: true,
          isLoading: true,
          selectAreaText: obj,
          isShowSelectArea: false
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  
  //隐藏选取收货地址
  hideSelect: function () {
    this.setData({
      isShowSelectArea: false
    })
  },
  //获取初始数据
  getData() {
    const that = this;
    let userId = wx.getStorageSync('userId');
    //获取收货地址
    app.util.request(app.api.getAddress + "?userId=" + userId, 'GET').then((res) => {
      if (res.data) {
        that.setData({
          addressLists: res.data
        })
      }
    }).catch((error) => {
      console.log(error)
    })

  },
  //返回按钮
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //切换默认地址
  toggleDefault: function (e) {

  },
  //编辑收货地址
  goEdit: function (e) {
    const that = this;
    let userId = wx.getStorageSync('userId');
    let addressId = e.currentTarget.dataset.id;
    let data = {
      userId: userId,
      addressId: addressId
    }
    that.setData({
      addressId: addressId,

      editModal: true
    })
    //获取收货地址
    app.util.request(app.api.getOneAddress, 'GET', data).then((res) => {
     
      if (res.data) {
        let data = res.data[0];
        console.log(data)
        let obj = {
          text: data.pathName,
          id: data.areaId
        }
        let addressTags = that.data.addressTags;
        let addressTagsIndex;
        addressTags.map((val, index) => {
          if (val.text == data.labels) {
            addressTagsIndex = index;
            return;
          }
        })
        var pathName= "";
        if (data.pathName){
          pathName = data.pathName;
        }
        console.log(obj)
        that.setData({
          editname: data.userName,
          editphone: data.userPhone,
          editpathName: pathName,
          editaddress: data.userAddress,
          editlabels: data.labels,
          editselectAreaText: obj,
          selectAreaText: obj,
          editaddressTagsIndex: addressTagsIndex,
          editisDefault: data.isDefault
        })
      }
    }).catch((error) => {
      console.log(error)
    })
    // wx.navigateBack({
    //   delta:1
    // })
  },
  editSaveAddress:function(){
    const that = this;
    let userId = wx.getStorageSync('userId');
    let phone = that.data.editphone;
    let name = that.data.editname;
    let areaId = that.data.selectAreaText.id;
    let address = app.util.trim(that.data.editaddress);
    let addressTagIndex = that.data.editaddressTagsIndex;
    let addressTag = that.data.editaddressTags[addressTagIndex];
    let isCorrect = app.util.isPoneAvailable(phone);
    let obj = {
      userId: userId,
      areaId: areaId,
      addressId: that.data.addressId,
      userName: name,
      userPhone: phone,
      userAddress: address,
      labels: addressTag.text,
      isDefault: that.data.editisDefault
    };
    if (!address || address == '') {
      wx.showModal({
        title: '提示',
        content: '请输入详细收货地址',
      });
      return;
    }
    if (areaId == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择所在地区',
      });
      return;
    }
    if (!isCorrect) {
      wx.showModal({
        title: '提示',
        content: '手机格式输入错误',
      })
    } else {
      wx.showLoading({
        title: '',
      })
      app.util.request(app.api.editAddress, 'GET', obj).then((res) => {
        if (res.data && res.data.status == 1) {
          wx.showToast({
            title: '修改成功',
            success: function () {
              // setTimeout(function () {
              //   wx.navigateBack({
              //     delta: 1
              //   })
              // }, 500)
              that.getData();
              that.hideModal();
            }
          });
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },

  //设置默认地址
  setDefaultAddress: function (e) {
    const that = this;
    let addressId = e.currentTarget.dataset.id;
    let userId = wx.getStorageSync('userId');
    let data = {
      userId: userId,
      addressId: addressId
    }
    app.util.request(app.api.setDefaultAddress, 'GET', data).then((res) => {
      if (res.status && res.status == 1) {
        wx.showToast({
          title: '成功',
        });
        that.getData();
      }
    })
  },
  //删除收货地址
  goDel: function (e) {

    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          let addressId = e.currentTarget.dataset.id;
          let userId = wx.getStorageSync('userId');
          let data = {
            userId: userId,
            addressId: addressId
          }
          app.util.request(app.api.delAddress, 'GET', data).then((res) => {
            if (res.status && res.status == 1) {
              wx.showToast({
                title: '删除成功',
              });
              that.getData();
            }
          })
        } else if (sm.cancel) {
          console.log('取消')
        }
      }
    })
    
  },
  //返回收货地址
  goBackOrder: function (e) {
    const that = this;
    var orderType = this.data.orderType
    if (that.data.isOrder == true) {
      let item = e.currentTarget.dataset.item;
      wx.setStorageSync('orderAddress', item)
      wx.showToast({
        title: '地址切换成功',
        success: function () {
          if (orderType == 'group'){
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/cat-list-assemble/requireOrder?order=' + 'true',
              })
            }, 800)
          }else{
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/shopping-cart-detail/shopping-cart-detail?order=' + 'true',
              })
            }, 800)
          }
        }
      });
    }

    // if (that.data.groupOrder == true) {
    //   wx.navigateTo({
    //     url: '/pages/group/requireOrder?order=' + 'true',
    //   })
    // }
  },













  //返回按钮
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  bindRegionChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //切换地址类型
  toggleAddressTags: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      addressTagsIndex: index
    })
  },
  //切换地址类型
  edittoggleAddressTags: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      editaddressTagsIndex: index
    })
  },
  //监听输入内容并且赋值
  listenerInput: function (e) {
    let role = e.currentTarget.dataset.role;
    let val = e.detail.value;
    let obj = [];
    obj[role] = val;
    this.setData({ [role] : val});
  },
  //保存地址
  saveAddress: function () {
    const that = this;
    let userId = wx.getStorageSync('userId');
    let phone = that.data.phone;
    let name = that.data.name;
    let areaId = that.data.selectAreaText.id;
    let address = app.util.trim(that.data.address);
    console.log(address)
    let addressTagIndex = that.data.addressTagsIndex;
    let addressTag = that.data.addressTags[addressTagIndex];
    let isCorrect = app.util.isPoneAvailable(phone);
    let obj = {
      userId: userId,
      areaId: areaId,
      userName: name,
      userPhone: phone,
      userAddress: address,
      labels: addressTag.text,
      isDefault: 0,
    };
  
    if (!address || address == '') {
      wx.showModal({
        title: '提示',
        content: '请输入详细收货地址',
      });
      return;
    }
    if (areaId == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择所在地区',
      });
      return;
    }
    if (!isCorrect) {
      wx.showModal({
        title: '提示',
        content: '手机格式输入错误',
      })
    } else {
      wx.showLoading({
        title: '',
      })
      app.util.request(app.api.addAddress, 'GET', obj  ).then((res) => {
        if (res.data && res.data.status == 1) {
          wx.showToast({
            title: '保存成功',
            success: function () {
              // setTimeout(function () {
              //   wx.navigateBack({
              //     delta: 1
              //   })
              // }, 500)
              that.getData();
              that.hideModal();
            }
          });
        }else{
          var msg ="添加失败";
          if (res.data.msg){
            msg = res.data.msg
          }
          wx.showToast({
            title: msg,
            icon: 'none'
          });
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  //选择区域
  selectArea: function (e) {
    const that = this;
    let text = e.currentTarget.dataset.value;
    let selfId = e.currentTarget.dataset.selfid;
    let parentId = e.currentTarget.dataset.parentid;
    let selectAreasParent = that.data.selectAreasParent;
    let areaSelectIndex = that.data.areaSelectIndex;//区域选取顺序 0:省 1:市 2:区 ....
    let isBottom = that.data.isBottom;
    if (!isBottom) {
      //拼接这个对象的文字 id 给父级区域选择
      let obj = {
        text: text,
        id: selfId
      };
      //赋值
      selectAreasParent[areaSelectIndex] = obj;
      //赋值完后 父级区域选择变成下一步
      areaSelectIndex++;
      that.setData({
        areaSelectIndex: areaSelectIndex,
        selectAreasParent: selectAreasParent
      })
      console.log(that.data.areaSelectIndex)
    } else {
      let obj = {
        text: text,
        id: selfId
      };
      //赋值
      selectAreasParent[areaSelectIndex - 1] = obj;
      //赋值
      that.setData({
        selectAreasParent: selectAreasParent
      })
    }
    app.util.request(app.api.areaList + "?parentId=" + selfId, 'GET').then((res) => {
      if (res.data) {
        that.setData({
          areaLists: res.data,
          isBottom: false,
          isLoading: true
        });
      } else {
        //选取为最底级别
        let text = '';
        let selectAreasParent = that.data.selectAreasParent;
        selectAreasParent.map((val, index) => {
          if (index == 0) return;
          text += val.text;
        })
        let obj = {
          text: text,
          id: selfId
        }
        that.setData({
          isBottom: true,
          isLoading: true,
          selectAreaText: obj,
          isShowSelectArea: false
        })
      }
    }).catch((error) => {
      console.log(error)
    })

  },


  //选取父级区域
  selectParentArea: function (e) {

    const that = this;
    let index = ++e.currentTarget.dataset.index;
    let selfId = e.currentTarget.dataset.id;
    let selectAreasParent = that.data.selectAreasParent;
    let areaSelectIndex = that.data.areaSelectIndex;//区域选取顺序 0:省 1:市 2:区 ....
    console.log('数组长度：' + selectAreasParent.length);
    console.log('父级排列顺序:' + index);

    for (let n = selectAreasParent.length; n > index; n--) {
      console.log(n)
      selectAreasParent.splice(n - 1, 1);
    }
    //赋值 把修改后的父级数组  以及当前区域选取层级
    that.setData({
      selectAreasParent: selectAreasParent,
      areaSelectIndex: index
    })
    console.log('当前父级选取层级:' + that.data.areaSelectIndex)

    //未赋值的父级区域选择
    // if (!selfId==-1){
    if (true) {
      app.util.request(app.api.areaList + "?parentId=" + selfId, 'GET').then((res) => {
        console.log(res)
        if (res.data) {
          that.setData({
            areaLists: res.data,
            isBottom: false
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }

  },

  //显示选取收货地址
  showSelect: function () {
    const that = this;
    let arr = that.data.areaLists;
    if (arr.length == 0) {
      app.util.request(app.api.areaList, 'GET').then((res) => {
        if (res.data) {
          that.setData({
            areaLists: res.data
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }

    this.setData({
      isShowSelectArea: true
    })
  },
  //隐藏选取收货地址
  hideSelect: function () {
    this.setData({
      isShowSelectArea: false
    })
  },

})