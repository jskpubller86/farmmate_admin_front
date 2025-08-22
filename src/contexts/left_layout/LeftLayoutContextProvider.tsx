import { createContext, ReactNode, useReducer, useState } from 'react';
import LeftLayoutContext from './LeftLayoutContext';

export const LeftLayoutContextProvider = ({ children }: { children: ReactNode }) => {
  const [leftState, setLeftState] = useState({isActive:false, isMob: false});
  return (
    <LeftLayoutContext.Provider value={{leftState, setLeftState}}>
      {children}
    </LeftLayoutContext.Provider>
  );
};