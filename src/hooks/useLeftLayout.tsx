import { useContext, useEffect, useRef } from "react";
import LeftLayoutContext from "../contexts/left_layout/LeftLayoutContext";

const useLeftLayout = () => {
  const context = useContext(LeftLayoutContext);
  if (!context) {
    throw new Error("useLeftLayout은 LeftLayoutProvider 내부에서 사용해야 합니다.");
  }
  return context;
};

export default useLeftLayout;