<template>
  <v-container fill-height fluid>
    <v-row align-items="center">
      <v-card
        v-if="!login"
        light
        class="mx-auto pa-2"
        max-width="400"
        align-items="center"
      >
        <v-row justify="center">
          <v-col cols="12">
            <v-row justify="center" class="pa-10">
              <!-- <div id="naverIdLogin"></div> -->
              <v-btn text elevation="0" @click="loginWithNaver"><img src="https://static.nid.naver.com/oauth/big_g.PNG" width="222"/></v-btn>
            </v-row>
            <v-row justify="center" class="pa-10">
              <v-btn text elevation="0" @click="loginWithKakao"><img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="222"/></v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <v-card
        v-else
        light
        class="mx-auto pa-10"
        max-width="400"
        align-items="center"
      >
        <v-row justify="center" class="mx-10">
          <v-col cols="12">
            <v-row justify="center">

              <v-avatar size="110" color="red" :style="showIcon">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>

              <v-avatar size="110" color="orange" :style="showImg">
                <img
                  :src="thumbnail"
                  alt="userProfile"
                >
              </v-avatar>

            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-row justify="center">
              <v-card-title justify="center" text-align="center" align-items="center">{{this.$store.state.userStore.userInfo.nickname}}</v-card-title>
            </v-row>
          </v-col>
        </v-row>

        <v-row justify="center" >
          <v-col cols="12">
            <v-row justify="center" class="mb-10">
              <v-btn color="blue-grey" class="ma-2 white--text" @click="logOut">๋ก๊ทธ์์</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

    </v-row>
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
          showIcon:'display:none;',
          showImg:'display:none;',
          thumbnail:''
        }
      },
      created(){
        
      },

      //๋ก๊ทธ์ธ ๊ฐ ์์ผ๋ฉด ๋ก๊ทธ์์ ์ฐฝ ๋์ฐ๊ณ? ์๋๋ฉด ๋ก๊ทธ์ธ ์ฐฝ
      mounted(){
        // console.log(this.$store.state.userStore.userInfo)
        // console.log('์นด์นด์ค๋ก๊ทธ์ธ๋์ด์์',window.Kakao.Auth.getAccessToken())
        // console.log('๋ค์ด๋ฒ๋ก๊ทธ์ธ๋์ด์์?',this.$store.state.userStore.userInfo)
        if (this.$store.state.userStore.userInfo) {
          this.getUserId();
          this.login = true;
          this.myInfo();
        }else {
          this.login = false;
        };
      },

   
      methods:{
        ...mapActions(['userGetAction']),
  
        getUserId(){
          if(this.$store.state.userStore.userInfo){
              this.userId = this.$store.state.userStore.userInfo.nickname
          }
        },
        myInfo(){
          if(this.$store.state.userStore.userInfo.thumbnail){
            // console.log(this.$store.state.userStore.userInfo.thumbnail)
            this.thumbnail = this.$store.state.userStore.userInfo.thumbnail
            this.showImg = "display:flex;"
          }else{
            this.showIcon = "display:flex;"
          }
        },

        // kakao ๋ก๊ทธ์ธ ์์ฒญ
        loginWithKakao() {
          const params = {
              redirectUri: "https://nunutest.shop/login/kakao", //redirect_url์ ๋์ผํ๊ฒ
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
            // console.log('์นด์นด์ค๋ก๊ทธ์์');
            this.kakaoLogOut();
            // console.log(this.$store.state.userStore.userInfo);
          }else{
            // console.log('๋ค์ด๋ฒ๋ก๊ทธ์์');
            this.naverLogOut();
            // console.log(this.$store.state.userStore.userInfo);
          }
        },

        storeUserInfoReset(){
          this.$store.commit('userToState',null);
        },

        snackbarCookieReset(){
          this.$store.dispatch('snackbarCookieReset');
        },

        // ๋ก๊ทธ์์
        async kakaoLogOut(){
          await window.Kakao.Auth.logout();
          this.snackbarCookieReset();
          this.storeUserInfoReset();
          alert('๋ก๊ทธ์์ ๋์์ต๋๋ค.',this.$store.state.userStore.userInfo);
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
          alert('๋ก๊ทธ์์ ๋์์ต๋๋ค.', this.$store.state.userStore.userInfo);
          this.$router.push({name:'home'});
        },

      }
    }
</script>
