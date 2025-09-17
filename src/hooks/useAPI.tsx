import React, { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/auth/AuthContext";
import AuthDispatchContext from "../contexts/auth/AuthDispatchContext";
import axios from "axios";
import useAuth from "./useAuth";
import useAlert from "./useAlert";
import { useNavigate } from "react-router-dom";
import { appConsole } from "../utils";

const useAPI = () => {
    const API_BASE_URL = process.env.REACT_APP_BACK_API_HOST;
    const {user, logout} = useAuth();
    const {alertError, alertWarn, alertSuccess} = useAlert();
    const navigate = useNavigate();
    
    const newAxios = axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        // 세션/쿠키 포함하여 호출
        withCredentials: true
    });

    newAxios.interceptors.response.use(
        (response) => {
        // 정상 응답 그대로 반환
        return response;
        },
        (error) => {
            if (error.response) {
                const {status, data} = error.response;
                
                // 예: 인증 오류
                // if (status === 401 || data.code === 'AU00') {
                //     logout();
                // }
            }
            // 반드시 에러를 다시 throw해야 이후 catch에서 처리 가능
            return Promise.reject(error);
        }
    );

    const obj = {
        get : (url:string, data?:{} )=> newAxios.get(url, {params: data, paramsSerializer: { indexes: null }}),
        post : (url:string, data?:{}, config?:{})=> newAxios.post(url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, ...config}),
        postWithJson : (url:string, data?:{}, config?:{})=> newAxios.post(url, data, { headers: {'Content-Type': 'application/json'}, ...config}),
        postWithMultiPart : (url:string, data?:{}, config?:{}) => {
            return newAxios.post(url, data, { headers: {'Content-Type': 'multipart/form-data'  // axios가 자동으로 설정해주지만 명시해도 무방
                                        }, ...config})
        },
        put : (url:string, data?:{}, config?:{})=> newAxios.put(url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, ...config}),
        putWithJson : (url:string, data?:{}, config?:{})=> newAxios.put(url, data, { headers: {'Content-Type': 'application/json'}, ...config}),
        delete : (url:string, data:{}, config?:{})=> newAxios.delete(url, {params: data, ...config}),
        isApiError : (error:any) => axios.isAxiosError(error)
    }

    return obj;
};


export default useAPI;