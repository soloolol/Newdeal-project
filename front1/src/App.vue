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
      color="white"
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

    <div refs="pop" id="pop" :style="popDisplay">
        <v-card class="guide_box" >
            <div class="guide">
                <span>누가 누가 강태공</span>
                <div class="bold" id="guide_title">즐거움으로 연결된<br>낚시인들의 길이배틀 그라운드,<br>누누강</div>
                <span>
                    <pre>
딥러닝 기술을 적용한 누누강의 카메라로
월척의 어종과 길이, 점수를 확인해보세요

다른 유저들보다 얼마나 더 긴 월척을 잡았는지
배틀에 참전하여 볼까요?

이 구역의 강태공은 나야 나!
                    </pre>
                </span>
                <img :src="require('./assets/fish(3).png')" style="width: 100px; margin-top: 50px;">
                <div class="bold" id="photo_guide">나의 월척 찍기</div>
                <span>
                    <pre>
내가 잡은 물고기와 담뱃갑을
한 프레임 안에 놓아주세요

카메라가 잘 인식할 수 있도록
가까이에서 찍는 센스!

                    </pre>
                </span>
                <img :src="require('./assets/camera.png')" style="width: 100px;margin: 20px;">
                <div id="sample_t" class="bold">예시 사진</div>
                <img class="fish_sample" :src="require('./assets/edited.jpg')" >
                <br> 
                <v-row class="mb-4">
                  <v-col cols="12" justify="center" class="mb-10">
                    <v-btn large rounded dark color="#6aafe6" refs="cookie_btn" type="button" @click="todayCloseWin">
                    <strong>오늘 하루 보지않기</strong>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" justify="center" class="mb-20">
                    <v-btn large rounded dark color="#6aafe6" type="button" @click="popClose">
                    <strong>배틀 참전</strong>
                    </v-btn>
                  </v-col>
                </v-row>
            </div>
        </v-card>
    </div>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'App',

    components: {

    },

    data () {
      return {
        value: 1,
        active: true,
        popDisplay:"display: flex;"
      }
    },

    created(){
      
    },
    mounted(){
      // this.getUserId()
      // console.log('app:',this.$store.state.userInfo, this.$store.state.snackbarCookie)
      // if(this.userId && this.$store.state.snackbarCookie == 0){
      //     this.snackbar = true
      //     this.snackbarCookie()
      //   }
    },
    methods: {
      ...mapActions(['snackbarCookie','snackbarCookie']),

      getUserId(){
        if(this.$store.state.userInfo){
          this.userId = this.$store.state.userInfo.nickname
        }
      },
      popClose(){
        this.popDisplay= "display: none;";
      },
      todayCloseWin(){
        
      }
    },
  };
</script>

<style scoped>
  #pop{
      position: fixed;
      flex-direction: column;
      text-align: center;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 1000;
      background: rgba(0,0,0,0.2);
  }
  .guide_box{
      padding: 80px 10px;
      margin: auto;
      width: 720px;
      height: 80vh;
      border: none;
      border-radius: 20px;
      text-align: center;
      align-items: center;
      line-height: 20px;
      font-family: plain,"Helvetica Neue",Helvetica,Arial,sans-serif;
      font-weight: bold;
      color: grey;
      word-spacing: -3px;
      background-color: #fff;
      overflow: auto;
      display: flex;
      flex-direction: column;
      text-align: center;
  }
  .guide{
      margin: auto;
      width: 90%;
  }
  .guide div{
      margin: 15px 0px;
      font-size: x-large;
      line-height: 30px;
      color:#000;
  }
  .guide span{
      margin: 40px 0px;
      font-weight:600;
  }
  #sample_t{
      margin: 15px 0px;
      font-size: medium;
  }
  #photo_guide{
      font-size: xx-large;
  }
  .fish_sample{
      width: 320px;
      margin:auto;
      
  }

  /*버튼*/

  .w-btn-blue{
    position: relative;
    border: none;
    display: inline-block;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
  }

  .w-btn-blue{
    background-color: #6aafe6;
    color: #fff;
  }
  .w-btn-blue:hover{
    letter-spacing: 2px;
    transform: scale(1.2);
    cursor: pointer;
  }

  .w-btn-blue:active{
    transform: scale(1.5);
  }
  #repic{
    margin:5px 10px 20px 5px;
  }

  @media screen and (max-width: 650px){
    .guide_box{
        width: 95%;
        height: 95%;
    }
  }

</style>
