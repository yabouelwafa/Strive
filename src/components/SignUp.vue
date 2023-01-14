<template>
  <v-container fill-height>
    <v-card width="800px" height="600px" class="ma-auto">
      <v-card-title>Sign Up</v-card-title>
      <v-card-subtitle>Please enter your information</v-card-subtitle>
      <v-card-text>
        <v-text-field
          label="Name (First Last)"
          outlined
          v-model="name"
        ></v-text-field>
        <v-text-field label="Email" outlined v-model="email"></v-text-field>
        <v-text-field label="Age" outlined v-model="age"></v-text-field>

        <v-text-field
          label="Username"
          outlined
          v-model="username"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          outlined
          v-model="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="d-flex flex-column px-4">
        <v-btn block rounded color="primary" dark @click="doSignUp()"
          >Sign Up</v-btn
        >
      </v-card-actions>
      <v-card-subtitle align="center" class=""
        >Already have an account?
        <v-btn to="/login" text color="primary" width="25px" plain
          >Log in</v-btn
        ></v-card-subtitle
      >
    </v-card>
  </v-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "HelloWorld",

  data: () => ({
    rememberMe: true,
    name: "",
    username: "",
    email: "",
    password: "",
    age: "",
  }),
  methods: {
    doSignUp() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          alert("success");

          // Add information to database
          let infoDocName = "Users/" + this.email;
          let email = this.email.toLowerCase();

          const docRef = await setDoc(doc(db, infoDocName), {
            name: this.name,
            username: this.username,
            email: email,
            password: this.password,
            age: this.age,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);

          // ..
        });
    },
  },
};
</script>
