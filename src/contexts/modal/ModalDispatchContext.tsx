import { createContext, useReducer } from 'react';
import { ModalType } from '../../components/modal/Modal';

export type ModalDispatchContextProps = [
    open:(id: number, el:React.ReactNode, maxWidth?:number, type?:ModalType)=>any,
    close:(id:number)=>any
]

const open = (id: number, el:React.ReactNode, maxWidth?:number, type?:ModalType)=>null;
const close = (id:number)=>null;
export default createContext<ModalDispatchContextProps>([open, close]);

