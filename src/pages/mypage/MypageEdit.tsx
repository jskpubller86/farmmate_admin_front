import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Badge } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth, useAlert, useAPI } from "../../hooks";

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

const MypageEdit: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [interestCodes, setInterestCodes] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const { alertError, alertSuccess } = useAlert();
  const api = useAPI();

  useEffect(() => {
    // 임시 데이터 사용 (프론트 작업용)
    const tempUserProfile: UserProfile = {
      userName: "테스형형",
      birthday: "19950515",
      addr: "서울시 강남구 테헤란로 123",
      detailAddr: "456동 789호",
      cellNo: "010-1234-5678",
      genderCd: "4001",
      imageBasePath: "/images/img_profile.svg",
      email: "farmmate@example.com",
    };

    const tempInterestCodes = ["1001", "1005", "1008"]; // 축구, 등산, 헬스

    setProfile(tempUserProfile);
    setEditedProfile(tempUserProfile);
    setInterestCodes(tempInterestCodes);

    // 실제 API 호출은 주석 처리
    /*
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me", {});
        if (res.data.code === "0000") {
          setProfile(res.data.data);
          setEditedProfile(res.data.data);
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
    */
  }, []);

  const formatBirthday = (birthday?: string): string => {
    if (!birthday || birthday.length < 8) return "";
    const year = birthday.substring(0, 4);
    const month = birthday.substring(4, 6);
    const day = birthday.substring(6, 8);
    return `${year}-${month}-${day}`;
  };

  const parseBirthday = (dateString: string): string => {
    return dateString.replace(/-/g, "");
  };

  const getGenderLabel = (code: string): string => {
    return code === "4001" ? "남" : "여";
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [field]: value,
      });
    }
  };

  const handleSave = async () => {
    if (!editedProfile) return;

    try {
      const updateData = {
        userName: editedProfile.userName,
        birthday: editedProfile.birthday,
        addr: editedProfile.addr,
        detailAddr: editedProfile.detailAddr,
        cellNo: editedProfile.cellNo,
        genderCd: editedProfile.genderCd,
        email: editedProfile.email,
      };

      const res = await api.put("/user/updateProfile", updateData);
      if (res.data.code === "0000") {
        alertSuccess({ message: "프로필이 성공적으로 수정되었습니다." });
        setProfile(editedProfile);
        setIsEditing(false);
        navigate("/mypage");
      } else {
        alertError({ message: "프로필 수정에 실패했습니다." });
      }
    } catch (err) {
      console.error("프로필 수정 실패", err);
      alertError({ message: "프로필 수정 중 오류가 발생했습니다." });
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleBack = () => {
    navigate("/mypage");
  };

  if (!profile || !editedProfile) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.mypage_main_box}>
        {/* 헤더 */}
        <div className={styles.edit_header}>
          <button onClick={handleBack} className={styles.back_button}>
            <FontAwesomeIcon icon={faArrowLeft} />
            뒤로가기
          </button>
          <h1 className={styles.page_title}>내정보 수정</h1>
        </div>

        {/* 프로필 섹션 */}
        <div className={styles.profile_section}>
          <div className={styles.profile_photo_container}>
            <Avatar
              size="xxl"
              src={profile.imageBasePath || "/images/img_profile.svg"}
              className={styles.profile_photo}
            />
          </div>
          <div className={styles.edit_actions}>
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  className={styles.save_button}
                  color="point"
                >
                  <FontAwesomeIcon icon={faSave} />
                  저장
                </Button>
                <Button
                  onClick={handleCancel}
                  className={styles.cancel_button}
                  color="secondary"
                >
                  <FontAwesomeIcon icon={faTimes} />
                  취소
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className={styles.edit_button}
                color="point"
              >
                수정
              </Button>
            )}
          </div>
        </div>

        {/* 개인 정보 섹션 */}
        <div className={styles.info_section}>
          <div className={styles.info_item}>
            <span className={styles.info_label}>이름</span>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.userName}
                onChange={(e) => handleInputChange("userName", e.target.value)}
                className={styles.edit_input}
              />
            ) : (
              <span className={styles.info_value}>{profile.userName}</span>
            )}
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>생년월일</span>
            {isEditing ? (
              <input
                type="date"
                value={formatBirthday(editedProfile.birthday)}
                onChange={(e) =>
                  handleInputChange("birthday", parseBirthday(e.target.value))
                }
                className={styles.edit_input}
              />
            ) : (
              <span className={styles.info_value}>
                {formatBirthday(profile.birthday)}
              </span>
            )}
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>성별</span>
            {isEditing ? (
              <select
                value={editedProfile.genderCd}
                onChange={(e) => handleInputChange("genderCd", e.target.value)}
                className={styles.edit_select}
              >
                <option value="4001">남</option>
                <option value="4002">여</option>
              </select>
            ) : (
              <span className={styles.info_value}>
                {getGenderLabel(profile.genderCd)}
              </span>
            )}
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>주소</span>
            {isEditing ? (
              <div className={styles.address_inputs}>
                <input
                  type="text"
                  value={editedProfile.addr}
                  onChange={(e) => handleInputChange("addr", e.target.value)}
                  className={styles.edit_input}
                  placeholder="기본주소"
                />
                <input
                  type="text"
                  value={editedProfile.detailAddr || ""}
                  onChange={(e) =>
                    handleInputChange("detailAddr", e.target.value)
                  }
                  className={styles.edit_input}
                  placeholder="상세주소"
                />
              </div>
            ) : (
              <span className={styles.info_value}>
                {profile.addr} {profile.detailAddr || ""}
              </span>
            )}
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>연락처</span>
            {isEditing ? (
              <input
                type="tel"
                value={editedProfile.cellNo}
                onChange={(e) => handleInputChange("cellNo", e.target.value)}
                className={styles.edit_input}
                placeholder="010-0000-0000"
              />
            ) : (
              <span className={styles.info_value}>{profile.cellNo}</span>
            )}
          </div>

          <div className={styles.info_item}>
            <span className={styles.info_label}>이메일</span>
            {isEditing ? (
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={styles.edit_input}
                placeholder="example@email.com"
              />
            ) : (
              <span className={styles.info_value}>{profile.email}</span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MypageEdit;
