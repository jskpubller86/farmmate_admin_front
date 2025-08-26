import React, { useRef, useState } from "react";
import styles from "./layout.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Badge, Button } from "../components/ui";
import { useLeftLayout } from "../hooks";

/**
 * Header (검색, 자동완성 기능 구현)
 * @author 김종수
 */
const Header: React.FC = () => {
  const navi = useNavigate();
  const { leftState, setLeftState } = useLeftLayout();

  // 자동완성 출력 엘리먼트 참조
  const autoCompleteRef = useRef<HTMLDivElement>(null);
  // 검색 입력 엘리먼트 참조
  const searchInRef = useRef<HTMLInputElement>(null);
  // 단어 힌트 상태 생성
  const [wordHints, setWordHints] = useState<string[]>([]);
  // 검색어 상태
  const [searchValue, setSearchValue] = useState<string>("");
  // 메뉴 탭 상태
  const [activeTab, setActiveTab] = useState<"fund" | "lease">("fund");

  // 단어 힌트 출력 함수
  const showHint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchValue(value);

    if (value) {
      // setWordHints(getAutoComplete(value));
      autoCompleteRef.current?.classList.add(styles.active);
    } else {
      autoCompleteRef.current?.classList.remove(styles.active);
      setWordHints([]);
    }
  };

  // 검색어 지우기
  const clearSearch = () => {
    setSearchValue("");
    if (searchInRef.current) {
      searchInRef.current.value = "";
    }
    autoCompleteRef.current?.classList.remove(styles.active);
    setWordHints([]);
  };

  // 메뉴 탭 클릭 핸들러
  const handleTabClick = (tab: "fund" | "lease") => {
    setActiveTab(tab);
    // 해당 탭에 맞는 페이지로 이동
    if (tab === "fund") {
      navi("/market_list"); // 펀드는 마켓 목록으로
    } else {
      navi("/lease"); // 임대/임차는 임대 페이지로
    }
  };

  // 검색 submit 함수
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    autoCompleteRef.current?.classList.remove(styles.active);

    const searchTerm = searchInRef.current?.value;
    if (searchTerm && searchTerm.trim()) {
      // 검색어가 있으면 마켓 목록 페이지로 이동하고 검색어 전달
      navi(`/market_list?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // 검색어가 없으면 마켓 목록 페이지로 이동
      navi("/market_list");
    }
  };

  // 챗봇 버튼 클릭 핸들러
  const handleChatbotClick = () => {
    // TODO: 챗봇 모달을 띄우는 로직 구현
    console.log("챗봇 버튼 클릭됨");
  };

  // 렌더링
  return (
    <div className={styles.header_wrap}>
      <div className={styles.header_inner}>
        <header className={styles.header_box}>
          <h1 className={styles.logo_area}>
            <Link to={"/"}>
              <img
                src="/images/logo.png"
                className={styles.logo_img}
                alt="로고"
              />
            </Link>
          </h1>

          <div className={styles.srch_utils_area}>
            {/* 메뉴 탭 - 360px 이하에서만 표시 */}
            <div className={styles.menu_tabs}>
              <button
                className={`${styles.menu_tab} ${
                  activeTab === "fund" ? styles.menu_tab_active : ""
                }`}
                onClick={() => handleTabClick("fund")}
              >
                펀드
              </button>
              <button
                className={`${styles.menu_tab} ${
                  activeTab === "lease" ? styles.menu_tab_active : ""
                }`}
                onClick={() => handleTabClick("lease")}
              >
                임대/임차
              </button>
            </div>

            <div className={styles.srch_area}>
              <form className={styles.search_wrap} onSubmit={submit}>
                <input
                  type="text"
                  className={styles.search_input}
                  onChange={showHint}
                  onFocus={() =>
                    setLeftState &&
                    setLeftState({
                      isMob: window.innerWidth < 760 ? true : false,
                      isActive: true,
                    })
                  }
                  ref={searchInRef}
                  placeholder="검색"
                  value={searchValue}
                />
                {searchValue && (
                  <button
                    type="button"
                    className={styles.clear_button}
                    onClick={clearSearch}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
                <div
                  className={styles.auto_complete}
                  ref={autoCompleteRef}
                ></div>
                <button type="submit" className={styles.search_button}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
            </div>

            <div className={styles.utils_area}>
              {/* 로그인/회원가입 버튼 - 360px 이하에서만 표시 */}
              <div className={styles.auth_buttons}>
                <Button
                  color="point2"
                  className={styles.header_login_button}
                  onClick={() => navi("/login")}
                >
                  로그인
                </Button>
                <Button
                  color="point2"
                  className={styles.header_signup_button}
                  onClick={() => navi("/signup")}
                >
                  회원가입
                </Button>
              </div>

              <Link to={"/alert"}>
                <button className={styles.notice_btn}>
                  <img
                    src="/images/notice_icon.png"
                    className={styles.notice_icon_img}
                    alt="알림"
                  />
                </button>
              </Link>
              <Badge className={styles.badge_item}>110</Badge>

              {/* 챗봇 버튼 */}
              <button
                className={styles.chatbot_btn}
                onClick={handleChatbotClick}
                title="챗봇"
              >
                <img
                  src="/images/chatbot.svg"
                  className={styles.chatbot_icon_img}
                  alt="챗봇"
                />
              </button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
