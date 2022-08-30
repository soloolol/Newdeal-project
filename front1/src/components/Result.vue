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
  export default {
    name: 'Result',

    data: () => ({
        show: false,
        userId: "",
        boxedImg: "",
        spc: "",
        cm: "",
    }),
    methods: {
    async getImage() {
      return await 'https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg';
    }   
    },
    // raw binary data 로 이미지를 받았을 때
    created: async function() {
        const data = this.$store.state.fishTmp.resultImg;
        const blob = new Blob([data])
        this.data.boxedImg = URL.createObjectURL(blob)
        this.data.spc = this.$store.state.fishTmp.spc;
        this.data.cm = this.$store.state.fishTmp.cm;
    }
  }
</script>
