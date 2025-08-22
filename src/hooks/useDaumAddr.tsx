import { useEffect, useState } from "react";
import { set } from "react-hook-form";


/**
 * 다음 주소 API 함수
 * @returns 
 */
const useDaumAddr = () => {
    const getDaum = ()=> (window as any).daum;
    useEffect(()=>{
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.head.appendChild(script);
        // 해제
       return  () => {document.head.removeChild(script)};
    }, [])

    return getDaum
}

export default useDaumAddr