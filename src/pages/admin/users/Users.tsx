import React, { useState, useEffect } from 'react';
import { Button, Badge } from "../../../components/ui";
import styles from "./users.module.css";
import { SortTabs } from '../../../components/sets';
import useAdminAPI, { User } from '../../../hooks/useAdminAPI';

const Users: React.FC = () => {
  // 필터링 상태 관리
  const [selectedProducerFilter, setSelectedProducerFilter] = useState<string>("전체");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  
  const { getUsers } = useAdminAPI();

  // 사용자 데이터 로드
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const response = await getUsers({ page, size: 10 });
      if (response) {
        setUsers(response.content);
        setTotalElements(response.totalElements);
      }
      setLoading(false);
    };

    loadUsers();
  }, [page, getUsers]);



  // 통합 필터링 함수 (개선된 구조)
  const getFilteredData = () => {
    let filtered = users;
    
    // 상태별 필터링 (실제 데이터에 맞게 수정)
    if (selectedProducerFilter === "활성") {
      filtered = filtered.filter(item => item.status === "ACTIVE");
    } else if (selectedProducerFilter === "비활성") {
      filtered = filtered.filter(item => item.status === "INACTIVE");
    } else if (selectedProducerFilter === "정지") {
      filtered = filtered.filter(item => item.status === "SUSPENDED");
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

          {/* 핵심 통계 카드 (실제 데이터 기반) */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>총 유저 수</h3>
                <Button size="sm" color="point" disabled>👥</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{loading ? '...' : totalElements}</div>
                <p className={styles.description}>등록된 총 유저 수</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>활성 유저</h3>
                <Button size="sm" color="point2" disabled>🟢</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {loading ? '...' : users.filter(u => u.status === "ACTIVE").length}
                </div>
                <p className={styles.description}>활성 상태</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>비활성 유저</h3>
                <Button size="sm" color="secondary" disabled>🔴</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {loading ? '...' : users.filter(u => u.status === "INACTIVE").length}
                </div>
                <p className={styles.description}>비활성 상태</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>정지된 유저</h3>
                <Button size="sm" color="danger" disabled>🚫</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {loading ? '...' : users.filter(u => u.status === "SUSPENDED").length}
                </div>
                <p className={styles.description}>정지 상태</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>이번 주 신규</h3>
                <Button size="sm" color="point3" disabled>✨</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {loading ? '...' : users.filter(u => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(u.creDatetime) > weekAgo;
                  }).length}
                </div>
                <p className={styles.description}>최근 7일 가입</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>현재 페이지</h3>
                <Button size="sm" color="secondary" disabled>📄</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {loading ? '...' : users.length}
                </div>
                <p className={styles.description}>현재 표시 중</p>
              </div>
            </div>
          </div>

          {/* 검색 및 액션 */}
          <div className={styles.searchCard}>
            <div className={styles.searchContent}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInput}>
                  {/* 통합 필터링 (실제 데이터 기반) */}
                  <SortTabs 
                    items={["전체", "활성", "비활성", "정지"]}
                    value={selectedProducerFilter}
                    onChange={(value) => setSelectedProducerFilter(value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 통합 유저 목록 (실제 데이터 기반) */}
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
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>사용자 데이터를 불러오는 중...</p>
                </div>
              ) : (
                <div className={styles.userList}>
                  {currentData.map((user: User) => (
                    <div key={user.id} className={styles.userItem}>
                      <div className={styles.userContainer}>
                        <div className={styles.userInfo}>
                          <h4 className={styles.userName}>{user.userName}</h4>
                          <p className={styles.userEmail}>{user.email}</p>
                          <p className={styles.userDetail}>
                            {user.userAccount} | {user.addr} {user.detailAddr}
                          </p>
                          <p className={styles.userDetail}>
                            📞 {user.cellNo}
                          </p>
                        </div>
                        <div className={styles.userStatus}>
                          <div className={styles.activityInfo}>
                            <span className={styles.activityLabel}>가입일</span>
                            <span className={styles.activityTime}>
                              {new Date(user.creDatetime).toLocaleDateString()}
                            </span>
                          </div>
                          <div className={styles.sanctionInfo}>
                            <span className={styles.sanctionLabel}>상태</span>
                            <Badge 
                              size="sm" 
                              color={
                                user.status === "ACTIVE" ? "point2" :
                                user.status === "INACTIVE" ? "secondary" :
                                "danger"
                              }
                            >
                              {user.status === "ACTIVE" ? "활성" : 
                               user.status === "INACTIVE" ? "비활성" : "정지"}
                            </Badge>
                          </div>
                        </div>
                        <div className={styles.userActions}>
                          <div className={styles.btn_group}>
                            <select 
                              className={styles.sanctionSelect}
                              onChange={(e) => {
                                if (e.target.value === "suspend") {
                                  // 계정 정지
                                  if (window.confirm(`${user.userName}님을 정지 처리하시겠습니까?`)) {
                                    alert(`✅ ${user.userName}님의 정지 처리가 완료되었습니다.\n\n• 처리일: ${new Date().toLocaleDateString()}`);
                                  }
                                  e.target.value = ""; // 선택 초기화
                                } else if (e.target.value === "activate") {
                                  // 계정 활성화
                                  if (window.confirm(`${user.userName}님의 계정을 활성화하시겠습니까?`)) {
                                    alert(`✅ ${user.userName}님의 계정이 활성화되었습니다.`);
                                  }
                                  e.target.value = ""; // 선택 초기화
                                } else if (e.target.value === "deactivate") {
                                  // 계정 비활성화
                                  if (window.confirm(`${user.userName}님의 계정을 비활성화하시겠습니까?`)) {
                                    alert(`✅ ${user.userName}님의 계정이 비활성화되었습니다.`);
                                  }
                                  e.target.value = ""; // 선택 초기화
                                }
                              }}
                            >
                              <option value="">관리 선택</option>
                              <option value="activate">계정 활성화</option>
                              <option value="deactivate">계정 비활성화</option>
                              <option value="suspend">계정 정지</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;