export interface Team {
    id : string;
    teamName : string;
    leaderName : string;
    startDatetime : string;
    endDatetime : string;
    addr : string;
    detailAddr : string;
    curMemberCnt : number; // 현재 인원 
    maxMemberCnt : number;
    isliked : boolean; // 찜 버튼 
     files: {
    url: string;
    fileName: string;
  }[];
  leaderFiles: {
    url: string;
    fileName: string;
  }[];
}