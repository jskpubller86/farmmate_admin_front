import React from "react";
import { Route, Routes } from "react-router-dom";
import PermissionFilter from "../filters/PermissionFilter";
import BoardDetail from "../pages/community/board/BoardDetail";
import BoardForm from "../pages/community/board/BoardForm";
import BoardList from "../pages/community/board/BoardList";
import Login from "../pages/login/Login";
import FindAccount from "../pages/login/FindAccount";
import Mypage from "../pages/mypage/Mypage";
import Form from "../pages/sample/Form";
import Toast from "../pages/sample/Toast";
import Signup from "../pages/signup/Signup";
import Main from "../layout/Main";
import Layout from "../layout/Layout";
import FundList from "../pages/fund/FundList";
import Myfund from "../pages/fund/Myfund";
import FundRank from "../pages/fund/FundRank";
import FundGuide from "../pages/guide/FundGuide";
import LandGuide from "../pages/guide/LandGuide";
import Alert from "../pages/alert/Alert";
import LeaseContract from "../pages/lease/LeaseContract";
import LeaseDetail from "../pages/lease/LeaseDetail";
import MyLeaseDetail from "../pages/lease/MyLeaseDetail";
import ApplicantList from "../pages/lease/ApplicantList";
import LandLeaseList from "../pages/land/LandLeaseList";
import LandRegistration from "../pages/land/LandRegistration";
import LandRentAdd from "../pages/land/LandRentAdd";
import LandDetail from "../pages/land/LandDetail";
import FundDetail from "../pages/fund/FundDetail";
import FundWrite from "../pages/fund/FundWrite";
import MypageEdit from "../pages/mypage/MypageEdit";
// import ModalSample from "../pages/sample/ModalSample";
import QandA from "../pages/community/qanda/QandA";
import MarketList from "../pages/market/MarketList";
import MarketDetail from "../pages/market/MarketDetail";
import Mycart from "../pages/cart/Mycart";

const AppRoutes: React.FC = () => {
  const routeList = [
    { path: "/login", element: <Login /> },
    { path: "/findaccount", element: <FindAccount /> },
    { path: "/signup", element: <Signup /> },
    {
      path: "/mypage",
      element: (
        // <PermissionFilter>
        <Mypage />
        // </PermissionFilter>
      ),
    },
    {
      path: "/mypage_edit",
      element: (
        // <PermissionFilter>
        <MypageEdit />
        // </PermissionFilter>
      ),
    },
    {
      path: "/market_list",
      element: <MarketList />,
    },
    {
      path: "/market_detail/:productId",
      element: <MarketDetail />,
    },
    {
      path: "/mycart",
      element: <Mycart />,
    },
    {
      path: "/myfund",
      element: <Myfund />,
    },
    {
      path: "/fund_rank",
      element: <FundRank />,
    },
    {
      path: "/farming_guide",
      element: <FundGuide />,
    },
    {
      path: "/land_guide",
      element: <LandGuide />,
    },
    {
      path: "/alert",
      element: <Alert />,
    },
    {
      path: "/fund_list/:type",
      element: <FundList />,
    },
    {
      path: "/fund_detail/:fundId",
      element: <FundDetail />,
    },
    {
      path: "/fund_write",
      element: <FundWrite />,
    },
    // Lease routes
    { path: "/lease/contract", element: <LeaseContract /> },
    { path: "/lease/applicants", element: <ApplicantList /> },
    {
      path: "/lease",
      element: (
        <LandLeaseList
          mode="lease"
          enableInfiniteScroll={true}
          showRegistrationButton={true}
        />
      ),
    },
    {
      path: "/lease/my-lease",
      element: (
        <LandLeaseList
          mode="lease"
          enableInfiniteScroll={true}
          showRegistrationButton={true}
        />
      ),
    },
    {
      path: "/lease/my-rent",
      element: (
        <LandLeaseList
          mode="lease"
          enableInfiniteScroll={true}
          showRegistrationButton={true}
        />
      ),
    },
    {
      path: "/lease/wish",
      element: (
        <LandLeaseList
          mode="lease"
          enableInfiniteScroll={true}
          showRegistrationButton={true}
        />
      ),
    },
    { path: "/lease/:id", element: <LeaseDetail /> },
    { path: "/lease/my-lease/:id", element: <MyLeaseDetail /> },
    { path: "/lease/:id/applicants", element: <ApplicantList /> },

    // Land routes
    {
      path: "/land",
      element: (
        <LandLeaseList
          mode="land"
          enableInfiniteScroll={false}
          showRegistrationButton={true}
        />
      ),
    },
    {
      path: "/land/my-rent",
      element: (
        <LandLeaseList
          mode="land"
          enableInfiniteScroll={false}
          showRegistrationButton={true}
        />
      ),
    },
    {
      path: "/land/wish",
      element: (
        <LandLeaseList
          mode="land"
          enableInfiniteScroll={false}
          showRegistrationButton={true}
        />
      ),
    },
    { path: "/land/registration", element: <LandRegistration /> },

    { path: "/land/rent-add", element: <LandRentAdd /> },
    { path: "/land/:id", element: <LandDetail /> },
    { path: "/qanda", element: <QandA /> },

    {
      path: "/form",
      element: (
        <PermissionFilter>
          <Form />
        </PermissionFilter>
      ),
    },
    { path: "/", element: <Main /> },
    { path: "/toast", element: <Toast /> },
    { path: "/board/boardList", element: <BoardList /> },
    { path: "/board/detail/:id", element: <BoardDetail /> },
    { path: "/board/add", element: <BoardForm /> },
    // { path: "/sample/modal", element: <ModalSample /> },
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
