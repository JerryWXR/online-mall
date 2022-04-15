<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在注册登录时隐藏 -->
    <Footer></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue"
export default {
  name: "",
  components: {
    Header,
    Footer
  },
  mounted(){
    // 派发action|获取商品分类的三级列表
     this.$store.dispatch("categoryList");
     
      
  }
};
</script>

<style scoped>
</style>
