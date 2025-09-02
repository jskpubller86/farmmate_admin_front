import { useEffect, useRef, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useLocation, useNavigate } from "react-router-dom";

// CRA는 REACT_APP_ 접두사 필수
const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY as string;

type Amount = { currency: "KRW"; value: number };

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

  // ---- 상태
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [amount, setAmount] = useState<Amount>({ currency: "KRW", value: 0 });
  const [ready, setReady] = useState(false);

  // ---- 위젯/초기화 가드
  const tossRef = useRef<any>(null);
  const widgetsRef = useRef<any>(null);
  const initializedRef = useRef(false); // SDK 초기화 1회 보장
  const renderedRef = useRef(false); // UI 렌더 1회 보장

  // 1) 장바구니에서 넘어온 데이터 → 금액 계산
  useEffect(() => {
    const state = location.state as LocationState;
    const items = state?.items ?? [];
    setCartItems(items);
    const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    setAmount({ currency: "KRW", value: total });
  }, [location.state]);

  // 2) SDK 초기화 (정말 1번만)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    (async () => {
      if (!clientKey) {
        console.error("Missing REACT_APP_TOSS_CLIENT_KEY in .env");
        return;
      }
      try {
        const tp = await loadTossPayments(clientKey);
        tossRef.current = tp;
        widgetsRef.current = tp.widgets({ customerKey: ANONYMOUS });
      } catch (e) {
        console.error("Error loading TossPayments SDK:", e);
      }
    })();
  }, []);

  // 3) UI 렌더 (widgets 준비 + 금액 > 0 일 때 딱 1번)
  useEffect(() => {
    const widgets = widgetsRef.current;
    if (!widgets || renderedRef.current || amount.value <= 0) return;

    let isCancelled = false; // ★ 변수명 명확화(canceled → isCancelled)

    (async () => {
      try {
        // ★ 렌더 전에 실제 DOM 존재 확인 (InvalidSelector 방지)
        const hasPM = !!document.querySelector("#payment-method");
        const hasAg = !!document.querySelector("#agreement");
        if (!hasPM || !hasAg) {
          console.warn("Payment DOM not ready");
          return;
        }

        await widgets.setAmount(amount);
        console.count("renderPaymentMethods called"); // (디버그)

        await widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        });
        await widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "DEFAULT", // ★ AGREEMENT → DEFAULT
        });
        // if (!isCancelled) {
        //   renderedRef.current = true;
        //   setReady(true);
        // }
      } catch (e) {
        console.error("Error rendering widgets:", e);
      }
    })();

    return () => {
      isCancelled = true; // ★ cleanup 변수 스코프 고정
    };
    // ★ 의존성: 객체 전체가 아닌 value만 추적(불필요한 재실행 방지)
  }, [amount.value]);

  // 4) 금액만 바뀔 땐 setAmount만 (재렌더 금지)
  useEffect(() => {
    const widgets = widgetsRef.current;
    if (!widgets || !renderedRef.current) return;
    widgets
      .setAmount(amount)
      .catch((e: any) => console.error("setAmount failed:", e));
  }, [amount.value]);

  // 5) 결제 요청
  const handlePayment = async () => {
    const widgets = widgetsRef.current;
    if (!widgets || !ready) {
      alert("결제 준비 중입니다. 잠시만 기다려주세요.");
      return;
    }

    try {
      const orderId = "order_" + crypto.randomUUID();
      const first = cartItems[0];
      const orderName =
        cartItems.length > 1
          ? `${first.productName} 외 ${cartItems.length - 1}건`
          : first?.productName ?? "상품";

      await widgets.requestPayment({
        orderId,
        orderName,
        amount, // successUrl의 amount와 일치
        successUrl: `${window.location.origin}/checkout_success`,
        failUrl: `${window.location.origin}/checkout_fail`,
        customerEmail: "customer@example.com", // TODO: 실제로 치환
        customerName: "고객", // TODO: 실제로 치환
      });
    } catch (e) {
      console.error("Payment request failed:", e);
      alert("결제 요청 중 오류가 발생했습니다.");
    }
  };

  // 6) 쿠폰 적용 예시 (setAmount만 갱신)
  const handleCouponApply = async (discountAmount: number) => {
    const newValue = Math.max(0, amount.value - discountAmount);
    setAmount({ currency: "KRW", value: newValue });
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>장바구니가 비어있습니다</h2>
        <button onClick={() => navigate("/cart")}>장바구니로 돌아가기</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>결제하기</h2>

      {/* 주문 요약 */}
      <div
        style={{
          marginBottom: 30,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h3>주문 상품</h3>
        {cartItems.map((it) => (
          <div
            key={it.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <span>
              {it.productName} x {it.quantity}
            </span>
            <span>{(it.price * it.quantity).toLocaleString()}원</span>
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

      {/* 쿠폰 예시 */}
      <div
        style={{
          margin: "20px 0",
          padding: 15,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <label>
          <input
            type="checkbox"
            disabled={!ready}
            onChange={(e) => handleCouponApply(e.target.checked ? 5000 : 0)}
          />{" "}
          5,000원 쿠폰 적용
        </label>
      </div>

      {/* 결제 버튼 */}
      <button
        onClick={handlePayment}
        disabled={!ready}
        style={{
          width: "100%",
          padding: 15,
          backgroundColor: ready ? "#007bff" : "#ccc",
          color: "#fff",
          border: 0,
          borderRadius: 8,
          fontSize: 16,
          cursor: ready ? "pointer" : "not-allowed",
          marginTop: 20,
        }}
      >
        {ready ? "결제하기" : "결제 준비 중…"}
      </button>
    </div>
  );
}
