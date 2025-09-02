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
  Checkbox,
} from "../../components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 폼 검증 스키마
const schema = yup
  .object({
    // 기본 상품 정보
    title: yup.string().required("제목은 필수입니다."),
    content: yup.string().required("내용은 필수입니다."),
    category: yup.string().required("카테고리를 선택해주세요."),

    // 가격 및 재고 정보
    price: yup
      .number()
      .required("가격을 입력해주세요.")
      .positive("올바른 가격을 입력해주세요."),
    originalPrice: yup.number().positive("올바른 원가를 입력해주세요."),
    unit: yup.string().required("단위를 선택해주세요."),
    quantity: yup
      .number()
      .required("수량을 입력해주세요.")
      .positive("올바른 수량을 입력해주세요."),
    minOrder: yup.number().positive("올바른 최소주문금액을 입력해주세요."),

    // 상품 특성 및 품질
    isOrganic: yup.boolean(),
    isLocal: yup.boolean(),
    condition: yup.string().required("상품 상태를 선택해주세요."),

    // 배송 및 거래 정보
    deliveryOption: yup.string().required("배송 옵션을 선택해주세요."),
    address1: yup.string().required("주소를 입력해주세요."),
    address2: yup.string().required("상세주소를 입력해주세요."),

    // 상품 상세 정보
    harvestDate: yup.string(),
    expiryDate: yup.string(),
    weight: yup.string(),
    dimensions: yup.string(),
    packaging: yup.string(),

    // 인증 및 정책
    certifications: yup.array().of(yup.string()),
    returnPolicy: yup.string(),
    shippingInfo: yup.string(),
  })
  .required();

type FormValues = {
  // 기본 상품 정보
  title: string;
  content: string;
  category: string;

  // 가격 및 재고 정보
  price: number;
  originalPrice?: number;
  unit: string;
  quantity: number;
  minOrder?: number;

  // 상품 특성 및 품질
  isOrganic: boolean;
  isLocal: boolean;
  condition: string;

  // 배송 및 거래 정보
  deliveryOption: string;
  address1: string;
  address2: string;

  // 상품 상세 정보
  harvestDate?: string;
  expiryDate?: string;
  weight?: string;
  dimensions?: string;
  packaging?: string;

  // 인증 및 정책
  certifications?: string[];
  returnPolicy?: string;
  shippingInfo?: string;
};

const MarketWrite: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [newCertification, setNewCertification] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // watch, // 현재 사용하지 않음
  } = useForm<FormValues>({
    // resolver: yupResolver(schema),
    defaultValues: {
      category: "",
      unit: "",
      deliveryOption: "",
      condition: "",
      isOrganic: false,
      isLocal: false,
      certifications: [],
    },
  });

  // 파일 업로드 처리 (다중 파일)
  const handleFileUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;

    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const newFiles = Array.from(target.files);
        const totalFiles = uploadedFiles.length + newFiles.length;

        if (totalFiles > 5) {
          alert("최대 5개까지만 업로드 가능합니다.");
          return;
        }

        setUploadedFiles((prev) => [...prev, ...newFiles]);

        // 이미지 미리보기 생성
        newFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setFilePreviews((prev) => [...prev, e.target?.result as string]);
          };
          reader.readAsDataURL(file);
        });
      }
    };

    fileInput.click();
  };

  // 파일 삭제
  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // 주소 검색 (실제로는 주소 검색 API 연동)
  const handleAddressSearch = () => {
    // TODO: 주소 검색 API 연동
    console.log("주소 검색");
  };

  // 인증서 추가
  const addCertification = () => {
    if (newCertification.trim() && certifications.length < 5) {
      setCertifications((prev) => [...prev, newCertification.trim()]);
      setNewCertification("");
      setValue("certifications", [...certifications, newCertification.trim()]);
    }
  };

  // 인증서 삭제
  const removeCertification = (index: number) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(newCertifications);
    setValue("certifications", newCertifications);
  };

  // 폼 제출 처리
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("상품 등록 데이터:", data);
      console.log("업로드된 파일:", uploadedFiles);

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
        // onSubmit={handleSubmit(onSubmit)}
      >
        {/* ===== 기본 상품 정보 ===== */}
        <div className={styles.form_section}>
          <h2 className={styles.section_title}>📝 기본 상품 정보</h2>

          {/* 제목 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>제목 *</label>
            <Input
              {...register("title")}
              placeholder="상품 제목을 입력하세요"
              className={`${styles.form_input} ${
                errors.title ? styles.input_error : ""
              }`}
            />
            <Error isError={Boolean(errors.title)}>
              {errors.title?.message}
            </Error>
          </div>

          {/* 내용 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>상세 설명 *</label>
            <TextArea
              {...register("content")}
              placeholder="상품에 대한 상세한 설명을 입력하세요"
              className={styles.form_textarea}
            />
            <Error isError={Boolean(errors.content)}>
              {errors.content?.message}
            </Error>
          </div>

          {/* 카테고리 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>카테고리 *</label>
            {/* <Select {...register("category")} className={styles.form_select}>
              <option value="">카테고리를 선택하세요</option>
              <option value="vegetables">채소</option>
              <option value="fruits">과일</option>
              <option value="grains">곡물</option>
              <option value="dairy">유제품</option>
              <option value="meat">육류</option>
              <option value="seafood">수산물</option>
              <option value="processed">가공식품</option>
              <option value="other">기타</option>
            </Select> */}
            <Error isError={Boolean(errors.category)}>
              {errors.category?.message}
            </Error>
          </div>
        </div>

        {/* ===== 가격 및 재고 정보 ===== */}
        <div className={styles.form_section}>
          <h2 className={styles.section_title}>💰 가격 및 재고 정보</h2>

          <div className={styles.form_grid}>
            {/* 가격 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>판매가 *</label>
              <Input
                {...register("price")}
                type="number"
                placeholder="판매가를 입력하세요"
                className={styles.form_input}
              />
              <Error isError={Boolean(errors.price)}>
                {errors.price?.message}
              </Error>
            </div>

            {/* 원가 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>원가</label>
              <Input
                {...register("originalPrice")}
                type="number"
                placeholder="원가를 입력하세요 (선택사항)"
                className={styles.form_input}
              />
              <Error isError={Boolean(errors.originalPrice)}>
                {errors.originalPrice?.message}
              </Error>
            </div>

            {/* 단위 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>단위 *</label>
              <Select {...register("unit")} className={styles.form_select}>
                <option value="">단위를 선택하세요</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="개">개</option>
                <option value="포기">포기</option>
                <option value="근">근</option>
                <option value="박스">박스</option>
                <option value="팩">팩</option>
                <option value="봉">봉</option>
                <option value="묶음">묶음</option>
              </Select>
              <Error isError={Boolean(errors.unit)}>
                {errors.unit?.message}
              </Error>
            </div>

            {/* 수량 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>재고 수량 *</label>
              <Input
                {...register("quantity")}
                type="number"
                placeholder="재고 수량을 입력하세요"
                className={styles.form_input}
              />
              <Error isError={Boolean(errors.quantity)}>
                {errors.quantity?.message}
              </Error>
            </div>

            {/* 최소주문금액 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>최소주문금액</label>
              <Input
                {...register("minOrder")}
                type="number"
                placeholder="최소주문금액을 입력하세요 (선택사항)"
                className={styles.form_input}
              />
              <Error isError={Boolean(errors.minOrder)}>
                {errors.minOrder?.message}
              </Error>
            </div>
          </div>
        </div>

        {/* ===== 상품 특성 및 품질 ===== */}
        <div className={styles.form_section}>
          <h2 className={styles.section_title}>✨ 상품 특성 및 품질</h2>

          <div className={styles.form_grid}>
            {/* 상품 상태 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>상품 상태 *</label>
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

            {/* 유기농 여부 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>유기농 여부</label>
              <div className={styles.checkbox_group}>
                <input
                  type="checkbox"
                  id="isOrganic"
                  {...register("isOrganic")}
                  className={styles.form_checkbox}
                />
                <label htmlFor="isOrganic" className={styles.checkbox_label}>
                  유기농 인증 상품입니다
                </label>
              </div>
            </div>

            {/* 지역특산 여부 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>지역특산 여부</label>
              <div className={styles.checkbox_group}>
                <input
                  type="checkbox"
                  id="isLocal"
                  {...register("isLocal")}
                  className={styles.form_checkbox}
                />
                <label htmlFor="isLocal" className={styles.checkbox_label}>
                  지역특산 상품입니다
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 배송 및 거래 정보 ===== */}
        <div className={styles.form_section}>
          <h2 className={styles.section_title}>🚚 배송 및 거래 정보</h2>

          <div className={styles.form_grid}>
            {/* 배송 옵션 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>배송 옵션 *</label>
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
          </div>

          {/* 주소 */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>주소 *</label>
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
        </div>

        {/* ===== 상품 상세 정보 ===== */}
        <div className={styles.form_section}>
          <h2 className={styles.section_title}>📋 상품 상세 정보</h2>

          <div className={styles.form_grid}>
            {/* 수확일 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>수확일</label>
              <Input
                {...register("harvestDate")}
                type="date"
                className={styles.form_input}
              />
            </div>

            {/* 유통기한 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>유통기한</label>
              <Input
                {...register("expiryDate")}
                type="date"
                className={styles.form_input}
              />
            </div>

            {/* 중량 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>중량</label>
              <Input
                {...register("weight")}
                placeholder="예: 2-3kg, 500g"
                className={styles.form_input}
              />
            </div>

            {/* 크기 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>크기</label>
              <Input
                {...register("dimensions")}
                placeholder="예: 길이 25-30cm"
                className={styles.form_input}
              />
            </div>

            {/* 포장 */}
            <div className={styles.form_group}>
              <label className={styles.form_label}>포장</label>
              <Input
                {...register("packaging")}
                placeholder="예: 비닐 포장, 종이 포장"
                className={styles.form_input}
              />
            </div>
          </div>
        </div>

        {/* ===== 상품 이미지 ===== */}
        <div className={styles.form_section}>
          <h2 className={styles.section_title}>📎 상품 이미지</h2>

          <div className={styles.form_group}>
            <div className={styles.file_section}>
              <div
                className={styles.file_upload_area}
                onClick={handleFileUpload}
              >
                <Input
                  placeholder="이미지를 선택하려면 클릭하세요 (최대 5개)"
                  className={styles.form_input}
                  readOnly
                />
                <Button
                  type="button"
                  color="secondary"
                  onClick={handleFileUpload}
                  className={styles.file_upload_btn}
                >
                  📁 이미지 선택
                </Button>
              </div>

              <p className={styles.file_info}>
                📎 상품 이미지는 최대 5개까지 등록 가능합니다. (각 20MB 이하)
              </p>

              {/* 파일 미리보기 */}
              {filePreviews.length > 0 && (
                <div className={styles.file_previews}>
                  {filePreviews.map((preview, index) => (
                    <div key={index} className={styles.file_preview}>
                      <img
                        src={preview}
                        alt={`상품 이미지 ${index + 1}`}
                        className={styles.preview_image}
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className={styles.remove_file_btn}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== 등록 버튼 ===== */}
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
