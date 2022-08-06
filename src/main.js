import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  // el:'#app'等同于mount('#app')
  render: h => h(App),
}).$mount('#app')
