<template>
  <v-app>
    <v-app-bar
      style="background:#FFFFFF;"
      light
      absolute
      app
      hide-on-scroll
      scroll-target="#main"
      elevation="2"
    >
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
<!--   <v-img
          alt="nunukang"
          class="shrink mt-1"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <h2 class="headline font-weight-semibold pl-10" style="color:black;">
          NuNuKang
        </h2>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn
          icon
          value="account"
          @click="$router.push({name:'login'})"
        >
          <v-icon top>
            mdi-account
          </v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main id="main" style="display: flex; justify-content: center;">
      <h6>{{ userId }}</h6>
      <router-view/>
    </v-main>
    
    <v-bottom-navigation
      light
      app
      style="background:#FFFFFF; border-radius: 5px, 5px, 0, 0;"
    >
      <v-btn
        value="rank"
        style="background-color: #FFFFFF;"
        class="mt-1"
        @click="$router.push({name:'rank'})"
      >
        <span>랭킹</span>

        <v-icon>mdi-podium-gold</v-icon>
      </v-btn>

      <v-btn 
        value="point" 
        style="background-color: #FFFFFF;"
        class="mt-1"
        @click="$router.push({name:'map'})"
      >
        <span>지도</span>

        <v-icon>mdi-map-marker-radius-outline</v-icon>
      </v-btn>

      <v-btn 
        fab
        style="background-color: #FFFFFF;"
        large
      >
<!--       <v-icon>mdi-camera-iris</v-icon> --> 
        <div class="home-btn" style="width:80px;">
        </div>
      </v-btn>

      <v-btn
        value="weather"
        style="background-color: #FFFFFF;"
        class="mt-1"
        @click="$router.push({name:'weather'})"
      >
        <span>날씨</span>

        <v-icon>mdi-weather-sunny</v-icon>
      </v-btn>

      <v-btn
        value="search"
        style="background-color: #FFFFFF;"
        class="mt-1"
        @click="$router.push({name:'search'})"
      >
        <span>검색</span>

        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-btn 
      outlined
      fab
      value="home" 
      style="background-color: #FFFFFF;overflow:hidden;z-index:10; position:fixed;left: 50%;transform: translate(-50%, 0);bottom:0px; box-shadow: 0 3px 20px 1px rgba(0,0,0,.2);"
      x-large
      color="blue"
      class="mb-2"
      @click="$router.push({name:'home'})"
    >
      <!-- <div class="home-btn"> -->
      <img
        :src="require('./assets/small_logo.png')"
        contain
        class="shrink"
        style="height:35px;transform: rotate(25deg);"
      />
    </v-btn>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex';

  const kakaoHeader = {
    'Authorization': '0dc9bea1c513adefb9eb0ff3cacde6ea', //Admin key
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const getKakaoToken = async (code) => {
    console.log('loginWithKakao');
    try {
        const data = {
            grant_type: 'authorization_code',
            client_id: 'b1e391b01ea6209470f58d4a56becb42', //RESTAPI Key
            redirect_uri: 'https://nunutest.shop',
            code: code,
        };

        const queryString = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
            .join('&');

        const result = await this.axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: kakaoHeader });
        console.log('카카오 토큰', result);
        
        getKakaoUserInfo(result.data.access_token)

        return result;

    } catch (e) {
      console.log(e)
        return e;
    }
  };

  //계정정보요청
  const getKakaoUserInfo = async (accessToken) => {
      let data = '';
      Kakao.Auth.setAccessToken(accessToken)
      await Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
              data = response;
          },
          fail: function (error) {
              console.log(error);
          },
      });
      console.log('카카오 계정 정보', data);
      return data; //
  }

  export default {
    name: 'App',

    components: {

    },

    data () {
      return {
        value: 1,
        active: true,
        userId: this.$store.state.userInfo
      }
    },

    created(){
      if(this.$route.query.code){
          console.log(this.$route.query.code)
          const data = getKakaoToken(this.$route.query.code)
          this.$store.dispatch("userGetAction", data)
        }
    }
  };
</script>

<style scoped>

</style>
