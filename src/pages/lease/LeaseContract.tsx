import React, { useState } from "react";
import styles from "./lease.module.css";
import { Button, Input } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPrint } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import ContractSignatureModal from "../../madals/lease/ContractSignatureModal";

/**
 * LeaseContract 임대차 계약서 페이지
 * - 기존 Header/Footer/Layout은 App 레벨에서 적용됨
 * - 이 페이지는 본문 콘텐츠만 렌더링
 */
const LeaseContract: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [landlordSignature, setLandlordSignature] = useState<string>("");
  const [tenantSignature, setTenantSignature] = useState<string>("");

  const handlePrevious = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSignatureClick = (type: "landlord" | "tenant") => {
    const modalId = Date.now(); // 고유한 ID 생성

    const handleConfirm = (signatureData: string) => {
      if (type === "landlord") {
        setLandlordSignature(signatureData);
      } else {
        setTenantSignature(signatureData);
      }
    };

    const handleCancel = () => {
      // 취소 시 아무것도 하지 않음
    };

    // 모달 열기
    openModal(
      modalId,
      <ContractSignatureModal
        modalId={modalId}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />,
      23.7
    );
  };

  return (
    <div className={styles.container}>
      {/* 페이지 제목 */}
      <div className={styles.page_header}>
        <h1 className={styles.page_title}>임대차 계약서 작성</h1>
      </div>

      {/* 상단 툴바 및 계약서 정보 */}
      <div className={styles.toolbar_section}>
        <div className={styles.toolbar}>
          <Button
            type="button"
            size="xs"
            color="point2"
            className={styles.btn_prev}
            onClick={handlePrevious}
          >
            이전
          </Button>
          <Button
            type="button"
            size="xs"
            color="point2"
            className={styles.btn_print}
            onClick={handlePrint}
          >
            출력
          </Button>
        </div>
        <div className={styles.page_info}>
          <span>계약서 생성 일시 : 2025-07-09</span>
          <span>계약서 수정 일시 : 2025-08-05</span>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className={styles.main_content}>
        {/* 갑 (임차인) 정보 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>임차인 정보</h3>
          <div className={styles.table}>
            <div className={styles.th}>이름</div>
            <div className={styles.td}>
              <Input className={styles.cell_input} />
            </div>
            <div className={styles.th}>연락처</div>
            <div className={styles.td}>
              <Input className={styles.cell_input} />
            </div>
            <div className={styles.th}>주민등록번호</div>
            <div className={styles.td}>
              <Input className={styles.cell_input} />
            </div>

            <div className={styles.th}>주소</div>
            <div className={`${styles.td} ${styles.td_full}`}>
              <Input className={`${styles.full_input} ${styles.cell_input}`} />
            </div>
          </div>
        </section>

        {/* 을 (임대인) 정보 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>임대인 정보</h3>
          <div className={styles.table}>
            <div className={styles.th}>이름</div>
            <div className={styles.td}>
              <Input className={styles.cell_input} />
            </div>
            <div className={styles.th}>연락처</div>
            <div className={styles.td}>
              <Input className={styles.cell_input} />
            </div>
            <div className={styles.th}>주민등록번호</div>
            <div className={styles.td}>
              <Input className={styles.cell_input} />
            </div>

            <div className={styles.th}>주소</div>
            <div className={`${styles.td} ${styles.td_full}`}>
              <Input className={`${styles.full_input} ${styles.cell_input}`} />
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
              <Input className={styles.full_input} />
            </div>

            <div className={styles.th}>임대할 토지(땅)</div>
            <div className={styles.td}>
              <Input className={styles.full_input} />
            </div>

            <div className={styles.th}>사용여부</div>
            <div className={styles.td}>
              <Input className={styles.full_input} />
            </div>
          </div>
        </section>

        {/* 금액 항목 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>
            보증금과 월세(임차)금의 지불방법(지불약정)
          </h3>
          <div className={styles.table_money}>
            <div className={styles.th}>임대보증금</div>
            <div className={`${styles.td_inline} ${styles.center_align}`}>
              금 <Input className={styles.input_sm} /> 원
              <Input className={styles.input_sm} />
            </div>
            <div className={styles.th}>월세</div>
            <div className={`${styles.td_inline} ${styles.center_align}`}>
              ₩ <Input className={styles.input_sm} /> 원정
            </div>

            <div className={styles.th}>계약금</div>
            <div className={`${styles.td_inline} ${styles.td_full}`}>
              금 <Input className={styles.input_sm} /> 원정은 계약시
              지불한다.(영수함)
            </div>

            <div className={styles.th}>중도금</div>
            <div
              className={`${styles.td_inline} ${styles.td_full} ${styles.center_align}`}
            >
              금 <Input className={styles.input_sm} /> 원정은{" "}
              <Input className={styles.input_sm} /> 년{" "}
              <Input className={styles.input_sm} /> 일 지불한다.
            </div>

            <div className={styles.th}>잔금</div>
            <div
              className={`${styles.td_inline} ${styles.td_full} ${styles.center_align}`}
            >
              금 <Input className={styles.input_sm} /> 원정은{" "}
              <Input className={styles.input_sm} /> 년{" "}
              <Input className={styles.input_sm} /> 일 지불한다.
            </div>
          </div>
        </section>

        {/* 기간 & 납부일 */}
        <section className={styles.section}>
          <h3 className={styles.section_title}>이행 약정 등</h3>
          <div className={styles.text_content}>
            <div className={styles.text_row}>
              <span className={styles.label}>임대차기간은</span>
              <span className={styles.text}>
                <Input className={styles.input_sm} /> 년{" "}
                <Input className={styles.input_sm} /> 월{" "}
                <Input className={styles.input_sm} /> 일 부터{" "}
                <Input className={styles.input_sm} /> 년간으로 한다.
              </span>
            </div>

            <div className={styles.text_row}>
              <span className={styles.label}>월세는 매월</span>
              <span className={styles.text}>
                <Input className={styles.input_sm} /> 일 지불한다.
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
          <div className={styles.text_content}>
            <div className={styles.text_row}>
              <span className={styles.label}>계약시작일시 :</span>
              <span className={styles.text}>
                <Input className={styles.input_sm} />
              </span>
            </div>
            <div className={styles.text_row}>
              <span className={styles.label}>계약 일시 :</span>
              <span className={styles.text}>
                <Input className={styles.input_sm} />
              </span>
            </div>
          </div>
        </section>

        {/* 서명/도장 */}
        <section className={styles.section}>
          <div className={styles.signature_section}>
            <div className={styles.signature_row}>
              <div className={styles.signature_item}>
                <h4 className={styles.signature_title}>임대인 서명</h4>
                <div
                  className={styles.signature_box}
                  onClick={() => handleSignatureClick("landlord")}
                  style={{ cursor: "pointer" }}
                >
                  {landlordSignature && (
                    <img
                      src={landlordSignature}
                      alt="임대인 서명"
                      className={styles.signature_image}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </div>
              </div>
              <div className={styles.signature_item}>
                <h4 className={styles.signature_title}>임차인 서명</h4>
                <div
                  className={styles.signature_box}
                  onClick={() => handleSignatureClick("tenant")}
                  style={{ cursor: "pointer" }}
                >
                  {tenantSignature && (
                    <img
                      src={tenantSignature}
                      alt="임차인 서명"
                      className={styles.signature_image}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeaseContract;
