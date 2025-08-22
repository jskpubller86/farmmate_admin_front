import React, { useContext } from 'react'
import UserContext from '../contexts/auth/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth, useAlert } from '../hooks';
import { appConsole } from '../utils';

interface Props {
  children?:React.ReactNode
}

const PermissionFilter: React.FC<Props> = ({children}) => { 
    const { user} = useAuth();
    const navi = useNavigate();
    const {alertError} = useAlert();
    const move = ()=>{
        navi('/login');
    }
    
    return (
        <>
            {user? children : alertError({message: '로그인이 필요합니다.', onClose: move})}
        </>
    )
}

export default PermissionFilter