import { useEffect, useRef, useState } from "react";

interface GeoProps {
  latitude:number; 
  longitude:number;
}
const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<GeoProps | undefined>(undefined);

  useEffect(()=>{
    if ("geolocation" in navigator) {
      // 위치 정보를 지원하는 경우
      navigator.geolocation.getCurrentPosition(
          (position) => {
              // 위치 정보가 성공적으로 받아졌을 때
              setGeolocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
              console.log(`위치 정보 ${position.coords.latitude}, ${position.coords.longitude}`)
          },
          (error) => {
          // 위치 정보 가져오기를 실패했을 때
          console.error("위치 정보를 가져오는 데 실패했습니다:", error);
          }
      );
      } else {
          console.log("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }  
  }, [])
  

  return {geolocation, setGeolocation};
};

export default useGeolocation;