import React, { ChangeEvent, FormEvent, FormEventHandler, useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './Chat.module.css'
import { Avatar, Button, TextArea } from '../../components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {Client, IMessage, Frame} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth, useAlert} from '../../hooks';
import { appConsole } from '../../utils';

const chatData: LogProps[] = [
  {
    isNewLog: true,
    isMine: false,
    userId: "user001",
    channelId: "teamA",
    userName: "김철수",
    message: "오늘 회의록 정리했습니다.",
    imgUrl: undefined,
    creDatetime: new Date("2025-08-27T09:15:00"),
  },
  {
    isNewLog: false,
    isMine: true,
    userId: "user002",
    channelId: "teamA",
    userName: "나",
    message: "자료 업로드 완료했습니다.",
    imgUrl: undefined,
    creDatetime: new Date("2025-08-27T10:05:00"),
  },
  {
    isNewLog: true,
    isMine: false,
    userId: "user003",
    channelId: "teamA",
    userName: "이영희",
    message: "방금 코멘트 달았어요!",
    imgUrl: undefined,
    creDatetime: new Date("2025-08-27T10:20:00"),
  },
  {
    isNewLog: false,
    isMine: false,
    userId: "user004",
    channelId: "teamA",
    userName: "박준형",
    message: "내일 일정 확인 부탁드립니다.",
    imgUrl: undefined,
    creDatetime: new Date("2025-08-26T18:30:00"),
  },
  {
    isNewLog: false,
    isMine: true,
    userId: "user002",
    channelId: "teamA",
    userName: "나",
    message: "확인했습니다. 감사합니다.",
    imgUrl: undefined,
    creDatetime: new Date("2025-08-27T10:35:00"),
  }
]

interface Props  {
    modalId?: number;
    channelId:string;
}

interface LogProps {
  isNewLog:boolean;
  isMine:boolean;
	userId:string;
  channelId:string; 
  userName:string; 
	message:string;
  imgUrl:string | undefined;
  creDatetime:Date;
}

interface SendChatProps {
    message:String;
}

interface ReadHistoryProps {
    pageNum:number;
}

type LogMap = { [key: string] : LogProps[] };

/**
 * - 로그인이 되고 챗팅 컴포넌트가 활성화되었을 때 웹소켓이 연결되어야 하고 실패하면 오류를 토스트 출력 (완료)
 * - 로그인이 안되었을 경우 웹소캣 연결 실패 오류 토스트 출력 (완료)
 * - 채팅을 시작하고 메시지를 보내면 다른 세션에 그 내용을 전송한다. (완료)
 * - 커넥션이 끊기면 다시 연결을 시도한다. 이때 요소가 삭제되어 클로즈가 되었을 때는 연결을 하지 않는다. (완료)
 * - 스크롤을 할때 이전 메시지를 확인할 수 있다.(완료)
 * - 채팅에서 내가 쓴글은 아바타가 안나오고 남이 쓴 글은 아바타가 나온다. (완료)
 * - 스크롤로 데이터를 받아왔을 때 새로운 데이터를 기준으로 스크롤 위치조정 ()
 * - 스크롤을 중에 다른 세션에서 메시지를 받으면 UI적으로 알려준다. (완료)
 * - 메시지를 받은 사용자가 내용을 확인하기 위해서 스크롤을 맨 아래로 내리면 메시지 UI 팝업을 사라진다. (완료)
 * - 본인 메시지는 아바타를 보여주지 않는다. (완료)
 * - 메시지를 보내면 스크롤이 맨 아래로 이동하고 페이지번호도 1번이다. (완료)
 * - 메시지를 입력하고 엔터를 누르면 메시지 전송(완료)
 * - 타이핑 중일 때는 메시지를 갱신하지 않음.
 * - 사용자의 이름을 보여준다.
 */

/**
 * 채팅
 * @returns 
 * @author 김종수
 */
const Chat: React.FC<Props> = ({modalId, channelId}) => {
  const [logs, setLogs] = useState<LogProps[]>(chatData); // 메시지 로그
  const pageRef = useRef(1); //
  const [message, setMessage] = useState("");
  const isWrittenRef = useRef(false);
  const btnSubmitRef = useRef<HTMLButtonElement>(null);
  const stompClientRef = useRef<Client | null>(null);
  const mssgBoxRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);
  const [newMessage, setNewMessage] = useState<LogProps>();
  const scrollRef = useRef({top:0, isScrolling: false})
  const reConnectRef = useRef(0);
  const {user} = useAuth();
  const {alertError, alertSuccess, alertWarn} = useAlert();
  
  /**
   * 메시지를 작성하면 스크롤을 맨아래로 이동
   * 아니라면 현재 위치
   */
  useEffect(() => {
    const container = mssgBoxRef.current;
    if (container ) {   
      // 메시지 작성을 완료했거나 스크롤 중이 아니라면 항상 맨아래 위치
      if(isWrittenRef.current || !scrollRef.current.isScrolling){
        isWrittenRef.current = false;
        scrollRef.current.isScrolling = false;
        container.scrollTop = container.scrollHeight;
        // 스크롤로 인한 로그 변화라면 스크롤 위치를 클라이언트 높이에 고정
      } else if(scrollRef.current.isScrolling) {
        const els = document.querySelectorAll('[data-new-log="1"]');
        if(els.length){
          let totalHeight = 0;
          els.forEach(el => {
            totalHeight += (el as HTMLElement).offsetHeight;
          });
          container.scrollTop = totalHeight + (els.length * 28 - 56); // 위치 보정
        } else {
          container.scrollTop = scrollRef.current.top - 28; // 위치 보정
        }
      }
    }
  }, [logs]);

  /**
   * 소켓 생성 및 연결
   */
  useEffect(()=>{
    isMountedRef.current = true;
    // 임시 주석 :  connect(`${process.env.REACT_APP_API_HOST}/ws?channelId=${channelId}`);

    return () => {
      isMountedRef.current = false;
      stompClientRef.current?.deactivate();
    }
  }, []);

  /**
   * 소켓 연결 시도
   * @param socket 
   */
  const connect = (url:string)=>{
    const stompClient = new Client({
      webSocketFactory: () => new SockJS(url), // 웹소켓 엔드포인트
      reconnectDelay: 100000,
      // debug: (msg) => //console.log(msg),
    });
    
    // STOMP로 받은 메시지를 오브젝트로 변환하면 creDatetime이 문자열로 구성되어 있음. 이것을 Date객체로 변화
    const normalize = (log: LogProps): LogProps => {
      appConsole(`${log.userId} === ${user} = ${log.userId === user?.id}`);
      return {
      ...log,
      isMine: log.userId === user?.id,
      creDatetime: new Date(log.creDatetime), // ← 변환
    }};

    stompClient.onConnect = (frame) => {
      //연결되면 단체 구독설정
      stompClient.subscribe(`/topic/team/${channelId}`, (message) => {
        const respLog:LogProps = JSON.parse(message.body);
        appendLog(normalize(respLog));
      })

      //연결되면 개인 구독설정
      stompClient.subscribe(`/user/queue/history`, (message) => {
        const respLogs:LogProps[] = JSON.parse(message.body);
        // 로그가 있을 경우에만 실행
        if(respLogs.length){
            appendLog(respLogs.map(normalize));
        }
      })

      //연결되면 오류 응답 구독설정
      stompClient.subscribe(`/user/queue/errors`, (message) => {
        appConsole(message.body);
      })

      // 처음로딩 되면 호출
      isMountedRef.current && reConnectRef.current===0 && readHistory()
      reConnectRef.current++;
      alertSuccess({message: '연결되었습니다.'});
    }
    stompClient.onStompError = (frame) => {
      appConsole("onStompError");
    }
    stompClient.onWebSocketError = (evt) =>{
        appConsole("onWebSocketError");
    }
    
    stompClient.onUnhandledMessage = ()=>{
        alertWarn({message: "서버로부터 예상치 못한 메시지를 받았습니다."});
    }

    stompClient.onWebSocketClose = (event) => {
        appConsole(event);
        if(event.code === 1000){
            alertWarn({message: "연결이 종료되었습니다."});
        } else {
            alertWarn({message: "팀원이 아닙니다."});
        }
    };

    // 스톰 연결
    stompClient.activate();
    stompClientRef.current = stompClient;
  }
  
  /**
   * new 태그 삭제
   * @param logs 
   * @returns 
   */
  const deleteNewTag = (logs: LogProps[])=> {
    return logs.map((log)=>{log.isNewLog=false;return log})
  };

  /**
   * 응답받은 메세지를 로그에 추가
   * @param logData
   */
  const appendLog = (logData: LogProps[] | LogProps) => {
    if(Array.isArray(logData)){
      if(isWrittenRef.current){
        setLogs((prev) => filteredLogs([...logData]));
      } else {
        // 마지막 요소가 첫번재로 보여줄 요소이기 때문에 마지막 요소 지정
        setLogs((prev) =>filteredLogs([...deleteNewTag(prev), ...logData]));
      }
    } else {
      setLogs((prev) => filteredLogs([...deleteNewTag(prev), {...logData, isNewLog: false}]));
      setNewMessage(logData);
    }
    // 메시지 상태 초기화
    if(isWrittenRef.current){
      setMessage("");
    }
  };

  /**
   * 중복된 로그 제거, 날짜 기준으로 정렬 ASC
   */
  const filteredLogs = (logs:LogProps[])=>{
      return Array.from(
          new Map(
            logs.map(item => [
              `${item.userId}-${item.channelId}-${item.creDatetime.getTime()}`, // 고유 키
              item
            ])
          ).values()
        ).sort((a, b) => a.creDatetime.getTime() - b.creDatetime.getTime());
  }

  /**
   * 메세지 전송
   */
  const sendMessage = ()=>{
    if(stompClientRef.current) {
      stompClientRef.current.publish({
        destination: `/app/chat/${channelId}`,
        body: JSON.stringify({message} as SendChatProps)});
    } else {
      toast.error('소켓이 아직 열리지 않았습니다.',{toastId: 1});
    }
  }

  /**
   * 메세지 전송
   */
  const readHistory = ()=>{
    if(stompClientRef.current) {
      stompClientRef.current.publish({
        destination: `/app/chat/history/${channelId}`,
        body: JSON.stringify({pageNum:pageRef.current} as ReadHistoryProps)});
    } else {
      alertError({message: '소켓이 아직 열리지 않았습니다.'})
    }
  }

  /**
   * 서버에 메세지 전송 타입 설정
   * @param e 
   */
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    // 이벤트 객체가 있으면 기본 행동 막기
    e.preventDefault();
    e.stopPropagation();
    isWrittenRef.current=true;
    pageRef.current=1;
    sendMessage();
  };

  /**
   * 메세지 작성시 Messgage status 저장
   * @param e 
   */
  const changeMessage = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  /**
   * 스크롤 이벤트가 발생하여 상단의 끝에 도달하면 페이지 번호 변경
   */
  const handleScroll = (e:React.UIEvent<HTMLDivElement>)=>{
      const {scrollTop, clientHeight, scrollHeight} = e.currentTarget;
      if((scrollTop + clientHeight) === scrollHeight){
        // 스크로를 맨 아래에 위치했다면 스크롤 중이 아니므로 새 메시지 팝업 UI 삭제
        scrollRef.current.isScrolling = false;
        setNewMessage(undefined);
      } else {
        // 스크로를 맨 아래에 위치하지 않으면 위로 스크롤링 중임.
        scrollRef.current.isScrolling = true;
        scrollRef.current.top = scrollTop;
      }
      // 스크롤이 맨 위에 위치했다면 다음 로그를 조회해야 함.
      if(scrollTop === 0) {
        pageRef.current=logs.length+1; // 다음 요소 조회
        isWrittenRef.current=false;
        readHistory();
      }
  }

  /**
   * 시간 출력
   */
  const printTime = (log:LogProps)=> {
    const minutes =  log.creDatetime.getMinutes();
    return log.creDatetime.getHours() + ':' +  (10 > minutes ? `0${minutes}` : minutes);
  }

  /**
   * 일자 출력
   */
  const printDate = (log:LogProps)=> {
    return `${log.creDatetime.getFullYear()}년 ${log.creDatetime.getMonth()+1}월 ${log.creDatetime.getDate()}일`;
  }

  /**
   * Enter 키를 입력했을 때 메시지 전송
   * @param e 
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      btnSubmitRef?.current?.click();
    }
  };

  /**
   * 동일한 일자인지 비교
   * @param date1 
   * @param date2 
   * @returns 
   */
  const isSameDate = (date1:Date, date2:Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() && // 0부터 시작 (1월 = 0)
      date1.getDate() === date2.getDate()
    );
  }

  return (
    <div className={styles.container}>
        <div className={styles.header_box}>
          채팅방
        </div>

        {/*  메세지 영역 */}
        <div className={styles.message_box}>
          <div className={styles.message_group} ref={mssgBoxRef} onScroll={handleScroll}>
            {/* 메세지를 출력 날짜가 바뀌면 그때 추가 */}
            {logs.map((log, idx, list) => {
                    return <>
                        {idx!=0 && !isSameDate(log.creDatetime, list[idx-1].creDatetime) && <div key={`date${idx}`} className={styles.message_item}><div className={styles.date}>{printDate(log)}</div></div>}
                        <div key={idx} data-new-log={log.isNewLog ? 1 : 0} className={styles.message_item}>
                            <div className={log.isMine ? styles.my_unit_box : styles.another_unit_box}>
                              {!log.isMine && <Avatar src={log.imgUrl} />}
                              <div className={styles.unit_messge_box}>
                                {!log.isMine && <div className={styles.user_name}>{log.userName}</div>}
                                <div className={styles.unit_message_wrap}>
                                  <p className={styles.unit_message}>{log.message} <span className={styles.time}>{printTime(log)}</span></p>
                                </div>
                              </div>
                            </div>
                          </div>
                          </>
                })}
          </div>
          
          {/* 스크롤 중에 새로운 메시지가 나올 경우 팝업 */}
          {newMessage && scrollRef.current.isScrolling &&
          <div className={styles.new_message_box_wrap}>
              <div className={styles.new_message_box}>
                <Avatar src={newMessage.imgUrl} /> <p>{newMessage.message}</p>
              </div>
          </div>}
        </div>
        
        {/*  채팅 입력창 */}
        <form className={styles.chat_box} onSubmit={handleSubmit}>
          <TextArea className={styles.textArea} onChange={changeMessage} onKeyDown={handleKeyDown} value={message}/>
          <button type='submit' className={styles.btn_send} ref={btnSubmitRef}>
            <FontAwesomeIcon icon={faPaperPlane}  />
          </button>
        </form>
    </div>
  )
}

export default Chat