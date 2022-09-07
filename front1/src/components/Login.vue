<template>
  <v-container fluid>
    <v-card       
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
            <v-btn text elevation="0" @click="getLoginUri('naver')"><img src="../assets/naver_login.png" width="190px" height="45px"/></v-btn>
          </v-row>
          <v-row justify="center" class="mb-10">
            <v-btn text elevation="0" @click="loginWithKakao"><img src="../assets/kakao_login.png" width="190px" height="45px"/></v-btn>
          </v-row>
          <v-row justify="center" class="mb-10">
            <v-btn text elevation="0" @click="getLoginUri('google')"><img src="../assets/google_login.png" width="190px" height="45px"/></v-btn>
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

        }
      },
      created(){

      },
      // 로그인 후 user 데이터 리다이렉트 받아오는 부분 아직 안함 공부중
      methods:{
        ...mapActions(['userGetAction']),

        loginWithKakao() {
            const params = {
                redirectUri: "https://nunutest.shop", //redirect_url은 동일하게
            };
            window.Kakao.Auth.authorize(params);
        },
        
      },

    }
</script>
