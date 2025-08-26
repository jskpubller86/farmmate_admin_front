import React, { FormEventHandler, useState } from "react";
import uploadFile from "../../utils/file_upload";
import { useModal } from "../../hooks";
import { Button } from "../../components/ui";

const ModalSample: React.FC = () => {
  const {openModal, closeModal} = useModal();

  
  return <><Button onClick={() => openModal(1, '이것은 팝업니다.', 30, 'none')}>모달 열기</Button></>;
};

export default ModalSample;
