import React from "react";
import Modal from "../../components/modal/Modal";
import LeaseList from "./leaseList";
import useModal from "../../hooks/useModal";

interface LeaseListModalProps {
  modalId: number;
  onChat?: (applicantId: string) => void;
  onContract?: (applicantId: string) => void;
  onClose?: () => void;
}

const LeaseListModal: React.FC<LeaseListModalProps> = ({
  modalId,
  onChat,
  onContract,
  onClose,
}) => {
  const { closeModal } = useModal();

  const handleClose = (id: number) => {
    closeModal(id);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal id={modalId} close={handleClose} maxWidth={37.5}>
      <LeaseList
        modalId={modalId}
        onChat={onChat}
        onContract={onContract}
        onClose={onClose}
      />
    </Modal>
  );
};

export default LeaseListModal;
