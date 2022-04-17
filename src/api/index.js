// 当前模块：API进行统一管理
import axios from "axios";
import requests from "./ajax";
import mockRequests from './mockAjax'
// 三级联动的接口
// /api/product/getBaseCategoryList get请求 无参数

export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})
    // 发请求:axios发请求返回的结果是Promise对象

    // 过去banner(home首页轮播图接口)
    export const reqGetBannerList = ()=>mockRequests.get('/banner');

    // 获取floor数据
    export const reqFloorList = ()=>mockRequests.get ('/floor')
    
// 获取搜索模块的数据，地址：/api/list 请求方式：'post' 需要带参数 
// 当前接口给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) =>requests({url:"/list",method:'post',data:params})

// 获取产品详情的接口

export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

// 获取购物车列表数据接口
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'});

// 删除购物产品的接口
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 修改商品状态
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 过去验证码
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 注册
export const reqUserRegister=(data)=>requests({url:`/user/passport/register`,data,method:'post'});

// 登录
export const reqUserLogin=(data)=>requests({url:`/user/passport/login`,data,method:'post'});

// 获取用户信息
export const reqUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

// 退出登录
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取商品清单
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'})

// 提交订单接口
export const reqSubmitOrder =(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取支付信息
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export  const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});




