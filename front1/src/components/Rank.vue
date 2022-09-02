<template>
  <div>
    <v-container>
        <v-card>
            <v-card-title>
                Title
            </v-card-title>
        </v-card>
    </v-container>
    <li v-for="list in rankList" v-bind:key="list.rank">{{list}}</li>
    <button @click="getRankData()">랭킹가져오기</button>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'Rank',

    data: () => ({
      rankList : []
    }),

    mounted(){
      

    },

    methods:{
      async getRankData(){

        let data
        data = await axios.post("http://localhost:3000/rank/fish")
        .then(function(response){
          return response.data
        })
        .catch(function(error){
          if(error) throw error
        })
        this.rankList = data
      }
    }
  }
</script>
