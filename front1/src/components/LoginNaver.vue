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
        const naverLogin = await new naver.LoginWithNaverId({
            clientId: '2jr941k4E1YtJ1JN3Cw7'
            })

        naverLogin.init()

        console.log("네이버로그인중2",window.naverLogin)

        function getUserInfo(){ 
            return new Promise(
                (resolve, reject) => { 
                    naverLogin.getLoginStatus(function(status) {
                        let self = this;
                        let info ={}
                        if (status) {
                            info = {
                            id: naverLogin.user.id,
                            age: naverLogin.user.age,
                            gender: naverLogin.user.gender,
                            nickname: naverLogin.user.nickname,
                            profile_image: naverLogin.user.profile_image,
                            email: naverLogin.user.email
                            }
                            console.log("네이버로그인중3",info)
                            resolve(info)
                        } else {
                            reject('AccessToken이 올바르지 않습니다.') 
                        }
                    })  
                })}

        getUserInfo().then((data)=>{
                        console.log("네이버로그인5",data)
                        const social = 'naver'
                        this.$store.dispatch("userGetAction", {data, social});
                        this.$router.push({name:'home'})
                    }).catch((err)=>{
                        console.log(err)
                    }
                )
    }
}
    // updated: async function () {
    //     console.log('updated called:', this.fireCallback);
    //     // const data = await this.callbackNaver()
    //     console.log("네이버로그인5", this.d)
    //     const social = 'naver'
    //     await this.$store.dispatch("userGetAction", {data:this.d, social});
    //     this.$router.push({name:'home'})
    //     this.fireCallback = false;
    // },

// }
</script>