import React, { useRef, useState } from "react";
import styles from "./layout.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui";
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

  // 검색 submit 함수
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    autoCompleteRef.current?.classList.remove(styles.active);
    navi(`/search/${searchInRef.current?.value}`);
  };

  // 렌더링
  return (
    <div className={styles.header_wrap}>
      <div className={styles.header_inner}>
        <header className={styles.header_box}>
          <h1 className={styles.logo_area}>
            <Link to={"/home"}>
              <img
                src="/images/logo.png"
                className={styles.logo_img}
                alt="로고"
              />
            </Link>
          </h1>
          <div className={styles.srch_utils_area}>
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
              <Link to={"/"}>
                <button className={styles.notice_btn}>
                  <img
                    src="/images/notice_icon.png"
                    className={styles.notice_icon_img}
                    alt="알림"
                  />
                </button>
              </Link>
              <Badge className={styles.badge_item}>110</Badge>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
