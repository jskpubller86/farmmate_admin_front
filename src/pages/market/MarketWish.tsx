import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./market.module.css";

interface WishItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  seller: {
    name: string;
    rating: number;
    reviewCount: number;
    location: string;
    distance: string;
  };
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
  isLocal: boolean;
  stock: number;
  minOrder: number;
  deliveryFee: number;
  addedAt: string;
}

const MarketWish: React.FC = () => {
  const [wishItems, setWishItems] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"recent" | "price" | "rating">("recent");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // 더미 데이터 (실제로는 API에서 가져올 데이터)
  useEffect(() => {
    const dummyData: WishItem[] = [
      {
        id: 1,
        name: "신선한 유기농 토마토",
        price: 8000,
        originalPrice: 12000,
        unit: "1kg",
        image: "/images/xcb0.jpg",
        seller: {
          name: "친환경농장",
          rating: 4.8,
          reviewCount: 127,
          location: "경기도 양평군",
          distance: "15km",
        },
        rating: 4.8,
        reviewCount: 127,
        isOrganic: true,
        isLocal: true,
        stock: 50,
        minOrder: 1,
        deliveryFee: 3000,
        addedAt: "2024-01-15",
      },
      {
        id: 2,
        name: "제철 사과 (홍로)",
        price: 15000,
        unit: "2kg",
        image: "/images/xcb1.jpg",
        seller: {
          name: "사과농원",
          rating: 4.6,
          reviewCount: 89,
          location: "강원도 철원군",
          distance: "45km",
        },
        rating: 4.6,
        reviewCount: 89,
        isOrganic: false,
        isLocal: true,
        stock: 30,
        minOrder: 1,
        deliveryFee: 4000,
        addedAt: "2024-01-14",
      },
      {
        id: 3,
        name: "무농약 상추",
        price: 3000,
        unit: "1단",
        image: "/images/xcb2.jpg",
        seller: {
          name: "녹색농장",
          rating: 4.9,
          reviewCount: 203,
          location: "경기도 가평군",
          distance: "25km",
        },
        rating: 4.9,
        reviewCount: 203,
        isOrganic: true,
        isLocal: true,
        stock: 100,
        minOrder: 1,
        deliveryFee: 2500,
        addedAt: "2024-01-13",
      },
      {
        id: 4,
        name: "신선한 당근",
        price: 5000,
        unit: "1kg",
        image: "/images/xcb3.jpg",
        seller: {
          name: "당근농장",
          rating: 4.7,
          reviewCount: 156,
          location: "충청남도 논산시",
          distance: "80km",
        },
        rating: 4.7,
        reviewCount: 156,
        isOrganic: false,
        isLocal: false,
        stock: 75,
        minOrder: 2,
        deliveryFee: 5000,
        addedAt: "2024-01-12",
      },
    ];

    // 정렬 및 필터링 적용
    let filteredData = [...dummyData];

    // 카테고리 필터링
    if (filterCategory !== "all") {
      filteredData = filteredData.filter((item) => {
        if (filterCategory === "organic") return item.isOrganic;
        if (filterCategory === "local") return item.isLocal;
        return true;
      });
    }

    // 정렬
    filteredData.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "recent":
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
    });

    setWishItems(filteredData);
    setLoading(false);
  }, [sortBy, filterCategory]);

  const handleRemoveWish = (id: number) => {
    setWishItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (id: number) => {
    // 장바구니로 이동하는 로직 (실제로는 API 호출)
    console.log(`상품 ${id}를 장바구니로 이동`);
  };

  const handleShare = (item: WishItem) => {
    // 공유 기능 (실제로는 공유 API 호출)
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `${item.name} - ${item.price.toLocaleString()}원`,
        url: window.location.href,
      });
    } else {
      // 클립보드에 복사
      navigator.clipboard.writeText(
        `${item.name} - ${item.price.toLocaleString()}원`
      );
      alert("상품 정보가 클립보드에 복사되었습니다.");
    }
  };

  if (loading) {
    return (
      <div className={styles.market_wish_container}>
        <div className={styles.loader}>
          <div className={styles.loader_spinner}></div>
          <p>찜 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.market_wish_container}>
      {/* 헤더 영역 */}
      <div className={styles.wish_header}>
        <h1 className={styles.wish_title}>내 찜 목록</h1>
        <p className={styles.wish_subtitle}>
          총 <strong>{wishItems.length}개</strong>의 상품을 찜하셨습니다
        </p>
      </div>

      {/* 필터 및 정렬 */}
      <div className={styles.wish_filter_box}>
        <div className={styles.wish_filter_row}>
          <div className={styles.category_filter}>
            <span className={styles.filter_label}>카테고리:</span>
            <div className={styles.filter_buttons}>
              <button
                className={`${styles.filter_btn} ${
                  filterCategory === "all" ? styles.filter_btn_active : ""
                }`}
                onClick={() => setFilterCategory("all")}
              >
                전체
              </button>
              <button
                className={`${styles.filter_btn} ${
                  filterCategory === "organic" ? styles.filter_btn_active : ""
                }`}
                onClick={() => setFilterCategory("organic")}
              >
                유기농
              </button>
              <button
                className={`${styles.filter_btn} ${
                  filterCategory === "local" ? styles.filter_btn_active : ""
                }`}
                onClick={() => setFilterCategory("local")}
              >
                로컬
              </button>
            </div>
          </div>

          <div className={styles.sort_filter}>
            <span className={styles.filter_label}>정렬:</span>
            <select
              className={styles.sort_select}
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "recent" | "price" | "rating")
              }
            >
              <option value="recent">최근 찜순</option>
              <option value="price">가격순</option>
              <option value="rating">평점순</option>
            </select>
          </div>
        </div>
      </div>

      {/* 찜 목록 */}
      {wishItems.length === 0 ? (
        <div className={styles.empty_wish}>
          <div className={styles.empty_icon}>💚</div>
          <h3>찜한 상품이 없습니다</h3>
          <p>마음에 드는 상품을 찜해보세요!</p>
          <Link to="/market_list" className={styles.browse_market_btn}>
            마켓 둘러보기
          </Link>
        </div>
      ) : (
        <div className={styles.wish_grid}>
          {wishItems.map((item) => (
            <div key={item.id} className={styles.wish_card}>
              {/* 상품 이미지 */}
              <div className={styles.wish_image_container}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.wish_image}
                />

                {/* 배지 */}
                <div className={styles.wish_badges}>
                  {item.isOrganic && (
                    <span className={styles.badge_organic}>유기농</span>
                  )}
                  {item.isLocal && (
                    <span className={styles.badge_local}>로컬</span>
                  )}
                </div>

                {/* 찜 제거 버튼 */}
                <button
                  className={styles.remove_wish_btn}
                  onClick={() => handleRemoveWish(item.id)}
                  title="찜 목록에서 제거"
                >
                  ×
                </button>

                {/* 공유 버튼 */}
                <button
                  className={styles.share_wish_btn}
                  onClick={() => handleShare(item)}
                  title="상품 공유"
                >
                  📤
                </button>
              </div>

              {/* 상품 정보 */}
              <div className={styles.wish_info}>
                <div className={styles.wish_header_info}>
                  <h3 className={styles.wish_product_name}>{item.name}</h3>
                  <div className={styles.wish_rating}>
                    <div className={styles.star_rating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`${styles.star} ${
                            star <= item.rating
                              ? styles.star_filled
                              : styles.star_empty
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className={styles.review_count}>
                      ({item.reviewCount})
                    </span>
                  </div>
                </div>

                {/* 판매자 정보 */}
                <div className={styles.wish_seller_info}>
                  <div className={styles.seller_profile}>
                    <img
                      src="/images/farmowner_img.svg"
                      alt="판매자"
                      className={styles.seller_image}
                    />
                    <div className={styles.seller_details}>
                      <span className={styles.seller_name}>
                        {item.seller.name}
                      </span>
                      <div className={styles.seller_rating}>
                        <span className={styles.seller_rating_score}>
                          {item.seller.rating}
                        </span>
                        <span className={styles.seller_review_count}>
                          ({item.seller.reviewCount})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.location_info}>
                    <span className={styles.location_icon}>📍</span>
                    <span className={styles.location_text}>
                      {item.seller.location}
                    </span>
                    <span className={styles.distance}>
                      ({item.seller.distance})
                    </span>
                  </div>
                </div>

                {/* 가격 정보 */}
                <div className={styles.wish_price_info}>
                  {item.originalPrice && (
                    <span className={styles.original_price}>
                      {item.originalPrice.toLocaleString()}원
                    </span>
                  )}
                  <span className={styles.current_price}>
                    {item.price.toLocaleString()}원
                  </span>
                  <span className={styles.unit}>/{item.unit}</span>
                </div>

                {/* 상품 상세 정보 */}
                <div className={styles.wish_details}>
                  <div className={styles.detail_item}>
                    <span className={styles.detail_label}>재고:</span>
                    <span className={styles.detail_value}>{item.stock}개</span>
                  </div>
                  <div className={styles.detail_item}>
                    <span className={styles.detail_label}>최소주문:</span>
                    <span className={styles.detail_value}>
                      {item.minOrder}
                      {item.unit}
                    </span>
                  </div>
                  <div className={styles.detail_item}>
                    <span className={styles.detail_label}>배송비:</span>
                    <span className={styles.detail_value}>
                      {item.deliveryFee === 0
                        ? "무료"
                        : `${item.deliveryFee.toLocaleString()}원`}
                    </span>
                  </div>
                </div>

                {/* 찜한 날짜 */}
                <div className={styles.wish_date}>
                  찜한 날짜:{" "}
                  {new Date(item.addedAt).toLocaleDateString("ko-KR")}
                </div>

                {/* 액션 버튼 */}
                <div className={styles.wish_actions}>
                  <button
                    className={styles.move_to_cart_btn}
                    onClick={() => handleMoveToCart(item.id)}
                  >
                    장바구니 담기
                  </button>
                  <Link
                    to={`/market_detail/${item.id}`}
                    className={styles.view_detail_btn}
                  >
                    상품 보기
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 플로팅 액션 버튼 */}
      <button className={styles.floating_action_button} title="마켓으로 이동">
        <Link to="/market_list" className={styles.fab_icon}>
          🛒
        </Link>
      </button>
    </div>
  );
};

export default MarketWish;
