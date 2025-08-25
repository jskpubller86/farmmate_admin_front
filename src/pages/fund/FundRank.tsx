import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./fund.module.css";
import { Button, Badge } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faFire,
  faChartLine,
  faStar,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

type FundRankItem = {
  id: number;
  rank: number;
  fundName: string;
  fundImageUrl?: string | null;
  farmOwnerName: string;
  farmOwnerImageUrl?: string | null;
  category: string;
  currentPercent: number;
  currentMember: number;
  maxMember: number;
  targetAmount: number;
  currentAmount: number;
  startDatetime: string;
  endDatetime: string;
  views: number;
  likes: number;
  performance: "excellent" | "good" | "average" | "poor";
  popularity: number;
  returnRate: number;
};

const FundRank: React.FC = () => {
  const navigate = useNavigate();
  const [funds, setFunds] = useState<FundRankItem[]>([]);
  const [activeTab, setActiveTab] = useState<"performance" | "popularity">(
    "performance"
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rank");

  // 더미 랭킹 데이터 생성
  useEffect(() => {
    const dummyFunds: FundRankItem[] = [
      {
        id: 1,
        rank: 1,
        fundName: "프리미엄 깻잎 펀딩 프로젝트",
        fundImageUrl: "/images/fundcard_img.svg",
        farmOwnerName: "김농부",
        farmOwnerImageUrl: "/images/farmowner_img.svg",
        category: "깻잎",
        currentPercent: 95,
        currentMember: 95,
        maxMember: 100,
        targetAmount: 10000000,
        currentAmount: 9500000,
        startDatetime: "2025-01-01T00:00:00",
        endDatetime: "2025-06-30T23:59:59",
        views: 1250,
        likes: 89,
        performance: "excellent",
        popularity: 98,
        returnRate: 15.2,
      },
      {
        id: 2,
        rank: 2,
        fundName: "유기농 배추 재배 펀딩",
        fundImageUrl: "/images/fundcard_img.svg",
        farmOwnerName: "이농장",
        farmOwnerImageUrl: "/images/farmowner_img.svg",
        category: "배추",
        currentPercent: 88,
        currentMember: 88,
        maxMember: 100,
        targetAmount: 8000000,
        currentAmount: 7040000,
        startDatetime: "2025-01-15T00:00:00",
        endDatetime: "2025-07-15T23:59:59",
        views: 980,
        likes: 76,
        performance: "excellent",
        popularity: 92,
        returnRate: 12.8,
      },
      {
        id: 3,
        rank: 3,
        fundName: "친환경 무 재배 프로젝트",
        fundImageUrl: "/images/fundcard_img.svg",
        farmOwnerName: "박농업",
        farmOwnerImageUrl: "/images/farmowner_img.svg",
        category: "무",
        currentPercent: 82,
        currentMember: 82,
        maxMember: 100,
        targetAmount: 6000000,
        currentAmount: 4920000,
        startDatetime: "2025-02-01T00:00:00",
        endDatetime: "2025-08-01T23:59:59",
        views: 850,
        likes: 65,
        performance: "good",
        popularity: 87,
        returnRate: 11.5,
      },
      {
        id: 4,
        rank: 4,
        fundName: "고품질 사과 재배 펀딩",
        fundImageUrl: "/images/fundcard_img.svg",
        farmOwnerName: "최과수",
        farmOwnerImageUrl: "/images/farmowner_img.svg",
        category: "사과",
        currentPercent: 75,
        currentMember: 75,
        maxMember: 100,
        targetAmount: 12000000,
        currentAmount: 9000000,
        startDatetime: "2025-01-20T00:00:00",
        endDatetime: "2025-09-20T23:59:59",
        views: 720,
        likes: 58,
        performance: "good",
        popularity: 82,
        returnRate: 10.8,
      },
      {
        id: 5,
        rank: 5,
        fundName: "유기농 당근 재배 프로젝트",
        fundImageUrl: "/images/fundcard_img.svg",
        farmOwnerName: "정농부",
        farmOwnerImageUrl: "/images/farmowner_img.svg",
        category: "당근",
        currentPercent: 68,
        currentMember: 68,
        maxMember: 100,
        targetAmount: 5000000,
        currentAmount: 3400000,
        startDatetime: "2025-02-15T00:00:00",
        endDatetime: "2025-08-15T23:59:59",
        views: 650,
        likes: 52,
        performance: "average",
        popularity: 78,
        returnRate: 9.5,
      },
      {
        id: 6,
        rank: 6,
        fundName: "친환경 가지 재배 펀딩",
        fundImageUrl: "/images/fundcard_img.svg",
        farmOwnerName: "한농장",
        farmOwnerImageUrl: "/images/farmowner_img.svg",
        category: "가지",
        currentPercent: 62,
        currentMember: 62,
        maxMember: 100,
        targetAmount: 4000000,
        currentAmount: 2480000,
        startDatetime: "2025-03-01T00:00:00",
        endDatetime: "2025-09-01T23:59:59",
        views: 580,
        likes: 45,
        performance: "average",
        popularity: 73,
        returnRate: 8.9,
      },
    ];
    setFunds(dummyFunds);
  }, []);

  // 카테고리별 필터링
  const filteredFunds = funds.filter(
    (fund) => activeCategory === "all" || fund.category === activeCategory
  );

  // 정렬 함수
  const sortedFunds = [...filteredFunds].sort((a, b) => {
    switch (sortBy) {
      case "rank":
        return a.rank - b.rank;
      case "returnRate":
        return b.returnRate - a.returnRate;
      case "popularity":
        return b.popularity - a.popularity;
      case "currentPercent":
        return b.currentPercent - a.currentPercent;
      case "views":
        return b.views - a.views;
      case "likes":
        return b.likes - a.likes;
      default:
        return a.rank - b.rank;
    }
  });

  // 성과 등급에 따른 색상 및 아이콘
  const getPerformanceInfo = (performance: string) => {
    switch (performance) {
      case "excellent":
        return { color: "#FFD700", icon: faTrophy, label: "최고" };
      case "good":
        return { color: "#C0C0C0", icon: faChartLine, label: "우수" };
      case "average":
        return { color: "#CD7F32", icon: faStar, label: "보통" };
      default:
        return { color: "#6c757d", icon: faStar, label: "일반" };
    }
  };

  // 랭킹 배지 색상
  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "#FFD700"; // 금
    if (rank === 2) return "#C0C0C0"; // 은
    if (rank === 3) return "#CD7F32"; // 동
    return "#6e9556"; // 기본
  };

  // 펀드 상세 페이지로 이동
  const handleFundDetail = (fundId: number) => {
    navigate(`/fund_detail/${fundId}`);
  };

  // 카테고리 목록
  const categories = [
    { id: "all", name: "전체" },
    { id: "깻잎", name: "깻잎" },
    { id: "배추", name: "배추" },
    { id: "무", name: "무" },
    { id: "사과", name: "사과" },
    { id: "당근", name: "당근" },
    { id: "가지", name: "가지" },
  ];

  // 정렬 옵션
  const sortOptions = [
    { value: "rank", label: "랭킹순" },
    { value: "returnRate", label: "수익률순" },
    { value: "popularity", label: "인기도순" },
    { value: "currentPercent", label: "달성률순" },
    { value: "views", label: "조회수순" },
    { value: "likes", label: "좋아요순" },
  ];

  return (
    <div className={styles.fund_rank_container}>
      {/* 헤더 */}
      <div className={styles.rank_header}>
        <div className={styles.header_left}>
          <h1 className={styles.page_title}>
            <FontAwesomeIcon icon={faTrophy} className={styles.title_icon} />
            펀드 랭킹
          </h1>
          <p className={styles.page_subtitle}>
            성과와 인기도를 기반으로 한 최고의 펀드를 만나보세요
          </p>
        </div>
        <div className={styles.header_right}>
          <Button
            className={styles.create_fund_btn}
            onClick={() => navigate("/fund_write")}
            color="point2"
          >
            펀드 생성하기
          </Button>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className={styles.rank_tabs}>
        <button
          className={`${styles.rank_tab} ${
            activeTab === "performance" ? styles.tab_active : ""
          }`}
          onClick={() => setActiveTab("performance")}
        >
          <FontAwesomeIcon icon={faTrophy} />
          성과별 랭킹
        </button>
        <button
          className={`${styles.rank_tab} ${
            activeTab === "popularity" ? styles.tab_active : ""
          }`}
          onClick={() => setActiveTab("popularity")}
        >
          <FontAwesomeIcon icon={faFire} />
          인기도별 랭킹
        </button>
      </div>

      {/* 필터 및 정렬 */}
      <div className={styles.filter_sort_area}>
        <div className={styles.category_filter}>
          <span className={styles.filter_label}>카테고리:</span>
          <div className={styles.category_buttons}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.category_btn} ${
                  activeCategory === category.id ? styles.category_active : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sort_options}>
          <span className={styles.sort_label}>정렬:</span>
          <select
            className={styles.sort_select}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 랭킹 목록 */}
      <div className={styles.rank_list}>
        {sortedFunds.map((fund) => (
          <div key={fund.id} className={styles.rank_item}>
            {/* 랭킹 배지 */}
            <div
              className={styles.rank_badge}
              style={{ backgroundColor: getRankBadgeColor(fund.rank) }}
            >
              {fund.rank}
            </div>

            {/* 펀드 이미지 */}
            <div className={styles.rank_fund_image_container}>
              <img
                src={fund.fundImageUrl || "/images/img_default.svg"}
                alt={fund.fundName}
                className={styles.rank_fund_image}
                onClick={() => handleFundDetail(fund.id)}
              />
            </div>

            {/* 펀드 정보 */}
            <div className={styles.fund_info}>
              <div className={styles.fund_header}>
                <h3
                  className={styles.fund_name}
                  onClick={() => handleFundDetail(fund.id)}
                >
                  {fund.fundName}
                </h3>
                <div className={styles.performance_badge}>
                  <FontAwesomeIcon
                    icon={getPerformanceInfo(fund.performance).icon}
                    style={{
                      color: getPerformanceInfo(fund.performance).color,
                    }}
                  />
                  <span>{getPerformanceInfo(fund.performance).label}</span>
                </div>
              </div>

              {/* 농장주 정보 */}
              <div className={styles.farm_owner_info}>
                <img
                  src={fund.farmOwnerImageUrl || "/images/img_profile.svg"}
                  alt={fund.farmOwnerName}
                  className={styles.farm_owner_avatar}
                />
                <span className={styles.farm_owner_name}>
                  {fund.farmOwnerName}
                </span>
                <span className={styles.category_tag}>{fund.category}</span>
              </div>

              {/* 펀드 통계 */}
              <div className={styles.fund_stats}>
                <div className={styles.stat_row}>
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
                  <div className={styles.stat_item}>
                    <span className={styles.stat_label}>수익률</span>
                    <span className={styles.stat_value}>
                      {fund.returnRate}%
                    </span>
                  </div>
                </div>

                <div className={styles.progress_bar}>
                  <div
                    className={styles.progress_fill}
                    style={{ width: `${fund.currentPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* 인기도 지표 */}
              <div className={styles.popularity_metrics}>
                <div className={styles.metric_item}>
                  <FontAwesomeIcon icon={faEye} />
                  <span>{fund.views.toLocaleString()}</span>
                </div>
                <div className={styles.metric_item}>
                  <FontAwesomeIcon icon={faHeart} />
                  <span>{fund.likes}</span>
                </div>
                <div className={styles.metric_item}>
                  <FontAwesomeIcon icon={faChartLine} />
                  <span>{fund.popularity}</span>
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
            </div>

            {/* 액션 버튼 */}
            <div className={styles.rank_actions}>
              <Button
                className={styles.detail_btn}
                onClick={() => handleFundDetail(fund.id)}
                color="point2"
              >
                상세보기
              </Button>
              <Button
                className={styles.participate_btn}
                onClick={() => handleFundDetail(fund.id)}
                color="secondary"
              >
                참여하기
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 빈 상태 */}
      {sortedFunds.length === 0 && (
        <div className={styles.empty_state}>
          <div className={styles.empty_icon}>🏆</div>
          <h3 className={styles.empty_title}>랭킹 데이터가 없습니다</h3>
          <p className={styles.empty_description}>
            해당 카테고리의 펀드가 없습니다. 다른 카테고리를 선택해보세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default FundRank;
