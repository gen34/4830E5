import Vue from 'vue'
import App from './App.vue'
import 'weui/dist/style/weui.min.css'
import './assets/css/common.css'
import "./assets/css/iconfont.css";
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')