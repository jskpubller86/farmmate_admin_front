import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from './useAuth';
import useModal from "./useModal";
import { appConsole } from "../utils";

type MessageProps = Record<string, string> | string;
type CloseProps = (code?: string) => void;

interface AlertProps {
    error?:any;
    message?: MessageProps;
    onClose?: CloseProps;
}

interface AlertSuccessProps {
    message?: string;
    onClose?: () => void 
}




// Context를 쉽게 꺼내 쓰는 Hook
const useAlert = () => {
    const toastId = useRef<number | string>(null);
    const {openModal, closeModal} = useModal();
    const navi = useNavigate();
    const {user, logout} = useAuth();

    /* 오류 알림 */  
    const alertError = (props?: AlertProps)=>{
        const {error, message, onClose} = props ?? {};
        const {mssg, handleClose, code} = alertProcess(error, message, onClose);
        appConsole(handleClose);
        removeToast();
        toastId.current = toast.error(mssg, {toastId: genToastId(), onClose: ()=>{handleClose && handleClose(code)}});
    }
    
    /* 성공 알림 */
    const alertSuccess = (props?: AlertSuccessProps)=>{
        const { message, onClose } = props ?? {};

        removeToast();
        toastId.current = toast.success(message? message : '', {toastId: genToastId(), onClose});

    }

    /* 경고 알림 */
    const alertWarn = (props?: AlertProps)=>{
        const {error, message, onClose} = props ?? {};
        const {mssg, handleClose, code} = alertProcess(error, message, onClose);
        
        removeToast();
        toastId.current = toast.warn(mssg, {toastId: genToastId(), onClose: ()=>{handleClose && handleClose(code)}});
    }
    

    /* 부가 기능 영역 */
    const genToastId = () => {
        return toastId.current = 'toast';
    }

    const removeToast = () => {
        if(toastId.current){
            toast.dismiss(toastId.current);
        }
    }

    const alertProcess = (error:any, message?:MessageProps, onClose?:CloseProps) => {
        let mssg;
        let code:string='';
        let handleClose = (code:string)=>{};

        if(error && axios.isAxiosError(error)){
            // 서버 응답이 있지만 상태 코드가 2xx가 아님
            if (error.response) {
                const {status, data} = error.response;
                code = data.code;
                if (status === 401 || data.code === 'AU00') {
                    handleClose = (code:string)=>{logout(); navi('/login');}
                }
            
                mssg = data.message || '알 수 없는 오류가 발생했습니다.';
            
            } else {
                mssg = '네트워크가 연결이 원할하지 않습니다.';
            }
        } else {
            mssg = "알 수 없는 오류가 발생했습니다.";
        }
            
        handleClose = onClose ||  handleClose;

        if(message){
            mssg = typeof message === 'object' ? message[code] || mssg : message;
        }

        return {mssg, handleClose, code}
    }

    return {alertError, alertSuccess, alertWarn}
};


export default useAlert;