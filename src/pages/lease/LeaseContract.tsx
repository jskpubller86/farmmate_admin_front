import React from "react";
import styles from "./lease.module.css";
import { Button, Input } from "../../components/ui";

/**
 * LeaseContract 임대차 계약서 페이지
 * - 기존 Header/Footer/Layout은 App 레벨에서 적용됨
 * - 이 페이지는 본문 콘텐츠만 렌더링
 */
const LeaseContract: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* 상단 툴바 */}
      <div className={styles.toolbar}>
        <Button
          type="button"
          size="xs"
          color="secondary"
          className={styles.btn_prev}
        >
          이전
        </Button>
        <Button
          type="button"
          size="xs"
          color="point2"
          className={styles.btn_print}
        >
          출력
        </Button>
      </div>

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

      {/* 을 (임대대인) 정보 */}
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
          임대인과 임차인은 아래 토지 (땅)에 대한 임대차 계약을 다음과 같이
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
          <div className={styles.td_inline}>
            금 <Input className={styles.input_sm} /> 원
            <Input className={styles.input_sm} />
          </div>
          <div className={styles.th}>월세</div>
          <div className={styles.td_inline}>
            ₩ <Input className={styles.input_sm} /> 원정
          </div>

          <div className={styles.th}>계약금</div>
          <div className={`${styles.td} ${styles.td_full}`}>
            금 <Input className={styles.input_sm} /> 원정은 계약시
            지불한다.(영수함)
          </div>

          <div className={styles.th}>중도금</div>
          <div
            className={`${styles.td} ${styles.td_full} ${styles.center_align}`}
          >
            금 <Input className={styles.input_sm} /> 원정은{" "}
            <Input className={styles.input_xs} /> 년{" "}
            <Input className={styles.input_xs} /> 월{" "}
            <Input className={styles.input_xs} /> 일 지불한다.
          </div>

          <div className={styles.th}>잔금</div>
          <div
            className={`${styles.td} ${styles.td_full} ${styles.center_align}`}
          >
            금 <Input className={styles.input_sm} /> 원정은{" "}
            <Input className={styles.input_xs} /> 년{" "}
            <Input className={styles.input_xs} /> 월{" "}
            <Input className={styles.input_xs} /> 일 지불한다.
          </div>
        </div>
      </section>

      {/* 기간 & 납부일 */}
      <section className={styles.section}>
        <h3 className={styles.section_title}>이행 약정 등</h3>
        <div className={styles.table_col1}>
          <div className={styles.row_inline}>
            <div className={styles.th}>임대차기간은</div>
            <div className={styles.td_inline}>
              <Input className={styles.input_xs} /> 년{" "}
              <Input className={styles.input_xs} /> 월{" "}
              <Input className={styles.input_xs} /> 일 부터{" "}
              <Input className={styles.input_xs} /> 년간으로 한다.
            </div>
          </div>

          <div className={styles.row_inline}>
            <div className={styles.th}>월세는 매월</div>
            <div className={styles.td_inline}>
              <Input className={styles.input_xs} /> 일 지불한다.
            </div>
          </div>
        </div>
      </section>

      {/* 조항/메모 */}
      <section className={styles.section}>
        <div className={styles.notice_box}>
          임대인은 잔금수령과 동시에 임차인이 토지를 이용할 수 있도록
          인도해주어야 합니다.
        </div>
        <div className={styles.notice_box}>
          본 계약서에 기재되지 않은 사항은 관련 법과 "관례"에 의하며 토지 용도에
          따라 구체적인 내용은 특약으로 정하며 계약을 위반시에는 계약금액의
          배액을 계약 위반자가 배상한다.
        </div>
      </section>

      {/* 날짜/장소 */}
      <section className={styles.section}>
        <div className={styles.row_inline}>
          <div className={styles.th}>계약시작일시:</div>
          <div className={styles.td_inline}>
            <Input className={styles.input_sm} />
          </div>
        </div>
        <div className={styles.row_inline}>
          <div className={styles.th}>계약 일시 :</div>
          <div className={styles.td_inline}>
            <Input className={styles.input_sm} />
          </div>
        </div>
      </section>

      {/* 서명/도장 */}
      <section className={styles.section}>
        <div className={styles.sign_row}>
          <div className={styles.sign_box} />
          <div className={styles.sign_box} />
        </div>
      </section>
    </div>
  );
};

export default LeaseContract;
