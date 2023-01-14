import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/assets/css/main.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
require("./firebase");
Vue.config.productionTip = false;

import colors from "vuetify/lib/util/colors";

const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    store.dispatch("setEmail", user.email);

    // Sync user data from Firestore
    const docName = "Users/" + user.email;
    const docRef = doc(db, docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      store.dispatch("setUserInfo", docSnap.data());
    } else {
      console.error("No such document!");
    }

    store.dispatch("setSignedin", true);
    router.replace("dashboard").catch((error) => {});
  } else {
    // User is signed out
    store.dispatch("setSignedin", false);
    store.dispatch("clearStore");
    router.replace("logIn");
  }
});

new Vue({
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base, // #3F51B5
  },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
