import React, { useState } from 'react';
import { Button, Select, Input, Avatar, LikeIt } from '../../components/ui';
import { LandCard, Tabs, SortTabs } from '../../components/sets';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faSort, faLeaf, faSeedling, faThermometerHalf, faWater, faSun, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import styles from './LandLeaseList.module.css';

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

interface LandLeaseItemProps {
  id: string;
  landName: string;
  landImageUrl?: string | null;
  landOwnerName: string;
  landOwnerImageUrl?: string | null;
  startDatetime: string;
  endDatetime: string;
  addr: string;
  detailAddr: string;
  currentPercent: number;
  currentMember: number;
  endMember: number;
  status: 'recruiting' | 'contracting' | 'completed';
  statusText: string;
  isLiked: boolean;
}

interface LandLeaseListProps {
}

const LandLeaseList: React.FC<LandLeaseListProps> = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  
  // MarketList에서 가져온 상태들
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");

  // Tabs 데이터
  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'recruiting', label: '모집중' },
    { id: 'contracting', label: '계약중' },
    { id: 'completed', label: '계약완료' },
  ];

  // 정렬 옵션 데이터
  const sortOptions = ['최신순', '마감임박순'];

  // 슬라이더 설정
  const settings = {
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
  };

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

  const mockData: LandLeaseItemProps[] = [
    {
      id: '1',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'recruiting',
      statusText: '모집중',
      isLiked: false,
    },
    {
      id: '2',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'contracting',
      statusText: '계약중',
      isLiked: true,
    },
    {
      id: '3',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'completed',
      statusText: '계약완료',
      isLiked: false,
    },
    {
      id: '4',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'recruiting',
      statusText: '모집중',
      isLiked: false,
    },
    {
      id: '5',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'recruiting',
      statusText: '모집중',
      isLiked: false,
    },
    {
      id: '6',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'recruiting',
      statusText: '모집중',
      isLiked: false,
    },
  ];

  const handleSearch = () => {
    console.log('검색:', { searchCategory, searchKeyword });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSortChange = (value: string, index: number) => {
    setSortBy(value);
    console.log('정렬 변경:', value, index);
  };

  // MarketList에서 가져온 함수들
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log("선택된 카테고리:", categoryId);
  };

  const handleSortSelect = (sortId: string) => {
    setSelectedSort(sortId);
    console.log("선택된 정렬:", sortId);
  };

  const handleSearchQuery = () => {
    console.log("검색 실행:", searchQuery);
  };

  const handleFilterToggle = () => {
    console.log("필터 패널 토글");
  };

  const filteredData = activeTab === 'all' 
    ? mockData 
    : mockData.filter(item => item.status === activeTab);

  return (
    <div className={styles.container}>
      {/* Header, MainSlider 영역 */}
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
                    e.key === "Enter" && handleSearchQuery()
                  }
                />
                <Button
                  type="button"
                  className={styles.search_btn}
                  onClick={handleSearchQuery}
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
          </div>
        </div>
      </div>
      
      {/* 계약 카드 목록 */}
      <div className={styles.cards_grid}>
        {filteredData.map((item) => (
          <LandCard
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default LandLeaseList;
