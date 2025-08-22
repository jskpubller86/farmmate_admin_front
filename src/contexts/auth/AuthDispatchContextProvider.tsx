import { createContext, useReducer} from 'react';
import { UserItem } from "../../pages/signup/userData";
import authReducer from './authReducer';
import UserContext, { User } from './AuthContext';
import UserDispatchContext from './AuthDispatchContext';

interface Props {
  children?:React.ReactNode;
}

const AuthDispatchContextProvider: React.FC<Props> = ({children}) => {

   const sessionUser = sessionStorage.getItem('user');
   const [user, dispatch] = useReducer(authReducer,  sessionUser ? JSON.parse(sessionUser) : null);

   // 로그인 되었을 때 UserContext에 전송하여 리플레쉬 되기 전까지 로그인 정보 유지
   const login = (user:User)=>{
      dispatch({type:'login', user});
   }

   // UserContext에서 로그인 정보 삭제
   const logout = ()=>{
      dispatch({type:'logout'});
   }
   
   return (
      <UserDispatchContext.Provider value={{login, logout}}>
         <UserContext.Provider value={user}>
            {children}
         </UserContext.Provider>
      </UserDispatchContext.Provider>
   )
}

export default AuthDispatchContextProvider;