import React, { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/auth/AuthContext";
import AuthDispatchContext from "../contexts/auth/AuthDispatchContext";

// Context를 쉽게 꺼내 쓰는 Hook
const useAuth = () => {
  const user = useContext(AuthContext);
  const {login, logout} = useContext(AuthDispatchContext);
  return {user, login, logout};
};

export default useAuth;
