import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";
import ModalDispatchContext from "../contexts/modal/ModalDispatchContext";
import axios from "axios";
import { toast } from "react-toastify";
import {appConsole } from "../utils";
import useAlert from "./useAlert";

interface AddrProps {
  y_coor:string;
  full_addr:string;
  x_coor:string;
  addr_name:string;
  cd:string;
}

/**
 * 모달 훅
 * @returns 
 */
const useAddr = (code?:string)  => {
    const tokenRef = useRef('');
    const [addrs, setAddrs] = useState<AddrProps[]| undefined>();
    const [cd, setAddrCd] = useState(code);
    const {alertError} = useAlert();

    const getToken = async () => {
        const resp = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=38ba54d7b1bd46b0ab17&consumer_secret=4d219fccb196440a901f');
        return resp.data.result.accessToken;
    }

    const getAddr = async (token:string) => {
        const params = cd ? {accessToken: token, cd} : {accessToken: token}
        const resp = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json', {params});
        return resp;
    }

    // 주소 목록 조회
    useEffect(()=>{
        (async()=>{
            reqFor :  for(let i = 0; i < 3; i++){
                try{
                    let resp = await getAddr(tokenRef.current);

                    if(resp.data.errCd === 0){
                        appConsole(resp.data.result);
                        setAddrs(resp.data.result);
                    } else if(resp.data.errCd === -401) {
                        tokenRef.current = await getToken();
                        resp = await getAddr(tokenRef.current);
                        setAddrs(resp.data.result);
                    } else {
                        alertError({message: resp.data.errMsg});
                        break;
                    }
                    // 정상 처리되었으면 빠져나오기
                    break;
                } catch (error){
                    if((error as any).status === 422){
                         tokenRef.current = await getToken();
                        continue reqFor;
                    } else {
                        alertError({error});
                        break;
                    }
                }
            }
        })();
    }, [cd])

    return {addrs, setAddrCd}
}

export default useAddr