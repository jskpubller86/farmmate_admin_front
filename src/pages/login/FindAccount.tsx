import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Error, Input } from "../../components/ui";
import { useAlert, useAPI } from "../../hooks";
import { Link } from "react-router-dom";

// 아이디 찾기 스키마
const findIdSchema = yup
  .object({
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다.")
      .required("이메일은 필수입니다."),
    name: yup.string().required("이름은 필수입니다."),
  })
  .required();

// 비밀번호 찾기 스키마
const findPwdSchema = yup
  .object({
    account: yup.string().required("아이디는 필수입니다."),
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다.")
      .required("이메일은 필수입니다."),
  })
  .required();

const FindAccount: React.FC = () => {
  const { alertWarn, alertSuccess, alertError } = useAlert();
  const api = useAPI();
  const navigate = useNavigate();
  const [findType, setFindType] = useState<"id" | "pwd">("id");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 아이디 찾기 폼
  const {
    register: registerId,
    handleSubmit: handleSubmitId,
    formState: { errors: errorsId },
  } = useForm({
    resolver: yupResolver(findIdSchema),
  });

  // 비밀번호 찾기 폼
  const {
    register: registerPwd,
    handleSubmit: handleSubmitPwd,
    formState: { errors: errorsPwd },
  } = useForm({
    resolver: yupResolver(findPwdSchema),
  });

  // 아이디 찾기 제출
  const handleFindId = async (data: any) => {
    try {
      // 실제 API 호출 대신 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alertSuccess({
        message: "입력하신 이메일로 아이디 정보를 발송했습니다.",
        onClose: () => {
          setIsSubmitted(true);
        },
      });
    } catch (error) {
      alertError({ error });
    }
  };

  // 비밀번호 찾기 제출
  const handleFindPwd = async (data: any) => {
    try {
      // 실제 API 호출 대신 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alertSuccess({
        message: "입력하신 이메일로 비밀번호 재설정 링크를 발송했습니다.",
        onClose: () => {
          setIsSubmitted(true);
        },
      });
    } catch (error) {
      alertError({ error });
    }
  };

  // 로그인 페이지로 돌아가기
  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (isSubmitted) {
    return (
      <div className={styles.login_container}>
        <aside className={styles.login_left_img_box} aria-hidden>
          <img
            className={styles.login_left_img_item}
            src="/images/login_img.svg"
            alt="로그인이미지"
          />
        </aside>

        <main className={styles.login_main_box}>
          <div className={styles.find_result_box}>
            <h2 className={styles.find_result_h2}>
              {findType === "id" ? "아이디 찾기 완료" : "비밀번호 찾기 완료"}
            </h2>
            <p className={styles.find_result_p}>
              {findType === "id"
                ? "입력하신 이메일로 아이디 정보를 발송했습니다. 이메일을 확인해주세요."
                : "입력하신 이메일로 비밀번호 재설정 링크를 발송했습니다. 이메일을 확인해주세요."}
            </p>
            <div className={styles.find_result_buttons}>
              <Button
                color="point2"
                className={styles.find_result_button}
                onClick={handleBackToLogin}
              >
                로그인으로 돌아가기
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
          {findType === "id" ? "아이디 찾기" : "비밀번호 찾기"}
        </h1>
        <p className={styles.login_main_p}>
          {findType === "id"
            ? "가입 시 등록한 이메일과 이름을 입력해주세요."
            : "가입 시 등록한 아이디와 이메일을 입력해주세요."}
        </p>

        {/* 탭 버튼 */}
        <div className={styles.find_tab_box}>
          <button
            type="button"
            className={`${styles.find_tab_button} ${
              findType === "id" ? styles.find_tab_active : ""
            }`}
            onClick={() => setFindType("id")}
          >
            아이디 찾기
          </button>
          <button
            type="button"
            className={`${styles.find_tab_button} ${
              findType === "pwd" ? styles.find_tab_active : ""
            }`}
            onClick={() => setFindType("pwd")}
          >
            비밀번호 찾기
          </button>
        </div>

        {/* 아이디 찾기 폼 */}
        {findType === "id" && (
          <form
            className={styles.login_form_wrap}
            onSubmit={handleSubmitId(handleFindId)}
          >
            <div className={styles.input_group}>
              <label className={styles.label}>이름 *</label>
              <Input
                {...registerId("name")}
                className={styles.input_field}
                placeholder="가입 시 등록한 이름을 입력하세요"
              />
              <Error isError={Boolean(errorsId.name)}>
                {errorsId.name && errorsId.name.message?.toString()}
              </Error>
            </div>

            <div className={styles.input_group}>
              <label className={styles.label}>이메일 *</label>
              <Input
                {...registerId("email")}
                className={styles.input_field}
                placeholder="가입 시 등록한 이메일을 입력하세요"
              />
              <Error isError={Boolean(errorsId.email)}>
                {errorsId.email && errorsId.email.message?.toString()}
              </Error>
            </div>

            <Button
              type="submit"
              color="point2"
              className={styles.login_button}
            >
              아이디 찾기
            </Button>
          </form>
        )}

        {/* 비밀번호 찾기 폼 */}
        {findType === "pwd" && (
          <form
            className={styles.login_form_wrap}
            onSubmit={handleSubmitPwd(handleFindPwd)}
          >
            <div className={styles.input_group}>
              <label className={styles.label}>아이디 *</label>
              <Input
                {...registerPwd("account")}
                className={styles.input_field}
                placeholder="가입 시 등록한 아이디를 입력하세요"
              />
              <Error isError={Boolean(errorsPwd.account)}>
                {errorsPwd.account && errorsPwd.account.message?.toString()}
              </Error>
            </div>

            <div className={styles.input_group}>
              <label className={styles.label}>이메일 *</label>
              <Input
                {...registerPwd("email")}
                className={styles.input_field}
                placeholder="가입 시 등록한 이메일을 입력하세요"
              />
              <Error isError={Boolean(errorsPwd.email)}>
                {errorsPwd.email && errorsPwd.email.message?.toString()}
              </Error>
            </div>

            <Button
              type="submit"
              color="point2"
              className={styles.login_button}
            >
              비밀번호 찾기
            </Button>
          </form>
        )}

        {/* 로그인으로 돌아가기 */}
        <div className={styles.find_back_box}>
          <Link to="/login" className={styles.find_back_link}>
            로그인으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FindAccount;
