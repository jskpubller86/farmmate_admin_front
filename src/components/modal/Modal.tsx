import React, { useRef, useState } from 'react'
import styles from './modal.module.css'

interface ModalProps {
  id: number;
  children?:React.ReactNode;
  close:(id:number)=>any;
  type?:ModalType;
  maxWidth?:number;
}

export type ModalType = 'default'|'none';

const Modal: React.FC<ModalProps> = ({id, children, type='default', close, maxWidth=73.142}) => {
  // 모달 닫기 핸들러 
  const closeModal = (e:React.MouseEvent<HTMLDivElement>) =>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if(e.target !== e.currentTarget){
      return;
    }
    close(id);
  }

  /* todo: 
   * 1. 카테고리 네비게이션을 클릭했을 때 카테고리에 속한 상품들이 나와야 함.
   * 2. 카테고리 네비게이션은 클릭했을 때 활성화가 되어야 하고 이전 네비들은 비활성화 되어야 함.
   */
  // 렌더링
  return (
    <div className={styles.modal_wrap} onClick={closeModal}>
        <section className={styles['modal_'+type]} style={{maxWidth: `${maxWidth}rem`}}>
          {children}
        </section>
    </div>
  )
}

export default Modal