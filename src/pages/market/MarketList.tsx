import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import styles from "./market.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select } from "../../components/ui";
import { MarketCard } from "../../components/sets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMapMarkerAlt,
  faLeaf,
  faSeedling,
  faThermometerHalf,
  faWater,
  faSun,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

// 한번에 가져올 상품 카드 개수
const PAGE_SIZE = 12;
// 전체 아이템 수 (더미 데이터용)
const TOTAL_ITEMS = 150;
// 전체 페이지 수 (더미 데이터용)
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE);

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
  { id: "price_low", name: "가격낮은순" },
  { id: "price_high", name: "가격높은순" },
  { id: "rating", name: "평점순" },
  { id: "popular", name: "인기순" },
  { id: "distance", name: "거리순" },
];

type MarketItem = {
  id: number;
  productName: string;
  productImage: string;
  sellerImage: string;
  sellerName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  location: string;
  category: string;
  isOrganic: boolean;
  isLocal: boolean;
  stock: number;
  unit: string;
  description: string;
  createdAt: string;
  isLiked: boolean;
  distance?: number;
  deliveryOption?: string;
  minOrder?: number;
};

const MarketList: React.FC = () => {
  // 훅 / 상태 선언
  const [products, setProducts] = useState<MarketItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("all");
  const [selectedDistance, setSelectedDistance] = useState("all");

  // 스크롤 관련 refs
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const settings = useMemo(
    () => ({
      fade: true,
      waitForAnimate: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      accessibility: false,
      pauseOnHover: false,
      pauseOnFocus: false,
      swipeToSlide: true,
      touchMove: true,
    }),
    []
  );

  // 홈 화면 슬라이더 더미 데이터
  const bannerData = [
    {
      id: 1,
      img: "/images/xcb0.jpg",
      title: "신선한 농산물을 직접 만나보세요",
      subtitle: "농장에서 바로 전달되는 최고 품질의 농산물",
    },
    {
      id: 2,
      img: "/images/xcb1.jpg",
      title: "지역 특산품 특별전",
      subtitle: "전국 각지의 특별한 농산물을 만나보세요",
    },
    {
      id: 3,
      img: "/images/xcb2.jpg",
      title: "유기농 인증 제품",
      subtitle: "건강한 식탁을 위한 엄선된 유기농 제품",
    },
  ];

  // 더미 데이터 생성기
  const makeDummy = useCallback(
    (pageNum: number, size: number): MarketItem[] => {
      return Array.from({ length: size }).map((_, i) => {
        const id = (pageNum - 1) * size + i + 1;
        const categories = ["채소", "과일", "곡물", "허브"];
        const locations = ["경기도", "충청도", "전라도", "경상도", "강원도"];
        const units = ["kg", "개", "포기", "봉", "팩"];
        const deliveryOptions = ["직접방문", "배송", "픽업"];

        return {
          id,
          productName: `신선한 ${
            categories[i % categories.length]
          } 제품 ${id}호`,
          productImage: "/images/fundcard_img.svg",
          sellerImage: "/images/farmowner_img.svg",
          sellerName: `농장주 ${id}호`,
          price: Math.floor(Math.random() * 50000) + 5000,
          originalPrice:
            Math.random() > 0.7
              ? Math.floor(Math.random() * 80000) + 10000
              : undefined,
          rating: Math.floor(Math.random() * 5) + 1,
          reviewCount: Math.floor(Math.random() * 100) + 10,
          location: locations[i % locations.length],
          category: categories[i % categories.length],
          isOrganic: Math.random() > 0.6,
          isLocal: Math.random() > 0.5,
          stock: Math.floor(Math.random() * 50) + 10,
          unit: units[i % units.length],
          description: "농장에서 직접 재배한 신선하고 맛있는 농산물입니다.",
          createdAt: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          isLiked: Math.random() > 0.7,
          distance: Math.floor(Math.random() * 50) + 1,
          deliveryOption: deliveryOptions[i % deliveryOptions.length],
          minOrder: Math.floor(Math.random() * 20000) + 5000,
        };
      });
    },
    []
  );

  /** 상품 로딩 */
  const fetchProducts = useCallback(
    async (pageNum: number, append = false) => {
      if (isLoadingRef.current) return;

      isLoadingRef.current = true;
      setIsFetching(true);

      try {
        // 로딩 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 200));

        const offset = (pageNum - 1) * PAGE_SIZE;
        const remain = Math.max(TOTAL_ITEMS - offset, 0);
        const size = Math.min(PAGE_SIZE, remain);
        const pageData = size > 0 ? makeDummy(pageNum, size) : [];

        setProducts((prev) => (append ? [...prev, ...pageData] : pageData));

        // 다음 로딩 가능 여부
        if (pageNum >= TOTAL_PAGES || size < PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("상품 로딩 중 오류:", error);
      } finally {
        setIsFetching(false);
        isLoadingRef.current = false;
      }
    },
    [makeDummy]
  );

  // 초기 로딩
  useEffect(() => {
    // 페이지 로드 시 스크롤 위치 초기화
    window.scrollTo(0, 0);
    fetchProducts(1, false);
  }, [fetchProducts]);

  // 무한 스크롤 (개선된 버전)
  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          hasMore &&
          !isFetching &&
          !isLoadingRef.current
        ) {
          const nextPage = page + 1;
          if (nextPage <= TOTAL_PAGES) {
            setPage(nextPage);
            fetchProducts(nextPage, true);
          } else {
            setHasMore(false);
          }
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isFetching, page, fetchProducts]);

  const navigate = useNavigate();

  // ===== 클릭 이벤트 함수들 (주석처리) =====

  // 상품 등록 페이지로 이동
  const handleCreateProduct = () => {
    navigate("/market_write");
  };

  // 카테고리 선택
  const handleCategorySelect = (categoryId: string) => {
    // TODO: 카테고리별 필터링 로직
    setSelectedCategory(categoryId);
    console.log("선택된 카테고리:", categoryId);
    // 여기에 실제 필터링 로직 추가
  };

  // 정렬 옵션 선택
  const handleSortSelect = (sortId: string) => {
    // TODO: 정렬 로직
    setSelectedSort(sortId);
    console.log("선택된 정렬:", sortId);
    // 여기에 실제 정렬 로직 추가
  };

  // 검색 실행
  const handleSearch = () => {
    // TODO: 검색 로직
    console.log("검색 실행:", searchQuery);
    // 여기에 실제 검색 로직 추가
  };

  // 가격 범위 필터 적용
  const handlePriceFilter = () => {
    // TODO: 가격 필터 로직
    console.log("가격 범위 필터:", priceRange);
    // 여기에 실제 가격 필터 로직 추가
  };

  // 좋아요 토글
  const handleLikeToggle = (productId: number) => {
    // TODO: 좋아요 API 호출
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, isLiked: !product.isLiked }
          : product
      )
    );
    console.log("좋아요 토글:", productId);
    // 여기에 실제 좋아요 API 호출 로직 추가
  };

  // 장바구니 추가
  const handleAddToCart = (productId: number) => {
    // TODO: 장바구니 추가 로직
    console.log("장바구니 추가:", productId);
    // 여기에 실제 장바구니 추가 로직 추가
  };

  // 필터 토글
  const handleFilterToggle = () => {
    // TODO: 필터 패널 토글
    setShowFilters(!showFilters);
    console.log("필터 패널 토글:", !showFilters);
  };

  // 배송 옵션 선택
  const handleDeliveryOptionSelect = (option: string) => {
    // TODO: 배송 옵션 필터링
    setSelectedDeliveryOption(option);
    console.log("선택된 배송 옵션:", option);
    // 여기에 실제 배송 옵션 필터링 로직 추가
  };

  // 거리 기준 선택
  const handleDistanceSelect = (distance: string) => {
    // TODO: 거리 기준 필터링
    setSelectedDistance(distance);
    console.log("선택된 거리 기준:", distance);
    // 여기에 실제 거리 기준 필터링 로직 추가
  };

  // 필터 초기화
  const handleResetFilters = () => {
    // TODO: 모든 필터 초기화
    setSelectedCategory("all");
    setSelectedSort("latest");
    setSearchQuery("");
    setPriceRange({ min: "", max: "" });
    setSelectedDeliveryOption("all");
    setSelectedDistance("all");
    console.log("필터 초기화");
    // 여기에 실제 필터 초기화 로직 추가
  };

  // ===== 유틸리티 함수들 =====
  // (MarketCard 컴포넌트로 이동됨)

  return (
    <div className={styles.market_container}>
      {/* 상단 슬라이더 컨테이너 + 검색 / 필터 - 고정 영역 */}
      <div className={styles.header_area}>
        <div className={styles.container}>
          <div className={styles.main_slider}>
            <Slider {...settings}>
              {bannerData.map((banner, idx) => (
                <div key={`slide-${banner.id}-${idx}`}>
                  <div className={styles.main_slide}>
                    <div className={styles.slide_content}>
                      <h2>{banner.title}</h2>
                      <p>{banner.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* 필터 + 검색 */}
          <div className={styles.market_filter_box}>
            {/* 카테고리 필터 */}
            <div className={styles.filter_scroll_container}>
              <ul className={styles.market_filter}>
                {CATEGORIES.map((category) => (
                  <li
                    key={category.id}
                    className={`${styles.pill} ${
                      selectedCategory === category.id ? styles.pill_active : ""
                    }`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <FontAwesomeIcon
                      icon={category.icon}
                      className={styles.pill_icon}
                    />
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* 검색 및 정렬 */}
            <div className={styles.search_sort_row}>
              <div className={styles.search_section}>
                <Select
                  className={styles.search_category}
                  value={selectedCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedCategory(e.target.value)
                  }
                >
                  {CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <Input
                  className={styles.search_input}
                  placeholder="상품명, 판매자명을 검색하세요"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    e.key === "Enter" && handleSearch()
                  }
                />
                <Button
                  type="button"
                  className={styles.search_btn}
                  onClick={handleSearch}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </div>

              <div className={styles.sort_section}>
                <Select
                  className={styles.sort_select}
                  value={selectedSort}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleSortSelect(e.target.value)
                  }
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Select>
                <Button
                  type="button"
                  className={styles.filter_toggle_btn}
                  onClick={handleFilterToggle}
                >
                  <FontAwesomeIcon icon={faFilter} />
                  필터
                </Button>
              </div>
            </div>

            {/* 확장된 필터 패널 */}
            {showFilters && (
              <div className={styles.extended_filters}>
                {/* 가격 범위 필터 */}
                <div className={styles.price_filter}>
                  <span>가격 범위:</span>
                  <Input
                    type="number"
                    className={styles.price_input}
                    placeholder="최소가"
                    value={priceRange.min}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                  />
                  <span>~</span>
                  <Input
                    type="number"
                    className={styles.price_input}
                    placeholder="최대가"
                    value={priceRange.max}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                  />
                  <Button
                    type="button"
                    className={styles.price_filter_btn}
                    onClick={handlePriceFilter}
                  >
                    적용
                  </Button>
                </div>

                {/* 배송 옵션 필터 */}
                <div className={styles.delivery_filter}>
                  <span>배송 옵션:</span>
                  <div className={styles.delivery_options}>
                    {["all", "직접방문", "배송", "픽업"].map((option) => (
                      <button
                        key={option}
                        className={`${styles.delivery_option} ${
                          selectedDeliveryOption === option
                            ? styles.delivery_option_active
                            : ""
                        }`}
                        onClick={() => handleDeliveryOptionSelect(option)}
                      >
                        {option === "all" ? "전체" : option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 거리 기준 필터 */}
                <div className={styles.distance_filter}>
                  <span>거리 기준:</span>
                  <div className={styles.distance_options}>
                    {["all", "5km", "10km", "20km", "50km"].map((distance) => (
                      <button
                        key={distance}
                        className={`${styles.distance_option} ${
                          selectedDistance === distance
                            ? styles.distance_option_active
                            : ""
                        }`}
                        onClick={() => handleDistanceSelect(distance)}
                      >
                        {distance === "all" ? "전체" : distance}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 필터 초기화 버튼 */}
                <div className={styles.filter_actions}>
                  <Button
                    type="button"
                    className={styles.reset_filter_btn}
                    onClick={handleResetFilters}
                  >
                    필터 초기화
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 상품 카드 그리드 영역 - 스크롤 가능 */}
      <section className={styles.cards_scroll} aria-label="농산물 상품 목록">
        <div className={styles.product_grid}>
          {products.length === 0
            ? Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`placeholder-${i}`}
                  className={styles.product_card_placeholder}
                >
                  <div className={styles.placeholder_image}></div>
                  <div className={styles.placeholder_content}>
                    <div className={styles.placeholder_title}></div>
                    <div className={styles.placeholder_price}></div>
                  </div>
                </div>
              ))
            : products.map((product) => (
                <MarketCard key={`product-${product.id}`} {...product} />
              ))}
        </div>

        {/* sentinel & 로더 */}
        {hasMore && (
          <div
            ref={sentinelRef}
            className={styles.sentinel}
            style={{ height: "50px", margin: "2rem 0" }}
          />
        )}
        {isFetching && (
          <div className={styles.loader}>
            <div className={styles.loader_spinner}></div>
            상품을 불러오는 중…
          </div>
        )}
      </section>

      {/* 플로팅 액션 버튼 - 상품 등록 */}
      <button
        className={styles.floating_action_button}
        onClick={handleCreateProduct}
        aria-label="상품 등록하기"
        title="상품 등록하기"
      >
        <span className={styles.fab_icon}>+</span>
      </button>
    </div>
  );
};

export default MarketList;
