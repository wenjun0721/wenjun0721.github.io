var domain = "https://uat.isp-cn.com/";
var domainUrl = "https://uat.isp-cn.com/wxapp/"
var webUrl = "https://uat.isp-cn.com/"
module.exports = {
  domain: domain,
  webUrl: webUrl,
  getKefu:'https://kefu.easemob.com/webim/im.html?configId=4ab618d3-4abf-410b-bad5-5557eebadafa',
  getSysConfig: domainUrl + 'Index/getSysConfig',
  //定位
  getTown: domainUrl + 'Index/getTown',
  //登录
  login: domainUrl + 'Openid/login',//loginNum:(手机号)； loginCode:(验证码)； wxOpenId:(openid)； loginPwd:(登录密码)
  //获取登录验证码
  getLoginCode: domainUrl + 'Openid/loginCode',//get Phone
  //获取openID
  getOpenId: domainUrl + 'Openid/GetOpenid', //code
  //获取用户信息
  getUsers: domainUrl + 'Openid/getUsers', //（获取用户信息） 参数 openid
  //更新用户信息
  updateUsers: domainUrl + 'Openid/upusers', //userid：用户ID; userSex：性别; userName：昵称; userPhoto：头像; wxOpenId：openid;
  //首页
  index: domainUrl + "index/getIndexData",// 
  //首页一级分类
  indexNavs: domainUrl + "index/getFirstCats",// 
  //首页---车、早餐
  indexAd: domainUrl + "Index/car",// type  1表示车，2表示早餐 
  //首页中间30条列表
  indexCenter: domainUrl + "index/pageCenterQuery",// currAreaId 
  //首页数据列表
  indeShopLists: domainUrl + "index/pageAllQuery",// currPage  currAreaId 
  //商品列表通过顶级分类获取下级分类或者热词、轮播 ， 可通过广告进入，查询广告热词
  indexOtherPage: domainUrl + "Index/getGoodTop",// catid大分类ID adId广告词ID from2 本地特色 3 海外精选，其他首页 （轮播图用到） keyword搜索关键字 brandId品牌id
  //商品列表---根据条件获取商品
  getIndexShopsList: domainUrl + "Index/goodLists",// catId小分类 isSale销量，1倒序。0升序 isPrice价格，1倒序。0升序 strPrice价格区间（低） endPrice价格区间（高） brandId品牌ID isShop	0全部，1仅看自营 isFree0全部，1仅看包邮 isStock0全部，1仅看有货 keyword	搜索关键字 page 页数
  //店铺---2
  sharerApplys: domainUrl + "SharerApplys/shopImg", //userId 
  //店铺---申请店铺
  sharerApplys: domainUrl + "SharerApplys/apply", //userId 
  //分类-分类
  goodsClassify: domainUrl + "goodsCats/index",//  id 分类ID  page
  //分类-品牌
  goodsBrands: domainUrl + "Brands/pageQuery",// id (catId)
  //商品详情
  goodsDetail: domainUrl + "Goods/detail",// goodsId userId areaId
  //商品详情---获取不同规格、拼团的库存、价格等信息
  checkGoods: domainUrl + "Goods/checkGoods",// goodsId userId Y   grouponId num  specIds
  //用户---关注商品或者店铺
  addFav: domainUrl + "Favorites/add",// id 店铺ID或者商品ID userId type 0表示商品，1表示店铺
  //用户---取消关注商品或者店铺
  cancelFav: domainUrl + "Favorites/cancel",// id 关注ID userId type 0表示商品，1表示店铺
  //商品列表热卖推荐
  goodsCats: domainUrl + "Goods/getCatRecom",// catId
  //搜索
  goodsSearch: domainUrl + "Goods/search",// keyword
  //搜索
  HotWords: domainUrl + "	Goods/HotWords",// 
  //获取购物车列表
  getCartLists: domainUrl + "Carts/index",  //userId：（用户ID） page参数
  //添加购物车
  addCart: domainUrl + "Carts/addCart",  //userId：（用户ID） goodsId:(商品ID); goodsSpecId:(规格ID)
  //修改购物车
  editCart: domainUrl + "Carts/editCart",  //userId：（用户ID） goodsId:(商品ID); goodsSpecId:(规格ID); buyNum:(数量);carts
  //购物车商品详细信息
  goodDesc: domainUrl + "Carts/goodDesc",
  //购物车---修改购物车商品状态
  changeCartGoods: domainUrl + "Carts/changeCartGoods",  //userId：（用户ID） id; isCheck id buyNum
  //购物车---批量修改购物车状态
  batchSetIsCheck: domainUrl + "Carts/batchSetIsCheck",  //userId：（用户ID） id; isCheck
  //删除购物车
  delCart: domainUrl + "Carts/delCart",  //userId：（用户ID） id;
  //批量修改购物车状态
  batchSetIsCheck: domainUrl + "Carts/batchSetIsCheck",  //userId:(用户ID); id:(购物车ID,用英文逗号隔开); isCheck:(选中:1 ; 不选中:-1);
  //计算运费、积分和总商品价格
  getCartMoney: domainUrl + "Carts/getCartMoney",  //userId:(用户ID);
  //删除购物车
  delCart: domainUrl + "Carts/delCart",  //userId:(用户ID)   id(购物车Id);
  //获取购物车数量
  getCartNum: domainUrl + "Carts/getCartNum",  //userId:(用户ID);
  //购物车---结算页资料
  settlement: domainUrl + "Carts/settlement",  //userId:(用户ID);
  //购物车---商品是否在下单区域
  goodsIsArea: domainUrl + "Carts/isSelect",  //userId:(用户ID); addRessId goodsId []
  //订单---获取预支付订单商品信息
  goodsPreOrder: domainUrl + "Orders/orderLists",  //userId:(用户ID); orderNum
  //地址选择
  areaList: domainUrl + "Areas/listQuery",  //parentId:(用户ID);
  //地区---根据地区名返回地区编号
  positionChangeCode: domainUrl + "Areas/paToRaeAid",  //areaName;
  //获取用户收货地址
  getAddress: domainUrl + "Address/allAddress",  //userId;
  //获取用户单个收货地址
  getOneAddress: domainUrl + "Address/oneAddress",  //userId; addressId
  //获取用户默认收货地址
  getDefaultAddress: domainUrl + "Address/useSelectAddress",  //userId;
  //设置用户默认收货地址
  setDefaultAddress: domainUrl + "Address/selectAddress",  //userId addressId; 
  //添加收货地址
  addAddress: domainUrl + "Address/addAddress",  //userId areaId  userName userPhone userAddress isDefault  labels; 
  //修改收货地址
  editAddress: domainUrl + "Address/editAddress",  //userId areaId  userName userPhone userAddress isDefault  labels; 
  //删除收货地址
  delAddress: domainUrl + "Address/delAddress",  //userId areaId  ; 
  //判断用户收货地址是否在商品可配送区域内
  judgeDelivery: domainUrl + "Goods/judgeDelivery",  //addressId  goodsId;
  //判断用户选取的可配送区域地址是否在可配送区域内
  judgeDeliveryTwo: domainUrl + "Goods/judgeDelivery2",  //areaId  goodsId;
  //我的
  me: domainUrl + "My/users",  //userId;
  //用户---获取用户消息
  getMyMess: domainUrl + "Messages/MessageLists",  //userId page
  //用户---删除消息
  delMyMess: domainUrl + "Messages/MessagesDel",  //userId msgIds
  //用户---获取某条消息
  oneMyMess: domainUrl + "Messages/MessagesOne",  //userId msgId
  //我的---用户---浏览历史
  getGoodsHistory: domainUrl + "Goods/historyQuery",  //page;
  //我的---用户---删除浏览记录
  clearGoodsHistory: domainUrl + "Goods/deHistoryQuery",  //goodSid;
  //我的---用户消费统计
  userEcharts: domainUrl + "My/userEcharts",  //userId;
  //我的---用户未读消息，订单统计
  getSysMsg: domainUrl + "My/getSysMsg",  //userId;
  //订单---获取订单列表
  getOrderList: domainUrl + "Orders/getOrderList",  //userId type orderNo shopName isRefund pagesize page   ;
  //用户---关注的店铺或者商品-列表
  noticeList: domainUrl + "Favorites/listGoodsQuery",  //userId page pageSize type 不传或者0 时表示商品，1表示店铺
  //订单---下单
  submitOrder: domainUrl + "Orders/submit",  // ;
  //订单---获取取消、拒收、退款操作的理由
  getOrderReason: domainUrl + "Orders/getReason",  // type 1:取消 2:拒收 3:退款
  //订单---取消订单
  cancellation: domainUrl + "Orders/cancellation",  // ;userId orderId  reasonId
  //订单---订单详情
  orderDetail: domainUrl + "Orders/getDetail",  // ;userId orderId  ShopId
  //订单---物流信息
  getLogistics: domainUrl + "Orders/getLogistics",  // orderId
  //订单---用户确认收货
  receive: domainUrl + "Orders/receive",  // userId  orderId
  //订单---申请售后
  saleAfter: domainUrl + "Orders/saleAfter",  // ;userId orderId  reasonId
  //订单---申请售后
  saleAfterSub: domainUrl + "Orders/saleAfterSub",  // ;userId orderId  reasonId
  //订单---获取订单评价信息
  orderAppraise: domainUrl + "Orders/orderAppraise",  // userId  oId
  //订单---订单评价详情
  orderAppraise2: domainUrl + "Orders/orderAppraise2",  // userId  oId orderId
  //订单---添加评价
  addEval: domainUrl + "Orders/addEval",  // 
  //订单---提醒发货
  noticeDeliver: domainUrl + "Orders/noticeDeliver",  // userId orderId
  //支付---小程序支付
  goPay: domainUrl + "Weixinapppays/goPay",  //openid  orderNo  total_fee userId isBatch ;
  //支付---获取余额支付key
  getPayKey: domainUrl + "Wallets/getKey",  //orderNo isBatch
  //支付---余额支付 
  balancePay: domainUrl + "Wallets/balancePay",  //key userId payPwd isBatch orderNo
  //店铺---虚拟店铺二维码
  shopsCode: domainUrl + "Sharers/shopsCode",  //userId 
  //店铺---获取虚拟店铺信息
  getVirtualShops: domainUrl + "Sharers/getById",  //userId 
  //店铺---实体店铺信息
  selfShop: domainUrl + "Shops/selfShop",  //userId shopId
  //实体店铺--商品排序
  getShopGoods: domainUrl + "Shops/getShopGoods",  //shopId  msort 2表示人气，3表示价格，6时间 mdesc	0表示升序，1表示降序
  //拼团---获取当前拼团的参团情况
  getGroupDetail: domainUrl + "Goods/getGroupDetail",  //userId  groupNo
  //拼团---获取当前商品的开团用户列表
  getGroupList: domainUrl + "Goods/getGroupList",  //goodsId
  //拼团---结算页商品资料
  groupSettlement: domainUrl + "Carts/groupSettlement",  //userId
  //拼团---拼团页面顶部图片
  groupImg: domainUrl + "Index/groupImg",  //
  //拼团---拼团商品列表
  groupListPageQuery: domainUrl + "Goods/groupListPageQuery",  //catId
  //拼团---点击切换广告商品
  grouGoods: domainUrl + "Index/grouGoods",  //type num
  //拼团---首页拼团商品
  groupIndex: domainUrl + "Index/indexGoodsList",
  //首页---关注公众号图片
  getWxScan: domainUrl + "Index/wxAppLogo",
  //店铺---虚拟店铺-商品排序
  virtualShops: domainUrl + "Sharers/shop",
  //用户---修改手机：发送短信验证码
  sendCodeEdit: domainUrl + "Users/sendCodeEdit",  // userId
  //用户---绑定手机时发送验证码
  sendCodeEdit: domainUrl + "Users/phoneCodeEdit",  //userId  userPhone
  //用户---验证验证码(登录、支付、修改手机)
  sendAllCode: domainUrl + "Users/usePhoneCode",  //userId  userPhone smsCode
  //用户---修改密码
  upSecret: domainUrl + "Users/upSecret",  //
  //用户---判断有没有支付、登录密码
  isReset: domainUrl + "Users/isReset",  //userId  
  //用户---忘记支付密码获取验证码
  forgetPassword: domainUrl + "Users/inPayCode",  //userId  
  //用户---修改头像
  upUserPhoto: domainUrl + "Users/upUserPhoto",  //userId userPhoto
  //用户---上传头像
  uploadPic: domainUrl + "Users/uploadPic",  //dir isTumb
  //用户---修改用户昵称
  upUserName: domainUrl + "Users/upUserName",  //userId userName
  //用户---修改用户性别
  upSex: domainUrl + "Users/upSex",  //userId userSex 0保密 1男 2女
  //用户---修改用户昵称
  upUserWechat: domainUrl + "Users/upUserWechat",  //userId userName
  //用户---修改用户性别
  coupons: domain + "addon/coupon-coupons-wxappindex",
  //取某个优惠券可用产品 post传couponId
  wxCouponGoods:domain +'addon/coupon-coupons-wxCouponGoods',
  //领取优惠劵
  wxappGetreceive: domain +"addon/coupon-coupons-wxappGetreceive",
  //砍价
  bargainWxapplists: domain +"addon/bargain-goods-wxapplists",
  //浏览记录
  historyQuery: domainUrl + "Goods/historyQuery",
  getLineGoods: domainUrl + "Goods/getLineGoods",
  getShopCats: domainUrl + "Shops/getShopCats",
  shopGoodsList: domainUrl + "Shops/shopGoodsList",
  //小程序码
  getWxappCode: domainUrl + "Goods/getWxappCode",
  
  //wenjun 2019/1/31
  //历史定位
  Historical_dw: domainUrl + "Areas/Historical_dw",
  // 2019/2/15 获取历史定位
  GetHistorical_dw: domainUrl + "Areas/GetHistorical_dw",
  
  //wenjun xcx 新页面的直接获取优惠券的 2019/2/13
  wxappGetCounp: domainUrl + "Shops/wxappGetCounp",
  //wenjun 2019/2/14 查看该店铺的用户是否为2经理/4销售经理
  wxappGetRank: domainUrl + "Shops/wxappGetRank",
}