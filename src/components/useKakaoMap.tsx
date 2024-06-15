// src/hooks/useKakaoMap.js
import { useEffect } from "react";
declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;
const useKakaoMap = (appKey: string, onLoad: () => void) => {
  useEffect(() => {
    const existingScript = document.getElementById("kakao-map-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
      script.onload = () => {
        kakao.maps.load(onLoad);
      };
      document.head.appendChild(script);
    } else {
      if (window.kakao && window.kakao.maps) {
        kakao.maps.load(onLoad);
      } else {
        existingScript.onload = () => {
          kakao.maps.load(onLoad);
        };
      }
    }
  }, [appKey, onLoad]);
};

export default useKakaoMap;
