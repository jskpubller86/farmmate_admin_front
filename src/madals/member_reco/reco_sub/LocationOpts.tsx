import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "./recoSub.module.css";
import parentStyles from "../memberReco.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, Checkbox } from "../../../components/ui";
import { useForm } from "react-hook-form";
import { appConsole } from "../../../utils";
import { useAlert, useAPI, useAddr, useModal } from "../../../hooks";
// import MemberResult from './MemberResult'

interface Props {
  teamId: string;
  modalId: number;
}

const regionShortMap: Record<string, string> = {
  서울특별시: "서울",
  부산광역시: "부산",
  대구광역시: "대구",
  인천광역시: "인천",
  광주광역시: "광주",
  대전광역시: "대전",
  울산광역시: "울산",
  세종특별자치시: "세종",
  경기도: "경기",
  강원특별자치도: "강원",
  충청북도: "충북",
  충청남도: "충남",
  전라북도: "전북",
  전라남도: "전남",
  경상북도: "경북",
  경상남도: "경남",
  제주특별자치도: "제주",
};

/**
 * 이름 변경
 * @param fullAddr
 * @returns
 */
const shortenRegionName = (fullAddr: string): string => {
  for (const [long, short] of Object.entries(regionShortMap)) {
    if (fullAddr.startsWith(long)) {
      return fullAddr.replace(long, short);
    }
  }
  return fullAddr; // 못 줄이면 원본 유지
};

// addr_name
const LocationOpts: React.FC<Props> = ({ teamId, modalId }) => {
  const maxWidth = 35.714;
  const { openModal, closeModal } = useModal();
  const { addrs, setAddrCd } = useAddr("");
  const [addr1, setAddr1] = useState("");
  const { alertError, alertSuccess, alertWarn } = useAlert();
  const api = useAPI();

  // 폼 요소 검증을 위한 훅
  const { register, handleSubmit } = useForm();

  const submit = async (data: any) => {
    // const {addresses} = data;
    // try {
    //     const resp = await api.get('/member/invitableUsers', {teamId, addresses});
    //     const {code, data} = resp.data;
    //     if(code === '0000'){
    //         closeModal(modalId);
    //         openModal(modalId+1, <MemberResult modalId={modalId+1} teamId={teamId} memberList={data} />);
    //     } else {
    //         alertError();
    //     }
    // } catch(error) {
    //     alertError({error});
    // }
  };

  return (
    <div className={parentStyles.container}>
      <div className={parentStyles.reco_head_box}>
        <Avatar /> <b>Manager</b>{" "}
        <button
          type="button"
          className={parentStyles.btn_close}
          onClick={() => closeModal(modalId)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <form
        className={parentStyles.reco_body_box}
        onSubmit={handleSubmit(submit)}
      >
        <div className={parentStyles.ask_box}>
          <h4>팀원 초대</h4>
          <p>지역을 선택해주세요.</p>
        </div>

        {/* 뒤로가기 */}
        {addr1 && (
          <button
            type="button"
            onClick={() => {
              setAddr1("");
              setAddrCd("");
            }}
          >
            {" "}
            뒤로가기
          </button>
        )}

        <ul className={styles.loc_group}>
          {/* 상위 주소 */}
          {!addr1 &&
            addrs?.map((e, idx) => (
              <li key={idx} className={styles.loc_item}>
                <div
                  onClick={() => {
                    setAddrCd(e.cd);
                    setAddr1(e.addr_name);
                  }}
                >
                  {e.addr_name} <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </li>
            ))}

          {/* 하위 주소 */}
          {addr1 &&
            addrs?.map((e, idx) => (
              <li key={idx} className={styles.loc_item}>
                <label>
                  {e.addr_name}{" "}
                  <Checkbox
                    {...register("addresses")}
                    value={shortenRegionName(addr1) + " " + e.addr_name}
                  />
                </label>
              </li>
            ))}
        </ul>

        <div className={parentStyles.btn_group}>
          <Button type="submit">완료</Button>
        </div>
      </form>
    </div>
  );
};

export default LocationOpts;
