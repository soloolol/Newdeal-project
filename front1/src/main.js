import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'


Vue.config.productionTip = false
Vue.prototype.axios = axios

const kakaoKey = 'fae1a098029cf35226952ad2c245221a'
window.Kakao.init(kakaoKey);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
