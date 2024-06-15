import { useEffect, useRef } from "react";
declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;

const KakaoMap = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
    };
    const map = new kakao.maps.Map(container, options);
    var geocoder = new kakao.maps.services.Geocoder();
    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 });
    kakao.maps.event.addListener(map, "click", function (mouseEvent: any) {
      searchDetailAddrFromCoords(
        mouseEvent.latLng,
        function (result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address
              ? "<div>도로명주소 : " +
                result[0].road_address.address_name +
                "</div>"
              : "";
            detailAddr +=
              "<div>지번 주소 : " + result[0].address.address_name + "</div>";

            var content =
              '<div class="bAddr">' +
              '<span class="title">법정동 주소정보</span>' +
              detailAddr +
              "</div>";

            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
          }
        }
      );
    });

    geocoder.addressSearch(
      "제주특별자치도 제주시 첨단로 242",
      function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          console.log(coords);
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      }
    );

    function searchDetailAddrFromCoords(coords: any, callback: any) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
  }, []);
  return <div ref={mapRef} style={{ width: "100%", height: "600px" }}></div>;
};

export default KakaoMap;
