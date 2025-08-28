import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Button } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth, useAlert, useAPI } from "../../hooks";
import { rememberMeHelper } from "../../utils";

interface UserProfile {
  userName: string;
  birthday: string;
  addr: string;
  detailAddr?: string;
  cellNo: string;
  genderCd: string;
  imageBasePath?: string;
  email: string;
  asset: number;
}

const Mypage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { alertError, alertSuccess } = useAlert();
  const api = useAPI();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me", {});
        if (res.data.code === "0000") {
          setProfile(res.data.data);
        }
      } catch (err) {
        console.error("프로필 조회 실패", err);
      }
    };

    fetchProfile();
  }, []);

  // 생년월일 형식 변환 (YYYYMMDD -> YYYY / MM / DD)
  const formatBirthday = (birthday?: string): string => {
    if (!birthday || birthday.length < 8) return "";
    const year = birthday.substring(0, 4);
    const month = birthday.substring(4, 6);
    const day = birthday.substring(6, 8);
    return `${year} / ${month} / ${day}`;
  };

  // 생년월일로부터 나이 계산
  const calculateAge = (birthday?: string): string => {
    if (!birthday || birthday.length < 8) return "";

    const year = parseInt(birthday.substring(0, 4));
    const month = parseInt(birthday.substring(4, 6));
    const day = parseInt(birthday.substring(6, 8));

    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // month는 0부터 시작하므로 -1

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // 생일이 지나지 않았으면 나이에서 1을 빼기
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${age}세`;
  };

  // 자산을 원화 형식으로 변환 (쉼표 구분)
  const formatAsset = (asset?: number): string => {
    if (!asset || asset <= 0) return "0P";

    // 숫자를 문자열로 변환하고 쉼표 추가
    const formattedAsset = asset.toLocaleString("ko-KR");
    return `${formattedAsset}원`;
  };

  const getGenderLabel = (code: string): string => {
    return code === "4001" ? "남" : "여";
  };

  const handleLogout = async () => {
    try {
      const resp = await api.post("/auth/signOut");
      if (resp.data.code === "0000") {
        rememberMeHelper.removeRemember();
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.mypage_main_box}>
        <h1 className={styles.page_title}>내 정보</h1>

        {/* 프로필 섹션 */}
        <div className={styles.profile_section}>
          <div className={styles.profile_photo_container}>
            <Avatar
              size="xxl"
              src={profile?.imageBasePath || "/images/img_profile.svg"}
              className={styles.profile_photo}
            />
          </div>
          <Link to="/mypage_edit" className={styles.edit_link}>
            수정
          </Link>
        </div>

        {/* 개인 정보 섹션 */}
        {/* 이름 */}
        <div className={styles.info_section}>
          <div className={styles.info_item}>
            <span className={styles.info_label}>이름</span>
            <span className={styles.info_value}>
              {profile?.userName || "테스형"}
            </span>
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>전화번호</span>
            <span className={styles.info_value}>
              {profile?.cellNo || "010-1234-5678"}
            </span>
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>이메일</span>
            <span className={styles.info_value}>
              {profile?.email || "Tessbrother@gmail.com"}
            </span>
          </div>

          {/* 생년월일 */}
          <div className={styles.info_item}>
            <span className={styles.info_label}>생년월일</span>
            <span className={styles.info_value}>
              {formatBirthday(profile?.birthday) || "1999 / 01 / 01"}
            </span>
          </div>

          {/* 나이 */}
          <div className={styles.info_item}>
            <span className={styles.info_label}>나이</span>
            <span className={styles.info_value}>
              {calculateAge(profile?.birthday) || "25세"}
            </span>
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>성별</span>
            <span className={styles.info_value}>
              {profile?.genderCd ? getGenderLabel(profile.genderCd) : "여"}
            </span>
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>팜페이</span>
            <span className={styles.info_value}>
              {formatAsset(profile?.asset) || "100,000,000원"}
            </span>
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>주소</span>
            <span className={styles.info_value}>
              {profile?.addr ? (
                <>
                  {profile.addr}
                  {profile.detailAddr && (
                    <span className={styles.detail_addr}>
                      {" "}
                      {profile.detailAddr}
                    </span>
                  )}
                </>
              ) : (
                "서울시 강남구 테헤란로 123 456동 789호"
              )}
            </span>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <div className={styles.logout_section}>
          <Button
            type="button"
            size="sm"
            color="danger"
            onClick={handleLogout}
            className={styles.logout_button}
          >
            로그아웃
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Mypage;
