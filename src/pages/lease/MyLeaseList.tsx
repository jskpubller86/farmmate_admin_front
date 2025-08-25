import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./lease.module.css";
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
  status: string;
  price: number;
  area: number;
};

const PAGE_SIZE = 6;

// 더 다양한 더미 데이터 생성
const makeDummy = (pageNum: number, size: number): LandItem[] =>
  Array.from({ length: size }).map((_, i) => {
    const id = (pageNum - 1) * size + i + 1;
    const statuses = ["모집중", "모집완료", "마감임박"];
    const prices = [1000, 2000, 3000, 1500, 2500];
    const areas = [24, 30, 20, 35, 28];
    
    // 각 페이지마다 다양한 상태를 고르게 분배
    const statusIndex = (id - 1) % statuses.length;
    
    return {
      id,
      landName: `땅 내놔는다. ${prices[i % prices.length]} / ${prices[i % prices.length] * 0.5}에 ${areas[i % areas.length]}평`,
      landImageUrl: "/images/fundcard_img.svg",
      landOwnerName: "테스형",
      landOwnerImageUrl: "/images/farmowner_img.svg",
      startDatetime: "2025-05-31T07:00:10",
      endDatetime: "2025-06-01T07:00:10",
      addr: "서울특별시 강남구 삼성로 154 (대치동, 강남구의회, 강남구민회관)",
      detailAddr: "",
      currentMember: 1000,
      endMember: 500,
      status: statuses[statusIndex], // ID 기반으로 고르게 분배
      price: prices[i % prices.length],
      area: areas[i % areas.length]
    };
  });

const MyLeaseList: React.FC = () => {
  const navigate = useNavigate();
  const [lands, setLands] = useState<LandItem[]>([]);
  const [activeTab, setActiveTab] = useState<"my-lease" | "my-rent" | "wish">("my-lease");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("전체");
  const [sortBy, setSortBy] = useState<"latest" | "expiring">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // 무한 스크롤을 위한 ref
  const loadingRef = useRef<HTMLDivElement>(null);

  // 더미 데이터 로딩 (실제 API 호출 시뮬레이션)
  useEffect(() => {
    const loadData = async () => {
      console.log('Loading data for page:', currentPage, 'tab:', activeTab);
      setLoading(true);
      // API 호출 시뮬레이션을 위한 지연
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (currentPage === 1) {
        const newLands = makeDummy(currentPage, PAGE_SIZE);
        setLands(newLands);
        console.log('First page loaded, lands count:', newLands.length);
      } else {
        // 페이지 추가 시 기존 데이터에 새 데이터 추가
        const newLands = makeDummy(currentPage, PAGE_SIZE);
        setLands(prev => {
          const updatedLands = [...prev, ...newLands];
          console.log('Page added, total lands count:', updatedLands.length);
          return updatedLands;
        });
      }
      
      const newHasMore = currentPage < 3;
      setHasMore(newHasMore); // 3페이지까지만 있다고 가정
      console.log('Has more data:', newHasMore);
      setLoading(false);
    };

    loadData();
  }, [currentPage, activeTab]); // activeTab 추가

  // Intersection Observer를 사용한 무한 스크롤
  useEffect(() => {
    console.log('Setting up intersection observer:', { hasMore, loading, currentPage, activeTab });
    
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('Intersection observer triggered:', entries[0].isIntersecting);
        if (entries[0].isIntersecting && hasMore && !loading) {
          console.log('Loading more data, current page:', currentPage);
          setCurrentPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
      console.log('Observer attached to loadingRef');
    } else {
      console.log('loadingRef not found');
    }

    return () => {
      observer.disconnect();
      console.log('Observer disconnected');
    };
  }, [hasMore, loading, currentPage, activeTab]); // activeTab 추가

  // 검색 및 필터링된 데이터
  const filteredLands = useMemo(() => {
    let filtered = lands;

    // 탭별 필터링
    if (activeTab === "my-lease") {
      filtered = filtered.filter(land => land.status === "모집중");
    } else if (activeTab === "my-rent") {
      filtered = filtered.filter(land => land.status === "모집완료");
    } else if (activeTab === "wish") {
      filtered = filtered.filter(land => land.status === "마감임박");
    }

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(land => 
        land.landName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        land.addr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        land.landOwnerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 타입별 필터링
    if (filterType !== "전체") {
      if (filterType === "임대") {
        filtered = filtered.filter(land => land.currentMember < land.endMember);
      } else if (filterType === "임차") {
        filtered = filtered.filter(land => land.currentMember >= land.endMember);
      }
    }

    // 정렬
    if (sortBy === "latest") {
      filtered = [...filtered].sort((a, b) => new Date(b.startDatetime).getTime() - new Date(a.startDatetime).getTime());
    } else if (sortBy === "expiring") {
      filtered = [...filtered].sort((a, b) => new Date(a.endDatetime).getTime() - new Date(b.endDatetime).getTime());
    }

    return filtered;
  }, [lands, activeTab, searchTerm, filterType, sortBy]);

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫 페이지로
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sortType: "latest" | "expiring") => {
    setSortBy(sortType);
  };

  // 탭 변경 시 데이터 리셋
  const handleTabChange = (tab: "my-lease" | "my-rent" | "wish") => {
    console.log('Tab changed to:', tab);
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm("");
    setLands([]); // 기존 데이터 초기화
    setHasMore(true); // hasMore도 리셋
    setLoading(false); // 로딩 상태도 리셋
  };

  return (
    <div className={layout.container_full}>
      <div className={styles.land_container}>
        {/* 탭 + 검색/필터 영역 */}
        <div className={styles.header_area}>
          {/* 상단 탭 */}
          <div className={styles.tab_row}>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "my-lease" ? styles.tab_active : ""}`}
              onClick={() => handleTabChange("my-lease")}
            >
              내 임대
            </button>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "my-rent" ? styles.tab_active : ""}`}
              onClick={() => handleTabChange("my-rent")}
            >
              내 임차
            </button>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "wish" ? styles.tab_active : ""}`}
              onClick={() => handleTabChange("wish")}
            >
              찜한 임대
            </button>
          </div>

          {/* 검색 및 필터 영역 */}
          <div className={styles.filter_row}>
            <Select 
              className={styles.search_sel}
              value={filterType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterType(e.target.value)}
            >
              <option value="전체">전체</option>
              <option value="임대">임대</option>
              <option value="임차">임차</option>
            </Select>
            <Input 
              className={styles.search_input} 
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
            />
            <Button className={styles.search_btn} type="button" onClick={handleSearch}>
              검색
            </Button>
          </div>

          {/* 정렬 옵션 - 검색 필터 바로 아래에 배치 */}
          <div className={styles.sort_options}>
            <button 
              className={`${styles.sort_btn} ${sortBy === "latest" ? styles.sort_btn_active : ""}`}
              onClick={() => handleSortChange("latest")}
            >
              최신순
            </button>
            <button 
              className={`${styles.sort_btn} ${sortBy === "expiring" ? styles.sort_btn_active : ""}`}
              onClick={() => handleSortChange("expiring")}
            >
              마감임박순
            </button>
          </div>
        </div>

        {/* 임대등록 버튼 */}
        <div className={styles.registration_section}>
          <Button
            onClick={() => navigate("/land/registration")}
            className={styles.registration_button}
          >
            임대등록
          </Button>
        </div>

        {/* 카드 그리드 */}
        <section className={styles.cards_area} aria-label="토지 카드 목록">
          {loading && currentPage === 1 ? (
            <div className={styles.loading}>로딩 중...</div>
          ) : filteredLands.length === 0 ? (
            <div className={styles.no_data}>
              {searchTerm ? `"${searchTerm}"에 대한 검색 결과가 없습니다.` : "표시할 데이터가 없습니다."}
            </div>
          ) : (
            <>
              <div className={styles.landlist_grid}>
                {filteredLands.map((l) => (
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
                    currentPercent={Math.round((l.currentMember / l.endMember) * 100)}
                    currentMember={l.currentMember}
                    endMember={l.endMember}
                  />
                ))}
              </div>
              
              {/* 무한 스크롤을 위한 감지 요소 */}
              {hasMore && (
                <div ref={loadingRef} className={styles.scroll_trigger}>
                  {loading && (
                    <div className={styles.loading_more}>
                      <div className={styles.spinner}></div>
                      <span>더 많은 데이터를 불러오는 중...</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyLeaseList;
