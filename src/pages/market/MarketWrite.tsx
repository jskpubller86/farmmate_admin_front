import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./market.module.css";
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
    category: yup.string().required("카테고리를 선택해주세요."),
    price: yup
      .number()
      .required("가격을 입력해주세요.")
      .positive("올바른 가격을 입력해주세요."),
    unit: yup.string().required("단위를 선택해주세요."),
    quantity: yup
      .number()
      .required("수량을 입력해주세요.")
      .positive("올바른 수량을 입력해주세요."),
    address1: yup.string().required("주소를 입력해주세요."),
    address2: yup.string().required("상세주소를 입력해주세요."),
    deliveryOption: yup.string().required("배송 옵션을 선택해주세요."),
    condition: yup.string().required("상품 상태를 선택해주세요."),
  })
  .required();

type FormValues = {
  title: string;
  content: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  address1: string;
  address2: string;
  deliveryOption: string;
  condition: string;
};

const MarketWrite: React.FC = () => {
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
      category: "",
      unit: "",
      deliveryOption: "",
      condition: "",
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
      console.log("상품 등록 데이터:", data);
      console.log("업로드된 파일:", uploadedFile);

      // 성공 시 마켓 목록으로 이동
      setTimeout(() => {
        navigate("/market_list");
      }, 1000);
    } catch (error) {
      console.error("상품 등록 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.market_write_container}>
      <h1 className={styles.market_write_title}>상품 등록</h1>

      <form
        className={styles.market_write_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 제목 */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>📝 제목 *</label>
          <Input
            {...register("title")}
            placeholder="상품 제목을 입력하세요"
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
            placeholder="상품에 대한 상세한 설명을 입력하세요"
            className={styles.form_textarea}
          />
          <Error isError={Boolean(errors.content)}>
            {errors.content?.message}
          </Error>
        </div>

        {/* 카테고리, 가격, 단위, 수량을 그리드로 배치 */}
        <div className={styles.form_grid}>
          {/* 카테고리 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>🏷️ 카테고리 *</label>
            <Select {...register("category")} className={styles.form_select}>
              <option value="">카테고리를 선택하세요</option>
              <option value="vegetables">채소</option>
              <option value="fruits">과일</option>
              <option value="grains">곡물</option>
              <option value="dairy">유제품</option>
              <option value="meat">육류</option>
              <option value="seafood">수산물</option>
              <option value="processed">가공식품</option>
              <option value="other">기타</option>
            </Select>
            <Error isError={Boolean(errors.category)}>
              {errors.category?.message}
            </Error>
          </div>

          {/* 가격 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>💰 가격 *</label>
            <Input
              {...register("price")}
              type="number"
              placeholder="가격을 입력하세요"
              className={styles.form_input}
            />
            <Error isError={Boolean(errors.price)}>
              {errors.price?.message}
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
              <option value="박스">박스</option>
              <option value="팩">팩</option>
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

        {/* 상품 상태 */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>✨ 상품 상태 *</label>
          <Select {...register("condition")} className={styles.form_select}>
            <option value="">상품 상태를 선택하세요</option>
            <option value="new">새상품</option>
            <option value="like_new">거의 새상품</option>
            <option value="good">좋음</option>
            <option value="fair">보통</option>
            <option value="poor">낮음</option>
          </Select>
          <Error isError={Boolean(errors.condition)}>
            {errors.condition?.message}
          </Error>
        </div>

        {/* 배송 옵션 */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>🚚 배송 옵션 *</label>
          <Select
            {...register("deliveryOption")}
            className={styles.form_select}
          >
            <option value="">배송 옵션을 선택하세요</option>
            <option value="direct">직거래</option>
            <option value="delivery">택배배송</option>
            <option value="pickup">픽업</option>
            <option value="both">직거래/택배배송</option>
          </Select>
          <Error isError={Boolean(errors.deliveryOption)}>
            {errors.deliveryOption?.message}
          </Error>
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

        {/* 파일 */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>📎 상품 이미지</label>
          <div className={styles.file_section}>
            <Input
              placeholder="이미지를 선택하려면 클릭하세요"
              className={styles.form_input}
              readOnly
              onClick={handleFileUpload}
            />
            <p className={styles.file_info}>
              📎 상품 이미지는 최대 5개까지 등록 가능합니다. (각 20MB 이하)
            </p>

            {/* 파일 미리보기 */}
            <div className={styles.file_preview} onClick={handleFileUpload}>
              {filePreview ? (
                <img
                  src={filePreview}
                  alt="상품 이미지 미리보기"
                  className={styles.preview_image}
                />
              ) : (
                <div className={styles.preview_placeholder}>
                  <span className={styles.preview_icon}>📁</span>
                  <p>클릭하여 상품 이미지를 선택하세요</p>
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
            {isSubmitting ? "⏳ 등록 중..." : "🚀 상품 등록하기"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MarketWrite;
