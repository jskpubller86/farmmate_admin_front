import { useReducer } from "react";
import ModalDispatchContext from "./ModalDispatchContext";
import modalReducer from "./modalReducer";
import ModalProvider from "./ModalProvider";
import { ModalContextProps } from "./ModalContext";
import Modal, { ModalType } from "../../components/modal/Modal";

export interface ModalDispatchProviderProps {
    children?:React.ReactNode;
}

const ModalDispatchProvider: React.FC<ModalDispatchProviderProps> = ({children})=>{
    const [modalList, dispatch] = useReducer(modalReducer, [] as ModalContextProps[] );
    const close = (mId:number)=>dispatch({type: 'close', id: mId});

    const open = (mId: number, node:React.ReactNode, maxWidth?:number, type?:ModalType)=>{
        dispatch({type: 'open', id:mId, element: <Modal id={mId} close={close} maxWidth={maxWidth} type={type}> {node}</Modal>});
    }
    
    return (
        <ModalDispatchContext.Provider value={[open, close]}>
            <ModalProvider modalList={modalList}>
                {children}
            </ModalProvider>
        </ModalDispatchContext.Provider>
    )
}

export default ModalDispatchProvider;