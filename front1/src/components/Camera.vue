
<template>
    <v-container>
        <v-card       
        light
        class="mx-auto pa-2"
        max-width="400"
        >
            <!-- <v-card-title>{{ this.$store.state.userInfo }}</v-card-title> -->

            <div id="camera">
                <!-- <button id="flip-button">카메라전환</button> -->
                <img src="//:0" alt="" ref="output" id="camera--output">

                <canvas id="camera--sensor" ref="canvas"></canvas>

                <video id="camera--view" ref="camera" autoplay playsinline></video>

            </div>

        </v-card>
        <v-btn 
            outlined
            fab
            style="background-color: #FFFFFF;overflow:hidden;z-index:100; position:fixed;left: 50%;transform: translate(-50%, 0);bottom:0px; box-shadow: 0 3px 20px 1px rgba(0,0,0,.2);"
            x-large
            color="blue"
            class="mb-2"
            @click="capture"
        >
            <!-- <div class="home-btn"> -->
            <img
                :src="require('../assets/small_logo.png')"
                contain
                class="shrink"
                style="height:35px;transform: rotate(25deg);"
            />
        </v-btn>
        <!-- <v-snackbar
        :value="snackbar"
        :timeout="timeout"
        >
        환영합니다 ! {{ this.$store.state.userId }} 님
        </v-snackbar> -->
    </v-container>
</template>
 
<script>

    import { mapActions } from 'vuex';
 
    export default {
        name: "Camera",
        components: {

        },
        data() {
            return {
                isCameraOpen: false,
                timeout: 1200,
                items: [], 
                // snackbar: false,
            }
        },
        created(){

        },
        mounted(){
            this.cameraStart()
        },
        methods: {
            ...mapActions(['fishTmpAction','snackbarCookie']),

            cameraStart(){
                const front = false;
                const constraints = { video: { width: 640, height: 0, facingMode: (front? "user" : "environment") } };
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(stream => {
                        this.$refs.camera.srcObject = stream;
                    })
                    .catch(error => {
                        console.error("카메라에 문제가 있습니다.", error);
                    })
            },
 
            stopCameraStream() {
                let tracks = this.$refs.camera.srcObject.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
            },
 
            capture() {
                const FLASH_TIMEOUT = 100;
                let self = this;
                setTimeout(() => {
                    self.$refs.canvas.width = self.$refs.camera.videoWidth
                    self.$refs.canvas.height = self.$refs.camera.videoHeight
                    console.log(self.$refs.canvas.width,self.$refs.camera.videoWidth)
  
                    const context = self.$refs.canvas.getContext('2d');
                    
                    context.drawImage(self.$refs.camera, 0, 0);
                    const dataUrl = self.$refs.canvas.toDataURL("image/png")
                        //.replace("image/jpg", "image/octet-stream");
                    //self.addToPhotoGallery(dataUrl);
                    self.uploadPhoto(dataUrl);
                    self.stopCameraStream();
                    self.$refs.output.src = dataUrl
                }, FLASH_TIMEOUT);
            },
            async uploadPhoto(dataURL){
                let uniquePictureName = this.generateCapturePhotoName();
                let capturedPhotoFile = this.dataURLtoFile(dataURL, uniquePictureName+'.png')
                let formData = new FormData()

                //촬영한 물고기 이미지 파일
                console.log('이미지', capturedPhotoFile)
                formData.append('fish', capturedPhotoFile)

                //잡은 물고기 location(위도, 경도)
                formData.append('latitude', 35.054700)
                formData.append('longitude', 126.457823)

                //Upload image api
                    //await this.axios.post('http://localhost:3000/matchFish/caculateData', formData,{
                    await this.axios.post('https://nunukang.shop/matchFish/caculateData', formData, {
                        headers:{
                            'Content-Type' : 'multipart/form-data',
                        }
                    }).then(resp => {
                        console.log('성공적 키:', Object.keys(resp.data))
                        //console.log("성공적", resp)
                        //data를 store.state.fishTmp에 저장
                        this.fishTmpAction(resp.data)
                        //응답값 {data:{fishType:"",fishLength:"",imageData:""}}
                        //페이지전환
                        this.$router.push({name:'result'})
                    }).catch(error => {
                        console.log(error) 
                        //alert("")
                    })

            },
 
            generateCapturePhotoName(){
                return  Math.random().toString(36).substring(2, 15)
            },
 
            dataURLtoFile(dataURL, filename) {
                let arr = dataURL.split(','),
                    mime = arr[0].match(/:(.*?);/)[1], //png
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
 
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                let blob = new Blob([u8arr],{type: mime})
                return new File([blob], filename);
            },
        }
    }

</script>
 
<style scoped>
    #camera{
        position: relative;
        width: 340px;
        height: 80vh;
        margin: auto;
        overflow: hidden;
    }
    #camera--view, #camera--sensor, #camera--output{
        position: absolute;
        width: 340px;
        height: 80vh;
        margin: auto;
        object-fit: cover;
    }

    #camera--view, #camera--sensor, #camera--output{
        /*transform: scaleX(-1);*/
        filter: FlipH;
    }
 
</style>