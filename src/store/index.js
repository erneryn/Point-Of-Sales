import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    localstorage: false
  },
  mutations: {
    SET_LOCALSTORAGE(state,payload){
      console.log(payload)
      state.localstorage = payload
    }
  },
  actions: {},
  modules: {}
});
