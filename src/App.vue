<template>
  <div id="app">
    <!-- 
    <keep-alive exclude="Detail">
      <router-view/>  
    </keep-alive> 
    -->
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"/>  
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/> 
    <main-tab-bar v-show="this.$route.path.indexOf('detail')==-1"/>
    
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import 'assets/css/base.css'
</style>
