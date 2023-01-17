<!-- Exercise compnnet for each exercise in the exercises component -->
<template>
  <v-container>
    <!-- Exercise information -->
    <v-expansion-panel class="">
      <v-expansion-panel-header>{{ exercise.name }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card-subtitle class="pl-4 desc-sub">Discreption</v-card-subtitle>
        <p class="ml-6 descreption" align="left">
          {{ exercise.description }}
        </p>
        <div class="d-flex flex-row">
          <div>
            <v-card-subtitle class="pl-4 desc-sub">Type</v-card-subtitle>
            <p class="ml-6 type" align="left">
              {{ exercise.type }}
            </p>
          </div>
          <div class="ml-8">
            <v-card-subtitle class="pl-4 desc-sub">Muscle</v-card-subtitle>
            <p class="ml-6 type" align="left">
              {{ exercise.mucsle }}
            </p>
          </div>
        </div>

        <!-- Dialog: Page that pops up so the user can pick the workout to add the exercise to -->
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              width="80%"
              color="primary"
              class="ml-16 mb-5 mt-5"
              >Add to workout</v-btn
            >
          </template>
          <v-card>
            <v-card-title class="text-h5 primary lighten-2">
              Workouts
            </v-card-title>
            <div v-for="workout of workouts" :key="workout.id">
              <v-card
                height="70px"
                block
                outlined
                color=""
                class="mb-3"
                @click="addExercise(workout.id)"
              >
                <v-card-title class="mb-8">{{ workout.name }}</v-card-title>
              </v-card>
            </div>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false"> Done </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- Snackbar: notifaction that pops up when exercise is added-->
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
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    expanded: false,
    workouts: [],

    //Snackbar
    snackbar: false,
    text: "Exercise added",
    timeout: 1500,
  }),
  computed: {
    workoutsCollectionName() {
      let email = this.$store.getters.getEmail;
      let collectionName = "Users/" + email + "/Workouts";
      return collectionName;
    },
  },
  methods: {
    expand() {
      this.expanded = !this.expanded;
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
    async addExercise(wId) {
      let email = this.$store.getters.getEmail;
      let collectionName = "Users/" + email + "/Workouts/" + wId + "/exercises";
      await addDoc(collection(db, collectionName), {
        name: this.exercise.name,
      });
      this.dialog = false;
      alert("Exercise added");
    },
  },
  mounted() {
    this.getWorkouts();
  },
};
</script>

<style scoped>
.descreption {
  font-size: small;
  font-family: monospace;
  width: 45ex;
}
.desc-sub {
  font-size: large;
  font-weight: bold;
}
.type {
  font-size: large;
}
</style>
