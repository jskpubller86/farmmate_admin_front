import { useCallback, useState } from 'react';
import useAPI from './useAPI';
import useAlert from './useAlert';

// 대시보드 통계 데이터 타입
export interface DashboardStats {
  totalUsers: number;
  totalTransactions: number;
  totalRevenue: number;
  pendingReports: number;
  newUsersThisWeek: number;
  completedTransactions: number;
  inProgressTransactions: number;
  totalLandLeases: number;
  activeLandLeases: number;
  inactiveLandLeases: number;
}

// 사용자 데이터 타입
export interface User {
  id: string;
  userAccount: string;
  userName: string;
  email: string;
  cellNo: string;
  addr: string;
  detailAddr?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  creDatetime: string;
  updDatetime?: string;
}

// 사용자 목록 페이지 응답 타입
export interface UsersPageResponse {
  content: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// 유저 통계 데이터 타입
export interface UserStats {
  period: string;
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  userGrowth: string;
  periodStart: string;
  periodEnd: string;
}

// 거래 통계 데이터 타입
export interface TransactionStats {
  period: string;
  totalTransactions: number;
  productTransactions: number;
  landTransactions: number;
  totalRevenue: number;
  averageTransaction: number;
  region: string;
  periodStart: string;
  periodEnd: string;
}

// 상품 데이터 타입
export interface Product {
  id: string;
  sellerId: string;
  title: string;
  contents: string;
  typeCd: string;
  price: number;
  unitCd: string;
  quantity: number;
  organicYn: string;
  localYn: string;
  haccpYn: string;
  orderCd: string;
  addr: string;
  detailAddr: string;
  ratingSum: number;
  reviewCount: number;
  likeCount: number;
  viewCount: number;
  creDatetime: string;
}

// 상품 목록 페이지 응답 타입
export interface ProductsPageResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// 토지 임대/임차 데이터 타입
export interface LandLease {
  id: string;
  lessorId: string;
  lesseeId: string;
  landName: string;
  description: string;
  landType: string;
  monthlyRent: number;
  rentUnit: string;
  area: number;
  areaUnit: string;
  status: string;
  address: string;
  detailAddress: string;
  startDate: string;
  endDate: string;
  creDatetime: string;
}

// 토지 임대/임차 목록 페이지 응답 타입
export interface LandLeasesPageResponse {
  content: LandLease[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// 토지 임대/임차 통계 데이터 타입
export interface LandLeaseStats {
  period: string;
  totalLandLeases: number;
  activeLandLeases: number;
  inactiveLandLeases: number;
  newLandLeases: number;
  completedLandLeases: number;
  periodStart: string;
  periodEnd: string;
}

// 이상 거래 감지 데이터 타입
export interface AnomalyDetection {
  id: string;
  transactionId?: string;
  userId: string;
  anomalyType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  detectedData: string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'FALSE_POSITIVE';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  resolutionNotes?: string;
  userName?: string;
  userAccount?: string;
  email?: string;
  cellNo?: string;
}

// API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const useAdminAPI = () => {
  const api = useAPI();
  const { alertError } = useAlert();
  const [loading, setLoading] = useState(false);

  // 대시보드 통계 조회
  const getDashboardStats = useCallback(async (): Promise<DashboardStats | null> => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/dashboard/stats');
      
      // 백엔드 응답 구조에 맞게 수정
      if (response.data.code === '0000') {
        return response.data.data;
      } else {
        alertError({ message: '대시보드 데이터를 불러오는데 실패했습니다.' });
        return null;
      }
    } catch (error) {
      console.error('대시보드 통계 조회 실패:', error);
      alertError({ message: '대시보드 데이터를 불러오는데 실패했습니다.' });
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // 의존성 배열을 빈 배열로 수정

  // 사용자 목록 조회
  const getUsers = useCallback(async (params: {
    page?: number;
    size?: number;
    search?: string;
    status?: string;
  } = {}): Promise<UsersPageResponse | null> => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/users', params);
      
      // 백엔드 응답 구조에 맞게 수정
      if (response.data.code === '0000') {
        return response.data.data;
      } else {
        alertError({ message: '사용자 목록을 불러오는데 실패했습니다.' });
        return null;
      }
    } catch (error) {
      console.error('사용자 목록 조회 실패:', error);
      alertError({ message: '사용자 목록을 불러오는데 실패했습니다.' });
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // 의존성 배열을 빈 배열로 수정

  // 유저 통계 조회
  const getUserStats = useCallback(async (limit: number = 6): Promise<UserStats[] | null> => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/user-stats', { limit });
      
      // 백엔드 응답 구조에 맞게 수정
      if (response.data.code === '0000') {
        return response.data.data;
      } else {
        alertError({ message: '유저 통계를 불러오는데 실패했습니다.' });
        return null;
      }
    } catch (error) {
      console.error('유저 통계 조회 실패:', error);
      alertError({ message: '유저 통계를 불러오는데 실패했습니다.' });
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // 의존성 배열을 빈 배열로 수정

  // 거래 통계 조회
  const getTransactionStats = useCallback(async (limit: number = 6): Promise<TransactionStats[] | null> => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/transaction-stats', { limit });
      
      // 백엔드 응답 구조에 맞게 수정
      if (response.data.code === '0000') {
        return response.data.data;
      } else {
        alertError({ message: '거래 통계를 불러오는데 실패했습니다.' });
        return null;
      }
    } catch (error) {
      console.error('거래 통계 조회 실패:', error);
      alertError({ message: '거래 통계를 불러오는데 실패했습니다.' });
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // 의존성 배열을 빈 배열로 수정

  // 상품 목록 조회
  const getProducts = useCallback(async (params: { page: number; size: number; search?: string; type?: string }): Promise<ProductsPageResponse | null> => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.append('page', params.page.toString());
      queryParams.append('size', params.size.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.type) queryParams.append('type', params.type);
      
      const response = await api.get(`/api/admin/products?${queryParams.toString()}`);
      
      // 백엔드 응답 구조에 맞게 수정
      if (response.data.code === '0000') {
        return response.data.data;
      } else {
        alertError({ message: '상품 목록을 불러오는데 실패했습니다.' });
        return null;
      }
    } catch (error) {
      console.error('상품 목록 조회 실패:', error);
      alertError({ message: '상품 목록을 불러오는데 실패했습니다.' });
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // 의존성 배열을 빈 배열로 수정

  // 토지 임대/임차 목록 조회
  const getLandLeases = useCallback(async (params: { page: number; size: number; search?: string; status?: string }): Promise<LandLeasesPageResponse | null> => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.append('page', params.page.toString());
      queryParams.append('size', params.size.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.status) queryParams.append('status', params.status);
      
      const response = await api.get(`/api/admin/land-leases?${queryParams.toString()}`);
      
      // 백엔드 응답 구조에 맞게 수정
      if (response.data.code === '0000') {
        return response.data.data;
      } else {
        alertError({ message: '토지 거래 목록을 불러오는데 실패했습니다.' });
        return null;
      }
    } catch (error) {
      console.error('토지 거래 목록 조회 실패:', error);
      alertError({ message: '토지 거래 목록을 불러오는데 실패했습니다.' });
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // 의존성 배열을 빈 배열로 수정

  // 토지 임대/임차 통계 조회
  const getLandLeasesStats = useCallback(async (): Promise<{ totalLandLeases: number; activeLandLeases: number; inactiveLandLeases: number } | null> => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/land-leases/stats');
      
      if (response.data.code === '0000') {
        return response.data.data;
      } else {
        alertError({ message: '토지 임대/임차 통계를 불러오는데 실패했습니다.' });
        return null;
      }
    } catch (error) {
      console.error('토지 임대/임차 통계 조회 실패:', error);
      alertError({ message: '토지 임대/임차 통계를 불러오는데 실패했습니다.' });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 토지 임대/임차 월별 통계 조회 (더미 데이터)
  const getLandLeasesMonthlyStats = useCallback(async (limit: number = 6): Promise<LandLeaseStats[] | null> => {
    try {
      setLoading(true);
      
      // 현재는 더미 데이터를 반환 (실제 API가 구현되면 교체)
      const dummyData: LandLeaseStats[] = [
        {
          period: "2024-01",
          totalLandLeases: 12,
          activeLandLeases: 8,
          inactiveLandLeases: 4,
          newLandLeases: 5,
          completedLandLeases: 3,
          periodStart: "2024-01-01",
          periodEnd: "2024-01-31"
        },
        {
          period: "2024-02",
          totalLandLeases: 18,
          activeLandLeases: 12,
          inactiveLandLeases: 6,
          newLandLeases: 8,
          completedLandLeases: 2,
          periodStart: "2024-02-01",
          periodEnd: "2024-02-29"
        },
        {
          period: "2024-03",
          totalLandLeases: 25,
          activeLandLeases: 18,
          inactiveLandLeases: 7,
          newLandLeases: 10,
          completedLandLeases: 3,
          periodStart: "2024-03-01",
          periodEnd: "2024-03-31"
        },
        {
          period: "2024-04",
          totalLandLeases: 32,
          activeLandLeases: 24,
          inactiveLandLeases: 8,
          newLandLeases: 12,
          completedLandLeases: 5,
          periodStart: "2024-04-01",
          periodEnd: "2024-04-30"
        },
        {
          period: "2024-05",
          totalLandLeases: 28,
          activeLandLeases: 20,
          inactiveLandLeases: 8,
          newLandLeases: 6,
          completedLandLeases: 10,
          periodStart: "2024-05-01",
          periodEnd: "2024-05-31"
        },
        {
          period: "2024-06",
          totalLandLeases: 35,
          activeLandLeases: 28,
          inactiveLandLeases: 7,
          newLandLeases: 15,
          completedLandLeases: 8,
          periodStart: "2024-06-01",
          periodEnd: "2024-06-30"
        }
      ].slice(0, limit);

      return dummyData;
    } catch (error) {
      console.error('토지 임대/임차 월별 통계 조회 실패:', error);
      alertError({ message: '토지 임대/임차 월별 통계를 불러오는데 실패했습니다.' });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 이상 거래 목록 조회
  const getAnomalies = useCallback(async (status?: string, anomalyType?: string, severity?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (anomalyType) params.append('anomalyType', anomalyType);
      if (severity) params.append('severity', severity);
      
      const response = await api.get(`/api/admin/anomalies?${params.toString()}`);
      
      if (response.data?.code === '0000') {
        return response.data.data || [];
      } else {
        throw new Error(response.data?.message || '이상 거래 목록 조회 실패');
      }
    } catch (error) {
      console.error('이상 거래 목록 조회 실패:', error);
      // alertError({ message: '이상 거래 목록을 불러오는데 실패했습니다.' });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 이상 거래 상태 업데이트
  const updateAnomalyStatus = useCallback(async (anomalyId: string, status: string, resolutionNotes?: string) => {
    setLoading(true);
    try {
      const response = await api.post('/api/admin/anomalies/status', {
        id: anomalyId,
        status,
        resolutionNotes
      });
      
      if (response.data?.code === '0000') {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || '이상 거래 상태 업데이트 실패');
      }
    } catch (error) {
      console.error('이상 거래 상태 업데이트 실패:', error);
      alertError({ message: '이상 거래 상태 업데이트에 실패했습니다.' });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // 사용자 신고 목록 조회
  const getUserReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/admin/reports/users');
      
      if (response.data?.code === '0000') {
        return response.data.data || [];
      } else {
        throw new Error(response.data?.message || '사용자 신고 목록 조회 실패');
      }
    } catch (error) {
      console.error('사용자 신고 목록 조회 실패:', error);
      alertError({ message: '사용자 신고 목록을 불러오는데 실패했습니다.' });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);


  return {
    loading,
    getDashboardStats,
    getUsers,
    getUserStats,
    getTransactionStats,
    getProducts,
    getLandLeases,
    getLandLeasesStats,
    getLandLeasesMonthlyStats,
    getAnomalies,
    updateAnomalyStatus,
    getUserReports,
  };
};

export default useAdminAPI;
