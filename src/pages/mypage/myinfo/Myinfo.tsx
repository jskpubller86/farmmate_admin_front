import React, { useEffect, useState } from "react";
import styles from "./myinfo.module.css";
import mypageStyles from "../mypage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Button } from "../../../components/ui";
import { useAuth, useAlert, useAPI } from "../../../hooks";

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

const Myinfo: React.FC = () => {
  // 로그인 한 사용자의 정보
  const { user, login } = useAuth();
  const { alertError, alertSuccess } = useAlert();
  const api = useAPI();

  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [interestCodes, setInterestCodes] = useState<string[]>([]);

  // 성별 판별 함수
  const getGenderLabel = (code: string): string => {
    switch (code) {
      case "4001":
        return "남성";
      case "4002":
        return "여성";
      default:
        return "기타";
    }
  };

  // 생년월일을 나이로 환산해주는 함수
  const calculateAge = (birthday?: string): number => {
    if (!birthday || birthday.length < 4) return 0;
    const birthYear = parseInt(birthday.substring(0, 4), 10);

    const currentYear = new Date().getFullYear();

    return currentYear - birthYear + 1;
  };

  // user가 null로 확정된 경우에만 /login으로 리다이렉트
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me", {});
        const { code, data } = res.data;
        if (code === "0000") {
          setProfile(data);
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
        const { code, data } = res.data;
        if (code === "0000") {
          console.log("서버에서 가져온 사용자 관심사 >>>", data);
          setInterestCodes(data);
        } else {
          alertError();
        }
      } catch (err) {
        alertError({ error: err });
      }
    };

    fetchInterests();
  }, [user, navigate]);

  // 편집 페이지로 이동
  const myProfileEdit = (e: React.MouseEvent<HTMLElement>) => {
    navigate("/myinfoedit");
  };

  return (
    <div className={mypageStyles.container}>
      <h2 className={mypageStyles.head}>내 정보</h2>
      <div className={styles.profile}>
        {/* src={user.imageBasePath} */}
        <Avatar
          size="xxl"
          src={profile?.imageBasePath || "/images/img_profile.svg"}
        />
      </div>
      <Button type="button" onClick={myProfileEdit} className={styles.btn_edit}>
        <b>편집</b>
      </Button>
      <ul className={styles.list_group}>
        <li>
          <b>이름 :</b> {profile?.userName}
        </li>
        <li>
          <b>생년월일 :</b> {profile?.birthday}
        </li>
        <li>
          <b>나이 :</b> {calculateAge(profile?.birthday)}
        </li>
        <li>
          <b>전화번호 :</b> {profile?.cellNo}
        </li>
        <li>
          <b>E-Mail :</b> {profile?.email}
        </li>
        <li>
          <b>성별 :</b> {profile && getGenderLabel(profile?.genderCd)}
        </li>
        <li>
          <b>주소 :</b> {profile?.addr}
          <br />
          <b>상세주소 :</b> {profile?.detailAddr}
        </li>
      </ul>
      <div className={styles.inter_box}>
        <div className={styles.inter_head_box}>
          <b className={styles.inter_head_first}>관심사</b>
        </div>
        <div className={styles.inter_group}>
          {interestCodes.map((code) => (
            <Badge key={code} size="lg" className={styles.badge_item}>
              {INTEREST_MAP[code] || "알 수 없음"}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Myinfo;
