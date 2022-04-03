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
};
</script>

<style scoped>
</style>
