import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from "./router";
import store from "./store"
Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconPack: 'fas'
});

// Vue.use(require('vue-pusher'), {
//   api_key: '909399',
//   options: {
//       cluster: 'ap1',
//       encrypted: true,
//   }
// });

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app')
