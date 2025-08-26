import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Avatar, Badge } from '../../components/ui';
import styles from './myLeaseDetail.module.css';
import layout from '../../layout/layout.module.css';

interface MyLeaseDetailData {
  id: string;
  status: '모집중' | '모집완료' | '마감임박';
  title: string;
  images: string[];
  owner: {
    name: string;
    avatar: string;
  };
  description: string;
  period: {
    start: string;
    end: string;
  };
  location: string;
  currentMembers: number;
  maxMembers: number;
  price: string;
  area: string;
  applicants: number;
}

const MyLeaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [leaseData, setLeaseData] = useState<MyLeaseDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // 실제로는 API에서 데이터를 가져와야 합니다
    setTimeout(() => {
      setLeaseData({
        id: id || '1',
        status: '모집중',
        title: '땅 내놓는다. 1000 / 50에 24평',
        images: [
          '/images/fundcard_img.svg',
          '/images/fundcard_img.svg',
          '/images/fundcard_img.svg'
        ],
        owner: {
          name: '테스형',
          avatar: '/images/farmowner_img.svg'
        },
        description: '[소개]\n\n토지 소개글 안에 들어갈 요소들 토지 가격 등등 계약서 언제 작성할건지 언제 마감할 예정인지 등등\n토지 소개와 계약에 관련된 간단한 글들 토지 소개와 계약에 관련된 간단한 글들\n토지 소개와 계약에 관련된 간단한 글들\n토지 소개와 계약에 관련된 간단한 글들\n토지 소개와 계약에 관련된 간단한 글들',
        period: {
          start: '2025.05.31 07:00:10',
          end: '2025.06.01 07:00:10'
        },
        location: '서울특별시 강남구 삼성로 154 (대치동, 강남구의회, 강남구민회관)',
        currentMembers: 10,
        maxMembers: 15,
        price: '1000',
        area: '24평',
        applicants: 5
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBack = () => {
    navigate('/lease/my-lease');
  };

  const nextImage = () => {
    if (leaseData) {
      setCurrentImageIndex((prev) => 
        prev === leaseData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (leaseData) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? leaseData.images.length - 1 : prev - 1
      );
    }
  };

  const handleEdit = () => {
    navigate('/land/registration');
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      alert('삭제되었습니다.');
      navigate('/lease/my-lease');
    }
  };

  const handleViewApplicants = () => {
    navigate(`/lease/${id}/applicants`);
  };

  if (loading) {
    return (
      <div className={layout.container_full}>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  if (!leaseData) {
    return (
      <div className={layout.container_full}>
        <div className={styles.error}>데이터를 불러올 수 없습니다.</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '모집중':
        return 'point';
      case '모집완료':
        return 'point2';
      case '마감임박':
        return 'point3';
      default:
        return 'secondary';
    }
  };

  return (
    <div className={layout.container_full}>
      <div className={styles.my_lease_detail_container}>
        {/* 뒤로가기 버튼 */}
        <div className={styles.back_section}>
          <Button
            onClick={handleBack}
            className={styles.back_button}
            color="secondary"
          >
            ← 뒤로가기
          </Button>
        </div>

        {/* 상태 배지 */}
        <div className={styles.status_badge}>
          <Badge
            color={getStatusColor(leaseData.status)}
            size="lg"
            isSelected={true}
          >
            {leaseData.status}
          </Badge>
        </div>

        {/* 제목 */}
        <h1 className={styles.my_lease_detail_title}>{leaseData.title}</h1>

        {/* 이미지 캐러셀 */}
        <div className={styles.image_carousel}>
          <div className={styles.carousel_image_container}>
            <img
              src={leaseData.images[currentImageIndex]}
              alt={`${leaseData.title} 이미지 ${currentImageIndex + 1}`}
              className={styles.carousel_image}
            />
            
            {/* 화살표 버튼 */}
            <button
              className={styles.carousel_arrow}
              onClick={prevImage}
              aria-label="이전 이미지"
            >
              ‹
            </button>
            <button
              className={styles.carousel_arrow}
              onClick={nextImage}
              aria-label="다음 이미지"
            >
              ›
            </button>

            {/* 이미지 인디케이터 */}
            <div className={styles.image_indicators}>
              {leaseData.images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${
                    index === currentImageIndex ? styles.indicator_active : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`이미지 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 지주 정보 */}
        <div className={styles.owner_info}>
          <Avatar
            src={leaseData.owner.avatar}
            size="lg"
          />
          <div className={styles.owner_name}>{leaseData.owner.name}</div>
        </div>

        {/* 정보 카드들 */}
        <div className={styles.info_cards}>
          <div className={styles.info_card}>
            <div className={styles.info_label}>참여 인원</div>
            <div className={styles.info_value}>
              {leaseData.currentMembers} / {leaseData.maxMembers}명
            </div>
          </div>
          <div className={styles.info_card}>
            <div className={styles.info_label}>가격</div>
            <div className={styles.info_value}>{leaseData.price}원</div>
          </div>
          <div className={styles.info_card}>
            <div className={styles.info_label}>면적</div>
            <div className={styles.info_value}>{leaseData.area}</div>
          </div>
          <div className={styles.info_card}>
            <div className={styles.info_label}>신청자</div>
            <div className={styles.info_value}>{leaseData.applicants}명</div>
          </div>
        </div>

        {/* 설명 섹션 */}
        <div className={styles.description_section}>
          <h2 className={styles.info_section_title}>토지 소개</h2>
          <div className={styles.description_text}>{leaseData.description}</div>
        </div>

        {/* 기간 정보 */}
        <div className={styles.period_info}>
          <h2 className={styles.info_section_title}>임대 기간</h2>
          <div className={styles.period_content}>
            {leaseData.period.start} ~ {leaseData.period.end}
          </div>
        </div>

        {/* 위치 정보 */}
        <div className={styles.location_info}>
          <h2 className={styles.info_section_title}>위치</h2>
          <div className={styles.location_content}>
            <div className={styles.location_main}>{leaseData.location}</div>
            <div className={styles.location_detail}>
              <span className={styles.map_icon}>📍</span> 지도에서 보기
            </div>
          </div>
        </div>

        {/* 관리자 액션 버튼들 */}
        <div className={styles.admin_actions}>
          <Button
            onClick={handleViewApplicants}
            className={styles.view_applicants_button}
            color="point"
            size="lg"
          >
            신청자 보기 ({leaseData.applicants}명)
          </Button>
          
          <div className={styles.edit_delete_actions}>
            <Button
              onClick={handleEdit}
              className={styles.edit_button}
              color="secondary"
            >
              수정하기
            </Button>
            <Button
              onClick={handleDelete}
              className={styles.delete_button}
              color="danger"
            >
              삭제하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLeaseDetail;
