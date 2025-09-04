import React from 'react';
import { Button, Input, Badge } from "../../../components/ui";
import styles from "./completed.module.css";

const Completed: React.FC = () => {

  // 샘플 처리완료 데이터
  const completedItems = [
    {
      id: 1,
      type: "신고처리",
      title: "허위 정보 신고",
      reporter: "김농부",
      target: "이재배",
      status: "처리완료",
      completedDate: "2024.01.15",
      processor: "관리자1"
    },
    {
      id: 2,
      type: "상품승인",
      title: "유기농 토마토 등록",
      reporter: "박수확",
      target: "상품등록",
      status: "승인완료",
      completedDate: "2024.01.14",
      processor: "관리자2"
    },
    {
      id: 3,
      type: "회원제재",
      title: "부적절한 댓글",
      reporter: "최유기",
      target: "홍길동",
      status: "제재완료",
      completedDate: "2024.01.13",
      processor: "관리자1"
    },
    {
      id: 4,
      type: "토지승인",
      title: "강남구 농지 등록",
      reporter: "정토지",
      target: "토지등록",
      status: "승인완료",
      completedDate: "2024.01.12",
      processor: "관리자3"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.maxWidth}>
          {/* 헤더 */}
          <div className={styles.header}>
            <h1 className={styles.title}>처리완료 목록</h1>
            <p className={styles.subtitle}>완료된 신고 및 승인 처리 내역을 확인하세요</p>
          </div>

          {/* 통계 카드 */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>총 처리건수</h3>
                <Badge color="point">📋</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{completedItems.length}</div>
                <p className={styles.description}>완료된 처리 건수</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>신고처리</h3>
                <Badge color="point2">⚠️</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{completedItems.filter(item => item.type === "신고처리").length}</div>
                <p className={styles.description}>신고 처리 완료</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>승인처리</h3>
                <Badge color="point3">✅</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{completedItems.filter(item => item.type.includes("승인")).length}</div>
                <p className={styles.description}>승인 처리 완료</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>제재처리</h3>
                <Badge color="danger">🚫</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{completedItems.filter(item => item.type === "회원제재").length}</div>
                <p className={styles.description}>제재 처리 완료</p>
              </div>
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className={styles.searchCard}>
            <div className={styles.searchContent}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInput}>
                  <Input placeholder="처리내역 검색..." />
                </div>
                <Button color="point" size="lg">
                  필터 적용
                </Button>
              </div>
            </div>
          </div>

          {/* 처리완료 목록 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>처리완료 목록</h3>
              <p className={styles.cardDescription}>
                총 {completedItems.length}건의 처리가 완료되었습니다
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.completedList}>
                {completedItems.map((item) => (
                  <div key={item.id} className={styles.completedItem}>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemType}>
                        <Badge color={
                          item.type === "신고처리" ? "danger" :
                          item.type.includes("승인") ? "point" : "secondary"
                        }>
                          {item.type}
                        </Badge>
                      </div>
                      <div className={styles.itemDetails}>
                        <h4 className={styles.itemTitle}>{item.title}</h4>
                        <p className={styles.itemSubtitle}>
                          신고자: {item.reporter} → 대상: {item.target}
                        </p>
                      </div>
                    </div>
                    <div className={styles.itemStatus}>
                      <div className={styles.statusInfo}>
                        <span className={styles.statusLabel}>처리상태</span>
                        <Badge color="point2">{item.status}</Badge>
                      </div>
                      <div className={styles.statusInfo}>
                        <span className={styles.statusLabel}>처리일</span>
                        <span className={styles.completedDate}>{item.completedDate}</span>
                      </div>
                      <div className={styles.statusInfo}>
                        <span className={styles.statusLabel}>처리자</span>
                        <span className={styles.processor}>{item.processor}</span>
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

export default Completed;
