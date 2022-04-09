// 当前模块：API进行统一管理
import requests from "./ajax";
import mockRequests from './mockAjax'
// 三级联动的接口
// /api/product/getBaseCategoryList get请求 无参数

export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})
    // 发请求:axios发请求返回的结果是Promise对象

    // 过去banner(home首页轮播图接口)
    export const reqGetBannerList = ()=>mockRequests.get('/banner');
    
