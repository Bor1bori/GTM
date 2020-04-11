import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const KakaoMap: NextPage<{validLocations: any[]}> = ({validLocations}) => {
  let a: any;
  const [map, setMap] = useState(a);
  const [polyLine, setPolyLine] = useState(a);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=a75cdf24c3da3d495e53e16d7617b5b7&autoload=false&libraries=services,clusterer,drawing";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        console.log(kakao);
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 7 //지도의 레벨(확대, 축소 정도)
        };
  
        setMap(new window.kakao.maps.Map(container, options)); //지도 생성 및 객체 리턴
      })
    }
  }, [])

 
  useEffect(() => {
    if (map &&polyLine) {
      polyLine.setMap(null);
    }
    if (map && validLocations && validLocations.length !== 0) {

      const lastLocation = validLocations[validLocations.length - 1];
      map.setCenter(new kakao.maps.LatLng(lastLocation.latitudeE7 / (10 ** 7), lastLocation.longitudeE7 / (10 ** 7)))

      let linePath = [];
      // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
      for (let i = 0 ; i < validLocations.length ; i ++) {
        linePath.push(new kakao.maps.LatLng(validLocations[i].latitudeE7 / (10 ** 7), validLocations[i].longitudeE7 / (10 ** 7)))
      }

      // 지도에 표시할 선을 생성합니다
      var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: '#0489B1', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
      });

      // 지도에 선을 표시합니다 
      polyline.setMap(map); 
      setPolyLine(polyline);
    }
  }, [validLocations])

  return <Map id="map">
  </Map>
};

const Map = styled.div`
  width: 100%;
  height: 100%;
`

export default KakaoMap;