import React, { useState, useEffect } from "react";
import styles from "./cart.module.css";
import { Button, Badge } from "../../components/ui";
import {
  Trash,
  Heart,
  Share,
  MapMarkerAlt,
  Star,
  ShoppingCart,
  Truck,
  CreditCard,
  Gift,
  Leaf,
  ExclamationTriangle,
} from "../../components/icon";
import { useNavigate } from "react-router-dom";

// ===== 타입 정의 =====
interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  sellerName: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  unit: string;
  stock: number;
  isOrganic: boolean;
  isLocal: boolean;
  deliveryOption: string;
  minOrder: number;
  location: string;
  distance: number;
  isSelected: boolean;
  isLiked: boolean;
}

interface CartSummary {
  totalItems: number;
  totalPrice: number;
  totalOriginalPrice: number;
  totalDiscount: number;
  deliveryFee: number;
  finalTotal: number;
}

// ===== 상수 정의 =====
const DELIVERY_FREE_THRESHOLD = 50000; // 5만원 이상 무료배송
const DELIVERY_FEE = 3000; // 기본 배송비

const Mycart: React.FC = () => {
  const navigate = useNavigate();

  // ===== 상태 관리 =====
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyCart, setShowEmptyCart] = useState(false);

  // ===== 초기 데이터 로드 =====
  useEffect(() => {
    const dummyCartItems: CartItem[] = [
      {
        id: 1,
        productId: 101,
        productName: "신선한 유기농 배추 - 농장에서 직접 전달되는 최고 품질",
        productImage: "/images/xcb0.jpg",
        sellerName: "김농장",
        price: 15000,
        originalPrice: 20000,
        quantity: 2,
        unit: "포기",
        stock: 50,
        isOrganic: true,
        isLocal: true,
        deliveryOption: "배송",
        minOrder: 10000,
        location: "경기도 안성시",
        distance: 2.5,
        isSelected: true,
        isLiked: false,
      },
      {
        id: 2,
        productId: 102,
        productName: "제철 과일 사과 - 아삭하고 달콤한 맛",
        productImage: "/images/xcb1.jpg",
        sellerName: "사과농장",
        price: 25000,
        quantity: 1,
        unit: "kg",
        stock: 30,
        isOrganic: false,
        isLocal: true,
        deliveryOption: "배송",
        minOrder: 15000,
        location: "강원도 횡성",
        distance: 45.2,
        isSelected: true,
        isLiked: true,
      },
      {
        id: 3,
        productId: 103,
        productName: "유기농 당근 - 비타민이 풍부한 건강한 당근",
        productImage: "/images/xcb2.jpg",
        sellerName: "당근농장",
        price: 8000,
        originalPrice: 12000,
        quantity: 3,
        unit: "kg",
        stock: 25,
        isOrganic: true,
        isLocal: false,
        deliveryOption: "직접방문",
        minOrder: 5000,
        location: "충청도 청주",
        distance: 12.8,
        isSelected: false,
        isLiked: false,
      },
    ];

    setCartItems(dummyCartItems);
  }, []);

  // ===== 계산된 값들 =====
  // 장바구니 요약 계산
  const cartSummary: CartSummary = cartItems.reduce(
    (summary, item) => {
      if (item.isSelected) {
        const itemTotal = item.price * item.quantity;
        const itemOriginalTotal =
          (item.originalPrice || item.price) * item.quantity;

        summary.totalItems += item.quantity;
        summary.totalPrice += itemTotal;
        summary.totalOriginalPrice += itemOriginalTotal;
        summary.totalDiscount += itemOriginalTotal - itemTotal;
      }
      return summary;
    },
    {
      totalItems: 0,
      totalPrice: 0,
      totalOriginalPrice: 0,
      totalDiscount: 0,
      deliveryFee: 0,
      finalTotal: 0,
    }
  );

  // 배송비 계산 (5만원 이상 무료배송)
  cartSummary.deliveryFee =
    cartSummary.totalPrice >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE;
  cartSummary.finalTotal = cartSummary.totalPrice + cartSummary.deliveryFee;

  // 선택된 아이템 수
  const selectedCount = cartItems.filter((item) => item.isSelected).length;
  const totalCount = cartItems.length;

  // ===== 이벤트 핸들러들 =====
  // 전체 선택/해제
  const handleSelectAll = (selected: boolean) => {
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, isSelected: selected }))
    );
  };

  // 개별 아이템 선택/해제
  const handleItemSelect = (itemId: number, selected: boolean) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isSelected: selected } : item
      )
    );
  };

  // 수량 변경
  const handleQuantityChange = (itemId: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(
            1,
            Math.min(item.quantity + change, item.stock)
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // 아이템 삭제
  const handleRemoveItem = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // 좋아요 토글
  const handleLikeToggle = (itemId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  // 선택된 아이템만 삭제
  const handleRemoveSelected = () => {
    setCartItems((prev) => prev.filter((item) => !item.isSelected));
  };

  // 장바구니 비우기
  const handleClearCart = () => {
    setCartItems([]);
  };

  // 구매하기
  const handleCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.isSelected);
    if (selectedItems.length === 0) {
      alert("구매할 상품을 선택해주세요.");
      return;
    }

    console.log("구매 진행:", selectedItems);
    // Checkout 페이지로 이동
    navigate("/checkout", { state: { items: selectedItems } });
  };

  // 찜하기로 이동
  const handleMoveToWishlist = () => {
    const selectedItems = cartItems.filter((item) => item.isSelected);
    if (selectedItems.length === 0) {
      alert("찜하기로 이동할 상품을 선택해주세요.");
      return;
    }

    navigate("/market_wish");
  };

  // ===== 유틸리티 함수들 =====
  // 가격 포맷팅
  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  // 평점별 별점 렌더링
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${styles.star} ${
          i < rating ? styles.star_filled : styles.star_empty
        }`}
      />
    ));
  };

  // 거리 포맷팅
  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  // ===== 빈 장바구니 렌더링 =====
  if (cartItems.length === 0) {
    return (
      <div className={styles.cart_container}>
        <div className={styles.empty_cart}>
          <div className={styles.empty_cart_icon}>
            <ShoppingCart />
          </div>
          <h2 className={styles.empty_cart_title}>장바구니가 비어있습니다</h2>
          <p className={styles.empty_cart_message}>
            마켓에서 마음에 드는 상품을 장바구니에 담아보세요!
          </p>
          <Button
            className={styles.shop_now_button}
            onClick={() => (window.location.href = "/market_list")}
          >
            쇼핑하러 가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart_container}>
      {/* ===== 장바구니 헤더 영역 ===== */}
      <div className={styles.cart_header}>
        <h1 className={styles.cart_title}>내 장바구니</h1>
        <div className={styles.cart_stats}>
          <span className={styles.cart_count}>총 {totalCount}개 상품</span>
          <span className={styles.selected_count}>
            선택된 {selectedCount}개 상품
          </span>
        </div>
      </div>

      {/* ===== 장바구니 컨트롤 영역 ===== */}
      <div className={styles.cart_controls}>
        <div className={styles.select_all_section}>
          <label className={styles.select_all_label}>
            <input
              type="checkbox"
              checked={selectedCount === totalCount && totalCount > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className={styles.select_all_checkbox}
            />
            <span>전체 선택</span>
          </label>
        </div>

        <div className={styles.cart_actions}>
          <Button
            className={styles.action_button}
            onClick={handleRemoveSelected}
            disabled={selectedCount === 0}
          >
            <Trash />
            선택 삭제
          </Button>
          <Button
            className={styles.action_button}
            onClick={handleMoveToWishlist}
            disabled={selectedCount === 0}
          >
            <Heart />
            찜하기로 이동
          </Button>
          <Button className={styles.action_button} onClick={handleClearCart}>
            <Trash />
            장바구니 비우기
          </Button>
        </div>
      </div>

      {/* ===== 장바구니 아이템 목록 영역 ===== */}
      <div className={styles.cart_items}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cart_item}>
            {/* ===== 선택 체크박스 ===== */}
            <div className={styles.item_select}>
              <input
                type="checkbox"
                checked={item.isSelected}
                onChange={(e) => handleItemSelect(item.id, e.target.checked)}
                className={styles.item_checkbox}
              />
            </div>

            {/* ===== 상품 이미지 ===== */}
            <div className={styles.item_image}>
              <img src={item.productImage} alt={item.productName} />
              <div className={styles.item_badges}>
                {item.isOrganic && (
                  <Badge className={styles.badge_organic}>
                    <Leaf />
                    유기농
                  </Badge>
                )}
                {item.isLocal && (
                  <Badge className={styles.badge_local}>
                    <MapMarkerAlt />
                    지역특산
                  </Badge>
                )}
              </div>
            </div>

            {/* ===== 상품 정보 ===== */}
            <div className={styles.item_info}>
              <h3 className={styles.item_name}>{item.productName}</h3>
              <div className={styles.item_seller}>
                <span className={styles.seller_name}>{item.sellerName}</span>
                <span className={styles.item_location}>
                  {/* <FontAwesomeIcon icon={faMapMarkerAlt} /> */}
                  {item.location} ({formatDistance(item.distance)})
                </span>
              </div>
              <div className={styles.item_details}>
                <span className={styles.delivery_option}>
                  {/* <FontAwesomeIcon icon={faTruck} /> */}
                  {item.deliveryOption}
                </span>
                <span className={styles.min_order}>
                  최소주문: {formatPrice(item.minOrder)}원
                </span>
              </div>
            </div>

            {/* ===== 수량 조절 ===== */}
            <div className={styles.item_quantity}>
              <div className={styles.quantity_controls}>
                <button
                  className={styles.quantity_btn}
                  onClick={() => handleQuantityChange(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantity_value}>{item.quantity}</span>
                <button
                  className={styles.quantity_btn}
                  onClick={() => handleQuantityChange(item.id, 1)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>
              <span className={styles.stock_info}>
                재고: {item.stock}
                {item.unit}
              </span>
            </div>

            {/* ===== 가격 정보 ===== */}
            <div className={styles.item_price}>
              {item.originalPrice && (
                <span className={styles.original_price}>
                  {formatPrice(item.originalPrice)}원
                </span>
              )}
              <span className={styles.current_price}>
                {formatPrice(item.price)}원
              </span>
              <span className={styles.unit}>/{item.unit}</span>
              <div className={styles.item_total}>
                총 {formatPrice(item.price * item.quantity)}원
              </div>
            </div>

            {/* ===== 액션 버튼 ===== */}
            <div className={styles.item_actions}>
              <button
                className={`${styles.like_button} ${
                  item.isLiked ? styles.liked : ""
                }`}
                onClick={() => handleLikeToggle(item.id)}
                title={item.isLiked ? "찜하기 취소" : "찜하기"}
              >
                {/* <FontAwesomeIcon icon={faHeart} />   */}
              </button>
              <button className={styles.share_button} title="공유하기">
                {/* <FontAwesomeIcon icon={faShare} /> */}
              </button>
              <button
                className={styles.remove_button}
                onClick={() => handleRemoveItem(item.id)}
                title="삭제"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== 장바구니 요약 영역 ===== */}
      <div className={styles.cart_summary}>
        <div className={styles.summary_header}>
          <h3>주문 요약</h3>
        </div>

        <div className={styles.summary_content}>
          <div className={styles.summary_row}>
            <span>선택된 상품</span>
            <span>{cartSummary.totalItems}개</span>
          </div>

          {cartSummary.totalDiscount > 0 && (
            <div className={styles.summary_row}>
              <span>상품 할인</span>
              <span className={styles.discount}>
                -{formatPrice(cartSummary.totalDiscount)}원
              </span>
            </div>
          )}

          <div className={styles.summary_row}>
            <span>상품 금액</span>
            <span>{formatPrice(cartSummary.totalPrice)}원</span>
          </div>

          <div className={styles.summary_row}>
            <span>배송비</span>
            <span
              className={
                cartSummary.deliveryFee === 0 ? styles.free_delivery : ""
              }
            >
              {cartSummary.deliveryFee === 0
                ? "무료"
                : `${formatPrice(cartSummary.deliveryFee)}원`}
            </span>
          </div>

          {cartSummary.deliveryFee > 0 && (
            <div className={styles.delivery_notice}>
              {/* <FontAwesomeIcon icon={faExclamationTriangle} /> */}
              5만원 이상 주문 시 무료배송
            </div>
          )}

          <div className={styles.summary_total}>
            <span>총 결제금액</span>
            <span className={styles.final_total}>
              {formatPrice(cartSummary.finalTotal)}원
            </span>
          </div>
        </div>

        <div className={styles.summary_actions}>
          <Button
            className={styles.checkout_button}
            onClick={handleCheckout}
            disabled={selectedCount === 0}
          >
            <CreditCard />
            구매하기 ({selectedCount}개)
          </Button>

          <Button
            className={styles.continue_shopping_button}
            onClick={() => (window.location.href = "/market_list")}
          >
            {/* <FontAwesomeIcon icon={faShoppingCart} /> */}
            쇼핑 계속하기
          </Button>
        </div>
      </div>

      {/* ===== 추천 상품 영역 ===== */}
      <div className={styles.recommended_products}>
        <h3 className={styles.recommended_title}>
          {/* <FontAwesomeIcon icon={faGift} /> */}
          이런 상품은 어떠세요?
        </h3>
        <div className={styles.recommended_grid}>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={styles.recommended_item}>
              <img
                src="/images/fundcard_img.svg"
                alt={`추천 상품 ${i + 1}`}
                className={styles.recommended_image}
              />
              <div className={styles.recommended_info}>
                <h4 className={styles.recommended_name}>
                  신선한 {["감자", "양파", "고구마", "마늘"][i]}
                </h4>
                <span className={styles.recommended_price}>
                  {formatPrice(5000 + i * 2000)}원
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mycart;
