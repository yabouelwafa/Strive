import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  computed: {
    isDark() {
      return this.$store.getters.isDark;
    },
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#A72725",
        secondary: "#E4B363",
        accent: "#313638",
        error: "#b71c1c",
      },
    },
  },
});
