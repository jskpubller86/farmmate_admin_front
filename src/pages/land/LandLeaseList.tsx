import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./land.module.css";
import { LandCard, SortTabs } from "../../components/sets";
import { Select, Input, Button, Badge } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMapMarkerAlt,
  faFilter,
  faSort,
  faLeaf,
  faSeedling,
  faThermometerHalf,
  faWater,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

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
type SortType =
  | "latest"
  | "expiring"
  | "price_low"
  | "price_high"
  | "area_low"
  | "area_high";

const PAGE_SIZE = 12;

// 상단 카테고리 필터 데이터
const CATEGORIES = [
  { id: "all", name: "전체", icon: faLeaf },
  { id: "vegetables", name: "채소", icon: faSeedling },
  { id: "fruits", name: "과일", icon: faSun },
  { id: "grains", name: "곡물", icon: faThermometerHalf },
  { id: "herbs", name: "허브", icon: faWater },
  { id: "organic", name: "유기농", icon: faLeaf },
  { id: "local", name: "지역특산", icon: faMapMarkerAlt },
];

// 정렬 옵션
const SORT_OPTIONS = [
  { id: "latest", name: "최신순" },
  { id: "expiring", name: "마감임박순" },
  { id: "price_low", name: "가격낮은순" },
  { id: "price_high", name: "가격높은순" },
  { id: "area_low", name: "면적작은순" },
  { id: "area_high", name: "면적큰순" },
];

// 통합된 더미 데이터 생성 함수
const makeDummy = (
  pageNum: number,
  size: number,
  includeExtendedFields = false
): LandItem[] =>
  Array.from({ length: size }).map((_, i) => {
    const id = (pageNum - 1) * size + i + 1;
    const statuses = ["모집중", "모집완료", "마감임박"];
    const prices = [1000, 2000, 3000, 1500, 2500];
    const areas = [24, 30, 20, 35, 28];

    const statusIndex = (id - 1) % statuses.length;

    const baseItem: LandItem = {
      id,
      landName: includeExtendedFields
        ? `땅 내놔는다. ${prices[i % prices.length]} / ${
            prices[i % prices.length] * 0.5
          }에 ${areas[i % areas.length]}평`
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
        area: areas[i % areas.length],
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
  showRegistrationButton = true,
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [areaRange, setAreaRange] = useState({ min: "", max: "" });

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
    await new Promise((resolve) => setTimeout(resolve, 500));

    const includeExtendedFields = mode === "lease" || enableInfiniteScroll;
    const newLands = makeDummy(page, PAGE_SIZE, includeExtendedFields);

    if (reset || page === 1) {
      setLands(newLands);
    } else {
      setLands((prev) => [...prev, ...newLands]);
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
          setCurrentPage((prev) => prev + 1);
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
        filtered = filtered.filter((land) => land.status === "모집중");
      } else if (activeTab === "my-rent") {
        filtered = filtered.filter((land) => land.status === "모집완료");
      } else if (activeTab === "wish") {
        filtered = filtered.filter((land) => land.status === "마감임박");
      }
    }

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(
        (land) =>
          land.landName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          land.addr.toLowerCase().includes(searchTerm.toLowerCase()) ||
          land.landOwnerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 타입별 필터링
    if (filterType !== "전체") {
      if (filterType === "임대") {
        filtered = filtered.filter(
          (land) => land.currentMember < land.endMember
        );
      } else if (filterType === "임차") {
        filtered = filtered.filter(
          (land) => land.currentMember >= land.endMember
        );
      }
    }

    // 정렬
    if (sortBy === "latest") {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(b.startDatetime).getTime() -
          new Date(a.startDatetime).getTime()
      );
    } else if (sortBy === "expiring") {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(a.endDatetime).getTime() - new Date(b.endDatetime).getTime()
      );
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
    <div className={styles.land_container}>
      {/* 헤더 영역 */}
      <div className={styles.header_area}>
        <div className={styles.container}>
          {/* 상단 탭 - /land/my-rent, /land/wish 경로에서는 표시 */}
          {(location.pathname.includes("/my-rent") ||
            location.pathname.includes("/wish") ||
            mode !== "land") && (
            <div className={styles.tab_row}>
              <button
                type="button"
                className={`${styles.tab} ${
                  activeTab === "my-lease" ? styles.tab_active : ""
                }`}
                onClick={() => handleTabChange("my-lease")}
              >
                내 임대
              </button>
              <button
                type="button"
                className={`${styles.tab} ${
                  activeTab === "my-rent" ? styles.tab_active : ""
                }`}
                onClick={() => handleTabChange("my-rent")}
              >
                내 임차
              </button>
              <button
                type="button"
                className={`${styles.tab} ${
                  activeTab === "wish" ? styles.tab_active : ""
                }`}
                onClick={() => handleTabChange("wish")}
              >
                찜한 임대
              </button>
            </div>
          )}

          {/* 임대하기 버튼 */}
          {showRegistrationButton && (
            <div className={styles.rent_button_container}>
              <Button
                className={styles.rent_button}
                onClick={() => navigate("/land/registration")}
              >
                임대하기
              </Button>
            </div>
          )}

          {/* 필터 박스 */}
          <div className={styles.market_filter_box}>
            {/* 카테고리 필터 */}
            <div className={styles.filter_scroll_container}>
              <ul className={styles.market_filter}>
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`${styles.pill} ${
                        selectedCategory === category.id
                          ? styles.pill_active
                          : ""
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <FontAwesomeIcon icon={category.icon} />
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 검색 및 정렬 */}
            <div className={styles.search_sort_row}>
              <div className={styles.search_area}>
                <div className={styles.search_input_wrapper}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={styles.search_icon}
                  />
                  <Input
                    className={styles.search_input}
                    placeholder="땅 이름, 위치, 작물 등을 검색하세요"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchTerm(e.target.value)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      e.key === "Enter" && handleSearch()
                    }
                  />
                </div>
                <Button
                  className={styles.search_btn}
                  type="button"
                  onClick={handleSearch}
                >
                  검색
                </Button>
              </div>

              <div className={styles.sort_area}>
                <Select
                  className={styles.sort_select}
                  value={sortBy}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleSortChange(e.target.value as SortType)
                  }
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* 고급 필터 */}
            <div className={styles.advanced_filters}>
              <button
                className={styles.filter_toggle_btn}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FontAwesomeIcon icon={faFilter} />
                고급 필터
              </button>

              {showFilters && (
                <div className={styles.filter_panel}>
                  <div className={styles.filter_group}>
                    <label>가격 범위</label>
                    <div className={styles.range_inputs}>
                      <Input
                        type="number"
                        placeholder="최소"
                        value={priceRange.min}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPriceRange({ ...priceRange, min: e.target.value })
                        }
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="최대"
                        value={priceRange.max}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPriceRange({ ...priceRange, max: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.filter_group}>
                    <label>면적 범위</label>
                    <div className={styles.range_inputs}>
                      <Input
                        type="number"
                        placeholder="최소"
                        value={areaRange.min}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setAreaRange({ ...areaRange, min: e.target.value })
                        }
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="최대"
                        value={areaRange.max}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setAreaRange({ ...areaRange, max: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 카드 영역 */}
      <div className={styles.cards_area}>
        <div className={styles.container}>
          <div className={styles.landlist_grid}>
            {filteredLands.map((land) => (
              <LandCard
                key={`land-${land.id}`}
                id={land.id.toString()}
                landName={land.landName}
                landImageUrl={land.landImageUrl}
                landOwnerImageUrl={land.landOwnerImageUrl}
                landOwnerName={land.landOwnerName}
                startDatetime={land.startDatetime}
                endDatetime={land.endDatetime}
                addr={land.addr}
                detailAddr={land.detailAddr}
                currentPercent={Math.round(
                  (land.currentMember / land.endMember) * 100
                )}
                currentMember={land.currentMember}
                endMember={land.endMember}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className={styles.loading_container}>
          <p>로딩 중...</p>
        </div>
      )}

      {/* 무한 스크롤 감지 */}
      {enableInfiniteScroll && hasMore && (
        <div ref={loadingRef} className={styles.loading_ref} />
      )}
    </div>
  );
};

export default LandLeaseList;
