import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from "../../../components/ui";
import styles from "./statistics.module.css";
import { SortTabs, Tabs } from '../../../components/sets';
import useAdminAPI, { UserStats, TransactionStats, LandLeaseStats, AnomalyDetection } from '../../../hooks/useAdminAPI';

const Statistics: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedSort, setSelectedSort] = useState<string>(() => {
    const tab = searchParams.get('tab');
    return tab === 'anomaly' ? "이상 거래 감지" : "유저 통계";
  });
  const [selectedAnomalyFilter, setSelectedAnomalyFilter] = useState<string>("전체");
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [transactionStats, setTransactionStats] = useState<TransactionStats[]>([]);
  const [landLeaseStats, setLandLeaseStats] = useState<LandLeaseStats[]>([]);
  const [landLeasesSummary, setLandLeasesSummary] = useState<{ totalLandLeases: number; activeLandLeases: number; inactiveLandLeases: number } | null>(null);
  const [anomalies, setAnomalies] = useState<AnomalyDetection[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { getUserStats, getTransactionStats, getLandLeasesMonthlyStats, getLandLeasesStats, getAnomalies } = useAdminAPI();

  // 통계 데이터 로드
  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);

      // 헤더 카드 표시를 위해 거래 통계는 항상 미리 로드
      const txPromise = getTransactionStats(6).then((data) => {
        if (data) {
          setTransactionStats(data);
        }
      });

      if (selectedSort === "유저 통계") {
        const data = await getUserStats(6); // 최근 6개월
        if (data) {
          setUserStats(data);
        }
      } else if (selectedSort === "거래 통계") {
        // 상세 테이블도 동일 데이터 사용
        await txPromise;
      } else if (selectedSort === "토지 임대/임차 통계") {
        // 실데이터 요약(합계) 호출
        const summary = await getLandLeasesStats();
        if (summary) {
          setLandLeasesSummary(summary);
          // 기존 테이블 구조에 맞게 단일 기간(전체) 행 구성
          setLandLeaseStats([
            {
              period: "전체",
              totalLandLeases: summary.totalLandLeases,
              activeLandLeases: summary.activeLandLeases,
              inactiveLandLeases: summary.inactiveLandLeases,
              newLandLeases: 0,
              completedLandLeases: summary.inactiveLandLeases,
              periodStart: "",
              periodEnd: ""
            }
          ]);
        }
      } else if (selectedSort === "이상 거래 감지") {
        // 이상 거래 데이터 로드
        const anomalyData = await getAnomalies('PENDING');
        if (anomalyData) {
          setAnomalies(anomalyData);
        }
      }

      // 거래 통계 선로딩 완료 대기(유저/토지 탭에서도 헤더 카드가 보이도록)
      await txPromise;

      setLoading(false);
    };

    loadStats();
  }, [selectedSort, getUserStats, getTransactionStats, getLandLeasesStats, getLandLeasesMonthlyStats, getAnomalies]);


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
      return userStats.map((stat, index) => ({
        id: index + 1,
        period: stat.period,
        totalUsers: stat.totalUsers,
        newUsers: stat.newUsers,
        activeUsers: stat.activeUsers,
        inactiveUsers: stat.inactiveUsers,
        userGrowth: stat.userGrowth
      }));
    } else if (selectedSort === "거래 통계") {
      return transactionStats.map((stat, index) => ({
        id: index + 1,
        period: stat.period,
        totalTransactions: stat.totalTransactions,
        productTransactions: stat.productTransactions,
        landTransactions: stat.landTransactions,
        totalRevenue: stat.totalRevenue,
        averageTransaction: stat.averageTransaction,
        region: stat.region
      }));
    } else if (selectedSort === "토지 임대/임차 통계") {
      return landLeaseStats.map((stat, index) => ({
        id: index + 1,
        period: stat.period,
        totalLandLeases: stat.totalLandLeases,
        activeLandLeases: stat.activeLandLeases,
        inactiveLandLeases: stat.inactiveLandLeases,
        newLandLeases: stat.newLandLeases,
        completedLandLeases: stat.completedLandLeases,
        periodStart: stat.periodStart,
        periodEnd: stat.periodEnd
      }));
    } else if (selectedSort === "이상 거래 감지") {
      let filtered = anomalies;
      if (selectedAnomalyFilter === "높음") {
        filtered = filtered.filter(item => item.severity === "HIGH");
      } else if (selectedAnomalyFilter === "중간") {
        filtered = filtered.filter(item => item.severity === "MEDIUM");
      } else if (selectedAnomalyFilter === "낮음") {
        filtered = filtered.filter(item => item.severity === "LOW");
      }
      return filtered.map((item, index) => ({
        id: index + 1,
        type: item.anomalyType.includes("PRICE") ? "농산물" : "토지",
        itemName: item.anomalyType,
        seller: item.userName || item.userAccount || "알 수 없음",
        anomalyType: item.anomalyType,
        description: item.description,
        riskLevel: item.severity === "HIGH" ? "높음" : item.severity === "MEDIUM" ? "중간" : "낮음",
        detectedAt: new Date(item.createdAt).toLocaleDateString('ko-KR'),
        reportId: item.id,
        actionTaken: item.status === "PENDING" ? "조치 대기" : "처리 완료"
      }));
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
                {/* <Button size="sm" color="point" disabled>👥</Button> */}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {loading ? '...' : userStats.length > 0 ? userStats[0].totalUsers.toLocaleString() : '0'}
                </div>
                <p className={styles.description}>현재 등록된 유저</p>
                <div className={styles.subStats}>
                  <span className={styles.subStat}>
                    신규: {loading ? '...' : userStats.length > 0 ? userStats[0].newUsers : '0'}
                  </span>
                  <span className={styles.subStat}>
                    활성: {loading ? '...' : userStats.length > 0 ? userStats[0].activeUsers : '0'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>총 거래 건수</h3>
                {/* <Button size="sm" color="point2" disabled>💰</Button> */}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {loading ? '...' : transactionStats.length > 0 ? transactionStats[0].totalTransactions.toLocaleString() : '0'}
                </div>
                <p className={styles.description}>이번 달 거래</p>
                <div className={styles.subStats}>
                  <span className={styles.subStat}>
                    농산물: {loading ? '...' : transactionStats.length > 0 ? transactionStats[0].productTransactions : '0'}
                  </span>
                  <span className={styles.subStat}>
                    토지: {loading ? '...' : transactionStats.length > 0 ? transactionStats[0].landTransactions : '0'}
                  </span>
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
                      { id: "토지 임대/임차 통계", label: "토지 임대/임차 통계" },
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
                {selectedSort === "토지 임대/임차 통계" && "토지 임대/임차 통계 목록"}
                {selectedSort === "이상 거래 감지" && (
                  selectedAnomalyFilter === "전체" 
                    ? "이상 거래 감지 목록" 
                    : `${selectedAnomalyFilter} 위험도 목록`
                )}
              </p>
            </div>
            <div className={styles.cardContent}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>통계 데이터를 불러오는 중...</p>
                </div>
              ) : (
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
                                {selectedSort === "토지 임대/임차 통계" && (
                                  <>
                                    <div className={styles.metricValue}>{item.totalLandLeases}건</div>
                                    <div className={styles.metricLabel}>총 임대</div>
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
                                {selectedSort === "토지 임대/임차 통계" && (
                                  <>
                                    <div className={styles.detailItem}>활성: {item.activeLandLeases}건</div>
                                    <div className={styles.detailItem}>비활성: {item.inactiveLandLeases}건</div>
                                    <div className={styles.detailItem}>신규: {item.newLandLeases}건</div>
                                    <div className={styles.detailItem}>완료: {item.completedLandLeases}건</div>
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
                                {selectedSort === "토지 임대/임차 통계" && (
                                  <div className={styles.growthValue}>기간: {item.periodStart} ~ {item.periodEnd}</div>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
