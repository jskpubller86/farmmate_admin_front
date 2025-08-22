import { ModalContextProps } from "./ModalContext";

interface ModalReducerActionProps {
    type : string;
    id?: number;
    element?: React.ReactNode; 
}

export default (state:ModalContextProps[], action:ModalReducerActionProps) =>{
    switch(action.type){
        // action에서 넘어온 요소 추가
        case 'open': 
            return [...state, {id: action.id, element: action.element}];
        // action에서 넘어온 id에 해당하는 요소 삭제
        case 'close': return state.filter((o)=>o.id !== action.id); 
        default : return state;
    } 
}