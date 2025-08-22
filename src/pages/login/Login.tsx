import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Error, Input } from "../../components/ui";
import { useAuth, useAlert, useModal, useAPI } from "../../hooks";
import { rememberMeHelper } from "../../utils";

// 폼검증에 사용할 스키마
const schema = yup
  .object({
    account: yup.string().required("아이디는 필수입니다."),
    pwd: yup
      .string()
      //.matches(/^(?=[A-Z][a-z0-9!@#$%^()*]*$)(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^()*]).{10,16}/, '아이디는 첫글자는 영대문자 시작하고 영소문자, 숫자, 특수문자(!@#$%^()*)를 조합합니다.')
      .required("비밀번호는 필수입니다."),
    [rememberMeHelper.name]: yup.boolean(),
  })
  .required();

// type FormValues = {
//   account: string;
//   pwd: string;
//   [rememberMeHelper.name]: boolean;
// };

const Login: React.FC = () => {
  const { alertWarn, alertSuccess, alertError } = useAlert();

  // 팝업
  const { openModal, closeModal } = useModal();

  // api
  const api = useAPI();

  // 사용자의 상태 저장을 위한 login 함수를 AuthContext에서 불러옴
  const { user, login, logout } = useAuth();

  // navigate 사용을 위한 선언
  const navigate = useNavigate();

  // react-hook-form설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [rememberMeHelper.name]: (() => {
        if (rememberMeHelper.isRememberExpires()) {
          // 쿠키의 유효기간이 지났다면 삭제
          rememberMeHelper.removeRemember();
          return false;
        } else {
          return rememberMeHelper.isValidRemember();
        }
      })(),
    },
  });

  /**
   * 자동로그인 정보가 있다면 로그인 시도
   */
  useEffect(() => {
    if (watch(rememberMeHelper.name)) {
      (async () => {
        try {
          const resp = await api.post("/auth/signInSuccess");

          if (resp.data.code === "0000") {
            alertSuccess({
              message: "로그인 성공했습니다.",
              onClose: () => {
                login(resp.data.data);
                navigate("/");
              },
            });
          } else {
            alertError({ message: "로그인 실패: " + resp.data.message });
          }
        } catch (error) {
          alertError({
            error,
            message: {
              AU00: "자동로그인이 만료되었습니다. 다시 로그인해주세요.",
            },
            onClose: (code) => {
              code === "AU00" && rememberMeHelper.removeRemember();
              setValue(rememberMeHelper.name, false);
            },
          });
        }
      })();
    }
  }, []);

  /**
   * 자동로그인 체크박스를 체크 해제할 때 자동로그인 정보 삭제
   * @param e
   */
  const handleRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      rememberMeHelper.removeRemember();
    }
  };

  /**
   * 로그인 form 제출 시 실행 될 함수
   */
  const handleFormSubmit = async (data: any) => {
    try {
      // 로그인 요청
      const resp = await api.post("/auth/signIn", data);

      // 응답이 정상일 경우
      if (resp.data.code === "0000") {
        const userId = resp.data.data.userId;
        alertSuccess({
          message: "로그인 성공했습니다.",
          onClose: () => {
            if (watch(rememberMeHelper.name)) {
              rememberMeHelper.saveRemember();
            }
            login({ id: userId });
            navigate("/");
          },
        });
      } else {
        alertError({ message: "로그인 실패: " + resp.data.message });
      }
    } catch (error) {
      alertError({ error });
    }
  };

  // 렌더링
  return (
    <div className={styles.login_container}>
      {/* 좌측 일러스트 */}
      <aside className={styles.login_left_img_box} aria-hidden>
        <img
          className={styles.login_left_img_item}
          src="/images/login_img.svg"
          alt="로그인이미지"
        />
      </aside>

      {/* 우측 내용 */}
      <main className={styles.login_main_box}>
        <h1 className={styles.login_main_h1}>
          팜메이트에 오신 것을 환영합니다
        </h1>
        <p className={styles.login_main_p}>
          팜메이트는 쉽고 간편하게 밭과 농사를 정리할 수 있도록 돕습니다. 현재의
          로그인으로 모든 서비스를 이용하세요!
        </p>

        {/* 로그인 폼 */}
        <form
          className={styles.login_form_wrap}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {/* 아이디 */}
          <div className={styles.userid_box}>
            <label className={styles.label}>아이디</label>
            <Input {...register("account")} />
            <Error isError={Boolean(errors.account)}>
              {errors.account && errors.account.message?.toString()}
            </Error>
          </div>

          {/* 비밀번호 */}
          <div className={styles.password_box}>
            <label className={styles.label}>비밀번호</label>
            <Input type="password" {...register("pwd")} />
            <Error isError={Boolean(errors.pwd)}>
              {errors.pwd && errors.pwd.message?.toString()}
            </Error>
          </div>

          {/* 로그인 버튼 */}
          <div className={styles.login_button_box}>
            <Button type="submit" className={styles.login_button}>
              로그인
            </Button>
          </div>

          {/* 아이디 / 비밀번호 찾기 */}
          <nav className={styles.find_idpwd}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              아이디 / 비밀번호 찾기
            </a>
          </nav>

          {/* 소셜 로그인 */}
          <ul className={styles.social_login_box} aria-hidden>
            <Button
              type="submit"
              className={`${styles.social_login_item} ${styles.social_login_item_google}`}
            >
              G
            </Button>
            <Button
              type="submit"
              className={`${styles.social_login_item} ${styles.social_login_item_kakao}`}
            >
              K
            </Button>
            <Button
              type="submit"
              className={`${styles.social_login_item} ${styles.social_login_item_naver}`}
            >
              N
            </Button>
          </ul>

          {/* 회원가입 이동 링크 */}
          <div className={styles.signup_box}>
            아직 회원이 아니신가요?{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              회원가입
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
