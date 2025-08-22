import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import parentStyles from "../memberReco.module.css";
import styles from "./recoSub.module.css";
import { Avatar, Badge, Button } from "../../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAlert, useAPI, useModal } from "../../../hooks";
import { appConsole } from "../../../utils";
// import MemberResult from './MemberResult'
import { useForm } from "react-hook-form";

interface Props {
  modalId: number;
  teamId: string;
}

interface InterestProps {
  name: string;
  value: string;
}

const InteractionOpts: React.FC<Props> = ({ modalId, teamId }) => {
  const { openModal, closeModal } = useModal();
  const [interests, setInterests] = useState<InterestProps[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { alertError, alertSuccess } = useAlert();
  const api = useAPI();
  // 폼 요소 검증을 위한 훅
  const { register, handleSubmit } = useForm();

  // 관심사 목록을 조회
  useEffect(() => {
    (async () => {
      try {
        const resp = await api.get("/user/readInterests");
        const { code, data } = resp.data;
        if (code === "0000") {
          setInterests(data);
        } else {
          alertError();
        }
      } catch (error) {
        alertError({ error });
      }
    })();
  }, []);

  /**
   * 관심사 클릭시 요소 선택 상태 변경
   */
  const handleIntrest = (value: string) => {
    if (selectedInterests.includes(value)) {
      setSelectedInterests(selectedInterests.filter((v) => v !== value));
    } else {
      setSelectedInterests((prev) => [...prev, value]);
    }
  };

  /**
   * 관심사가 선택되었는지 여부
   * @param value
   * @returns
   */
  const isSelectedInterest = (value: string) => {
    return selectedInterests.includes(value);
  };

  const submit = async (data: any) => {
    //   try {
    //       const resp = await api.get('/member/invitableUsers', {teamId, interestCds:selectedInterests});
    //       const {code, data} = resp.data;
    //       if(code === '0000'){
    //           closeModal(modalId);
    //           openModal(modalId+1, <MemberResult modalId={modalId+1} teamId={teamId} memberList={data} />);
    //       } else {
    //           alertError();
    //       }
    //   } catch(error) {
    //       alertError({error});
    //   }
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
          <p>관심사를 선택해주세요.</p>
        </div>

        <div className={styles.inter_group}>
          {interests?.map((e) => {
            return (
              <Badge
                size="lg"
                isSelected={isSelectedInterest(e.value)}
                onClick={() => handleIntrest(e.value)}
              >
                {e.name}
              </Badge>
            );
          })}
        </div>

        <div className={parentStyles.btn_group}>
          <Button type="submit">완료</Button>
        </div>
      </form>
    </div>
  );
};

export default InteractionOpts;
