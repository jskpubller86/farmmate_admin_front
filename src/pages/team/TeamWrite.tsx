import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Button,
  Error,
  File as FileInput,
  Input,
  Select,
  TextArea,
} from "../../components/ui";
import useDaumAddr from "../../hooks/useDaumAddr";
import styles from "./team.module.css";
import { useAPI } from "../../hooks";

/**
 * 팀 등록
 */
interface FormValues {
  teamName: string;
  conts: string;
  addr: string;
  detailAddr?: string | null;
  categoryCd: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  maxMemberCnt: string;
}
// 폼검증에 사용할 스키마
const schema = yup
  .object({
    teamName: yup.string().required("팀이름을 입력하세요."),
    conts: yup.string().required("팀 소개를 입력하세요."),
    addr: yup.string().required("주소를 입력하세요."),
    detailAddr: yup.string().nullable().notRequired(),
    categoryCd: yup.string().required("카테고리를 선택하세요."),
    startDate: yup.string().required("시작일을 입력하세요."),
    startTime: yup.string().required("시작시간을 입력하세요."),
    endDate: yup.string().required("종료일을 입력하세요."),
    endTime: yup.string().required("종료시간을 입력하세요."),
    maxMemberCnt: yup.string().required("최대인원을 입력하세요."),
  }) //종료일시는 시작일시보다 이후여야 한다.
  .test(
    "end-after-start",
    "종료 일시는 시작 일시 이후여야 합니다.",
    (value: unknown) => {
      if (!value) return true;
      const { startDate, startTime, endDate, endTime } = value as FormValues;
      if (!startDate || !startTime || !endDate || !endTime) {
        // 만약 값이 없다면 이 검증은 뛰어 넘고 required 먼저 검증.
        return true;
      }
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);
      return end > start;
    }
  );

const TeamWrite: React.FC = () => {
  //기본 이미지
  const dafaultimg = "/images/img_default.svg";
  //미리보기
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(
    dafaultimg
  );
  //파일 저장
  const [fileState, setFileState] = useState<File | null>(null);
  // 네비게이트
  const navigate = useNavigate();
  // 다음 API 호출 훅
  const getDaum = useDaumAddr();
  // 상세주소 ref 훅
  const detailAddrRef = useRef<HTMLInputElement>(null);
  // 폼 요소 검증을 위한 훅
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const api = useAPI();
  /**
   * 다음 주소 API를 활성화하는 함수
   * @param e 이벤트 객체
   */
  const onOpenDaumAddrAPI = (e: React.MouseEvent<HTMLElement>) => {
    const daum = getDaum();
    if (daum) {
      new daum.Postcode({
        oncomplete: function (data: any) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ""; // 주소 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          // 주소 할당
          setValue("addr", addr);

          // 커서를 상세주소 필드로 이동한다.
          if (detailAddrRef.current) {
            detailAddrRef.current.focus();
          }
        },
      }).open();
    }
  };
  //이미지 미리보기 및 저장
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (!newFile) return;
    setFileState(newFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      //파일 stream이 읽어오는 영역
      setPreview(reader.result);
    };
    reader.readAsDataURL(newFile);
  };
  //실제 서버 전송 폼 제출용
  const onValid = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("teamName", data.teamName);
    formData.append("conts", data.conts);
    formData.append("addr", data.addr);
    formData.append("detailAddr", data.detailAddr ? data.detailAddr : "");
    formData.append("categoryCd", data.categoryCd); // selectbox로 구현할 것
    formData.append("startDatetime", `${data.startDate}T${data.startTime}`);
    formData.append("endDatetime", `${data.endDate}T${data.endTime}`);
    const maxCnt = parseInt(data.maxMemberCnt, 10); //10진수로 저장
    formData.append("maxMemberCnt", String(maxCnt)); // 문자열만 넘겨짐
    if (fileState) {
      formData.append("files", fileState);
    }

    try {
      const url = "http://localhost:81/team/createTeam";
      await api.postWithMultiPart("/team/createTeam", formData);
      //await axios.post(url, formData,{headers: { 'Content-Type':'multipart/form-data' }});
      navigate("/team_list");
    } catch (error) {
      console.log(`Error => ${error}`);
      alert("팀 생성 중 오류가 발생했습니다.");
    }
  };
  //오류 확인
  const onInvalid = (errors: any) => {
    console.log("폼 유효성 검사 실패!", errors);
  };

  // 과거 시간 금지 설정
  const todayDate = new Date().toISOString().split("T")[0]; // 오늘 ex) 2025-06-26
  const nowTime = new Date().toTimeString().slice(0, 5); // 현재 시간 ex) 17:45
  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");

  // 렌더링
  return (
    <div className={styles.container}>
      <form
        className={styles.write_wrap}
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        {/* 팀 이름 */}
        <div className={styles.write_box}>
          <label className={styles.label}>
            제목 <span className="required">*</span>
          </label>
          <Input {...register("teamName")} />
          <Error isError={Boolean(errors.teamName)}>
            {errors.teamName && errors.teamName.message?.toString()}
          </Error>
        </div>

        {/* 내용 */}
        <div className={styles.write_box}>
          <label className={styles.label}>
            내용 <span className="required">*</span>
          </label>
          <TextArea {...register("conts")} />
          <Error isError={Boolean(errors.conts)}>
            {errors.conts && errors.conts.message?.toString()}
          </Error>
        </div>

        {/* 주소 */}
        <div className={styles.write_box}>
          <label className={styles.label}>
            주소 <span className="required">*</span>
          </label>
          <div className={styles.write_box}>
            <Input {...register("addr")} type="text" readOnly />
            <div className={styles.write_addr_detail_box}>
              <Input
                {...register("detailAddr")}
                type="text"
                ref={(el: HTMLInputElement | null) => {
                  register("detailAddr").ref(el);
                  detailAddrRef.current = el;
                }}
              />
              <Button type="button" onClick={onOpenDaumAddrAPI}>
                검색
              </Button>
            </div>
          </div>
        </div>

        {/* 카테고리 코드 */}
        <label className={styles.label}>
          카테고리 <span className="required">*</span>
        </label>
        <Select {...register("categoryCd")}>
          <option value="">선택</option>
          <option value="1001">축구</option>
          <option value="1002">농구</option>
          <option value="1003">배구</option>
          <option value="1004">골프</option>
          <option value="1005">등산</option>
          <option value="1006">수영</option>
          <option value="1007">런닝</option>
          <option value="1008">헬스</option>
          <option value="1009">야구</option>
          <option value="1010">기타</option>
        </Select>

        <Error isError={Boolean(errors.categoryCd)}>
          {errors.categoryCd && errors.categoryCd.message?.toString()}
        </Error>
        {/* 시작일시 */}
        <div className={styles.write_box}>
          <label className={styles.label}>
            시작일시 <span className="required">*</span>
          </label>
          <div className={styles.write_box}>
            <Input {...register("startDate")} type="date" min={todayDate} />
            <Input
              {...register("startTime")}
              type="time"
              min={watchStartDate === todayDate ? nowTime : "00:00"}
            />
            <Error isError={Boolean(errors.startDate)}>
              {errors.startDate?.message}
            </Error>
            <Error isError={Boolean(errors.startTime)}>
              {errors.startTime?.message}
            </Error>
          </div>
        </div>

        {/* 종료일시 */}
        <div className={styles.write_box}>
          <label className={styles.label}>
            종료일시 <span className="required">*</span>
          </label>
          <div className={styles.write_box}>
            <Input {...register("endDate")} type="date" min={todayDate} />
            <Input
              {...register("endTime")}
              type="time"
              min={watchEndDate === todayDate ? nowTime : "00:00"}
            />
            <Error isError={Boolean(errors.endDate)}>
              {errors.endDate?.message}
            </Error>
            <Error isError={Boolean(errors.endTime)}>
              {errors.endTime?.message}
            </Error>
          </div>
        </div>

        {/* 최대 인원 */}
        <div className={styles.write_box}>
          <label className={styles.label}>
            최대 인원 <span className="required">*</span>
          </label>
          <div className={styles.write_box}>
            <input
              {...register("maxMemberCnt", { valueAsNumber: true })}
              type="number"
              min={1}
            />
          </div>
        </div>

        {/* 첨부파일 */}
        <div className={styles.write_box}>
          <label className={styles.label}>파일</label>
          <FileInput onChange={handleFileChange} />
          <p>첨부 파일은 최대 20MB까지 등록 가능합니다.</p>
          {preview && (
            <img
              src={preview as string}
              alt="미리보기"
              style={{ width: "4.571rem" }}
            />
          )}
        </div>

        <div>
          <Button type="submit">제출</Button>
          <Link to="/">취소</Link>
        </div>
      </form>
    </div>
  );
};

export default TeamWrite;
