import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge } from "../../../components/ui";
import styles from "./dashboard.module.css";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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
                    <Badge color="point">🌾</Badge>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>1,247</div>
                    <p className={styles.description}>이번 달 거래 건수</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>완료: 1,156</span>
                      <span className={styles.subStat}>진행중: 91</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.menuCard} onClick={() => handleNavigation('/admin/rentals')}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>토지 임대/임차</h3>
                    <Badge color="point2">🏞️</Badge>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>89</div>
                    <p className={styles.description}>이번 달 임대 건수</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>완료: 67</span>
                      <span className={styles.subStat}>진행중: 22</span>
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
              <div className={styles.menuCard} onClick={() => handleNavigation('/admin/reports')}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>처리 대기 신고</h3>
                    <Badge color="danger">🚨</Badge>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>23</div>
                    <p className={styles.description}>즉시 처리 필요</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>농산물: 15</span>
                      <span className={styles.subStat}>토지: 8</span>
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
                    <Badge color="point">👥</Badge>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>156</div>
                    <p className={styles.description}>이번 주 신규 가입</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>농부: 89</span>
                      <span className={styles.subStat}>구매자: 67</span>
                    </div>
                  </div>
                </div>
              {/* </div> */}

              {/* <div className={styles.menuCard} onClick={() => handleNavigation('/admin/users')}> */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>탈퇴 현황</h3>
                    <Badge color="secondary">📉</Badge>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.number}>12</div>
                    <p className={styles.description}>이번 주 탈퇴</p>
                    <div className={styles.subStats}>
                      <span className={styles.subStat}>자발적: 8</span>
                      <span className={styles.subStat}>제재: 4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/* </div> */}

          {/* 최근 활동 */}
          {/* <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>최근 신고 내역</h3>
              <p className={styles.cardDescription}>
              처리가 필요한 최신 신고
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={`${styles.activityDot} ${styles.green}`}></div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityTitle}>유기농 토마토</p>
                    <p className={styles.activitySubtitle}>허위 정보</p>
                  </div>
                  <div className={styles.activityTime}>2분 전</div>
                </div>
                <div className={styles.activityItem}>
                  <div className={`${styles.activityDot} ${styles.blue}`}></div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityTitle}>강남구 농지</p>
                    <p className={styles.activitySubtitle}>사기 의심</p>
                  </div>
                  <div className={styles.activityTime}>15분 전</div>
                </div>
                <div className={styles.activityItem}>
                  <div className={`${styles.activityDot} ${styles.yellow}`}></div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityTitle}>부적절한 댓글</p>
                    <p className={styles.activitySubtitle}>욕설</p>
                  </div>
                  <div className={styles.activityTime}>1시간 전</div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
