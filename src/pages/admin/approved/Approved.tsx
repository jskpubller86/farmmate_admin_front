import React from 'react';
import { Button, Input, Badge } from "../../../components/ui";
import styles from "./approved.module.css";

const Approved: React.FC = () => {

  // 샘플 승인처리 데이터
  const approvedItems = [
    {
      id: 1,
      type: "상품승인",
      title: "유기농 토마토 등록",
      applicant: "김농부",
      category: "채소",
      status: "승인완료",
      approvedDate: "2024.01.15",
      approver: "관리자1"
    },
    {
      id: 2,
      type: "토지승인",
      title: "강남구 농지 등록",
      applicant: "이재배",
      category: "토지",
      status: "승인완료",
      approvedDate: "2024.01.14",
      approver: "관리자2"
    },
    {
      id: 3,
      type: "회원승인",
      title: "농부 인증 신청",
      applicant: "박수확",
      category: "인증",
      status: "승인완료",
      approvedDate: "2024.01.13",
      approver: "관리자1"
    },
    {
      id: 4,
      type: "펀딩승인",
      title: "스마트팜 구축 펀딩",
      applicant: "최유기",
      category: "펀딩",
      status: "승인완료",
      approvedDate: "2024.01.12",
      approver: "관리자3"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.maxWidth}>
          {/* 헤더 */}
          <div className={styles.header}>
            <h1 className={styles.title}>승인처리 목록</h1>
            <p className={styles.subtitle}>승인된 상품, 토지, 회원 인증 내역을 확인하세요</p>
          </div>

          {/* 통계 카드 */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>총 승인건수</h3>
                <Badge color="point">✅</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{approvedItems.length}</div>
                <p className={styles.description}>승인된 항목 수</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>상품승인</h3>
                <Badge color="point2">📦</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{approvedItems.filter(item => item.type === "상품승인").length}</div>
                <p className={styles.description}>승인된 상품</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>토지승인</h3>
                <Badge color="point3">🏞️</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{approvedItems.filter(item => item.type === "토지승인").length}</div>
                <p className={styles.description}>승인된 토지</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>회원승인</h3>
                <Badge color="secondary">👤</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{approvedItems.filter(item => item.type === "회원승인").length}</div>
                <p className={styles.description}>승인된 회원</p>
              </div>
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className={styles.searchCard}>
            <div className={styles.searchContent}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInput}>
                  <Input placeholder="승인내역 검색..." />
                </div>
                <Button color="point" size="lg">
                  필터 적용
                </Button>
              </div>
            </div>
          </div>

          {/* 승인처리 목록 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>승인처리 목록</h3>
              <p className={styles.cardDescription}>
                총 {approvedItems.length}건의 승인이 완료되었습니다
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.approvedList}>
                {approvedItems.map((item) => (
                  <div key={item.id} className={styles.approvedItem}>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemType}>
                        <Badge color={
                          item.type === "상품승인" ? "point" :
                          item.type === "토지승인" ? "point2" :
                          item.type === "회원승인" ? "point3" : "secondary"
                        }>
                          {item.type}
                        </Badge>
                      </div>
                      <div className={styles.itemDetails}>
                        <h4 className={styles.itemTitle}>{item.title}</h4>
                        <p className={styles.itemSubtitle}>
                          신청자: {item.applicant} | 카테고리: {item.category}
                        </p>
                      </div>
                    </div>
                    <div className={styles.itemStatus}>
                      <div className={styles.statusInfo}>
                        <span className={styles.statusLabel}>승인상태</span>
                        <Badge color="point2">{item.status}</Badge>
                      </div>
                      <div className={styles.statusInfo}>
                        <span className={styles.statusLabel}>승인일</span>
                        <span className={styles.approvedDate}>{item.approvedDate}</span>
                      </div>
                      <div className={styles.statusInfo}>
                        <span className={styles.statusLabel}>승인자</span>
                        <span className={styles.approver}>{item.approver}</span>
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

export default Approved;
