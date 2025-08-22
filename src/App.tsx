import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

import styles from  "./app.module.css";

import ModalDispatchProvider from "./contexts/modal/ModalDispatchProvider";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./router/AppRoutes";
import { LeftLayoutContextProvider } from "./contexts/left_layout/LeftLayoutContextProvider";
import AuthDispatchContextProvider from "./contexts/auth/AuthDispatchContextProvider";

/**
 * App
 * @author 김종수
 */
function App() {
  return (
    <>  <Router>
          <AuthDispatchContextProvider>
            <ToastContainer className={styles.toast_container} /> {/* 토스트를 띄우기 위한 컨테이너*/}
            {/* login, logout을 위한 컨텍스트 */}
            <ModalDispatchProvider>
              <LeftLayoutContextProvider>
                {/* 모달을 컨트롤 하기 위한 프로바이더 */}
                  <Layout>
                    <AppRoutes />
                  </Layout>
              </LeftLayoutContextProvider>
            </ModalDispatchProvider>
          </AuthDispatchContextProvider>
        </Router>
    </>
  );
}

export default App;
