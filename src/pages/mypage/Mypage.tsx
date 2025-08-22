import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Button } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faPencilAlt,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth, useAlert, useAPI } from "../../hooks";
import { appConsole, rememberMeHelper } from "../../utils";
import axios from "axios";
import { Team } from "../team/team";

interface UserProfile {
  userName: string;
  birthday: string;
  addr: string;
  detailAddr?: string;
  cellNo: string;
  genderCd: string;
  imageBasePath?: string;
  email: string;
  assets?: string;
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
  // 로그인 한 사용자의 정보와 로그아웃 함수
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [interestCodes, setInterestCodes] = useState<string[]>([]);
  const { alertError, alertSuccess } = useAlert();
  const api = useAPI();
  const { logout } = useAuth();
  const [wishCount, setWishCount] = useState(0);

  useEffect(() => {
    // mypage 조회
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me", {});
        const data = res.data;

        if (data.code === "0000") {
          setProfile(res.data.data);
        } else {
          alertError();
        }
      } catch (err) {
        alertError({ error: err });
      }
    };

    fetchProfile();

    // 관심사 불러오기
    const fetchInterests = async () => {
      try {
        const res = await api.get("/user/readMyInterests", {});
        const data = res.data;
        if (data.code === "0000") {
          setInterestCodes(res.data.data);
        } else {
          alertError({ message: "관심사 불러오기 실패" });
        }
      } catch (err) {
        alertError({ error: err, message: "관심사 불러오기 실패" });
      }
    };

    fetchInterests();

    // 찜한 팀 개수 고르기
    const fetchWishCount = async () => {
      try {
        if (!user?.id) {
          setWishCount(0);
          return;
        }
        const res = await api.get("/team/selectFavoritedTeamList", {
          userId: user?.id,
          page: 1,
          size: 1,
        });
        const data = res.data.data;
        setWishCount(data.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWishCount();
  }, [user?.id]);

  // 생년월일을 나이로 환산해주는 함수
  const calculateAge = (birthday?: string): number => {
    if (!birthday || birthday.length < 4) return 0;
    const birthYear = parseInt(birthday.substring(0, 4), 10);

    const currentYear = new Date().getFullYear();

    return currentYear - birthYear + 1;
  };

  // 생년월일 포맷팅
  const formatBirthday = (birthday?: string): string => {
    if (!birthday || birthday.length < 8) return "";
    const year = birthday.substring(0, 4);
    const month = birthday.substring(4, 6);
    const day = birthday.substring(6, 8);
    return `${year}/${month}/${day}`;
  };

  // 성별 판별 함수
  const getGenderLabel = (code: string): string => {
    switch (code) {
      case "4001":
        return "남";
      case "4002":
        return "여";
      default:
        return "기타";
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    try {
      const resp = await api.post("/auth/signOut");
      const { code, message } = resp.data;

      if (code === "0000") {
        alertSuccess({
          message,
          onClose: () => {
            rememberMeHelper.removeRemember();
            logout();
            navigate("/login");
          },
        });
      } else {
        alertError();
      }
    } catch (error) {
      alertError({ error });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.page_title}>내정보</h1>

      {/* 프로필 사진 및 수정 영역 */}
      <div className={styles.profile_section}>
        <div className={styles.profile_photo_container}>
          <Avatar
            size="xxl"
            src={profile?.imageBasePath || "/images/img_profile.svg"}
            className={styles.profile_photo}
          />
          <div className={styles.edit_overlay}>
            <FontAwesomeIcon icon={faPencilAlt} className={styles.edit_icon} />
          </div>
        </div>
        <Link to="/myinfo" className={styles.edit_link}>
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
          <span className={styles.info_label}>나이</span>
          <span className={styles.info_value}>
            {calculateAge(profile?.birthday)}세
          </span>
        </div>

        <div className={styles.info_item}>
          <span className={styles.info_label}>성별</span>
          <span className={styles.info_value}>
            {profile?.genderCd ? getGenderLabel(profile.genderCd) : "여"}
          </span>
        </div>

        <div className={styles.info_item}>
          <span className={styles.info_label}>자산</span>
          <span className={styles.info_value}>
            {profile?.assets || "100,000"}
          </span>
        </div>

        <div className={styles.info_item}>
          <span className={styles.info_label}>주소</span>
          <div className={styles.address_container}>
            <span className={styles.info_value}>
              {profile?.addr} {profile?.detailAddr || ""}
            </span>
            <FontAwesomeIcon icon={faMapPin} className={styles.map_icon} />
          </div>
        </div>
      </div>

      {/* 관심사 섹션 */}
      <div className={styles.interests_section}>
        <h3 className={styles.section_title}>관심사</h3>
        <div className={styles.interests_group}>
          {interestCodes.length > 0 ? (
            interestCodes.map((code) => (
              <Badge key={code} size="lg" className={styles.interest_badge}>
                {INTEREST_MAP[code] || "알 수 없음"}
              </Badge>
            ))
          ) : (
            <div className={styles.no_interests}>
              <Button
                type="button"
                onClick={() => navigate("/interest")}
                className={styles.btn_skip}
              >
                관심사 선택하러 가기 &gt;
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <div className={styles.menu_section}>
        <h3 className={styles.section_title}>메뉴</h3>
        <div className={styles.menu_list}>
          <Link to="/myinfo" className={styles.menu_item}>
            <span className={styles.menu_text}>내 정보 수정</span>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={styles.menu_icon}
            />
          </Link>

          <Link to="/team_list_wish" className={styles.menu_item}>
            <span className={styles.menu_text}>찜한 팀</span>
            <Badge className={styles.menu_badge}>{wishCount}</Badge>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={styles.menu_icon}
            />
          </Link>

          <Link to="/team_list/2" className={styles.menu_item}>
            <span className={styles.menu_text}>신청한 팀</span>
            <Badge className={styles.menu_badge}>99</Badge>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={styles.menu_icon}
            />
          </Link>
        </div>
      </div>

      {/* 로그아웃 버튼 */}
      <div className={styles.logout_section}>
        <Button
          type="button"
          size="sm"
          color="danger"
          onClick={() => handleLogout()}
          className={styles.logout_button}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default Mypage;
