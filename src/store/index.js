import { FirebaseError } from "firebase/app";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn: false,
    dark: true,
    email: "",
    userInfo: {
      name: "",
    },
  },
  getters: {
    isSignedin: (state) => {
      return state.signedIn;
    },
    isDark: (state) => {
      return state.dark;
    },
    getEmail: (state) => {
      return state.email;
    },
    getUserInfo: (state) => {
      return state.userInfo;
    },
  },
  mutations: {},
  actions: {
    setSignedin: (context, signedIn) => {
      context.state.signedIn = signedIn;
    },
    darkTheme: (context, dark) => {
      context.state.dark = dark;
    },
    setEmail: (context, email) => {
      context.state.email = email;
    },
    setUserInfo: (context, userInfo) => {
      context.state.userInfo = userInfo;
    },

    /**
     * Clear the store after the user logs out
     *
     * @param {context} context
     */
    clearStore: (context) => {
      context.state.signedIn = false;
      context.state.email = "";
      context.state.userInfo = {
        name: "",
      };
    },
  },

  modules: {},
});
