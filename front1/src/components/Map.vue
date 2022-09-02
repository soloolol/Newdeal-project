<template>
    <v-container>
        <v-card>
            <v-card-title>
                낚시 포인트 갤러리
            </v-card-title>
            <div id="map" @click="mapClick" style="width:100%;height:600px;"></div>
            <div class="button">
              <v-btn @click="setMarker">이 위치에서 잡은 물고기 보기</v-btn>
            </div>
        </v-card>
    </v-container>

</template>
<script>

  export default {
    name: 'Map',

    data() {
      return{
      centerMarker : null,
      map : null,
      markers : [],
      customOverlay : [],
    }},

    mounted(){
      //mounted시 카카오 지도 초기화
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
        //맵 초기화
        const container = document.getElementById("map")
        const options = {
          center : new kakao.maps.LatLng(33.450701, 126.570667),
          level : 8,
        }

        this.map = new kakao.maps.Map(container, options)
        
        //중앙을 표시하는 마커 생성(데이터 불러올 공간의 중심점)
        this.centerMarker = new kakao.maps.Marker({
          position : this.map.getCenter()
        })

        this.centerMarker.setMap(this.map)
      },

      async setMarker(){
        //임시 마커 데이터
        let markerPositions = [
          [33.452278, 126.567803],
          [33.452671, 126.574792],
          [33.451744, 126.572441],
        ]

        //맵 중심데이터 가져오기, express로 전송
        let centerData = this.map.getCenter()
        let getData

        //서버로부터 데이터 가져오기
        await this.axios.post('https://nunukang.shop/map/center', centerData)
        .then(function(response){
          getData = response.data
        })
        .catch(function(error){
          if(error) throw error
        })
        console.log(getData)

        //마커를 담을 공간 + 기존 마커 초기화(메모리 확인필요)
        this.markers = []

        //카카오 지도 마커 공통 이미지 설정
        let imageSize = new kakao.maps.Size(30,30)
        let imageOption = {offset : new kakao.maps.Point(10,20)}

        for(let i=0;i<getData.length;i++)
        {
          //카카오 지도 마커 개별 마커 이미지 설정
          let imageSrc = 'data:image/jpg;base64,' + getData[i].image
          console.log(imageSrc)
          let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

          //카카오 지도 개별 마커 위치 설정
          let position = new kakao.maps.LatLng(...markerPositions[i])

          console.log(position)
          //카카오 지도 마커 표시
          this.markers.push(new kakao.maps.Marker({
            map : this.map,
            position : position,
            image : markerImage
          }))
         
          //인포윈도우 방식
          let infoWindowContent = '<div>' + getData[i].fishType + ' ' +getData[i].fishLength +'</div>'
          let infoWindowPosition = new kakao.maps.LatLng(position)

          let infoWindow = new kakao.maps.InfoWindow({
            position : infoWindowPosition,
            content : infoWindowContent
          })

          infoWindow.open(this.map, this.markers[i])

          // //오버레이 방식
          // let content = document.createElement('div')
          // content.innerHTML = getData[i].fishType + ' ' + getData[i].fishLength
          // content.className = 'overlay'

          // //오버레이 이벤트 등록, 클릭으로만 작동하도록 구성
          // kakao.maps.event.addListener(this.markers[i], 'click', ()=>{
          //   if(this.customOverlay[i] == undefined) {
              

          //     let data = new kakao.maps.CustomOverlay({
          //       map : this.map,
          //       content : content,
          //       position : position
          //     })

          //     let overlayData = {data : data, render : true}

          //     this.customOverlay[i] = overlayData

          //     this.customOverlay[i].data.setMap(this.map)
          //   }
          //   else if(this.customOverlay[i].render == true){
          //     this.customOverlay[i].render = false

          //     this.customOverlay[i].data.setMap(null)
          //   }
          //   else{
          //     this.customOverlay[i].render = true

          //     this.customOverlay[i].data.setMap(this.map)
          //   }
            
          // })
          
          
        }

      },

      mapClick(){
        
        //맵 클릭시 마커를 중앙으로 이동
        console.log('map click')
        let latlng = this.map.getCenter()
        this.centerMarker.setPosition(latlng)
      },


    }
  }
</script>
