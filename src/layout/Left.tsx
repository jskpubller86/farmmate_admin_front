import React from "react";
import styles from "./layout.module.css";
import { Link } from "react-router-dom";
import { useLeftLayout } from "../hooks";

/**
 * Left (검색, 자동완성 기능 구현)
 * @author 김종수
 */

const Left: React.FC = () => {
  const { leftState, setLeftState } = useLeftLayout();

  const handleDeactive = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setLeftState({
        isActive: false,
        isMob: window.innerWidth < 760 ? true : false,
      });
    }
  };

  // 렌더링
  return (
    <div
      className={`${styles.left_layout} ${
        leftState?.isMob && leftState?.isActive ? styles.is_active : ""
      }`}
      onClick={handleDeactive}
    >
      <div className={styles.left_layout_inner}>
        {/* 사용자 정보  */}
        {/* {!user && (
          <div className={styles.left_layout_button_box}>
            <Button
              type="button"
              size="xs"
              onClick={() => navi("/login")}
              className={styles.header_login_button}
            >
              로그인
            </Button>{" "}
            <Button
              type="button"
              size="xs"
              onClick={() => navi("/signup")}
              className={styles.header_signup_button}
            >
              회원가입
            </Button>
          </div>
        )} */}
        {/* {user && (
          <Link to={"/mypage"} className={styles.left_user_box}>
            <Avatar
              size="lg"
              // src={profile?.imageBasePath || "/images/img_profile.svg"}
              src={"/images/tw01.jpg"}
            />
            <div className={styles.left_user_name}>
              <b>테스형</b>님
              <br />
              환영합니다.
            </div>
          </Link>
        )} */}

        {/* 날씨 정보 */}
        {/* <div className={styles.left_weather_box}>
          <div className={styles.left_weather_location}>
            서울시 강남구, <br />
            강남대로
          </div>
          <div className={styles.left_weather_icon}>
            <FontAwesomeIcon icon={faCloud} />
          </div>
          <div>
            <b className={styles.weather_time_item}>19:00</b>
          </div>
        </div> */}

        <div className={styles.left_quick_card}>
          {/* <Link to={"/"} className={styles.left_quick_row}>
            <span>📊 대시보드</span>
            <img
              src="/images/notice_icon.png"
              className={styles.left_quick_icon}
              alt="대시보드"
            />
          </Link> */}
          {/* <Link to={"/admin/users"} className={styles.left_quick_row}>
            <span>👩‍🌾 유저관리</span>
            <img
              src="/images/fund_icon.svg"
              className={styles.left_quick_icon}
              alt="유저관리"
            />
          </Link> */}
          {/* <Link to={"/admin/products"} className={styles.left_quick_row}>
            <span>🌾 거래관리</span>
            <img
              src="/images/Menu_icons.svg"
              className={styles.left_quick_icon}
              alt="거래관리"
            />
          </Link> */}
        </div>

        {/* 네비게이션 */}
        <div className={styles.left_navigation_wrap}>
          {/* 📊 대시보드 */}
          <div className={styles.left_navigation_box}>
            <Link to="/" className={styles.left_navigation_item}>
              <span>대시보드</span>
            </Link>
            {/* {dashboardDropdownOpen && (
              <div className={styles.mypage_dropdown}>
                <Link to="/" className={styles.mypage_dropdown_item}>
                  <span>거래 현황 요약</span>
                </Link>
                <Link to="/" className={styles.mypage_dropdown_item}>
                  <span>신고/분쟁 알림</span>
                </Link>
                <Link to="/" className={styles.mypage_dropdown_item}>
                  <span>신규 가입자/탈퇴 현황</span>
                </Link>
              </div>
            )} */}
          </div>

          {/* 👩‍🌾 유저 관리 */}
          <div className={styles.left_navigation_box}>
            <Link to="/admin/users" className={styles.left_navigation_item}>
              <span>유저 관리</span>
            </Link>
            {/* {userManagementDropdownOpen && (
              <div className={styles.mypage_dropdown}>
                <Link to="/admin/users" className={styles.mypage_dropdown_item}>
                  <span>생산자/판매자 관리</span>
                </Link>
                <Link to="/admin/users" className={styles.mypage_dropdown_item}>
                  <span>임대인/임차인 관리</span>
                </Link>
                <Link to="/admin/users" className={styles.mypage_dropdown_item}>
                  <span>계정 인증 관리</span>
                </Link>
                <Link to="/admin/users" className={styles.mypage_dropdown_item}>
                  <span>제재/정지 처리</span>
                </Link>
              </div>
            )} */}
          </div>

          {/* 🌾 거래 관리 */}
          <div className={styles.left_navigation_box}>
            <Link to="/admin/reports" className={styles.left_navigation_item}>
              <span>신고 처리</span>
            </Link>
            {/* {transactionDropdownOpen && (
              <div className={styles.mypage_dropdown}>
                {/* <Link to="/admin/products" className={styles.mypage_dropdown_item}>
                  <span>농산물 상품 검수</span>
                </Link>
                <Link to="/admin/rentals" className={styles.mypage_dropdown_item}>
                  <span>토지 임대/임차 매물 검수</span>
                </Link> */}
                {/* <Link to="/admin/reports" className={styles.mypage_dropdown_item}>
                  <span>부적절 거래 신고 처리</span>
                </Link>
                <Link to="/admin/reports" className={styles.mypage_dropdown_item}>
                  <span>분쟁 중재/강제 처리</span>
                </Link>
              </div> */}
            {/* )}  */}
          </div>

          {/* 📢 컨텐츠 관리 */}
          {/* <div className={styles.left_navigation_box}>
            <div
              className={styles.left_navigation_item}
              onClick={() => setContentDropdownOpen(!contentDropdownOpen)}
            >
              <span>📢 컨텐츠 관리</span>
              <img
                src="/images/triangle_icon.svg"
                className={`${styles.left_triangle_icon_img} ${
                  contentDropdownOpen ? styles.rotate_down : ""
                }`}
                alt="화살표"
              />
            </div>
            {contentDropdownOpen && (
              <div className={styles.mypage_dropdown}>
                <Link to="/admin/content" className={styles.mypage_dropdown_item}>
                  <span>리뷰/후기 모니터링</span>
                </Link>
                <Link to="/admin/content" className={styles.mypage_dropdown_item}>
                  <span>게시글/댓글 관리</span>
                </Link>
                <Link to="/admin/content" className={styles.mypage_dropdown_item}>
                  <span>광고/프로모션 관리</span>
                </Link>
              </div>
            )}
          </div> */}

          {/* 💰 정산/수수료 관리 */}
          {/* <div className={styles.left_navigation_box}>
            <div
              className={styles.left_navigation_item}
              onClick={() => setSettlementDropdownOpen(!settlementDropdownOpen)}
            >
              <span>💰 정산/수수료 관리</span>
              <img
                src="/images/triangle_icon.svg"
                className={`${styles.left_triangle_icon_img} ${
                  settlementDropdownOpen ? styles.rotate_down : ""
                }`}
                alt="화살표"
              />
            </div>
            {settlementDropdownOpen && (
              <div className={styles.mypage_dropdown}>
                <Link to="/admin/settlement" className={styles.mypage_dropdown_item}>
                  <span>거래 수수료 확인</span>
                </Link>
                <Link to="/admin/settlement" className={styles.mypage_dropdown_item}>
                  <span>정산 내역 검토</span>
                </Link>
                <Link to="/admin/settlement" className={styles.mypage_dropdown_item}>
                  <span>환불/취소 관련 중재</span>
                </Link>
              </div>
            )}
          </div> */}

          {/* 📈 통계/리포트 */}
          <div className={styles.left_navigation_box}>
            <Link to="/admin/statistics" className={styles.left_navigation_item}>
              <span>통계/리포트</span>
            </Link>
            {/* {statisticsDropdownOpen && (
              <div className={styles.mypage_dropdown}>
                <Link to="/admin/statistics" className={styles.mypage_dropdown_item}>
                  <span>유저 통계</span>
                </Link>
                <Link to="/admin/statistics" className={styles.mypage_dropdown_item}>
                  <span>거래 통계</span>
                </Link>
                {/* <Link to="/admin/statistics" className={styles.mypage_dropdown_item}>
                  <span>인기 상품/토지</span>
                </Link> */}
                {/* <Link to="/admin/statistics" className={styles.mypage_dropdown_item}>
                  <span>이상 거래 감지</span>
                </Link>
              </div> */}
           {/* )} */}
          </div>

          {/* ⚙️ 시스템/운영 */}
          {/* <div className={styles.left_navigation_box}>
            <div
              className={styles.left_navigation_item}
              onClick={() => setSystemDropdownOpen(!systemDropdownOpen)}
            >
              <span>⚙️ 시스템/운영</span>
              <img
                src="/images/triangle_icon.svg"
                className={`${styles.left_triangle_icon_img} ${
                  systemDropdownOpen ? styles.rotate_down : ""
                }`}
                alt="화살표"
              />
            </div>
            {systemDropdownOpen && (
              <div className={styles.mypage_dropdown}>
                <Link to="/admin/system" className={styles.mypage_dropdown_item}>
                  <span>관리자 계정/권한 관리</span>
                </Link>
                <Link to="/admin/system" className={styles.mypage_dropdown_item}>
                  <span>정책/약관 관리</span>
                </Link>
                <Link to="/admin/system" className={styles.mypage_dropdown_item}>
                  <span>공지사항 관리</span>
                </Link>
                <Link to="/admin/system" className={styles.mypage_dropdown_item}>
                  <span>로그/보안 기록</span>
                </Link>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Left;
