import Vue from "vue";
// import Buefy from 'buefy'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {
  firestorePlugin
} from 'vuefire'

import {
  auth
} from "./firebase"

import App from "./App.vue";
import router from "./router";
import store from "./store";

// import 'buefy/dist/buefy.css'
import "./assets/css/tailwind.css"

Vue.config.productionTip = false;

Vue.use(VueAxios, axios)
Vue.use(firestorePlugin)
// Vue.use(Buefy)

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})