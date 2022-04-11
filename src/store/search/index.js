import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state = {
    searchList:{},
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
};
const actions = {
    // 获取search模块数据
    async getSearchList({commit},params={}){
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result =await reqGetSearchInfo(params)
        if(result.code==200){
            commit("GETSEARCHLIST",result.data)
        }
        
    }
};
const getters = {
    //当前形参state，当前仓库中的state，并非大仓库中的那个state
    goodsList(state){
      //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
      //假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
      //计算新的属性的属性值至少给人家来一个数组
      return state.searchList.goodsList||[];
    }
    ,
    trademarkList(state){
      return state.searchList.trademarkList||[];
    },
    attrsList(state){
      return state.searchList.attrsList||[];
    }
 };
export default {
    state,
    mutations,
    actions,
    getters,
}