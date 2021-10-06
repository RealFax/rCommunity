import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import i18n from './i18n'
import './plugins/element'
import './plugins/recaptcha'
import VueElementLoading from "vue-element-loading";


Vue.component("VueElementLoading", VueElementLoading);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = i18n.t(to.meta.title);
  }
  next()
})


new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')