import { createContext, useReducer } from 'react';

export interface ModalContextProps {
    id?:number;
    element?: React.ReactNode,
}

export default createContext<ModalContextProps[]>([]);

