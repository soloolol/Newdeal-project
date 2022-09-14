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
    },
    snackbarCookieReset : function(state) {
      state.snackbarCookie = 0
    }
  },
  actions: {
    fishTmpAction: function ({commit}, payload) {
      commit('fishToState', payload)
    },

    snackbarCookie: function({commit}){
      commit('snackbarCookie')
    },

    snackbarCookieReset: function({commit}){
      commit('snackbarCookieReset')
    },

    userGetAction: async function ({commit}, {data, social}) {
      if( social = 'kakao'){
        // console.log(social,data)
        alert('여기는 스토어 actions kakao',data)
        await axios.post("https://nunukang.shop/kakao", data)
        .then( res => {
          console.log(res.data); //displayName : 닉네임
          commit('userToState',res.data);
        }).catch( err => {
          console.log(err)
        })
      } else if( social = 'naver'){
        console.log('여기는 스토어 actions naver',data)
        await axios.post("https://nunukang.shop/naver", data)
        .then( res => {
          console.log(res.data); //displayName : 닉네임
          commit('userToState',res.data);
        }).catch( err => {
          console.log(err)
        })
      } else {
        console.log('여기는 스토어 actions google',data)
        await axios.post("https://nunukang.shop/google", data)
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
