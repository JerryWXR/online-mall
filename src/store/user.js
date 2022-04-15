import { reqGetCode, reqUserLogin, reqUserRegister,reqUserInfo ,reqLogout} from "@/api"
import {getToken, setToken,removeToken} from '@/utils/token'

const state = {
    code: "",
    token:getToken(),
    userInfo:{},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state){
        state.token='';
        state.userInfo={};
        removeToken();
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    // 登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            setToken(result.data.token)
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result=await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINFO", result.data);
            return 'ok'
        }
        
    },
    // 退出登录
    async userLogout({commit}){
        let result=await reqLogout();
        // action里面不能修改state，提交mutation修改state
        if(result.code==200){
            commit("CLEAR");
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}