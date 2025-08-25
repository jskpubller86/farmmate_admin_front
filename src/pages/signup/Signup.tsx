import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button, Error, File, Input, Radio, Select } from "../../components/ui";
import { useAlert, useAPI, useDaumAddr } from "../../hooks";
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

const Signup: React.FC = () => {
  const [idMessage, setIdMessage] = useState("");
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();
  const api = useAPI();
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [emailCodeVerified, setEmailCodeVerified] = useState("");
  const getDaum = useDaumAddr();
  const detailAddrRef = useRef<HTMLInputElement>(null);
  const emailAddHelperRef = useRef<HTMLSelectElement>(null);
  const [count, setCount] = useState(0);
  const { alertError, alertSuccess, alertWarn } = useAlert();
  const dafaultimg = "/images/img_profile.svg";
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(
    dafaultimg
  );
  const [profile, setProfile] = useState<File | null>(null);

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

  const onValid = async (data: any) => {
    if (!isIdVerified) {
      alertError({ message: "아이디 중복체크를 먼저 완료해주세요." });
      return;
    }
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

  useEffect(() => {
    const idInput = watch((value, { name }) => {
      if (name === "userAccount") {
        const currentValue = value.userAccount || "";
        const filteredValue = currentValue.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
        setIsIdVerified(false);
        setIdMessage("");
        if (currentValue !== filteredValue) {
          setValue("userAccount", filteredValue);
        }
      }
    });
    return () => idInput.unsubscribe();
  }, [watch, setValue]);

  useEffect(() => {
    const emailInput = watch((value, { name }) => {
      if (name === "email") {
        const currentValue = value.email || "";
        const filteredValue = currentValue.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
        setIsEmailVerified(false);
        setEmailMessage("");
        setShowCodeInput(false);
        setEmailCodeVerified("");
        if (currentValue !== filteredValue) {
          setValue("email", filteredValue);
        }
      }
    });
    return () => emailInput.unsubscribe();
  }, [watch, setValue]);

  const idCheck = async () => {
    const userAccount = getValues("userAccount");
    try {
      const res = await api.get(`/auth/idCheck`, { userAccount });
      alertSuccess({ message: "사용 가능한 아이디 입니다" });
      setIdMessage("");
      setIsIdVerified(true);
    } catch (err: any) {
      if (err.response?.data?.code === "VD03") {
        setIdMessage("이미 사용 중인 아이디입니다.");
        alertError({ message: "이미 사용 중인 아이디입니다." });
      }
      setIsIdVerified(false);
    }
  };

  const onChangePhoneHelper = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length <= 3) {
    } else if (value.length <= 7) {
      value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }
    if (value.length > 13) value = value.slice(0, 13);
    setValue("phone", value);
    trigger("phone");
  };

  const sendEmailCode = async () => {
    const fullEmail = `${getValues("email")}@${getValues("emailAddr")}`;
    try {
      alertWarn({ message: "인증번호 발송 중" });
      const res = await api.postWithJson(`/email/emailCheck`, {
        email: fullEmail,
      });
      if (res.data.code === "0000") {
        alertSuccess({ message: "인증번호가 발송되었습니다" });
        setEmailMessage("인증 번호가 발송되었습니다");
        setIsEmailVerified(false);
        setShowCodeInput(true);
        setCount(180);
      } else {
        alert(`인증번호 발송 실패: ${res.data.message || res.data.code}`);
        setShowCodeInput(false);
      }
    } catch (err: any) {
      if (err.response?.data?.code === "VD04") {
        setEmailMessage("이미 사용 중인 이메일입니다.");
        alertError({ message: "이미 사용 중인 이메일입니다." });
        setShowCodeInput(false);
      }
      setEmailMessage("");
      setIsEmailVerified(false);
      setEmailCodeVerified("");
    }
  };

  useEffect(() => {
    if (count <= 0) return;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowCodeInput(false);
          setEmailMessage("인증 시간이 만료되었습니다. 다시 시도해주세요.");
          setIsEmailVerified(false);
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
        setCount(0);
      } else if (code === "0000" && !data?.success) {
        const reason = data?.reason || "인증 실패";
        alertError({ message: `인증 실패: ${reason}` });
        setIsEmailVerified(false);
      } else {
        alert("알수없는 오류");
      }
    } catch (err: any) {
      if (err.response?.data?.code === "AU03") {
        alertError({
          message:
            "3회 이상 인증번호를 틀려 더 이상 시도할 수 없습니다. 다시 인증번호를 요청하세요.",
        });
        setShowCodeInput(false);
      } else if (err.response?.data?.code === "AU01") {
        alertError({ message: "인증번호가 틀렸습니다." });
        setIsEmailVerified(false);
      } else if (err.response?.data?.code === "AU02") {
        alertError({ message: "인증번호가 만료되었습니다." });
        setIsEmailVerified(false);
      }
    }
  };

  const handleEmailVerifiedClick = async () => {
    const emailIsValid = await trigger(["email", "emailAddr"]);
    if (!emailIsValid) {
      alertError({ message: "이메일 주소를 올바르게 입력해주세요." });
      return;
    }
    if (!showCodeInput) {
      await sendEmailCode();
      setShowCodeInput(true);
    } else {
      await checkEmailCode();
    }
  };

  const onChangeEmailAddrHelper = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setValue("emailAddr", value);
    trigger("emailAddr");
  };

  const onChangeEmailAddr = (e: ChangeEvent<HTMLSelectElement>) => {
    let o;
    for (const el of emailAddHelperRef.current!.children) {
      const opt = el as HTMLOptionElement;
      if (opt.value === e.currentTarget.value.toLowerCase()) {
        o = opt;
        break;
      }
    }
    o && (o.selected = true);
  };

  const onOpenDaumAddrAPI = (e: React.MouseEvent<HTMLElement>) => {
    const daum = getDaum();
    if (daum) {
      new daum.Postcode({
        oncomplete: function (data: any) {
          var addr = "";
          if (data.userSelectedType === "R") {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }
          setValue("addr", addr);
          trigger("addr");
        },
      }).open();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const maxFileSize = 20 * 1024 * 1024;
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
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfile(file);
    }
  };

  return (
    <div className={styles.signup_container}>
      <main className={styles.signup_main_box}>
        <h1 className={styles.signup_main_h1}>회원가입</h1>

        <form
          className={styles.signup_form_wrap}
          onSubmit={handleSubmit(onValid)}
        >
          {/* 아이디 */}
          <div className={styles.input_group}>
            <label className={styles.label}>아이디 *</label>
            <div className={styles.id_input_box}>
              <Input
                {...register("userAccount")}
                className={styles.input_field}
              />
              <Button
                type="button"
                color="point2"
                onClick={idCheck}
                className={styles.id_check_button}
              >
                중복확인
              </Button>
            </div>
            <Error isError={Boolean(errors.userAccount)}>
              {errors.userAccount && errors.userAccount.message?.toString()}
            </Error>
          </div>

          {/* 비밀번호 */}
          <div className={styles.input_group}>
            <label className={styles.label}>비밀번호 *</label>
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
            <p className={styles.password_help}>
              첫 글자가 영대문자이며, 영소문자/숫자/특수문자(!@#$%^()*)를
              포함하여 10~16자리여야 합니다.
            </p>
            <Error isError={Boolean(errors.password)}>
              {errors.password && errors.password.message?.toString()}
            </Error>
          </div>

          {/* 비밀번호 재입력 */}
          <div className={styles.input_group}>
            <label className={styles.label}>비밀번호 재입력 *</label>
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

          {/* 이름 */}
          <div className={styles.input_group}>
            <label className={styles.label}>이름 *</label>
            <Input {...register("nickname")} className={styles.input_field} />
            <Error isError={Boolean(errors.nickname)}>
              {errors.nickname && errors.nickname.message?.toString()}
            </Error>
          </div>

          {/* 생년월일 */}
          <div className={styles.input_group}>
            <label className={styles.label}>생년월일 *</label>
            <Input
              {...register("birthday")}
              type="date"
              className={styles.input_field}
            />
            <Error isError={Boolean(errors.birthday)}>
              {errors.birthday && errors.birthday.message?.toString()}
            </Error>
          </div>

          {/* 성별 */}
          <div className={styles.input_group}>
            <label className={styles.label}>성별 *</label>
            <div className={styles.gender_group}>
              <label className={styles.gender_item}>
                <Radio {...register("gender")} value="4001" />
                <span>남성</span>
              </label>
              <label className={styles.gender_item}>
                <Radio {...register("gender")} value="4002" />
                <span>여성</span>
              </label>
            </div>
            <Error isError={Boolean(errors.gender)}>
              {errors.gender && errors.gender.message?.toString()}
            </Error>
          </div>

          {/* 휴대폰번호 */}
          <div className={styles.input_group}>
            <label className={styles.label}>휴대폰번호 *</label>
            <Input
              {...register("phone")}
              onChange={onChangePhoneHelper}
              className={styles.input_field}
            />
            <p className={styles.phone_help}>
              숫자를 입력하시면 하이푼(-)이 자동으로 입력됩니다
            </p>
            <Error isError={Boolean(errors.phone)}>
              {errors.phone && errors.phone.message?.toString()}
            </Error>
          </div>

          {/* 주소 */}
          <div className={styles.input_group}>
            <label className={styles.label}>주소 *</label>
            <div className={styles.addr_detail_box}>
              <Input
                {...register("addr")}
                type="text"
                readOnly
                className={styles.addr_input}
              />
              <Button
                type="button"
                onClick={onOpenDaumAddrAPI}
                className={styles.location_button}
              >
                주소검색
              </Button>
            </div>
            <Input
              {...register("detailAddr")}
              type="text"
              placeholder="상세주소"
              className={styles.input_field}
            />
            <Error isError={Boolean(errors.addr)}>
              {errors.addr && errors.addr.message?.toString()}
            </Error>
          </div>

          {/* 이메일 */}
          <div className={styles.input_group}>
            <label className={styles.label}>이메일 *</label>
            <div className={styles.email_account_box}>
              <Input {...register("email")} className={styles.email_input} />
              <span className={styles.email_at}>@</span>
            </div>
            <Error isError={Boolean(errors.email)}>
              {errors.email && errors.email.message?.toString()}
            </Error>

            <div className={styles.email_addr_box}>
              <Input
                {...register("emailAddr", { onChange: onChangeEmailAddr })}
                className={styles.email_domain_input}
              />
              <Select
                {...register("emailAddr")}
                ref={emailAddHelperRef}
                onChange={onChangeEmailAddrHelper}
                className={styles.email_select}
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
                <div className={styles.code_input_wrapper}>
                  <Input
                    placeholder="인증번호를 입력하세요"
                    value={emailCodeVerified}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmailCodeVerified(e.target.value)
                    }
                    className={styles.code_input}
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
              <Button
                type="button"
                color="point2"
                onClick={handleEmailVerifiedClick}
                className={styles.email_auth_button}
              >
                {showCodeInput ? "인증번호 확인" : "이메일 인증"}
              </Button>
            </div>
          </div>

          {/* 프로필 사진 */}
          <div className={styles.input_group}>
            <label className={styles.label}>프로필 사진</label>
            <File onChange={handleFileChange} className={styles.file_input} />
            <p className={styles.file_help}>
              첨부 파일은 최대 20MB까지 등록 가능합니다. 이미지 비율은
              1:1입니다.
            </p>
            {preview && (
              <img
                src={preview as string}
                alt="프로필 미리보기"
                className={styles.profile_preview}
              />
            )}
          </div>

          <Button type="submit" color="point2" className={styles.submit_button}>
            제출
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
