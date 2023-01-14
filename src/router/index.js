import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";
import Dashboard from "@/views/Dashboard";
import MyWorkouts from "@/views/MyWorkouts";
import Excercises from "@/views/Excercises";
import Progress from "@/views/Progress";
import Account from "@/views/Account";
import ForgotPassword from "@/views/ForgotPassword";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/forgotPassword",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/workouts",
    name: "myWorkouts",
    component: MyWorkouts,
  },
  {
    path: "/excercises",
    name: "excercises",
    component: Excercises,
  },
  {
    path: "/progress",
    name: "progress",
    component: Progress,
  },
  {
    path: "/account",
    name: "account",
    component: Account,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
