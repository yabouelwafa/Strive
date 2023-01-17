<template>
  <v-container>
    <v-card-title>Progress</v-card-title>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in 1" :key="i">
        <v-expansion-panel-header> Pull - 1 </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="exercise of exercises" :key="exercise">
              {{ exercise.name }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="exercise in exercises" :key="exercise">
              <v-card>
                <div class="d-flex flex-row ma-auto" justify="center">
                  <v-card-title class="mx-13 t">Sets</v-card-title>
                  <v-card-title class="mx-13 t">Reps</v-card-title>
                  <v-card-title class="mx-13 t">Weight</v-card-title>
                </div>
                <v-card
                  width="650px"
                  v-for="(item, i) in exercise.sets"
                  :key="i"
                >
                  <div class="d-flex flex-row">
                    <v-card-title class="ma-13">{{ i + 1 }} </v-card-title>
                    <v-text-field
                      solo
                      :label="exercise.reps"
                      outlined
                      class="my-13 mr-13 ml-5"
                      type="number"
                      disabled
                    />
                    <v-text-field
                      type="number"
                      solo
                      :label="exercise.weight"
                      outlined
                      class="my-13"
                      disabled
                    />
                  </div>
                </v-card>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-for="(item, i) in 1" :key="i">
        <v-expansion-panel-header>Push - 1</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="exercise of exercises1" :key="exercise">
              {{ exercise.name }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="exercise in exercises1" :key="exercise">
              <v-card>
                <div class="d-flex flex-row ma-auto" justify="center">
                  <v-card-title class="mx-13 t">Sets</v-card-title>
                  <v-card-title class="mx-13 t">Reps</v-card-title>
                  <v-card-title class="mx-13 t">Weight</v-card-title>
                </div>
                <v-card
                  width="650px"
                  v-for="(item, i) in exercise.sets"
                  :key="i"
                >
                  <div class="d-flex flex-row">
                    <v-card-title class="ma-13">{{ i + 1 }} </v-card-title>
                    <v-text-field
                      solo
                      :label="exercise.reps"
                      outlined
                      class="my-13 mr-13 ml-5"
                      type="number"
                      disabled
                    />
                    <v-text-field
                      type="number"
                      solo
                      :label="exercise.weight"
                      outlined
                      class="my-13"
                      disabled
                    />
                  </div>
                </v-card>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    tab: null,

    expanded: true,
    exercises: [
      {
        name: "Pull ups",
        sets: 2,
        reps: 12,
        weight: "0",
      },
      {
        name: "Bicep curls",
        sets: 2,
        reps: 12,
        weight: 20,
      },
    ],
    exercises1: [
      {
        name: "Bench press",
        sets: 2,
        reps: 8,
        weight: 90,
      },
      {
        name: "Push ups",
        sets: 2,
        reps: 12,
        weight: "0",
      },
    ],
  }),
};
</script>
