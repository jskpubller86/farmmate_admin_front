import React from "react";
import styles from "./leaseList.module.css";
import { Button, Avatar } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";

interface LeaseListProps {
  modalId: number;
  onChat?: (applicantId: string) => void;
  onContract?: (applicantId: string) => void;
  onClose?: () => void;
}

const LeaseList: React.FC<LeaseListProps> = ({
  modalId,
  onChat,
  onContract,
  onClose,
}) => {
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleClose = () => {
    closeModal(modalId);
    if (onClose) {
      onClose();
    }
  };

  const handleChat = (applicantId: string) => {
    if (onChat) {
      onChat(applicantId);
    }
  };

  const handleContract = (applicantId: string) => {
    // 모달 닫기
    closeModal(modalId);

    // LeaseContract.tsx로 이동
    navigate("/lease/contract");

    // 콜백 함수가 있다면 실행
    if (onContract) {
      onContract(applicantId);
    }
  };

  // 임시 데이터 - 실제로는 props로 받거나 API에서 가져올 수 있습니다
  const applicantList = [
    {
      id: "1",
      name: "김민수",
      message: "성이름 님께서 지원하셨습니다.",
      gender: "여성",
      age: "20세",
      profileImage: "/images/img_profile.svg",
    },
    {
      id: "2",
      name: "이영희",
      message: "성이름 님께서 지원하셨습니다.",
      gender: "여성",
      age: "20세",
      profileImage: "/images/img_profile.svg",
    },
    {
      id: "3",
      name: "박철수",
      message: "성이름 님께서 지원하셨습니다.",
      gender: "여성",
      age: "20세",
      profileImage: "/images/img_profile.svg",
    },
    {
      id: "4",
      name: "정수진",
      message: "성이름 님께서 지원하셨습니다.",
      gender: "여성",
      age: "20세",
      profileImage: "/images/img_profile.svg",
    },
    {
      id: "5",
      name: "한지훈",
      message: "성이름 님께서 지원하셨습니다.",
      gender: "여성",
      age: "20세",
      profileImage: "/images/img_profile.svg",
    },
    {
      id: "6",
      name: "송미영",
      message: "성이름 님께서 지원하셨습니다.",
      gender: "여성",
      age: "20세",
      profileImage: "/images/img_profile.svg",
    },
  ];

  return (
    <div className={styles.modal_content}>
      {/* 모달 헤더 */}
      <div className={styles.modal_header}>
        <h2 className={styles.modal_title}>신청자목록</h2>
        <button
          type="button"
          className={styles.btn_close}
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* 모달 바디 */}
      <div className={styles.modal_body}>
        <div className={styles.applicant_list}>
          {applicantList.map((applicant) => (
            <div key={applicant.id} className={styles.applicant_item}>
              <div className={styles.applicant_profile}>
                <Avatar
                  src={applicant.profileImage}
                  size="sm"
                  className={styles.profile_image}
                />
              </div>

              <div className={styles.applicant_info}>
                <span className={styles.applicant_message}>
                  {applicant.message}
                </span>
                <span className={styles.gender}>{applicant.gender}</span>
                <span className={styles.age}>{applicant.age}</span>
              </div>

              <div className={styles.action_buttons}>
                <Button
                  type="button"
                  size="xs"
                  color="point"
                  onClick={() => handleChat(applicant.id)}
                  className={styles.btn_test}
                >
                  채팅
                </Button>
                <Button
                  type="button"
                  size="xs"
                  color="point"
                  onClick={() => handleContract(applicant.id)}
                  className={styles.btn_test}
                >
                  계약하기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaseList;
