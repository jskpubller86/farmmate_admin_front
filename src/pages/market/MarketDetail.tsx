import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./market.module.css";
import { Button, Avatar, Badge } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShare,
  faMapMarkerAlt,
  faStar,
  faShoppingCart,
  faPhone,
  faEnvelope,
  faLeaf,
  faSeedling,
  faThermometerHalf,
  faWater,
  faSun,
  faClock,
  faTruck,
  faUser,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

interface MarketDetailData {
  id: number;
  productName: string;
  productImages: string[];
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
  distance: number;
  deliveryOption: string;
  minOrder: number;
  views: number;
  likes: number;
  sellerRating: number;
  sellerReviewCount: number;
  sellerPhone: string;
  sellerEmail: string;
  harvestDate: string;
  expiryDate: string;
  weight: string;
  dimensions: string;
  packaging: string;
  certifications: string[];
  returnPolicy: string;
  shippingInfo: string;
}

const MarketDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // 더미 데이터
  const marketDetailData: MarketDetailData = {
    id: 1,
    productName: "신선한 유기농 배추 - 농장에서 직접 전달되는 최고 품질",
    productImages: [
      "/images/xcb0.jpg",
      "/images/xcb1.jpg",
      "/images/xcb2.jpg",
      "/images/xcb3.jpg",
      "/images/xcb4.jpg",
    ],
    sellerImage: "/images/farmowner_img.svg",
    sellerName: "김농장",
    price: 15000,
    originalPrice: 20000,
    rating: 4.8,
    reviewCount: 127,
    location: "경기도 안성시",
    category: "채소",
    isOrganic: true,
    isLocal: true,
    stock: 50,
    unit: "포기",
    description:
      "안성시에서 30년간 전통 방식으로 재배한 유기농 배추입니다. 화학비료나 농약을 전혀 사용하지 않고 자연 친화적인 방법으로 재배하여 맛과 영양이 풍부합니다. 특히 김치 담그기에 최적화된 단단하고 달콤한 배추입니다.",
    createdAt: "2024-01-15",
    isLiked: false,
    distance: 2.5,
    deliveryOption: "배송",
    minOrder: 10000,
    views: 1250,
    likes: 89,
    sellerRating: 4.9,
    sellerReviewCount: 342,
    sellerPhone: "010-1234-5678",
    sellerEmail: "kimfarm@example.com",
    harvestDate: "2024-01-10",
    expiryDate: "2024-01-25",
    weight: "2-3kg",
    dimensions: "길이 25-30cm",
    packaging: "비닐 포장",
    certifications: ["유기농 인증", "GAP 인증", "친환경 인증"],
    returnPolicy: "배송 후 7일 이내 신선도 문제 시 교환/환불 가능",
    shippingInfo: "오전 주문 시 당일 오후 배송, 오후 주문 시 다음날 오전 배송",
  };

  // 이미지 슬라이더 네비게이션
  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % marketDetailData.productImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + marketDetailData.productImages.length) %
        marketDetailData.productImages.length
    );
  };

  // 좋아요 토글
  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  // 수량 변경
  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, selectedQuantity + change);
    setSelectedQuantity(newQuantity);
  };

  // 장바구니 추가
  const handleAddToCart = () => {
    console.log("장바구니 추가:", { productId, quantity: selectedQuantity });
    // TODO: 장바구니 API 호출
  };

  // 구매하기
  const handleBuyNow = () => {
    console.log("구매하기:", { productId, quantity: selectedQuantity });
    // TODO: 구매 페이지로 이동
  };

  // 판매자 연락처
  const handleContactSeller = (type: "phone" | "email") => {
    if (type === "phone") {
      window.open(`tel:${marketDetailData.sellerPhone}`);
    } else {
      window.open(`mailto:${marketDetailData.sellerEmail}`);
    }
  };

  // 평점별 별점 렌더링
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={`${styles.detail_star} ${
          i < rating ? styles.detail_star_filled : styles.detail_star_empty
        }`}
      />
    ));
  };

  // 가격 포맷팅
  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  // 할인율 계산
  const discountRate = marketDetailData.originalPrice
    ? Math.round(
        ((marketDetailData.originalPrice - marketDetailData.price) /
          marketDetailData.originalPrice) *
          100
      )
    : 0;

  return (
    <div className={styles.market_detail_container}>
      {/* 상품 상태 배지 */}
      <div className={styles.product_status_badges}>
        {marketDetailData.isOrganic && (
          <Badge
            className={`${styles.status_badge} ${styles.status_badge_organic}`}
          >
            <FontAwesomeIcon icon={faLeaf} />
            유기농
          </Badge>
        )}
        {marketDetailData.isLocal && (
          <Badge
            className={`${styles.status_badge} ${styles.status_badge_local}`}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            지역특산
          </Badge>
        )}
        {discountRate > 0 && (
          <Badge
            className={`${styles.status_badge} ${styles.status_badge_discount}`}
          >
            {discountRate}% 할인
          </Badge>
        )}
      </div>

      {/* 상품 제목 */}
      <h1 className={styles.product_detail_title}>
        {marketDetailData.productName}
      </h1>

      {/* 이미지 슬라이더 */}
      <div className={styles.product_image_slider}>
        <img
          src={marketDetailData.productImages[currentImageIndex]}
          alt={`${marketDetailData.productName} ${currentImageIndex + 1}`}
          className={styles.slider_main_image}
        />

        {/* 이미지 네비게이션 */}
        <button className={styles.slider_nav_prev} onClick={prevImage}>
          ‹
        </button>
        <button className={styles.slider_nav_next} onClick={nextImage}>
          ›
        </button>

        {/* 썸네일 이미지들 */}
        <div className={styles.thumbnail_images}>
          {marketDetailData.productImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`썸네일 ${index + 1}`}
              className={`${styles.thumbnail_image} ${
                index === currentImageIndex ? styles.thumbnail_active : ""
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* 상품 기본 정보 */}
      <div className={styles.product_basic_info}>
        <div className={styles.price_section}>
          {marketDetailData.originalPrice && (
            <span className={styles.original_price_detail}>
              {formatPrice(marketDetailData.originalPrice)}원
            </span>
          )}
          <span className={styles.current_price_detail}>
            {formatPrice(marketDetailData.price)}원
          </span>
          <span className={styles.unit_detail}>/{marketDetailData.unit}</span>
        </div>

        <div className={styles.rating_section}>
          <div className={styles.rating_stars}>
            {renderStars(marketDetailData.rating)}
          </div>
          <span className={styles.rating_score}>{marketDetailData.rating}</span>
          <span className={styles.review_count_detail}>
            리뷰 {marketDetailData.reviewCount}개
          </span>
        </div>

        <div className={styles.product_stats}>
          <div className={styles.stat_item}>
            <FontAwesomeIcon icon={faEye} />
            <span>조회 {marketDetailData.views}</span>
          </div>
          <div className={styles.stat_item}>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>좋아요 {marketDetailData.likes}</span>
          </div>
          <div className={styles.stat_item}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{marketDetailData.distance}km</span>
          </div>
        </div>
      </div>

      {/* 판매자 정보 */}
      <div className={styles.seller_info_detail}>
        <div className={styles.seller_profile}>
          <Avatar
            src={marketDetailData.sellerImage}
            className={styles.seller_avatar_detail}
          />
          <div className={styles.seller_details}>
            <div className={styles.seller_name_detail}>
              {marketDetailData.sellerName}
            </div>
            <div className={styles.seller_rating}>
              {renderStars(marketDetailData.sellerRating)}
              <span className={styles.seller_rating_score}>
                {marketDetailData.sellerRating}
              </span>
              <span className={styles.seller_review_count}>
                ({marketDetailData.sellerReviewCount}개 리뷰)
              </span>
            </div>
            <div className={styles.seller_location}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              {marketDetailData.location}
            </div>
          </div>
        </div>

        <div className={styles.seller_actions}>
          <Button
            className={styles.contact_button}
            onClick={() => handleContactSeller("phone")}
          >
            <FontAwesomeIcon icon={faPhone} />
            전화
          </Button>
          <Button
            className={styles.contact_button}
            onClick={() => handleContactSeller("email")}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            이메일
          </Button>
        </div>
      </div>

      {/* 상품 상세 정보 */}
      <div className={styles.product_detail_section}>
        <h3 className={styles.section_title}>상품 정보</h3>
        <div className={styles.product_details_grid}>
          <div className={styles.detail_item}>
            <span className={styles.detail_label}>카테고리</span>
            <span className={styles.detail_value}>
              {marketDetailData.category}
            </span>
          </div>
          <div className={styles.detail_item}>
            <span className={styles.detail_label}>수확일</span>
            <span className={styles.detail_value}>
              {marketDetailData.harvestDate}
            </span>
          </div>
          <div className={styles.detail_item}>
            <span className={styles.detail_label}>유통기한</span>
            <span className={styles.detail_value}>
              {marketDetailData.expiryDate}
            </span>
          </div>
          <div className={styles.detail_item}>
            <span className={styles.detail_label}>무게</span>
            <span className={styles.detail_value}>
              {marketDetailData.weight}
            </span>
          </div>
          <div className={styles.detail_item}>
            <span className={styles.detail_label}>크기</span>
            <span className={styles.detail_value}>
              {marketDetailData.dimensions}
            </span>
          </div>
          <div className={styles.detail_item}>
            <span className={styles.detail_label}>포장</span>
            <span className={styles.detail_value}>
              {marketDetailData.packaging}
            </span>
          </div>
        </div>

        {/* 인증 정보 */}
        {marketDetailData.certifications.length > 0 && (
          <div className={styles.certifications}>
            <h4 className={styles.certifications_title}>인증 정보</h4>
            <div className={styles.certifications_list}>
              {marketDetailData.certifications.map((cert, index) => (
                <Badge key={index} className={styles.certification_badge}>
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 상품 설명 */}
      <div className={styles.product_description_section}>
        <h3 className={styles.section_title}>상품 설명</h3>
        <p className={styles.product_description_text}>
          {marketDetailData.description}
        </p>
      </div>

      {/* 배송 및 반품 정보 */}
      <div className={styles.shipping_return_section}>
        <h3 className={styles.section_title}>배송 및 반품</h3>
        <div className={styles.shipping_info}>
          <div className={styles.shipping_item}>
            <FontAwesomeIcon icon={faTruck} />
            <span className={styles.shipping_label}>배송 정보</span>
            <span className={styles.shipping_value}>
              {marketDetailData.shippingInfo}
            </span>
          </div>
          <div className={styles.shipping_item}>
            <FontAwesomeIcon icon={faClock} />
            <span className={styles.shipping_label}>반품 정책</span>
            <span className={styles.shipping_value}>
              {marketDetailData.returnPolicy}
            </span>
          </div>
        </div>
      </div>

      {/* 구매 옵션 */}
      <div className={styles.purchase_options}>
        <h3 className={styles.section_title}>구매 옵션</h3>
        <div className={styles.quantity_selector}>
          <span className={styles.quantity_label}>수량</span>
          <div className={styles.quantity_controls}>
            <button
              className={styles.quantity_btn}
              onClick={() => handleQuantityChange(-1)}
              disabled={selectedQuantity <= 1}
            >
              -
            </button>
            <span className={styles.quantity_value}>{selectedQuantity}</span>
            <button
              className={styles.quantity_btn}
              onClick={() => handleQuantityChange(1)}
              disabled={selectedQuantity >= marketDetailData.stock}
            >
              +
            </button>
          </div>
          <span className={styles.stock_info}>
            재고: {marketDetailData.stock}
            {marketDetailData.unit}
          </span>
        </div>

        <div className={styles.total_price}>
          <span className={styles.total_label}>총 금액</span>
          <span className={styles.total_value}>
            {formatPrice(marketDetailData.price * selectedQuantity)}원
          </span>
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className={styles.product_action_buttons}>
        <Button
          className={`${styles.action_button} ${styles.like_button_detail}`}
          onClick={handleLikeToggle}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={isLiked ? styles.liked_icon : ""}
          />
          {isLiked ? "좋아요 취소" : "좋아요"}
        </Button>

        <Button
          className={`${styles.action_button} ${styles.share_button_detail}`}
          onClick={() => setShowShareModal(true)}
        >
          <FontAwesomeIcon icon={faShare} />
          공유하기
        </Button>

        <Button
          className={`${styles.action_button} ${styles.cart_button_detail}`}
          onClick={handleAddToCart}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          장바구니
        </Button>

        <Button
          className={`${styles.action_button} ${styles.buy_button_detail}`}
          onClick={handleBuyNow}
        >
          구매하기
        </Button>
      </div>

      {/* 리뷰 섹션 */}
      <div className={styles.reviews_section}>
        <div className={styles.reviews_header}>
          <h3 className={styles.section_title}>
            리뷰 ({marketDetailData.reviewCount})
          </h3>
          <Button
            className={styles.write_review_button}
            onClick={() => setShowReviewModal(true)}
          >
            리뷰 작성
          </Button>
        </div>

        {/* 리뷰 목록 (더미 데이터) */}
        <div className={styles.reviews_list}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={styles.review_item}>
              <div className={styles.review_header}>
                <Avatar
                  src="/images/img_profile.svg"
                  className={styles.reviewer_avatar}
                />
                <div className={styles.reviewer_info}>
                  <span className={styles.reviewer_name}>구매자{i + 1}</span>
                  <div className={styles.review_rating}>{renderStars(4.5)}</div>
                </div>
                <span className={styles.review_date}>2024.01.{10 + i}</span>
              </div>
              <p className={styles.review_text}>
                정말 신선하고 맛있어요! 유기농이라 믿을 수 있고, 배송도
                빠르네요. 다음에도 구매하고 싶습니다.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 관련 상품 추천 */}
      <div className={styles.related_products}>
        <h3 className={styles.section_title}>이런 상품은 어떠세요?</h3>
        <div className={styles.related_products_grid}>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={styles.related_product_card}>
              <img
                src="/images/fundcard_img.svg"
                alt={`관련 상품 ${i + 1}`}
                className={styles.related_product_image}
              />
              <div className={styles.related_product_info}>
                <h4 className={styles.related_product_name}>
                  신선한 {["당근", "양파", "감자", "고구마"][i]}
                </h4>
                <span className={styles.related_product_price}>
                  {formatPrice(8000 + i * 2000)}원
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;
