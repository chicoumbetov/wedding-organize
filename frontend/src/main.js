import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import axiosSetup from "./helpers/interceptor";


Vue.config.productionTip = false

Vue.use(VueRouter)
axiosSetup()
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
