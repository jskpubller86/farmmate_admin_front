import React, { useState } from 'react';
import { Button, Badge } from "../../../components/ui";
import styles from "./users.module.css";
import { SortTabs } from '../../../components/sets';

const Users: React.FC = () => {
  // 필터링 상태 관리
  const [selectedProducerFilter, setSelectedProducerFilter] = useState<string>("전체");

  // 통합 유저 데이터 (개선된 구조)
  const users = [
    {
      id: 1,
      name: "김농부",
      email: "farmer@example.com",
      roles: ["농부", "재배자"], // 복합 역할 지원
      status: "🟢", // 온라인 상태 표시
      lastActivity: "2시간 전", // 마지막 활동 시간
      reportCount: 0, // 통합 신고 횟수
      farmName: "김농부 농장",
      location: "경기도 수원시",
      sanctionStatus: "정상", // 제재 상태
      totalReports: 0 // 총 신고 횟수 (누적)
    },
    {
      id: 2,
      name: "이재배",
      email: "grower@example.com",
      roles: ["재배자"],
      status: "🟢",
      lastActivity: "1시간 전",
      reportCount: 2,
      farmName: "이재배 농장",
      location: "충청남도 천안시",
      sanctionStatus: "정상",
      totalReports: 2
    },
    {
      id: 3,
      name: "박농업",
      email: "agriculture@example.com",
      roles: ["농부", "임대인"], // 복합 역할
      status: "🔴", // 오프라인 상태
      lastActivity: "1일 전",
      reportCount: 3,
      farmName: "박농업 농장",
      location: "경상북도 대구시",
      sanctionStatus: "활동정지", // 제재 상태
      totalReports: 3
    },
    {
      id: 4,
      name: "최농민",
      email: "farmer2@example.com",
      roles: ["농부"],
      status: "🔴",
      lastActivity: "3일 전",
      reportCount: 5,
      farmName: "최농민 농장",
      location: "전라남도 광주시",
      sanctionStatus: "7일정지", // 5회 이상 신고시 7일 정지
      totalReports: 5
    },
    {
      id: 5,
      name: "정농업자",
      email: "farmer3@example.com",
      roles: ["농부", "재배자"],
      status: "🔴",
      lastActivity: "1주일 전",
      reportCount: 12,
      farmName: "정농업자 농장",
      location: "강원도 춘천시",
      sanctionStatus: "계정비활성화", // 10회 이상 신고시 계정 비활성화
      totalReports: 12
    }
  ];



  // 통합 필터링 함수 (개선된 구조)
  const getFilteredData = () => {
    let filtered = users;
    
    // 역할별 필터링
    if (selectedProducerFilter === "농부") {
      filtered = filtered.filter(item => item.roles.includes("농부"));
    } else if (selectedProducerFilter === "재배자") {
      filtered = filtered.filter(item => item.roles.includes("재배자"));
    } else if (selectedProducerFilter === "임대인") {
      filtered = filtered.filter(item => item.roles.includes("임대인"));
    } else if (selectedProducerFilter === "임차인") {
      filtered = filtered.filter(item => item.roles.includes("임차인"));
    }
    
    // 상태별 필터링
    if (selectedProducerFilter === "온라인") {
      filtered = filtered.filter(item => item.status === "🟢");
    } else if (selectedProducerFilter === "오프라인") {
      filtered = filtered.filter(item => item.status === "🔴");
    }
    
    return filtered;
  };

  const currentData = getFilteredData();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.maxWidth}>
          {/* 헤더 */}
          <div className={styles.header}>
            <h1 className={styles.title}>유저 관리</h1>
            <p className={styles.subtitle}>생산자, 판매자, 임대인, 임차인을 관리하세요</p>
          </div>

          {/* 핵심 통계 카드 (개선된 구조) */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>총 유저 수</h3>
                <Button size="sm" color="point" disabled>👥</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{users.length}</div>
                <p className={styles.description}>등록된 총 유저 수</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>온라인 유저</h3>
                <Button size="sm" color="point2" disabled>🟢</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{users.filter(u => u.status === "🟢").length}</div>
                <p className={styles.description}>현재 온라인 상태</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>신고된 유저</h3>
                <Button size="sm" color="danger" disabled>⚠️</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{users.filter(u => u.reportCount > 0).length}</div>
                <p className={styles.description}>신고 누적 유저</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>제재 중인 유저</h3>
                <Button size="sm" color="point3" disabled>🚫</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {users.filter(u => u.sanctionStatus !== "정상").length}
                </div>
                <p className={styles.description}>활동 제한 유저</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>7일 정지</h3>
                <Button size="sm" color="secondary" disabled>⏰</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {users.filter(u => u.sanctionStatus === "7일정지").length}
                </div>
                <p className={styles.description}>5회 이상 신고</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>계정 비활성화</h3>
                <Button size="sm" color="danger" disabled>🔒</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {users.filter(u => u.sanctionStatus === "계정비활성화").length}
                </div>
                <p className={styles.description}>10회 이상 신고</p>
              </div>
            </div>
          </div>

          {/* 검색 및 액션 */}
          <div className={styles.searchCard}>
            <div className={styles.searchContent}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInput}>
                  {/* 통합 필터링 (개선된 구조) */}
                  <SortTabs 
                    items={["전체", "농부", "재배자", "임대인", "임차인", "온라인", "오프라인"]}
                    value={selectedProducerFilter}
                    onChange={(value) => setSelectedProducerFilter(value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 통합 유저 목록 (개선된 구조) */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>유저 목록</h3>
              <p className={styles.cardDescription}>
                {selectedProducerFilter === "전체" 
                  ? "전체 유저 목록" 
                  : `${selectedProducerFilter} 목록`
                } - 총 {currentData.length}명
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.userList}>
                {currentData.map((item: any) => (
                  <div key={item.id} className={styles.userItem}>
                    <div className={styles.userContainer}>
                      <div className={styles.userInfo}>
                        <h4 className={styles.userName}>{item.name}</h4>
                        <p className={styles.userEmail}>{item.email}</p>
                        <p className={styles.userDetail}>
                          {item.roles.join(" + ")} | {item.farmName} | {item.location}
                        </p>
                      </div>
                      <div className={styles.userStatus}>
                        {/* <div className={styles.statusInfo}> */}
                          {/* <span className={styles.statusLabel}>상태</span>
                          <span className={styles.statusIcon}>{item.status}</span>
                          <span className={styles.statusText}>
                            {item.status === "🟢" ? "온라인" : "오프라인"}
                          </span> */}
                        {/* </div> */}
                        <div className={styles.activityInfo}>
                          <span className={styles.activityLabel}>마지막 로그인</span>
                          <span className={styles.activityTime}>{item.lastActivity}</span>
                        </div>
                        <div className={styles.sanctionInfo}>
                          <span className={styles.sanctionLabel}>제재 상태</span>
                          <Badge 
                            size="sm" 
                            color={
                              item.sanctionStatus === "정상" ? "point2" :
                              item.sanctionStatus === "활동정지" ? "secondary" :
                              item.sanctionStatus === "7일정지" ? "point3" :
                              "danger"
                            }
                          >
                            {item.sanctionStatus}
                          </Badge>
                        </div>
                        {item.reportCount > 0 && (
                          <Badge size="sm" color="danger">
                            신고 {item.totalReports}건 (누적)
                          </Badge>
                        )}
                      </div>
                      <div className={styles.userActions}>
                        <div className={styles.btn_group}>
                          <select 
                            className={styles.sanctionSelect}
                            disabled={item.reportCount === 0}
                            onChange={(e) => {
                              if (e.target.value === "monthly") {
                                // 한달 정지
                                if (window.confirm(`${item.name}님을 한달 정지 처리하시겠습니까?`)) {
                                  alert(`✅ ${item.name}님의 한달 정지 처리가 완료되었습니다.\n\n• 처리일: ${new Date().toLocaleDateString()}\n• 해제예정: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`);
                                }
                                e.target.value = ""; // 선택 초기화
                              } else if (e.target.value === "permanent") {
                                // 영구 정지
                                if (window.confirm(`${item.name}님을 영구 정지 처리하시겠습니까?`)) {
                                  alert(`✅ ${item.name}님의 영구 정지 처리가 완료되었습니다.\n\n• 처리일: ${new Date().toLocaleDateString()}\n• 처리자: 관리자`);
                                }
                                e.target.value = ""; // 선택 초기화
                              } else if (e.target.value === "release") {
                                // 제재 해제
                                if (window.confirm(`${item.name}님의 제재를 해제하시겠습니까?`)) {
                                  alert(`✅ ${item.name}님의 제재가 해제되었습니다.`);
                                }
                                e.target.value = ""; // 선택 초기화
                              }
                            }}
                          >
                            <option value="">제재 선택</option>
                            <option value="monthly">한달 정지 (30일)</option>
                            <option value="permanent">영구 정지</option>
                            <option value="release">제재 해제</option>
                          </select>
                        </div>
                      </div>
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

export default Users;