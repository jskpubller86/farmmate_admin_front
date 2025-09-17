import React from "react";
import { Route, Routes } from "react-router-dom";
// Admin pages - Left.tsx에 맞춰 필요한 것만 import
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Users from "../pages/admin/users/Users";
import Reports from "../pages/admin/reports/Reports";
import Statistics from "../pages/admin/statistics/Statistics";
import Products from "../pages/admin/products/Products";
import Rentals from "../pages/admin/rentals/Rentals";
import Disputes from "../pages/admin/disputes/Disputes";
import QnaSentiment from "../pages/admin/qna/QnaSentiment";
import AdminLogin from "../pages/admin/login/AdminLogin";

const AppRoutes: React.FC = () => {
  const routeList = [
    // Admin Login Route
    { path: "/admin/login", element: <AdminLogin /> },
    
    // Admin routes - Left.tsx에 맞춰 재구성
    { path: "/", element: <Dashboard /> },
    
    // 👩‍🌾 유저 관리
    { path: "/admin/users", element: <Users /> },
    
    // 🌾 거래 관리 (부적절 거래 신고 처리)
    { path: "/admin/reports", element: <Reports /> },
    
    // 💬 Q&A 관리
    { path: "/admin/qna", element: <QnaSentiment /> },
    
    // 🌾 농산물 거래 관리
    { path: "/admin/products", element: <Products /> },
    
    // 🏞️ 토지 임대/임차 관리
    { path: "/admin/rentals", element: <Rentals /> },
    
    // ⚖️ 분쟁 중재
    { path: "/admin/disputes", element: <Disputes /> },
    
    // 📈 통계 / 리포트
    { path: "/admin/statistics", element: <Statistics /> },

    // ❓ Q&A 감정 대시보드
    { path: "/admin/qna", element: <QnaSentiment /> },
  ];

  return (
    <Routes>
      {routeList.map((route, idx) => (
        <Route key={idx} {...route} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
