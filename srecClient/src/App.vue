<template>
  <div id="app">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />   
     </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>        
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style>
*{
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-family: "Microsoft yahei",Arial, Helvetica, sans-serif;
}
.slider-enter,.slider-leave-to
{
  transform: translateX(100%);
}
.slider-enter-active,.slider-leave-active
{
  transition: transform 0.2s linear;
}
</style>
