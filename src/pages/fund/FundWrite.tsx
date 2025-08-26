import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./fund.module.css";
import {
  Button,
  Input,
  Select,
  TextArea,
  File,
  Error,
} from "../../components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 폼 검증 스키마
const schema = yup
  .object({
    title: yup.string().required("제목은 필수입니다."),
    content: yup.string().required("내용은 필수입니다."),
    item: yup.string().required("품목을 선택해주세요."),
    unitPrice: yup
      .number()
      .required("단가를 입력해주세요.")
      .positive("올바른 단가를 입력해주세요."),
    unit: yup.string().required("단위를 선택해주세요."),
    quantity: yup
      .number()
      .required("수량을 입력해주세요.")
      .positive("올바른 수량을 입력해주세요."),
    address1: yup.string().required("주소를 입력해주세요."),
    address2: yup.string().required("상세주소를 입력해주세요."),
    startDate: yup.string().required("시작일을 선택해주세요."),
    startTime: yup.string().required("시작시간을 선택해주세요."),
    endDate: yup.string().required("종료일을 선택해주세요."),
    endTime: yup.string().required("종료시간을 선택해주세요."),
  })
  .required();

type FormValues = {
  title: string;
  content: string;
  item: string;
  unitPrice: number;
  unit: string;
  quantity: number;
  address1: string;
  address2: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
};

const FundWrite: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      item: "",
      unit: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    },
  });

  // 파일 업로드 처리
  const handleFileUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        setUploadedFile(file);

        // 이미지 미리보기 생성
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    fileInput.click();
  };

  // 주소 검색 (실제로는 주소 검색 API 연동)
  const handleAddressSearch = () => {
    // TODO: 주소 검색 API 연동
    console.log("주소 검색");
  };

  // 폼 제출 처리
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("펀드 등록 데이터:", data);
      console.log("업로드된 파일:", uploadedFile);

      // 성공 시 펀드 목록으로 이동
      setTimeout(() => {
        navigate("/fund_list");
      }, 1000);
    } catch (error) {
      console.error("펀드 등록 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.fund_write_container}>
      <h1 className={styles.fund_write_title}>펀드 등록</h1>

      <form
        className={styles.fund_write_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 제목 */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>📝 제목 *</label>
          <Input
            {...register("title")}
            placeholder="펀드 제목을 입력하세요"
            className={`${styles.form_input} ${
              errors.title ? styles.input_error : ""
            }`}
          />
          <Error isError={Boolean(errors.title)}>{errors.title?.message}</Error>
        </div>

        {/* 내용 */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>📄 내용 *</label>
          <TextArea
            {...register("content")}
            placeholder="펀드에 대한 상세한 설명을 입력하세요"
            className={styles.form_textarea}
          />
          <Error isError={Boolean(errors.content)}>
            {errors.content?.message}
          </Error>
        </div>

        {/* 품목, 단가, 단위, 수량을 그리드로 배치 */}
        <div className={styles.form_grid}>
          {/* 품목 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>🥬 품목 *</label>
            <Select {...register("item")} className={styles.form_select}>
              <option value="">품목을 선택하세요</option>
              <option value="cabbage">배추</option>
              <option value="radish">무</option>
              <option value="apple">사과</option>
              <option value="banana">바나나</option>
              <option value="carrot">당근</option>
              <option value="eggplant">가지</option>
              <option value="other">기타</option>
            </Select>
            <Error isError={Boolean(errors.item)}>{errors.item?.message}</Error>
          </div>

          {/* 단가 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>💰 단가 *</label>
            <Input
              {...register("unitPrice")}
              type="number"
              placeholder="단가를 입력하세요"
              className={styles.form_input}
            />
            <Error isError={Boolean(errors.unitPrice)}>
              {errors.unitPrice?.message}
            </Error>
          </div>

          {/* 단위 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>📏 단위 *</label>
            <Select {...register("unit")} className={styles.form_select}>
              <option value="">단위를 선택하세요</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="개">개</option>
              <option value="포기">포기</option>
              <option value="근">근</option>
            </Select>
            <Error isError={Boolean(errors.unit)}>{errors.unit?.message}</Error>
          </div>

          {/* 수량 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>🔢 수량 *</label>
            <Input
              {...register("quantity")}
              type="number"
              placeholder="수량을 입력하세요"
              className={styles.form_input}
            />
            <Error isError={Boolean(errors.quantity)}>
              {errors.quantity?.message}
            </Error>
          </div>
        </div>

        {/* 주소 */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>📍 주소 *</label>
          <div className={styles.address_inputs}>
            <Input
              {...register("address1")}
              placeholder="기본 주소를 입력하세요"
              className={styles.form_input}
            />
            <div className={styles.address_row}>
              <Input
                {...register("address2")}
                placeholder="상세 주소를 입력하세요"
                className={styles.form_input}
              />
              <Button
                type="button"
                color="secondary"
                onClick={handleAddressSearch}
                className={styles.address_search_btn}
              >
                🔍 주소검색
              </Button>
            </div>
          </div>
          <Error isError={Boolean(errors.address1 || errors.address2)}>
            {errors.address1?.message || errors.address2?.message}
          </Error>
        </div>

        {/* 시작일시 */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>🚀 시작일시 *</label>
          <div className={styles.datetime_inputs}>
            <Input
              {...register("startDate")}
              type="date"
              className={styles.form_input}
            />
            <Input
              {...register("startTime")}
              type="time"
              className={styles.form_input}
            />
          </div>
          <Error isError={Boolean(errors.startDate || errors.startTime)}>
            {errors.startDate?.message || errors.startTime?.message}
          </Error>
        </div>

        {/* 종료일시 */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>🏁 종료일시 *</label>
          <div className={styles.datetime_inputs}>
            <Input
              {...register("endDate")}
              type="date"
              className={styles.form_input}
            />
            <Input
              {...register("endTime")}
              type="time"
              className={styles.form_input}
            />
          </div>
          <Error isError={Boolean(errors.endDate || errors.endTime)}>
            {errors.endDate?.message || errors.endTime?.message}
          </Error>
        </div>

        {/* 파일 */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>📎 파일</label>
          <div className={styles.file_section}>
            <Input
              placeholder="파일을 선택하려면 클릭하세요"
              className={styles.form_input}
              readOnly
              onClick={handleFileUpload}
            />
            <p className={styles.file_info}>
              📎 첨부 파일은 최대 20MB까지 등록 가능합니다.
            </p>

            {/* 파일 미리보기 */}
            <div className={styles.file_preview} onClick={handleFileUpload}>
              {filePreview ? (
                <img
                  src={filePreview}
                  alt="파일 미리보기"
                  className={styles.preview_image}
                />
              ) : (
                <div className={styles.preview_placeholder}>
                  <span className={styles.preview_icon}>📁</span>
                  <p>클릭하여 파일을 선택하세요</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 등록 버튼 */}
        <div className={styles.form_actions}>
          <Button
            type="submit"
            color="point2"
            disabled={isSubmitting}
            className={styles.submit_button}
          >
            {isSubmitting ? "⏳ 등록 중..." : "🚀 펀드 등록하기"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FundWrite;
