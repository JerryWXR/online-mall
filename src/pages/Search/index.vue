<template>
  <div>
     <h1>params参数---{{$route.params.keyword}}====={{keyword}}</h1>
     <h2>query参数---{{$route.query.k}}===={{k}}</h2>
  </div>
</template>

<script>
export default {
    name:'',
    // 路由组件可以传递props
    props:['keyword','k']
}
</script>

<style>

</style>