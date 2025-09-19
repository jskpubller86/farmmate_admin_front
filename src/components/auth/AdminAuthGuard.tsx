import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
import AdminLogin from "../../pages/admin/login/AdminLogin";
import { appConsole } from "../../utils";
import FaceLogin from "../../pages/admin/login/FaceLogin";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로그인 페이지가 아닌 경우에만 인증 체크
    if (location.pathname !== "/admin/login" && location.pathname !== "/admin/login/face") {
      if (!user) {
        // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        navigate("/admin/login", { replace: true });
      }
    }

    setIsLoading(false);
  }, [user, navigate, location.pathname]);

  // 로딩 중일 때는 아무것도 렌더링하지 않음
  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.2rem",
        color: "#6e9556",
        fontFamily: "NanumGothic, sans-serif"
      }}>
        로딩 중...
      </div>
    );
  }

  // 로그인 페이지인 경우 AdminLogin 컴포넌트 렌더링
  if (location.pathname === "/admin/login") {
    return <AdminLogin />;
  }

  if (location.pathname === "/admin/login/face") {
    return <FaceLogin />;
  }

  // 로그인된 사용자가 있는 경우에만 children 렌더링
  if (user) {
    return <>{children}</>;
  }

  // 그 외의 경우 (로그인되지 않은 상태에서 다른 페이지 접근)
  return null;
};

export default AdminAuthGuard;
