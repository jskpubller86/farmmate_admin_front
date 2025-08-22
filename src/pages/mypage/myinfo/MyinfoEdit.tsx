import React, { useEffect, useRef, useState } from "react";
import styles from "./myinfoedit.module.css";
import mypageStyles from "../mypage.module.css";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, Input } from "../../../components/ui";
import { useAlert, useAPI, useAuth, useDaumAddr } from "../../../hooks";
import { appConsole } from "../../../utils";

// 사용자 프로필
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

// 관심사 매핑용 코드
const INTEREST_LIST = [
  { code: "1001", label: "축구" },
  { code: "1002", label: "농구" },
  { code: "1003", label: "배구" },
  { code: "1004", label: "골프" },
  { code: "1005", label: "등산" },
  { code: "1006", label: "수영" },
  { code: "1007", label: "러닝" },
  { code: "1008", label: "헬스" },
  { code: "1009", label: "야구" },
  { code: "1010", label: "기타" },
];

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

const MyinfoEdit: React.FC = () => {
  // 로그인 한 사용자의 정보
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { alertError, alertSuccess } = useAlert();
  const api = useAPI();

  // 프로필 불러오기
  const [profile, setProfile] = useState<UserProfile | null>(null);
  // 관심사 변경
  const [interestCodes, setInterestCodes] = useState<string[]>([]);
  // 전화번호 변경
  const [cellNo, setCellNo] = useState("");
  // 주소 변경
  const [address, setAddress] = useState("");
  const [detail_Address, setDetail_Adress] = useState("");
  // 다음 API 호출 훅
  const getDaum = useDaumAddr();
  // 관심사
  const [selectedInterests, setSelectedInterests] =
    useState<string[]>(interestCodes);
  // 이미지 파일 업로드
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 이미지 미리보기 구현
  const [imagePreview, setImagePreview] = useState<string>("");

  // 관심사 토글 함수
  const handleInterestToggle = (code: string) => {
    setSelectedInterests((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  // // 파일 업로드 동작 함수
  const imageFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImagePreview(ev.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // 텍스트 편집시 동작하는 함수
  const cellNohandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCellNo(e.target.value);
  };

  const detail_AddresshandleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetail_Adress(e.target.value);
  };

  /**
   * 다음 주소 API를 활성화하는 함수
   * @param e 이벤트 객체
   */
  const onOpenDaumAddrAPI = (e: React.MouseEvent<HTMLElement>) => {
    const daum = getDaum();
    if (daum) {
      new daum.Postcode({
        oncomplete: function (data: any) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ""; // 주소 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
            console.log(addr);
            console.log(typeof { addr });
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
            console.log(addr);
          }

          setAddress(addr);
          console.log(address);
        },
      }).open();
    }
  };

  // user가 null로 확정된 경우에만 /login으로 리다이렉트
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me", {});
        const { code, data } = res.data;

        if (code === "0000") {
          setProfile(data);
          setCellNo(data.cellNo);
          setAddress(data.addr);
          setDetail_Adress(data.detailAddr ?? "");
          setImagePreview(
            res.data.data.imageBasePath || "/images/img_profile.svg"
          );
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
          setSelectedInterests(res.data.data);
        } else {
          alertError();
        }
      } catch (err) {
        alertError({ error: err });
      }
    };

    fetchInterests();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let newImageUrl = imagePreview;
      console.log("handleSubmit 시작");

      // ① 프로필 사진 업로드
      if (fileInputRef.current?.files?.[0]) {
        const formData = new FormData();
        formData.append("file", fileInputRef.current.files[0]);

        const res = await api.postWithMultiPart(
          "/user/updateProfileImage",
          formData
        );
        const { code, message, data } = res.data;
        if (code === "0000") {
          alertSuccess({ message, onClose: () => setImagePreview(data.url) });
        } else {
          alertError();
        }
      }

      // ② 회원 정보 업데이트
      console.log("회원 정보 업데이트 시작");
      const userInfoPayload = {
        cellNo,
        addr: address,
        detailAddr: detail_Address,
        userId: user?.id || "",
      };

      const resUserInfo = await api.postWithJson(
        "/user/updateUserInfo",
        userInfoPayload
      );

      // ③ 관심사 업데이트
      const resInterests = await api.postWithJson("/user/updateUserInterests", {
        userId: user?.id,
        interestCodes: selectedInterests,
      });

      if (resUserInfo.data.code === "0000") {
        alertSuccess({ message: resUserInfo.data.message });
        // me 호출로 최신 정보 가져오기
        await api.get("/auth/me", {}).then((res) => {
          const updatedProfile = {
            ...res.data.data,
            imageBasePath: res.data.data.url || res.data.data.imageBasePath,
          };
          appConsole(res.data);
        });

        navigate("/myinfo");
      }
    } catch (err) {
      alertError({ error: err });
    }
  };

  return (
    <div className={mypageStyles.container}>
      <h2 className={mypageStyles.head}>내 정보</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.profile}>
          <Avatar
            size="xxl"
            src={
              imagePreview ||
              profile?.imageBasePath ||
              "/images/img_profile.svg"
            }
          />
          <button
            type="button"
            className={`${styles.btn_profileedit} position-absolute top-9 start-20 translate-middle p-2 bg-ight border border-light rounded-circle`}
            onClick={imageFileUploadClick}
          >
            <img
              className={styles.icon_edit}
              src="/images/editicon.png"
              alt="ProfileImg"
            />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <Button type="submit" className={styles.btn_edit}>
          <b>완료</b>
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
            <b>전화번호 : </b>{" "}
            <Input
              type="text"
              name="cell_no"
              value={cellNo}
              placeholder={cellNo}
              onChange={cellNohandleChange}
            ></Input>
          </li>
          <li>
            <b>E-Mail :</b> {profile?.email}
          </li>
          <li>
            <b>성별 :</b> {getGenderLabel(profile?.genderCd ?? "")}
          </li>
          <li>
            <b>주소 : </b> {address}
            <br />
            <b>상세주소 : </b>{" "}
            <Input
              type="text"
              name="detail_Adress"
              value={detail_Address}
              placeholder={detail_Address}
              onChange={detail_AddresshandleChange}
            ></Input>
            <Button
              type="button"
              onClick={onOpenDaumAddrAPI}
              className={styles.locationbutton}
            >
              <img
                className={styles.locationicon}
                src="./images/locationicon.png"
                alt="locationIcon"
              />
            </Button>
            <input
              //  ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              // onChange={handleFileChange}
            />
          </li>
        </ul>

        <div className={styles.inter_box}>
          <div className={styles.inter_head_box}>
            <b className={styles.inter_head_first}>관심사</b>
          </div>
          <div className={styles.inter_group}>
            {INTEREST_LIST.map((item) => {
              const isSelected = selectedInterests.includes(item.code);
              return (
                <Badge
                  key={item.code}
                  size="lg"
                  isSelected={isSelected}
                  onClick={() => handleInterestToggle(item.code)}
                  className={styles.badge_item}
                >
                  <span className={styles.badge_content}>
                    {item.label}
                    <span className={styles.icon}>
                      {isSelected ? true : false}
                    </span>
                  </span>
                </Badge>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyinfoEdit;
