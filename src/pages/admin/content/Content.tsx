import React, { useState } from 'react';
import { Button, Badge } from "../../../components/ui";
import styles from "./content.module.css";
import { SortTabs, Tabs } from '../../../components/sets';

const Content: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("리뷰후기모니터링");
  const [selectedReviewFilter, setSelectedReviewFilter] = useState<string>("전체");
  const [selectedPostFilter, setSelectedPostFilter] = useState<string>("전체");
  const [selectedAdFilter, setSelectedAdFilter] = useState<string>("전체");

  // 리뷰/후기 모니터링 데이터
  const reviews = [
    {
      id: 1,
      type: "리뷰",
      productName: "유기농 토마토",
      seller: "김농부",
      reviewer: "이구매자",
      rating: 5,
      content: "정말 신선하고 맛있어요! 다음에도 주문할게요.",
      status: "승인",
      reportedAt: "2024.02.15",
      reportReason: null
    },
    {
      id: 2,
      type: "후기",
      productName: "친환경 상추",
      seller: "박재배자",
      reviewer: "최소비자",
      rating: 2,
      content: "품질이 별로네요. 기대했던 것과 달라요.",
      status: "대기",
      reportedAt: "2024.02.14",
      reportReason: null
    },
    {
      id: 3,
      type: "리뷰",
      productName: "무농약 당근",
      seller: "정농부",
      reviewer: "한구매자",
      rating: 1,
      content: "이런 쓰레기를 팔다니! 사기꾼들!",
      status: "신고",
      reportedAt: "2024.02.13",
      reportReason: "욕설"
    }
  ];

  // 게시글/댓글 관리 데이터
  const posts = [
    {
      id: 1,
      type: "게시글",
      title: "농업 기술 공유합니다",
      author: "김농부",
      content: "새로운 재배 기술에 대해 공유하고 싶습니다...",
      category: "농업정보",
      status: "승인",
      createdAt: "2024.02.15",
      viewCount: 45,
      likeCount: 12,
      commentCount: 8
    },
    {
      id: 2,
      type: "댓글",
      title: "토마토 재배 관련 질문",
      author: "이재배자",
      content: "토마토 재배할 때 주의사항이 뭔가요?",
      category: "질문답변",
      status: "대기",
      createdAt: "2024.02.14",
      viewCount: 0,
      likeCount: 0,
      commentCount: 0
    },
    {
      id: 3,
      type: "게시글",
      title: "이런 사기꾼들 때문에...",
      author: "박불만족",
      content: "정말 화가 나네요. 이런 사기꾼들을 어떻게 해야 할까요?",
      category: "불만사항",
      status: "신고",
      createdAt: "2024.02.13",
      viewCount: 23,
      likeCount: 3,
      commentCount: 15,
      reportReason: "욕설 및 비방"
    }
  ];

  // 광고/프로모션 관리 데이터
  const advertisements = [
    {
      id: 1,
      type: "광고",
      title: "신선한 유기농 채소 특가",
      advertiser: "김농부",
      content: "이번 주 특별 할인! 유기농 채소 30% 할인",
      category: "상품광고",
      status: "진행중",
      startDate: "2024.02.15",
      endDate: "2024.02.22",
      budget: 500000,
      clicks: 1234,
      impressions: 5678
    },
    {
      id: 2,
      type: "프로모션",
      title: "신규 농부 환영 이벤트",
      advertiser: "Farm Mate",
      content: "신규 가입 농부분들께 특별 혜택을 드립니다!",
      category: "이벤트",
      status: "대기",
      startDate: "2024.02.20",
      endDate: "2024.03.20",
      budget: 1000000,
      clicks: 0,
      impressions: 0
    },
    {
      id: 3,
      type: "광고",
      title: "토지 임대 특가",
      advertiser: "박토지주",
      content: "경기도 최고의 농지 임대합니다!",
      category: "토지광고",
      status: "종료",
      startDate: "2024.01.15",
      endDate: "2024.02.15",
      budget: 300000,
      clicks: 567,
      impressions: 2345
    }
  ];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setSelectedReviewFilter("전체");
    setSelectedPostFilter("전체");
    setSelectedAdFilter("전체");
  };

  const getFilteredData = () => {
    if (selectedSort === "리뷰후기모니터링") {
      let filtered = reviews;
      if (selectedReviewFilter === "승인") {
        filtered = filtered.filter(item => item.status === "승인");
      } else if (selectedReviewFilter === "대기") {
        filtered = filtered.filter(item => item.status === "대기");
      } else if (selectedReviewFilter === "신고") {
        filtered = filtered.filter(item => item.status === "신고");
      }
      return filtered;
    } else if (selectedSort === "게시글댓글관리") {
      let filtered = posts;
      if (selectedPostFilter === "승인") {
        filtered = filtered.filter(item => item.status === "승인");
      } else if (selectedPostFilter === "대기") {
        filtered = filtered.filter(item => item.status === "대기");
      } else if (selectedPostFilter === "신고") {
        filtered = filtered.filter(item => item.status === "신고");
      }
      return filtered;
    } else if (selectedSort === "광고프로모션관리") {
      let filtered = advertisements;
      if (selectedAdFilter === "진행중") {
        filtered = filtered.filter(item => item.status === "진행중");
      } else if (selectedAdFilter === "대기") {
        filtered = filtered.filter(item => item.status === "대기");
      } else if (selectedAdFilter === "종료") {
        filtered = filtered.filter(item => item.status === "종료");
      }
      return filtered;
    }
    return [];
  };

  const currentData = getFilteredData();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ko-KR') + '원';
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.maxWidth}>
          {/* 헤더 */}
          <div className={styles.header}>
            <h1 className={styles.title}>📢 컨텐츠 관리</h1>
            <p className={styles.subtitle}>리뷰/후기 모니터링, 게시글/댓글 관리, 광고/프로모션을 관리하세요</p>
          </div>

          {/* 통계 카드 */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>리뷰 대기</h3>
                <Button size="sm" color="point" disabled>⭐</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{reviews.filter(r => r.status === "대기").length}</div>
                <p className={styles.description}>승인 대기 중인 리뷰</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>게시글 신고</h3>
                <Button size="sm" color="danger" disabled>🚨</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{posts.filter(p => p.status === "신고").length}</div>
                <p className={styles.description}>신고된 게시글/댓글</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>진행중 광고</h3>
                <Button size="sm" color="point2" disabled>📢</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{advertisements.filter(a => a.status === "진행중").length}</div>
                <p className={styles.description}>진행중인 광고/프로모션</p>
              </div>
            </div>
          </div>

          {/* 검색 및 액션 */}
          <div className={styles.searchCard}>
            <div className={styles.searchContent}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInput}>
                  <Tabs 
                    tabs={[
                      { id: "리뷰후기모니터링", label: "리뷰/후기 모니터링" },
                      { id: "게시글댓글관리", label: "게시글/댓글 관리" },
                      { id: "광고프로모션관리", label: "광고/프로모션 관리" }
                    ]}
                    defaultActiveTab={selectedSort}
                    onTabChange={handleSortChange}
                  />
                  
                  {/* 세부 필터링 */}
                  {selectedSort === "리뷰후기모니터링" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "승인", "대기", "신고"]}
                        value={selectedReviewFilter}
                        onChange={(value) => setSelectedReviewFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "게시글댓글관리" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "승인", "대기", "신고"]}
                        value={selectedPostFilter}
                        onChange={(value) => setSelectedPostFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "광고프로모션관리" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "진행중", "대기", "종료"]}
                        value={selectedAdFilter}
                        onChange={(value) => setSelectedAdFilter(value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 데이터 목록 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>컨텐츠 목록</h3>
              <p className={styles.cardDescription}>
                {selectedSort === "리뷰후기모니터링" && (
                  selectedReviewFilter === "전체" 
                    ? "리뷰/후기 모니터링 목록" 
                    : `${selectedReviewFilter} 리뷰/후기 목록`
                )}
                {selectedSort === "게시글댓글관리" && (
                  selectedPostFilter === "전체" 
                    ? "게시글/댓글 관리 목록" 
                    : `${selectedPostFilter} 게시글/댓글 목록`
                )}
                {selectedSort === "광고프로모션관리" && (
                  selectedAdFilter === "전체" 
                    ? "광고/프로모션 관리 목록" 
                    : `${selectedAdFilter} 광고/프로모션 목록`
                )}
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.dataList}>
                {currentData.map((item: any) => (
                  <div key={item.id} className={styles.dataItem}>
                    <div className={styles.dataInfo}>
                      <h4 className={styles.dataTitle}>
                        {selectedSort === "리뷰후기모니터링" ? item.productName :
                         selectedSort === "게시글댓글관리" ? item.title :
                         item.title}
                      </h4>
                      <p className={styles.dataSubtitle}>
                        {selectedSort === "리뷰후기모니터링" ? `${item.seller} → ${item.reviewer} | ${item.type}` :
                         selectedSort === "게시글댓글관리" ? `${item.author} | ${item.type} | ${item.category}` :
                         `${item.advertiser} | ${item.type} | ${item.category}`}
                      </p>
                      {selectedSort === "리뷰후기모니터링" && (
                        <div className={styles.reviewContent}>
                          <p className={styles.rating}>평점: {renderStars(item.rating)} ({item.rating}/5)</p>
                          <p className={styles.reviewText}>"{item.content}"</p>
                        </div>
                      )}
                      {selectedSort === "게시글댓글관리" && (
                        <div className={styles.postContent}>
                          <p className={styles.postText}>"{item.content}"</p>
                          <p className={styles.postStats}>
                            조회: {item.viewCount} | 좋아요: {item.likeCount} | 댓글: {item.commentCount}
                          </p>
                        </div>
                      )}
                      {selectedSort === "광고프로모션관리" && (
                        <div className={styles.adContent}>
                          <p className={styles.adText}>"{item.content}"</p>
                          <p className={styles.adStats}>
                            예산: {formatCurrency(item.budget)} | 클릭: {item.clicks} | 노출: {item.impressions}
                          </p>
                          <p className={styles.adPeriod}>
                            기간: {item.startDate} ~ {item.endDate}
                          </p>
                        </div>
                      )}
                      {item.reportReason && (
                        <p className={styles.reportReason}>
                          신고사유: {item.reportReason}
                        </p>
                      )}
                    </div>
                    <div className={styles.dataStatus}>
                      <Badge 
                        size="sm" 
                        color={
                          item.status === "승인" || item.status === "진행중" ? "point" : 
                          item.status === "대기" ? "secondary" : 
                          item.status === "신고" ? "danger" : "point3"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className={styles.dataActions}>
                      <Button size="sm" color="point">
                        상세보기
                      </Button>
                      {item.status === "대기" && (
                        <>
                          <Button size="sm" color="point2">
                            승인
                          </Button>
                          <Button size="sm" color="danger">
                            거절
                          </Button>
                        </>
                      )}
                      {item.status === "신고" && (
                        <Button size="sm" color="danger">
                          삭제
                        </Button>
                      )}
                      {selectedSort === "광고프로모션관리" && item.status === "대기" && (
                        <Button size="sm" color="point2">
                          승인
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;