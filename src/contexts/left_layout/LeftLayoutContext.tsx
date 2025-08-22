import { createContext, useReducer } from 'react';

interface Props {
    isActive:boolean;
    isMob:boolean;
}

export interface LeftLayoutContextProps {
    leftState: Props;
    setLeftState: React.Dispatch<React.SetStateAction<Props>>;
}

export default createContext<LeftLayoutContextProps>({leftState:{isActive: false, isMob:false}, setLeftState: () => {}});

