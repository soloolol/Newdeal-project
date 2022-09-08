<template>
    <v-container>
        <v-card>
            로그인 중
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios'

const Admin_key = '0dc9bea1c513adefb9eb0ff3cacde6ea'
const kakaoHeader = {
    // 'Authorization' : `KakaoAK ${Admin_key}`, //Admin key
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const getKakaoToken = async (code) => {
    console.log('loginWithKakao');
    try {
        const data = {
            grant_type: 'authorization_code',
            client_id: 'b1e391b01ea6209470f58d4a56becb42', //RESTAPI Key
            redirect_uri: 'https://nunutest.shop/redirect',
            code: code,
        };

        const queryString = Object.keys(data)
            .map(k => k + '=' + data[k])
            .join('&');
        console.log(queryString)
        const result = await axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: kakaoHeader });
        console.log('카카오 토큰', result);
        
        getKakaoUserInfo(result.data.access_token)

        return result;

    } catch (e) {
      console.log(e)
        // this.$router.push({name:'redirect'});
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
    name: 'Redirect',

    components: {

    },

    data () {
      return {
      }
    },

    created(){
      if(this.$route.query.code){
          console.log('크리에이티드 훅 시작, 인가코드 :',this.$route.query.code)
          const data = getKakaoToken(this.$route.query.code)
          console.log('크리에이티드 훅 토큰 데이터 받아옴 :',data)
          this.$store.dispatch("userGetAction", data)
          console.log('크리에이티드 훅 끝 actions')
        }
    }
  };
</script>