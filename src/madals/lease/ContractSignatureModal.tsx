import React from "react";
import Modal from "../../components/modal/Modal";
import ContractSignature from "./ContractSignature";
import useModal from "../../hooks/useModal";

interface ContractSignatureModalProps {
  modalId: number;
  onConfirm?: (signatureData: string) => void;
  onCancel?: () => void;
}

const ContractSignatureModal: React.FC<ContractSignatureModalProps> = ({
  modalId,
  onConfirm,
  onCancel,
}) => {
  const { closeModal } = useModal();

  const handleClose = (id: number) => {
    closeModal(id);
  };

  return (
    <Modal id={modalId} close={handleClose} maxWidth={23.7}>
      <ContractSignature
        modalId={modalId}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default ContractSignatureModal;
