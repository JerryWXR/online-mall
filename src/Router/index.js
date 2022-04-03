// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// 配置路由
export default new VueRouter({
    // 配置路由
    routes:[
        {
            path:"/home",
            component:Home,
            meta:{shouw:trye}
        },
        {
            path:"/search",
            component:Search,
            meta:{shouw:trye}
        },
        {
            path:"/login",
            component:Login,
            meta:{shouw:false}
        },
        {
            path:"/register",
            component:Register,
            meta:{shouw:false}
        },
        // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        {
            path:'*',
            redirect:"/home"
        }
    ]
})