<template>
  <v-container>
    <!-- <v-card       
      light
      class="mx-auto pa-2"
      max-width="400"
    > -->
      <v-row class="mt-10">
        <v-col class="mx-auto" cols="11" sm="6">
          <v-text-field
            class="mx-auto"
            solo
            rounded
            label="어종 정보"
            append-icon="mdi-magnify"
            @keyup.prevent="search"
            v-model="query"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-card v-if="data">
        <v-text-card v-for="(value, index) in data" 
          :key="index"
          :ref="`card_${index}`"
          class="card"
        >
        {{value._source}}
        </v-text-card>
      </v-card>

  </v-container>
</template>
<script>
  export default {
    name: 'Search',

    data() {
      return{
        query:'',
        data:[]
      }
    },
    methods: {
      search() {
        this.axios.get("https://nunukang.shop/search?q=" + this.query)
              .then(resp => {
                console.log(resp.data);
                this.data = resp.data;
          })
      }
    }
  }
</script>
