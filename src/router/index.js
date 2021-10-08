import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import {
  auth
} from "@/firebase"

Vue.use(VueRouter);

const routes = [{
    path: "/play",
    name: "Play",
    component: () =>
      import( /* webpackChunkName: "emulator" */ "../views/Play.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import( /* webpackChunkName: "auth" */ "../views/Login.vue"),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import( /* webpackChunkName: "auth" */ "../views/Signup.vue"),
    meta: {
      requiresGuest: true
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresGuest)) {
    if (auth.currentUser) {
      next({
        path: "/"
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;