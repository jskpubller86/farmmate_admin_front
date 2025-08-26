import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./applicantList.module.css";
import layout from "../../layout/layout.module.css";
import { Button, Avatar, Badge } from "../../components/ui";

interface Applicant {
  id: string;
  name: string;
  avatar: string;
  gender: "남성" | "여성";
  age: number;
  status: "대기중" | "검토중" | "승인" | "거절";
}

const ApplicantList: React.FC = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [searchType, setSearchType] = useState("이름");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // 실제로는 API 호출로 데이터를 가져와야 합니다
    // 지금은 더미 데이터를 사용합니다
    const dummyData: Applicant[] = [
      {
        id: "1",
        name: "김철수",
        avatar: "/images/img_profile.svg",
        gender: "남성",
        age: 25,
        status: "대기중"
      },
      {
        id: "2",
        name: "이영희",
        avatar: "/images/img_profile.svg",
        gender: "여성",
        age: 30,
        status: "검토중"
      },
      {
        id: "3",
        name: "박민수",
        avatar: "/images/img_profile.svg",
        gender: "남성",
        age: 35,
        status: "승인"
      },
      {
        id: "4",
        name: "최수진",
        avatar: "/images/img_profile.svg",
        gender: "여성",
        age: 28,
        status: "대기중"
      },
      {
        id: "5",
        name: "정현우",
        avatar: "/images/img_profile.svg",
        gender: "남성",
        age: 32,
        status: "검토중"
      }
    ];
    setApplicants(dummyData);
  }, []);

  const handleChat = (applicantId: string) => {
    // 채팅 기능 구현
    alert(`${applicantId}님과의 채팅을 시작합니다.`);
  };

  const handleContract = (applicantId: string) => {
    // 계약 기능 구현
    navigate(`/lease/contract/${applicantId}`);
  };

  const handleSearch = () => {
    // 검색 기능 구현
    console.log(`검색 타입: ${searchType}, 검색어: ${searchQuery}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "승인":
        return "point2";
      case "검토중":
        return "point3";
      case "거절":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className={layout.container_full}>
      <div className={styles.applicant_list_container}>
        {/* 뒤로가기 버튼 */}
        <div className={styles.back_section}>
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.back_button}
            color="secondary"
            size="sm"
          >
            ← 이전으로
          </Button>
        </div>

        {/* 신청자 목록 테이블 */}
        <div className={styles.applicant_table}>
          <div className={styles.table_header}>
            <div className={styles.header_avatar}>프로필</div>
            <div className={styles.header_info}>신청자 정보</div>
            <div className={styles.header_gender}>성별</div>
            <div className={styles.header_age}>나이</div>
            <div className={styles.header_actions}>액션</div>
          </div>

          {applicants.map((applicant) => (
            <div key={applicant.id} className={styles.table_row}>
              <div className={styles.cell_avatar}>
                <Avatar
                  src={applicant.avatar}
                  size="lg"
                />
              </div>
              <div className={styles.cell_info}>
                <div className={styles.applicant_name}>
                  {applicant.name} 님께서 지원하셨습니다.
                </div>
                <Badge
                  color={getStatusColor(applicant.status)}
                  size="lg"
                >
                  {applicant.status}
                </Badge>
              </div>
              <div className={styles.cell_gender}>
                {applicant.gender}
              </div>
              <div className={styles.cell_age}>
                {applicant.age}세
              </div>
              <div className={styles.cell_actions}>
                <Button
                  onClick={() => handleChat(applicant.id)}
                  className={styles.chat_button}
                  color="point2"
                  size="sm"
                >
                  채팅
                </Button>
                <Button
                  onClick={() => handleContract(applicant.id)}
                  className={styles.contract_button}
                  color="point2"
                  size="sm"
                >
                  계약하기
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className={styles.pagination}>
          <Button
            onClick={() => handlePageChange(1)}
            className={styles.page_button}
            color="secondary"
            size="sm"
          >
            first
          </Button>
          <Button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className={styles.page_button}
            color="point2"
            size="sm"
          >
            prev
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${styles.page_number} ${
                page === currentPage ? styles.page_active : ""
              }`}
            >
              {page}
            </button>
          ))}
          
          <Button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            className={styles.page_button}
            color="point2"
            size="sm"
          >
            next
          </Button>
          <Button
            onClick={() => handlePageChange(totalPages)}
            className={styles.page_button}
            color="secondary"
            size="sm"
          >
            last
          </Button>
        </div>

        {/* 검색 기능 */}
        <div className={styles.search_section}>
          <select
            value={searchType}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.search_select}
          >
            <option value="이름">이름</option>
            <option value="나이">나이</option>
            <option value="성별">성별</option>
            <option value="상태">상태</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
            className={styles.search_input}
          />
          <Button
            onClick={handleSearch}
            className={styles.search_button}
            color="secondary"
            size="sm"
          >
            검색
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantList;
