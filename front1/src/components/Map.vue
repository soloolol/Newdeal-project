<template>
  <div>
    <v-container>
        <v-card>
            <v-card-title>
                Title
            </v-card-title>
        </v-card>
    </v-container>
    <div id="map" style="width:500px;height:400px;"></div>
    <div class="button">
      <button @click="setMarker()">setMarker</button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'Map',

    data: () => ({

    }),

    mounted(){
      if(window.kakao && window.kakao.maps){
        this.initMap()
      }
      else{
        const script = document.createElement("script")

        script.onload = () => kakao.maps.load(this.initMap)
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9bb492ef1658739507932e6a0821d59b"

        document.head.appendChild(script)
      }

    },

    methods:{
      initMap(){
        const container = document.getElementById("map")
        const options = {
          center : new kakao.maps.LatLng(33.450701, 126.570667),
          level : 13,
        }

        this.map = new kakao.maps.Map(container, options)
      },

      async setMarker(){
        let markerPositions = [
          [33.452278, 126.567803],
          [33.452671, 126.574792],
          [33.451744, 126.572441],
        ]

        let centerData = this.map.getCenter()
        let getData

        await axios.post('http://localhost:3000/map/center', centerData)
        .then(function(response){
          getData = response.data
        })
        .catch(function(error){
          if(error) throw error
        })
        console.log(getData)


        let imageData

        await axios.get('http://localhost:3000/map/fish')
        .then(function(response){
          imageData = response.data

        })
        .catch(function(error){
          if(error) throw error
        })

        let imageSrc = 'data:image/jpg;base64,' + imageData
        let imageSize = new kakao.maps.Size(30,30)
        let imageOption = {offset : new kakao.maps.Point(10,20)}

        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)



        const positions = markerPositions.map(
          (position) => new kakao.maps.LatLng(...position)
        )

        if(positions.length > 0){
          this.markers = positions.map(
            (position) => new kakao.maps.Marker({
              map : this.map,
              position,
              image : markerImage
            })
          )
        }
      }
    }
  }
</script>
