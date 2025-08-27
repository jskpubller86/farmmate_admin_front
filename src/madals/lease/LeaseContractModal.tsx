import React from "react";
import styles from "./LeaseContractModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../components/ui";
import useModal from "../../hooks/useModal";

interface LeaseContractViewProps {
  modalId?: number;
  isEditMode?: boolean;
  contractData?: {
    tenantName?: string;
    tenantContact?: string;
    tenantIdNumber?: string;
    tenantAddress?: string;
    landlordName?: string;
    landlordContact?: string;
    landlordIdNumber?: string;
    landlordAddress?: string;
    landName?: string;
    landLocation?: string;
    landUse?: string;
    deposit?: string;
    monthlyRent?: string;
    midPayment?: string;
    balance?: string;
    downPayment?: string;
    leaseStartDate?: string;
    leaseEndDate?: string;
    monthlyRentDate?: string;
    contractDate?: string;
  };
}

/**
 * 작성된 임대차 계약서 보기 모달
 * @returns
 */
const LeaseContractViewModal: React.FC<LeaseContractViewProps> = ({
  modalId,
  isEditMode = false,
  contractData = {},
}) => {
  const { closeModal } = useModal();

  // 편집 모드일 때 사용할 상태들
  const [editData, setEditData] = React.useState(contractData);

  // 임의의 데이터 (나중에 백엔드에서 받아올 데이터)
  const sampleData = {
    tenantName: "김철수",
    tenantContact: "010-1234-5678",
    tenantIdNumber: "901234-1234567",
    tenantAddress: "서울특별시 강남구 테헤란로 123, 456동 789호",
    landlordName: "박영희",
    landlordContact: "010-9876-5432",
    landlordIdNumber: "890123-2345678",
    landlordAddress: "서울특별시 강남구 역삼동 456, 789빌딩 101호",
    landName: "강남 농지",
    landLocation: "서울특별시 강남구 역삼동 123-45",
    landUse: "농작물 재배",
    deposit: "50,000,000",
    monthlyRent: "500,000",
    midPayment: "25,000,000",
    balance: "25,000,000",
    downPayment: "10,000,000",
    leaseStartDate: "2025",
    leaseEndDate: "2026",
    monthlyRentDate: "15",
    contractDate: "2025-01-15",
  };

  // contractData가 있으면 사용, 없으면 sampleData 사용
  const displayData = isEditMode ? editData : (Object.keys(contractData).length > 0 ? contractData : sampleData);

  // 편집 모드에서 입력값 변경 핸들러
  const handleInputChange = (field: string, value: string) => {
    if (isEditMode) {
      setEditData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleClose = () => {
    if (modalId) {
      closeModal(modalId);
    }
  };

  return (
    <div className={styles.modal_container_wrap}>
      <div className={styles.modal_container}>
        {/* 모달 헤더 */}
        <div className={styles.modal_header_box}>
          <button
            type="button"
            className={styles.btn_close}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* 계약서 내용 */}
        <div className={styles.contract_box}>
          {/* 갑 (임차인) 정보 */}
          <section className={styles.section_box}>
            <h3 className={styles.section_box_title}>임차인 정보</h3>
            <div className={styles.table}>
              <div className={styles.th}>이름</div>
              <div className={styles.td}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.tenantName || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('tenantName', e.target.value)}
                    placeholder="임차인 이름을 입력하세요"
                  />
                ) : (
                  displayData.tenantName || "입력된 정보가 없습니다"
                )}
              </div>
              <div className={styles.th}>연락처</div>
              <div className={styles.td}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.tenantContact || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('tenantContact', e.target.value)}
                    placeholder="연락처를 입력하세요"
                  />
                ) : (
                  displayData.tenantContact || "입력된 정보가 없습니다"
                )}
              </div>
              <div className={styles.th}>주민등록번호</div>
              <div className={styles.td}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.tenantIdNumber || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('tenantIdNumber', e.target.value)}
                    placeholder="주민등록번호를 입력하세요"
                  />
                ) : (
                  displayData.tenantIdNumber || "입력된 정보가 없습니다"
                )}
              </div>

              <div className={styles.th}>주소</div>
              <div className={`${styles.td} ${styles.td_full}`}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.tenantAddress || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('tenantAddress', e.target.value)}
                    placeholder="주소를 입력하세요"
                  />
                ) : (
                  displayData.tenantAddress || "입력된 정보가 없습니다"
                )}
              </div>
            </div>
          </section>

          {/* 을 (임대인) 정보 */}
          <section className={styles.section_box}>
            <h3 className={styles.section_box_title}>임대인 정보</h3>
            <div className={styles.table}>
              <div className={styles.th}>이름</div>
              <div className={styles.td}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.landlordName || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('landlordName', e.target.value)}
                    placeholder="임대인 이름을 입력하세요"
                  />
                ) : (
                  displayData.landlordName || "입력된 정보가 없습니다"
                )}
              </div>
              <div className={styles.th}>연락처</div>
              <div className={styles.td}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.landlordContact || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('landlordContact', e.target.value)}
                    placeholder="연락처를 입력하세요"
                  />
                ) : (
                  displayData.landlordContact || "입력된 정보가 없습니다"
                )}
              </div>
              <div className={styles.th}>주민등록번호</div>
              <div className={styles.td}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.landlordIdNumber || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('landlordIdNumber', e.target.value)}
                    placeholder="주민등록번호를 입력하세요"
                  />
                ) : (
                  displayData.landlordIdNumber || "입력된 정보가 없습니다"
                )}
              </div>

              <div className={styles.th}>주소</div>
              <div className={`${styles.td} ${styles.td_full}`}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.landlordAddress || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('landlordAddress', e.target.value)}
                    placeholder="주소를 입력하세요"
                  />
                ) : (
                  displayData.landlordAddress || "입력된 정보가 없습니다"
                )}
              </div>
            </div>
          </section>

          {/* 체결 문구 */}
          <p className={styles.note_box}>
            <strong>
              임대인과 임차인은 아래 토지(땅)에 대한 임대차 계약을 다음과 같이
              체결한다.
            </strong>
          </p>

          {/* 임대할 토지의 표시*/}
          <section className={styles.section_box}>
            <h3 className={styles.section_box_title}>임대할 토지의 표시</h3>
            <div className={styles.table_col2}>
              <div className={styles.th}>이름</div>
              <div className={styles.td}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.landName || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('landName', e.target.value)}
                    placeholder="토지 이름을 입력하세요"
                  />
                ) : (
                  displayData.landName || "입력된 정보가 없습니다"
                )}
              </div>

              <div className={styles.th}>임대할 토지(땅)</div>
              <div className={styles.td}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.landLocation || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('landLocation', e.target.value)}
                    placeholder="토지 위치를 입력하세요"
                  />
                ) : (
                  displayData.landLocation || "입력된 정보가 없습니다"
                )}
              </div>

              <div className={styles.th}>사용여부</div>
              <div className={styles.td}>
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.landUse || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('landUse', e.target.value)}
                    placeholder="토지 용도를 입력하세요"
                  />
                ) : (
                  displayData.landUse || "입력된 정보가 없습니다"
                )}
              </div>
            </div>
          </section>

          {/* 지급 조건 */}
          <section className={styles.section_box}>
            <h3 className={styles.section_title}>
              보증금과 월세(임차)금의 지불방법(지불약정)
            </h3>
            <div className={styles.table_money}>
              <div className={styles.th}>임대보증금</div>
              <div className={`${styles.td_inline} ${styles.center_align}`}>
                금 {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.deposit || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('deposit', e.target.value)}
                    placeholder="보증금을 입력하세요"
                  />
                ) : (
                  displayData.deposit || "입력된 정보가 없습니다"
                )} 원
              </div>
              <div className={styles.th}>월세</div>
              <div className={`${styles.td_inline} ${styles.center_align}`}>
                ₩ {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.monthlyRent || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('monthlyRent', e.target.value)}
                    placeholder="월세를 입력하세요"
                  />
                ) : (
                  displayData.monthlyRent || "입력된 정보가 없습니다"
                )} 원정
              </div>

              <div className={styles.th}>계약금</div>
              <div className={`${styles.td_inline} ${styles.td_full} ${styles.center_align}`}>
                금 {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.downPayment || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('downPayment', e.target.value)}
                    placeholder="계약금을 입력하세요"
                  />
                ) : (
                  displayData.downPayment || "입력된 정보가 없습니다"
                )} 원정은
                계약시 지불한다.(영수함)
              </div>

              <div className={styles.th}>중도금</div>
              <div
                className={`${styles.td_inline} ${styles.td_full} ${styles.center_align}`}
              >
                금 {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.midPayment || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('midPayment', e.target.value)}
                    placeholder="중도금을 입력하세요"
                  />
                ) : (
                  displayData.midPayment || "입력된 정보가 없습니다"
                )} 원정은{" "}
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.leaseStartDate || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('leaseStartDate', e.target.value)}
                    placeholder="시작년도"
                    className={styles.inline_input}
                  />
                ) : (
                  displayData.leaseStartDate || "입력된 정보가 없습니다"
                )} 년{" "}
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.leaseEndDate || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('leaseEndDate', e.target.value)}
                    placeholder="종료년도"
                    className={styles.inline_input}
                  />
                ) : (
                  displayData.leaseEndDate || "입력된 정보가 없습니다"
                )} 일
                지불한다.
              </div>

              <div className={styles.th}>잔금</div>
              <div
                className={`${styles.td_inline} ${styles.td_full} ${styles.center_align}`}
              >
                금 {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.balance || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('balance', e.target.value)}
                    placeholder="잔금을 입력하세요"
                  />
                ) : (
                  displayData.balance || "입력된 정보가 없습니다"
                )} 원정은{" "}
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.leaseStartDate || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('leaseStartDate', e.target.value)}
                    placeholder="시작년도"
                    className={styles.inline_input}
                  />
                ) : (
                  displayData.leaseStartDate || "입력된 정보가 없습니다"
                )} 년{" "}
                {isEditMode ? (
                  <Input
                    type="text"
                    value={displayData.leaseEndDate || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('leaseEndDate', e.target.value)}
                    placeholder="종료년도"
                    className={styles.inline_input}
                  />
                ) : (
                  displayData.leaseEndDate || "입력된 정보가 없습니다"
                )} 일
                지불한다.
              </div>
            </div>
          </section>

          {/* 이행 약정 등 */}
          <section className={styles.section_box}>
            <div className={styles.text_content}>
              <div className={styles.text_row}>
                <span className={styles.label}>임대차기간은</span>
                <span className={styles.text}>
                  {isEditMode ? (
                    <Input
                      type="text"
                      value={displayData.leaseStartDate || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('leaseStartDate', e.target.value)}
                      placeholder="시작년도"
                      className={styles.inline_input}
                    />
                  ) : (
                    displayData.leaseStartDate || "입력된 정보가 없습니다"
                  )} 부터{" "}
                  {isEditMode ? (
                    <Input
                      type="text"
                      value={displayData.leaseEndDate || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('leaseEndDate', e.target.value)}
                      placeholder="종료년도"
                      className={styles.inline_input}
                    />
                  ) : (
                    displayData.leaseEndDate || "입력된 정보가 없습니다"
                  )} 까지{" "}
                  {displayData.leaseEndDate && displayData.leaseStartDate
                    ? "계약기간"
                    : "입력된 정보가 없습니다"}{" "}
                  이다.
                </span>
              </div>
              <div className={styles.text_row}>
                <span className={styles.label}>월세는 매월</span>
                <span className={styles.text}>
                  {isEditMode ? (
                    <Input
                      type="text"
                      value={displayData.monthlyRentDate || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('monthlyRentDate', e.target.value)}
                      placeholder="일자"
                      className={styles.inline_input}
                    />
                  ) : (
                    displayData.monthlyRentDate || "입력된 정보가 없습니다"
                  )} 일
                  지불한다.
                </span>
              </div>
            </div>
          </section>

          {/* 조항/메모 */}
          <section className={styles.section_box}>
            <div className={`${styles.text_content} ${styles.compact}`}>
              <div className={styles.text_row}>
                <span className={styles.text}>
                  임대인은 잔금수령과 동시에 임차인이 토지를 이용할 수 있도록
                  인도해주어야 합니다.
                </span>
              </div>
              <div className={styles.text_row}>
                <span className={`${styles.text} ${styles.multiline}`}>
                  본 계약서에 기재되지 않은 사항은 관련 법과 "관례"에 의하며 토지
                  용도에 따라 구체적인 내용은 특약으로 정하며 계약을{"\n"}
                  위반시에는 계약금액의 배액을 계약 위반자가 배상한다.
                </span>
              </div>
            </div>
          </section>

          {/* 날짜/장소 */}
          <section className={styles.section_box}>
            <div className={`${styles.text_content} ${styles.compact}`}>
              <div className={styles.text_row}>
                <span className={styles.label}>계약시작일시 :</span>
                <span className={styles.text}>
                  {isEditMode ? (
                    <Input
                      type="text"
                      value={displayData.leaseStartDate || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('leaseStartDate', e.target.value)}
                      placeholder="계약 시작일시"
                    />
                  ) : (
                    displayData.leaseStartDate || "입력된 정보가 없습니다"
                  )}
                </span>
              </div>
              <div className={styles.text_row}>
                <span className={styles.label}>계약 일시 :</span>
                <span className={styles.text}>
                  {isEditMode ? (
                    <Input
                      type="text"
                      value={displayData.contractDate || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('contractDate', e.target.value)}
                      placeholder="계약 일시"
                    />
                  ) : (
                    displayData.contractDate || "입력된 정보가 없습니다"
                  )}
                </span>
              </div>
            </div>
          </section>

          {/* 서명/도장 */}
          <section className={styles.signature_section}>
            <div className={styles.signature_row}>
              <div className={styles.signature_item}>
                <div className={styles.signature_title}>임차인</div>
                <div className={styles.signature_box}></div>
              </div>
              <div className={styles.signature_item}>
                <div className={styles.signature_title}>임대인</div>
                <div className={styles.signature_box}></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LeaseContractViewModal;
