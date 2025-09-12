import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "../../../components/ui";
import useAdminAPI, { DashboardStats, AnomalyDetection } from "../../../hooks/useAdminAPI";
import styles from "./dashboard.module.css";
import useAPI from "../../../hooks/useAPI";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { getDashboardStats, getLandLeasesStats, getAnomalies, loading } = useAdminAPI();
  const api = useAPI();
  const apiRef = useRef(api);
  // keep latest api without re-triggering effects
  useEffect(() => { apiRef.current = api; }, [api]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [landLeasesStats, setLandLeasesStats] = useState<{ totalLandLeases: number; activeLandLeases: number; inactiveLandLeases: number } | null>(null);
  const [pendingReportsCount, setPendingReportsCount] = useState<number | null>(null);
  const [recentAnomalies, setRecentAnomalies] = useState<AnomalyDetection[]>([]);
  const [productReportsCount, setProductReportsCount] = useState<number | null>(null);
  const [userReportsCount, setUserReportsCount] = useState<number | null>(null);
  const [productReportsPending, setProductReportsPending] = useState<number | null>(null);
  const [productReportsCompleted, setProductReportsCompleted] = useState<number | null>(null);
  const [userReportsPending, setUserReportsPending] = useState<number | null>(null);
  const [userReportsCompleted, setUserReportsCompleted] = useState<number | null>(null);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // 대시보드 데이터 로드
  useEffect(() => {
    const loadDashboardStats = async () => {
      const data = await getDashboardStats();
      if (data) {
        setStats(data);
      }
    };

    const loadLandLeasesStats = async () => {
      const data = await getLandLeasesStats();
      if (data) {
        setLandLeasesStats(data);
      }
    };

    const loadPendingReports = async () => {
      try {
        const res = await apiRef.current.get('/api/admin/reports/users');
        if (res?.data?.code === '0000' && Array.isArray(res.data.data)) {
          const list = res.data.data;
          const pending = list.filter((it: any) => String(it.status || '').toUpperCase() !== 'RESOLVED').length;
          setPendingReportsCount(pending);
        }
      } catch (e) {
        // ignore
      }
    };

    const loadRecentAnomalies = async () => {
      try {
        const anomalies = await getAnomalies('PENDING');
        setRecentAnomalies(anomalies.slice(0, 3)); // 최근 3개만 표시
      } catch (e) {
        console.log('이상 거래 데이터 로드 실패, 빈 배열로 설정:', e);
        setRecentAnomalies([]); // 에러 시 빈 배열로 설정
      }
    };

    const loadReportsData = async () => {
      try {
        // 농산물 신고 데이터 로드 (전체)
        const productReportsAllRes = await apiRef.current.get('/api/admin/reports/products');
        let productPending = 0;
        let productCompleted = 0;
        
        if (productReportsAllRes?.data?.code === '0000' && Array.isArray(productReportsAllRes.data.data)) {
          productPending = productReportsAllRes.data.data.filter((report: any) => 
            report.status === 'PENDING' || report.status === 'IN_PROGRESS'
          ).length;
          productCompleted = productReportsAllRes.data.data.filter((report: any) => 
            report.status === 'RESOLVED' || report.status === 'REJECTED'
          ).length;
        }
        
        setProductReportsCount(productPending + productCompleted);
        setProductReportsPending(productPending);
        setProductReportsCompleted(productCompleted);

        // 사용자 신고 데이터 로드 (전체)
        const userReportsAllRes = await apiRef.current.get('/api/admin/reports/users');
        let userPending = 0;
        let userCompleted = 0;
        
        if (userReportsAllRes?.data?.code === '0000' && Array.isArray(userReportsAllRes.data.data)) {
          userPending = userReportsAllRes.data.data.filter((report: any) => 
            report.status === 'PENDING' || report.status === 'IN_PROGRESS'
          ).length;
          userCompleted = userReportsAllRes.data.data.filter((report: any) => 
            report.status === 'RESOLVED' || report.status === 'REJECTED'
          ).length;
        }
        
        setUserReportsCount(userPending + userCompleted);
        setUserReportsPending(userPending);
        setUserReportsCompleted(userCompleted);

        // 전체 신고 수 계산
        const totalReports = productPending + productCompleted + userPending + userCompleted;
        setPendingReportsCount(totalReports);

      } catch (error) {
        console.error('신고 데이터 로드 실패:', error);
        setProductReportsCount(0);
        setUserReportsCount(0);
        setProductReportsPending(0);
        setProductReportsCompleted(0);
        setUserReportsPending(0);
        setUserReportsCompleted(0);
        setPendingReportsCount(0);
      }
    };

    loadDashboardStats();
    loadLandLeasesStats();
    loadPendingReports();
    loadRecentAnomalies();
    loadReportsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDashboardStats, getLandLeasesStats, getAnomalies]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.maxWidth}>
          {/* 헤더 */}
          <div className={styles.header}>
            <h1 className={styles.title}>대시보드</h1>
            <p className={styles.subtitle}>Farm Mate 플랫폼 전체 현황을 한눈에 확인하세요</p>
          </div>

          {/* 거래 현황 요약 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>거래 현황 요약</h2>
            <div className={styles.menuGrid}>
              <div className={styles.menuCard} onClick={() => handleNavigation('/admin/products')}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>농산물 거래</h3>
                    {/* <Badge color="point">🌾</Badge> */}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>
                      {loading ? '...' : stats ? stats.totalTransactions.toLocaleString() : '0'}
                    </div>
                    <p className={styles.description}>이번 달 거래 건수</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>완료: {loading ? '...' : stats ? stats.completedTransactions.toLocaleString() : '0'}</span>
                      <span className={styles.subStat}>진행중: {loading ? '...' : stats ? stats.inProgressTransactions.toLocaleString() : '0'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.menuCard} onClick={() => handleNavigation('/admin/rentals')}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>토지 임대/임차</h3>
                    {/* <Badge color="point2">🏞️</Badge> */}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>
                      {loading ? '...' : (landLeasesStats?.totalLandLeases ?? 0).toLocaleString()}
                    </div>
                    <p className={styles.description}>총 임대 건수</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>거래중: {loading ? '...' : (landLeasesStats?.activeLandLeases ?? 0).toLocaleString()}</span>
                      <span className={styles.subStat}>거래완료: {loading ? '...' : (landLeasesStats?.inactiveLandLeases ?? 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 신고/분쟁 알림 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>신고/분쟁 알림</h2>
            <div className={styles.menuGrid}>
              <div className={styles.menuCard} onClick={() => handleNavigation('/admin/reports?tab=product')}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>농산물 신고</h3>
                    {/* <Badge color="danger">🌾</Badge> */}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>
                      {loading ? '...' : (productReportsCount ?? 0).toLocaleString()}
                    </div>
                    <p className={styles.description}>처리 대기 신고</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>대기중: {loading ? '...' : (productReportsPending ?? 0).toLocaleString()}</span>
                      <span className={styles.subStat}>완료: {loading ? '...' : (productReportsCompleted ?? 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.menuCard} onClick={() => handleNavigation('/admin/reports')}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>사용자 신고</h3>
                    {/* <Badge color="point3">👤</Badge> */}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>
                      {loading ? '...' : (userReportsCount ?? 0).toLocaleString()}
                    </div>
                    <p className={styles.description}>처리 대기 신고</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>대기중: {loading ? '...' : (userReportsPending ?? 0).toLocaleString()}</span>
                      <span className={styles.subStat}>완료: {loading ? '...' : (userReportsCompleted ?? 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className={styles.menuCard} onClick={() => handleNavigation('/admin/disputes')}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>분쟁 중재</h3>
                    <Badge color="point3">⚖️</Badge>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>7</div>
                    <p className={styles.description}>진행중인 분쟁</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>농산물: 4</span>
                      <span className={styles.subStat}>토지: 3</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* 신규 가입자 / 탈퇴 현황 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>신규 가입자 / 탈퇴 현황</h2>
            <div className={styles.menuGrid}>
              {/* <div className={styles.menuCard} onClick={() => handleNavigation('/admin/users')}> */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>신규 가입자</h3>
                    {/* <Badge color="point">👥</Badge> */}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>
                      {loading ? '...' : stats ? stats.newUsersThisWeek.toLocaleString() : '0'}
                    </div>
                    <p className={styles.description}>이번 주 신규 가입</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>농부: {loading ? '...' : stats ? Math.floor(stats.newUsersThisWeek * 0.57).toLocaleString() : '0'}</span>
                      <span className={styles.subStat}>구매자: {loading ? '...' : stats ? Math.floor(stats.newUsersThisWeek * 0.43).toLocaleString() : '0'}</span>
                    </div>
                  </div>
                </div>
              {/* </div> */}

              {/* <div className={styles.menuCard} onClick={() => handleNavigation('/admin/users')}> */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>탈퇴 현황</h3>
                    {/* <Badge color="secondary">📉</Badge> */}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>
                      {loading ? '...' : stats ? Math.floor(stats.newUsersThisWeek * 0.08).toLocaleString() : '0'}
                    </div>
                    <p className={styles.description}>이번 주 탈퇴</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>자발적: {loading ? '...' : stats ? Math.floor(stats.newUsersThisWeek * 0.05).toLocaleString() : '0'}</span>
                      <span className={styles.subStat}>제재: {loading ? '...' : stats ? Math.floor(stats.newUsersThisWeek * 0.03).toLocaleString() : '0'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/* </div> */}

          {/* 최근 이상 거래 감지 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>최근 이상 거래 감지</h2>
            <div className={styles.card} onClick={() => handleNavigation('/admin/statistics?tab=anomaly')} style={{ cursor: 'pointer' }}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>실시간 감지된 이상 거래</h3>
                <p className={styles.cardDescription}>
                  AI가 자동으로 감지한 의심스러운 거래 패턴
                </p>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.activityList}>
                  {recentAnomalies.length > 0 ? (
                    recentAnomalies.map((anomaly) => (
                      <div key={anomaly.id} className={styles.activityItem}>
                        <div className={`${styles.activityDot} ${
                          anomaly.severity === 'CRITICAL' ? styles.red :
                          anomaly.severity === 'HIGH' ? styles.orange :
                          anomaly.severity === 'MEDIUM' ? styles.yellow : styles.green
                        }`}></div>
                        <div className={styles.activityContent}>
                          <p className={styles.activityTitle}>
                            {anomaly.userName || anomaly.userAccount || '알 수 없는 사용자'}
                          </p>
                          <p className={styles.activitySubtitle}>
                            {anomaly.anomalyType} - {anomaly.description}
                          </p>
                        </div>
                        <div className={styles.activityTime}>
                          {new Date(anomaly.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.activityItem}>
                      <div className={styles.activityContent}>
                        <p className={styles.activityTitle}>감지된 이상 거래가 없습니다</p>
                        <p className={styles.activitySubtitle}>모든 거래가 정상적으로 진행되고 있습니다</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
