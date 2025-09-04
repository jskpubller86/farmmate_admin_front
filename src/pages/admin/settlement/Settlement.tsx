import React, { useState } from 'react';
import { Button, Badge } from "../../../components/ui";
import styles from "./settlement.module.css";
import { SortTabs, Tabs } from '../../../components/sets';

const Settlement: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("거래수수료확인");
  const [selectedFeeFilter, setSelectedFeeFilter] = useState<string>("전체");
  const [selectedSettlementFilter, setSelectedSettlementFilter] = useState<string>("전체");
  const [selectedRefundFilter, setSelectedRefundFilter] = useState<string>("전체");

  // 거래 수수료 확인 데이터
  const transactionFees = [
    {
      id: 1,
      transactionId: "TXN001",
      type: "농산물",
      itemName: "유기농 토마토",
      seller: "김농부",
      buyer: "이구매자",
      transactionAmount: 15000,
      feeRate: 3.5,
      feeAmount: 525,
      status: "완료",
      transactionDate: "2024.02.15",
      feeStatus: "수수료 징수 완료"
    },
    {
      id: 2,
      transactionId: "TXN002",
      type: "토지",
      itemName: "강남구 농지",
      seller: "박토지주",
      buyer: "김임차인",
      transactionAmount: 500000,
      feeRate: 5.0,
      feeAmount: 25000,
      status: "완료",
      transactionDate: "2024.02.14",
      feeStatus: "수수료 징수 완료"
    },
    {
      id: 3,
      transactionId: "TXN003",
      type: "농산물",
      itemName: "친환경 상추",
      seller: "이재배자",
      buyer: "최소비자",
      transactionAmount: 8000,
      feeRate: 3.5,
      feeAmount: 280,
      status: "진행중",
      transactionDate: "2024.02.13",
      feeStatus: "수수료 징수 대기"
    }
  ];

  // 정산 내역 검토 데이터
  const settlements = [
    {
      id: 1,
      sellerId: "SELLER001",
      sellerName: "김농부",
      period: "2024년 2월",
      totalSales: 2500000,
      totalFees: 87500,
      netAmount: 2412500,
      status: "정산완료",
      settlementDate: "2024.03.01",
      bankAccount: "농협 123-456-789",
      settlementMethod: "계좌이체"
    },
    {
      id: 2,
      sellerId: "SELLER002",
      sellerName: "박토지주",
      period: "2024년 2월",
      totalSales: 1500000,
      totalFees: 75000,
      netAmount: 1425000,
      status: "정산대기",
      settlementDate: "2024.03.01",
      bankAccount: "국민 987-654-321",
      settlementMethod: "계좌이체"
    },
    {
      id: 3,
      sellerId: "SELLER003",
      sellerName: "이재배자",
      period: "2024년 2월",
      totalSales: 1800000,
      totalFees: 63000,
      netAmount: 1737000,
      status: "정산진행중",
      settlementDate: "2024.03.01",
      bankAccount: "신한 456-789-123",
      settlementMethod: "계좌이체"
    }
  ];

  // 환불/취소 관련 중재 데이터
  const refunds = [
    {
      id: 1,
      transactionId: "TXN004",
      type: "환불",
      itemName: "유기농 토마토",
      seller: "김농부",
      buyer: "이구매자",
      amount: 15000,
      reason: "상품 불량",
      status: "처리중",
      requestedAt: "2024.02.15",
      description: "배송된 상품이 상했음",
      evidence: ["상품사진", "배송사진"]
    },
    {
      id: 2,
      transactionId: "TXN005",
      type: "취소",
      itemName: "강남구 농지",
      seller: "박토지주",
      buyer: "김임차인",
      amount: 500000,
      reason: "계약 위반",
      status: "처리완료",
      requestedAt: "2024.02.14",
      description: "임대인 측 계약 위반",
      evidence: ["계약서", "채팅내역"],
      result: "환불 승인"
    },
    {
      id: 3,
      transactionId: "TXN006",
      type: "환불",
      itemName: "친환경 상추",
      seller: "이재배자",
      buyer: "최소비자",
      amount: 8000,
      reason: "배송 지연",
      status: "거절",
      requestedAt: "2024.02.13",
      description: "배송이 3일 지연됨",
      evidence: ["배송추적내역"],
      result: "환불 거절 - 불가피한 사유"
    }
  ];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setSelectedFeeFilter("전체");
    setSelectedSettlementFilter("전체");
    setSelectedRefundFilter("전체");
  };

  const getFilteredData = () => {
    if (selectedSort === "거래수수료확인") {
      let filtered = transactionFees;
      if (selectedFeeFilter === "완료") {
        filtered = filtered.filter(item => item.status === "완료");
      } else if (selectedFeeFilter === "진행중") {
        filtered = filtered.filter(item => item.status === "진행중");
      }
      return filtered;
    } else if (selectedSort === "정산내역검토") {
      let filtered = settlements;
      if (selectedSettlementFilter === "정산완료") {
        filtered = filtered.filter(item => item.status === "정산완료");
      } else if (selectedSettlementFilter === "정산대기") {
        filtered = filtered.filter(item => item.status === "정산대기");
      } else if (selectedSettlementFilter === "정산진행중") {
        filtered = filtered.filter(item => item.status === "정산진행중");
      }
      return filtered;
    } else if (selectedSort === "환불취소중재") {
      let filtered = refunds;
      if (selectedRefundFilter === "처리중") {
        filtered = filtered.filter(item => item.status === "처리중");
      } else if (selectedRefundFilter === "처리완료") {
        filtered = filtered.filter(item => item.status === "처리완료");
      } else if (selectedRefundFilter === "거절") {
        filtered = filtered.filter(item => item.status === "거절");
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
            <h1 className={styles.title}>💰 정산 / 수수료 관리</h1>
            <p className={styles.subtitle}>거래 수수료 확인, 정산 내역 검토, 환불/취소 관련 중재를 관리하세요</p>
          </div>

          {/* 통계 카드 */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>총 수수료</h3>
                <Button size="sm" color="point" disabled>💳</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {formatCurrency(transactionFees.reduce((sum, fee) => sum + fee.feeAmount, 0))}
                </div>
                <p className={styles.description}>이번 달 수수료 수입</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>정산 대기</h3>
                <Button size="sm" color="point2" disabled>⏳</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{settlements.filter(s => s.status === "정산대기").length}</div>
                <p className={styles.description}>정산 대기 중인 판매자</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>환불 처리</h3>
                <Button size="sm" color="danger" disabled>🔄</Button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{refunds.filter(r => r.status === "처리중").length}</div>
                <p className={styles.description}>처리 중인 환불/취소</p>
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
                      { id: "거래수수료확인", label: "거래 수수료 확인" },
                      { id: "정산내역검토", label: "정산 내역 검토" },
                      { id: "환불취소중재", label: "환불/취소 중재" }
                    ]}
                    defaultActiveTab={selectedSort}
                    onTabChange={handleSortChange}
                  />
                  
                  {/* 세부 필터링 */}
                  {selectedSort === "거래수수료확인" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "완료", "진행중"]}
                        value={selectedFeeFilter}
                        onChange={(value) => setSelectedFeeFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "정산내역검토" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "정산완료", "정산대기", "정산진행중"]}
                        value={selectedSettlementFilter}
                        onChange={(value) => setSelectedSettlementFilter(value)}
                      />
                    </div>
                  )}
                  
                  {selectedSort === "환불취소중재" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "처리중", "처리완료", "거절"]}
                        value={selectedRefundFilter}
                        onChange={(value) => setSelectedRefundFilter(value)}
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
              <h3 className={styles.cardTitle}>정산/수수료 목록</h3>
              <p className={styles.cardDescription}>
                {selectedSort === "거래수수료확인" && (
                  selectedFeeFilter === "전체" 
                    ? "거래 수수료 확인 목록" 
                    : `${selectedFeeFilter} 거래 목록`
                )}
                {selectedSort === "정산내역검토" && (
                  selectedSettlementFilter === "전체" 
                    ? "정산 내역 검토 목록" 
                    : `${selectedSettlementFilter} 정산 목록`
                )}
                {selectedSort === "환불취소중재" && (
                  selectedRefundFilter === "전체" 
                    ? "환불/취소 중재 목록" 
                    : `${selectedRefundFilter} 환불/취소 목록`
                )}
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.dataList}>
                {currentData.map((item: any) => (
                  <div key={item.id} className={styles.dataItem}>
                    <div className={styles.dataInfo}>
                      <h4 className={styles.dataTitle}>
                        {selectedSort === "거래수수료확인" ? item.transactionId :
                         selectedSort === "정산내역검토" ? item.sellerName :
                         item.transactionId}
                      </h4>
                      <p className={styles.dataSubtitle}>
                        {selectedSort === "거래수수료확인" ? `${item.itemName} | ${item.seller} → ${item.buyer}` :
                         selectedSort === "정산내역검토" ? `${item.period} | ${item.settlementMethod}` :
                         `${item.itemName} | ${item.seller} → ${item.buyer}`}
                      </p>
                      {selectedSort === "거래수수료확인" && (
                        <p className={styles.dataDetail}>
                          거래금액: {formatCurrency(item.transactionAmount)} | 수수료율: {item.feeRate}% | 수수료: {formatCurrency(item.feeAmount)}
                        </p>
                      )}
                      {selectedSort === "정산내역검토" && (
                        <p className={styles.dataDetail}>
                          총매출: {formatCurrency(item.totalSales)} | 수수료: {formatCurrency(item.totalFees)} | 정산금액: {formatCurrency(item.netAmount)}
                        </p>
                      )}
                      {selectedSort === "환불취소중재" && (
                        <p className={styles.dataDetail}>
                          금액: {formatCurrency(item.amount)} | 사유: {item.reason} | 요청일: {item.requestedAt}
                        </p>
                      )}
                      {item.description && (
                        <p className={styles.dataDescription}>
                          {item.description}
                        </p>
                      )}
                      {item.evidence && (
                        <p className={styles.dataEvidence}>
                          증거자료: {item.evidence.join(", ")}
                        </p>
                      )}
                      {item.result && (
                        <p className={styles.dataResult}>
                          처리결과: {item.result}
                        </p>
                      )}
                    </div>
                    <div className={styles.dataStatus}>
                      <Badge 
                        size="sm" 
                        color={
                          item.status === "완료" || item.status === "정산완료" || item.status === "처리완료" ? "point" : 
                          item.status === "진행중" || item.status === "정산진행중" || item.status === "처리중" ? "secondary" : 
                          item.status === "정산대기" ? "point2" : "danger"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className={styles.dataActions}>
                      <Button size="sm" color="point">
                        상세보기
                      </Button>
                      {selectedSort === "정산내역검토" && item.status === "정산대기" && (
                        <Button size="sm" color="point2">
                          정산처리
                        </Button>
                      )}
                      {selectedSort === "환불취소중재" && item.status === "처리중" && (
                        <>
                          <Button size="sm" color="point2">
                            승인
                          </Button>
                          <Button size="sm" color="danger">
                            거절
                          </Button>
                        </>
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

export default Settlement;