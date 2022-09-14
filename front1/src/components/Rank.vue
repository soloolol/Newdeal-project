<template>
  <v-container>
    <v-card       
      light
      class="mx-auto pa-2"
      max-width="400"
    >
      <v-card-title>
        어종 별 랭킹보기
      </v-card-title>
      <!-- 셀렉트박스 -->
      <v-row align="center">
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
          <v-select
            :items="items"
            v-model="selected"
            label="select !"
            @change="getRankData()"
          ></v-select>
        </v-col>
      </v-row>
      <v-list v-for="list in rankList" :key="list.rank">{{list}}</v-list>
    </v-card>
    </v-container>
</template>
<script>

  export default {
    name: 'Rank',

    data(){
      return{
        items: ['참돔','돌돔','감성돔','조피볼락','넙치'],
        selected: "참돔",
        rankList: [],
      }
    },
    // 마운트 할때 default selected data = "참돔" 불러오기
    async mounted(){
      let sendData = {fishType : this.selected}

      // await this.axios.post('http://localhost:3000/rank/fish',sendData)
      await this.axios.post("https://nunukang.shop/rank/fish",sendData)
        .then(resp => {
          this.rankList=resp.data
        })
        .catch(err => {
          if(err) throw err
        })
    },

    methods:{
      async getRankData(){
        let sendData = {fishType : this.selected}

        // await this.axios.post('http://localhost:3000/rank/fish',sendData)
        await this.axios.post("https://nunukang.shop/rank/fish",sendData)
        .then(resp => {
          this.rankList = resp.data
        })
        .catch(err => {
          if(err) throw err
        })
      }
    },

  }
</script>
