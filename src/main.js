import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body) 

//安装懒加载的插件
console.log('VueLazyload',VueLazyload);

Vue.use(VueLazyload,{
    preLoad:1.3,
    loading:require('./assets/logo.png'),
    error:require('./assets/logo.png'),
    attempt:1
})



new Vue({
  // el:'#app'等同于mount('#app')
  render: h => h(App),
  router,
  store
}).$mount('#app')
