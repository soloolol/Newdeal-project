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
        return {
            fireCallback: false,
            d: {}
        }
    },

    // async mounted(){
    //     if (this.fireCallback) {
    //         // 네이버 사용자 프로필 조회
    //         const data =  await this.callbackNaver()
    //         console.log("네이버로그인5", data)
    //         const social = 'naver'
    //         await this.$store.dispatch("userGetAction", {data, social});
    //         this.$router.push({name:'home'})
    //     }
    // },

    mounted: async function () {
        await this.callbackNaver();   
    },

    updated: async function () {
        console.log('updated called:', this.fireCallback);
        // const data = await this.callbackNaver()
        console.log("네이버로그인5", this.d)
        const social = 'naver'
        await this.$store.dispatch("userGetAction", {data:this.d, social});
        this.$router.push({name:'home'})
        this.fireCallback = false;
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
            let self = this;
            console.log('this:',this)
            data = await naverLogin.getLoginStatus(function(status) {
                if (status) {
                    const info = {
                    id: naverLogin.user.id,
                    age: naverLogin.user.age,
                    gender: naverLogin.user.gender,
                    nickname: naverLogin.user.nickname,
                    profile_image: naverLogin.user.profile_image,
                    }
                    console.log("네이버로그인중3",info)
                    self.fireCallback = true;
                    self.d = info
                } else {
                    console.log('AccessToken이 올바르지 않습니다.') 
                }
            })  
            // console.log("네이버로그인중4", data)
            // return data
        }
    }
}
</script>