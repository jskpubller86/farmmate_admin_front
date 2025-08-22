

import ReactDOM from 'react-dom';
import ModalContext, { ModalContextProps } from './ModalContext';

export interface ModalProviderProps {
    children?:React.ReactNode;
    modalList:ModalContextProps[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({children, modalList})=>{
    // provider에게 배열 제공
    // Provider는 배열을 반복해서 출력
    
    return (
            <ModalContext.Provider value={modalList}>
                {children}
                {modalList.map((e)=>
                    ReactDOM.createPortal(e.element, document.body)
                )}
           </ModalContext.Provider>
           )
}

export default ModalProvider;