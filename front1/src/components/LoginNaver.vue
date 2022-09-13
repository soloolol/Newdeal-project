<template>
    <v-container>
        <v-card>
            로그인 중
        </v-card>
    </v-container>
</template>
    
<script>
export default {
    name: "LoginNaver",

    data(){
        return{

        }
    },

    async created(){
        const client_id = "2jr941k4E1YtJ1JN3Cw7"
        const callbackURL = "https://nunutest.shop/login/naver"
        
        await new window.naver_id_login( client_id, callbackURL );
        
        const accessToken = await naver_id_login.getAccessToken();
        console.log("네이버로그인중",accessToken)

        // 네이버 사용자 프로필 조회
	    const data = await window.naver_id_login.get_naver_userprofile();
        console.log("네이버로그인중",data)
        
        await this.$store.dispatch("userGetAction", {data, social});

        this.$router.push({name:'home'})
    },

    methods:{
        naverSignInCallback() {
		// naver_id_login.getProfileData('프로파일항목명');
		alert(naver_id_login.getProfileData('email'));
		alert(naver_id_login.getProfileData('nickname'));
		alert(naver_id_login.getProfileData('age'));
	    },
    }
}
</script>