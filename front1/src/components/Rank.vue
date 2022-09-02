<template>
  <v-container>
        <v-card>
            <v-card-title>
                Title
            </v-card-title>
            <v-li v-for="list in rankList" :key="list.rank">{{list}}</v-li>
            <v-btn @click="getRankData">랭킹가져오기</v-btn> 
        </v-card>
    </v-container>
</template>
<script>

  export default {
    name: 'Rank',

    data(){
      return{
        rankList : []      
      }
    },

    mounted(){
      

    },

    methods:{
      async getRankData(){
        let data
        data = await this.axios.post("https://nunukang.shop/rank/fish")
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
