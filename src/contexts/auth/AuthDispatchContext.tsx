import { createContext } from "react";
import { User } from "./AuthContext";


interface AuthDispatchContextProps {
    login:(user:User)=>any;
    logout:()=>any;
}

const login = ()=>null;
const logout = ()=>null;

export default createContext<AuthDispatchContextProps>({login, logout});