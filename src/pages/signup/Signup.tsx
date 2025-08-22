import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // 비밀번호 보이기 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button, Error, File, Input, Radio, Select } from "../../components/ui";
import { useAlert, useAPI, useDaumAddr } from "../../hooks";
import { appConsole } from "../../utils";
import styles from "./signup.module.css";

interface UserFormData {
  userAccount: string;
  password: string;
  passwordCheck?: string;
  nickname: string;
  birthday: string;
  gender: string;
  phone: string;
  addr: string;
  detailAddr?: string;
  email: string;
  emailAddr: string;
  profileImage?: string | null;
}

/* 회원가입 */
const Signup: React.FC = () => {
  const [idMessage, setIdMessage] = useState("");
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();
  const api = useAPI();

  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  //코드 입력창이 false라 나타나지 않음
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [emailCodeVerified, setEmailCodeVerified] = useState("");

  const getDaum = useDaumAddr(); // 다음 API 호출 훅
  // 상세주소 ref 훅
  const detailAddrRef = useRef<HTMLInputElement>(null);
  const emailAddHelperRef = useRef<HTMLSelectElement>(null); // 이메일 헬퍼 엘리먼트 ref 훅
  const [count, setCount] = useState(0);
  const { alertError, alertSuccess, alertWarn } = useAlert();
  const dafaultimg = "/images/img_profile.svg";
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(
    dafaultimg
  );
  const [profile, setProfile] = useState<File | null>(null);

  // 폼검증에 사용할 스키마
  const schema = yup
    .object({
      userAccount: yup
        .string()
        .required("아이디를 입력해주세요.")
        .min(5, "아이디는 최소 5자여야 합니다.")
        .matches(/^[a-zA-Z0-9._%+-]+$/, "아이디는 영문자/숫자만 가능합니다")
        .max(20, "아이디는 최대 20자여야 합니다."),
      password: yup
        .string()
        .required("비밀번호를 입력해주세요")
        .matches(
          /^(?=[A-Z][a-z0-9!@#$%^()*]*$)(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^()*]).{10,16}/,
          "비밀번호는 첫 글자가 영대문자이며, 영소문자/숫자/특수문자(!@#$%^()*)를 포함하여 10~16자리여야 합니다."
        ),
      passwordCheck: yup
        .string()
        .required("비밀번호를 다시 입력해주세요")
        .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
      nickname: yup
        .string()
        .required("사이트에서 사용할 닉네임을 입력해주세요"),
      email: yup
        .string()
        .required("이메일 아이디를 입력해주세요")
        .matches(
          /^[a-zA-Z0-9._%+-]+$/,
          "이메일 아이디는 영문자/숫자만 가능합니다"
        )
        .matches(/^[^ㄱ-ㅎㅏ-ㅣ가-힣]+$/, "한글은 사용할 수 없습니다"),
      emailAddr: yup
        .string()
        .required("이메일의 도메인주소를 입력 또는 선택해주세요")
        .matches(/^[^ㄱ-ㅎㅏ-ㅣ가-힣]+$/, "도메인에 한글을 사용할 수 없습니다")
        .matches(
          /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "올바른 도메인 형식이 아닙니다"
        ),
      gender: yup.string().required("성별을 선택해주세요"),
      phone: yup
        .string()
        .required("휴대폰 번호는 필수입니다")
        .matches(
          /^01[0|1|6|7|8|9]-\d{3,4}-\d{4}$/,
          "올바른 휴대폰 번호 형식이 아닙니다"
        ),
      addr: yup.string().required("주소를 선택해주세요"),
      detailAddr: yup.string().notRequired(),
      birthday: yup.string().required("생년월일을 선택해주세요"),
    })
    .required();
  // 폼 요소 검증을 위한 훅
  const {
    register,
    handleSubmit,
    watch,
    control,
    getFieldState,
    formState: { errors },
    setValue,
    trigger,
    getValues,
  } = useForm({ resolver: yupResolver(schema) });

  //회원가입정보
  const onValid = async (data: any) => {
    //가입시 이메일중복체크 필수
    if (!isIdVerified) {
      alertError({ message: "아이디 중복체크를 먼저 완료해주세요." });
      return;
    }

    //가입시 이메일 인증 필수
    if (!isEmailVerified) {
      alertError({ message: "이메일 인증을 먼저 완료해주세요." });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("userAccount", data.userAccount);
      formData.append("pwd", data.password);
      formData.append("passwordCheck", data.passwordCheck);
      formData.append("userName", data.nickname);
      //하이푼(-)을 빈칸으로 만들어서 데이터에 넣는방법
      formData.append("birthday", data.birthday.replace(/-/g, ""));
      formData.append("genderCd", data.gender);
      formData.append("phoneNumber", data.phone.replace(/-/g, ""));
      formData.append("addr", data.addr);
      formData.append("detailAddr", data.detailAddr || "");
      const fullEmail = `${data.email}@${data.emailAddr}`;
      formData.append("email", fullEmail);
      if (profile) {
        formData.append("profileImage", profile);
      }
      const resp = await api.post(`/auth/signUp`, formData);
      const data1 = resp.data;
      if (data1.code === "0000") {
        const userId = data1.userId;
        alertSuccess({
          message: "회원가입 성공했습니다.",
          onClose: () => navigate(`/interest/${userId}`),
        });
        console.log(userId);
      } else {
        alertError();
      }
    } catch (err) {
      console.error("회원가입 오류", err);
      alertError({
        error: err,
        message: "회원가입 실패했습니다 다시 시도해 주세요",
      });
    }
  };

  //아이디 입력창 한글제거
  useEffect(() => {
    const idInput = watch((value, { name }) => {
      //아이디 입력창에 한글을 쓰려고 하면 실시간으로 제거
      if (name === "userAccount") {
        const currentValue = value.userAccount || "";
        const filteredValue = currentValue.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
        setIsIdVerified(false); //아이디 변경시 중복체크 초기화
        setIdMessage("");
        // 한글이 있다면 제거하고 값 업데이트
        if (currentValue !== filteredValue) {
          setValue("userAccount", filteredValue);
        }
      }
    });
    return () => idInput.unsubscribe();
  }, [watch, setValue]);

  //이메일 아이디 입력창 한글제거(ustEffect두개 만들면 가독성이 좋고 수정이 쉬워짐)
  useEffect(() => {
    const emailInput = watch((value, { name }) => {
      //이메일 아이디 입력창에 한글을 쓰려고 하면 실시간으로 제거
      if (name === "email") {
        const currentValue = value.email || "";
        const filteredValue = currentValue.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
        setIsEmailVerified(false); //이메일 변경시 이메일 인증 초기화
        setEmailMessage("");
        setShowCodeInput(false); // 이메일 변경시 인증코드 입력창 숨김
        setEmailCodeVerified(""); // 이메일 변경시 인증코드 입력값 초기화
        setEmailMessage("");
        // 한글이 있다면 제거하고 값 업데이트
        if (currentValue !== filteredValue) {
          setValue("email", filteredValue);
        }
      }
    });
    return () => emailInput.unsubscribe();
  }, [watch, setValue]);

  //중복체크
  const idCheck = async () => {
    const userAccount = getValues("userAccount");
    try {
      const res = await api.get(`/auth/idCheck`, { userAccount });
      console.log("idCheck 응답:", res.data);
      alertSuccess({ message: "사용 가능한 아이디 입니다" });
      setIdMessage("");
      setIsIdVerified(true);
    } catch (err: any) {
      if (err.response) {
        if (err.response.data?.code === "VD03") {
          setIdMessage("이미 사용 중인 아이디입니다.");
          alertError({ message: "이미 사용 중인 아이디입니다." });
        }
      }
      console.error(err);
      setIsIdVerified(false);
    }
  };
  //휴대폰 번호 입력시 글자수 제한 하이푼(-)이 자동으로 입력되고 트리거로 에러메세지 조건에 맞게 자동으로 변경
  const onChangePhoneHelper = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    // 하이픈을 붙이는 로직
    if (value.length <= 3) {
      // 하이픈 없음 (예: 010)
    } else if (value.length <= 7) {
      // 010-1234 (총 9자리)
      value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else {
      // 010-1234-5678 (총 13자리)
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }
    // 하이픈 포함 13자리를 초과하면 자르기
    if (value.length > 13) {
      value = value.slice(0, 13);
    }
    setValue("phone", value);
    trigger("phone");
  };

  //이메일 인증코드 발송
  const sendEmailCode = async () => {
    const fullEmail = `${getValues("email")}@${getValues("emailAddr")}`;
    try {
      alertWarn({ message: "인증번호 발송 중" });
      const res = await api.postWithJson(`/email/emailCheck`, {
        email: fullEmail,
      });
      if (res.data.code === "0000") {
        // 성공: 인증번호 발송
        alertSuccess({ message: "인증번호가 발송되었습니다" });
        setEmailMessage("인증 번호가 발송되었습니다");
        setIsEmailVerified(false);
        //인증번호 발송시 인증번호 인풋창 나타남
        setShowCodeInput(true);
        setCount(180);
      } else {
        // 예상치 못한 코드가 오면 일단 실패 처리
        alert(`인증번호 발송 실패: ${res.data.message || res.data.code}`);
        setShowCodeInput(false);
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.data?.code === "VD04") {
          setEmailMessage("이미 사용 중인 이메일입니다.");
          alertError({ message: "이미 사용 중인 이메일입니다." });
          setShowCodeInput(false);
        }
      }
      setEmailMessage("");
      setIsEmailVerified(false);
      setEmailCodeVerified("");
      console.error("이메일 인증 중 오류 발생", err);
    }
  };

  //이메일인증시간 타이머
  useEffect(() => {
    if (count <= 0) return;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowCodeInput(false); // 인증 입력창 숨기기
          setEmailMessage("인증 시간이 만료되었습니다. 다시 시도해주세요.");
          setIsEmailVerified(false); // 인증 상태 초기화
          setEmailCodeVerified("");
          alertError({
            message: "인증 시간이 만료되었습니다. 다시 시도해주세요.",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);

  //인증번호 체크
  const checkEmailCode = async () => {
    const fullEmail = `${getValues("email")}@${getValues("emailAddr")}`;
    if (!emailCodeVerified) {
      alertError({ message: "인증코드를 입력해주세요" });
      return;
    }
    if (isEmailVerified) {
      alertError({ message: "이미 이메일 인증이 완료되었습니다." });
      return;
    }
    try {
      const res = await api.postWithJson(`/email/emailCheck/certification`, {
        email: fullEmail,
        code: emailCodeVerified,
      });
      const { code, data } = res.data;
      if (code === "0000" && data?.success) {
        alertWarn({ message: "인증 대기중입니다" });
        alertSuccess({ message: "이메일 인증 성공!" });
        setIsEmailVerified(true);
        setCount(0); //인증성공시 카운트 삭제
      } else if (code === "0000" && !data?.success) {
        //0000으로 잘 진행됐지만 성공이 아님
        const reason = data?.reason || "인증 실패";
        alertError({ message: `인증 실패: ${reason}` });
        setIsEmailVerified(false);
      } else {
        alert("알수없는 오류");
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.data?.code === "AU03") {
          alertError({
            message:
              "3회 이상 인증번호를 틀려 더 이상 시도할 수 없습니다. 다시 인증번호를 요청하세요.",
          });
          appConsole("3회 이상 인증번호를");
          setShowCodeInput(false);
        } else if (err.response.data?.code === "AU01") {
          appConsole("인증번호가 틀렸");
          alertError({ message: "인증번호가 틀렸습니다." });
          setIsEmailVerified(false);
        } else if (err.response.data?.code === "AU02") {
          appConsole("인증번호가 만료");
          alertError({ message: "인증번호가 만료되었습니다." });
          setIsEmailVerified(false);
        }
      }
      console.error("이메일 인증 실패:", err);
    }
  };

  const handleEmailVerifiedClick = async () => {
    const emailIsValid = await trigger(["email", "emailAddr"]);
    if (!emailIsValid) {
      alertError({ message: "이메일 주소를 올바르게 입력해주세요." });
      return;
    }
    if (!showCodeInput) {
      // 인증번호 입력 필드가 보이지 않으면, 인증 메일 발송
      await sendEmailCode();
      setShowCodeInput(true); // 입력 필드 표시
    } else {
      // 인증번호 입력 필드가 보이면, 인증 코드 확인
      await checkEmailCode();
    }
  };

  /**
   * 헬퍼의 도메인 선택 옵션이 변경되면 주소의 값을 변경하는 함수
   * @param e 이벤트 객체
   */
  const onChangeEmailAddrHelper = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setValue("emailAddr", value);
    trigger("emailAddr");
  };

  /**
   * 이메일이 주소가 변경될 경우 헬퍼의 값을 변경하는 함수
   * @param e 이벤트 객체
   */
  const onChangeEmailAddr = (e: ChangeEvent<HTMLSelectElement>) => {
    let o;
    for (const el of emailAddHelperRef.current!.children) {
      const opt = el as HTMLOptionElement;
      console.log(opt.value === e.currentTarget.value.toLowerCase());
      if (opt.value === e.currentTarget.value.toLowerCase()) {
        o = opt;
        break;
      }
    }
    o && (o.selected = true);
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
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }
          // 주소 할당
          setValue("addr", addr);
          trigger("addr");
        },
      }).open();
    }
  };

  //이미지 미리보기
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // const maxFileSize=1*1024;//1kb 제한 테스트용
      const maxFileSize = 20 * 1024 * 1024; //20MB
      if (file.size > maxFileSize) {
        alertError({
          message: "첨부파일의 용량이 초과하였습니다. 작은 파일을 선택해주세요",
        });
        e.target.value = "";
        setPreview(dafaultimg);
        setProfile(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        //파일 stream이 읽어오는 영역
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfile(file);
    }
  };

  // 렌더링
  return (
    <div className={styles.container}>
      <form className={styles.form_wrap} onSubmit={handleSubmit(onValid)}>
        {/* ID */}
        <div className={styles.form_box}>
          <label className={styles.label}>
            아이디<span className="required">*</span>
          </label>
          <div className={styles.userid_box}>
            <Input {...register("userAccount")} />
            <Button type="button" onClick={idCheck}>
              중복체크
            </Button>
          </div>
          <Error isError={Boolean(errors.userAccount)}>
            {errors.userAccount && errors.userAccount.message?.toString()}
          </Error>
        </div>

        {/* 비밀번호 */}
        <div className={styles.form_box}>
          <label className={styles.label}>
            비밀번호 <span className="required">*</span>
            <p style={{ color: "gray", fontSize: "12px" }}>
              첫 글자가 영대문자이며, 영소문자/숫자/특수문자(!@#$%^()*)를
              포함하여 10~16자리여야 합니다.
            </p>
          </label>
          <div className={styles.password_box}>
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className={styles.input_with_icon}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.icon_toggle}
            />
          </div>
          <Error isError={Boolean(errors.password)}>
            {errors.password && errors.password.message?.toString()}
          </Error>
        </div>

        {/* 비밀번호 재입력 */}
        <div className={styles.form_box}>
          <label className={styles.label}>
            비밀번호 재입력 <span className="required">*</span>
          </label>
          <div className={styles.password_box}>
            <Input
              {...register("passwordCheck")}
              type={showCheckPassword ? "text" : "password"}
              className={styles.input_with_icon}
            />
            <FontAwesomeIcon
              icon={showCheckPassword ? faEyeSlash : faEye}
              onClick={() => setShowCheckPassword((prev) => !prev)}
              className={styles.icon_toggle}
            />
          </div>
          <Error isError={Boolean(errors.passwordCheck)}>
            {errors.passwordCheck && errors.passwordCheck.message?.toString()}
          </Error>
        </div>

        {/* 닉네임 */}
        <div className={styles.form_box}>
          <label className={styles.label}>
            이름 <span className="required">*</span>
          </label>
          <Input {...register("nickname")} />
          <Error isError={Boolean(errors.nickname)}>
            {errors.nickname && errors.nickname.message?.toString()}
          </Error>
        </div>

        {/* 생년월일 */}
        <div className={styles.form_box}>
          <label className={styles.label}>
            생년월일 <span className="required">*</span>
          </label>
          <Input
            {...register("birthday")}
            type="date"
            className={styles.input}
          />
          <Error isError={Boolean(errors.birthday)}>
            {errors.birthday && errors.birthday.message?.toString()}
          </Error>
        </div>

        {/* 성별 */}
        <div className={styles.form_box}>
          <div className={styles.label}>
            성별 <span className="required">*</span>
          </div>
          <div className={styles.gender_group}>
            <label className={styles.gender_item}>
              {" "}
              <Radio {...register("gender")} value="4001" /> 남성{" "}
            </label>
            <label className={styles.gender_item}>
              {" "}
              <Radio {...register("gender")} value="4002" /> 여성{" "}
            </label>
          </div>
          <Error isError={Boolean(errors.gender)}>
            {errors.gender && errors.gender.message?.toString()}
          </Error>
        </div>

        {/* 휴대폰번호 */}
        <div className={styles.form_box}>
          <label className={styles.label}>
            휴대폰번호 <span className="required">*</span>
            <p style={{ color: "gray" }}>
              숫자를 입력하시면 하이푼(-)이 자동으로 입력됩니다
            </p>
          </label>
          <Input {...register("phone")} onChange={onChangePhoneHelper} />
          <Error isError={Boolean(errors.phone)}>
            {errors.phone && errors.phone.message?.toString()}
          </Error>
        </div>

        {/* 주소 */}
        <div className={styles.form_box}>
          <label className={styles.label}>
            주소 <span className="required">*</span>
          </label>
          <div className={styles.form_box}>
            <div className={styles.addr_detail_box}>
              <Input {...register("addr")} type="text" readOnly />
              <Button
                type="button"
                onClick={onOpenDaumAddrAPI}
                className={styles.locationbutton}
              >
                <img
                  className={styles.locationicon}
                  src="/images/locationicon.png"
                  alt=""
                />
              </Button>
            </div>
            <Input {...register("detailAddr")} type="text" />
          </div>
          <Error isError={Boolean(errors.addr)}>
            {errors.addr && errors.addr.message?.toString()}
          </Error>
        </div>

        {/* 이메일 */}
        <div className={styles.form_box}>
          <label className={styles.label}>
            이메일 <span className="required">*</span>
          </label>
          <div className={styles.form_box}>
            <div className={styles.email_account_box}>
              <Input {...register("email")} />
              <div>@</div>
            </div>
            <Error isError={Boolean(errors.email)}>
              {errors.email && errors.email.message?.toString()}
            </Error>
            {/* 이메일 도메인 */}
            <div className={styles.email_addr_box}>
              <Input
                {...register("emailAddr", { onChange: onChangeEmailAddr })}
              />
              <Select
                {...register("emailAddr")}
                ref={emailAddHelperRef}
                onChange={onChangeEmailAddrHelper}
                className={styles.select}
              >
                <option value="">직접입력</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="nate.com">nate.com</option>
              </Select>
            </div>
            <Error isError={Boolean(errors.emailAddr)}>
              {errors.emailAddr && errors.emailAddr.message?.toString()}
            </Error>
            <div className={styles.email_check_box}>
              {showCodeInput && (
                <div className={styles.codeInputWrapper}>
                  <Input
                    placeholder="인증번호를 입력하세요"
                    value={emailCodeVerified}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmailCodeVerified(e.target.value)
                    }
                  />
                  {count > 0 && (
                    <span className={styles.timer}>
                      {Math.floor(count / 60)
                        .toString()
                        .padStart(2, "0")}
                      :{(count % 60).toString().padStart(2, "0")}
                    </span>
                  )}
                </div>
              )}
              <Button type="button" onClick={handleEmailVerifiedClick}>
                {" "}
                {showCodeInput ? "인증번호 확인" : "이메일 인증"}
              </Button>
            </div>
          </div>
        </div>

        {/* 프로필 사진 */}
        <div className={styles.form_box}>
          <label className={styles.label}>프로필 사진</label>
          <File onChange={handleFileChange} />
          <p>
            첨부 파일은 최대 20MB까지 등록 가능합니다. 이미지 비율은 1:1입니다.
          </p>
          {preview && (
            <img
              src={preview as string}
              alt=""
              style={{
                width: "4.571rem",
                height: "4.571rem",
                borderRadius: "50%",
              }}
            />
          )}
        </div>

        <div className={styles.btn_group}>
          <Button type="submit">제출</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
