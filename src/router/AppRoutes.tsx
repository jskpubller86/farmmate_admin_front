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

const AppRoutes: React.FC = () => {
  const routeList = [
    // { path: "/", element: <Homepage /> },
    // { path: "/main", element: <Homepage /> },
    // { path: "/login", element: <Login /> },
    // { path: "/findaccount", element: <FindAccount /> },
    // { path: "/signup", element: <Signup /> },
    // {
    //   path: "/mypage",
    //   element: (
    //     // <PermissionFilter>
    //     <Mypage />
    //     // </PermissionFilter>
    //   ),
    // },
    // {
    //   path: "/mypage_edit",
    //   element: (
    //     // <PermissionFilter>
    //     <MypageEdit />
    //     // </PermissionFilter>
    //   ),
    // },
    // {
    //   path: "/market_list",
    //   element: <MarketList />,
    // },
    // {
    //   path: "/market_detail/:productId",
    //   element: <MarketDetail />,
    // },
    // {
    //   path: "/mycart",
    //   element: <Mycart />,
    // },
    // {
    //   path: "/alert",
    //   element: <Alert />,
    // },
    // {
    //   path: "/market_write",
    //   element: <MarketWrite />,
    // },
    // {
    //   path: "/market_wish",
    //   element: <MarketWish />,
    // },
    // // Lease routes
    // { path: "/lease/contract", element: <LeaseContract /> },
    // { path: "/lease/applicants", element: <ApplicantList /> },
    // { path: "/lease", element: <LandLeaseList /> },
    // { path: "/lease/my-lease", element: <MyLease /> },
    // { path: "/lease/my-rent", element: <LandLeaseList /> },
    // { path: "/lease/wish", element: <LandLeaseList /> },
    // { path: "/lease/:id", element: <LeaseDetail /> },
    // { path: "/lease/my-lease/:id", element: <MyLeaseDetail /> },
    // { path: "/lease/:id/applicants", element: <ApplicantList /> },

    // // Land routes
    // { path: "/land", element: <LandLeaseList /> },
    // { path: "/land/my-rent", element: <LandLeaseList /> },
    // { path: "/land/wish", element: <LandLeaseList /> },
    // { path: "/land/registration", element: <LandRegistration /> },

    // { path: "/land/rent-add", element: <LandRentAdd /> },
    // { path: "/land/:id", element: <LandDetail /> },
    // { path: "/qanda", element: <QandA /> },

    // // Diagnosis routes
    // { path: "/diagnosis", element: <DiagnosisPage /> },

    // {
    //   path: "/form",
    //   element: (
    //     <PermissionFilter>
    //       <Form />
    //     </PermissionFilter>
    //   ),
    // },
    // { path: "/toast", element: <Toast /> },
    // { path: "/sample/tabs", element: <TabsSample /> },
    // { path: "/board", element: <BoardList /> },
    // { path: "/board/boardList", element: <BoardList /> },
    // { path: "/board/write", element: <BoardForm /> },
    // { path: "/board/:id", element: <BoardDetail /> },
    // // { path: "/sample/modal", element: <ModalSample /> },
    // // Checkout routes
    // { path: "/checkout", element: <Checkout /> },
    // { path: "/success", element: <CheckoutSuccess /> },
    // { path: "/fail", element: <CheckoutFail /> },
    
    // Admin routes - Left.tsx에 맞춰 재구성
    { path: "/", element: <Dashboard /> },
    
    // 👩‍🌾 유저 관리
    { path: "/admin/users", element: <Users /> },
    
    // 🌾 거래 관리 (부적절 거래 신고 처리)
    { path: "/admin/reports", element: <Reports /> },
    
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
