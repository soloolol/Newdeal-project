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
      <v-row >
        <v-col
          class="d-flex mx-auto"
          cols="11"
        >
          <v-select
            color="#398DFF"
            :items="items"
            v-model="selected"
            @change="getRankData()"
            dense
            outlined
            rounded
          ></v-select>
        </v-col>
      </v-row>
      
      <div class="pa-3">
        <v-list style="text-align:center;">
          <v-row style="font-weight:500;">
            <v-col style="display:flex; align-items:center; justify-content: center;" cols="2" >순위</v-col>
            <v-col style="display:flex; align-items:center; justify-content: center;" cols="2"></v-col>
            <v-col style="display:flex; align-items:center; justify-content: center;" cols="3">ID</v-col>
            <v-col style="display:flex; align-items:center; justify-content: center;" cols="3">길이</v-col>
            <v-col style="display:flex; align-items:center; justify-content: center;" cols="2">등급</v-col>
          </v-row>
          <v-divider color="#398DFF"></v-divider>
        </v-list>
        <v-list v-for="list in rankList" :key="list.rank" style="text-align:center;">
          <v-row>
            <v-col style="display:flex; align-items:center; justify-content: center;" cols="2">{{list.rank}}</v-col>
            <v-col style="display:flex; align-items:center; justify-content: center;" cols="2">
              <v-avatar color="red" v-if="list.thumbnail===null">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
              <v-avatar dark color="orange" v-else>
                <img
                  :src="list.thumbnail"
                >
              </v-avatar>
            </v-col>
            <v-col style="display:flex; align-items:center; justify-content: center;" cols="3">{{list.id}}</v-col>
            <v-col style="display:flex; align-items:center; justify-content: center;" cols="3">{{list.length}}cm</v-col>
            <v-col style="display:flex; align-items:center; justify-content: center;" cols="2">{{list.grade}}</v-col>
          </v-row>  
        </v-list>
      </div>
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

      //await this.axios.post('http://localhost:3000/rank/fish',sendData)
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

        //await this.axios.post('http://localhost:3000/rank/fish',sendData)
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
