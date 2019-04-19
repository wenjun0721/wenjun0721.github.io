const bmap = require('../../lib/bmap-wx.min.js')
const app = getApp().globalData;
Page({
  data: {
    webViewUrl:"https://www.isp-cn.com",
    position: "自动定位失败...",
    searchText: "品质水果",
    hiddenLoading: false,
    slideIndex: 0,
    isHidden: false,
    isGoTop: false,
    firstNav: [{
      catName: '首页',
      catId: 0
    }],
    currPage: 1,
    pageSize: 20,
    bannerLists: [],
    screenFirstNavIndex: 0,
    screenBrandNavIndex: 0,
    isScreen: true,
    loadingText: '正在加载.....',
    belongIndex: true,
    otherSecondNav: [],
    condiNavIndex: 0,
    condiNavs: [
      {
        text: '全部',
        imgs: [

        ],
        index: 0
      }, {
        text: '销量',
        imgs: [
          '../../images/condiNav.png',
          '../../images/condiNav_up.png',
          '../../images/condiNav_down.png',
        ],
        select: 0,
        index: 1
      }, {
        text: '价格',
        imgs: [
          '../../images/condiNav.png',
          '../../images/condiNav_up.png',
          '../../images/condiNav_down.png',
        ],
        select: 0,
        index: 2
      }
    ],
    initCondiNavs: [
      {
        text: '全部',
        imgs: [

        ],
        index: 0
      }, {
        text: '销量',
        imgs: [
          '../../images/condiNav.png',
          '../../images/condiNav_up.png',
          '../../images/condiNav_down.png',
        ],
        select: 0,
        index: 1
      }, {
        text: '价格',
        imgs: [
          '../../images/condiNav.png',
          '../../images/condiNav_up.png',
          '../../images/condiNav_down.png',
        ],
        select: 0,
        index: 2
      },
    ],
    screenFirstNavs: ['仅看自营', '仅看包邮', '仅看有货',],
    screenBrandNavs: [],
    isScreen: true,
    isDefaultText: true,
    screenClick: false,
    fixedNav: false,
  },

  onLoad: function (e) {

    console.log("=========================")
    console.log(e)
    console.log("=========================") 
    if (e.scene){
      const scene = decodeURIComponent(e.scene)
      var sceneId = scene.split(".")[0] ;
      var sceneType = scene.split(".")[1] ;
      var url = "";
      switch (sceneType) {
        case 'goods':
          url = "/pages/shopsDetail/shopsDetail?goodsId=" + sceneId;
          break;

        case 'shops':
          //wenjun 2019/2/14 判断走哪个页面
          let obj = {
            shopId:sceneId
          }
          app.util.request(app.api.wxappGetRank, 'GET',obj).then((res) => {
            console.log(res)
            if (res == 99 ) { // isp联盟旗靓店
              url = "/pages/cat-store/cat-store?shopId=" + sceneId;
            }else{
              url = "/pages/cat-store/cat-store-o?shopId=" + sceneId;
            }
            wx.navigateTo({
              url: url,
            })
          }).catch((error) => {
            console.log(error)
          })
          // url = "/pages/cat-store/cat-store?shopId=" + sceneId;
          break;
      }
      wx.navigateTo({
        url: url,
      })
    }
    
    let that = this;
    app.util.request(app.api.getSysConfig, 'GET').then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          sysConfig: res.data,
        })
      }
    }).catch((error) => {
      console.log(error)
    })
    let keyword = e.keyword || '';//判断是什么传递过来的
    let catId = e.catId || '';
    let adId = e.adId || '';
    let brandId = e.brandId || '';
    let from = e.from || '';
    if (keyword != '' || catId != '' || adId != '' || brandId != '') {
      this.setData({
        belongIndex: false,
        slideIndex: -1
      })
    }
    this.setData({
      otherPageKeyword: keyword,
      otherPagecatId: catId,
      otherPageAdId: adId,
      otherPageBrandId: brandId,
      from: from
    })
    this.getInitData();
    var BMap = new bmap.BMapWX({
      ak: 'yUgeOk4UlGfmNstWRnUbNTXXfknBSGva'
    });
    let selectArea = wx.getStorageSync('selectArea');
    if (selectArea && selectArea != '') {
      that.setData({
        position: selectArea.text,
        positionId: selectArea.id
      })
    } else {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          console.log(res)
          var datas = {
            latitude: res.latitude,
            longitude: res.longitude
          };
          app.util.request(app.api.getTown, 'GET', datas).then((res) => {
            if (res.status == 1) {
              let address = {
                id: res.data.areaId,
                text: res.data.areaName,
              }
              wx.setStorageSync('selectArea', address);
              var datasE={
                keyword: keyword,
                 catId: catId,
                 adId: adId,
                 brandId: brandId
              };
              that.onLoad(datasE);
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      })
      // BMap.regeocoding({
      //   success: success,
      //   fail: function (e) {

      //   }
      // });
    }
    // this.getTown();

    //check whether got the abc value
    if (app.abc != '') {
      this.setData({
        abc: app.abc
      })
      console.log("check abc", app.abc);
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      getApp().abcCallback = abc => {
        console.log("check abc", abc);
        if (abc != '') {
          this.setData({
            abc: abc
          })
        }
      }
    }

    //wenjun 2019/2/15
    //历史定位
    this.Historical_dw();
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    this.setData({
      hiddenLoading: true
    });
  },
  onShow: function () {
    var that = this;
    let selectArea = wx.getStorageSync('selectArea');
    if (selectArea && selectArea != '') {
      that.setData({
        position: selectArea.text
      })
    } else {
      var success = function (data) {
        const add = data.originalData.result.addressComponent;
        let areaName = data.originalData.result.addressComponent.city;
        console.log(areaName)
        let obj = {
          areaName: areaName
        }
        app.util.request(app.api.positionChangeCode, 'GET', obj).then((res) => {
          if (res && res.data.status == 1) {
            let areaId = res.data.areaId;
            wx.setStorageSync('selectArea', { id: areaId, text: areaName })
          }
        }).catch((error) => {

        })
        that.setData({
          position: add.city + add.street
        })

      }
    }
  },
  //监听页面滚动

  // onPageScroll: function (e) {
   
  // },
  // onPageScroll: function (e) {
  //   let scrollTop = e.scrollTop;
  //   if (scrollTop > 600) {
  //     this.setData({
  //       isGoTop: true
  //     })
  //   } else {
  //     this.setData({
  //       isGoTop: false
  //     })
  //   }
  // },
  // goTop: function () {
  //   wx.pageScrollTo({
  //     scrollTop: 0,
  //     duration: 100
  //   })
  // },
  //初始化数据
  getInitData() {
    const that = this;
    let getDataOk = true;
    let belongIndex = that.data.belongIndex;
    //首页一级分类
    app.util.request(app.api.indexNavs, 'GET').then(function (data) {
      if (data.status && data.status == 1) {
        that.setData({
          firstNav: that.data.firstNav.concat(data.data),
          // firstNav: data.data,
        })
      } else {

      }
    }).catch(function (err) {
      getDataOk = false;
      console.log('请求失败' + err)
    });
    if (!belongIndex) {//传进来的页面
      
      let datas = {
        userId: wx.getStorageSync('userId') || '',
        areaId: wx.getStorageSync('selectArea').id || '',
        keyword: that.data.otherPageKeyword,
        catId: that.data.otherPagecatId,
        adId: that.data.otherPageAdId,
        brandId: that.data.otherPageBrandId,
        from: that.data.from || '',
      }
      app.util.request(app.api.indexOtherPage, 'GET', datas).then((res) => {
        if (res.status && res.status == 1) {
          let data = res.data;
          that.setData({
            secondNav: data.getGoodCatHot,
            bannerLists: data.banner,
            shopLists: data.goods.Rows,
          });
          if (data.goods.Rows.length < 1) {
            that.setData({
              loadingText: '没有商品'
            });
          };
          if (data.goods.Rows.length < that.data.pageSize) {
            that.setData({
              loadingText: '加载完毕'
            });
          }
        }
        wx.hideLoading();
      }).catch((error) => {
        wx.hideLoading();
      })
    } else {
      //获取首页数据
      app.util.request(app.api.index, 'GET').then(function (data) {
        if (data.status && data.status == 1) {
          that.setData({
            banTopAds: data.banTopAds, //三张广告图
            bannerLists: data.swiper, //banner图
            banBottomAds: data.banBottomAds,//下面广告图
            indexCats: data.indexCats,//首页二级分类
            buttonBottomAds: data.buttonBottomAds,//二级分类下面广告图
            w_index_cad_First: data.w_index_cad_1,//首页页面第一个广告位
            w_index_cad_Second: data.w_index_cad_2,//首页页面第二个广告位
            w_index_ads_two: data.w_index_ads_2 || [],//首页2个广告
          })
        } else {

        }
      }).catch(function (err) {
        getDataOk = false;
        console.log('请求失败' + err)
      })

      //获取中间20条拼团商品列表 02/20

      let arr_g      = wx.getStorageSync('selectArea');
      var recom_arr = {
        num:20,
        id: arr_g.id
      }
      app.util.request(app.api.groupIndex, 'GET', recom_arr).then(function (data) {
        console.log('-------')  
        console.log(data)
        if (data.status && data.status == 1) {
          that.setData({
            shopListsCenter: data.goods
          })
        } else {

        }
      }).catch(function (err) {
        getDataOk = false;
        console.log('请求失败' + err)
      })
      //获取底部商品列表
      app.util.request(app.api.indeShopLists, 'GET').then(function (data) {
        console.log('----------------')
        console.log(data)
        if (data.status && data.status == 1) {
          that.setData({
            shopLists: data.data
          })
        } else {

        }
      }).catch(function (err) {
        getDataOk = false;
        console.log('请求失败' + err)
      })
      return getDataOk;
    }


  },
  //扫一扫
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  //选择区域
  goSelectArea: function () {
    wx.navigateTo({
      url: '/pages/address/getAddress',
    })
  },
  //搜索页面
  goSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //点击导航时 复位一些基础数据
  resetNavArgu() {
    const that = this;
    let arr = that.data.condiNavs;
    arr.map((val, index) => {
      val.select = 0;
    })
    that.setData({
      condiNavs: arr,//条件导航栏 全部 价格什么的 图片归为
      condiNavIndex: 0,//条件导航 选取第一个
      currPage: 1,//分页为0
      keyword: '',//关键字清空
      loadingText: '正在加载',//复位上拉加载
    });
    this.screenReset();
    that.goTop();
  },
  //catId 点击分类
  catId: function (e) {
    let catId = e.currentTarget.dataset.catid;
    wx.reLaunch({
      url: '/pages/cat-list/cat-list?catId=' + catId,
    });
    wx.setStorageSync('otherPageUrl', {
      url: '/pages/classify/classify',
      openType: 'relaunch'
    })
  },
  //一级滑动导航点击事件
  firstNav: function (e) {
    const that = this;
    that.setData({
      belongIndex: true
    });
    that.resetNavArgu();
    wx.showLoading({
      title: '',
    })
    let index = e.currentTarget.id;
    let catId = e.currentTarget.dataset.catid;
    if (index == 0) {
      this.getInitData();
      this.setData({
        slideIndex: index,
        isHidden: false
      });
      wx.hideLoading();
    } else {
      let datas = {
        userId: wx.getStorageSync('userId') || '',
        areaId: wx.getStorageSync('selectArea').id || '',
        catId: catId
      }
      app.util.request(app.api.indexOtherPage, 'GET', datas).then((res) => {
        if (res.status && res.status == 1) {
          let data = res.data;
          that.setData({
            secondNav: data.getGoodCatHot,
            bannerLists: data.banner,
            shopLists: data.goods.Rows,
          });
          if (data.goods.Rows.length < 1) {
            that.setData({
              loadingText: '没有商品'
            })
          }
        }
        wx.hideLoading();
      }).catch((error) => {
        wx.hideLoading();
      })
      this.setData({
        slideIndex: index,
        isHidden: true,
        catId: catId,
        screenClick: false
      })
    }
    this.setData({
      currPage: 1
    })
  },
  //点击二级导航
  secondNav: function (e) {
    wx.showLoading({
      title: '',
    })
    const that = this;
    let belongIndex = that.data.belongIndex;
    that.resetNavArgu();
    let catId = e.detail.id;
    let keyword = e.detail.keyword;
    let obj = {
      catId: catId,
      keyword: keyword
    };
    if (belongIndex) {//如果是首頁的
      that.setData({
        catId: catId,
        keyword: keyword,
        screenClick: false,//点了二级导航就不能先用筛选 避免延续之前的效果
      });
    } else {
      obj.adId = that.data.otherPageAdId;
      that.setData({
        otherPageCatId: catId,
        otherPageKeyword: keyword,
        screenClick: false,//点了二级导航就不能先用筛选 避免延续之前的效果
      });
    }

    app.util.request(app.api.getIndexShopsList, 'GET', obj).then((res) => {
      if (res && res.status == 1) {
        that.setData({
          shopLists: res.data.Rows
        });
        if (res.data.Rows.length < 1) {
          that.setData({
            loadingText: '没有商品'
          })
        }
        wx.hideLoading();
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      }
    }).catch((error) => {
      wx.hideLoading();
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    })

  },
  //条件导航点击触发的对应事件   用于修改展示商品列表数据
  //触发条件导航点击事件 并且修改对应的样式图标
  _condiNav: function (e) {
    wx.showLoading({
      title: '',
    })
    const that = this;

    that.setData({
      currPage: 1, //分页清0
    })
    let obj = e.detail;
    let condiIndex = obj.index;//选中的是第几个
    let index = obj.index; //点击的是第几个
    //如果点击是销量或者价格，修改对应数据的select，0：位初始，1：up 2：down 切换样式
    if (index == 1 || index == 2) {
      let selectIndex = that.data.condiNavs[index].select;
      let arr = that.data.condiNavs;
      if (selectIndex == 0) {
        arr[index].select = 1;
        that.setData({
          condiNavs: arr
        })
      } else if (selectIndex == 1) {
        arr[index].select = 2;
        that.setData({
          condiNavs: arr
        })
      } else if (selectIndex == 2) {
        arr[index].select = 1;
        that.setData({
          condiNavs: arr
        })
      }
    };

    let condiNavs = that.data.condiNavs;
    //销量价格样式默认 如果是筛选则不清样式
    condiNavs.map((val, index) => {
      if (index != condiIndex) {
        condiNavs[index].select = 0;
      }
    })
    that.setData({
      condiNavIndex: condiIndex,
      condiNavs: condiNavs
    })
    let select = parseInt(that.data.condiNavs[index].select || 0);
    let catId = that.data.catId || '';
    let keyword = that.data.keyword || '';
    let argu = {};
    let belongIndex = that.data.belongIndex;
    //如果选取的是筛选
    if (condiIndex == 3) {
      if (belongIndex) {//首页数据操作
        let obj = {
          id: that.data.catId
        }
        app.util.request(app.api.goodsBrands, 'GET', obj).then((res) => {
          let arr = [];
          for (let n in res.data) {
            arr.push(res.data[n])
          };
          this.setData({
            screenBrandNavs: arr
          })
        }).catch((error) => {
          console.log(error)
        })
        that.setData({
          isScreen: false
        })
      } else {
        let id = that.data.otherPagecatId;
        if (id && id != '') {
          let obj = {
            id: id
          }
          app.util.request(app.api.goodsBrands, 'GET', obj).then((res) => {
            let arr = [];
            for (let n in res.data) {
              arr.push(res.data[n])
            };
            this.setData({
              screenBrandNavs: arr
            })
          }).catch((error) => {
            console.log(error)
          })
        }
        that.setData({
          isScreen: false
        })
      }

    } else {
      this.condiNavFindShops();
    }
    wx.hideLoading();



  },
  //条件导航 查询对应的商品列表
  condiNavFindShops() {
    const that = this;
    let belongIndex = that.data.belongIndex;
    if (belongIndex) {//首页数据操作
      let shopLists = this.data.shopLists;//商品数据
      let condiIndex = this.data.condiNavIndex;//条件导航第几个被选中了
      //一级滑动导航
      let catId = that.data.catId || '';
      //二级关键字导航
      let keyword = that.data.keyword || '';
      let isFirstPage = this.data.isHidden; //false 首页第一个页面
      let url = "";//请求连接
      let obj = {};//请求参数
      url = app.api.getIndexShopsList;
      let select = parseInt(that.data.condiNavs[condiIndex].select || 0);//是升序还是降序
      obj = {
        catId: catId,
        keyword: keyword
      }
      //如果用户点了筛选的话则需要加上筛选的过滤
      let screenClick = this.data.screenClick;
      if (screenClick) {//如果点了
        let brandId = '';
        if (this.data.screenBrandNavs.length > 0) {
          brandId = this.data.screenBrandNavs[this.data.screenBrandNavIndex].brandId || '';//品牌ID
        }
        let screenFirstNavIndex = this.data.screenFirstNavIndex;
        obj.brandId = brandId;
        if (this.data.lowerPrice) {
          obj.strPrice = this.data.lowerPrice
        }
        if (this.data.higherPrice) {
          obj.endPrice = this.data.higherPrice
        }
        switch (screenFirstNavIndex) { //筛选里面的第一级
          case 0:
            obj.isShop = 1;
            break;
          case 1:
            obj.isFree = 1;
            break;
          case 2:
            obj.isStock = 1;
            break;
          default: ;
        }
      };
      //三级条件导航  价格 销量
      switch (condiIndex) {
        case 0:
          break;
        case 1:
          obj.isSale = select
          break;
        case 2:
          obj.isPrice = select
          break;
        default: ;
      };
      obj.page = 1;
      app.util.request(url, 'GET', obj).then(function (res) {
        if (res.status && res.status == 1) {
          if (res.data.Rows && res.data.Rows.length > 0) {
            that.setData({
              shopLists: res.data.Rows
            })
          } else {
            that.setData({
              loadingText: '没有商品'
            })
          }
        }
      }).catch(function (err) {
        console.log('请求失败' + err)
      })
    } else {//别的页面传过来的  catId keyword adId
      let shopLists = this.data.shopLists;//商品数据
      let condiIndex = this.data.condiNavIndex;//条件导航第几个被选中了
      //一级滑动导航
      let catId = that.data.otherPagecatId || '';
      //二级关键字导航
      let keyword = that.data.otherPageKeyword || '';
      //广告
      let adId = that.data.otherPageAdId || '';
      let brandId = that.data.otherPageBrandId || '';
      let url = "";//请求连接
      let obj = {};//请求参数
      url = app.api.getIndexShopsList;
      let select = parseInt(that.data.condiNavs[condiIndex].select || 0);//是升序还是降序
      obj = {
        catId: catId,
        keyword: keyword,
        adId: adId,
        brandId: brandId
      }
      //如果用户点了筛选的话则需要加上筛选的过滤
      let screenClick = this.data.screenClick;
      if (screenClick) {//如果点了
        let brandId = '';
        if (this.data.screenBrandNavs.length > 0) {
          brandId = this.data.screenBrandNavs[this.data.screenBrandNavIndex].brandId || '';//品牌ID
        }
        let screenFirstNavIndex = this.data.screenFirstNavIndex;
        obj.brandId = brandId;
        if (this.data.lowerPrice) {
          obj.strPrice = this.data.lowerPrice
        }
        if (this.data.higherPrice) {
          obj.endPrice = this.data.higherPrice
        }
        switch (screenFirstNavIndex) { //筛选里面的第一级
          case 0:
            obj.isShop = 1;
            break;
          case 1:
            obj.isFree = 1;
            break;
          case 2:
            obj.isStock = 1;
            break;
          default: ;
        }
      };
      //三级条件导航  价格 销量
      switch (condiIndex) {
        case 0:
          break;
        case 1:
          obj.isSale = select
          break;
        case 2:
          obj.isPrice = select
          break;
        default: ;
      };
      obj.page = 1;
      app.util.request(url, 'GET', obj).then(function (res) {
        if (res.status && res.status == 1) {
          if (res.data.Rows && res.data.Rows.length > 0) {
            that.setData({
              shopLists: res.data.Rows
            })
          } else {
            that.setData({
              loadingText: '没有商品'
            })
          }
        }
      }).catch(function (err) {
        console.log('请求失败' + err)
      })
    }


  },
  // onPullDownRefresh: function () {
  //   // wx.showNavigationBarLoading() //在标题栏中显示加载
  //   let isFirstPage = this.data.isHidden; //false 首页第一个页面;
  //   if (!isFirstPage){
  //     let isOk = this.getInitData();
  //     if (isOk) {
  //       //wx.hideNavigationBarLoading() //完成停止加载
  //       wx.stopPullDownRefresh() //停止下拉刷新
  //     } else {
  //       // wx.showToast({
  //       //   title: '刷新失败',
  //       //   icon: 'none',
  //       //   duration: 2000
  //       // });
  //       wx.stopPullDownRefresh() //停止下拉刷新
  //     }
  //   }else{
  //   }


  // },
  //上拉
  onReachBottom: function () {
    let currPage = this.data.currPage;
    currPage++;
    this.setData({
      currPage: currPage
    })
    this.getShopsList(currPage);
  },
  //加载商品底部列表
  getShopsList(currPage) {
    const that = this;
    let belongIndex = that.data.belongIndex;
    if (belongIndex) {//首页数据操作
      let shopLists = this.data.shopLists;//商品数据
      let condiIndex = this.data.condiNavIndex;//条件导航第几个被选中了
      //一级滑动导航
      let catId = that.data.catId || '';
      //二级关键字导航
      let keyword = that.data.keyword || '';
      let isFirstPage = this.data.isHidden; //false 首页第一个页面
      let url = "";
      let obj = {};
      //如果是第一个页面
      if (!isFirstPage) {
        url = app.api.indeShopLists + "?currPage=" + currPage
      } else {
        url = app.api.getIndexShopsList;
        let select = parseInt(that.data.condiNavs[condiIndex].select || 0);//是升序还是降序
        obj = {
          catId: catId,
          keyword: keyword
        }
        //如果用户点了筛选的话则需要加上筛选的过滤
        let screenClick = this.data.screenClick;
        if (screenClick) {//如果点了
          let brandId = this.data.screenBrandNavs[this.data.screenBrandNavIndex].brandId || '';
          let screenFirstNavIndex = this.data.screenFirstNavIndex;
          obj.brandId = brandId;
          if (this.data.lowerPrice) {
            obj.strPrice = this.data.lowerPrice
          }
          if (this.data.higherPrice) {
            obj.endPrice = this.data.higherPrice
          }
          switch (screenFirstNavIndex) { //筛选里面的第一级
            case 0:
              obj.isShop = 1;
              break;
            case 1:
              obj.isFree = 1;
              break;
            case 2:
              obj.isStock = 1;
              break;
            default: ;
          }
        };
        //三级条件导航  价格 销量
        switch (condiIndex) {
          case 0:
            break;
          case 1:
            obj.isSale = select
            break;
          case 2:
            obj.isPrice = select
            break;
          default: ;
        };
        obj.page = currPage;
      }
      //如果是第一个页面
      if (!isFirstPage) {
        app.util.request(url, 'GET', obj).then(function (data) {
          if (data.status && data.status == 1) {
            if (data.data && data.data.length > 0) {
              if (currPage == 1) {
                shopLists = [];
              } else {
                shopLists = shopLists.concat(data.data);
              }
              that.setData({
                shopLists: shopLists
              })
            } else {
              if (currPage == 1) {
                that.setData({
                  shopLists: [],
                  loadingText: '没有商品'
                })
              } else {
                that.setData({
                  // shopLists: [],
                  loadingText: '全部加载完毕'
                })
              }

            }
          } else {
          }
        }).catch(function (err) {
          console.log('请求失败' + err)
        })
      } else { //如果是别的页面
        app.util.request(url, 'GET', obj).then(function (data) {
          if (data.status && data.status == 1) {
            if (data.data.Rows && data.data.Rows.length > 0) {
              console.log(data)
              if (currPage == 1) {
                shopLists = [];
                shopLists = data.data.Rows;
              } else {
                shopLists = shopLists.concat(data.data.Rows);
              }
              that.setData({
                shopLists: shopLists
              })
            } else {
              if (currPage == 1) {
                that.setData({
                  shopLists: [],
                  loadingText: '没有商品'
                })
              } else {
                that.setData({
                  loadingText: '全部加载完毕'
                })
              }
            }
          } else {
          }
        }).catch(function (err) {
          console.log('请求失败' + err)
        })
      }
    } else {
      let shopLists = this.data.shopLists;//商品数据
      let condiIndex = this.data.condiNavIndex;//条件导航第几个被选中了
      //一级滑动导航
      let catId = that.data.otherPagecatId || '';
      //二级关键字导航
      let keyword = that.data.otherPageKeyword || '';
      //广告Id
      let adId = that.data.otherPageAdId || '';
      let brandId = that.data.otherPageBrandId || '';
      console.log(brandId)
      let isFirstPage = this.data.isHidden; //false 首页第一个页面
      let url = "";
      let obj = {};
      url = app.api.getIndexShopsList;
      let select = parseInt(that.data.condiNavs[condiIndex].select || 0);//是升序还是降序
      obj = {
        catId: catId,
        keyword: keyword,
        adId: adId,
        brandId: brandId
      }
      //如果用户点了筛选的话则需要加上筛选的过滤
      let screenClick = this.data.screenClick;
      if (screenClick) {//如果点了
        if (this.data.screenBrandNavs.length > 0) {
          brandId = this.data.screenBrandNavs[this.data.screenBrandNavIndex].brandId || '';
        }
        let screenFirstNavIndex = this.data.screenFirstNavIndex;
        obj.brandId = brandId;
        if (this.data.lowerPrice) {
          obj.strPrice = this.data.lowerPrice
        }
        if (this.data.higherPrice) {
          obj.endPrice = this.data.higherPrice
        }
        switch (screenFirstNavIndex) { //筛选里面的第一级
          case 0:
            obj.isShop = 1;
            break;
          case 1:
            obj.isFree = 1;
            break;
          case 2:
            obj.isStock = 1;
            break;
          default: ;
        }
      };
      //三级条件导航  价格 销量
      switch (condiIndex) {
        case 0:
          break;
        case 1:
          obj.isSale = select
          break;
        case 2:
          obj.isPrice = select
          break;
        default: ;
      };
      obj.page = currPage;

      app.util.request(url, 'GET', obj).then(function (data) {
        if (data.status && data.status == 1) {
          if (data.data.Rows && data.data.Rows.length > 0) {
            console.log(data)
            if (currPage == 1) {
              shopLists = [];
              shopLists = data.data.Rows;
            } else {
              shopLists = shopLists.concat(data.data.Rows);
            }
            that.setData({
              shopLists: shopLists
            })
          } else {
            if (currPage == 1) {
              that.setData({
                shopLists: [],
                loadingText: '没有商品'
              })
            } else {
              that.setData({
                loadingText: '全部加载完毕'
              })
            }
          }
        } else {
        }
      }).catch(function (err) {
        console.log('请求失败' + err)
      })
    }



  },
  //条件筛选确定按钮
  screenConfirm: function () {
    //点击筛选确定后 条件导航栏复位 展示出的商品应该是一级二级顾虑之后的全部商品 
    const that = this;
    let brandId = '';
    if (this.data.screenBrandNavs.length > 0) {
      brandId = this.data.screenBrandNavs[this.data.screenBrandNavIndex].brandId || '';//品牌ID
    }
    let screenFirstNavIndex = this.data.screenFirstNavIndex;//筛选第一级  是否自营 ...
    let belongIndex = that.data.belongIndex;
    if (belongIndex) {//首页数据
      let obj = {
        catId: this.data.catId || '',
        brandId: brandId || '',
        keyword: this.data.keyword || '',
      }
      if (this.data.lowerPrice) {//如果最低价格有
        obj.strPrice = this.data.lowerPrice
      }
      if (this.data.higherPrice) {//如果最高价格有
        obj.endPrice = this.data.higherPrice
      }
      switch (screenFirstNavIndex) {
        case 0:
          obj.isShop = 1;
          break;
        case 1:
          obj.isFree = 1;
          break;
        case 2:
          obj.isStock = 1;
          break;
        default: ;
      }
      this.setData({
        isScreen: true,//隐藏筛选
        screenClick: true,//激活查询商品加上筛选的条件
      });
      this.setData({
        currPage: 1
      })
      this.getShopsList(1);
    } else {
      let obj = {
        catId: that.data.otherPagecatId || '',
        brandId: that.data.otherPageBrandId || '',
        keyword: that.data.otherPageKeyword || '',
        adId: that.data.otherPageAdId
      }
      if (this.data.lowerPrice) {//如果最低价格有
        obj.strPrice = this.data.lowerPrice
      }
      if (this.data.higherPrice) {//如果最高价格有
        obj.endPrice = this.data.higherPrice
      }
      switch (screenFirstNavIndex) {
        case 0:
          obj.isShop = 1;
          break;
        case 1:
          obj.isFree = 1;
          break;
        case 2:
          obj.isStock = 1;
          break;
        default: ;
      }
      this.setData({
        isScreen: true,//隐藏筛选
        screenClick: true,//激活查询商品加上筛选的条件
      });
      this.setData({
        currPage: 1
      })
      this.getShopsList(1);
    }

  },
  // 条件筛选一级分类
  toggleFirstNav: function (e) {
    let index = e.detail.firstIndex;
    this.setData({
      screenFirstNavIndex: index
    })
  },
  //条件筛选品牌分类
  toggleBrand: function (e) {
    let index = e.detail.firstIndex;
    let brandId = e.detail.brandId || '';
    this.setData({
      screenBrandNavIndex: index,
    })
  },
  //最小价格
  lowerPrice: function (e) {
    this.setData({
      lowerPrice: e.detail.value
    })
  },
  //最大价格
  higherPrice: function (e) {
    this.setData({
      higherPrice: e.detail.value
    })
  },
  //条件筛选重置按钮
  screenReset: function () {
    this.setData({
      screenFirstNavIndex: 0,
      screenBrandNavIndex: 0,
      lowerPrice: 0,
      higherPrice: 0
    })
  },

  //切换显示价格区间显示文字
  toggleDefaultText: function () {
    console.log(111)
    this.setData({
      isDefaultText: false
    })
  },
  //隐藏screen
  hideScreen: function () {
    this.setData({
      isScreen: true
    })
  },
  _goBack: function () {
    let obj = wx.getStorageSync('otherPageUrl');
    if (obj.openType == '') {
      wx.navigateTo({
        url: obj.url,
      })
    }
    if (obj.openType == 'relaunch') {
      wx.reLaunch({
        url: obj.url,
      })
    }
  },
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // indexClick: function () {
  //   wx.setStorageSync('otherPageUrl', {
  //     url: '/pages/index/index',
  //     openType: 'relaunch'
  //   })
  // },

  //wenjun 2019/2/23,按后台设置的规则去跳转广告链接
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
        var urlVal ='web?url=/wechat/consult/consult_app';
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
        url: urlVal,
      })
  },




  //拼团
  goCatListSpike: function (e) {
    wx.navigateTo({
      url: '/pages/cat-list-assemble/cat-list-assemble',
    })
  },
  //领卷
  goCoupon:function(e)
  {
    console.log()
    wx.navigateTo({
      url: '/pages/Coupon/Coupon'
    })
  },
  //砍价
  GetBargain:function(e){
    wx.navigateTo({
      url: '/pages/cat-list-bargain/cat-list-bargain'
    })
  },
  GetWebView:function(e){
    var urlData=e.currentTarget.dataset.url;
    var valData = e.currentTarget.dataset.val;
    var nameData = e.currentTarget.dataset.name;
    console.log(valData)
    wx.navigateTo({
      url: 'web?url=' + urlData + "&areaId=" + valData 
    })
  },
  getKefu: function (e) {
    wx.navigateTo({
      url: 'web?type=kefu' 
    })
  },
  getTown:function(){
    let that = this;
    let selectArea = wx.getStorageSync('selectArea');
    if (selectArea == '') {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          console.log(res)
          var datas = {
            latitude: res.latitude,
            longitude: res.longitude
          };
          app.util.request(app.api.getTown, 'GET', datas).then((res) => {
            if (res.status == 1) {
              let address = {
                id: res.data.areaId,
                text: res.data.areaName,
              }
              that.setData({
                position: res.data.areaName,
              })
              wx.setStorageSync('selectArea', address);
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    } 
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    // console.log(e)
    // if (e.scrollTop > 100) {
    //   if (!this.data.floorstatus) {
    //     this.setData({
    //       floorstatus: true
    //     });
    //   }
    // } else {
    //   if (this.data.floorstatus) {
    //     this.setData({
    //       floorstatus: false
    //     });
    //   }
    // }
    if (e.scrollTop > 350) {
      console.log('大于')
      if (!this.data.fixedNav){
        this.setData({
          fixedNav: true,
          floorstatus: true
        });
      }
     
    } else {
      console.log('小于')
      if (this.data.fixedNav) {
        this.setData({
          fixedNav: false,
          floorstatus: false
        });
      }
    }
    // let query = wx.createSelectorQuery();
    // query.select('#cat').boundingClientRect((rect) => {
    //   let catTop = rect.top
    //   console.log('top', catTop)
    //   if (catTop <= 90) { //临界值，根据自己的需求来调整
    //     this.setData({
    //       fixedNav: true, //是否固定导航栏
    //     })
    //   } else {
    //     this.setData({
    //       fixedNav: false,
    //     })
    //   }
    // }).exec()
  },

  //回到顶部
  goTop: function (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onShareAppMessage(e) {
    return {
      title: '爱搜品',
      path: '/pages/index/index'
    }
  },


  //wenjun 2019/2/15
  //历史定位
  Historical_dw:function(){
      const that =this;
      let arr      = wx.getStorageSync('selectArea');
      let userId   = wx.getStorageSync('userId');
      var datas = {
        id: arr.id,
        name: arr.text,
        userId:userId
      };
      app.util.request(app.api.Historical_dw, 'GET', datas).then(function (res) {
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
  },
})