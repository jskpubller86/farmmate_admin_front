import React, { useEffect, useMemo, useState } from 'react';
import { Button } from "../../../components/ui";
import styles from "./reports.module.css";
import { SortTabs, Tabs } from '../../../components/sets';
import useAPI from '../../../hooks/useAPI';
import { useSearchParams } from 'react-router-dom';

const Reports: React.FC = () => {
  const api = useAPI();
  const [searchParams] = useSearchParams();
  const [selectedSort, setSelectedSort] = useState<string>(() => {
    const tab = searchParams.get('tab');
    return tab === 'product' ? '농산물 신고' : '사용자 신고';
  });
  const [selectedProductReportFilter, setSelectedProductReportFilter] = useState<string>("전체");
  const [selectedUserReportFilter, setSelectedUserReportFilter] = useState<string>("전체");

  // 농산물 관련 신고 데이터 (API 연동)
  const [productReports, setProductReports] = useState<any[]>([]);


  // 사용자 관련 신고 데이터 (상태 통일)
  const [userReports, setUserReports] = useState<any[]>([]);

  // 농산물 신고 API 연동
  useEffect(() => {
    const loadProductReports = async () => {
      if (selectedSort !== "농산물 신고") return;
      try {
        const res = await api.get('/admin/reports/products');
        if (res?.data?.code === '0000' && Array.isArray(res.data.data)) {
          const list = res.data.data.map((it: any, idx: number) => ({
            id: it.reportId || it.id || idx + 1,
            type: "농산물",
            itemName: it.productTitle || '',
            seller: it.sellerName || '',
            reporter: it.reporterName || '',
            reason: it.reportType || '',
            description: it.description || '',
            status: it.status === 'PENDING' ? '조사대기' : 
                   it.status === 'RESOLVED' ? '처리완료' : 
                   it.status === 'REJECTED' ? '처리완료' : '조사대기',
            reportedAt: it.reportedAt || new Date().toISOString(),
            evidence: [],
            result: it.resolutionNotes || ''
          }));
          setProductReports(list);
          return;
        }
      } catch (e) {
        console.error('농산물 신고 목록 조회 실패:', e);
      }

      // 실패 시 빈 배열로 설정
      setProductReports([]);
    };

    loadProductReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort]);

  // 사용자 신고 API 연동 (실패 시 더미)
  useEffect(() => {
    const loadUserReports = async () => {
      if (selectedSort !== "사용자 신고") return;
      try {
        // 우선 관리자 전용 사용자 신고 엔드포인트 시도
        const res = await api.get('/admin/reports/users');
        if (res?.data?.code === '0000' && Array.isArray(res.data.data)) {
          const list = res.data.data.map((it: any, idx: number) => ({
            id: it.id || it.reportId || idx + 1,
            type: '사용자',
            reportedUser: it.reportedUser || it.targetUser || it.owner || '',
            reporter: it.reporter || it.createdBy || '',
            reason: it.reason || it.category || '',
            description: it.description || it.contents || '',
            status: it.status || '조사대기',
            reportedAt: it.reportedAt || it.creDatetime || new Date().toISOString(),
            evidence: it.evidence || [],
            result: it.result || ''
          }));
          setUserReports(list);
          return;
        }
      } catch (e) {
        // 다음으로 보드 신고 대체 엔드포인트 시도 가능하면 여기에 추가
      }

      // 실패 시 더미로 대체
      setUserReports([
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
      ]);
    };

    loadUserReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort]);

  // 사용자 신고 상태 화면 표기 매핑
  const userReportsDisplay = useMemo(() => {
    return userReports.map((it:any)=> ({
      ...it,
      status: (it.status || '').toUpperCase() === 'PENDING' ? '조사대기' :
              (it.status || '').toUpperCase() === 'IN_PROGRESS' ? '조사대기' :
              (it.status || '').toUpperCase() === 'RESOLVED' ? '처리완료' : (it.status || '조사대기')
    }));
  }, [userReports]);


  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setSelectedProductReportFilter("전체");
    setSelectedUserReportFilter("전체");
  };

  // 상태 변경 핸들러
  const handleStatusChange = async (reportId: number, newStatus: string) => {
    if (selectedSort === "농산물 신고") {
      try {
        // 백엔드에 상태 변경 요청
        await api.post('/admin/reports/products/status', {
          id: reportId,
          status: newStatus === '조사대기' ? 'PENDING' : 
                 newStatus === '처리완료' ? 'RESOLVED' : 'REJECTED',
          resolutionNotes: newStatus === '처리완료' ? '처리 완료' : ''
        });
        
        // 성공 시 로컬 상태 업데이트
        setProductReports(prev => 
          prev.map(report => 
            report.id === reportId 
              ? { ...report, status: newStatus }
              : report
          )
        );
      } catch (e) {
        console.error('농산물 신고 상태 변경 실패:', e);
        alert('상태 변경에 실패했습니다.');
      }
    } else if (selectedSort === "사용자 신고") {
      // 사용자 신고는 기존 로직 유지
      setUserReports(prev => 
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
      let filtered = userReportsDisplay;
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
                계약 안내
              </Button>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>조사 대기</h3>
                {/* <Button size="sm" color="danger" disabled>🔍</Button> */}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {productReports.filter(r => r.status === "조사대기").length + userReportsDisplay.filter((r:any) => r.status === "조사대기").length}
                </div>
                <p className={styles.description}>접수된 신고</p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>처리 완료</h3>
                {/* <Button size="sm" color="point2" disabled>🎯</Button> */}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.number}>
                  {productReports.filter(r => r.status === "처리완료").length + userReportsDisplay.filter((r:any) => r.status === "처리완료").length}
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
                      <tr key
                      ={item.id} className={styles.tableRow}>
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
                                    // 백엔드에 상태 변경 반영
                                    api.postWithJson('/admin/reports/users/status', {
                                      reportId: item.id,
                                      status: 'RESOLVED',
                                      action
                                    }).then(() => {
                                      alert(`${action} 처리가 완료되었습니다.`);
                                      // 사용자 신고 상태를 즉시 갱신
                                      setUserReports(prev => prev.map((r:any)=> r.id === item.id ? { ...r, status: 'RESOLVED' } : r));
                                    }).catch(() => {
                                      alert('상태 변경에 실패했습니다.');
                                    });
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