import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./land.module.css";
import layout from "../../layout/layout.module.css";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [landData, setLandData] = useState<LandDetailData | null>(null);
  const [isWished, setIsWished] = useState(false);

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

  const nextImage = () => {
    if (landData) {
      setCurrentImageIndex((prev) => 
        prev === landData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (landData) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? (landData.images.length - 1) : prev - 1
      );
    }
  };

  const handleApply = () => {
    // 신청하기 로직
    alert("신청이 완료되었습니다!");
  };

  const handleWish = () => {
    setIsWished(!isWished);
    // API 호출 로직 추가
  };

  const handleShare = () => {
    // 공유하기 로직
    if (navigator.share) {
      navigator.share({
        title: landData?.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    }
  };

  if (!landData) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <div className={layout.container_full}>
      <div className={styles.land_detail_container}>
        {/* 뒤로가기 버튼 */}
        <div className={styles.back_section}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.back_button}
          >
            ← 이전으로
          </button>
        </div>
        
        {/* 상태 배지 */}
        <div className={styles.status_badge}>
          <span className={`${styles.status} ${styles[`status_${landData.status}`]}`}>
            {landData.status}
          </span>
        </div>

        {/* 제목 */}
        <h1 className={styles.land_detail_title}>{landData.title}</h1>

        {/* 이미지 캐러셀 */}
        <div className={styles.image_carousel}>
          <button 
            className={styles.carousel_arrow} 
            onClick={prevImage}
            aria-label="이전 이미지"
          >
            &lt;
          </button>
          
          <div className={styles.carousel_image_container}>
            <img
              src={landData.images[currentImageIndex]}
              alt={`${landData.title} 이미지 ${currentImageIndex + 1}`}
              className={styles.carousel_image}
            />
          </div>
          
          <button 
            className={styles.carousel_arrow} 
            onClick={nextImage}
            aria-label="다음 이미지"
          >
            &gt;
          </button>
          
          {/* 이미지 인디케이터 */}
          <div className={styles.image_indicators}>
            {landData.images.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentImageIndex ? styles.indicator_active : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`이미지 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </div>

        {/* 작성자 정보 */}
        <div className={styles.owner_info}>
          <img
            src={landData.ownerImage}
            alt={`${landData.ownerName} 프로필`}
            className={styles.owner_avatar}
          />
          <span className={styles.owner_name}>{landData.ownerName}</span>
        </div>

        {/* 주요 정보 카드 */}
        <div className={styles.info_cards}>
          <div className={styles.info_card}>
            <div className={styles.info_label}>가격</div>
            <div className={styles.info_value}>{landData.price.toLocaleString()}원</div>
          </div>
          <div className={styles.info_card}>
            <div className={styles.info_label}>면적</div>
            <div className={styles.info_value}>{landData.area}평</div>
          </div>
          <div className={styles.info_card}>
            <div className={styles.info_label}>카테고리</div>
            <div className={styles.info_value}>{landData.category}</div>
          </div>
          <div className={styles.info_card}>
            <div className={styles.info_label}>참여인원</div>
            <div className={styles.info_value}>{landData.currentMember}/{landData.endMember}</div>
          </div>
        </div>

        {/* 소개 섹션 */}
        <div className={styles.description_section}>
          <h3 className={styles.description_title}>[소개]</h3>
          <p className={styles.description_text}>{landData.description}</p>
        </div>

        {/* 기간 정보 */}
        <div className={styles.period_info}>
          <h3 className={styles.info_section_title}>[기간]</h3>
          <div className={styles.period_content}>
            {landData.startDate} ~ {landData.endDate}
          </div>
        </div>

        {/* 장소 정보 */}
        <div className={styles.location_info}>
          <h3 className={styles.info_section_title}>[장소]</h3>
          <div className={styles.location_content}>
            <div className={styles.location_main}>{landData.location}</div>
            <div className={styles.location_detail}>{landData.detailLocation}</div>
            <div className={styles.map_icon}>🗺️ 지도보기</div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className={styles.action_buttons}>
          <button 
            className={`${styles.action_button} ${styles.wish_button} ${isWished ? styles.wished : ''}`}
            onClick={handleWish}
          >
            {isWished ? '❤️' : '🤍'} 찜하기
          </button>
          <button 
            className={`${styles.action_button} ${styles.share_button}`}
            onClick={handleShare}
          >
            📤 공유하기
          </button>
        </div>

        {/* 신청하기 버튼 */}
        <div className={styles.apply_section}>
          <button 
            className={styles.apply_button}
            onClick={handleApply}
          >
            신청하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandDetail;
