// import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEdit,
//   faSave,
//   faTimes,
//   faArrowLeft,
//   faFileAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import * as yup from "yup";
// import { Button, Error, Input, TextArea, Select } from "../../../components/ui";
// import { useAlert, useAPI } from "../../../hooks";
import styles from "./board.module.css";
import { Link } from "react-router-dom";
import { Pagination } from "../../../components/sets";
import { Button } from "../../../components/ui";

interface BoardItem {
  id: number;
  title: string;
  category: string;
  contents: string;
  writer: string;
  createdAt?: string;
}

const BoardList: React.FC = () => {

const [boardList, setBoardList] = useState<BoardItem[]>([]);
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

useEffect(() => {
  const data = localStorage.getItem("boardList");
  if(data){
    setBoardList(JSON.parse(data));
  }
}, []);

// 페이지네이션 계산
const totalItems = boardList.length;
const totalPages = Math.ceil(totalItems / pageSize);
const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
const currentBoardList = boardList.slice(startIndex, endIndex);

// 페이지 변경 핸들러
const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

// 페이지 크기 변경 핸들러
const handlePageSizeChange = (newPageSize: number) => {
  setPageSize(newPageSize);
  setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로
};





  return (
  <div className = {styles.container}>
    {/* Farm Mate 스타일 헤더 */}
    <div className={styles.topHeader}>
      <div className={styles.logo_section}>
        <h1 className={styles.siteTitle}>Farm Mate</h1>
      </div>
      
      
      <div className={styles.introSection}>
        <h2 className={styles.introTitle}>자유게시판</h2>
        <p className={styles.introDescription}>
          농업인들과 함께 소통하고 정보를 나누는 공간입니다.<br />
          자유롭게 이야기를 나누고 농업 관련 정보를 공유해보세요.
        </p>
      </div>
      
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder="게시글을 검색"
          />
        </div>
      </div>
    </div>

    {/* 메인 콘텐츠 */}
  

      <div className={styles.boardTable}>
        <table>
        <thead>
        <tr>
          <th>카테고리</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
        </thead>
        <tbody>
          {currentBoardList.map((item) => (
            <tr key = {item.id}>
              {/* <td>{item.id}</td> */}
              <td>
                <span 
                  className={styles.categoryLabel}
                  data-category={item.category || '자유'}
                >
                  {item.category || '자유'}
                </span>
              </td>
              <td>
                <Link to = {`/board/${item.id}`} className = {styles.titleLink}>
                  {item.title}
                </Link>
              </td>
              <td>{item.writer}</td>
              <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan = {4} className={styles.writeButtonCell}>
              <Link to = "/board/write">
                <Button size="lg" color="point">글쓰기</Button>
              </Link>
            </td>
          </tr>
        </tfoot>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          page={{
            currentPage,
            totalItems,
            totalPages,
            startPage: Math.max(1, currentPage - 2),
            endPage: Math.min(totalPages, currentPage + 2)
          }}
          onPageChange={handlePageChange}
          showPageSizeSelector={true}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 50]}
          showFirstLast={true}
          showPrevNext={true}
          maxVisiblePages={5}
        />
      )}
    </div>
     
  );
}

export default BoardList;
