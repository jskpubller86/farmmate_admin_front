import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "../../components/ui";
import { useAuth, useAlert, useAPI } from "../../hooks";

// 사용자 프로필 인터페이스 정의
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

const MypageEdit: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const { alertError, alertSuccess } = useAlert();
  const api = useAPI();

  // 컴포넌트 마운트 시 프로필 정보 조회
  useEffect(() => {
    // 임시 데이터 사용 (프론트 작업용)
    const tempUserProfile: UserProfile = {
      userName: "테스형",
      birthday: "19990101",
      addr: "서울시 강남구 테헤란로 123",
      detailAddr: "456동 789호",
      cellNo: "010-1234-5678",
      genderCd: "4002",
      imageBasePath: "/images/img_profile.svg",
      email: "Tessbrother@gmail.com",
      asset: 100000000,
    };

    setProfile(tempUserProfile);
    setEditedProfile(tempUserProfile);

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

    fetchProfile();
    */
  }, [api]);

  // 생년월일 형식 변환 (YYYYMMDD -> YYYY-MM-DD)
  const formatBirthday = (birthday?: string): string => {
    if (!birthday || birthday.length < 8) return "";
    const year = birthday.substring(0, 4);
    const month = birthday.substring(4, 6);
    const day = birthday.substring(6, 8);
    return `${year}-${month}-${day}`;
  };

  // 생년월일 파싱 (YYYY-MM-DD -> YYYYMMDD)
  const parseBirthday = (dateString: string): string => {
    return dateString.replace(/-/g, "");
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

  // 성별 코드를 라벨로 변환
  const getGenderLabel = (code: string): string => {
    return code === "4001" ? "남" : "여";
  };

  // 자산을 원화 형식으로 변환 (쉼표 구분)
  const formatAsset = (asset?: number): string => {
    if (!asset || asset <= 0) return "0P";

    // 숫자를 문자열로 변환하고 쉼표 추가
    const formattedAsset = asset.toLocaleString("ko-KR");
    return `${formattedAsset}원`;
  };

  // 입력 필드 변경 처리
  const handleInputChange = (field: keyof UserProfile, value: string) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [field]: value,
      });
    }
  };

  // 프로필 사진 변경 처리
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 검증 (5MB 이하)
      if (file.size > 5 * 1024 * 1024) {
        alertError({ message: "파일 크기는 5MB 이하여야 합니다." });
        return;
      }

      // 파일 타입 검증 (이미지 파일만)
      if (!file.type.startsWith("image/")) {
        alertError({ message: "이미지 파일만 업로드 가능합니다." });
        return;
      }

      // 이미지 미리보기를 위한 URL 생성
      const imageUrl = URL.createObjectURL(file);

      if (editedProfile) {
        setEditedProfile({
          ...editedProfile,
          imageBasePath: imageUrl,
        });
      }
    }
  };

  // 프로필 저장 처리
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
        asset: editedProfile.asset,
        // 이미지 파일이 새로 업로드된 경우 FormData로 처리
        imageFile: editedProfile.imageBasePath?.startsWith("blob:")
          ? editedProfile.imageBasePath
          : undefined,
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

  // 수정 취소 처리
  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  // 뒤로가기 처리
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
            ← 뒤로가기
          </button>
          <h1 className={styles.page_title}>내 정보 수정</h1>
        </div>

        {/* 프로필 섹션 */}
        <div className={styles.profile_section}>
          <div className={styles.profile_photo_container}>
            <Avatar
              size="xxl"
              src={
                editedProfile.imageBasePath ||
                profile.imageBasePath ||
                "/images/img_profile.svg"
              }
              className={styles.profile_photo}
            />
            {isEditing && (
              <div className={styles.image_edit_overlay}>
                <label
                  htmlFor="profile-image-input"
                  className={styles.image_edit_button}
                >
                  📷
                </label>
                <input
                  id="profile-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.hidden_input}
                />
              </div>
            )}
          </div>
          <div className={styles.edit_actions}>
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  className={styles.save_button}
                  color="point"
                >
                  💾 저장
                </Button>
                <Button
                  onClick={handleCancel}
                  className={styles.cancel_button}
                  color="secondary"
                >
                  ❌ 취소
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className={styles.edit_button}
                color="point"
              >
                ✏️ 수정
              </Button>
            )}
          </div>
        </div>

        {/* 개인 정보 섹션 */}
        <div className={styles.info_section}>
          {/* 이름 */}
          <div className={styles.info_item}>
            <span className={styles.info_label}>이름</span>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.userName}
                onChange={(e) => handleInputChange("userName", e.target.value)}
                className={styles.edit_input}
                placeholder="이름을 입력하세요"
              />
            ) : (
              <span className={styles.info_value}>{profile.userName}</span>
            )}
          </div>

          {/* 생년월일 */}
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

          {/* 나이 (읽기 전용) */}
          <div className={styles.info_item}>
            <span className={styles.info_label}>나이</span>
            <span className={styles.info_value}>
              {calculateAge(profile.birthday)}
            </span>
          </div>

          {/* 성별 */}
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

          {/* 주소 */}
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

          {/* 전화번호 */}
          <div className={styles.info_item}>
            <span className={styles.info_label}>전화번호</span>
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

          {/* 이메일 */}
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

          {/* 팜페이 (읽기 전용) */}
          <div className={styles.info_item}>
            <span className={styles.info_label}>팜페이</span>
            <span className={styles.info_value}>
              {formatAsset(profile.asset)}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MypageEdit;
