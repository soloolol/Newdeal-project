import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: "",
    fishTmp: undefined,
  },
  getters: {
    getData(state){
      return state.fishTmp
    }
  },
  mutations: {
    fishToState : function (state, payload) {
      state.fishTmp = payload
    }
  },
  actions: {
    fishTmpAction: function ({commit}, payload) {
      commit('fishToState', payload)
    }
  },
  modules: {
  }
})
