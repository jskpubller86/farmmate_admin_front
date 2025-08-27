import React from "react";
import Modal from "../../components/modal/Modal";
import LeaseContractView from "./LeaseContractViewModal";
import useModal from "../../hooks/useModal";

interface LeaseContractModalProps {
  modalId: number;
  contractData?: {
    tenantName?: string;
    tenantContact?: string;
    tenantIdNumber?: string;
    tenantAddress?: string;
    landlordName?: string;
    landlordContact?: string;
    landlordIdNumber?: string;
    landlordAddress?: string;
    landName?: string;
    landLocation?: string;
    landUse?: string;
    deposit?: string;
    monthlyRent?: string;
    midPayment?: string;
    balance?: string;
    downPayment?: string;
    leaseStartDate?: string;
    leaseEndDate?: string;
    monthlyRentDate?: string;
    contractDate?: string;
  };
}

/**
 * 임대차 계약서 모달 래퍼
 * @returns
 */
const LeaseContractModal: React.FC<LeaseContractModalProps> = ({
  modalId,
  contractData,
}) => {
  const { closeModal } = useModal();

  const handleClose = (id: number) => {
    closeModal(id);
  };

  return (
    <Modal id={modalId} close={handleClose} maxWidth={90} type="default">
      <LeaseContractView modalId={modalId} contractData={contractData} />
    </Modal>
  );
};

export default LeaseContractModal;
