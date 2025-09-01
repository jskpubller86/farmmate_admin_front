import { useSearchParams } from "react-router-dom";

export default function Fail() {
  const [sp] = useSearchParams();
  return (
    <div>
      <h2>❌ 결제 실패</h2>
      <p>code: {sp.get("code")}</p>
      <p>message: {sp.get("message")}</p>
    </div>
  );
}
