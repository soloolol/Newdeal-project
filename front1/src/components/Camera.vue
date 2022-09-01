
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
                <img src="//:0" alt="" id="camera--output">
            </div>
            <vue-picture-swipe :items="items"></vue-picture-swipe>
        </div>
    </v-container>
</template>
 
<script>
    import VuePictureSwipe from 'vue-picture-swipe';
    import { mapActions } from 'vuex';
 
    export default {
        name: "Camera",
        components: {
            VuePictureSwipe
        },
        data: ()=> ({
            isCameraOpen: false,
            videoHeight:640,
            videoWidth:320,
            items: [], 
        }),
        methods: {
            ...mapActions(['fishTmpAction']),

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
            uploadPhoto(dataURL){
                let uniquePictureName = this.generateCapturePhotoName();
                let capturedPhotoFile = this.dataURLtoFile(dataURL, uniquePictureName+'.jpeg')
                let formData = new FormData()
                formData.append('fish', capturedPhotoFile)
                //Upload image api
                this.axios.post('http://localhost:3000', formData).then(resp => {
                  console.log("img > node 결과", resp)
                  fishTmpAction(resp.fish)
                  this.$router.push({name:'result'})
                }).catch(error => {
                    console.log(error) 
                    alert("데이터 전송 실패")})
            },
 
            generateCapturePhotoName(){
                return  Math.random().toString(36).substring(2, 15)
            },
 
            dataURLtoFile(dataURL, filename) {
                let arr = dataURL.split(','),
                    mime = arr[0].match(/:(.*?);/)[1], //jpeg
                    bstr = arr[1].toString('base64'), // base64 > 디코딩
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
 
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                let blob = new Blob([u8arr],{type: mime})
                return new File([blob], filename );
            },
        }
    }

</script>
 
<style scoped>
    video, canvas {
        position: absolute;
    }
 
</style>