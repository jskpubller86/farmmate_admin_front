import React, { useState } from 'react';
import { Button, Badge } from "../../../components/ui";
import styles from "./products.module.css";
import { SortTabs, Tabs } from '../../../components/sets';

const Products: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("농산물 거래");
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>("전체");
  const [selectedLandFilter, setSelectedLandFilter] = useState<string>("전체");
  const [selectedReportFilter, setSelectedReportFilter] = useState<string>("전체");
  const [selectedDisputeFilter, setSelectedDisputeFilter] = useState<string>("전체");

  // 샘플 농산물 거래 데이터
  const products = [
    {
      id: 1,
      name: "유기농 토마토",
      seller: "김농부",
      buyer: "이구매자",
      category: "채소",
      price: 15000,
      quantity: 10,
      status: "거래완료",
      transactionDate: "2024.02.15",
      location: "경기도 수원시"
    },
    {
      id: 2,
      name: "친환경 상추",
      seller: "박재배자",
      buyer: "최소비자",
      category: "채소",
      price: 8000,
      quantity: 20,
      status: "거래중",
      transactionDate: "2024.02.14",
      location: "충청남도 천안시"
    },
    {
      id: 3,
      name: "무농약 당근",
      seller: "정농부",
      buyer: "한구매자",
      category: "채소",
      price: 12000,
      quantity: 15,
      status: "거래완료",
      transactionDate: "2024.02.13",
      location: "경상북도 안동시"
    },
    {
      id: 4,
      name: "유기농 배추",
      seller: "최농부",
      buyer: "김구매자",
      category: "채소",
      price: 20000,
      quantity: 5,
      status: "취소",
      transactionDate: "2024.02.12",
      location: "전라남도 나주시"
    }
  ];

  // 샘플 토지 거래 데이터
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
      transactionDate: "2024.02.15",
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
      transactionDate: "2024.02.14",
      location: "경기도 수원시"
    }
  ];

  // 샘플 신고 데이터
  const reports = [
    {
      id: 1,
      itemName: "유기농 토마토",
      reporter: "이신고자",
      reason: "품질 불량",
      status: "처리중",
      reportedAt: "2024.02.15",
      description: "신선하지 않은 상품을 신선하다고 표시"
    },
    {
      id: 2,
      itemName: "강남구 농지",
      reporter: "박신고자",
      reason: "허위 정보",
      status: "처리완료",
      reportedAt: "2024.02.14",
      description: "실제 면적과 다르게 표시"
    }
  ];

  // 샘플 분쟁 데이터
  const disputes = [
    {
      id: 1,
      itemName: "친환경 상추",
      parties: "박재배자 vs 최소비자",
      reason: "배송 지연",
      status: "중재중",
      appliedAt: "2024.02.15",
      description: "약속된 배송일보다 3일 지연"
    },
    {
      id: 2,
      itemName: "수원시 밭",
      parties: "김토지주 vs 최임차인",
      reason: "계약 위반",
      status: "해결완료",
      appliedAt: "2024.02.14",
      description: "계약 조건과 다른 사용"
    }
  ];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    // 필터 초기화
    setSelectedProductFilter("전체");
    setSelectedLandFilter("전체");
    setSelectedReportFilter("전체");
    setSelectedDisputeFilter("전체");
  };

  const getFilteredData = () => {
    if (selectedSort === "농산물 거래") {
      let filtered = products;
      if (selectedProductFilter === "거래완료") {
        filtered = filtered.filter(item => item.status === "거래완료");
      } else if (selectedProductFilter === "거래중") {
        filtered = filtered.filter(item => item.status === "거래중");
      } else if (selectedProductFilter === "취소") {
        filtered = filtered.filter(item => item.status === "취소");
      }
      return filtered;
    } else if (selectedSort === "토지 거래") {
      let filtered = lands;
      if (selectedLandFilter === "계약완료") {
        filtered = filtered.filter(item => item.status === "계약완료");
      } else if (selectedLandFilter === "계약중") {
        filtered = filtered.filter(item => item.status === "계약중");
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
              <h1 className={styles.title}>🌾 거래 관리</h1>
              <p className={styles.subtitle}>농산물 및 토지 거래 현황을 관리합니다</p>
            </div>
            
            {/* 통계 카드 */}
            <div className={styles.statsGrid}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>농산물 거래</h3>
                </div>
                <div className={styles.number}>{products.length}</div>
                <p className={styles.description}>총 거래 건수</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>토지 거래</h3>
                </div>
                <div className={styles.number}>{lands.length}</div>
                <p className={styles.description}>총 계약 건수</p>
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
                      { id: "농산물 거래", label: "농산물 거래" },
                      { id: "토지 거래", label: "토지 거래" },
                      { id: "신고 처리", label: "신고 처리" },
                      { id: "분쟁 중재", label: "분쟁 중재" }
                    ]}
                    defaultActiveTab={selectedSort}
                    onTabChange={handleSortChange}
                  />
                  
                  {/* 세부 필터링 */}
                  {selectedSort === "농산물 거래" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "거래완료", "거래중", "취소"]}
                        value={selectedProductFilter}
                        onChange={(value) => setSelectedProductFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "토지 거래" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "계약완료", "계약중"]}
                        value={selectedLandFilter}
                        onChange={(value) => setSelectedLandFilter(value)}
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
              <h3 className={styles.cardTitle}>거래 목록</h3>
              <p className={styles.cardDescription}>
                {selectedSort === "농산물 거래" && (
                  selectedProductFilter === "전체" 
                    ? "농산물 거래 목록" 
                    : `${selectedProductFilter} 농산물 거래 목록`
                )}
                {selectedSort === "토지 거래" && (
                  selectedLandFilter === "전체" 
                    ? "토지 거래 목록" 
                    : `${selectedLandFilter} 토지 거래 목록`
                )}
                {selectedSort === "신고 처리" && (
                  selectedReportFilter === "전체" 
                    ? "신고 처리 목록" 
                    : `${selectedReportFilter} 신고 처리 목록`
                )}
                {selectedSort === "분쟁 중재" && (
                  selectedDisputeFilter === "전체" 
                    ? "분쟁 중재 목록" 
                    : `${selectedDisputeFilter} 분쟁 중재 목록`
                )}
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>선택</th>
                      <th>항목명</th>
                      <th>거래 당사자</th>
                      <th>거래 정보</th>
                      <th>상태</th>
                      <th>거래일</th>
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
                              {item.name || item.itemName}
                            </div>
                            <div className={styles.itemType}>
                              {selectedSort === "농산물 거래" ? item.category :
                               selectedSort === "토지 거래" ? "토지" :
                               selectedSort === "신고 처리" ? "신고" :
                               "분쟁"}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.partyInfo}>
                            <div className={styles.partyName}>
                              {selectedSort === "농산물 거래" ? `${item.seller} → ${item.buyer}` :
                               selectedSort === "토지 거래" ? `${item.owner} → ${item.renter}` :
                               selectedSort === "신고 처리" ? item.reporter :
                               item.parties}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.transactionInfo}>
                            {selectedSort === "농산물 거래" && (
                              <>
                                <div className={styles.transactionDetail}>가격: {formatCurrency(item.price)}</div>
                                <div className={styles.transactionDetail}>수량: {item.quantity}개</div>
                                <div className={styles.transactionDetail}>위치: {item.location}</div>
                              </>
                            )}
                            {selectedSort === "토지 거래" && (
                              <>
                                <div className={styles.transactionDetail}>가격: {formatCurrency(item.price)}</div>
                                <div className={styles.transactionDetail}>면적: {item.area}</div>
                                <div className={styles.transactionDetail}>기간: {item.duration}</div>
                              </>
                            )}
                            {selectedSort === "신고 처리" && (
                              <>
                                <div className={styles.transactionDetail}>사유: {item.reason}</div>
                                <div className={styles.transactionDetail}>설명: {item.description}</div>
                              </>
                            )}
                            {selectedSort === "분쟁 중재" && (
                              <>
                                <div className={styles.transactionDetail}>사유: {item.reason}</div>
                                <div className={styles.transactionDetail}>설명: {item.description}</div>
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
                            {item.transactionDate || item.reportedAt || item.appliedAt}
                          </div>
                        </td>
                        <td>
                          <div className={styles.actionButtons}>
                            <Button size="sm" color="point">상세보기</Button>
                            {item.status === "거래중" && (
                              <Button size="sm" color="point2">거래완료</Button>
                            )}
                            {item.status === "계약중" && (
                              <Button size="sm" color="point2">계약완료</Button>
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

export default Products;