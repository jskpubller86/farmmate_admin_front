import React, { useState } from 'react';
import { Button, Badge } from "../../../components/ui";
import styles from "./system.module.css";
import { SortTabs, Tabs } from '../../../components/sets';

const System: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("관리자계정권한");
  const [selectedAdminFilter, setSelectedAdminFilter] = useState<string>("전체");
  const [selectedPolicyFilter, setSelectedPolicyFilter] = useState<string>("전체");
  const [selectedNoticeFilter, setSelectedNoticeFilter] = useState<string>("전체");
  const [selectedLogFilter, setSelectedLogFilter] = useState<string>("전체");

  // 관리자 계정/권한 관리 데이터
  const admins = [
    {
      id: 1,
      name: "김관리자",
      email: "admin1@farmmate.com",
      role: "슈퍼관리자",
      status: "활성",
      lastLogin: "2024.02.15 14:30",
      permissions: ["전체관리", "사용자관리", "거래관리", "시스템관리"],
      createdAt: "2024.01.01"
    },
    {
      id: 2,
      name: "이관리자",
      email: "admin2@farmmate.com",
      role: "일반관리자",
      status: "활성",
      lastLogin: "2024.02.15 10:15",
      permissions: ["사용자관리", "거래관리"],
      createdAt: "2024.01.15"
    },
    {
      id: 3,
      name: "박관리자",
      email: "admin3@farmmate.com",
      role: "일반관리자",
      status: "비활성",
      lastLogin: "2024.02.10 16:45",
      permissions: ["거래관리"],
      createdAt: "2024.02.01"
    }
  ];

  // 정책/약관 관리 데이터
  const policies = [
    {
      id: 1,
      title: "서비스 이용약관",
      type: "이용약관",
      version: "v2.1",
      status: "현재",
      lastUpdated: "2024.02.10",
      updatedBy: "김관리자",
      content: "Farm Mate 서비스 이용에 관한 약관입니다...",
      effectiveDate: "2024.02.15"
    },
    {
      id: 2,
      title: "개인정보처리방침",
      type: "개인정보",
      version: "v1.8",
      status: "현재",
      lastUpdated: "2024.02.05",
      updatedBy: "이관리자",
      content: "개인정보 수집 및 이용에 관한 방침입니다...",
      effectiveDate: "2024.02.10"
    },
    {
      id: 3,
      title: "거래 규정",
      type: "거래규정",
      version: "v1.5",
      status: "대기",
      lastUpdated: "2024.02.12",
      updatedBy: "박관리자",
      content: "농산물 및 토지 거래에 관한 규정입니다...",
      effectiveDate: "2024.02.20"
    }
  ];

  // 공지사항 관리 데이터
  const notices = [
    {
      id: 1,
      title: "시스템 점검 안내",
      type: "시스템공지",
      status: "게시중",
      priority: "높음",
      author: "김관리자",
      createdAt: "2024.02.15",
      publishedAt: "2024.02.15",
      content: "2월 20일 새벽 2시~4시 시스템 점검이 있습니다.",
      viewCount: 1234
    },
    {
      id: 2,
      title: "신규 기능 업데이트",
      type: "업데이트",
      status: "게시중",
      priority: "보통",
      author: "이관리자",
      createdAt: "2024.02.14",
      publishedAt: "2024.02.14",
      content: "토지 검색 기능이 개선되었습니다.",
      viewCount: 567
    },
    {
      id: 3,
      title: "이벤트 안내",
      type: "이벤트",
      status: "대기",
      priority: "낮음",
      author: "박관리자",
      createdAt: "2024.02.13",
      publishedAt: null,
      content: "신규 가입자 대상 특별 이벤트를 진행합니다.",
      viewCount: 0
    }
  ];

  // 로그/보안 기록 데이터
  const logs = [
    {
      id: 1,
      type: "관리자활동",
      action: "사용자 제재",
      admin: "김관리자",
      target: "한제재",
      details: "허위 상품 정보로 인한 30일 제재",
      ipAddress: "192.168.1.100",
      timestamp: "2024.02.15 14:30:25",
      status: "성공"
    },
    {
      id: 2,
      type: "보안",
      action: "로그인 시도",
      admin: "이관리자",
      target: "admin2@farmmate.com",
      details: "정상 로그인",
      ipAddress: "192.168.1.101",
      timestamp: "2024.02.15 10:15:12",
      status: "성공"
    },
    {
      id: 3,
      type: "보안",
      action: "비정상 접근",
      admin: "알 수 없음",
      target: "admin3@farmmate.com",
      details: "잘못된 비밀번호 5회 시도",
      ipAddress: "192.168.1.102",
      timestamp: "2024.02.15 09:45:33",
      status: "실패"
    }
  ];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setSelectedAdminFilter("전체");
    setSelectedPolicyFilter("전체");
    setSelectedNoticeFilter("전체");
    setSelectedLogFilter("전체");
  };

  const getFilteredData = () => {
    if (selectedSort === "관리자계정권한") {
      let filtered = admins;
      if (selectedAdminFilter === "슈퍼관리자") {
        filtered = filtered.filter(item => item.role === "슈퍼관리자");
      } else if (selectedAdminFilter === "일반관리자") {
        filtered = filtered.filter(item => item.role === "일반관리자");
      } else if (selectedAdminFilter === "활성") {
        filtered = filtered.filter(item => item.status === "활성");
      } else if (selectedAdminFilter === "비활성") {
        filtered = filtered.filter(item => item.status === "비활성");
      }
      return filtered;
    } else if (selectedSort === "정책약관관리") {
      let filtered = policies;
      if (selectedPolicyFilter === "이용약관") {
        filtered = filtered.filter(item => item.type === "이용약관");
      } else if (selectedPolicyFilter === "개인정보") {
        filtered = filtered.filter(item => item.type === "개인정보");
      } else if (selectedPolicyFilter === "거래규정") {
        filtered = filtered.filter(item => item.type === "거래규정");
      } else if (selectedPolicyFilter === "현재") {
        filtered = filtered.filter(item => item.status === "현재");
      } else if (selectedPolicyFilter === "대기") {
        filtered = filtered.filter(item => item.status === "대기");
      }
      return filtered;
    } else if (selectedSort === "공지사항관리") {
      let filtered = notices;
      if (selectedNoticeFilter === "시스템공지") {
        filtered = filtered.filter(item => item.type === "시스템공지");
      } else if (selectedNoticeFilter === "업데이트") {
        filtered = filtered.filter(item => item.type === "업데이트");
      } else if (selectedNoticeFilter === "이벤트") {
        filtered = filtered.filter(item => item.type === "이벤트");
      } else if (selectedNoticeFilter === "게시중") {
        filtered = filtered.filter(item => item.status === "게시중");
      } else if (selectedNoticeFilter === "대기") {
        filtered = filtered.filter(item => item.status === "대기");
      }
      return filtered;
    } else if (selectedSort === "로그보안기록") {
      let filtered = logs;
      if (selectedLogFilter === "관리자활동") {
        filtered = filtered.filter(item => item.type === "관리자활동");
      } else if (selectedLogFilter === "보안") {
        filtered = filtered.filter(item => item.type === "보안");
      } else if (selectedLogFilter === "성공") {
        filtered = filtered.filter(item => item.status === "성공");
      } else if (selectedLogFilter === "실패") {
        filtered = filtered.filter(item => item.status === "실패");
      }
      return filtered;
    }
    return [];
  };

  const currentData = getFilteredData();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.maxWidth}>
          {/* 헤더 */}
          <div className={styles.header}>
            <h1 className={styles.title}>⚙️ 시스템 / 운영</h1>
            <p className={styles.subtitle}>관리자 계정/권한, 정책/약관, 공지사항, 로그/보안 기록을 관리하세요</p>
          </div>

          {/* 통계 카드 */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>활성 관리자</h3>
                <Button size="sm" color="point" disabled>👥</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{admins.filter(a => a.status === "활성").length}</div>
                <p className={styles.description}>현재 활성 관리자</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>게시중 공지</h3>
                <Button size="sm" color="point2" disabled>📢</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{notices.filter(n => n.status === "게시중").length}</div>
                <p className={styles.description}>현재 게시중인 공지사항</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>보안 이벤트</h3>
                <Button size="sm" color="danger" disabled>🔒</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{logs.filter(l => l.type === "보안" && l.status === "실패").length}</div>
                <p className={styles.description}>최근 보안 위협</p>
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
                      { id: "관리자계정권한", label: "관리자 계정/권한" },
                      { id: "정책약관관리", label: "정책/약관 관리" },
                      { id: "공지사항관리", label: "공지사항 관리" },
                      { id: "로그보안기록", label: "로그/보안 기록" }
                    ]}
                    defaultActiveTab={selectedSort}
                    onTabChange={handleSortChange}
                  />
                  
                  {/* 세부 필터링 */}
                  {selectedSort === "관리자계정권한" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "슈퍼관리자", "일반관리자", "활성", "비활성"]}
                        value={selectedAdminFilter}
                        onChange={(value) => setSelectedAdminFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "정책약관관리" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "이용약관", "개인정보", "거래규정", "현재", "대기"]}
                        value={selectedPolicyFilter}
                        onChange={(value) => setSelectedPolicyFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "공지사항관리" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "시스템공지", "업데이트", "이벤트", "게시중", "대기"]}
                        value={selectedNoticeFilter}
                        onChange={(value) => setSelectedNoticeFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "로그보안기록" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "관리자활동", "보안", "성공", "실패"]}
                        value={selectedLogFilter}
                        onChange={(value) => setSelectedLogFilter(value)}
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
              <h3 className={styles.cardTitle}>시스템 관리 목록</h3>
              <p className={styles.cardDescription}>
                {selectedSort === "관리자계정권한" && (
                  selectedAdminFilter === "전체" 
                    ? "관리자 계정/권한 목록" 
                    : `${selectedAdminFilter} 관리자 목록`
                )}
                {selectedSort === "정책약관관리" && (
                  selectedPolicyFilter === "전체" 
                    ? "정책/약관 관리 목록" 
                    : `${selectedPolicyFilter} 정책/약관 목록`
                )}
                {selectedSort === "공지사항관리" && (
                  selectedNoticeFilter === "전체" 
                    ? "공지사항 관리 목록" 
                    : `${selectedNoticeFilter} 공지사항 목록`
                )}
                {selectedSort === "로그보안기록" && (
                  selectedLogFilter === "전체" 
                    ? "로그/보안 기록 목록" 
                    : `${selectedLogFilter} 로그/보안 목록`
                )}
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.dataList}>
                {currentData.map((item: any) => (
                  <div key={item.id} className={styles.dataItem}>
                    <div className={styles.dataInfo}>
                      <h4 className={styles.dataTitle}>
                        {selectedSort === "관리자계정권한" ? item.name :
                         selectedSort === "정책약관관리" ? item.title :
                         selectedSort === "공지사항관리" ? item.title :
                         item.action}
                      </h4>
                      <p className={styles.dataSubtitle}>
                        {selectedSort === "관리자계정권한" ? `${item.email} | ${item.role}` :
                         selectedSort === "정책약관관리" ? `${item.type} | v${item.version} | ${item.status}` :
                         selectedSort === "공지사항관리" ? `${item.type} | ${item.author} | ${item.priority}` :
                         `${item.type} | ${item.admin} | ${item.target}`}
                      </p>
                      {selectedSort === "관리자계정권한" && (
                        <p className={styles.dataDetail}>
                          권한: {item.permissions.join(", ")} | 마지막 로그인: {item.lastLogin}
                        </p>
                      )}
                      {selectedSort === "정책약관관리" && (
                        <p className={styles.dataDetail}>
                          최종 수정: {item.lastUpdated} | 수정자: {item.updatedBy} | 시행일: {item.effectiveDate}
                        </p>
                      )}
                      {selectedSort === "공지사항관리" && (
                        <p className={styles.dataDetail}>
                          생성일: {item.createdAt} | 게시일: {item.publishedAt || "미게시"} | 조회수: {item.viewCount}
                        </p>
                      )}
                      {selectedSort === "로그보안기록" && (
                        <p className={styles.dataDetail}>
                          {item.details} | IP: {item.ipAddress} | 시간: {item.timestamp}
                        </p>
                      )}
                    </div>
                    <div className={styles.dataStatus}>
                      <Badge 
                        size="sm" 
                        color={
                          item.status === "활성" || item.status === "현재" || item.status === "게시중" || item.status === "성공" ? "point" : 
                          item.status === "비활성" || item.status === "대기" ? "secondary" : "danger"
                        }
                      >
                        {item.status}
                      </Badge>
                      {selectedSort === "공지사항관리" && (
                        <Badge 
                          size="sm" 
                          color={item.priority === "높음" ? "danger" : item.priority === "보통" ? "point2" : "secondary"}
                        >
                          {item.priority}
                        </Badge>
                      )}
                    </div>
                    <div className={styles.dataActions}>
                      <Button size="sm" color="point">
                        상세보기
                      </Button>
                      {selectedSort === "관리자계정권한" && (
                        <Button size="sm" color="point2">
                          권한수정
                        </Button>
                      )}
                      {selectedSort === "정책약관관리" && item.status === "대기" && (
                        <Button size="sm" color="point2">
                          승인
                        </Button>
                      )}
                      {selectedSort === "공지사항관리" && item.status === "대기" && (
                        <Button size="sm" color="point2">
                          게시
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

export default System;