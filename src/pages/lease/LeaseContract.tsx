import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../components/ui";
import styles from "./leaseContract.module.css";
import layout from "../../layout/layout.module.css";

/**
 * LeaseContract 임대차 계약서 작성 페이지
 * Figma 디자인 S-300200200(>=760) : 임대차계약서 작성 기반
 */
const LeaseContract: React.FC = () => {
  const navigate = useNavigate();
  
  // 계약서 데이터 상태
  const [contractData, setContractData] = useState({
    // 임차인 정보
    tenantName: "",
    tenantPhone: "",
    tenantId: "",
    tenantAddress: "",
    
    // 임대인 정보
    landlordName: "",
    landlordPhone: "",
    landlordId: "",
    landlordAddress: "",
    
    // 토지 정보
    landName: "",
    landPurpose: "",
    landUse: "",
    
    // 보증금 및 월세
    deposit: "",
    monthlyRent: "",
    contractDeposit: "",
    
    // 중도금 및 잔금
    interimPayment: "",
    interimYear: "",
    interimMonth: "",
    interimDay: "",
    finalPayment: "",
    finalYear: "",
    finalMonth: "",
    finalDay: "",
    
    // 임대차 기간
    leaseYears: "",
    leaseMonths: "",
    leaseDays: "",
    startDate: "",
    
    // 월세 지불일
    rentPaymentDay: "",
    
    // 계약 시작일시
    contractStartDateTime: "",
    contractDateTime: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setContractData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    // 계약서 저장 로직
    console.log("계약서 저장:", contractData);
  };

  return (
    <div className={layout.container_full}>
      <div className={styles.contract_container}>
        {/* 페이지 헤더 */}
        <div className={styles.page_header}>
          <h1 className={styles.page_title}>임대차 계약서 작성</h1>
          
          {/* 상단 버튼들 */}
          <div className={styles.header_buttons}>
            <Button
              onClick={handlePrevious}
              className={styles.btn_prev}
              color="point"
              size="sm"
            >
              이전
            </Button>
            <Button
              onClick={handlePrint}
              className={styles.btn_print}
              color="point"
              size="sm"
            >
              출력
            </Button>
          </div>
          
          {/* 계약서 정보 */}
          <div className={styles.contract_info}>
            <span>계약서 생성 일시 : 2025-07-09</span>
            <span>계약서 수정 일시 : 2025-08-05</span>
          </div>
        </div>

        {/* 임차인 정보 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>임차인 정보</h3>
          <div className={styles.info_table}>
            <div className={styles.table_row}>
              <div className={styles.label_cell}>이름</div>
              <div className={styles.input_cell}>
                <Input
                  value={contractData.tenantName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("tenantName", e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div className={styles.label_cell}>연락처</div>
              <div className={styles.input_cell}>
                <Input
                  value={contractData.tenantPhone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("tenantPhone", e.target.value)}
                  placeholder="연락처를 입력하세요"
                />
              </div>
              <div className={styles.label_cell}>주민등록번호</div>
              <div className={styles.input_cell}>
                <Input
                  value={contractData.tenantId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("tenantId", e.target.value)}
                  placeholder="주민등록번호를 입력하세요"
                />
              </div>
            </div>
            <div className={styles.table_row}>
              <div className={styles.label_cell}>주소</div>
              <div className={styles.input_cell_wide}>
                <Input
                  value={contractData.tenantAddress}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("tenantAddress", e.target.value)}
                  placeholder="주소를 입력하세요"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 임대인 정보 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>임대인 정보</h3>
          <div className={styles.info_table}>
            <div className={styles.table_row}>
              <div className={styles.label_cell}>이름</div>
              <div className={styles.input_cell}>
                <Input
                  value={contractData.landlordName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("landlordName", e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div className={styles.label_cell}>연락처</div>
              <div className={styles.input_cell}>
                <Input
                  value={contractData.landlordPhone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("landlordPhone", e.target.value)}
                  placeholder="연락처를 입력하세요"
                />
              </div>
              <div className={styles.label_cell}>주민등록번호</div>
              <div className={styles.input_cell}>
                <Input
                  value={contractData.landlordId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("landlordId", e.target.value)}
                  placeholder="주민등록번호를 입력하세요"
                />
              </div>
            </div>
            <div className={styles.table_row}>
              <div className={styles.label_cell}>주소</div>
              <div className={styles.input_cell_wide}>
                <Input
                  value={contractData.landlordAddress}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("landlordAddress", e.target.value)}
                  placeholder="주소를 입력하세요"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 계약 체결 문구 */}
        <div className={styles.contract_statement}>
          임대인과 임차인은 아래 토지(땅)에 대한 임대차 계약을 다음과 같이 체결한다.
        </div>

        {/* 임대할 토지의 표시 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>임대할 토지의 표시</h3>
          <div className={styles.info_table}>
            <div className={styles.table_row}>
              <div className={styles.label_cell}>이름</div>
              <div className={styles.input_cell_wide}>
                <Input
                  value={contractData.landName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("landName", e.target.value)}
                  placeholder="토지 이름을 입력하세요"
                />
              </div>
            </div>
            <div className={styles.table_row}>
              <div className={styles.label_cell}>임대할 토지 (땅)</div>
              <div className={styles.input_cell_wide}>
                <Input
                  value={contractData.landPurpose}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("landPurpose", e.target.value)}
                  placeholder="토지 용도를 입력하세요"
                />
              </div>
            </div>
            <div className={styles.table_row}>
              <div className={styles.label_cell}>사용여부</div>
              <div className={styles.input_cell_wide}>
                <Input
                  value={contractData.landUse}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("landUse", e.target.value)}
                  placeholder="사용 여부를 입력하세요"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 보증금과 월세 지불방법 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>보증금과 월세(임차)금의 지불방법(지불약정)</h3>
          <div className={styles.payment_table}>
            <div className={styles.payment_row}>
              <div className={styles.payment_label}>임대보증금</div>
              <div className={styles.payment_input_group}>
                <span>금</span>
                <Input
                  value={contractData.deposit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("deposit", e.target.value)}
                  placeholder="보증금"
                  className={styles.payment_input}
                />
                <span>원</span>
                <Input
                  value={contractData.deposit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("deposit", e.target.value)}
                  placeholder="보증금"
                  className={styles.payment_input}
                />
              </div>
            </div>
            <div className={styles.payment_row}>
              <div className={styles.payment_label}>월세</div>
              <div className={styles.payment_input_group}>
                <span>₩</span>
                <Input
                  value={contractData.monthlyRent}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("monthlyRent", e.target.value)}
                  placeholder="월세"
                  className={styles.payment_input}
                />
                <span>원정</span>
              </div>
            </div>
            <div className={styles.payment_row}>
              <div className={styles.payment_label}>계약금</div>
              <div className={styles.payment_input_group}>
                <span>금</span>
                <Input
                  value={contractData.contractDeposit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("contractDeposit", e.target.value)}
                  placeholder="계약금"
                  className={styles.payment_input}
                />
                <span>원정은 계약시 지불한다.(영수함)</span>
              </div>
            </div>
            <div className={styles.payment_row}>
              <div className={styles.payment_label}>중도금</div>
              <div className={styles.payment_input_group}>
                <span>금</span>
                <Input
                  value={contractData.interimPayment}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("interimPayment", e.target.value)}
                  placeholder="중도금"
                  className={styles.payment_input}
                />
                <span>원정은</span>
                <Input
                  value={contractData.interimYear}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("interimYear", e.target.value)}
                  placeholder="년"
                  className={styles.payment_input}
                />
                <span>년</span>
                <Input
                  value={contractData.interimMonth}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("interimMonth", e.target.value)}
                  placeholder="월"
                  className={styles.payment_input}
                />
                <span>일 지불한다.</span>
              </div>
            </div>
            <div className={styles.payment_row}>
              <div className={styles.payment_label}>잔금</div>
              <div className={styles.payment_input_group}>
                <span>금</span>
                <Input
                  value={contractData.finalPayment}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("finalPayment", e.target.value)}
                  placeholder="잔금"
                  className={styles.payment_input}
                />
                <span>원정은</span>
                <Input
                  value={contractData.finalYear}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("finalYear", e.target.value)}
                  placeholder="년"
                  className={styles.payment_input}
                />
                <span>년</span>
                <Input
                  value={contractData.finalMonth}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("finalMonth", e.target.value)}
                  placeholder="월"
                  className={styles.payment_input}
                />
                <span>일 지불한다.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 이행 약정 등 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>이행 약정 등</h3>
          <div className={styles.terms_table}>
            <div className={styles.terms_row}>
              <div className={styles.terms_content}>
                임대차기간은
                <Input
                  value={contractData.leaseYears}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("leaseYears", e.target.value)}
                  placeholder="년"
                  className={styles.terms_input}
                />
                <span>년</span>
                <Input
                  value={contractData.leaseMonths}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("leaseMonths", e.target.value)}
                  placeholder="월"
                  className={styles.terms_input}
                />
                <span>월</span>
                <Input
                  value={contractData.leaseDays}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("leaseDays", e.target.value)}
                  placeholder="일"
                  className={styles.terms_input}
                />
                <span>일 부터</span>
                <Input
                  value={contractData.startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("startDate", e.target.value)}
                  placeholder="시작일"
                  className={styles.terms_input}
                />
                <span>년간으로 한다.</span>
              </div>
            </div>
            <div className={styles.terms_row}>
              <div className={styles.terms_content}>
                월세는 매월
                <Input
                  value={contractData.rentPaymentDay}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("rentPaymentDay", e.target.value)}
                  placeholder="일"
                  className={styles.terms_input}
                />
                <span>일 지불한다.</span>
              </div>
            </div>
            <div className={styles.terms_row}>
              <div className={styles.terms_content}>
                임대인은 잔금수령과 동시에임차인이 토지를 이용할 수 있도록 인도해 주어야 합니다.
                <br /><br />
                본 계약서에 기재되지 않은 사항은 관련 법과 "관례"에 의하며 토지 용도에 따라 구체적인 내용은 특약으로 정하며 계약을
                위반시에는 계약금액의 배액을 계약 위반자가 배상한다.
              </div>
            </div>
            <div className={styles.terms_row}>
              <div className={styles.terms_content}>
                계약시작일시 : 
                <Input
                  value={contractData.contractStartDateTime}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("contractStartDateTime", e.target.value)}
                  placeholder="계약 시작일시"
                  className={styles.terms_input}
                />
              </div>
            </div>
            <div className={styles.terms_row}>
              <div className={styles.terms_content}>
                계약 일시 : 
                <Input
                  value={contractData.contractDateTime}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("contractDateTime", e.target.value)}
                  placeholder="계약 일시"
                  className={styles.terms_input}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 서명 영역 */}
        <section className={styles.signature_section}>
          <div className={styles.signature_container}>
            <div className={styles.signature_box}>
              <h4 className={styles.signature_title}>임대인 서명</h4>
              <div className={styles.signature_area}></div>
            </div>
            <div className={styles.signature_box}>
              <h4 className={styles.signature_title}>임차인 서명</h4>
              <div className={styles.signature_area}></div>
            </div>
          </div>
        </section>

        {/* 하단 저장 버튼 */}
        <div className={styles.bottom_actions}>
          <Button
            onClick={handleSave}
            className={styles.btn_save}
            color="point2"
            size="lg"
          >
            계약서 저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaseContract;
