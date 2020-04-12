import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const colors = ['#e6261f', '#e6521f', '#eb7532', '#eb9832', '#f7d038', '#a3e048', '#73e048', '#49da9a', 
'#49dac4', '#34bbe6', '#3491e6', '#4355db', '#7343db', '#d23be7']

const KakaoMap: NextPage<{validLocations: any[]}> = ({validLocations}) => {
  let a: any;
  const [map, setMap] = useState(a);
  const [polylines, setPolylines] = useState([]);
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
    // 선 초기화
    if (map && polylines.length !== 0) {
      for (let i = 0 ; i < polylines.length ; i ++)
      polylines[i].setMap(null);
    }

    // 맵 로드가 되었고 validLocations가 있으면 선 그리기
    if (map && validLocations && validLocations.length !== 0) {
      const lastLocation = validLocations[validLocations.length - 1];
      map.setCenter(new kakao.maps.LatLng(lastLocation.latitudeE7 / (10 ** 7), lastLocation.longitudeE7 / (10 ** 7)))

      let polylinesKeep = [];
      const firstDate = new Date(new Date(parseInt(validLocations[0].timestampMs)).yyyymmdd());
      let j = 0 ;
      for (let i = 0 ; i < 14 ; i ++) {
        if (j === validLocations.length) {
          break;
        }
        let linePath = [];

        // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다

        const today = new Date(firstDate.getTime() + i * 24 * 60 * 60 * 1000);

        for ( ; j < validLocations.length ; j ++) {
          if (parseInt(validLocations[j].timestampMs) >= (today.getTime() + 24 * 60 * 60 * 1000)) {
            break;
          }
          linePath.push(new kakao.maps.LatLng(validLocations[j].latitudeE7 / (10 ** 7), validLocations[j].longitudeE7 / (10 ** 7)))
        }

        // 지도에 표시할 선을 생성합니다
        const polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: colors[i], // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });
        // 지도에 선을 표시합니다 
        polyline.setMap(map); 
        polylinesKeep.push(polyline);
      }
      setPolylines(polylinesKeep);
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