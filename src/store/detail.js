import { reqGoodsInfo } from "@/api"
const state={
    goodInfo:{},
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo;
    }
}
const actions={
    async getGoodsInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId);
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    }
}
const getters={}

export default{
    state,
    actions,
    mutations,
    getters,
}