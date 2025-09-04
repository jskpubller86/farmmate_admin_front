import React from 'react';
import { Button, Input, Badge } from "../../../components/ui";
import styles from "./members.module.css";

const Members: React.FC = () => {

  // 샘플 회원 데이터
  const members = [
    {
      id: 1,
      name: "김농부",
      email: "farmer@example.com",
      role: "농부",
      status: "활성",
      joinDate: "2024.01.15",
      reportCount: 0,
      farmCount: 3,
      lastLogin: "2024.01.20"
    },
    {
      id: 2,
      name: "이재배",
      email: "grower@example.com",
      role: "재배자",
      status: "활성",
      joinDate: "2024.01.20",
      reportCount: 2,
      farmCount: 1,
      lastLogin: "2024.01.19"
    },
    {
      id: 3,
      name: "박수확",
      email: "harvest@example.com",
      role: "구매자",
      status: "비활성",
      joinDate: "2024.01.25",
      reportCount: 5,
      farmCount: 0,
      lastLogin: "2024.01.10"
    },
    {
      id: 4,
      name: "최유기",
      email: "organic@example.com",
      role: "농부",
      status: "제재",
      joinDate: "2024.02.01",
      reportCount: 8,
      farmCount: 2,
      lastLogin: "2024.01.05"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.maxWidth}>
          {/* 헤더 */}
          <div className={styles.header}>
            <h1 className={styles.title}>회원 관리</h1>
            <p className={styles.subtitle}>등록된 회원들을 관리하고 모니터링하세요</p>
          </div>

          {/* 통계 카드 */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>총 회원수</h3>
                <Badge color="point">👥</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{members.length}</div>
                <p className={styles.description}>등록된 회원 수</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>활성 회원</h3>
                <Badge color="point2">✅</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{members.filter(m => m.status === "활성").length}</div>
                <p className={styles.description}>현재 활성 상태</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>농부 회원</h3>
                <Badge color="point3">🚜</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{members.filter(m => m.role === "농부").length}</div>
                <p className={styles.description}>농부 인증 회원</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>신고된 회원</h3>
                <Badge color="danger">⚠️</Badge>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>{members.filter(m => m.reportCount > 0).length}</div>
                <p className={styles.description}>신고 누적 회원</p>
              </div>
            </div>
          </div>

          {/* 검색 및 액션 */}
          <div className={styles.searchCard}>
            <div className={styles.searchContent}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInput}>
                  <Input placeholder="회원 검색..." />
                </div>
                <Button color="point" size="lg">
                  회원 추가
                </Button>
              </div>
            </div>
          </div>

          {/* 회원 목록 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>회원 목록</h3>
              <p className={styles.cardDescription}>
                총 {members.length}명의 회원이 등록되어 있습니다
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.memberList}>
                {members.map((member) => (
                  <div key={member.id} className={styles.memberItem}>
                    <div className={styles.memberInfo}>
                      <div className={styles.avatar}>
                        {member.name.charAt(0)}
                      </div>
                      <div className={styles.memberDetails}>
                        <h4 className={styles.memberName}>{member.name}</h4>
                        <p className={styles.memberEmail}>{member.email}</p>
                      </div>
                    </div>
                    <div className={styles.memberAttributes}>
                      <div className={styles.attribute}>
                        <span className={styles.attributeLabel}>역할</span>
                        <Badge color={member.role === "농부" ? "point" : "point2"}>
                          {member.role}
                        </Badge>
                      </div>
                      <div className={styles.attribute}>
                        <span className={styles.attributeLabel}>상태</span>
                        <Badge color={
                          member.status === "활성" ? "point" : 
                          member.status === "비활성" ? "secondary" : "danger"
                        }>
                          {member.status}
                        </Badge>
                      </div>
                      <div className={styles.attribute}>
                        <span className={styles.attributeLabel}>가입일</span>
                        <span className={styles.joinDate}>{member.joinDate}</span>
                      </div>
                    </div>
                    <div className={styles.memberActions}>
                      <div className={styles.reportSection}>
                        <span className={styles.attributeLabel}>신고 횟수</span>
                        <Button 
                          size="sm" 
                          color={member.reportCount > 0 ? "danger" : "secondary"}
                          disabled
                        >
                          {member.reportCount}건
                        </Button>
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

export default Members;
