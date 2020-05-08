import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    localstorage: false,
    allItem : [],
    allCategory:[]
  },
  mutations: {
    SET_LOCALSTORAGE(state,payload){
      console.log(payload)
      state.localstorage = payload
    },
    SET_ALL_ITEM(state,payload){
      state.allItem = [...payload]
    },
    SET_CATEGORY(state,payload){
      state.allCategory = [...payload]
    }
  },
  actions: {
    async fetchData({ commit }){
      try {
        const allItem = await axios.get('http://localhost:3000/items')
        const category = await axios.get('http://localhost:3000/category')
        console.log(allItem,category)
        commit('SET_ALL_ITEM',allItem.data)
        commit('SET_CATEGORY',category.data)
      } catch (error) {
        console.log(error)        
      }
    }
    
  },
  modules: {}
});
