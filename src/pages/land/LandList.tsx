import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./land.module.css";
import layout from "../../layout/layout.module.css";
import { LandCard, DUMMY_FUND_CARD } from "../../components/sets";
import { Select, Input, Button } from "../../components/ui";

type LandItem = {
  id: number;
  landName: string;
  landImageUrl?: string | null;
  landOwnerName: string;
  landOwnerImageUrl?: string | null;
  startDatetime: string;
  endDatetime: string;
  addr: string;
  detailAddr: string;
  currentMember: number;
  endMember: number;
};

const PAGE_SIZE = 6;

const makeDummy = (pageNum: number, size: number): LandItem[] =>
  Array.from({ length: size }).map((_, i) => {
    const id = (pageNum - 1) * size + i + 1;
    return {
      id,
      landName: `땅 내놔는다. 1000 / 500에 24평`,
      landImageUrl: "/images/fundcard_img.svg",
      landOwnerName: "테스형",
      landOwnerImageUrl: "/images/farmowner_img.svg",
      startDatetime: "2025-05-31T07:00:10",
      endDatetime: "2025-06-01T07:00:10",
      addr: "서울특별시 강남구 삼성로 154 (대치동, 강남구의회, 강남구민회관)",
      detailAddr: "",
      currentMember: 1000,
      endMember: 500,
    };
  });

const LandList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lands, setLands] = useState<LandItem[]>([]);
  
  // URL 경로에 따라 기본 탭 설정
  const getDefaultTab = (): "my-rent-out" | "my-rent-in" | "my-wish" => {
    if (location.pathname === "/land/my-rent") {
      return "my-rent-out"; // 내 임대 탭
    }
    return "my-rent-out"; // 기본값: 내 임대 탭
  };
  
  const [activeTab, setActiveTab] = useState<"my-rent-out" | "my-rent-in" | "my-wish">(getDefaultTab());

  useEffect(() => {
    // URL이 변경될 때마다 탭 업데이트
    setActiveTab(getDefaultTab());
  }, [location.pathname]);

  useEffect(() => {
    setLands(makeDummy(1, PAGE_SIZE));
  }, []);

  return (
    <div className={layout.container_full}>
      <div className={styles.land_container}>
        {/* 탭 + 검색/필터 영역 */}
        <div className={styles.header_area}>
          {/* 상단 탭 */}
          <div className={styles.tab_row}>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "my-rent-out" ? styles.tab_active : ""}`}
              onClick={() => setActiveTab("my-rent-out")}
            >
              내 임대
            </button>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "my-rent-in" ? styles.tab_active : ""}`}
              onClick={() => setActiveTab("my-rent-in")}
            >
              내 임차
            </button>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "my-wish" ? styles.tab_active : ""}`}
              onClick={() => setActiveTab("my-wish")}
            >
              찜한 임대
            </button>
          </div>
          
          {/* 임차추가 버튼 - my-rent-out 탭일 때만 표시 */}
          {activeTab === "my-rent-out" && (
            <div className={styles.rent_button_container}>
              <Button 
                className={styles.rent_button} 
                type="button"
                onClick={() => navigate("/land/rent-add")}
              >
                임대추가
              </Button>
            </div>
          )}
          
          <div className={styles.filter_row}>
            <Select className={styles.search_sel}>
              <option value="전체">전체</option>
              <option value="임대">임대</option>
              <option value="임차">임차</option>
            </Select>
            <Input className={styles.search_input} placeholder="검색어를 입력하세요" />
            <Button className={styles.search_btn} type="button">검색</Button>
          </div>
        </div>

        {/* 카드 그리드 */}
        <section className={styles.cards_area} aria-label="토지 카드 목록">
          <div className={styles.landlist_grid}>
            {lands.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <LandCard
                    key={`placeholder-${i}`}
                    id={`${i}`}
                    landName={DUMMY_FUND_CARD.fundName}
                    landImageUrl={DUMMY_FUND_CARD.fundImageUrl}
                    landOwnerName={DUMMY_FUND_CARD.farmOwnerName}
                    landOwnerImageUrl={DUMMY_FUND_CARD.farmOwnerImageUrl}
                    startDatetime={DUMMY_FUND_CARD.startDatetime}
                    endDatetime={DUMMY_FUND_CARD.endDatetime}
                    addr="서울특별시 강남구 삼성로 154"
                    detailAddr="(대치동, 강남구민회관)"
                    currentPercent={80}
                    currentMember={12}
                    endMember={24}
                  />
                ))
              : lands.map((l) => (
                  <LandCard
                    key={`land-${l.id}`}
                    id={`${l.id}`}
                    landName={l.landName}
                    landImageUrl={l.landImageUrl}
                    landOwnerName={l.landOwnerName}
                    landOwnerImageUrl={l.landOwnerImageUrl}
                    startDatetime={l.startDatetime}
                    endDatetime={l.endDatetime}
                    addr={l.addr}
                    detailAddr={l.detailAddr}
                    currentPercent={0}
                    currentMember={l.currentMember}
                    endMember={l.endMember}
                  />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandList;


