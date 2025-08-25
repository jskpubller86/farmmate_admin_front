import styles from "./index.module.css";
import { Avatar, Button, LikeIt } from "../ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 나중에 DB에 더미 데이터를 넣으면 활성화
export interface FundCardProps {
  id: number;
  fundName: string;
  fundImageUrl?: string | null;
  farmOwnerName: string;
  farmOwnerImageUrl?: string | null;
  fundContents: string;
  startDatetime: string;
  endDatetime: string;
  currentPercent: number;
  currentMember: number;
}

// 프론트 임시 데이터
export const DUMMY_FUND_CARD: FundCardProps = {
  id: 1,
  fundName: "깻잎과 관련된 펀딩 내용 제목",
  fundImageUrl: "/images/fundcard_img.svg",
  farmOwnerName: "테스형",
  farmOwnerImageUrl: "/images/farmowner_img.svg",
  fundContents: "깻잎과 관련된 펀딩 내용 제목",
  startDatetime: "2025-05-31T07:00:10",
  endDatetime: "2025-06-01T07:00:10",
  currentPercent: 80,
  currentMember: 15,
};

// 부분 props 허용 + 기본값을 더미데이터로 교체
type FundCardInput = Partial<FundCardProps> &
  Omit<React.HTMLAttributes<HTMLDivElement>, "id">;

export const FundCard: React.FC<FundCardInput> = (
  // 임시 데이터를 위한 주석
  // {id,
  // fundName,
  // fundImageUrl,
  // farmOwnerName,
  // farmOwnerImageUrl,
  // fundContents,
  // startDatetime,
  // endDatetime,
  // currentPercent,
  // currentMember,}
  props
) => {
  const {
    // id = DUMMY_FUND_CARD.id,
    fundName = DUMMY_FUND_CARD.fundName,
    fundImageUrl = DUMMY_FUND_CARD.fundImageUrl,
    farmOwnerName = DUMMY_FUND_CARD.farmOwnerName,
    farmOwnerImageUrl = DUMMY_FUND_CARD.farmOwnerImageUrl,
    fundContents = DUMMY_FUND_CARD.fundContents,
    startDatetime = DUMMY_FUND_CARD.startDatetime,
    endDatetime = DUMMY_FUND_CARD.endDatetime,
    currentPercent = DUMMY_FUND_CARD.currentPercent,
    currentMember = DUMMY_FUND_CARD.currentMember,
  } = props;

  // 달성률
  const [Percent] = useState<number>(currentPercent);
  // 참여인원
  const [Member] = useState<number>(currentMember);

  // 찜 버튼
  // const [wish, setWish] = useState<boolean>(false);
  // useEffect(() => {
  //   // API 연동 시 활성화
  //   // api.get('/team/readTeamDetail', { teamId: id })
  //   // .then(res => {})
  //   // .catch(err => {
  //   //   console.error(err.response ?? err.message);
  //   // });
  // }, [id]);

  // // 찜 토글 핸들러
  // const handleWish = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   try {
  //     if (wish) {
  //       // JSON 포맷으로 요청
  //       // await api.postWithJson("/team/unLikeIt", { teamId: id });
  //     } else {
  //       // await api.postWithJson("/team/likeIt",   { teamId: id });
  //     }
  //     setWish(prev => !prev);
  //   } catch (err) {
  //     console.error("찜 상태 업데이트 실패", err);
  //   }
  // };

  // 날짜 표시
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric", // 4자리 연도
    month: "2-digit", // 2자리 월 (01~12)
    day: "2-digit", // 2자리 일 (01~31)
    hour: "2-digit", // 2자리 시 (00~23)
    minute: "2-digit", // 2자리 분 (00~59)
    hour12: false, // 12시간제 대신 24시간제
  };

  return (
    <section className={styles.fund_land_card}>
      {/* 펀드명 */}
      <h3 className={styles.fund_land_title}>{fundName}</h3>

      {/* 펀드 사진 */}
      {fundImageUrl ? (
        <img
          className={styles.fund_land_image}
          src={fundImageUrl}
          alt={`${fundName} 펀드 사진`}
        />
      ) : null}

      {/* 농장주 정보 */}
      <div className={styles.fund_land_avatar}>
        {/* Avatar 컴포넌트도 src에 null을 넘기면 디폴트 이미지를 보여줄 수 있도록 */}
        <Avatar src={farmOwnerImageUrl ?? undefined} />
        <strong>{farmOwnerName}</strong>
      </div>

      {/* 달성률 & 좋아요 */}
      <div className={styles.fund_land_bottom}>
        <strong>
          <span className={styles.fund_land_percent}>{Percent}% 달성</span>
        </strong>
        {/* <LikeIt isLiked={wish} onClick={handleWish} /> */}
        {/* 참여 인원 */}
        <p>
          <span className={styles.fund_land_member}>{Member}명 참여 중</span>
        </p>
      </div>

      {/* 펀딩 내용 */}
      <p>
        <span>{fundContents}</span>
      </p>

      {/* 날짜 */}
      <p>
        {new Date(startDatetime).toLocaleString("ko-KR", formatOptions)} ~{" "}
        {new Date(endDatetime).toLocaleString("ko-KR", formatOptions)}
      </p>
    </section>
  );
};

export interface LandCardProps {
  id: string;
  landName: string;
  landImageUrl?: string | null;
  landOwnerName: string;
  landOwnerImageUrl?: string | null;
  startDatetime: string;
  endDatetime: string;
  addr: string;
  detailAddr: string;
  currentPercent: number;
  currentMember: number;
  endMember: number;
}

export const LandCard: React.FC<LandCardProps> = ({
  id,
  landName,
  landImageUrl,
  landOwnerName,
  landOwnerImageUrl,
  startDatetime,
  endDatetime,
  addr,
  detailAddr,
  currentPercent,
  currentMember,
  endMember,
}) => {
  const navigate = useNavigate();
  // 참여인원
  const [Member] = useState<number>(currentMember);

  // 카드 클릭 핸들러
  const handleCardClick = () => {
    navigate(`/land/${id}`);
  };

  // 찜 버튼
  // const [wish, setWish] = useState<boolean>(false);
  // useEffect(() => {
  //   // API 연동 시 활성화
  //   // api.get('/team/readTeamDetail', { teamId: id })
  //   // .then(res => {})
  //   // .catch(err => {
  //   //   console.error(err.response ?? err.message);
  //   // });
  // }, [id]);

  // // 찜 토글 핸들러
  // const handleWish = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   try {
  //     if (wish) {
  //       // JSON 포맷으로 요청
  //       // await api.postWithJson("/team/unLikeIt", { teamId: id });
  //     } else {
  //       // await api.postWithJson("/team/likeIt",   { teamId: id });
  //     }
  //     setWish(prev => !prev);
  //     } catch (err) {
  //       console.error("찜 상태 업데이트 실패", err);
  //     }
  //   };

  // 날짜 표시
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric", // 4자리 연도
    month: "2-digit", // 2자리 월 (01~12)
    day: "2-digit", // 2자리 일 (01~31)
    hour: "2-digit", // 2자리 시 (00~23)
    minute: "2-digit", // 2자리 분 (00~59)
    hour12: false, // 12시간제 대신 24시간제
  };
  return (
    <section className={styles.fund_land_card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {/* 토자명 */}
      <h3 className={styles.fund_land_title}>{landName}</h3>

      {/* 토지사진 */}
      {landImageUrl ? (
        <img
          className={styles.fund_land_image}
          src={landImageUrl}
          alt={`${landName} 토지 사진`}
        />
      ) : null}

      {/* 지주 정보 */}
      <div className={styles.fund_land_avatar}>
        {/* Avatar 컴포넌트도 src에 null을 넘기면 디폴트 이미지를 보여줄 수 있도록 */}
        <Avatar src={landOwnerImageUrl ?? undefined} />
        <strong>{landOwnerName}</strong>
      </div>

      {/* 참여인원 & 좋아요 */}
      <div className={styles.fund_land_bottom}>
        <strong>
          <span className={styles.fund_land_percent}>{Member} / </span>
          {endMember}
        </strong>
        {/* <LikeIt isLiked={wish} onClick={handleWish} /> */}
      </div>

      {/* 날짜 */}
      <p>
        {new Date(startDatetime).toLocaleString("ko-KR", formatOptions)} ~{" "}
        {new Date(endDatetime).toLocaleString("ko-KR", formatOptions)}
      </p>

      {/* 주소 & 상세 주소 */}
      <p>
        <span className={styles.fund_land_member}>
          장소: {addr} / ({detailAddr})
        </span>
      </p>
    </section>
  );
};

/**
 * 정렬/필터 탭
 * - 구분자(|)가 자동으로 붙는 수평 탭
 * - 활성 탭은 진하게 표시
 */
interface SortTabsProps {
  items: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, index: number) => void;
  className?: string;
}

const SortTabs: React.FC<SortTabsProps> = ({
  items,
  value,
  defaultValue,
  onChange,
  className,
}) => {
  const [internal, setInternal] = useState<string>(
    value ?? defaultValue ?? (items.length ? items[0] : "")
  );

  // 외부 제어 값 반영
  useEffect(() => {
    if (value !== undefined) setInternal(value);
  }, [value]);

  const active = value ?? internal;

  const handleClick = (item: string, idx: number) => {
    if (value === undefined) setInternal(item);
    onChange?.(item, idx);
  };

  return (
    <nav className={`${styles.sort_tabs} ${className ? className : ""}`}>
      {items.map((item, idx) => (
        <button
          type="button"
          key={`${item}-${idx}`}
          className={`${styles.sort_tab_item} ${
            active === item ? styles.sort_tab_item_active : ""
          }`}
          onClick={() => handleClick(item, idx)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
};

/**
 * 페이지 네이션
 */
export interface PageInfoProps {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  startPage: number;
  endPage: number;
}

interface PaginationProps {
  page: PageInfoProps;
  onPageChange: (page: number) => void;
  showPageSizeSelector?: boolean;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  onPageChange,
  showPageSizeSelector = false,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
}) => {
  const { currentPage, totalItems, totalPages } = page;

  // 페이지 범위 계산
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * 10 + 1; // 기본 페이지 크기 10으로 가정
  const endItem = Math.min(currentPage * 10, totalItems);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onPageSizeChange) {
      onPageSizeChange(Number(e.target.value));
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.paginationContainer}>
      {/* 페이지 정보 표시 */}
      <div className={styles.pageInfo}>
        <span>
          {startItem}-{endItem} / 총 {totalItems}개
        </span>
      </div>

      {/* 페이지네이션 컨트롤 */}
      <div className={styles.paginationControls}>
        {/* 첫 페이지로 */}
        {showFirstLast && (
          <Button
            type="button"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={`${styles.pageButton} ${styles.pageButtonDark}`}
          >
            처음
          </Button>
        )}

        {/* 이전 페이지 */}
        {showPrevNext && (
          <Button
            type="button"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.pageButton} ${styles.pageButtonLight}`}
          >
            이전
          </Button>
        )}

        {/* 페이지 번호들 */}
        <div className={styles.pageNumbers}>
          {visiblePages.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`${styles.pageNumber} ${
                pageNum === currentPage ? styles.pageActive : ""
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* 다음 페이지 */}
        {showPrevNext && (
          <Button
            type="button"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles.pageButton} ${styles.pageButtonLight}`}
          >
            다음
          </Button>
        )}

        {/* 마지막 페이지로 */}
        {showFirstLast && (
          <Button
            type="button"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`${styles.pageButton} ${styles.pageButtonDark}`}
          >
            마지막
          </Button>
        )}
      </div>

      {/* 페이지 크기 선택기 */}
      {showPageSizeSelector && onPageSizeChange && (
        <div className={styles.pageSizeSelector}>
          <span>페이지당 항목:</span>
          <select onChange={handlePageSizeChange}>
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export { Pagination };
export { SortTabs };
