import React, { useState, useEffect } from 'react';
import { Button, Badge } from "../../../components/ui";
import styles from "./rentals.module.css";
import { SortTabs, Tabs, Pagination } from '../../../components/sets';
import useAdminAPI, { LandLease, LandLeasesPageResponse } from '../../../hooks/useAdminAPI';

const Rentals: React.FC = () => {
  const { getLandLeases, getUserReports, loading } = useAdminAPI();
  const [selectedSort, setSelectedSort] = useState<string>("토지 임대/임차");
  const [selectedLandFilter, setSelectedLandFilter] = useState<string>("전체");
  const [selectedContractFilter, setSelectedContractFilter] = useState<string>("전체");
  const [selectedReportFilter, setSelectedReportFilter] = useState<string>("전체");
  const [selectedDisputeFilter, setSelectedDisputeFilter] = useState<string>("전체");
  
  // API 데이터 상태
  const [landLeasesData, setLandLeasesData] = useState<LandLeasesPageResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [loadingReports, setLoadingReports] = useState(false);

  // API 데이터 로드
  useEffect(() => {
    const loadLandLeases = async () => {
      const englishStatus = getEnglishStatus(selectedLandFilter);
      const data = await getLandLeases({
        page: currentPage,
        size: pageSize,
        search: undefined,
        status: englishStatus === "ALL" ? undefined : englishStatus
      });
      if (data) {
        setLandLeasesData(data);
      }
    };

    if (selectedSort === "토지 임대/임차") {
      loadLandLeases();
    }
  }, [currentPage, selectedLandFilter, selectedSort, getLandLeases, pageSize]);

  // 토지 신고 데이터 로드
  useEffect(() => {
    const loadLandReports = async () => {
      if (selectedSort !== "신고 처리") return;
      
      setLoadingReports(true);
      try {
        // 사용자 신고 API를 사용하여 토지 신고 데이터로 변환
        const data = await getUserReports();
        
        if (Array.isArray(data)) {
          console.log('사용자 신고 데이터:', data);
          // 사용자 신고 데이터를 토지 신고 형식으로 변환
          const landReports = data.map((report: any, index: number) => ({
            id: report.reportId || index + 1,
            landName: report.targetUser || report.owner || '알 수 없는 토지',
            reporter: report.reporter || report.createdBy || '알 수 없는 신고자',
            reason: report.reason || report.category || '기타',
            status: report.status === 'PENDING' ? '처리중' : 
                   report.status === 'RESOLVED' ? '처리완료' : '처리중',
            reportedAt: report.reportDate || report.creDatetime || new Date().toISOString(),
            description: report.description || report.contents || '신고 내용 없음'
          }));
          console.log('변환된 토지 신고 데이터:', landReports);
          setReports(landReports);
        } else {
          console.log('데이터가 배열이 아님:', data);
          setReports([]);
        }
      } catch (error) {
        console.error('토지 신고 데이터 로드 실패:', error);
        setReports([]);
      } finally {
        setLoadingReports(false);
      }
    };

    loadLandReports();
  }, [selectedSort, getUserReports]);

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

  // 토지 신고 데이터 (API 연동)
  const [reports, setReports] = useState<any[]>([]);

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
    setCurrentPage(0); // 페이지 초기화
  };

  const handleLandFilterChange = (value: string) => {
    setSelectedLandFilter(value);
    setCurrentPage(0); // 페이지 초기화
  };

  // 한글 상태값을 영어로 변환하는 함수
  const getEnglishStatus = (koreanStatus: string) => {
    const statusMap: { [key: string]: string } = {
      '전체': 'ALL',
      '진행중': 'IN_PROGRESS',
      '완료': 'COMPLETED',
      '대기': 'PENDING'
    };
    return statusMap[koreanStatus] || 'ALL';
  };

  // 영어 상태값을 한글로 변환하는 함수
  const getKoreanStatus = (englishStatus: string) => {
    const statusMap: { [key: string]: string } = {
      'IN_PROGRESS': '진행중',
      'COMPLETED': '완료',
      'PENDING': '대기',
      'CANCELLED': '취소'
    };
    return statusMap[englishStatus] || englishStatus;
  };

  const getFilteredData = () => {
    if (selectedSort === "토지 임대/임차") {
      return landLeasesData?.content || [];
    } 
    // else if (selectedSort === "계약 관리") {
    //   let filtered = landLeasesData?.content || [];
    //   if (selectedContractFilter === "진행중") {
    //     filtered = filtered.filter(item => item.status === "IN_PROGRESS");
    //   } else if (selectedContractFilter === "완료") {
    //     filtered = filtered.filter(item => item.status === "COMPLETED");
    //   }
    //   return filtered;
    // } 
    else if (selectedSort === "신고 처리") {
      let filtered = reports;
      if (selectedReportFilter === "처리중") {
        filtered = filtered.filter(item => item.status === "처리중");
      } else if (selectedReportFilter === "처리완료") {
        filtered = filtered.filter(item => item.status === "처리완료");
      }
      return filtered;
    } 
    // else if (selectedSort === "분쟁 중재") {
    //   let filtered = disputes;
    //   if (selectedDisputeFilter === "중재중") {
    //     filtered = filtered.filter(item => item.status === "중재중");
    //   } else if (selectedDisputeFilter === "해결완료") {
    //     filtered = filtered.filter(item => item.status === "해결완료");
    //   }
    //   return filtered;
    // }
    return [];
  };

  const currentData = getFilteredData();

  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) {
      return '0원';
    }
    return amount.toLocaleString('ko-KR') + '원';
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.maxWidth}>
          {/* 헤더 */}
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <h1 className={styles.title}>토지 임대/임차 관리</h1>
              <p className={styles.subtitle}>토지 임대/임차 현황을 관리합니다</p>
            </div>
            
            {/* 통계 카드 */}
            <div className={styles.statsGrid}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>토지 임대/임차</h3>
                </div>
                <div className={styles.number}>{landLeasesData?.totalElements || 0}</div>
                {/* <p className={styles.description}>총 토지 건수 (DB 연동)</p> */}
              </div>
              
              {/* <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>계약 관리</h3>
                </div>
                <div className={styles.number}>{landLeasesData?.totalElements || 0}</div>
                <p className={styles.description}>총 계약 건수 (DB 연동)</p>
              </div> */}
              
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>신고 처리</h3>
                </div>
                <div className={styles.number}>{reports.length}</div>
                {/* <p className={styles.description}>총 신고 건수 (DB 연동)</p> */}
              </div>
              
              {/* <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>분쟁 중재</h3>
                </div>
                <div className={styles.number}>-</div>
                <p className={styles.description}>DB 미연동</p>
              </div> */}
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
                      // { id: "계약 관리", label: "계약 관리" },
                      { id: "신고 처리", label: "신고 처리" },
                      // { id: "분쟁 중재", label: "분쟁 중재" }
                    ]}
                    defaultActiveTab={selectedSort}
                    onTabChange={handleSortChange}
                  />
                  
                  {/* 세부 필터링 */}
                  {selectedSort === "토지 임대/임차" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "진행중", "완료", "대기"]}
                        value={selectedLandFilter}
                        onChange={handleLandFilterChange}
                      />
                    </div>
                  )}
                  
                  {/* {selectedSort === "계약 관리" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "진행중", "완료"]}
                        value={selectedContractFilter}
                        onChange={(value) => setSelectedContractFilter(value)}
                      />
                    </div>
                  )} */}
                  
                  {selectedSort === "신고 처리" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "처리중", "처리완료"]}
                        value={selectedReportFilter}
                        onChange={(value) => setSelectedReportFilter(value)}
                      />
                    </div>
                  )}
                  
                  {/* {selectedSort === "분쟁 중재" && (
                    <div style={{ marginTop: "12px" }}>
                      <SortTabs 
                        items={["전체", "중재중", "해결완료"]}
                        value={selectedDisputeFilter}
                        onChange={(value) => setSelectedDisputeFilter(value)}
                      />
                    </div>
                  )} */}
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
                    {(loading || (selectedSort === "신고 처리" && loadingReports)) ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                          데이터를 불러오는 중...
                        </td>
                      </tr>
                    ) : selectedSort === "신고 처리" ? (
                      currentData.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                            신고 데이터가 없습니다.
                          </td>
                        </tr>
                      ) : (
                        currentData.map((item: any) => (
                          <tr key={item.id} className={styles.tableRow}>
                            <td>
                              <input type="checkbox" className={styles.checkbox} />
                            </td>
                            <td>
                              <div className={styles.itemInfo}>
                                <div className={styles.itemName}>{item.landName}</div>
                                <div className={styles.itemType}>토지</div>
                              </div>
                            </td>
                            <td>
                              <div className={styles.partyInfo}>
                                <div className={styles.partyName}>
                                  {item.reporter}
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
                                <div className={`${styles.statusDot} ${styles[(item.status || 'UNKNOWN').replace(/[^a-zA-Z0-9]/g, '')]}`}></div>
                                <span className={styles.statusText}>{item.status || '상태 없음'}</span>
                              </div>
                            </td>
                            <td>
                              <div className={styles.dateInfo}>
                                {item.reportedAt?.split('T')[0] || '날짜 없음'}
                              </div>
                            </td>
                            <td>
                              <div className={styles.actionButtons}>
                                <Button size="sm" color="point">상세보기</Button>
                                {item.status === "처리중" && (
                                  <Button size="sm" color="point3">처리완료</Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )
                    ) : selectedSort !== "토지 임대/임차" ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                          {selectedSort} 기능은 현재 데이터베이스와 연결되지 않습니다.
                        </td>
                      </tr>
                    ) : currentData.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                          데이터가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      currentData.map((item: any) => (
                        <tr key={item.id} className={styles.tableRow}>
                          <td>
                            <input type="checkbox" className={styles.checkbox} />
                          </td>
                          <td>
                            <div className={styles.itemInfo}>
                              <div className={styles.itemName}>
                                {selectedSort === "토지 임대/임차" ? (item.landName || '토지명 없음') : (item.name || item.landName || '이름 없음')}
                              </div>
                              <div className={styles.itemType}>
                                {selectedSort === "토지 임대/임차" ? (item.landType || "토지") :
                                 selectedSort === "계약 관리" ? (item.contractType || '계약') :
                                 selectedSort === "신고 처리" ? "신고" :
                                 "분쟁"}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className={styles.partyInfo}>
                              <div className={styles.partyName}>
                                {selectedSort === "토지 임대/임차" ? 
                                  `${item.lessorId || '지주'} → ${item.lesseeId || '임차인'}` :
                                 selectedSort === "계약 관리" ? `${item.owner || '지주'} → ${item.renter || '임차인'}` :
                                 selectedSort === "신고 처리" ? (item.reporter || '신고자') :
                                 (item.parties || '당사자')}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className={styles.contractInfo}>
                              {selectedSort === "토지 임대/임차" && (
                                <>
                                  <div className={styles.contractDetail}>면적: {item.area || 0} {item.areaUnit || ''}</div>
                                  <div className={styles.contractDetail}>임대료: {formatCurrency(item.monthlyRent)} {item.rentUnit || ''}</div>
                                  <div className={styles.contractDetail}>기간: {item.startDate || ''} ~ {item.endDate || ''}</div>
                                  <div className={styles.contractDetail}>위치: {item.address || ''} {item.detailAddress || ''}</div>
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className={styles.statusInfo}>
                              <div className={`${styles.statusDot} ${styles[(item.status || 'UNKNOWN').replace(/[^a-zA-Z0-9]/g, '')]}`}></div>
                              <span className={styles.statusText}>{getKoreanStatus(item.status) || '상태 없음'}</span>
                            </div>
                          </td>
                          <td>
                            <div className={styles.dateInfo}>
                              {selectedSort === "토지 임대/임차" ? (item.creDatetime?.split('T')[0] || '날짜 없음') : 
                               (item.startDate || item.signedDate || item.reportedAt || item.appliedAt || '날짜 없음')}
                            </div>
                          </td>
                          <td>
                            <div className={styles.actionButtons}>
                              <Button size="sm" color="point">상세보기</Button>
                              {getKoreanStatus(item.status) === "진행중" && (
                                <Button size="sm" color="point2">계약완료</Button>
                              )}
                              {getKoreanStatus(item.status) === "대기" && (
                                <Button size="sm" color="point2">승인</Button>
                              )}
                              {getKoreanStatus(item.status) === "처리중" && (
                                <Button size="sm" color="point3">처리완료</Button>
                              )}
                              {getKoreanStatus(item.status) === "중재중" && (
                                <Button size="sm" color="point2">중재완료</Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* 페이지네이션 */}
              {selectedSort === "토지 임대/임차" && landLeasesData && (
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    page={{
                      totalItems: landLeasesData.totalElements,
                      totalPages: landLeasesData.totalPages,
                      currentPage: landLeasesData.number + 1,
                      startPage: 1,
                      endPage: landLeasesData.totalPages
                    }}
                    onPageChange={(page) => setCurrentPage(page - 1)}
                    showFirstLast
                    showPrevNext
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rentals;