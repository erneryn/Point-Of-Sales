import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#ffb142',
            secondary: '#218c74',
            accent: '#d6be04',
            error: '#b71c1c',
          },
        },
      },

});
