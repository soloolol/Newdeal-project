import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    fishTmp: undefined,
    snackbarCookie: 0,
  },
  getters: {

  },
  mutations: {
    fishToState : function (state, payload) {
      state.fishTmp = payload
    },
    userToState : function (state, payload) {
      state.userInfo = payload
    },
    snackbarCookie : function(state) {
      state.snackbarCookie ++
    }
  },
  actions: {
    fishTmpAction: function ({commit}, payload) {
      commit('fishToState', payload)
    },

    snackbarCookie: function({commit}){
      commit('snackbarCookie')
    },

    userGetAction: async function ({commit}, {payload, social}) {
      if( social = 'kakao'){
        alert('여기는 스토어 actions kakao',payload)
        await axios.post("https://nunukang.shop/kakao", payload)
        .then( res => {
          console.log(res.data); //displayName : 닉네임
          commit('userToState',res.data);
        }).catch( err => {
          console.log(err)
        })
      } else if( social = 'naver'){
        console.log('여기는 스토어 actions naver',payload)
        await axios.post("https://nunukang.shop/naver", payload)
        .then( res => {
          console.log(res.data); //displayName : 닉네임
          commit('userToState',res.data);
        }).catch( err => {
          console.log(err)
        })
      } else {
        console.log('여기는 스토어 actions google',payload)
        await axios.post("https://nunukang.shop/google", payload)
        .then( res => {
          console.log(res.data); //displayName : 닉네임
          commit('userToState',res.data);
        }).catch( err => {
          console.log(err)
        })
      }

    },


  },
    //   getUserAction: function ({commit},)
  // },
  modules: {
  }
})
