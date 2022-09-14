<template>
  <v-container>
    <v-card
      light
      class="mx-auto pa-2"
      max-width="400"
    >
      <v-card-title>
        실시간 해양 날씨
      </v-card-title>
      <v-list-item two-line>
        <v-list-item-content>
          <v-select
            :items="locationFront"
            v-model="locationFrontSelect"
            @change="changeLocationFront"
          ></v-select>
          <v-list-item-title class="text-h5">
            <v-select
            :items="locationEnd[locationEndIndex]"
            v-model="locationEndSelect"
            @change="changeLocationEnd"
          ></v-select>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col
            class="text-h4"
            cols="6"
          >
            {{todayWeatherData.day}} {{todayWeatherData.weather}}
          </v-col>
          <v-col cols="6">
            <template>
              <div v-if="todayWeatherData.weather=='맑음'">
                <v-img
                src="@/assets/sunny.png"
                alt="Sunny image"
                width="92"
                ></v-img>
              </div>
              <div v-else-if="todayWeatherData.weather=='흐림'">
                <v-img
                src="@/assets/darkSky.png"
                alt="darkSky image"
                width="92"
                ></v-img>
              </div>
              <div v-else-if="todayWeatherData.weather=='구름많음'">
                <v-img
                src="@/assets/manyCloud.png"
                alt="manyCloud image"
                width="92"
                ></v-img>
              </div>
              <div v-else-if="todayWeatherData.weather=='비'">
                <v-img
                src="@/assets/rain.png"
                alt="rain image"
                width="92"
                ></v-img>
              </div>
              <div v-else>
                <v-img
                src="@/assets/logo.png"
                alt="darkSky image"
                width="92"
                ></v-img>
              </div>
            </template>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-subtitle>풍속</v-list-item-subtitle>
        <v-list-item-subtitle>{{todayWeatherData.windSpeed}}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-subtitle>풍향</v-list-item-subtitle>
        <v-list-item-subtitle>{{todayWeatherData.windDir}}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-subtitle>파고</v-list-item-subtitle>
        <v-list-item-subtitle>{{todayWeatherData.seaHeight}}</v-list-item-subtitle>
      </v-list-item>

      <v-list class="transparent">
        <v-list-item
          v-for="item in currnetLocationWeatherData"
          :key="item.index"
        >
          <v-list-item-title>{{ item.day }}</v-list-item-title>

          <v-list-item-title>{{ item.time }}</v-list-item-title>

          <v-list-item-title>
            <template>
              <div v-if="item.weather=='맑음'">
                <v-img
                src="@/assets/sunny.png"
                alt="Sunny image"
                width="30"
                ></v-img>
              </div>
              <div v-else-if="item.weather=='흐림'">
                <v-img
                src="@/assets/darkSky.png"
                alt="darkSky image"
                width="30"
                ></v-img>
              </div>
              <div v-else-if="item.weather=='구름많음'">
                <v-img
                src="@/assets/manyCloud.png"
                alt="manyCloud image"
                width="30"
                ></v-img>
              </div>
              <div v-else-if="item.weather=='비'">
                <v-img
                src="@/assets/rain.png"
                alt="rain image"
                width="30"
                ></v-img>
              </div>
              <div v-else>
                <v-img
                src="@/assets/logo.png"
                alt="darkSky image"
                width="30"
                ></v-img>
              </div>
            </template>

          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text>
          Full Report
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    name: 'Weather',
    data () {
      return {
        labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
        time: 0,
        forecast: [
          { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
          { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
          { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
        ],

        locationFront : ['서해북부', '서해중부', '서해남부', '남해서부', '남해동부', '제주도', '동해남부', '동해중부', '동해북부'],
        locationEnd : [['서해북부 앞바다', '서해북부 먼바다'],
                      ['서해중부 앞바다', '서해중부 안쪽먼바다', '서해중부 바깥먼바다', '인천, 경기 북부앞바다', '인천, 경기 남부앞바다', '충남 북부앞바다', '충남 남부 앞바다'],
                      ['서해남부 북쪽바깥먼바다', '서해남부 북쪽안쪽먼바다', '서해남부 앞바다', '서해남부 남쪽안쪽먼바다', '서해남부 남쪽바깥먼바다', '전북 북부앞바다', '전북 남부앞바다', '전남 북부서해앞바다', '전남 중부서해앞바다', '전남 남부서해앞바다'],
                      ['남해서부 서쪽먼바다', '남해서부 앞바다', '남해서부 동쪽먼바다', '전남 서부남해앞바다', '전남 동부남해앞바다'],
                      ['남해동부 앞바다', '남해동부 안쪽먼바다', '남해동부 바깥먼바다', '경남 서부남해앞바다', '경남 중부남해앞바다', '거제시 동부앞바다', '부산 앞바다'],
                      ['제주도 남서쪽안쪽먼바다', '제주도 앞바다', '제주도 남동쪽안쪽먼바다', '제주도 남쪽바깥먼바다', '제주도 북부앞바다', '제주도 동부앞바다', '제주도 서부앞바다', '제주도 남부앞바다'],
                      ['동해남부 앞바다', '동해남부 북쪽안쪽먼바다', '동해남부 북쪽바깥먼바다', '동해남부 남쪽안쪽먼바다', '동해남부 남쪽바깥먼바다', '경북 북부앞바다', '경북 남부앞바다', '울산 앞바다'],
                      ['동해 중부앞바다', '동해 중부안쪽먼바다', '동해 중부바깥먼바다', '강원 북부앞바다', '강원 중부앞바다', '강원 남부앞바다'],
                      ['동해북부 앞바다', '동해북부 먼바다']],
        locationFrontIndex : 0,
        locationEndIndex : 0,
        locationFrontSelect : "서해북부",
        locationEndSelect : "서해북부 앞바다",
        currnetLocationWeatherData : [],
        todayWeatherData : {"location" : "", "day" : "", "weather" : "", "time" : "", "windSpeed" : "", "windDir" : "", "seaHeight" : ""}

      }
    },

    async mounted(){
      let sendData = {location : this.locationEndSelect}

      await this.axios.post('http://localhost:3000/weather/dailyWeather',sendData)
      //await this.axios.post("https://nunukang.shop/weather/dailyWeather",sendData)
        .then(resp => {
          this.currnetLocationWeatherData = resp.data
        })
        .catch(err => {
          if(err) throw err
        })

      this.todayWeatherData = this.currnetLocationWeatherData[0]
    },

    methods:{
      changeLocationFront(){

        for(let i=0;i<this.locationFront.length;i++)
        {
          if(this.locationFrontSelect == this.locationFront[i])
          {
            this.locationEndIndex = i
            this.locationEndSelect = this.locationEnd[i][0]
            this.changeLocationEnd()
            return
          }
        }
      },

      async changeLocationEnd(){

        let sendData = {location : this.locationEndSelect}

        await this.axios.post('http://localhost:3000/weather/dailyWeather',sendData)
        //await this.axios.post("https://nunukang.shop/weather/dailyWeather",sendData)
          .then(resp => {
            this.currnetLocationWeatherData = resp.data
          })
          .catch(err => {
            if(err) throw err
          })

          for(let i=0;i<this.currnetLocationWeatherData.length;i++)
          {
            this.currnetLocationWeatherData.index = i
          }

          this.todayWeatherData = this.currnetLocationWeatherData[0]

      },


    }
  }
</script>
