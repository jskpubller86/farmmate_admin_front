import React from "react";
import styles from "./layout.module.css";
import { Avatar, Button } from "../components/ui";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";

/**
 * MobileDock (독)
 * @author 김종수
 */
const MobileDock: React.FC = () => {
  const navi = useNavigate();
  const { user } = useAuth();

  return (
    <div className={styles.dock_layout}>
      {user && (
        <>
          <Button type="button" size="xs" onClick={() => navi("/alert")}>
            알림
          </Button>{" "}
          <Link to={"/mypage"}>
            {" "}
            <Avatar />{" "}
          </Link>
        </>
      )}
      {!user && (
        <>
          <Button type="button" size="xs" onClick={() => navi("/login")}>
            로그인
          </Button>{" "}
          <Button type="button" size="xs" onClick={() => navi("/signup")}>
            회원가입
          </Button>
        </>
      )}
      {
        <>
          <Button type="button" size="xs" onClick={() => navi("/alert")}>
            공지사항
          </Button>{" "}
          <Link to={user ? "/mypage" : "/login"}>
            {" "}
            <Avatar />{" "}
          </Link>
        </>
      }
    </div>
  );
};

export default MobileDock;
