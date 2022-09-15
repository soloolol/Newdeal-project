<template>
  <v-container fluid>
    <v-card
      v-if="!login"
      light
      class="mx-auto pa-2"
      max-width="400"
      align-items="center"
    >
      <v-row justify="center">
        <v-col cols="12">
          <v-row justify="center" class="mb-10">
            <v-card-title>LOGIN</v-card-title>
          </v-row>
          <v-row justify="center" class="mb-10">
            <!-- <div id="naverIdLogin"></div> -->
            <v-btn text elevation="0" @click="loginWithNaver"><img src="https://static.nid.naver.com/oauth/big_g.PNG" width="222"/></v-btn>
          </v-row>
          <v-row justify="center" class="mb-10">
            <v-btn text elevation="0" @click="loginWithKakao"><img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="222"/></v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card
      v-if="login"
      light
      class="mx-auto pa-2"
      max-width="400"
      align-items="center"
    >
      <v-avatar size="110" color="red" v-if="this.userInfo.thumbnail===null">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
      <v-avatar size="110" color="orange" v-else>
        <img
          :src="this.userInfo.thumbnail"
          alt="userProfile"
        >
      </v-avatar>
      <v-title justify="center" text-align="center" align-items="center">{{this.userInfo.nickname}}</v-title>
      <v-row justify="center">
        <v-col cols="12">
          <v-row justify="center" class="mb-10">
            <v-btn color="blue-grey" class="ma-2 white--text" @click="logOut">로그아웃</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'

    export default {
      name: 'Login',

      data(){
        return{
          login: false,
          userInfo: undefined,
        }
      },
      created(){
        
      },

      //로그인 값 있으면 로그아웃 창 띄우고 아니면 로그인 창
      mounted(){
        console.log(this.$store.state.userInfo)
        console.log('카카오로그인되어있음',window.Kakao.Auth.getAccessToken())
        console.log('네이버로그인되어있음?',this.$store.state.userInfo)
        if (window.Kakao.Auth.getAccessToken() || this.$store.state.userInfo) {
          this.login = true;
        }else {
          this.login = false;
          this.getUserId();
        };
      },

   
      methods:{
        ...mapActions(['userGetAction']),

        getUserId(){
          if(this.$store.state.userInfo){
              this.userId = this.$store.state.userInfo.nickname
          }
        },

        // kakao 로그인 요청
        loginWithKakao() {
          const params = {
              redirectUri: "https://nunutest.shop/login/kakao", //redirect_url은 동일하게
          };
          window.Kakao.Auth.authorize(params);
        },

        loginWithNaver(){
          const naverLogin = new naver.LoginWithNaverId({
            clientId: "2jr941k4E1YtJ1JN3Cw7", // Naver client key
            callbackUrl: "https://nunutest.shop/login/naver",
            callbackHandle: true
          })
          naverLogin.init()
          naverLogin.reprompt()
        },
        
        logOut(){
          if(window.Kakao.Auth.getAccessToken()){
            console.log('카카오로그아웃');
            this.kakaoLogOut();
            console.log(this.$store.state.userInfo);
          }else{
            console.log('네이버로그아웃');
            this.naverLogOut();
            console.log(this.$store.state.userInfo);
          }
        },

        storeUserInfoReset(){
          this.$store.commit('userToState',null);
        },

        snackbarCookieReset(){
          this.$store.dispatch('snackbarCookieReset');
        },

        // 로그아웃
        async kakaoLogOut(){
          await window.Kakao.Auth.logout();
          this.snackbarCookieReset();
          this.storeUserInfoReset();
          alert('로그아웃 되었습니다.',this.$store.state.userInfo);
          this.$router.push({name:'home'});
        },

        async naverLogOut(){
          const naverLogin = await new naver.LoginWithNaverId({
            clientId: '2jr941k4E1YtJ1JN3Cw7'
            });
          await naverLogin.init();
          await naverLogin.logout();
          this.snackbarCookieReset();
          this.storeUserInfoReset();
          alert('로그아웃 되었습니다.', this.$store.state.userInfo);
          this.$router.push({name:'home'});
        },

      }
    }
</script>
