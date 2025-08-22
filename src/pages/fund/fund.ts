export interface Fund {
    id : string;
    fundName : string;
    farmownerName : string;
    startDatetime : string;
    endDatetime : string;
    // addr : string;
    // detailAddr : string;
    curMemberCnt : number; // 현재 인원 
    maxMemberCnt : number;
    isliked : boolean; // 찜 버튼 
     files: {
    url: string;
    fileName: string;
    }[];
  farmownerFiles: {
    url: string;
    fileName: string;
  }[];
}