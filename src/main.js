import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
import {
  firestorePlugin
} from 'vuefire'

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios)
Vue.use(firestorePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");