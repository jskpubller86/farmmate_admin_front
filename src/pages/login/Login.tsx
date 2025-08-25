import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Error, Input } from "../../components/ui";
import { useAuth, useAlert, useModal, useAPI } from "../../hooks";
import { rememberMeHelper } from "../../utils";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    account: yup.string().required("아이디는 필수입니다."),
    pwd: yup.string().required("비밀번호는 필수입니다."),
    [rememberMeHelper.name]: yup.boolean(),
  })
  .required();

const Login: React.FC = () => {
  const { alertWarn, alertSuccess, alertError } = useAlert();
  const { openModal, closeModal } = useModal();
  const api = useAPI();
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

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
          rememberMeHelper.removeRemember();
          return false;
        } else {
          return rememberMeHelper.isValidRemember();
        }
      })(),
    },
  });

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

  const handleRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      rememberMeHelper.removeRemember();
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const resp = await api.post("/auth/signIn", data);
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
          팜메이트 설명 간략하게 한줄로 정리한 내용이 들어가는 글씨 칸 이게
          밑에보다 길어야합니다.
        </p>
        <p className={styles.login_main_sub_p}>
          한번의 로그인으로 팜메이트의 모든 서비스를 이용하세요!
        </p>

        {/* 로그인 폼 */}
        <form
          className={styles.login_form_wrap}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {/* 아이디 */}
          <div className={styles.input_group}>
            <label className={styles.label}>아이디 *</label>
            <Input {...register("account")} className={styles.input_field} />
            <Error isError={Boolean(errors.account)}>
              {errors.account && errors.account.message?.toString()}
            </Error>
          </div>

          {/* 비밀번호 */}
          <div className={styles.input_group}>
            <label className={styles.label}>비밀번호 *</label>
            <Input
              type="password"
              {...register("pwd")}
              className={styles.input_field}
            />
            <Error isError={Boolean(errors.pwd)}>
              {errors.pwd && errors.pwd.message?.toString()}
            </Error>
          </div>

          {/* 로그인 버튼 */}
          <Button type="submit" color="point2" className={styles.login_button}>
            로그인
          </Button>

          {/* 아이디 / 비밀번호 찾기 */}
          <nav className={styles.find_idpwd}>
            <Link to="/findaccount">아이디/비밀번호 찾기</Link>
          </nav>

          {/* 소셜 로그인 */}
          <div className={styles.social_login_box}>
            <Button
              type="button"
              color="point2"
              className={`${styles.social_login_item} ${styles.social_login_item_google}`}
            >
              G
            </Button>
            <Button
              type="button"
              color="point2"
              className={`${styles.social_login_item} ${styles.social_login_item_kakao}`}
            >
              K
            </Button>
            <Button
              type="button"
              color="point2"
              className={`${styles.social_login_item} ${styles.social_login_item_naver}`}
            >
              N
            </Button>
          </div>

          {/* 회원가입 이동 링크 */}
          <div className={styles.signup_box}>
            아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
