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
        // 네이버 사용자 프로필 조회
	    const data = await callbackNaver()
        console.log("네이버로그인중",data)
        
        await this.$store.dispatch("userGetAction", {data, social});

        this.$router.push({name:'home'})
    },

    methods:{
        callbackNaver(){
            const naverLogin = new naver.LoginWithNaverId({
            clientId: '2jr941k4E1YtJ1JN3Cw7'
            })
            console.log("네이버로그인중",window.naverLogin)

            naverLogin.init()

            console.log("네이버로그인중 init 다음",window.naverLogin)

            naverLogin.getLoginStatus(function(status) {
            if (status) {
                const info = {
                id: naverLogin.user.id,
                age: naverLogin.user.age,
                gender: naverLogin.user.gender,
                nickname: naverLogin.user.nickname,
                profile_image: naverLogin.user.profile_image,
                }

                console.log(info)
                return info
            } else {
                console.log('AccessToken이 올바르지 않습니다.') 
            }
            })
        }
    }
}
</script>