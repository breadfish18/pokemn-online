import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";
import firebase from "firebase/app";

import "./assets/styles/tailwind.css";

const firebaseConfig = {
  apiKey: "AIzaSyAIMbWZR3rEfpDbMM7-3kK89fVfB7y2ES0",
  authDomain: "pokemn-online.firebaseapp.com",
  projectId: "pokemn-online",
  storageBucket: "pokemn-online.appspot.com",
  messagingSenderId: "487653301458",
  appId: "1:487653301458:web:6da6e1fd3a24f02b01a10b",
};

firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
