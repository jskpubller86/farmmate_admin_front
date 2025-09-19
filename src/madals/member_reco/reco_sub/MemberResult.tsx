import React, { useContext, useEffect, useState } from "react";
import parentStyles from "../memberReco.module.css";
import styles from "./memberReco.module.css";
import { Avatar, Button } from "../../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAlert, useAPI, useModal } from "../../../hooks";
// import { InerestProps, FundCard } from '../../../components/sets';

interface MemberProps {
  userId: string;
  userName: string;
  addr: string;
  age: number;
  imgUrl?: string;
  //   interests: InerestProps[];
}

interface Props {
  modalId: number;
  teamId: string;
  memberList: MemberProps[];
}

/**
 * 추천 유형 선택화면
 * @returns
 * @author 김종수
 */
const MemberResult: React.FC<Props> = ({ modalId, teamId, memberList }) => {
  const maxWidth = 35.714;
  const { alertError, alertSuccess, alertWarn } = useAlert();
  const [members, setMembers] = useState<MemberProps[] | undefined>(memberList);
  const {api} = useAPI();
  const { openModal, closeModal } = useModal();

  /**
   * 초대
   * @param userId
   */
  const invite = async (userId: string) => {
    try {
      const resp = await api.postWithJson("/member/invite", { teamId, userId });
      const respData = resp.data;

      if (respData.code === "0000") {
        alertSuccess({
          message: respData.message,
          onClose: () =>
            setMembers(members?.filter((e) => e.userId !== userId)),
        });
      } else {
        alertError();
      }
    } catch (error) {
      alertError({ error });
    }
  };

  return (
    <div className={parentStyles.container}>
      <div className={parentStyles.reco_head_box}>
        <Avatar />
        <b>Manager</b>
        <button
          type="button"
          className={parentStyles.btn_close}
          onClick={() => closeModal(modalId)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className={parentStyles.reco_body_box}>
        <div className={parentStyles.inv_box}>
          {/* {members?
                    members.map((member) => <MemberCard key={member.userId} id={member.userId} userName={member.userName} age={member.age} addr={member.addr} img={member.imgUrl} interests={member.interests} onClick={()=>{invite(member.userId)}} />)
                    : '초대할 수 있는 사용자가 없습니다.'
                } */}
        </div>
      </div>
    </div>
  );
};

export default MemberResult;
