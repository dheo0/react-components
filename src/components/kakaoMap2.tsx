import React, { useRef } from "react";
import useKakaoMap from "./useKakaoMap";
declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;
interface KakaoMapProps {
  appKey: string;
}
const KakaoMap2 = ({ appKey }: KakaoMapProps) => {
  const mapContainer = useRef(null);

  useKakaoMap(appKey, () => {
    const container = mapContainer.current;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      "제주특별자치도 제주시 첨단로 242",
      function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          console.log(coords);
        }
      }
    );

    // 추가적인 맵 설정이나 마커 등을 여기서 설정
  });

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default KakaoMap2;
