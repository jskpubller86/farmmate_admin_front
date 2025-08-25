import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./fund.module.css";
import layout from "../../layout/layout.module.css";
import { FundCard, DUMMY_FUND_CARD } from "../../components/sets";
import { Select, Input, Button } from "../../components/ui";

type MyFundItem = {
  id: number;
  fundName: string;
  fundImageUrl?: string | null;
  farmOwnerName: string;
  farmOwnerImageUrl?: string | null;
  startDatetime: string;
  endDatetime: string;
  currentPercent: number;
  currentMember: number;
  maxMember: number;
  status: "recruiting" | "completed" | "cancelled";
  createdAt: string;
};

const PAGE_SIZE = 6;

const makeDummy = (pageNum: number, size: number): MyFundItem[] =>
  Array.from({ length: size }).map((_, i) => {
    const id = (pageNum - 1) * size + i + 1;
    return {
      id,
      fundName: `깻잎과 관련된 펀딩 내용 제목 ${id}`,
      fundImageUrl: "/images/fundcard_img.svg",
      farmOwnerName: "테스형",
      farmOwnerImageUrl: "/images/farmowner_img.svg",
      startDatetime: "2025-05-31T07:00:10",
      endDatetime: "2025-06-01T07:00:10",
      currentPercent: Math.floor(Math.random() * 100) + 1,
      currentMember: Math.floor(Math.random() * 100) + 1,
      maxMember: 100,
      status: ["recruiting", "completed", "cancelled"][
        Math.floor(Math.random() * 3)
      ] as "recruiting" | "completed" | "cancelled",
      createdAt: "2025-01-15T10:00:00",
    };
  });

const Myfund: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myFunds, setMyFunds] = useState<MyFundItem[]>([]);

  // URL 경로에 따라 기본 탭 설정
  const getDefaultTab = (): "my-created" | "my-participated" | "my-wish" => {
    if (location.pathname === "/myfund") {
      return "my-created"; // 내가 만든 펀드 탭
    }
    return "my-created"; // 기본값: 내가 만든 펀드 탭
  };

  const [activeTab, setActiveTab] = useState<
    "my-created" | "my-participated" | "my-wish"
  >(getDefaultTab());

  useEffect(() => {
    // URL이 변경될 때마다 탭 업데이트
    setActiveTab(getDefaultTab());
  }, [location.pathname]);

  useEffect(() => {
    setMyFunds(makeDummy(1, PAGE_SIZE));
  }, []);

  // 펀드 작성 페이지로 이동
  const handleCreateFund = () => {
    navigate("/fund_write");
  };

  // 펀드 상세 페이지로 이동
  const handleFundDetail = (fundId: number) => {
    navigate(`/fund_detail/${fundId}`);
  };

  // 펀드 수정 페이지로 이동
  const handleEditFund = (fundId: number) => {
    navigate(`/fund_edit/${fundId}`);
  };

  // 펀드 삭제 처리
  const handleDeleteFund = (fundId: number) => {
    if (window.confirm("정말로 이 펀드를 삭제하시겠습니까?")) {
      setMyFunds((prev) => prev.filter((fund) => fund.id !== fundId));
    }
  };

  // 상태에 따른 배지 텍스트
  const getStatusText = (status: string) => {
    switch (status) {
      case "recruiting":
        return "모집중";
      case "completed":
        return "완료";
      case "cancelled":
        return "취소됨";
      default:
        return "알 수 없음";
    }
  };

  // 상태에 따른 배지 스타일
  const getStatusClass = (status: string) => {
    switch (status) {
      case "recruiting":
        return styles.status_badge_recruiting;
      case "completed":
        return styles.status_badge_completed;
      case "cancelled":
        return styles.status_badge_cancelled;
      default:
        return styles.status_badge_default;
    }
  };

  return (
    <div className={layout.container_full}>
      <div className={styles.myfund_container}>
        {/* 탭 + 검색/필터 영역 */}
        <div className={styles.header_area}>
          {/* 상단 탭 */}
          <div className={styles.tab_row}>
            <button
              type="button"
              className={`${styles.tab} ${
                activeTab === "my-created" ? styles.tab_active : ""
              }`}
              onClick={() => setActiveTab("my-created")}
            >
              내가 만든 펀드
            </button>
            <button
              type="button"
              className={`${styles.tab} ${
                activeTab === "my-participated" ? styles.tab_active : ""
              }`}
              onClick={() => setActiveTab("my-participated")}
            >
              내가 참여한 펀드
            </button>
            <button
              type="button"
              className={`${styles.tab} ${
                activeTab === "my-wish" ? styles.tab_active : ""
              }`}
              onClick={() => setActiveTab("my-wish")}
            >
              찜한 펀드
            </button>
          </div>

          {/* 펀드 생성 버튼 - my-created 탭일 때만 표시 */}
          {activeTab === "my-created" && (
            <div className={styles.create_button_container}>
              <Button
                className={styles.create_button}
                onClick={handleCreateFund}
                color="point2"
              >
                펀드 생성하기
              </Button>
            </div>
          )}

          {/* 검색 및 필터 */}
          <div className={styles.search_filter_area}>
            <div className={styles.search_row}>
              <Select className={styles.search_sel}>
                <option value="전체">전체</option>
                <option value="모집중">모집중</option>
                <option value="완료">완료</option>
                <option value="취소됨">취소됨</option>
              </Select>
              <Input
                className={styles.search_input}
                placeholder="펀드명을 검색하세요"
              />
              <Button type="button" className={styles.search_btn}>
                검색
              </Button>
            </div>
          </div>
        </div>

        {/* 펀드 목록 */}
        <div className={styles.funds_list_area}>
          {myFunds.length === 0 ? (
            <div className={styles.empty_state}>
              <div className={styles.empty_icon}>📋</div>
              <h3 className={styles.empty_title}>
                {activeTab === "my-created" && "아직 생성한 펀드가 없습니다"}
                {activeTab === "my-participated" &&
                  "아직 참여한 펀드가 없습니다"}
                {activeTab === "my-wish" && "아직 찜한 펀드가 없습니다"}
              </h3>
              <p className={styles.empty_description}>
                {activeTab === "my-created" && "첫 번째 펀드를 생성해보세요!"}
                {activeTab === "my-participated" &&
                  "관심 있는 펀드에 참여해보세요!"}
                {activeTab === "my-wish" && "마음에 드는 펀드를 찜해보세요!"}
              </p>
              {activeTab === "my-created" && (
                <Button
                  className={styles.empty_action_button}
                  onClick={handleCreateFund}
                  color="point2"
                >
                  펀드 생성하기
                </Button>
              )}
            </div>
          ) : (
            <div className={styles.funds_grid}>
              {myFunds.map((fund) => (
                <div key={fund.id} className={styles.fund_card_wrapper}>
                  <div className={styles.fund_card}>
                    {/* 상태 배지 */}
                    <div className={styles.status_badge_container}>
                      <span
                        className={`${styles.status_badge} ${getStatusClass(
                          fund.status
                        )}`}
                      >
                        {getStatusText(fund.status)}
                      </span>
                    </div>

                    {/* 펀드 이미지 */}
                    <div className={styles.fund_image_container}>
                      <img
                        src={fund.fundImageUrl || "/images/img_default.svg"}
                        alt={fund.fundName}
                        className={styles.fund_image}
                        onClick={() => handleFundDetail(fund.id)}
                      />
                    </div>

                    {/* 펀드 정보 */}
                    <div className={styles.fund_info}>
                      <h3
                        className={styles.fund_name}
                        onClick={() => handleFundDetail(fund.id)}
                      >
                        {fund.fundName}
                      </h3>

                      {/* 농장주 정보 */}
                      <div className={styles.farm_owner_info}>
                        <img
                          src={
                            fund.farmOwnerImageUrl || "/images/img_profile.svg"
                          }
                          alt={fund.farmOwnerName}
                          className={styles.farm_owner_avatar}
                        />
                        <span className={styles.farm_owner_name}>
                          {fund.farmOwnerName}
                        </span>
                      </div>

                      {/* 펀드 통계 */}
                      <div className={styles.fund_stats}>
                        <div className={styles.stat_item}>
                          <span className={styles.stat_label}>달성률</span>
                          <span className={styles.stat_value}>
                            {fund.currentPercent}%
                          </span>
                        </div>
                        <div className={styles.stat_item}>
                          <span className={styles.stat_label}>참여자</span>
                          <span className={styles.stat_value}>
                            {fund.currentMember}/{fund.maxMember}명
                          </span>
                        </div>
                      </div>

                      {/* 날짜 정보 */}
                      <div className={styles.date_info}>
                        <div className={styles.date_item}>
                          <span className={styles.date_label}>시작일</span>
                          <span className={styles.date_value}>
                            {new Date(fund.startDatetime).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={styles.date_item}>
                          <span className={styles.date_label}>종료일</span>
                          <span className={styles.date_value}>
                            {new Date(fund.endDatetime).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* 액션 버튼들 */}
                      {activeTab === "my-created" && (
                        <div className={styles.action_buttons}>
                          <Button
                            className={styles.action_button_edit}
                            onClick={() => handleEditFund(fund.id)}
                            color="point2"
                          >
                            수정
                          </Button>
                          <Button
                            className={styles.action_button_delete}
                            onClick={() => handleDeleteFund(fund.id)}
                            color="danger"
                          >
                            삭제
                          </Button>
                        </div>
                      )}

                      {activeTab === "my-participated" && (
                        <div className={styles.action_buttons}>
                          <Button
                            className={styles.action_button_detail}
                            onClick={() => handleFundDetail(fund.id)}
                            color="point2"
                          >
                            상세보기
                          </Button>
                        </div>
                      )}

                      {activeTab === "my-wish" && (
                        <div className={styles.action_buttons}>
                          <Button
                            className={styles.action_button_detail}
                            onClick={() => handleFundDetail(fund.id)}
                            color="point2"
                          >
                            상세보기
                          </Button>
                          <Button
                            className={styles.action_button_remove_wish}
                            onClick={() => {
                              setMyFunds((prev) =>
                                prev.filter((f) => f.id !== fund.id)
                              );
                            }}
                            color="secondary"
                          >
                            찜 해제
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myfund;
