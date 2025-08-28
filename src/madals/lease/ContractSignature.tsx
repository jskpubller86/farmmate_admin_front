import React, { useState, useRef, useEffect } from "react";
import styles from "./contractSignature.module.css";
import { Button } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/useModal";

interface ContractSignatureProps {
  modalId: number;
  signerType: "tenant" | "landlord";
  signerName?: string;
  onConfirm?: (signatureData: string) => void;
  onCancel?: () => void;
}

const ContractSignature: React.FC<ContractSignatureProps> = ({
  modalId,
  signerType,
  signerName,
  onConfirm,
  onCancel,
}) => {
  const { closeModal } = useModal();
  const [signatureData, setSignatureData] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 캔버스 크기를 CSS와 일치시키기
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // 캔버스 초기 설정
      ctx.strokeStyle = "black";
      ctx.lineJoin = "round";
      ctx.lineWidth = 3;
    };

    resizeCanvas();

    // 윈도우 리사이즈 시 캔버스 크기 조정
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const getCoordinates = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  const drawLine = (
    original: { x: number; y: number },
    newPos: { x: number; y: number }
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(original.x, original.y);
    ctx.lineTo(newPos.x, newPos.y);
    ctx.closePath();
    ctx.stroke();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsPainting(true);
    setMousePosition(getCoordinates(event));
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPainting && mousePosition) {
      const newMousePosition = getCoordinates(event);
      drawLine(mousePosition, newMousePosition);
      setMousePosition(newMousePosition);
    }
  };

  const handleMouseUp = () => {
    setIsPainting(false);
  };

  const handleMouseLeave = () => {
    setIsPainting(false);
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 캔버스 전체 영역을 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData("");
  };

  const handleClose = () => {
    closeModal(modalId);
  };

  const handleConfirm = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 캔버스를 이미지 데이터로 변환
    const imageData = canvas.toDataURL("image/png");
    setSignatureData(imageData);

    if (onConfirm) {
      onConfirm(imageData);
    }
    closeModal(modalId);
  };

  const handleCancel = () => {
    resetCanvas();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className={styles.modal_content}>
      {/* 모달 헤더 */}
      <div className={styles.modal_header}>
        <div className={styles.header_content}>
          <div className={styles.avatar_section}>
            <div className={styles.avatar}>
              <div className={styles.avatar_image} />
              <div className={styles.edit_icon}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <span className={styles.tenant_info}>
              {signerType === "tenant" ? "임차인" : "임대인"} 정보
              {signerName && ` - ${signerName}`}
            </span>
          </div>
          <button
            type="button"
            className={styles.btn_close}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>

      {/* 모달 바디 */}
      <div className={styles.modal_body}>
        <div className={styles.signature_section}>
          <h3 className={styles.signature_title}>
            {signerType === "tenant" ? "임차인" : "임대인"} 서명
            {signerName && ` - ${signerName}`}
          </h3>
          <div className={styles.signature_box}>
            <canvas
              ref={canvasRef}
              className={styles.signature_canvas}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className={styles.button_section}>
          <Button
            type="button"
            size="sm"
            color="secondary"
            onClick={handleCancel}
            className={styles.btn_cancel}
          >
            취소
          </Button>
          <Button
            type="button"
            size="sm"
            color="point"
            onClick={handleConfirm}
            className={styles.btn_confirm}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractSignature;
