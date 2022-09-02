<template>
  <v-container>
    <v-card
        class="mx-auto"
        max-width="344"
    >
        <v-img
        :src="boxedImg"
        height="500px"
        ></v-img>

        <v-card-title>
        어종 : {{spc}}
        </v-card-title>

        <v-card-title>
        길이 : {{cm}} Cm
        </v-card-title>

        <v-card-actions>
        <v-btn
            color="orange lighten-2"
            text
        >
            어종 정보
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            icon
            @click="show = !show"
        >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
        </v-card-actions>

        <v-expand-transition>
        <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
        </div>
        </v-expand-transition>
    </v-card>
  </v-container>
</template>
<script>
import { th } from 'vuetify/lib/locale';

  export default {
    name: 'Result',

    data() {
        return {
            show: false,
            userId: "",
            boxedImg: "",
            spc: "",
            cm: ""
        };
    },
    methods: { 
    },
    mounted(){
        console.log(this.$store.state.fishTmp.fishType)
        this.boxedImg = 'data:image/jpeg;base64,'+this.$store.state.fishTmp.imageData
        this.spc = this.$store.state.fishTmp.fishType
        this.cm = this.$store.state.fishTmp.fishLength
    }
    // created: async function() {
    //     //응답값 {data:{fishType:"",fishLength:"",imageData:""}}
    //     const imgdata = this.$store.state.fishTmp.imageData;
    //         // 이미지를 base64 str data 로 받았을때
    //     const img = 'data:image/jpeg;base64,' + imgdata;
    //         // raw binary data 로 이미지를 받았을 때
    //     // const blob = new Blob([data])
    //     // const Img = URL.createObjectURL(blob)
    //     const spc = this.$store.state.fishTmp.fishType;
    //     const cm = this.$store.state.fishTmp.fishLength;
    // }
  }
</script>
