import { createContext} from 'react';


// 사용자 정보 인터페이스
export interface User {
  id: string;
  userName?: string;
  birthday?: string;
  addr?: string;
  detailAddr?: string;
  cellNo?: string;
  genderCd?: string;
  imageBasePath?: string;
  email?: string;
}

export default createContext<User | null>(null);