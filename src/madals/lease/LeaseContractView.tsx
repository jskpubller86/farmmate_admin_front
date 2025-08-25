import React from "react";
import styles from "./leaseContractView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/useModal";

interface LeaseContractViewProps {
  modalId?: number;
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
const LeaseContractView: React.FC<LeaseContractViewProps> = ({
  modalId,
  contractData = {},
}) => {
  const { closeModal } = useModal();

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
  const displayData =
    Object.keys(contractData).length > 0 ? contractData : sampleData;

  const handleClose = () => {
    if (modalId) {
      closeModal(modalId);
    }
  };

  return (
    <div className={styles.modal_content}>
      {/* 모달 헤더 */}
      <div className={styles.modal_header}>
        <button
          type="button"
          className={styles.btn_close}
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* 계약서 내용 */}
      <div className={styles.contract_content}>
        {/* 갑 (임차인) 정보 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>임차인 정보</h3>
          <div className={styles.table}>
            <div className={styles.th}>이름</div>
            <div className={styles.td}>
              {displayData.tenantName || "입력된 정보가 없습니다"}
            </div>
            <div className={styles.th}>연락처</div>
            <div className={styles.td}>
              {displayData.tenantContact || "입력된 정보가 없습니다"}
            </div>
            <div className={styles.th}>주민등록번호</div>
            <div className={styles.td}>
              {displayData.tenantIdNumber || "입력된 정보가 없습니다"}
            </div>

            <div className={styles.th}>주소</div>
            <div className={`${styles.td} ${styles.td_full}`}>
              {displayData.tenantAddress || "입력된 정보가 없습니다"}
            </div>
          </div>
        </section>

        {/* 을 (임대인) 정보 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>임대인 정보</h3>
          <div className={styles.table}>
            <div className={styles.th}>이름</div>
            <div className={styles.td}>
              {displayData.landlordName || "입력된 정보가 없습니다"}
            </div>
            <div className={styles.th}>연락처</div>
            <div className={styles.td}>
              {displayData.landlordContact || "입력된 정보가 없습니다"}
            </div>
            <div className={styles.th}>주민등록번호</div>
            <div className={styles.td}>
              {displayData.landlordIdNumber || "입력된 정보가 없습니다"}
            </div>

            <div className={styles.th}>주소</div>
            <div className={`${styles.td} ${styles.td_full}`}>
              {displayData.landlordAddress || "입력된 정보가 없습니다"}
            </div>
          </div>
        </section>

        {/* 체결 문구 */}
        <section className={styles.section_note}>
          <p className={styles.center_text}>
            임대인과 임차인은 아래 토지(땅)에 대한 임대차 계약을 다음과 같이
            체결한다.
          </p>
        </section>

        {/* 임대할 토지의 표시*/}
        <section className={styles.section}>
          <h3 className={styles.section_title}>임대할 토지의 표시</h3>
          <div className={styles.table_col2}>
            <div className={styles.th}>이름</div>
            <div className={styles.td}>
              {displayData.landName || "입력된 정보가 없습니다"}
            </div>

            <div className={styles.th}>임대할 토지(땅)</div>
            <div className={styles.td}>
              {displayData.landLocation || "입력된 정보가 없습니다"}
            </div>

            <div className={styles.th}>사용여부</div>
            <div className={styles.td}>
              {displayData.landUse || "입력된 정보가 없습니다"}
            </div>
          </div>
        </section>

        {/* 지급 조건 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>
            보증금과 월세(임차)금의 지불방법(지불약정)
          </h3>
          <div className={styles.table_money}>
            <div className={styles.th}>임대보증금</div>
            <div className={`${styles.td_inline} ${styles.center_align}`}>
              금 {displayData.deposit || "입력된 정보가 없습니다"} 원
            </div>
            <div className={styles.th}>월세</div>
            <div className={`${styles.td_inline} ${styles.center_align}`}>
              ₩ {displayData.monthlyRent || "입력된 정보가 없습니다"} 원정
            </div>

            <div className={styles.th}>계약금</div>
            <div className={`${styles.td_inline} ${styles.td_full}`}>
              금 {displayData.downPayment || "입력된 정보가 없습니다"} 원정은
              계약시 지불한다.(영수함)
            </div>

            <div className={styles.th}>중도금</div>
            <div
              className={`${styles.td_inline} ${styles.td_full} ${styles.center_align}`}
            >
              금 {displayData.midPayment || "입력된 정보가 없습니다"} 원정은{" "}
              {displayData.leaseStartDate || "입력된 정보가 없습니다"} 년{" "}
              {displayData.leaseEndDate || "입력된 정보가 없습니다"} 일
              지불한다.
            </div>

            <div className={styles.th}>잔금</div>
            <div
              className={`${styles.td_inline} ${styles.td_full} ${styles.center_align}`}
            >
              금 {displayData.balance || "입력된 정보가 없습니다"} 원정은{" "}
              {displayData.leaseStartDate || "입력된 정보가 없습니다"} 년{" "}
              {displayData.leaseEndDate || "입력된 정보가 없습니다"} 일
              지불한다.
            </div>
          </div>
        </section>

        {/* 이행 약정 등 */}
        <section className={styles.section}>
          <div className={styles.text_content}>
            <div className={styles.text_row}>
              <span className={styles.label}>임대차기간은</span>
              <span className={styles.text}>
                {displayData.leaseStartDate || "입력된 정보가 없습니다"} 부터{" "}
                {displayData.leaseEndDate || "입력된 정보가 없습니다"} 까지{" "}
                {displayData.leaseEndDate && displayData.leaseStartDate
                  ? "계약기간"
                  : "입력된 정보가 없습니다"}{" "}
                이다.
              </span>
            </div>
            <div className={styles.text_row}>
              <span className={styles.label}>월세는 매월</span>
              <span className={styles.text}>
                {displayData.monthlyRentDate || "입력된 정보가 없습니다"} 일
                지불한다.
              </span>
            </div>
          </div>
        </section>

        {/* 조항/메모 */}
        <section className={styles.section}>
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
        <section className={styles.section}>
          <div className={`${styles.text_content} ${styles.compact}`}>
            <div className={styles.text_row}>
              <span className={styles.label}>계약시작일시 :</span>
              <span className={styles.text}>
                {displayData.leaseStartDate || "입력된 정보가 없습니다"}
              </span>
            </div>
            <div className={styles.text_row}>
              <span className={styles.label}>계약 일시 :</span>
              <span className={styles.text}>
                {displayData.contractDate || "입력된 정보가 없습니다"}
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
  );
};

export default LeaseContractView;
