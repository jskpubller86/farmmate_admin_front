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
import Alert from "../pages/alert/Alert";
import LeaseContract from "../pages/lease/LeaseContract";
import LeaseDetail from "../pages/lease/LeaseDetail";
import MyLeaseDetail from "../pages/lease/MyLeaseDetail";
import ApplicantList from "../pages/lease/ApplicantList";
import LandLeaseList from "../pages/land/LandLeaseList";
import LandRegistration from "../pages/land/LandRegistration";
import LandRentAdd from "../pages/land/LandRentAdd";
import LandDetail from "../pages/land/LandDetail";
import MypageEdit from "../pages/mypage/MypageEdit";
import QandA from "../pages/community/qanda/QandA";
import MarketList from "../pages/market/MarketList";
import MarketDetail from "../pages/market/MarketDetail";
import MarketWrite from "../pages/market/MarketWrite";
import Mycart from "../pages/cart/Mycart";
import ModalSample from "../pages/sample/ModalSample";
import Homepage from "../pages/main/homepage";

const AppRoutes: React.FC = () => {
  const routeList = [
    { path: "/", element: <Homepage /> },
    { path: "/main", element: <Homepage /> },
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
      path: "/alert",
      element: <Alert />,
    },
    {
      path: "/market_write",
      element: <MarketWrite />,
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
    { path: "/toast", element: <Toast /> },
    { path: "/board", element: <BoardList /> },
    { path: "/board/boardList", element: <BoardList /> },
    { path: "/board/write", element: <BoardForm /> },
    { path: "/board/:id", element: <BoardDetail /> },
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
