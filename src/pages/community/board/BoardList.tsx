import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./board.module.css";
import { Link } from "react-router-dom";
import { Button, Checkbox, Error, Input, Select } from "../../../components/ui";
import { useAuth, useLeftLayout, useAPI, useAlert } from "../../../hooks";
import { PageInfoProps, Pagination } from "../../../components/sets";
import { appConsole } from "../../../utils";
interface BoardProps {
  id: string;
  title: string;
  creId: string;
  userName: string;
  conts: string;
  creDatetime: string;
}

const BoardList: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardProps[]>([]);
  const api = useAPI();
  const [currentPage, setCurrentPage] = useState(1); //기본1값을 초기화
  const [pageInfo, setPageInfo] = useState<PageInfoProps>();
  //<검색>을 위한 useState를 추가한다.
  const [searchType, setSearchType] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const { alertError } = useAlert();

  const fetchNoticeList = async (page: number) => {
    try {
      const resp = await api.get("/board/boardList", {
        currPage: page,
        searchType: searchType,
        searchValue: searchValue,
      });
      const { code, data } = resp.data;
      if (code === "0000") {
        setBoardList(resp.data.data); //useState에 저장
        setPageInfo(resp.data.page);
      } else {
        alertError();
      }
    } catch (error) {
      alertError({ error });
    }
  };

  const searchFunction = () => {
    fetchNoticeList(1);
  };

  return (
    <div className={styles.container}>
      <table className={styles.boardTable}>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boardList?.map((item) => (
            <tr key={item.id}>
              <td>
                <Link to={`/board/detail/${item.id}`}> {item.title}</Link>{" "}
              </td>
              <td>{item.userName}</td>
              {appConsole(item.creDatetime)}
              <td>{item.creDatetime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {pageInfo && (
        <Pagination page={pageInfo} onPageChange={fetchNoticeList} />
      )}

      <div className={styles.search_box}>
        <Select
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setSearchType(e.target.value);
          }}
        >
          <option value="1">작성자</option>
          <option value="2">제목</option>
          <option value="3">내용</option>
        </Select>

        <Input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
          }}
        />
        <Button type="button" onClick={searchFunction} size="sm">
          검색
        </Button>
      </div>

      <div className={styles.button_group}>
        <Button to="/board/add">글쓰기</Button>
      </div>
    </div>
  );
};

export default BoardList;
