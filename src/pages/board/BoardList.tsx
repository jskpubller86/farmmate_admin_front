import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './board.module.css'
import { Link } from 'react-router-dom';
import { Avatar, Button, Checkbox, Error, Input, Select } from "../../components/ui";
import { useAuth, useLeftLayout, useAPI, useAlert } from "../../hooks";
import { PageInfoProps, Pagination } from '../../components/sets';
import { appConsole } from '../../utils';
interface BoardProps {
    id: string;
    title: string;
    creId: string;
    userName: string;
    conts: string;
    creDatetime: string;
}

const boardListData =  [{
    id: "1",
    title: "샘플 제목 1",
    creId: "user001",
    userName: "사용자1",
    conts: "이것은 샘플 내용 1입니다.",
    creDatetime: "2025-08-26 10:15:01"
  },
  {
    id: "2",
    title: "샘플 제목 2",
    creId: "user002",
    userName: "사용자2",
    conts: "이것은 샘플 내용 2입니다.",
    creDatetime: "2025-08-26 10:15:02"
  },
  {
    id: "3",
    title: "샘플 제목 3",
    creId: "user003",
    userName: "사용자3",
    conts: "이것은 샘플 내용 3입니다.",
    creDatetime: "2025-08-26 10:15:03"
  },
  {
    id: "2",
    title: "샘플 제목 2",
    creId: "user002",
    userName: "사용자2",
    conts: "이것은 샘플 내용 2입니다.",
    creDatetime: "2025-08-26 10:15:02"
  },
  {
    id: "3",
    title: "샘플 제목 3",
    creId: "user003",
    userName: "사용자3",
    conts: "이것은 샘플 내용 3입니다.",
    creDatetime: "2025-08-26 10:15:03"
  },
  {
    id: "2",
    title: "샘플 제목 2",
    creId: "user002",
    userName: "사용자2",
    conts: "이것은 샘플 내용 2입니다.",
    creDatetime: "2025-08-26 10:15:02"
  },
  {
    id: "3",
    title: "샘플 제목 3",
    creId: "user003",
    userName: "사용자3",
    conts: "이것은 샘플 내용 3입니다.",
    creDatetime: "2025-08-26 10:15:03"
  },
  {
    id: "2",
    title: "샘플 제목 2",
    creId: "user002",
    userName: "사용자2",
    conts: "이것은 샘플 내용 2입니다.",
    creDatetime: "2025-08-26 10:15:02"
  },
  {
    id: "3",
    title: "샘플 제목 3",
    creId: "user003",
    userName: "사용자3",
    conts: "이것은 샘플 내용 3입니다.",
    creDatetime: "2025-08-26 10:15:03"
  },{
    id: "2",
    title: "샘플 제목 2",
    creId: "user002",
    userName: "사용자2",
    conts: "이것은 샘플 내용 2입니다.",
    creDatetime: "2025-08-26 10:15:02"
  },
  {
    id: "3",
    title: "샘플 제목 3",
    creId: "user003",
    userName: "사용자3",
    conts: "이것은 샘플 내용 3입니다.",
    creDatetime: "2025-08-26 10:15:03"
  }
  ,{
    id: "2",
    title: "샘플 제목 2",
    creId: "user002",
    userName: "사용자2",
    conts: "이것은 샘플 내용 2입니다.",
    creDatetime: "2025-08-26 10:15:02"
  },
  {
    id: "3",
    title: "샘플 제목 3",
    creId: "user003",
    userName: "사용자3",
    conts: "이것은 샘플 내용 3입니다.",
    creDatetime: "2025-08-26 10:15:03"
  },
  {
    id: "2",
    title: "샘플 제목 2",
    creId: "user002",
    userName: "사용자2",
    conts: "이것은 샘플 내용 2입니다.",
    creDatetime: "2025-08-26 10:15:02"
  },
  {
    id: "3",
    title: "샘플 제목 3",
    creId: "user003",
    userName: "사용자3",
    conts: "이것은 샘플 내용 3입니다.",
    creDatetime: "2025-08-26 10:15:03"
  }
]

const BoardList: React.FC = () => {
    const [boardList, setBoardList] = useState<BoardProps[]>(boardListData);
    const api = useAPI();
    const [currentPage,setCurrentPage] = useState(1);//기본1값을 초기화
    const [pageInfo, setPageInfo] = useState<PageInfoProps>( {
                                                                totalItems: 50,
                                                                totalPages: 5,
                                                                currentPage: 1,
                                                                startPage: 1,
                                                                endPage: 5,
                                                            })
    //<검색>을 위한 useState를 추가한다.
    const [searchType,setSearchType] = useState('1');
    const [searchValue,setSearchValue] = useState('');
    const {alertError} = useAlert();

     const fetchNoticeList = async (page: number) => {
        try{
            const resp = await api.get('/board/boardList', { currPage: page, searchType: searchType, searchValue:searchValue })
            const {code, data} = resp.data;
            if(code === '0000'){
                setBoardList(resp.data.data);//useState에 저장
                setPageInfo(resp.data.page);
            } else {
                alertError();
            }
        }catch(error){
            alertError({error});
        }
    }
    
    const searchFunction = () =>{
        fetchNoticeList(1);
    }

    return (
         <div className={styles.container}>
            <table className={styles.board_table}>
                <thead>
                    <tr>
                        <th className={styles.board_th}>제목</th>
                        <th className={styles.board_th}>작성자</th>
                        <th className={styles.board_th}>작성일</th>
                        <th className={styles.board_th}>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Avatar className={styles.board_title_img} src='/images/chatbot.svg' /> 농사를 잘 짓는 방법을 알아봅시다.1 </td>
                        <td>테스형 </td>
                        <td>2025-09-01 </td>
                        <td>360</td>
                    </tr>
                    <tr>
                        <td><Avatar src='/images/chatbot.svg' /> 농사를 잘 짓는 방법을 알아봅시다.2 </td>
                        <td>테스형 </td>
                        <td>2025-09-01 </td>
                        <td>360</td>
                    </tr>
                    <tr>
                        <td><Avatar src='/images/chatbot.svg' /> 농사를 잘 짓는 방법을 알아봅시다.3 </td>
                        <td>테스형 </td>
                        <td>2025-09-01 </td>
                        <td>360</td>
                    </tr>
                    {/* {boardList?.map(item => (
                        <tr  key={item.id}>
                            <td><Link to={`/board/detail/${item.id}`}> {item.title}</Link> </td>
                            <td>{item.userName}</td>
                            {appConsole(item.creDatetime)}
                            <td>{item.creDatetime}</td>           
                        </tr>
                    ))} */}
                </tbody> 
            </table>

            {pageInfo && <Pagination page={pageInfo} onPageChange={fetchNoticeList} />}

            <div className={styles.search_box}>
                <Select onChange={(e:ChangeEvent<HTMLSelectElement>)=>{setSearchType(e.target.value)}}>
                    <option value="1">작성자</option>
                    <option value="2">제목</option>
                    <option value="3">내용</option>
                </Select>

                <Input type='text' onChange={(e:ChangeEvent<HTMLInputElement>) =>{setSearchValue(e.target.value)}} />
                <Button type="button" onClick={searchFunction} size='sm'>검색</Button>
            </div>

            <div className={styles.button_group}><Button to='/board/add'>글쓰기</Button></div>
        </div>
    )
}

export default BoardList