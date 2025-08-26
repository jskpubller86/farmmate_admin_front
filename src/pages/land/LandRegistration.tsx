import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./land.module.css";
import layout from "../../layout/layout.module.css";
import { Input, Button, TextArea, Error } from "../../components/ui";

interface FormData {
  title: string;
  content: string;
  address: string;
  detailAddress: string;
  files: File[];
}

const LandRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    address: "",
    detailAddress: "",
    files: []
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 에러 메시지 제거
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleInputChange('files', files);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    }

    if (!formData.content.trim()) {
      newErrors.content = "내용을 입력해주세요.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "주소를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제로는 API 호출로 데이터를 전송해야 합니다
      console.log("등록할 데이터:", formData);
      
      // 성공 메시지
      alert("임대 게시글이 성공적으로 등록되었습니다!");
      
      // 폼 초기화
      setFormData({
        title: "",
        content: "",
        address: "",
        detailAddress: "",
        files: []
      });
      
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddressSearch = () => {
    // 실제로는 주소 검색 API를 연동해야 합니다
    // 지금은 더미 주소를 설정합니다
    const dummyAddress = "서울특별시 강남구 테헤란로 152";
    handleInputChange('address', dummyAddress);
  };

  return (
    <div className={layout.container_full}>
      <div className={styles.land_registration_container}>
      {/* 뒤로가기 버튼 */}
      <div className={styles.back_section}>
        <Button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.back_button}
        >
          ← 이전으로
        </Button>
      </div>
      
      <h1 className={styles.registration_title}>임대등록</h1>
      
      <form onSubmit={handleSubmit} className={styles.registration_form}>
        {/* 제목 필드 */}
        <div className={styles.form_field}>
          <label htmlFor="title" className={styles.form_label}>
            제목 *
          </label>
          <Input
            type="text"
            placeholder="text"
            value={formData.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', e.target.value)}
            className={styles.form_input}
          />
          <Error isError={!!errors.title}>
            {errors.title}
          </Error>
        </div>

        {/* 내용 필드 */}
        <div className={styles.form_field}>
          <label htmlFor="content" className={styles.form_label}>
            내용 *
          </label>
          <TextArea
            placeholder="text"
            value={formData.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('content', e.target.value)}
            className={styles.form_textarea}
          />
          <Error isError={!!errors.content}>
            {errors.content}
          </Error>
        </div>

        {/* 주소 필드 */}
        <div className={styles.form_field}>
          <label htmlFor="address" className={styles.form_label}>
            주소 *
          </label>
          <div className={styles.address_input_group}>
            <Input
              type="text"
              placeholder="text"
              value={formData.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('address', e.target.value)}
              className={styles.address_input}
            />
            <Button
              type="button"
              onClick={handleAddressSearch}
              className={styles.address_search_btn}
            >
              주소검색
            </Button>
          </div>
          <Error isError={!!errors.address}>
            {errors.address}
          </Error>
        </div>

        {/* 상세주소 필드 */}
        <div className={styles.form_field}>
          <label htmlFor="detailAddress" className={styles.form_label}>
            상세주소
          </label>
          <Input
            type="text"
            placeholder="text"
            value={formData.detailAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('detailAddress', e.target.value)}
            className={styles.form_input}
          />
        </div>

        {/* 파일 첨부 필드 */}
        <div className={styles.form_field}>
          <label htmlFor="files" className={styles.form_label}>
            파일
          </label>
          <div className={styles.file_input_group}>
            <Input
              type="file"
              onChange={handleFileChange}
              className={styles.file_input}
            />
            <div className={styles.file_info}>
              첨부 파일은 최대 20MB까지 등록 가능합니다.
            </div>
          </div>
          
          {/* 선택된 파일 목록 */}
          {formData.files.length > 0 && (
            <div className={styles.selected_files}>
              {formData.files.map((file, index) => (
                <div key={index} className={styles.file_item}>
                  📎 {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 등록하기 버튼 */}
        <div className={styles.submit_section}>
          <Button
            type="submit"
            className={styles.submit_button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "등록 중..." : "등록하기"}
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default LandRegistration;
