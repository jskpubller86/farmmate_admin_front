import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./LandDetail.module.css";
import { Button, Avatar, Badge, LikeIt } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import {useModal} from "../../hooks";
import ApplicantListModal from "../../madals/lease/applicant/ApplicantListModal";
import LeaseContractViewModal from "../../madals/lease/LeaseContractModal";

interface LandDetailData {
  id: string;
  title: string;
  status: "모집중" | "계약중" | "계약완료";
  images: string[];
  ownerName: string;
  ownerImage: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  detailLocation: string;
  currentMember: number;
  endMember: number;
  price: number;
  area: number;
  category: string;
}

const LandDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [landData, setLandData] = useState<LandDetailData | null>(null);
  const { openModal } = useModal();

  useEffect(() => {
    // 실제로는 API 호출로 데이터를 가져와야 합니다
    // 지금은 더미 데이터를 사용합니다
    const dummyData: LandDetailData = {
      id: id || "1",
      title: "땅 내놔는다. 2000 / 1000에 30평",
      status: "모집중",
      images: [
        "/images/fundcard_img.svg",
        "/images/xcb0.jpg",
        "/images/xcb1.jpg",
        "/images/xcb2.jpg"
      ],
      ownerName: "테스형",
      ownerImage: "/images/farmowner_img.svg",
      description: "토지 소개글 안에 들어갈 요소들 토지 가격 등등 계약서 언제 작성할건지 언제 마감할 예정인지 등등\n토지 소개와 계약에 관련된 간단한 글들 토지 소개와 계약에 관련된 간단한 글들 토지 소개와 계약에 관련된 간단한 글들 토지 소개와 계약에 관련된 간단한 글들",
      startDate: "2025.05.28 05:00",
      endDate: "2025.05.28 07:00",
      location: "서울특별시 강남구 테헤란로 152",
      detailLocation: "강남파이낸스센터 (GFC)",
      currentMember: 12,
      endMember: 24,
      price: 2000,
      area: 30,
      category: "농지"
    };
    setLandData(dummyData);
  }, [id]);

  const handleApply = () => {
    // 신청하기 로직
    alert("신청이 완료되었습니다!");
  };

  if (!landData) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
  <div className={styles.land_detail_container}>
    {/* 뒤로가기 버튼 */}
    <div>
      <Button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.back_button}
        color="secondary"
        size="sm"
      >
        ← 이전으로
      </Button>
    </div>
    
    {/* 상태 배지 */}
    <div>
      <Badge color="point2" size="lg">모집중</Badge>
      <Badge color="point3" size="lg">계약중</Badge>
      <Badge color="secondary" size="lg">계약완료</Badge>
    </div>

    {/* 제목 */}
    <h2 className={styles.land_detail_title}>{landData.title}</h2>

    {/* 유틸버튼 그룹 */}
    <div className={styles.button_group}>
      <Button color="point" size="sm" onClick={() => openModal(1, <ApplicantListModal modalId={1} />)}>신청자 목록</Button>
      <Button color="point" size="sm" onClick={() => openModal(2, <LeaseContractViewModal modalId={2} />)}>계약서</Button>
    </div>

    {/* 이미지 슬라이더 */}
    <div className={styles.slider_area}>
        <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} className={styles.slider}>
          {landData.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`${landData.title} 이미지 ${index + 1}`} />
            </div>
          ))}
        </Slider>
    </div>

    {/* 작성자 정보 */}
    <div className={styles.owner_box}>
      <Avatar src={landData.ownerImage} size="lg"/>
      <span>{landData.ownerName}</span>
    </div>

    {/* 소개 섹션 */}
    <div className={styles.description_section}>
      <h3>[소개]</h3>
      <p>{landData.description}</p>
    </div>

    {/* 기간 정보 */}
    <div className={styles.period_section}>
      <h3>[기간]</h3>
      <div>
        {landData.startDate} ~ {landData.endDate}
      </div>
    </div>

    {/* 장소 정보 */}
    <div className={styles.location_section}>
      <h3>[장소]</h3>
      <div>{landData.location}</div>
      <div>{landData.detailLocation}</div>
      <div><FontAwesomeIcon icon={faMap} size="2x"/></div>
    </div>

    {/* 신청하기 버튼 */}
    <div className={styles.button_group}>
      <Button onClick={handleApply} color="point2" size="lg">신청하기</Button>
      <Button color="secondary" size="lg">수정</Button>
      <Button color="point3" size="lg">찜하기</Button>
      <Button color="danger" size="lg">신청취소</Button>
      <Button color="danger" size="lg">삭제</Button>
    </div>
  </div>
  );
};

export default LandDetail;
