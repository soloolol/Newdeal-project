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
            <div id="naver_id_login"></div>
            <!-- <v-btn text elevation="0" @click="loginWithNaver"><img src="../assets/naver_login.png" width="190px" height="45px"/></v-btn> -->
          </v-row>
          <v-row justify="center" class="mb-10">
            <v-btn text elevation="0" @click="loginWithKakao"><img src="../assets/kakao_login.png" width="208px" height="45px"/></v-btn>
          </v-row>
          <v-row justify="center" class="mb-10">
            <v-btn text elevation="0" @click="loginWithGoogle"><img src="../assets/google_login.png" width="209px" height="47px"/></v-btn>
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
      <v-row justify="center">
        <v-col cols="12">
          <v-row justify="center" class="mb-10">
            <v-btn @click="logOut">로그아웃</v-btn>
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
        }
      },
      created(){
        
      },

      //로그인 값 있으면 로그아웃 창 띄우고 아니면 로그인 창
      mounted(){
        console.log(this.$store.state.userInfo)
        console.log(window.Kakao.Auth.getAccessToken())
        if (window.Kakao.Auth.getAccessToken()) {
          this.login = true;
        }else {
          this.login = false;
        };

        this.loginWithNaver()
      },

   
      methods:{
        ...mapActions(['userGetAction']),

        // kakao 로그인 요청
        loginWithKakao() {
          const params = {
              redirectUri: "https://nunutest.shop/login/kakao", //redirect_url은 동일하게
          };
          window.Kakao.Auth.authorize(params);
        },

        loginWithNaver(){
          const client_id = "2jr941k4E1YtJ1JN3Cw7"
          const callbackURL = "https://nunutest.shop/login/naver"
          var naver_id_login = new window.naver_id_login(client_id, callbackURL);
          var state = naver_id_login.getUniqState();
          naver_id_login.setButton("green", 3,45);
          // naver_id_login.setDomain("https://nunutest.shop");
          naver_id_login.setState(state);
          // naver_id_login.setPopup();
          naver_id_login.init_naver_id_login();
        },

        loginWithGoogle(){

        },
        
        logOut(){
          if(window.Kakao.Auth.getAccessToken()){
            console.log(this.$store.state.userInfo)
            console.log('1')
            this.kakaoLogOut()
    
          }else if(window.naver_id_login.getAccessToken()){
            console.log(this.$store.state.userInfo)
            console.log('2')
            this.naverLogOut()
          }else {
            this.googleLogOut()
          }
          storeUserInfoReset()
          console.log(this.$store.state.userInfo)
        },

        storeUserInfoReset(){
          this.$store.commit('userToState',null)
        },


        // 로그아웃
        kakaoLogOut(){
          console.log('3')
          const kakaoKey = 'fae1a098029cf35226952ad2c245221a'
          window.Kakao.init(kakaoKey); // 초기화
          window.Kakao.isInitialized();
          console.log('4')

          window.Kakao.Auth.logout(function () {
            alert('로그아웃 되었습니다.', window.Kakao.Auth.getAccessToken());
            this.$router.push({name:'home'});
          });

        },

        naverLogOut(){
          return
        },

        googleLogOut(){

        },

      },

    }
</script>
