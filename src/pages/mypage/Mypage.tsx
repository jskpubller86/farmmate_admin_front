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
}

const INTEREST_MAP: Record<string, string> = {
  "1001": "축구",
  "1002": "농구",
  "1003": "배구",
  "1004": "골프",
  "1005": "등산",
  "1006": "수영",
  "1007": "러닝",
  "1008": "헬스",
  "1009": "야구",
  "1010": "기타",
};

const Mypage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [interestCodes, setInterestCodes] = useState<string[]>([]);
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

    const fetchInterests = async () => {
      try {
        const res = await api.get("/user/readMyInterests", {});
        if (res.data.code === "0000") {
          setInterestCodes(res.data.data);
        }
      } catch (err) {
        console.error("관심사 조회 실패", err);
      }
    };

    fetchProfile();
    fetchInterests();
  }, []);

  const formatBirthday = (birthday?: string): string => {
    if (!birthday || birthday.length < 8) return "";
    const year = birthday.substring(0, 4);
    const month = birthday.substring(4, 6);
    const day = birthday.substring(6, 8);
    return `${year}/${month}/${day}`;
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
        <h1 className={styles.page_title}>내정보</h1>

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
        <div className={styles.info_section}>
          <div className={styles.info_item}>
            <span className={styles.info_label}>이름</span>
            <span className={styles.info_value}>
              {profile?.userName || "테스형"}
            </span>
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>생년월일</span>
            <span className={styles.info_value}>
              {formatBirthday(profile?.birthday) || "1999/01/01"}
            </span>
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>성별</span>
            <span className={styles.info_value}>
              {profile?.genderCd ? getGenderLabel(profile.genderCd) : "여"}
            </span>
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>주소</span>
            <span className={styles.info_value}>
              {profile?.addr} {profile?.detailAddr || "서울시 강남구"}
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
