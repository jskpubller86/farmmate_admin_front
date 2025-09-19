import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Error, Input } from "../../../components/ui";
import { useAuth, useAlert, useAPI } from "../../../hooks";
import styles from "./adminLogin.module.css";

const schema = yup
  .object({
    admin_account: yup.string().required("관리자 ID는 필수입니다."),
    pwd: yup.string().required("비밀번호는 필수입니다."),
  })
  .required();

interface AdminLoginForm {
  admin_account: string;
  pwd: string;
}

const AdminLogin: React.FC = () => {
  const { alertSuccess, alertError } = useAlert();
  const {api} = useAPI();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginForm>({
    resolver: yupResolver(schema),
  });

  // 이미 로그인된 경우 대시보드로 리다이렉트
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleFormSubmit = async (data: AdminLoginForm) => {
    
    try {
      const resp = await api.post("/auth/AdminSignIn", data);
      console.log("응답 데이터:", resp.data);
      
      // 백엔드 응답 형식에 맞게 수정: {success: true, message: "...", data: {...}}
      if (resp.data.success === true) {
        const userId = resp.data.data.userId;
        const userName = resp.data.data.userName;
        
        alertSuccess({
          message: "관리자 로그인 성공했습니다.",
          onClose: () => {
            login({ id: userId, userName: userName });
            navigate("/");
          },
        });
      } else {
        alertError({ message: "로그인 실패: " + resp.data.message });
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alertError({
        error,
        message: "관리자 로그인에 실패했습니다. 다시 시도해주세요."
      });
    }
  };

  return (
    <div className={styles.admin_login_container}>
      {/* 메인 내용 */}
      <main className={styles.admin_login_main_box}>
        <div className={styles.admin_login_header}>
          <h1 className={styles.admin_login_h1}>
            관리자 로그인
          </h1>
          <p className={styles.admin_login_p}>
            팜메이트 관리자 시스템에 접속하세요
          </p>
          <p className={styles.admin_login_sub_p}>
            관리자 권한이 필요한 기능들을 이용할 수 있습니다
          </p>
        </div>

        {/* 로그인 폼 */}
        <form
          className={styles.admin_login_form_wrap}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {/* 관리자 ID */}
          <div className={styles.input_group}>
            <label className={styles.label}>관리자 ID *</label>
            <Input 
              {...register("admin_account")} 
              className={styles.input_field}
              placeholder="관리자 ID를 입력하세요"
            />
            <Error isError={Boolean(errors.admin_account)}>
              {errors.admin_account && errors.admin_account.message?.toString()}
            </Error>
          </div>

          {/* 비밀번호 */}
          <div className={styles.input_group}>
            <label className={styles.label}>비밀번호 *</label>
            <Input
              type="password"
              {...register("pwd")}
              className={styles.input_field}
              placeholder="비밀번호를 입력하세요"
            />
            <Error isError={Boolean(errors.pwd)}>
              {errors.pwd && errors.pwd.message?.toString()}
            </Error>
          </div>

          {/* 로그인 버튼 */}
          <Button type="submit" color="point2" className={styles.admin_login_button}>
            관리자 로그인
          </Button>

          {/* 얼굴인식 로그인 버튼 */}
          <Button type="button" to={"/admin/login/face"}  color="point2" className={styles.admin_login_button}>
            얼굴인식 로그인
          </Button>

          {/* 개발용 안내 */}
          <div className={styles.dev_notice}>
            <p>개발 환경에서는 임시 관리자 계정을 사용하세요</p>
            <p>ID: admin / pwd: 1</p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminLogin;
