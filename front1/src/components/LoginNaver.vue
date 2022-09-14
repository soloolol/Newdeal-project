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

    async mounted(){
        // 네이버 사용자 프로필 조회
	    await this.callbackNaver()

        this.$router.push({name:'home'})
    },

    methods:{
        async callbackNaver(){
            console.log("네이버로그인중1",window.naverLogin)

            const naverLogin = new naver.LoginWithNaverId({
            clientId: '2jr941k4E1YtJ1JN3Cw7'
            })
            naverLogin.init()

            console.log("네이버로그인중2",window.naverLogin)

            let data = '';
            await naverLogin.getLoginStatus( async function(status) {
                if (status) {
                    const info = {
                    id: naverLogin.user.id,
                    age: naverLogin.user.age,
                    gender: naverLogin.user.gender,
                    nickname: naverLogin.user.nickname,
                    profile_image: naverLogin.user.profile_image,
                    }
                    data = info
                    console.log(data)
                    const social = 'naver'
                    await this.$store.dispatch("userGetAction", {data, social});
                } else {
                    console.log('AccessToken이 올바르지 않습니다.') 
                }
            })
        }
    }
}
</script>