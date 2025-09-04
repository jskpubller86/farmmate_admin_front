import React, { useState } from 'react';
import { Button, Badge } from "../../../components/ui";
import styles from "./rentals.module.css";
import { SortTabs, Tabs } from '../../../components/sets';

const Rentals: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("토지 임대/임차");
  const [selectedLandFilter, setSelectedLandFilter] = useState<string>("전체");
  const [selectedContractFilter, setSelectedContractFilter] = useState<string>("전체");
  const [selectedReportFilter, setSelectedReportFilter] = useState<string>("전체");
  const [selectedDisputeFilter, setSelectedDisputeFilter] = useState<string>("전체");

  // 샘플 토지 임대/임차 데이터
  const lands = [
    {
      id: 1,
      name: "강남구 농지",
      owner: "박토지주",
      renter: "이임차인",
      area: "1000㎡",
      price: 500000,
      duration: "1년",
      status: "계약완료",
      startDate: "2024.02.15",
      endDate: "2025.02.14",
      location: "서울 강남구"
    },
    {
      id: 2,
      name: "수원시 밭",
      owner: "김토지주",
      renter: "최임차인",
      area: "500㎡",
      price: 300000,
      duration: "6개월",
      status: "계약중",
      startDate: "2024.02.14",
      endDate: "2024.08.13",
      location: "경기도 수원시"
    },
    {
      id: 3,
      name: "안동시 논",
      owner: "정토지주",
      renter: "한임차인",
      area: "2000㎡",
      price: 800000,
      duration: "2년",
      status: "계약완료",
      startDate: "2024.01.15",
      endDate: "2026.01.14",
      location: "경상북도 안동시"
    },
    {
      id: 4,
      name: "나주시 과수원",
      owner: "최토지주",
      renter: "김임차인",
      area: "1500㎡",
      price: 600000,
      duration: "1년",
      status: "계약만료",
      startDate: "2023.02.15",
      endDate: "2024.02.14",
      location: "전라남도 나주시"
    }
  ];

  // 샘플 계약 관리 데이터
  const contracts = [
    {
      id: 1,
      landName: "강남구 농지",
      owner: "박토지주",
      renter: "이임차인",
      contractType: "임대차계약",
      status: "유효",
      signedDate: "2024.02.15",
      expiryDate: "2025.02.14",
      monthlyRent: 500000
    },
    {
      id: 2,
      landName: "수원시 밭",
      owner: "김토지주",
      renter: "최임차인",
      contractType: "임대차계약",
      status: "대기",
      signedDate: "2024.02.14",
      expiryDate: "2024.08.13",
      monthlyRent: 300000
    }
  ];

  // 샘플 신고 데이터
  const reports = [
    {
      id: 1,
      landName: "강남구 농지",
      reporter: "이신고자",
      reason: "계약 위반",
      status: "처리중",
      reportedAt: "2024.02.15",
      description: "계약 조건과 다른 용도로 사용"
    },
    {
      id: 2,
      landName: "수원시 밭",
      reporter: "박신고자",
      reason: "임대료 미납",
      status: "처리완료",
      reportedAt: "2024.02.14",
      description: "3개월간 임대료 미납"
    }
  ];

  // 샘플 분쟁 데이터
  const disputes = [
    {
      id: 1,
      landName: "안동시 논",
      parties: "정토지주 vs 한임차인",
      reason: "계약 해지",
      status: "중재중",
      appliedAt: "2024.02.15",
      description: "계약 해지 조건에 대한 의견 차이"
    },
    {
      id: 2,
      landName: "나주시 과수원",
      parties: "최토지주 vs 김임차인",
      reason: "손해 배상",
      status: "해결완료",
      appliedAt: "2024.02.14",
      description: "토지 손상에 대한 손해 배상 요구"
    }
  ];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    // 필터 초기화
    setSelectedLandFilter("전체");
    setSelectedContractFilter("전체");
    setSelectedReportFilter("전체");
    setSelectedDisputeFilter("전체");
  };

  const getFilteredData = () => {
    if (selectedSort === "토지 임대/임차") {
      let filtered = lands;
      if (selectedLandFilter === "계약완료") {
        filtered = filtered.filter(item => item.status === "계약완료");
      } else if (selectedLandFilter === "계약중") {
        filtered = filtered.filter(item => item.status === "계약중");
      } else if (selectedLandFilter === "계약만료") {
        filtered = filtered.filter(item => item.status === "계약만료");
      }
      return filtered;
    } else if (selectedSort === "계약 관리") {
      let filtered = contracts;
      if (selectedContractFilter === "유효") {
        filtered = filtered.filter(item => item.status === "유효");
      } else if (selectedContractFilter === "대기") {
        filtered = filtered.filter(item => item.status === "대기");
      }
      return filtered;
    } else if (selectedSort === "신고 처리") {
      let filtered = reports;
      if (selectedReportFilter === "처리중") {
        filtered = filtered.filter(item => item.status === "처리중");
      } else if (selectedReportFilter === "처리완료") {
        filtered = filtered.filter(item => item.status === "처리완료");
      }
      return filtered;
    } else if (selectedSort === "분쟁 중재") {
      let filtered = disputes;
      if (selectedDisputeFilter === "중재중") {
        filtered = filtered.filter(item => item.status === "중재중");
      } else if (selectedDisputeFilter === "해결완료") {
        filtered = filtered.filter(item => item.status === "해결완료");
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
            <div className={styles.headerTop}>
              <h1 className={styles.title}>🏞️ 토지 임대/임차 관리</h1>
              <p className={styles.subtitle}>토지 임대/임차 현황을 관리합니다</p>
            </div>
            
            {/* 통계 카드 */}
            <div className={styles.statsGrid}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>토지 임대/임차</h3>
                </div>
                <div className={styles.number}>{lands.length}</div>
                <p className={styles.description}>총 토지 건수</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>계약 관리</h3>
                </div>
                <div className={styles.number}>{contracts.length}</div>
                <p className={styles.description}>활성 계약 건수</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>신고 처리</h3>
                </div>
                <div className={styles.number}>{reports.length}</div>
                <p className={styles.description}>처리 대기 건수</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>분쟁 중재</h3>
                </div>
                <div className={styles.number}>{disputes.length}</div>
                <p className={styles.description}>중재 진행 건수</p>
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
                      { id: "토지 임대/임차", label: "토지 임대/임차" },
                      { id: "계약 관리", label: "계약 관리" },
                      { id: "신고 처리", label: "신고 처리" },
                      { id: "분쟁 중재", label: "분쟁 중재" }
                    ]}
                    defaultActiveTab={selectedSort}
                    onTabChange={handleSortChange}
                  />
                  
                  {/* 세부 필터링 */}
                  {selectedSort === "토지 임대/임차" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "계약완료", "계약중", "계약만료"]}
                        value={selectedLandFilter}
                        onChange={(value) => setSelectedLandFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "계약 관리" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "유효", "대기"]}
                        value={selectedContractFilter}
                        onChange={(value) => setSelectedContractFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "신고 처리" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "처리중", "처리완료"]}
                        value={selectedReportFilter}
                        onChange={(value) => setSelectedReportFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "분쟁 중재" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "중재중", "해결완료"]}
                        value={selectedDisputeFilter}
                        onChange={(value) => setSelectedDisputeFilter(value)}
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
              <h3 className={styles.cardTitle}>토지 목록</h3>
              <p className={styles.cardDescription}>
                {selectedSort === "토지 임대/임차" && (
                  selectedLandFilter === "전체" 
                    ? "토지 임대/임차 목록" 
                    : `${selectedLandFilter} 토지 목록`
                )}
                {selectedSort === "계약 관리" && (
                  selectedContractFilter === "전체" 
                    ? "계약 관리 목록" 
                    : `${selectedContractFilter} 계약 목록`
                )}
                {selectedSort === "신고 처리" && (
                  selectedReportFilter === "전체" 
                    ? "신고 처리 목록" 
                    : `${selectedReportFilter} 신고 목록`
                )}
                {selectedSort === "분쟁 중재" && (
                  selectedDisputeFilter === "전체" 
                    ? "분쟁 중재 목록" 
                    : `${selectedDisputeFilter} 분쟁 목록`
                )}
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>선택</th>
                      <th>토지명</th>
                      <th>계약 당사자</th>
                      <th>계약 정보</th>
                      <th>상태</th>
                      <th>계약일</th>
                      <th>액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((item: any) => (
                      <tr key={item.id} className={styles.tableRow}>
                        <td>
                          <input type="checkbox" className={styles.checkbox} />
                        </td>
                        <td>
                          <div className={styles.itemInfo}>
                            <div className={styles.itemName}>
                              {item.name || item.landName}
                            </div>
                            <div className={styles.itemType}>
                              {selectedSort === "토지 임대/임차" ? "토지" :
                               selectedSort === "계약 관리" ? item.contractType :
                               selectedSort === "신고 처리" ? "신고" :
                               "분쟁"}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.partyInfo}>
                            <div className={styles.partyName}>
                              {selectedSort === "토지 임대/임차" ? `${item.owner} → ${item.renter}` :
                               selectedSort === "계약 관리" ? `${item.owner} → ${item.renter}` :
                               selectedSort === "신고 처리" ? item.reporter :
                               item.parties}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.contractInfo}>
                            {selectedSort === "토지 임대/임차" && (
                              <>
                                <div className={styles.contractDetail}>면적: {item.area}</div>
                                <div className={styles.contractDetail}>임대료: {formatCurrency(item.price)}</div>
                                <div className={styles.contractDetail}>기간: {item.duration}</div>
                                <div className={styles.contractDetail}>위치: {item.location}</div>
                              </>
                            )}
                            {selectedSort === "계약 관리" && (
                              <>
                                <div className={styles.contractDetail}>계약 유형: {item.contractType}</div>
                                <div className={styles.contractDetail}>월 임대료: {formatCurrency(item.monthlyRent)}</div>
                                <div className={styles.contractDetail}>만료일: {item.expiryDate}</div>
                              </>
                            )}
                            {selectedSort === "신고 처리" && (
                              <>
                                <div className={styles.contractDetail}>신고 사유: {item.reason}</div>
                                <div className={styles.contractDetail}>설명: {item.description}</div>
                              </>
                            )}
                            {selectedSort === "분쟁 중재" && (
                              <>
                                <div className={styles.contractDetail}>분쟁 사유: {item.reason}</div>
                                <div className={styles.contractDetail}>설명: {item.description}</div>
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className={styles.statusInfo}>
                            <div className={`${styles.statusDot} ${styles[item.status.replace(/[^a-zA-Z0-9]/g, '')]}`}></div>
                            <span className={styles.statusText}>{item.status}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.dateInfo}>
                            {item.startDate || item.signedDate || item.reportedAt || item.appliedAt}
                          </div>
                        </td>
                        <td>
                          <div className={styles.actionButtons}>
                            <Button size="sm" color="point">상세보기</Button>
                            {item.status === "계약중" && (
                              <Button size="sm" color="point2">계약완료</Button>
                            )}
                            {item.status === "대기" && (
                              <Button size="sm" color="point2">승인</Button>
                            )}
                            {item.status === "처리중" && (
                              <Button size="sm" color="point3">처리완료</Button>
                            )}
                            {item.status === "중재중" && (
                              <Button size="sm" color="point2">중재완료</Button>
                            )}
                          </div>
                        </td>
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

export default Rentals;