<template>
  <v-container>
    <h1 class="title" align="center">My Workouts</h1>

    <!-- Workouts list -->
    <div
      v-for="workout of workouts"
      :key="workout.id"
      class="my-2"
      style="width: 100%; height: 80px"
    >
      <v-sheet outlined color="primary" rounded class="my-6">
        <v-card
          height="90px"
          block
          outlined
          @click="getExercises(workout)"
          class="pa-6"
        >
          <div class="d-flex flex-row">
            <h1>{{ workout.name }}</h1>
          </div>
        </v-card>
      </v-sheet>
    </div>

    <!-- Add new -->
    <v-card :loading="loading" v-if="showAdd" class="my-7" width="100%">
      <v-card-title>Add new workout</v-card-title>
      <v-card-text class="d-flex flex-row justify-center">
        <v-text-field label="Workout name" v-model="name" />
        <v-btn class="ml-7 mr-1 mt-4" @click="saveWorkout()">Save</v-btn>
      </v-card-text>
    </v-card>
    <v-btn
      v-else
      class="mt-16"
      color="accent"
      rounded
      block
      @click="addWorkout()"
      >+</v-btn
    >

    <!-- Exercise Overlay -->
    <v-dialog v-model="overlay" fullscreen>
      <v-card :loading="loading">
        <v-card-title>
          <v-toolbar width="100%" height="50px" color="cyan" dark flat>
            <v-icon dark>mdi-weight-lifter</v-icon>

            <v-spacer></v-spacer>

            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab v-for="exercise of exercises" :key="exercise.id">
                {{ exercise.name }}
              </v-tab>
            </v-tabs>
            <v-spacer />
            <v-icon dark @click="clearExercises()">mdi-close</v-icon>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="exercise in exercises" :key="exercise">
              <v-card>
                <div class="d-flex flex-row ma-auto" justify="center">
                  <v-card-title class="mx-13 t">Sets</v-card-title>
                  <v-card-title class="mx-13 t">Reps</v-card-title>
                  <v-card-title class="mx-13 t">Weight</v-card-title>
                </div>
                <v-card width="650px" v-for="n in exercise.sets" :key="n">
                  <div class="d-flex flex-row">
                    <v-card-title class="ma-13">{{ n }}</v-card-title>
                    <v-text-field
                      solo
                      label="0"
                      outlined
                      class="my-13 mr-13 ml-5"
                      type="number"
                    />
                    <v-text-field
                      type="number"
                      solo
                      label="0"
                      outlined
                      class="my-13"
                    />
                    <btn>X</btn>
                  </div>
                </v-card>
              </v-card>
              <v-btn @click="addSet(exercise)">Add Set</v-btn>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
        <v-card-actions class="d-flex flex-column"> </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      width="750px"
      color="primary"
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  data: () => ({
    //Exercise tabs
    tab: null,
    items: ["web", "shopping", "videos", "images", "news"],

    loading: false,
    showAdd: false,

    //Snackbar
    snackbar: false,
    text: "Workout added",
    timeout: 1500,

    //Exercise overlay
    absolute: true,
    opacity: 1,
    overlay: false,
    loading: false,

    name: "",
    workouts: [],
    exercises: [],
  }),
  computed: {
    workoutsCollectionName() {
      let email = this.$store.getters.getEmail;
      let collectionName = "Users/" + email + "/Workouts";
      return collectionName;
    },
  },
  mounted() {
    this.getWorkouts();
  },
  methods: {
    addWorkout() {
      this.showAdd = true;
    },
    async saveWorkout() {
      this.loading = true;
      if (this.name == "") {
        this.name = "Workout - " + this.workouts.length;
      }

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, this.workoutsCollectionName), {
        name: this.name,
      });
      console.log("Document written with ID: ", docRef.id);

      this.workouts.push({
        id: docRef.id,
        name: this.name,
      });
      this.snackbar = true;
      this.loading = false;
      this.showAdd = false;
    },

    async getWorkouts() {
      const querySnapshot = await getDocs(
        collection(db, this.workoutsCollectionName)
      );
      this.workouts = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.workouts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },

    async getExercises(workout) {
      this.loading = true;
      this.overlay = true;
      const email = this.$store.getters.getEmail;
      const collectionName =
        "Users/" + email + "/Workouts/" + workout.id + "/exercises";
      const querySnapshot = await getDocs(collection(db, collectionName));
      console.log(collectionName);
      querySnapshot.docs.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.exercises.push({
          id: doc.id,
          ...doc.data(),
          sets: 0,
        });
      });
      this.loading = false;
    },
    clearExercises() {
      this.overlay = false;
      this.exercises = [];
    },
    addSet(exercise) {
      exercise.sets += 1;
    },
  },
};
</script>

<style scoped>
.title {
  font-style: italic;
}

.t {
  font-size: x-large;
  font-style: italic;
}
</style>
