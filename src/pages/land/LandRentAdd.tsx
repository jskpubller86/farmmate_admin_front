// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./land.module.css";
// import layout from "../../layout/layout.module.css";
// import { Button, Input, Select, TextArea } from "../../components/ui";

// interface RentFormData {
//   landName: string;
//   landType: string;
//   area: string;
//   price: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   detailLocation: string;
//   description: string;
//   contactInfo: string;
// }

// const LandRentAdd: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState<RentFormData>({
//     landName: "",
//     landType: "",
//     area: "",
//     price: "",
//     startDate: "",
//     endDate: "",
//     location: "",
//     detailLocation: "",
//     description: "",
//     contactInfo: ""
//   });

//   const handleInputChange = (field: keyof RentFormData, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // 실제로는 API 호출로 데이터를 저장해야 합니다
//     console.log("임차 신청 데이터:", formData);
//     alert("임차 신청이 완료되었습니다!");
//     navigate("/land");
//   };

//   const handleCancel = () => {
//     navigate("/land");
//   };

//   return (
//     <div className={layout.container_full}>
//       <div className={styles.land_rent_add_container}>
//         {/* 헤더 */}
//         <div className={styles.rent_add_header}>
//           <Button
//             type="button"
//             onClick={() => navigate(-1)}
//             className={styles.back_button}
//           >
//             ← 이전으로
//           </Button>
//           <h1 className={styles.rent_add_title}>임대 등록</h1>
//         </div>

//         {/* 폼 */}
//         <form onSubmit={handleSubmit} className={styles.rent_add_form}>
//           {/* 기본 정보 섹션 */}
//           <div className={styles.form_section}>
//             <h3 className={styles.section_title}>기본 정보</h3>
            
//             <div className={styles.form_row}>
//               <div className={styles.form_group}>
//                 <label className={styles.form_label}>토지명 *</label>
//                 <Input
//                   className={styles.form_input}
//                   value={formData.landName}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("landName", e.target.value)}
//                   placeholder="토지명을 입력하세요"
//                   required
//                 />
//               </div>
              
//               <div className={styles.form_group}>
//                 <label className={styles.form_label}>토지 유형 *</label>
//                 <Select
//                   className={styles.form_select}
//                   value={formData.landType}
//                   onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange("landType", e.target.value)}
//                   required
//                 >
//                   <option value="">선택하세요</option>
//                   <option value="농지">농지</option>
//                   <option value="임야">임야</option>
//                   <option value="대지">대지</option>
//                   <option value="기타">기타</option>
//                 </Select>
//               </div>
//             </div>

//             <div className={styles.form_row}>
//               <div className={styles.form_group}>
//                 <label className={styles.form_label}>면적 (평) *</label>
//                 <Input
//                   className={styles.form_input}
//                   type="number"
//                   value={formData.area}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("area", e.target.value)}
//                   placeholder="면적을 입력하세요"
//                   required
//                 />
//               </div>
              
//               <div className={styles.form_group}>
//                 <label className={styles.form_label}>희망 가격 (만원) *</label>
//                 <Input
//                   className={styles.form_input}
//                   type="number"
//                   value={formData.price}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("price", e.target.value)}
//                   placeholder="희망 가격을 입력하세요"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* 기간 정보 섹션 */}
//           <div className={styles.form_section}>
//             <h3 className={styles.section_title}>기간 정보</h3>
            
//             <div className={styles.form_row}>
//               <div className={styles.form_group}>
//                 <label className={styles.form_label}>시작일 *</label>
//                 <Input
//                   className={styles.form_input}
//                   type="date"
//                   value={formData.startDate}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("startDate", e.target.value)}
//                   required
//                 />
//               </div>
              
//               <div className={styles.form_group}>
//                 <label className={styles.form_label}>종료일 *</label>
//                 <Input
//                   className={styles.form_input}
//                   type="date"
//                   value={formData.endDate}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("endDate", e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* 위치 정보 섹션 */}
//           <div className={styles.form_section}>
//             <h3 className={styles.section_title}>위치 정보</h3>
            
//             <div className={styles.form_group}>
//               <label className={styles.form_label}>주소 *</label>
//               <Input
//                 className={styles.form_input}
//                 value={formData.location}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("location", e.target.value)}
//                 placeholder="주소를 입력하세요"
//                 required
//               />
//             </div>
            
//             <div className={styles.form_group}>
//               <label className={styles.form_label}>상세 주소</label>
//               <Input
//                 className={styles.form_input}
//                 value={formData.detailLocation}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("detailLocation", e.target.value)}
//                 placeholder="상세 주소를 입력하세요"
//               />
//             </div>
//           </div>

//           {/* 상세 정보 섹션 */}
//           <div className={styles.form_section}>
//             <h3 className={styles.section_title}>상세 정보</h3>
            
//             <div className={styles.form_group}>
//               <label className={styles.form_label}>상세 설명</label>
//               <TextArea
//                 className={styles.form_textarea}
//                 value={formData.description}
//                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("description", e.target.value)}
//                 placeholder="토지에 대한 상세한 설명을 입력하세요"
//               />
//             </div>
            
//             <div className={styles.form_group}>
//               <label className={styles.form_label}>연락처 *</label>
//               <Input
//                 className={styles.form_input}
//                 value={formData.contactInfo}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("contactInfo", e.target.value)}
//                 placeholder="연락처를 입력하세요"
//                 required
//               />
//             </div>
//           </div>

//           {/* 버튼 영역 */}
//           <div className={styles.form_actions}>
//             <Button
//               type="button"
//               className={styles.cancel_button}
//               onClick={handleCancel}
//             >
//               취소
//             </Button>
//             <Button
//               type="submit"
//               className={styles.submit_button}
//             >
//               임차 신청
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LandRentAdd;
export default function LandRentAdd() {
  return <div>LandRentAdd</div>;
}