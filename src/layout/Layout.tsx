import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import styles from "./layout.module.css";
import ChatModal from "../madals/chat/ChatModal";
import Left from "./Left";
import MobileDock from "./MobileDock";
import { useAuth, useGeolocation } from "../hooks";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout
 * @author 김종수
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { geolocation } = useGeolocation();
  const { login } = useAuth();

  useEffect(() => {
    if (geolocation) {
      const url = `https://apihub.kma.go.kr/api/typ01/cgi-bin/url/nph-dfs_xy_lonlat?lon=${geolocation.longitude}&lat=${geolocation.latitude}&help=0&authKey=VXtnCIgHSeq7ZwiIBynqYA`;
      // axios.get(url)
      //       .then((resp)=>{
      //         console.log(resp);
      //       });
    }
  }, [geolocation]);

  // 로그인 하지 않았으면 Left를 숨김
  // const hasLeft = !!login;

  return (
    <>
      <Header />
      <Left />
      <Main>{children}</Main>
      <Footer />
      <MobileDock />
    </>
  );
};

export default Layout;
