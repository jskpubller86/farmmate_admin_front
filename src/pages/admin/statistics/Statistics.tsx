import React, { useState } from 'react';
import { Button } from "../../../components/ui";
import styles from "./statistics.module.css";
import { SortTabs, Tabs } from '../../../components/sets';

const Statistics: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("유저 통계");


  const [selectedAnomalyFilter, setSelectedAnomalyFilter] = useState<string>("전체");

  // 샘플 유저 통계 데이터
  const userStats = [
    {
      id: 1,
      period: "2024년 2월",
      totalUsers: 2847,
      newUsers: 156,
      activeUsers: 2156,
      inactiveUsers: 691,
      userGrowth: "+5.8%"
    },
    {
      id: 2,
      period: "2024년 1월",
      totalUsers: 2691,
      newUsers: 134,
      activeUsers: 2034,
      inactiveUsers: 657,
      userGrowth: "+4.2%"
    }
  ];

  // 샘플 거래 통계 데이터
  const transactionStats = [
    {
      id: 1,
      period: "2024년 2월",
      totalTransactions: 1336,
      productTransactions: 1247,
      landTransactions: 89,
      totalRevenue: 18500000,
      averageTransaction: 13847,
      region: "전국"
    },
    {
      id: 2,
      period: "2024년 1월",
      totalTransactions: 1156,
      productTransactions: 1089,
      landTransactions: 67,
      totalRevenue: 16200000,
      averageTransaction: 14014,
      region: "전국"
    }
  ];



  // 샘플 이상 거래 감지 데이터 (개선된 구조)
  const anomalies = [
    {
      id: 1,
      type: "농산물",
      itemName: "유기농 토마토",
      seller: "김농부",
      anomalyType: "가격 이상",
      description: "평균 가격 대비 300% 높은 가격",
      riskLevel: "높음",
      detectedAt: "2024.02.15",
      reportId: "RPT-001",
      actionTaken: "게시물 가리기 + 경고 조치"
    },
    {
      id: 2,
      type: "토지",
      itemName: "경기도 밭",
      owner: "박토지주",
      anomalyType: "거래 빈도 이상",
      description: "24시간 내 10회 이상 거래 시도",
      riskLevel: "중간",
      detectedAt: "2024.02.14",
      reportId: "RPT-002",
      actionTaken: "조치 대기"
    },
    {
      id: 3,
      type: "농산물",
      itemName: "친환경 상추",
      seller: "이재배자",
      anomalyType: "품질 이상",
      description: "신선하지 않은 상품을 신선하다고 표시",
      riskLevel: "낮음",
      detectedAt: "2024.02.13",
      reportId: "RPT-003",
      actionTaken: "조치 대기"
    }
  ];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setSelectedAnomalyFilter("전체");
  };

  // 게시물 가리기 핸들러
  const handleHidePost = (anomalyId: number) => {
    if (window.confirm('이 게시물을 가리시겠습니까?')) {
      alert('게시물이 가려졌습니다.');
      // 실제로는 API 호출로 게시물 가리기 처리
    }
  };

  const getFilteredData = () => {
    if (selectedSort === "유저 통계") {
      return userStats;
    } else if (selectedSort === "거래 통계") {
      return transactionStats;
    } else if (selectedSort === "이상 거래 감지") {
      let filtered = anomalies;
      if (selectedAnomalyFilter === "높음") {
        filtered = filtered.filter(item => item.riskLevel === "높음");
      } else if (selectedAnomalyFilter === "중간") {
        filtered = filtered.filter(item => item.riskLevel === "중간");
      } else if (selectedAnomalyFilter === "낮음") {
        filtered = filtered.filter(item => item.riskLevel === "낮음");
      }
      return filtered;
    }
    return [];
  };

  const currentData = getFilteredData();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ko-KR') + '원';
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.maxWidth}>
          {/* 헤더 */}
          <div className={styles.header}>
            <h1 className={styles.title}>통계 / 리포트</h1>
            <p className={styles.subtitle}>유저 통계, 거래 통계, 이상 거래를 분석하고 모니터링하세요</p>
          </div>

          {/* 통계 카드 */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>총 유저 수</h3>
                <Button size="sm" color="point" disabled>👥</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{userStats[0].totalUsers.toLocaleString()}</div>
                <p className={styles.description}>현재 등록된 유저</p>
                <div className={styles.subStats}>
                  <span className={styles.subStat}>신규: {userStats[0].newUsers}</span>
                  <span className={styles.subStat}>활성: {userStats[0].activeUsers}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>총 거래 건수</h3>
                <Button size="sm" color="point2" disabled>💰</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{transactionStats[0].totalTransactions.toLocaleString()}</div>
                <p className={styles.description}>이번 달 거래</p>
                <div className={styles.subStats}>
                  <span className={styles.subStat}>농산물: {transactionStats[0].productTransactions}</span>
                  <span className={styles.subStat}>토지: {transactionStats[0].landTransactions}</span>
                </div>
              </div>
            </div>
            
            {/* <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>총 매출</h3>
                <Button size="sm" color="point3" disabled>📊</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{formatCurrency(transactionStats[0].totalRevenue)}</div>
                <p className={styles.description}>이번 달 매출</p>
                <div className={styles.subStats}>
                  <span className={styles.subStat}>평균: {formatCurrency(transactionStats[0].averageTransaction)}</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* 검색 및 액션 */}
          <div className={styles.searchCard}>
            <div className={styles.searchContent}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInput}>
                  <Tabs 
                    tabs={[
                      { id: "유저 통계", label: "유저 통계" },
                      { id: "거래 통계", label: "거래 통계" },
                      { id: "이상 거래 감지", label: "이상 거래 감지" }
                    ]}
                    defaultActiveTab={selectedSort}
                    onTabChange={handleSortChange}
                  />
                  
                  {/* 세부 필터링 */}
                  {selectedSort === "이상 거래 감지" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "높음", "중간", "낮음"]}
                        value={selectedAnomalyFilter}
                        onChange={(value) => setSelectedAnomalyFilter(value)}
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
              <h3 className={styles.cardTitle}>데이터 목록</h3>
              <p className={styles.cardDescription}>
                {selectedSort === "유저 통계" && "유저 통계 목록"}
                {selectedSort === "거래 통계" && "거래 통계 목록"}
                {selectedSort === "이상 거래 감지" && (
                  selectedAnomalyFilter === "전체" 
                    ? "이상 거래 감지 목록" 
                    : `${selectedAnomalyFilter} 위험도 목록`
                )}
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      {selectedSort === "이상 거래 감지" ? (
                        <>
                          <th>항목명</th>
                          <th>위험도</th>
                          <th>상세 정보</th>
                          <th>감지 시간</th>
                          <th>조치 내용</th>
                          <th>액션</th>
                        </>
                      ) : (
                        <>
                          <th>기간</th>
                          <th>주요 지표</th>
                          <th>상세 정보</th>
                          <th>성장률/변화</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((item: any) => (
                      <tr key={item.id} className={styles.tableRow}>
                        {selectedSort === "이상 거래 감지" ? (
                          <>
                            <td>
                              <div className={styles.itemInfo}>
                                <div className={styles.itemName}>{item.itemName}</div>
                                <div className={styles.itemType}>{item.type}</div>
                              </div>
                            </td>
                            <td>
                              <div className={styles.statusInfo}>
                                <div className={`${styles.statusDot} ${styles[item.riskLevel.replace(/[^a-zA-Z0-9]/g, '')]}`}></div>
                                <span className={styles.statusText}>{item.riskLevel}</span>
                              </div>
                            </td>
                            <td>
                              <div className={styles.detailInfo}>
                                <div className={styles.detailItem}>유형: {item.anomalyType}</div>
                                <div className={styles.detailItem}>설명: {item.description}</div>
                              </div>
                            </td>
                            <td>
                              <div className={styles.dateInfo}>{item.detectedAt}</div>
                            </td>
                            <td>
                              <div className={styles.actionInfo}>
                                {item.actionTaken || "조치 대기"}
                              </div>
                            </td>
                            <td>
                              <div className={styles.actionButtons}>
                                <Button size="sm" color="point" onClick={() => window.open(`/reports/${item.reportId}`, '_blank')}>
                                  신고보기
                                </Button>
                                <Button size="sm" color="danger" onClick={() => handleHidePost(item.id)}>
                                  게시물 가리기
                                </Button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>
                              <div className={styles.periodInfo}>
                                <div className={styles.periodText}>{item.period}</div>
                              </div>
                            </td>
                            <td>
                              <div className={styles.metricInfo}>
                                {selectedSort === "유저 통계" && (
                                  <>
                                    <div className={styles.metricValue}>{item.totalUsers.toLocaleString()}명</div>
                                    <div className={styles.metricLabel}>총 유저</div>
                                  </>
                                )}
                                {selectedSort === "거래 통계" && (
                                  <>
                                    <div className={styles.metricValue}>{item.totalTransactions}건</div>
                                    <div className={styles.metricLabel}>총 거래</div>
                                  </>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className={styles.detailInfo}>
                                {selectedSort === "유저 통계" && (
                                  <>
                                    <div className={styles.detailItem}>신규: {item.newUsers}명</div>
                                    <div className={styles.detailItem}>활성: {item.activeUsers}명</div>
                                    <div className={styles.detailItem}>비활성: {item.inactiveUsers}명</div>
                                  </>
                                )}
                                {selectedSort === "거래 통계" && (
                                  <>
                                    <div className={styles.detailItem}>매출: {formatCurrency(item.totalRevenue)}</div>
                                    <div className={styles.detailItem}>농산물: {item.productTransactions}건</div>
                                    <div className={styles.detailItem}>토지: {item.landTransactions}건</div>
                                  </>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className={styles.growthInfo}>
                                {selectedSort === "유저 통계" && (
                                  <div className={styles.growthValue}>{item.userGrowth}</div>
                                )}
                                {selectedSort === "거래 통계" && (
                                  <div className={styles.growthValue}>평균: {formatCurrency(item.averageTransaction)}</div>
                                )}
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
