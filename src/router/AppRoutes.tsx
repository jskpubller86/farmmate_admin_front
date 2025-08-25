import React from "react";
import { Route, Routes } from "react-router-dom";
import PermissionFilter from "../filters/PermissionFilter";
import BoardDetail from "../pages/board/BoardDetail";
import BoardForm from "../pages/board/BoardForm";
import BoardList from "../pages/board/BoardList";
import Login from "../pages/login/Login";
import Mypage from "../pages/mypage/Mypage";
import Myinfo from "../pages/mypage/myinfo/Myinfo";
import MyinfoEdit from "../pages/mypage/myinfo/MyinfoEdit";
import Form from "../pages/sample/Form";
import Toast from "../pages/sample/Toast";
import Signup from "../pages/signup/Signup";
// import TeamList from "../pages/team/TeamList";
// import TeamListWish from "../pages/team/TeamListWish";
import Main from "../layout/Main";
import Layout from "../layout/Layout";
import FundList from "../pages/fund/FundList";
import LeaseContract from "../pages/lease/LeaseContract";
import LandList from "../pages/land/LandList";
import FundDetail from "../pages/fund/FundDetail";
import FundWrite from "../pages/fund/FundWrite";

const AppRoutes: React.FC = () => {
  const routeList = [
    { path: "/login", element: <Login /> },
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
    { path: "/lease/contract", element: <LeaseContract /> },
    { path: "/land", element: <LandList /> },

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

    {
      path: "/myinfo",
      element: (
        <PermissionFilter>
          <Myinfo />
        </PermissionFilter>
      ),
    },
    {
      path: "/myinfoedit",
      element: (
        <PermissionFilter>
          <MyinfoEdit />
        </PermissionFilter>
      ),
    },
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
