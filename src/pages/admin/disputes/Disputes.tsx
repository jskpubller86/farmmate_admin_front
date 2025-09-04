import React, { useState } from 'react';
import { Button, Badge } from "../../../components/ui";
import styles from "./disputes.module.css";
import { SortTabs, Tabs } from '../../../components/sets';

const Disputes: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("분쟁 중재");
  const [selectedDisputeFilter, setSelectedDisputeFilter] = useState<string>("전체");
  const [selectedMediationFilter, setSelectedMediationFilter] = useState<string>("전체");
  const [selectedResolutionFilter, setSelectedResolutionFilter] = useState<string>("전체");
  const [selectedAppealFilter, setSelectedAppealFilter] = useState<string>("전체");

  // 샘플 분쟁 중재 데이터
  const disputes = [
    {
      id: 1,
      caseNumber: "D2024-001",
      title: "농산물 품질 분쟁",
      applicant: "김구매자",
      respondent: "이판매자",
      disputeType: "품질 분쟁",
      amount: 50000,
      status: "중재중",
      appliedAt: "2024.02.15",
      description: "구매한 농산물이 약속된 품질과 다름",
      evidence: ["상품사진", "구매영수증", "채팅내역"]
    },
    {
      id: 2,
      caseNumber: "D2024-002",
      title: "토지 임대 계약 분쟁",
      applicant: "박임차인",
      respondent: "최토지주",
      disputeType: "계약 분쟁",
      amount: 300000,
      status: "중재완료",
      appliedAt: "2024.02.14",
      description: "계약 조건과 다른 사용에 대한 분쟁",
      evidence: ["계약서", "사진자료"],
      resolution: "피신청인이 계약 조건 준수하도록 조치"
    },
    {
      id: 3,
      caseNumber: "D2024-003",
      title: "배송 지연 손해 배상",
      applicant: "한구매자",
      respondent: "정판매자",
      disputeType: "배송 분쟁",
      amount: 20000,
      status: "조사중",
      appliedAt: "2024.02.13",
      description: "약속된 배송일보다 5일 지연으로 인한 손해",
      evidence: ["배송추적내역", "채팅내역"]
    },
    {
      id: 4,
      caseNumber: "D2024-004",
      title: "환불 거부 분쟁",
      applicant: "최구매자",
      respondent: "김판매자",
      disputeType: "환불 분쟁",
      amount: 15000,
      status: "중재중",
      appliedAt: "2024.02.12",
      description: "상품 하자로 인한 환불 요구 거부",
      evidence: ["상품사진", "환불요청서"]
    }
  ];

  // 샘플 중재 진행 데이터
  const mediations = [
    {
      id: 1,
      caseNumber: "D2024-001",
      mediator: "김중재인",
      sessionDate: "2024.02.20",
      status: "진행중",
      nextSession: "2024.02.25",
      progress: "증거 검토 단계"
    },
    {
      id: 2,
      caseNumber: "D2024-003",
      mediator: "이중재인",
      sessionDate: "2024.02.18",
      status: "완료",
      nextSession: null,
      progress: "중재 완료"
    }
  ];

  // 샘플 해결 방안 데이터
  const resolutions = [
    {
      id: 1,
      caseNumber: "D2024-002",
      resolutionType: "조정안",
      content: "피신청인이 계약 조건을 준수하도록 조치하고, 신청인에게 사과문 발송",
      status: "수락",
      proposedAt: "2024.02.16",
      acceptedAt: "2024.02.17"
    },
    {
      id: 2,
      caseNumber: "D2024-003",
      resolutionType: "중재판정",
      content: "피신청인이 신청인에게 15,000원 배상금 지급",
      status: "거부",
      proposedAt: "2024.02.19",
      rejectedAt: "2024.02.20"
    }
  ];

  // 샘플 이의신청 데이터
  const appeals = [
    {
      id: 1,
      caseNumber: "D2024-003",
      appellant: "정판매자",
      appealReason: "중재판정 부당",
      status: "검토중",
      submittedAt: "2024.02.21",
      description: "중재판정이 부당하다고 판단하여 이의신청"
    },
    {
      id: 2,
      caseNumber: "D2024-002",
      appellant: "최토지주",
      appealReason: "조정안 불공정",
      status: "기각",
      submittedAt: "2024.02.18",
      description: "조정안이 불공정하다고 판단하여 이의신청",
      result: "이의신청 기각"
    }
  ];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    // 필터 초기화
    setSelectedDisputeFilter("전체");
    setSelectedMediationFilter("전체");
    setSelectedResolutionFilter("전체");
    setSelectedAppealFilter("전체");
  };

  const getFilteredData = () => {
    if (selectedSort === "분쟁 중재") {
      let filtered = disputes;
      if (selectedDisputeFilter === "중재중") {
        filtered = filtered.filter(item => item.status === "중재중");
      } else if (selectedDisputeFilter === "중재완료") {
        filtered = filtered.filter(item => item.status === "중재완료");
      } else if (selectedDisputeFilter === "조사중") {
        filtered = filtered.filter(item => item.status === "조사중");
      }
      return filtered;
    } else if (selectedSort === "중재 진행") {
      let filtered = mediations;
      if (selectedMediationFilter === "진행중") {
        filtered = filtered.filter(item => item.status === "진행중");
      } else if (selectedMediationFilter === "완료") {
        filtered = filtered.filter(item => item.status === "완료");
      }
      return filtered;
    } else if (selectedSort === "해결 방안") {
      let filtered = resolutions;
      if (selectedResolutionFilter === "수락") {
        filtered = filtered.filter(item => item.status === "수락");
      } else if (selectedResolutionFilter === "거부") {
        filtered = filtered.filter(item => item.status === "거부");
      }
      return filtered;
    } else if (selectedSort === "이의신청") {
      let filtered = appeals;
      if (selectedAppealFilter === "검토중") {
        filtered = filtered.filter(item => item.status === "검토중");
      } else if (selectedAppealFilter === "기각") {
        filtered = filtered.filter(item => item.status === "기각");
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
              <h1 className={styles.title}>⚖️ 분쟁 중재</h1>
              <p className={styles.subtitle}>분쟁 중재 및 해결을 관리합니다</p>
            </div>
            
            {/* 통계 카드 */}
            <div className={styles.statsGrid}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>분쟁 중재</h3>
                </div>
                <div className={styles.number}>{disputes.length}</div>
                <p className={styles.description}>총 분쟁 건수</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>중재 진행</h3>
                </div>
                <div className={styles.number}>{mediations.length}</div>
                <p className={styles.description}>진행 중인 중재</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>해결 방안</h3>
                </div>
                <div className={styles.number}>{resolutions.length}</div>
                <p className={styles.description}>제시된 해결안</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>이의신청</h3>
                </div>
                <div className={styles.number}>{appeals.length}</div>
                <p className={styles.description}>이의신청 건수</p>
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
                      { id: "분쟁 중재", label: "분쟁 중재" },
                      { id: "중재 진행", label: "중재 진행" },
                      { id: "해결 방안", label: "해결 방안" },
                      { id: "이의신청", label: "이의신청" }
                    ]}
                    defaultActiveTab={selectedSort}
                    onTabChange={handleSortChange}
                  />
                  
                  {/* 세부 필터링 */}
                  {selectedSort === "분쟁 중재" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "중재중", "중재완료", "조사중"]}
                        value={selectedDisputeFilter}
                        onChange={(value) => setSelectedDisputeFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "중재 진행" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "진행중", "완료"]}
                        value={selectedMediationFilter}
                        onChange={(value) => setSelectedMediationFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "해결 방안" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "수락", "거부"]}
                        value={selectedResolutionFilter}
                        onChange={(value) => setSelectedResolutionFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "이의신청" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "검토중", "기각"]}
                        value={selectedAppealFilter}
                        onChange={(value) => setSelectedAppealFilter(value)}
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
              <h3 className={styles.cardTitle}>분쟁 목록</h3>
              <p className={styles.cardDescription}>
                {selectedSort === "분쟁 중재" && (
                  selectedDisputeFilter === "전체" 
                    ? "분쟁 중재 목록" 
                    : `${selectedDisputeFilter} 분쟁 목록`
                )}
                {selectedSort === "중재 진행" && (
                  selectedMediationFilter === "전체" 
                    ? "중재 진행 목록" 
                    : `${selectedMediationFilter} 중재 목록`
                )}
                {selectedSort === "해결 방안" && (
                  selectedResolutionFilter === "전체" 
                    ? "해결 방안 목록" 
                    : `${selectedResolutionFilter} 해결안 목록`
                )}
                {selectedSort === "이의신청" && (
                  selectedAppealFilter === "전체" 
                    ? "이의신청 목록" 
                    : `${selectedAppealFilter} 이의신청 목록`
                )}
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>선택</th>
                      <th>사건번호/제목</th>
                      <th>당사자</th>
                      <th>분쟁 정보</th>
                      <th>상태</th>
                      <th>신청일</th>
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
                              {item.caseNumber || item.title}
                            </div>
                            <div className={styles.itemType}>
                              {selectedSort === "분쟁 중재" ? item.disputeType :
                               selectedSort === "중재 진행" ? "중재" :
                               selectedSort === "해결 방안" ? item.resolutionType :
                               "이의신청"}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.partyInfo}>
                            <div className={styles.partyName}>
                              {selectedSort === "분쟁 중재" ? `${item.applicant} vs ${item.respondent}` :
                               selectedSort === "중재 진행" ? `중재인: ${item.mediator}` :
                               selectedSort === "해결 방안" ? item.caseNumber :
                               item.appellant}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.disputeInfo}>
                            {selectedSort === "분쟁 중재" && (
                              <>
                                <div className={styles.disputeDetail}>분쟁금액: {formatCurrency(item.amount)}</div>
                                <div className={styles.disputeDetail}>설명: {item.description}</div>
                                {item.evidence && (
                                  <div className={styles.disputeDetail}>증거: {item.evidence.join(", ")}</div>
                                )}
                              </>
                            )}
                            {selectedSort === "중재 진행" && (
                              <>
                                <div className={styles.disputeDetail}>중재인: {item.mediator}</div>
                                <div className={styles.disputeDetail}>진행상황: {item.progress}</div>
                                {item.nextSession && (
                                  <div className={styles.disputeDetail}>다음 회기: {item.nextSession}</div>
                                )}
                              </>
                            )}
                            {selectedSort === "해결 방안" && (
                              <>
                                <div className={styles.disputeDetail}>해결안: {item.content}</div>
                                <div className={styles.disputeDetail}>제시일: {item.proposedAt}</div>
                                {item.acceptedAt && (
                                  <div className={styles.disputeDetail}>수락일: {item.acceptedAt}</div>
                                )}
                                {item.rejectedAt && (
                                  <div className={styles.disputeDetail}>거부일: {item.rejectedAt}</div>
                                )}
                              </>
                            )}
                            {selectedSort === "이의신청" && (
                              <>
                                <div className={styles.disputeDetail}>신청인: {item.appellant}</div>
                                <div className={styles.disputeDetail}>사유: {item.appealReason}</div>
                                <div className={styles.disputeDetail}>설명: {item.description}</div>
                                {item.result && (
                                  <div className={styles.disputeDetail}>결과: {item.result}</div>
                                )}
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
                            {item.appliedAt || item.sessionDate || item.proposedAt || item.submittedAt}
                          </div>
                        </td>
                        <td>
                          <div className={styles.actionButtons}>
                            <Button size="sm" color="point">상세보기</Button>
                            {item.status === "중재중" && (
                              <Button size="sm" color="point2">중재완료</Button>
                            )}
                            {item.status === "조사중" && (
                              <Button size="sm" color="point3">조사완료</Button>
                            )}
                            {item.status === "검토중" && (
                              <Button size="sm" color="point2">검토완료</Button>
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

export default Disputes;
