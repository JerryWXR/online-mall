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



