import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
import {
  firestorePlugin
} from 'vuefire'

import {
  auth,
  db
} from './firebase'
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios)
Vue.use(firestorePlugin)

console.log(db.collection("saves"))

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
})