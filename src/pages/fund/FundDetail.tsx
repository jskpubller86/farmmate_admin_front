import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./fund.module.css";
import { Button, Avatar, Badge } from "../../components/ui";

const FundDetail: React.FC = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 56,
    seconds: 45,
  });

  // 이미지 슬라이더 데이터
  const images = [
    "/images/xcb0.jpg",
    "/images/xcb1.jpg",
    "/images/xcb2.jpg",
    "/images/xcb3.jpg",
    "/images/xcb4.jpg",
  ];

  // 타이머 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 이미지 슬라이더 네비게이션
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // 시간 포맷팅
  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <div className={styles.fund_detail_container}>
      {/* Status Badges */}
      <div className={styles.status_badges}>
        <Badge
          className={`${styles.status_badge} ${styles.status_badge_recruiting}`}
        >
          모집중
        </Badge>
        <Badge
          className={`${styles.status_badge} ${styles.status_badge_default}`}
        >
          진행중
        </Badge>
        <Badge
          className={`${styles.status_badge} ${styles.status_badge_default}`}
        >
          완료
        </Badge>
      </div>

      {/* Fund Title */}
      <h1 className={styles.fund_title}>
        팀원을 모집합니다. 여기는 즐거운 어쩌고 저쩌고 입니다.
      </h1>

      {/* Image Slider */}
      <div className={styles.image_slider}>
        <button
          className={`${styles.slider_arrow} ${styles.slider_arrow_left}`}
          onClick={prevImage}
        >
          ‹
        </button>
        <img
          src={images[currentImageIndex]}
          alt="Fund Image"
          className={styles.slider_image}
        />
        <button
          className={`${styles.slider_arrow} ${styles.slider_arrow_right}`}
          onClick={nextImage}
        >
          ›
        </button>
      </div>

      {/* Farm Owner Info */}
      <div className={styles.farm_owner_info}>
        <Avatar
          src="/images/img_profile.svg"
          className={styles.farm_owner_avatar}
        />
        <div className={styles.farm_owner_name}>농장주 이름</div>
      </div>

      {/* Fund Description */}
      <div className={styles.fund_description}>
        [소개] 배추좀 팔아보려고 합니다. 200포기를 단가 천원에 팔 겁니다. 저에
        펀드하세요
      </div>

      {/* Fund Stats */}
      <div className={styles.fund_stats}>
        <div className={styles.stat_item}>
          <span className={styles.stat_label}>수량 :</span>
          <span className={styles.stat_value}>1000 포기</span>
        </div>
        <div className={styles.stat_item}>
          <span className={styles.stat_label}>단가 :</span>
          <span className={styles.stat_value}>10,000 원</span>
        </div>
        <div className={styles.stat_item}>
          <span className={styles.stat_label}>달성한 수량 :</span>
          <span
            className={`${styles.stat_value} ${styles.stat_value_achieved}`}
          >
            25 포기
          </span>
        </div>
        <div className={styles.stat_item}>
          <span className={styles.stat_label}>펀딩한 수량 :</span>
          <span className={`${styles.stat_value} ${styles.stat_value_funded}`}>
            10 포기
          </span>
        </div>
        <div className={styles.stat_item}>
          <span className={styles.stat_label}>펀딩한 금액 :</span>
          <span className={`${styles.stat_value} ${styles.stat_value_funded}`}>
            100,000 원
          </span>
        </div>
      </div>

      {/* Fund Period */}
      <div className={styles.fund_stats}>
        <div className={styles.stat_item}>
          <span className={styles.stat_label}>기간 :</span>
          <span className={styles.stat_value}>2025.09.01 ~ 2025.09.10</span>
        </div>
      </div>

      {/* Fund Location */}
      <div className={styles.fund_location}>
        <div className={styles.location_text}>
          농장 : 서울특별시 강남구 테헤란로 152, 강남파이낸스센터 (GFC)
        </div>
        <div className={styles.location_map}>🗺️</div>
      </div>

      {/* Participants */}
      <div className={styles.participants}>
        <div className={styles.participants_title}>참여인원(10)</div>
        <div className={styles.participants_list}>
          {Array.from({ length: 10 }, (_, i) => (
            <Avatar
              key={i}
              src="/images/img_profile.svg"
              className={styles.participant_avatar}
            />
          ))}
        </div>
      </div>

      {/* Timer */}
      <div className={styles.timer_section}>
        <div className={styles.timer_label}>남은 시간</div>
        <div className={styles.timer_value}>
          {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
          {formatTime(timeLeft.seconds)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.action_buttons}>
        <Button
          className={`${styles.action_button} ${styles.action_button_primary}`}
        >
          펀딩하기
        </Button>
        <Button
          className={`${styles.action_button} ${styles.action_button_danger}`}
        >
          취소
        </Button>
        <Button
          className={`${styles.action_button} ${styles.action_button_secondary}`}
        >
          수정
        </Button>
      </div>
    </div>
  );
};

export default FundDetail;
