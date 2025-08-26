import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faTimes,
  faArrowLeft,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { Button, Error, Input, TextArea, Select } from "../../../components/ui";
import { useAlert, useAPI } from "../../../hooks";
import styles from "./board.module.css";

interface BoardFormData {
  title: string;
  category: string;
  contents: string;
}

// 폼 검증 스키마
const schema = yup
  .object({
    title: yup
      .string()
      .required("제목은 필수입니다.")
      .min(2, "제목은 2자 이상 입력해주세요.")
      .max(100, "제목은 100자 이하로 입력해주세요."),
    category: yup.string().required("카테고리를 선택해주세요."),
    contents: yup
      .string()
      .required("내용은 필수입니다.")
      .min(10, "내용은 10자 이상 입력해주세요."),
  })
  .required();

const BoardForm: React.FC = () => {
  const api = useAPI();
  const navigate = useNavigate();
  const { alertError, alertSuccess } = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<BoardFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchedTitle = watch("title");
  const watchedContents = watch("contents");

  /**
   * 서브밋 핸들러
   */
  const onSubmit = async (data: BoardFormData) => {
    try {
      setIsSubmitting(true);

      // API 호출 (현재는 더미 성공 처리)
      // const res = await api.post('/board/add', data);
      // if (res.data.code === '0000') {
      //   alertSuccess({
      //     message: res.data.message,
      //     onClose: () => navigate('/board/boardList')
      //   });
      // } else {
      //   alertError();
      // }

      // 더미 성공 처리
      alertSuccess({
        message: "게시글이 성공적으로 등록되었습니다!",
        onClose: () => {
          setTimeout(() => navigate("/board/boardList"), 1000);
        },
      });
    } catch (error) {
      alertError({ error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (watchedTitle || watchedContents) {
      if (
        window.confirm("작성 중인 내용이 있습니다. 정말로 취소하시겠습니까?")
      ) {
        navigate("/board/boardList");
      }
    } else {
      navigate("/board/boardList");
    }
  };

  return (
    <div className={styles.form_container}>
      {/* 헤더 영역 */}
      <div className={styles.form_header}>
        <div className={styles.header_content}>
          <h1 className={styles.page_title}>
            <FontAwesomeIcon icon={faEdit} className={styles.title_icon} />
            게시글 작성
          </h1>
          <p className={styles.page_description}>
            농업인들과 공유할 정보를 작성해주세요
          </p>
        </div>
      </div>

      {/* 폼 영역 */}
      <div className={styles.form_wrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* 제목 입력 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>
              <FontAwesomeIcon icon={faFileAlt} className={styles.label_icon} />
              제목
              <span className={styles.required}>*</span>
            </label>
            <Input
              type="text"
              placeholder="게시글 제목을 입력하세요"
              className={`${styles.form_input} ${
                errors.title ? styles.input_error : ""
              }`}
              {...register("title")}
            />
            {errors.title && (
              <Error isError={true} className={styles.error_message}>
                {errors.title.message}
              </Error>
            )}
            <div className={styles.character_count}>
              {watchedTitle?.length || 0}/100
            </div>
          </div>

          {/* 카테고리 선택 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>
              <FontAwesomeIcon icon={faFileAlt} className={styles.label_icon} />
              카테고리
              <span className={styles.required}>*</span>
            </label>
            <Select
              className={`${styles.form_select} ${
                errors.category ? styles.input_error : ""
              }`}
              {...register("category")}
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="질문">질문</option>
              <option value="후기">후기</option>
              <option value="정보">정보</option>
              <option value="동향">동향</option>
              <option value="일반">일반</option>
            </Select>
            {errors.category && (
              <Error isError={true} className={styles.error_message}>
                {errors.category.message}
              </Error>
            )}
          </div>

          {/* 내용 입력 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>
              <FontAwesomeIcon icon={faFileAlt} className={styles.label_icon} />
              내용
              <span className={styles.required}>*</span>
            </label>
            <TextArea
              placeholder="게시글 내용을 입력하세요"
              className={`${styles.form_textarea} ${
                errors.contents ? styles.input_error : ""
              }`}
              {...register("contents")}
            />
            {errors.contents && (
              <Error isError={true} className={styles.error_message}>
                {errors.contents.message}
              </Error>
            )}
            <div className={styles.character_count}>
              {watchedContents?.length || 0}자
            </div>
          </div>

          {/* 작성 가이드 */}
          <div className={styles.writing_guide}>
            <h4 className={styles.guide_title}>
              <FontAwesomeIcon icon={faFileAlt} />
              작성 가이드
            </h4>
            <ul className={styles.guide_list}>
              <li>제목은 명확하고 구체적으로 작성해주세요</li>
              <li>내용은 다른 사용자들이 이해하기 쉽게 작성해주세요</li>
              <li>농업과 관련된 유용한 정보를 공유해주세요</li>
              <li>욕설이나 비방성 내용은 삼가해주세요</li>
            </ul>
          </div>

          {/* 액션 버튼들 */}
          <div className={styles.form_actions}>
            <Button
              type="button"
              onClick={handleCancel}
              className={styles.cancel_button}
              color="secondary"
            >
              <FontAwesomeIcon icon={faTimes} />
              취소
            </Button>
            <Button
              type="submit"
              className={styles.submit_button}
              color="point2"
              disabled={!isValid || isSubmitting}
            >
              <FontAwesomeIcon icon={faSave} />
              {isSubmitting ? "등록 중..." : "등록하기"}
            </Button>
          </div>
        </form>
      </div>

      {/* 뒤로가기 버튼 */}
      <div className={styles.back_button_area}>
        <Button
          onClick={() => navigate("/board/boardList")}
          className={styles.back_button}
          color="secondary"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          목록으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default BoardForm;
