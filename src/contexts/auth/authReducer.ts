import { User } from "./AuthContext";

export interface UserReducerActionProps {
    type : string;
    user?: User;
}

const fu = (state:User|null, action:UserReducerActionProps) =>{
    switch(action.type){
        // action에서 넘어온 요소 추가
        case 'login':
            sessionStorage.setItem('user', JSON.stringify(action.user));
            return action.user? action.user : null;
        // action에서 넘어온 id에 해당하는 요소 삭제
        case 'logout': 
            sessionStorage.removeItem('user');
            return null;
        default : return state;
    } 
}

export default fu;