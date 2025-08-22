import React, { useContext } from 'react'
import styles from './memberReco.module.css'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button } from '../../components/ui';
import ModalDispatchContext, { ModalDispatchContextProps } from '../../contexts/modal/ModalDispatchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Interaction from './reco_sub/InterestOpts';
import LocationOpts from './reco_sub/LocationOpts';
import InteractionOpts from './reco_sub/InterestOpts';

interface Props  {
    modalId: number;
    teamId: string;
}

/**
 * 추천 유형 선택화면
 * @returns 
 * @author 김종수
 */
const SelectMemberOpts: React.FC<Props> = ({modalId, teamId}) => {
  const maxWidth = 35.714;
  const [openModal, closeModal] = useContext(ModalDispatchContext);
  return (
    <div className={styles.container}>
        <div className={styles.reco_head_box}><Avatar /> <b>Manager</b> <button type='button' className={styles.btn_close} onClick={()=>closeModal(modalId)}><FontAwesomeIcon icon={faXmark} /></button></div>
        <div className={styles.reco_body_box}>
          <div className={styles.ask_box}>
            <h4>팀원 초대</h4>
            <p>검색 옵션을 선택해주세요.</p>
          </div>
          <div className={styles.btn_group}>
              <Button type='button' className={styles.btn_select} onClick={()=>{closeModal(modalId);openModal(modalId+1, <LocationOpts modalId={modalId+1} teamId={teamId} />, maxWidth)}}>장소</Button>
              <Button type='button' className={styles.btn_select} onClick={()=>{closeModal(modalId);openModal(modalId+1, <InteractionOpts modalId={modalId+1} teamId={teamId}/>, maxWidth);}}>관심사</Button>
          </div>
        </div>
    </div>
  )
}

export default SelectMemberOpts