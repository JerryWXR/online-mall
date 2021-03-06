// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
// 使用插件
Vue.use(VueRouter);
// 引入store
import store from '@/store'
// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace


// 重写push|replace
// 第一个参数:告诉原来的push方法,往哪里跳,传递哪些参数
// 第二个参数:成功回调
// 第三个参数:失败的回调
// call||apply区别:
    // 相同点:都可以调用函数一次,都可以篡改函数的上下文一次
    // 不同点:call与apply传递参数:call传递参数用逗号隔开,apply方法执行,传递数组
// VueRouter.prototype.push = function (location,resolve,reject) {
//     if(resolve && reject){
//         originPush.call(this,location,resolve,reject)
//     }else{
//         originPush(this,location,()=>{},()=>{})
//     }
// }
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
VueRouter.prototype.replace=function (location,resole,reject) {
    if(resole && reject){
        originReplace.call(this,location,resole,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior(to,from,savedPosition){
        // 返回到y=0,代表的是滚动条在最上方
        return{y:100}
    }
})

// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async(to,from,next)=>{
    // 用户信息
let token = store.state.user.token;
let name=store.state.user.userInfo.name
// let userInfo=store.state.user.userInfo
// console.log(userInfo);
if(token){
    if(to.path=='/login'){
        next('/home')
    }else{
        if(name){
            next()
        }else{
// 没有用户信息，派发action
            try {
                // 获取用户信息成功
                await store.dispatch('getUserInfo')
                next();
            } catch (error) {
              //   token失效，获取不到用户信息
              await store.dispatch('userLogout')
              next('/login')
            }
        }    
    }
}else{
    // 未登录，不能去支付相关，不能去交易相关，不能去个人中心
    //未登录去上面这些路由-----登录
    let toPath = to.path;
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect='+toPath);
    }else{
       //去的不是上面这些路由（home|search|shopCart）---放行
       next();
    }
}
})
export default router ;


const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}