import styles from "./index.module.css";
import { Avatar, Button, LikeIt } from "../ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs, { TabItemProps } from './Tabs';

// 마켓 카드 컴포넌트
export interface MarketCardProps {
  id: number;
  productName: string;
  productImage: string;
  sellerImage: string;
  sellerName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  location: string;
  category: string;
  isOrganic: boolean;
  isLocal: boolean;
  stock: number;
  unit: string;
  description: string;
  createdAt: string;
  isLiked: boolean;
  distance?: number;
  deliveryOption?: string;
  minOrder?: number;
}

// 더미 데이터
export const DUMMY_MARKET_CARD: MarketCardProps = {
  id: 1,
  productName: "신선한 채소 제품 1호",
  productImage: "/images/fundcard_img.svg",
  sellerImage: "/images/farmowner_img.svg",
  sellerName: "농장주 1호",
  price: 15000,
  originalPrice: 20000,
  rating: 4,
  reviewCount: 25,
  location: "경기도",
  category: "채소",
  isOrganic: true,
  isLocal: true,
  stock: 30,
  unit: "kg",
  description: "농장에서 직접 재배한 신선하고 맛있는 농산물입니다.",
  createdAt: new Date().toISOString(),
  isLiked: false,
  distance: 5,
  deliveryOption: "직접방문",
  minOrder: 10000,
};

export const MarketCard: React.FC<MarketCardProps> = ({
  id,
  productName,
  productImage,
  sellerImage,
  sellerName,
  price,
  originalPrice,
  rating,
  reviewCount,
  location,
  category,
  isOrganic,
  isLocal,
  stock,
  unit,
  description,
  createdAt,
  isLiked,
  distance,
  deliveryOption,
  minOrder,
}) => {
  const navigate = useNavigate();

  // 가격 포맷팅
  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  // 평점별 별점 렌더링
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`${styles.star} ${
          i < rating ? styles.star_filled : styles.star_empty
        }`}
      >
        ★
      </span>
    ));
  };

  // 거리 포맷팅
  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  // 카드 클릭 핸들러
  const handleCardClick = () => {
    navigate(`/market_detail/${id}`);
  };

  return (
    <div className={styles.market_card} onClick={handleCardClick}>
      <div className={styles.product_image_container}>
        <img
          src={productImage}
          alt={productName}
          className={styles.product_image}
        />
        <div className={styles.product_badges}>
          {isOrganic && <span className={styles.badge_organic}>유기농</span>}
          {isLocal && <span className={styles.badge_local}>지역특산</span>}
        </div>
        <div className={styles.product_actions_overlay}>
          <button
            className={styles.share_button}
            title="공유하기"
            onClick={(e) => e.stopPropagation()}
          >
            📤
          </button>
        </div>
      </div>

      <div className={styles.product_info}>
        <div className={styles.product_header}>
          <h3 className={styles.product_name}>{productName}</h3>
          <div className={styles.product_rating}>
            {renderStars(rating)}
            <span className={styles.review_count}>({reviewCount})</span>
          </div>
        </div>

        <div className={styles.seller_info}>
          <img
            src={sellerImage}
            alt={sellerName}
            className={styles.seller_image}
            onClick={(e) => e.stopPropagation()}
          />
          <span className={styles.seller_name}>{sellerName}</span>
          <span className={styles.location}>
            📍 {location}
            {distance && (
              <span className={styles.distance}>
                ({formatDistance(distance)})
              </span>
            )}
          </span>
        </div>

        <div className={styles.product_details}>
          <div className={styles.price_info}>
            {originalPrice && (
              <span className={styles.original_price}>
                {formatPrice(originalPrice)}원
              </span>
            )}
            <span className={styles.current_price}>{formatPrice(price)}원</span>
            <span className={styles.unit}>/{unit}</span>
          </div>
          <div className={styles.stock_info}>
            재고: {stock}
            {unit}
          </div>
          {minOrder && (
            <div className={styles.min_order_info}>
              최소주문: {formatPrice(minOrder)}원
            </div>
          )}
          <div className={styles.delivery_info}>배송: {deliveryOption}</div>
        </div>

        <div className={styles.product_actions}>
          <button
            className={styles.cart_button}
            onClick={(e) => e.stopPropagation()}
          >
            🛒 장바구니
          </button>
          <button
            className={styles.detail_button}
            onClick={(e) => e.stopPropagation()}
          >
            상세보기
          </button>
        </div>

        <div className={styles.product_footer}>
          <button
            className={styles.review_button}
            onClick={(e) => e.stopPropagation()}
          >
            리뷰 작성
          </button>
        </div>
      </div>
    </div>
  );
};

// 토지 카드 컴포넌트트
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
    <section
      className={styles.fund_land_card}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
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
      <div>
        <strong>{Member}명 지원</strong>
      </div>

      {/* 날짜 */}
      <p>
        {new Date(startDatetime).toLocaleString("ko-KR", formatOptions)} ~{" "}
        {new Date(endDatetime).toLocaleString("ko-KR", formatOptions)}
      </p>

      {/* 주소 & 상세 주소 */}
      <p><b>주소:</b> {addr} / ({detailAddr})</p>
      <div className={styles.like_it_box}>
        <LikeIt isLiked={false} />
      </div>
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

export { Pagination, SortTabs, Tabs};
export type { TabItemProps};
