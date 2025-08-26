import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./land.module.css";
import layout from "../../layout/layout.module.css";
import { LandCard, SortTabs } from "../../components/sets";
import { Select, Input, Button } from "../../components/ui";

export type LandItem = {
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
  status?: string;
  price?: number;
  area?: number;
};

type TabType = "my-lease" | "my-rent" | "wish";
type SortType = "latest" | "expiring";

const PAGE_SIZE = 6;

// 통합된 더미 데이터 생성 함수
const makeDummy = (pageNum: number, size: number, includeExtendedFields = false): LandItem[] =>
  Array.from({ length: size }).map((_, i) => {
    const id = (pageNum - 1) * size + i + 1;
    const statuses = ["모집중", "모집완료", "마감임박"];
    const prices = [1000, 2000, 3000, 1500, 2500];
    const areas = [24, 30, 20, 35, 28];
    
    const statusIndex = (id - 1) % statuses.length;
    
    const baseItem: LandItem = {
      id,
      landName: includeExtendedFields 
        ? `땅 내놔는다. ${prices[i % prices.length]} / ${prices[i % prices.length] * 0.5}에 ${areas[i % areas.length]}평`
        : `땅 내놔는다. 1000 / 500에 24평`,
      landImageUrl: "/images/fundcard_img.svg",
      landOwnerName: "테스형",
      landOwnerImageUrl: "/images/farmowner_img.svg",
      startDatetime: "2025-05-31T07:00:10",
      endDatetime: "2025-06-01T07:00:10",
      addr: "서울특별시 강남구 삼성로 154 (대치동, 강남구의회, 강남구민회관)",
      detailAddr: "",
      currentMember: includeExtendedFields ? 1000 : 12,
      endMember: includeExtendedFields ? 500 : 24,
    };

    if (includeExtendedFields) {
      return {
        ...baseItem,
        status: statuses[statusIndex],
        price: prices[i % prices.length],
        area: areas[i % areas.length]
      };
    }

    return baseItem;
  });

interface LandLeaseListProps {
  mode?: "land" | "lease"; // 기본 모드 설정
  enableInfiniteScroll?: boolean; // 무한 스크롤 활성화
  showRegistrationButton?: boolean; // 등록 버튼 표시
}

const LandLeaseList: React.FC<LandLeaseListProps> = ({
  mode = "land",
  enableInfiniteScroll = false,
  showRegistrationButton = true
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lands, setLands] = useState<LandItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("전체");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // 무한 스크롤을 위한 ref
  const loadingRef = useRef<HTMLDivElement>(null);

  // URL 경로에 따라 기본 탭 설정
  const getDefaultTab = (): TabType => {
    const pathname = location.pathname;
    if (pathname.includes("/lease") || pathname.includes("/my-lease")) {
      return "my-lease";
    } else if (pathname.includes("/my-rent")) {
      // /land/my-rent 경로에서는 내 임대(my-lease)를 기본값으로 설정
      return "my-lease";
    } else if (pathname.includes("/wish")) {
      return "wish";
    }
    // land 모드에서는 my-lease(내 임대)를 기본값으로 설정
    return mode === "lease" ? "my-lease" : "my-lease";
  };
  
  const [activeTab, setActiveTab] = useState<TabType>(getDefaultTab());

  // URL 변경 시 탭 업데이트
  useEffect(() => {
    setActiveTab(getDefaultTab());
  }, [location.pathname, mode]);

  // 데이터 로딩 함수
  const loadData = async (page: number, reset = false) => {
    setLoading(true);
    
    // API 호출 시뮬레이션을 위한 지연
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const includeExtendedFields = mode === "lease" || enableInfiniteScroll;
    const newLands = makeDummy(page, PAGE_SIZE, includeExtendedFields);
    
    if (reset || page === 1) {
      setLands(newLands);
    } else {
      setLands(prev => [...prev, ...newLands]);
    }
    
    // 무한 스크롤이 활성화된 경우에만 hasMore 설정
    if (enableInfiniteScroll) {
      setHasMore(page < 3); // 3페이지까지만 있다고 가정
    }
    
    setLoading(false);
  };

  // 초기 데이터 로드 및 탭/페이지 변경 시 데이터 로드
  useEffect(() => {
    loadData(currentPage, true);
  }, [activeTab, mode]);

  // 무한 스크롤 페이지 변경 시 데이터 추가 로드
  useEffect(() => {
    if (currentPage > 1 && enableInfiniteScroll) {
      loadData(currentPage, false);
    }
  }, [currentPage]);

  // Intersection Observer를 사용한 무한 스크롤
  useEffect(() => {
    if (!enableInfiniteScroll) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setCurrentPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, enableInfiniteScroll]);

  // 검색 및 필터링된 데이터
  const filteredLands = useMemo(() => {
    let filtered = lands;

    // 탭별 필터링 (확장 필드가 있는 경우에만)
    if (mode === "lease" && lands.length > 0 && lands[0].status) {
      if (activeTab === "my-lease") {
        filtered = filtered.filter(land => land.status === "모집중");
      } else if (activeTab === "my-rent") {
        filtered = filtered.filter(land => land.status === "모집완료");
      } else if (activeTab === "wish") {
        filtered = filtered.filter(land => land.status === "마감임박");
      }
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
  }, [lands, activeTab, searchTerm, filterType, sortBy, mode]);

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1);
    if (enableInfiniteScroll) {
      setLands([]);
      setHasMore(true);
      setLoading(false);
      loadData(1, true);
    }
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sortType: SortType) => {
    setSortBy(sortType);
    setCurrentPage(1);
    setSearchTerm("");
    if (enableInfiniteScroll) {
      setLands([]);
      setHasMore(true);
      setLoading(false);
    }
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm("");
    if (enableInfiniteScroll) {
      setLands([]);
      setHasMore(true);
      setLoading(false);
    }
  };



  return (
    <div className={layout.container_full}>
      <div className={styles.land_container}>
        {/* 탭 + 검색/필터 영역 */}
        <div className={styles.header_area}>
          {/* 상단 탭 - /land/my-rent, /land/wish 경로에서는 표시 */}
          {(location.pathname.includes("/my-rent") || location.pathname.includes("/wish") || mode !== "land") && (
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
          )}

          {/* 검색 및 필터 영역 */}
          <div className={styles.filter_row}>
            <Select 
              className={styles.search_sel}
              value={filterType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
                setSearchTerm("");
                if (enableInfiniteScroll) {
                  setLands([]);
                  setHasMore(true);
                  setLoading(false);
                }
              }}
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

          {/* 정렬 옵션 */}
          {enableInfiniteScroll && (
            <div className={styles.sort_options}>
              <SortTabs
                items={["최신순", "마감임박순"]}
                value={sortBy === "latest" ? "최신순" : "마감임박순"}
                onChange={(value, index) => {
                  handleSortChange(value === "최신순" ? "latest" : "expiring");
                }}
                className={styles.sort_tabs}
              />
            </div>
          )}
        </div>

        {/* 등록 버튼 - /land/my-rent 경로에서는 표시, /land/wish 경로에서는 숨김 */}
        {showRegistrationButton && (location.pathname.includes("/my-rent") || mode !== "land") && (
          <div className={styles.registration_section}>
            {/* wish 탭과 my-rent(내 임차) 탭에서도 임대등록 버튼을 숨김 */}
            {(activeTab === "wish" || activeTab === "my-rent") ? null : (
              <Button
                onClick={() => navigate("/land/registration")}
                className={styles.registration_button}
              >
                임대등록
              </Button>
            )}
          </div>
        )}

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
                    id={l.id.toString()}
                    landName={l.landName}
                    landImageUrl={l.landImageUrl}
                    landOwnerImageUrl={l.landOwnerImageUrl}
                    landOwnerName={l.landOwnerName}
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
              {enableInfiniteScroll && hasMore && (
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

export default LandLeaseList;
