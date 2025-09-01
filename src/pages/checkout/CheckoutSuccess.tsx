import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Success() {
  const [sp] = useSearchParams();
  const paymentKey = sp.get("paymentKey");
  const orderId = sp.get("orderId");
  const amount = Number(sp.get("amount"));

  useEffect(() => {
    // 1) 클라이언트 금액 변조 방지: 원주문 금액과 동일한지 확인
    // 2) 서버로 승인(Authorize) 요청 전송 (예: /api/payments/confirm)
    // fetch("/api/payments/confirm", { method: "POST", ... })
  }, [paymentKey, orderId, amount]);

  return (
    <div>
      <h2>✅ 결제 요청 성공</h2>
      <p>paymentKey: {paymentKey}</p>
      <p>orderId: {orderId}</p>
      <p>amount: {amount}</p>
      <p>이제 서버에서 결제를 승인(확정)해야 실제 결제가 완료됩니다.</p>
    </div>
  );
}
