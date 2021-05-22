import {
  createRouter,
  createWebHistory
} from "vue-router";

const routes = [{
    path: "/home",
    name: "Home",
    component: () =>
      import("../components/Home.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import("../components/Signup.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../components/Login.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;