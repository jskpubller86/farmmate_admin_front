import React, { useState } from 'react';
import { Button, Badge, Select } from "../../../components/ui";
import styles from "./reports.module.css";
import { SortTabs, Tabs } from '../../../components/sets';

const Reports: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("농산물 신고");
  const [selectedProductReportFilter, setSelectedProductReportFilter] = useState<string>("전체");
  const [selectedUserReportFilter, setSelectedUserReportFilter] = useState<string>("전체");

  // 농산물 관련 신고 데이터 (상태 관리 개선)
  const [productReports, setProductReports] = useState([
    {
      id: 1,
      type: "농산물",
      itemName: "유기농 토마토",
      seller: "김농부",
      reporter: "이구매자",
      reason: "허위 정보",
      description: "유기농이 아닌데 유기농으로 광고",
      status: "조사대기", // 조사대기 → 처리완료 순서
      reportedAt: "2024.02.15",
      evidence: ["상품사진", "구매영수증", "채팅내역"]
    },
    {
      id: 2,
      type: "농산물",
      itemName: "친환경 상추",
      seller: "박재배자",
      reporter: "최소비자",
      reason: "품질 불량",
      description: "신선하지 않은 상품을 신선하다고 표시",
      status: "처리완료",
      reportedAt: "2024.02.14",
      evidence: ["상품사진", "배송사진"],
      result: "신고 기각"
    },
    {
      id: 3,
      type: "농산물",
      itemName: "무농약 당근",
      seller: "정농부",
      reporter: "한구매자",
      reason: "가격 조작",
      description: "시세보다 비싸게 판매",
      status: "처리완료",
      reportedAt: "2024.02.13",
      evidence: ["가격비교자료", "시세표"]
    }
  ]);


  // 사용자 관련 신고 데이터 (상태 통일)
  const userReports = [
    {
      id: 1,
      type: "사용자",
      reportedUser: "김농부",
      reporter: "이구매자",
      reason: "욕설",
      description: "거래 중 욕설 사용",
      status: "조사대기",
      reportedAt: "2024.02.15",
      evidence: ["채팅내역", "녹음파일"]
    },
    {
      id: 2,
      type: "사용자",
      reportedUser: "박토지주",
      reporter: "김임차인",
      reason: "협박",
      description: "계약 해지 협박",
      status: "처리완료",
      reportedAt: "2024.02.14",
      evidence: ["채팅내역", "통화녹음"],
      result: "경고 조치"
    }
  ];


  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setSelectedProductReportFilter("전체");
    setSelectedUserReportFilter("전체");
  };

  // 상태 변경 핸들러
  const handleStatusChange = (reportId: number, newStatus: string) => {
    if (selectedSort === "농산물 신고") {
      setProductReports(prev => 
        prev.map(report => 
          report.id === reportId 
            ? { ...report, status: newStatus }
            : report
        )
      );
    } else if (selectedSort === "사용자 신고") {
      // 사용자 신고는 별도 상태 관리가 필요하지만 현재는 productReports에 통합 관리
      setProductReports(prev => 
        prev.map(report => 
          report.id === reportId 
            ? { ...report, status: newStatus }
            : report
        )
      );
    }
  };


  // 계약 관련 안내 팝업
  const showContractNotice = () => {
    alert(`📋 계약 관련 안내

• 계약서는 5년간 보관됩니다
• 법적 분쟁은 당사자 간 해결해주세요
• 민사소송 관련: 법원 홈페이지 이용
• 증거 자료는 중개인으로서 제공만 가능합니다
• 계약 내용은 당사자 책임입니다

⚠️ 신중한 계약 체결을 권장합니다.`);
  };

  // 통일된 데이터 구조로 변환하는 함수
  const normalizeData = (data: any[], type: string) => {
    return data.map(item => ({
      id: item.id,
      itemName: item.itemName || item.reportedUser,
      type: item.type || type,
      reporter: item.reporter,
      reportedUser: item.seller || item.owner || item.reportedUser,
      reason: item.reason,
      description: item.description,
      status: item.status,
      reportedAt: item.reportedAt,
      evidence: item.evidence,
      result: item.result
    }));
  };

  const getFilteredData = () => {
    if (selectedSort === "농산물 신고") {
      let filtered = productReports;
      if (selectedProductReportFilter === "조사대기") {
        filtered = filtered.filter(item => item.status === "조사대기");
      } else if (selectedProductReportFilter === "처리완료") {
        filtered = filtered.filter(item => item.status === "처리완료");
      }
      return normalizeData(filtered, "농산물");
    } else if (selectedSort === "사용자 신고") {
      let filtered = userReports;
      if (selectedUserReportFilter === "조사대기") {
        filtered = filtered.filter(item => item.status === "조사대기");
      } else if (selectedUserReportFilter === "처리완료") {
        filtered = filtered.filter(item => item.status === "처리완료");
      }
      return normalizeData(filtered, "사용자");
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
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.title}>신고 처리</h1>
                <p className={styles.subtitle}>농산물, 사용자 신고를 처리하세요</p>
              </div>
              <Button 
                size="sm" 
                color="secondary"
                onClick={showContractNotice}
              >
                📋 계약 안내
              </Button>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>조사 대기</h3>
                <Button size="sm" color="danger" disabled>🔍</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {productReports.filter(r => r.status === "조사대기").length + userReports.filter(r => r.status === "조사대기").length}
                </div>
                <p className={styles.description}>접수된 신고</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>처리 완료</h3>
                <Button size="sm" color="point2" disabled>🎯</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {productReports.filter(r => r.status === "처리완료").length + userReports.filter(r => r.status === "처리완료").length}
                </div>
                <p className={styles.description}>처리완료된 신고</p>
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
                      { id: "농산물 신고", label: "농산물 신고" },
                      { id: "사용자 신고", label: "사용자 신고" }
                    ]}
                    defaultActiveTab={selectedSort}
                    onTabChange={handleSortChange}
                  />
                  
                  {/* 세부 필터링 */}
                  {selectedSort === "농산물 신고" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "조사대기", "처리완료"]}
                        value={selectedProductReportFilter}
                        onChange={(value) => setSelectedProductReportFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "사용자 신고" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "조사대기", "처리완료"]}
                        value={selectedUserReportFilter}
                        onChange={(value) => setSelectedUserReportFilter(value)}
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
              <h3 className={styles.cardTitle}>신고 목록</h3>
              <p className={styles.cardDescription}>
                {selectedSort === "농산물 신고" && (
                  selectedProductReportFilter === "전체" 
                    ? "농산물 신고 목록" 
                    : `${selectedProductReportFilter} 농산물 신고 목록`
                )}
                {selectedSort === "사용자 신고" && (
                  selectedUserReportFilter === "전체" 
                    ? "사용자 신고 목록" 
                    : `${selectedUserReportFilter} 사용자 신고 목록`
                )}
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>항목명</th>
                      <th>신고자/피신고자</th>
                      <th>신고 사유</th>
                      <th>상태</th>
                      <th>신고일</th>
                      <th>액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((item: any) => (
                      <tr key={item.id} className={styles.tableRow}>
                        <td>
                          <div className={styles.itemInfo}>
                            <div className={styles.itemName}>{item.itemName}</div>
                            <div className={styles.itemType}>{item.type}</div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.partyInfo}>
                            <div className={styles.partyName}>
                              {item.reportedUser ? `${item.reportedUser} → ${item.reporter}` : item.reporter}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.reasonInfo}>
                            <div className={styles.reason}>{item.reason}</div>
                            <div className={styles.description}>{item.description}</div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.statusInfo}>
                            <div className={`${styles.statusDot} ${styles[item.status.replace(/[^a-zA-Z0-9]/g, '')]}`}></div>
                            <span className={styles.statusText}>{item.status}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.dateInfo}>{item.reportedAt}</div>
                        </td>
                        <td>
                          <div className={styles.actionButtons}>
                            <Button size="sm" color="point">상세보기</Button>
                            
                            {/* 조사대기 상태일 때만 제재 버튼 표시 */}
                            {item.status === "조사대기" && (
                              <Button 
                                size="sm" 
                                color="danger"
                                onClick={() => {
                                  const action = item.type === "농산물" ? "판매중지" : "활동정지";
                                  if (window.confirm(`${item.type === "농산물" ? "농산물" : "사용자"} 신고를 ${action} 처리하시겠습니까?`)) {
                                    alert(`${action} 처리가 완료되었습니다.`);
                                    handleStatusChange(item.id, "처리완료");
                                  }
                                }}
                              >
                                {item.type === "농산물" ? "판매중지" : "활동정지"}
                              </Button>
                            )}
                            
                            <select 
                              className={styles.statusSelect}
                              value={item.status}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            >
                              <option value="조사대기">조사대기</option>
                              <option value="처리완료">처리완료</option>
                            </select>
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

export default Reports;