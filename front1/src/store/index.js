import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    fishTmp: undefined,
  },
  getters: {

  },
  mutations: {
    fishToState : function (state, payload) {
      state.fishTmp = payload
    },
    userToState : function (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    fishTmpAction: function ({commit}, payload) {
      commit('fishToState', payload)
    },
    userGetAction: async function ({commit}, payload) {
      console.log('여기는 스토어 actions 시작점')
      await axios.post("https://nunukang.shop/user", payload)
      .then( res => {
        console.log(res.data); //displayName : 닉네임
        commit('userToState',res.data);
      }).catch( err => {
        console.log(err)
      })
    }
  },
    //   getUserAction: function ({commit},)
  // },
  modules: {
  }
})
