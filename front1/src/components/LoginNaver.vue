<template>
    <v-container>
        <v-card>
            로그인 중
        </v-card>
    </v-container>
</template>
    
<script>

const callbackNaver = async function(){
        console.log("네이버로그인중1",window.naverLogin)

        const naverLogin = new naver.LoginWithNaverId({
        clientId: '2jr941k4E1YtJ1JN3Cw7'
        })
        console.log("네이버로그인중2",window.naverLogin)

        naverLogin.init()

        console.log("네이버로그인중3",window.naverLogin)

        let data = '';
        await naverLogin.getLoginStatus(function(status) {
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
            } else {
                console.log('AccessToken이 올바르지 않습니다.') 
            }
        })
        
        return data
    }


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
        
    }
}
</script>