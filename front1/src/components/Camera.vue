
<template>
    <v-container>
        <div class="camera-box" style="display: flex; flex-direction: column; justify-content: center;">
            <div style="display: flex; justify-content: center;">
                <img style="height: 25px;" v-if="isCameraOpen"
                    src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                    class="button-img camera-shoot" @click="capture"/>
                <div class="camera-button">
                    <button type="button" class="button is-rounded cam-button"
                            style="background-color: white; border: 0px;"
                            @click="toggleCamera"
                    >
                        <span v-if="!isCameraOpen"><img style="height: 25px;" class="button-img"
                                            src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"></span>
                        <span v-else><img style="height: 25px;" class="button-img"
                                        src="https://img.icons8.com/material-outlined/50/000000/cancel.png"></span>
                    </button>
                </div>
            </div>
            <div v-if="isCameraOpen" class="camera-canvas" style="width:videoWidth; height:videoHeight; overflow: hidden;">
                <canvas v-show="false" id="photoTaken" ref="canvas" :width="videoWidth" :height="videoHeight"></canvas>
                <video ref="camera" :width="videoWidth" :height="videoHeight" style="width:videoWidth; height:videoHeight;" autoplay playsinline></video>
            </div>

            <img v-if="check == true" v-bind:src="'data:image/jpg;base64,'+items" >
            <div> {{fishName}}</div>
            <div> {{fishLength}}</div>
        </div>
    </v-container>
</template>
 
<script>
    //<vue-picture-swipe :items="items"></vue-picture-swipe>
    import VuePictureSwipe from 'vue-picture-swipe';
    import axios from 'axios'
    import { Buffer } from 'buffer';
    //import fs from 'fs'
 
    export default {
        name: "Camera",
        components: {
            VuePictureSwipe
        },
        props:['img'],
        data: ()=> ({
            isCameraOpen: false,
            videoHeight:640,
            videoWidth:320,
            //items: [], 
            items : '',
            fishName : '',
            fishLength : '',
            check : true
        }),
        // mounted(){
        //     this.items = fs.readFileSync("./image.jpg", "base64")
        // },
        methods: {
            toggleCamera() {
                if (this.isCameraOpen) {
                    this.isCameraOpen = false;
                    this.stopCameraStream();
                } else {
                    this.isCameraOpen = true;
                    this.startCameraStream();
                }
            },
            startCameraStream() {
                const constraints = (window.constraints = {
                    audio: false,
                    video: true,
                });
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(stream => {
                        this.$refs.camera.srcObject = stream;
                    }).catch(error => {
                    alert("Browser doesn't support or there is some errors." + error);
                });
            },
 
            stopCameraStream() {
                let tracks = this.$refs.camera.srcObject.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
            },
 
            capture() {
                const FLASH_TIMEOUT = 50;
                let self = this;
                setTimeout(() => {
                    const context = self.$refs.canvas.getContext('2d');
                    context.drawImage(self.$refs.camera, 0, 0, self.videoWidth, self.videoHeight);
                    const dataUrl = self.$refs.canvas.toDataURL("image/jpeg")
                        .replace("image/jpeg", "image/octet-stream");
                    //self.addToPhotoGallery(dataUrl);
                    self.uploadPhoto(dataUrl);
                    self.isCameraOpen = false;
                    self.stopCameraStream();
                }, FLASH_TIMEOUT);
            },
 
            addToPhotoGallery(dataURI) {
                this.items.push(
                    {
                        src: dataURI,
                        thumbnail: dataURI,
                        w: this.videoWidth,
                        h: this.videoHeight,
                        alt: 'some numbers on a grey background' // optional alt attribute for thumbnail image
                    }
                )
            },

            async uploadPhoto(dataURL){
                let uniquePictureName = this.generateCapturePhotoName();
                let capturedPhotoFile = this.dataURLtoFile(dataURL, uniquePictureName+'.jpg')
                let formData = new FormData()

                //촬영한 물고기 이미지 파일
                formData.append('fish', capturedPhotoFile)


                //잡은 물고기 location(위도, 경도)
                formData.append('latitude', 35.054700)
                formData.append('longitude', 126.457823)

                let data
                data = await axios.post('http://localhost:3000/matchFish/caculateData', formData, {
                    headers:{
                        'Content-Type' : 'multipart/form-data',
                    },
                })
                .then(function(response){
                
                    return response.data
                })
                .catch(function(error){
                    console.log(error)
                })

                //판별한 물고기 정보
                this.fishName = data.fishType
                this.fishLength = data.fishLength

                //base64로 인코딩된 이미지데이터
                this.items = data.imageData

                this.check = true

            },
 
            generateCapturePhotoName(){
                return  Math.random().toString(36).substring(2, 15)
            },
 
            dataURLtoFile(dataURL, filename) {
                let arr = dataURL.split(','),
                    mime = arr[0].match(/:(.*?);/)[1], //jpg
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
 
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type: mime});
            },
        }
    }

</script>
 
<style scoped>
    video, canvas {
        position: absolute;
    }
 
</style>