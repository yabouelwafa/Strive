<template>
  <v-container fill-height>
    <v-card width="800px" height="455px" class="ma-auto">
      <v-card-title>Login</v-card-title>
      <v-card-subtitle>Please enter your information</v-card-subtitle>

      <!-- Information text fields -->
      <v-card-text>
        <v-text-field
          class="mb-"
          label="Email"
          outlined
          v-model="email"
        ></v-text-field>
        <v-text-field
          class="mb-"
          label="Password"
          outlined
          type="password"
          v-model="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="d-flex flex-column px-4">
        <v-btn block rounded color="primary" dark @click="doLogin()">
          Login
        </v-btn>
        <div class="d-flex flex-row my-13" style="width: 100%">
          <div>
            <v-checkbox v-model="rememberMe" label="Remember me"></v-checkbox>
          </div>
          <v-spacer />
          <div class="mt-4">
            <v-btn plain to="/forgotPassword">forgot Password</v-btn>
          </div>
        </div>
      </v-card-actions>
      <v-card-subtitle align="center" class=""
        >Don't have an account?
        <v-btn to="/signUp" text color="primary" width="25px" plain
          >Sign up</v-btn
        ></v-card-subtitle
      >
    </v-card>
  </v-container>
</template>

<script>
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from "firebase/auth";
export default {
  name: "HelloWorld",

  data: () => ({
    rememberMe: true,
    email: "",
    password: "",
  }),
  methods: {
    async doLogin() {
      const auth = getAuth();

      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              this.$store.dispatch("setEmail", user.email);
              this.$store.dispatch("setSignedin", true);
              this.$router.push("dashboard");
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert("Incorrect email or password");
            });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
  },
};
</script>
