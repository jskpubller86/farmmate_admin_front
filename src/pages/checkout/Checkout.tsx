import { useEffect, useRef, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useLocation, useNavigate } from "react-router-dom";

// 환경변수에서 클라이언트 키 가져오기
const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY as string;
const customerKey = ANONYMOUS; // 로그인 시스템이 없다면 ANONYMOUS 사용

interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
}

interface LocationState {
  items: CartItem[];
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState({ currency: "KRW", value: 0 });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 장바구니에서 전달받은 상품 정보 처리
  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.items) {
      setCartItems(state.items);
      const totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setAmount({ currency: "KRW", value: totalAmount });
    }
  }, [location.state]);

  // 토스페이먼츠 SDK 초기화
  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 비회원 결제 위젯 생성
        const widgets = tossPayments.widgets({
          customerKey: ANONYMOUS,
        });

        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }

    fetchPaymentWidgets();
  }, []);

  // 결제 위젯 렌더링
  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null || amount.value === 0) {
        return;
      }

      try {
        // 결제 금액 설정
        await widgets.setAmount(amount);

        // 결제 UI와 약관 UI 렌더링
        await Promise.all([
          widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          }),
          widgets.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
          }),
        ]);

        setReady(true);
      } catch (error) {
        console.error("Error rendering widgets:", error);
      }
    }

    renderPaymentWidgets();
  }, [widgets, amount]);

  // 결제 요청
  const handlePayment = async () => {
    if (!widgets || !ready) {
      alert("결제 준비 중입니다. 잠시만 기다려주세요.");
      return;
    }

    try {
      const orderId = "order_" + crypto.randomUUID();
      const orderName =
        cartItems.length > 0
          ? `${cartItems[0].productName}${
              cartItems.length > 1 ? ` 외 ${cartItems.length - 1}건` : ""
            }`
          : "상품";

      await widgets.requestPayment({
        orderId,
        orderName,
        successUrl: `${window.location.origin}/checkout_success`,
        failUrl: `${window.location.origin}/checkout_fail`,
        customerEmail: "customer@example.com", // TODO: 실제 고객 이메일로 변경
        customerName: "고객", // TODO: 실제 고객명으로 변경
      });
    } catch (error) {
      console.error("Payment request failed:", error);
      alert("결제 요청 중 오류가 발생했습니다.");
    }
  };

  // 쿠폰 적용 (예시)
  const handleCouponApply = async (discountAmount: number) => {
    if (!widgets) return;

    const newAmount = Math.max(0, amount.value - discountAmount);
    await widgets.setAmount({
      currency: amount.currency,
      value: newAmount,
    });
    setAmount((prev) => ({ ...prev, value: newAmount }));
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>장바구니가 비어있습니다</h2>
        <button onClick={() => navigate("/cart")}>장바구니로 돌아가기</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>결제하기</h2>

      {/* 주문 상품 요약 */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>주문 상품</h3>
        {cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>
              {item.productName} x {item.quantity}
            </span>
            <span>{item.price * item.quantity}원</span>
          </div>
        ))}
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <span>총 결제금액</span>
          <span>{amount.value.toLocaleString()}원</span>
        </div>
      </div>

      {/* 결제 위젯 */}
      <div id="payment-method" />
      <div id="agreement" />

      {/* 쿠폰 적용 (예시) */}
      <div
        style={{
          margin: "20px 0",
          padding: "15px",
          border: "1px solid #eee",
          borderRadius: "8px",
        }}
      >
        <label>
          <input
            type="checkbox"
            disabled={!ready}
            onChange={(e) => {
              if (e.target.checked) {
                handleCouponApply(5000);
              } else {
                handleCouponApply(0);
              }
            }}
          />
          5,000원 쿠폰 적용
        </label>
      </div>

      {/* 결제 버튼 */}
      <button
        onClick={handlePayment}
        disabled={!ready}
        style={{
          width: "100%",
          padding: "15px",
          backgroundColor: ready ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: ready ? "pointer" : "not-allowed",
          marginTop: "20px",
        }}
      >
        {ready ? "결제하기" : "결제 준비 중..."}
      </button>
    </div>
  );
}
