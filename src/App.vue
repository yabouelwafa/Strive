<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      height="100%"
      width="350px"
      app
      clipped
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="text text--accent-4"
          color="primary"
        >
          <v-list-item to="/dashboard">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/workouts">
            <v-list-item-title>My Workouts</v-list-item-title>
          </v-list-item>

          <v-list-item to="/excercises">
            <v-list-item-title>Excercises</v-list-item-title>
          </v-list-item>

          <v-list-item to="/progress">
            <v-list-item-title>Progress</v-list-item-title>
          </v-list-item>

          <v-list-item to="/account">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template class="mt-16">
        <v-card>
          <div class="pa-2 d-flex flex-row">
            <h5 class="mt-6">Light Mode</h5>
            <v-switch
              v-model="$vuetify.theme.dark"
              inset
              class="width: 40px pb- ml-16"
            ></v-switch>

            <v-spacer></v-spacer>
            <h5 class="ml-9 mt-6">Dark Mode</h5>
          </div>
        </v-card>
      </template>
    </v-navigation-drawer>

    <v-app-bar clipped-left app color="primary" dark height="70px">
      <v-app-bar-nav-icon
        v-if="isSignedin"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <div class="d-flex align-center"></div>
      <v-spacer></v-spacer>
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="100"
        max-width="200"
        src="@/assets/StriveLogo.png"
      ></v-img>
      <v-spacer></v-spacer>
      <v-btn v-if="isSignedin" text @click="doSignout()">Sign Out</v-btn>
      <v-btn v-else text to="/signUp">Sign Up</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    isSignedin() {
      return this.$store.getters.isSignedin;
    },
  },
  methods: {
    doSignout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$store.dispatch("setSignedin", false);
          // this.$router.replace("logIn");
        })
        .catch((error) => {
          // An error happened.
        });
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
