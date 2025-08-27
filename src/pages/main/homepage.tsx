import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Badge } from "../../components/ui";
import {
  MarketCard,
  LandCard,
  SortTabs,
  Pagination,
} from "../../components/sets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faMapMarkerAlt,
  faCamera,
  faChartLine,
  faSun,
  faCloud,
  faCloudRain,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./main.module.css";

export default function Homepage() {
  const navigate = useNavigate();

  // 페이지 이동 함수들
  const handleStartNow = () => {
    navigate("/market_list"); // 마켓 목록으로 이동
  };

  const handleLearnMore = () => {
    navigate("/qanda"); // Q&A 페이지로 이동
  };

  const handleCropDetail = () => {
    navigate("/market_list"); // 작물 상세 정보는 마켓에서 확인
  };

  const handleCropGuide = () => {
    navigate("/qanda"); // 재배 가이드는 Q&A에서 확인
  };

  const handlePhotoCapture = () => {
    navigate("/market_write"); // 사진 촬영은 상품 등록 페이지로
  };

  const handleTreatmentGuide = () => {
    navigate("/qanda"); // 치료법은 Q&A에서 확인
  };

  const handleInvestment = () => {
    navigate("/lease"); // 투자는 임대 페이지로
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero_section}>
        <div className={styles.hero_background}></div>
        <div className={styles.hero_content}>
          <h1 className={styles.hero_title}>FARM MATE</h1>
          <p className={styles.hero_description}>
            AI 기술로 농업을 혁신합니다. 위치 기반 작물 추천부터 병충해
            진단까지, 스마트한 농업 솔루션을 경험하세요.
          </p>
          <div className={styles.hero_buttons}>
            <Button
              size="lg"
              color="point"
              className="px-8 py-3"
              onClick={handleStartNow}
            >
              지금 시작하기
            </Button>
            <Button
              size="lg"
              color="secondary"
              className="px-8 py-3"
              onClick={handleLearnMore}
            >
              더 알아보기
            </Button>
          </div>
        </div>
      </section>

      {/* Data Visualization Section */}
      <section className={styles.data_section}>
        <div className={styles.data_container}>
          <h2 className={styles.data_title}>데이터 분석</h2>
          <div className={styles.data_grid}>
            {/* 과거 판매량 */}
            <div className={styles.data_card}>
              <div className={styles.data_header}>
                <h3 className={styles.data_card_title}>과거 판매량</h3>
                <p className={styles.data_card_subtitle}>
                  지난 6개월 판매 실적
                </p>
              </div>
              <div className={styles.data_content}>
                <div className={styles.chart_container}>
                  {/* Line Chart */}
                  <div className={styles.chart_svg}>
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <polyline
                        className={styles.chart_line}
                        points="0,80 20,65 40,50 60,35 80,20 100,5"
                      />
                      {/* Data Points */}
                      <circle
                        cx="0"
                        cy="80"
                        r="3"
                        className={styles.chart_point}
                      />
                      <circle
                        cx="20"
                        cy="65"
                        r="3"
                        className={styles.chart_point}
                      />
                      <circle
                        cx="40"
                        cy="50"
                        r="3"
                        className={styles.chart_point}
                      />
                      <circle
                        cx="60"
                        cy="35"
                        r="3"
                        className={styles.chart_point}
                      />
                      <circle
                        cx="80"
                        cy="20"
                        r="3"
                        className={styles.chart_point}
                      />
                      <circle
                        cx="100"
                        cy="5"
                        r="3"
                        className={styles.chart_point}
                      />
                    </svg>
                  </div>
                  {/* Y-axis labels */}
                  <div className={styles.y_axis_labels}>
                    <span>280</span>
                    <span>210</span>
                    <span>140</span>
                    <span>70</span>
                    <span>0</span>
                  </div>
                  {/* X-axis labels */}
                  <div className={styles.x_axis_labels}>
                    <span>2월</span>
                    <span>3월</span>
                    <span>4월</span>
                    <span>5월</span>
                    <span>6월</span>
                    <span>7월</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 현재 재배량 */}
            <div className={styles.data_card}>
              <div className={styles.data_header}>
                <h3 className={styles.data_card_title}>현재 재배량</h3>
                <p className={styles.data_card_subtitle}>
                  지역별 주요 작물 재배 현황
                </p>
              </div>
              <div className={styles.data_content}>
                <div className={styles.chart_container}>
                  {/* Bar Chart */}
                  <div className={styles.chart_bars}>
                    <div className={styles.chart_bar} style={{ height: "60%" }}>
                      <span className={styles.chart_bar_label}>배추</span>
                    </div>
                    <div className={styles.chart_bar} style={{ height: "40%" }}>
                      <span className={styles.chart_bar_label}>무</span>
                    </div>
                    <div className={styles.chart_bar} style={{ height: "80%" }}>
                      <span className={styles.chart_bar_label}>상추</span>
                    </div>
                    <div className={styles.chart_bar} style={{ height: "30%" }}>
                      <span className={styles.chart_bar_label}>시금치</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 미래 예측 */}
            <div className={styles.data_card}>
              <div className={styles.data_header}>
                <h3 className={styles.data_card_title}>미래 예측</h3>
                <p className={styles.data_card_subtitle}>
                  향후 6개월 판매량 예측
                </p>
              </div>
              <div className={styles.data_content}>
                <div className={styles.chart_container}>
                  {/* Dotted Line Chart */}
                  <div className={styles.chart_svg}>
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <polyline
                        className={styles.chart_dotted_line}
                        points="0,70 20,50 40,30 60,10 80,40 100,60"
                      />
                      {/* Data Points */}
                      <circle
                        cx="0"
                        cy="70"
                        r="3"
                        className={styles.chart_point_blue}
                      />
                      <circle
                        cx="20"
                        cy="50"
                        r="3"
                        className={styles.chart_point_blue}
                      />
                      <circle
                        cx="40"
                        cy="30"
                        r="3"
                        className={styles.chart_point_blue}
                      />
                      <circle
                        cx="60"
                        cy="10"
                        r="3"
                        className={styles.chart_point_blue}
                      />
                      <circle
                        cx="80"
                        cy="40"
                        r="3"
                        className={styles.chart_point_blue}
                      />
                      <circle
                        cx="100"
                        cy="60"
                        r="3"
                        className={styles.chart_point_blue}
                      />
                    </svg>
                  </div>
                  {/* Y-axis labels */}
                  <div className={styles.y_axis_labels}>
                    <span>600</span>
                    <span>450</span>
                    <span>300</span>
                    <span>150</span>
                    <span>0</span>
                  </div>
                  {/* X-axis labels */}
                  <div className={styles.x_axis_labels}>
                    <span>7월</span>
                    <span>8월</span>
                    <span>9월</span>
                    <span>10월</span>
                    <span>11월</span>
                    <span>12월</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crop Recommendation Section */}
      <section className={styles.crops_section}>
        <div className={styles.crops_container}>
          <h2 className={styles.crops_title}>작물 추천</h2>
          <div className={styles.crops_grid}>
            {/* Cabbage */}
            <div
              className={styles.crop_card}
              onClick={handleCropDetail}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.crop_content}>
                <div className={styles.crop_icon}>
                  <span>🥬</span>
                </div>
                <h3 className={styles.crop_name}>배추</h3>
                <div className={styles.crop_score}>
                  <span className={styles.crop_score_value}>95</span>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className={styles.crop_score_icon}
                  />
                </div>
                <Badge color="point" size="sm" className={styles.crop_badge}>
                  🍃 높음
                </Badge>
                <p className={styles.crop_description}>
                  현재 시세 상승 + 지역 특산품
                </p>
                <p className={styles.crop_timing}>최적 시기: 가을</p>
              </div>
            </div>

            {/* Radish */}
            <div
              className={styles.crop_card}
              onClick={handleCropDetail}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.crop_content}>
                <div className={styles.crop_icon}>
                  <span>🥕</span>
                </div>
                <h3 className={styles.crop_name}>무</h3>
                <div className={styles.crop_score}>
                  <span className={styles.crop_score_value}>88</span>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className={styles.crop_score_icon}
                  />
                </div>
                <Badge
                  color="secondary"
                  size="sm"
                  className={styles.crop_badge}
                >
                  🍃 중간
                </Badge>
                <p className={styles.crop_description}>
                  안정적 수요 + 재배 용이성
                </p>
                <p className={styles.crop_timing}>최적 시기: 겨울</p>
              </div>
            </div>

            {/* Lettuce */}
            <div
              className={styles.crop_card}
              onClick={handleCropDetail}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.crop_content}>
                <div className={styles.crop_icon}>
                  <span>🥬</span>
                </div>
                <h3 className={styles.crop_name}>상추</h3>
                <div className={styles.crop_score}>
                  <span className={styles.crop_score_value}>82</span>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className={styles.crop_score_icon}
                  />
                </div>
                <Badge
                  color="secondary"
                  size="sm"
                  className={styles.crop_badge}
                >
                  🍃 중간
                </Badge>
                <p className={styles.crop_description}>
                  연중 재배 가능 + 빠른 회전
                </p>
                <p className={styles.crop_timing}>최적 시기: 사계절</p>
              </div>
            </div>

            {/* Spinach */}
            <div
              className={styles.crop_card}
              onClick={handleCropDetail}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.crop_content}>
                <div className={styles.crop_icon}>
                  <span>🥬</span>
                </div>
                <h3 className={styles.crop_name}>시금치</h3>
                <div className={styles.crop_score}>
                  <span className={styles.crop_score_value}>76</span>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className={styles.crop_score_icon}
                  />
                </div>
                <Badge
                  color="secondary"
                  size="sm"
                  className={styles.crop_badge}
                >
                  🍃 중간
                </Badge>
                <p className={styles.crop_description}>
                  겨울철 고수익 + 저장성 우수
                </p>
                <p className={styles.crop_timing}>최적 시기: 겨울</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className={styles.funding_section}>
        <div className={styles.funding_container}>
          <h2 className={styles.funding_title}>인기 상승 물품</h2>
          <div className={styles.funding_grid}>
            <MarketCard
              id={1}
              productName="신선한 유기농 배추"
              productImage="/images/fundcard_img.svg"
              sellerImage="/images/farmowner_img.svg"
              sellerName="청담농장"
              price={18000}
              originalPrice={22000}
              rating={4.8}
              reviewCount={156}
              location="경기도 가평군"
              category="채소"
              isOrganic={true}
              isLocal={true}
              stock={45}
              unit="kg"
              description="가을 김장용으로 최적의 신선한 배추입니다. 무농약 재배로 안전하고 맛있습니다."
              createdAt={new Date().toISOString()}
              isLiked={false}
              distance={3.2}
              deliveryOption="직접방문"
              minOrder={15000}
            />
            <MarketCard
              id={2}
              productName="고품질 무"
              productImage="/images/fundcard_img.svg"
              sellerImage="/images/farmowner_img.svg"
              sellerName="무농장"
              price={12000}
              originalPrice={15000}
              rating={4.6}
              reviewCount={89}
              location="충청북도 충주시"
              category="채소"
              isOrganic={false}
              isLocal={true}
              stock={60}
              unit="kg"
              description="단단하고 달콤한 겨울 무입니다. 김치나 무침용으로 인기가 많습니다."
              createdAt={new Date().toISOString()}
              isLiked={false}
              distance={8.5}
              deliveryOption="택배"
              minOrder={10000}
            />
            <MarketCard
              id={3}
              productName="신선한 상추"
              productImage="/images/fundcard_img.svg"
              sellerImage="/images/farmowner_img.svg"
              sellerName="상추농장"
              price={8000}
              originalPrice={10000}
              rating={4.7}
              reviewCount={203}
              location="경기도 양평군"
              category="채소"
              isOrganic={true}
              isLocal={true}
              stock={80}
              unit="kg"
              description="아삭하고 신선한 상추입니다. 샐러드나 쌈용으로 최고입니다."
              createdAt={new Date().toISOString()}
              isLiked={false}
              distance={5.1}
              deliveryOption="직접방문"
              minOrder={8000}
            />
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className={styles.features_section}>
        <div className={styles.features_container}>
          <h2 className={styles.features_title}>주요 기능</h2>
          <div className={styles.features_grid}>
            {/* Location-based Recommendation */}
            <div className={styles.feature_card}>
              <div className={styles.feature_header}>
                <div className={styles.feature_header_content}>
                  <div className={styles.feature_icon}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <h3 className={styles.feature_title}>
                    위치 기반 농산물 추천
                  </h3>
                </div>
              </div>
              <div className={styles.feature_content}>
                <p className={styles.feature_description}>
                  현재 위치와 기후 조건을 분석하여 최적의 작물을 추천합니다
                </p>
                <div className={styles.feature_info}>
                  <p className={styles.feature_info_title}>추천 작물: 배추</p>
                  <p className={styles.feature_info_subtitle}>적합도: 95%</p>
                  <p className={styles.feature_info_description}>
                    현재 지역의 토양과 기후 조건이 배추 재배에 매우 적합합니다.
                    11월 파종 시 최고 품질의 김장배추를 수확할 수 있습니다.
                  </p>
                </div>
                <div className={styles.feature_buttons}>
                  <Button
                    color="point"
                    className={styles.feature_button}
                    onClick={handleCropDetail}
                  >
                    상세 정보
                  </Button>
                  <Button
                    color="secondary"
                    className={styles.feature_button}
                    onClick={handleCropGuide}
                  >
                    재배 가이드
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Diagnosis */}
            <div className={styles.feature_card}>
              <div className={styles.feature_header}>
                <div className={styles.feature_header_content}>
                  <div className={styles.feature_icon}>
                    <FontAwesomeIcon icon={faCamera} />
                  </div>
                  <h3 className={styles.feature_title}>AI 병충해 진단</h3>
                </div>
              </div>
              <div className={styles.feature_content}>
                <p className={styles.feature_description}>
                  작물 사진을 촬영하면 AI가 병충해를 자동으로 진단합니다
                </p>
                <div className={styles.feature_info}>
                  <p className={styles.feature_info_title}>
                    최근 진단: 토마토 잎마름병
                  </p>
                  <p className={styles.feature_info_subtitle}>치료 가능</p>
                  <p className={styles.feature_info_description}>
                    토마토 잎에서 잎마름병 초기 증상이 발견되었습니다. 즉시 구리
                    계열 살균제를 살포하시면 확산을 막을 수 있습니다.
                  </p>
                </div>
                <div className={styles.feature_buttons}>
                  <Button
                    color="point"
                    className={styles.feature_button}
                    onClick={handlePhotoCapture}
                  >
                    사진 촬영
                  </Button>
                  <Button
                    color="secondary"
                    className={styles.feature_button}
                    onClick={handleTreatmentGuide}
                  >
                    치료법 보기
                  </Button>
                </div>
              </div>
            </div>

            {/* Popular Funding */}
            <div className={styles.feature_card}>
              <div className={styles.feature_header}>
                <div className={styles.feature_header_content}>
                  <div className={styles.feature_icon}>
                    <FontAwesomeIcon icon={faChartLine} />
                  </div>
                  <h3 className={styles.feature_title}>인기 상승 펀딩</h3>
                </div>
              </div>
              <div className={styles.feature_content}>
                <p className={styles.feature_description}>
                  농업 프로젝트에 투자하고 수익을 얻어보세요
                </p>
                <div className={styles.feature_info}>
                  <div className={styles.feature_header_content}>
                    <div className={styles.crop_icon}>
                      <span>🌱</span>
                    </div>
                    <div>
                      <p className={styles.feature_info_title}>
                        유기농 상추 재배 프로젝트
                      </p>
                      <div
                        style={{
                          width: "100%",
                          height: "8px",
                          backgroundColor: "#e5e7eb",
                          borderRadius: "4px",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "80%",
                            height: "8px",
                            backgroundColor: "#16a34a",
                            borderRadius: "4px",
                          }}
                        ></div>
                      </div>
                      <p className={styles.feature_info_subtitle}>
                        진행률: 80%
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  color="point"
                  className={styles.feature_button}
                  onClick={handleInvestment}
                >
                  투자하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <section className={styles.weather_section}>
        <div className={styles.weather_container}>
          <div className={styles.weather_widget}>
            <div className={styles.weather_header}>
              <div className={styles.weather_title_content}>
                <div className={styles.weather_title_icon}>🌤️</div>
                <h2 className={styles.weather_title}>날씨 예보</h2>
              </div>
            </div>
            <div className={styles.weather_grid}>
              <div className={styles.weather_item}>
                <div className={styles.weather_item_icon}>
                  <FontAwesomeIcon icon={faSun} />
                </div>
                <p className={styles.weather_day}>오늘</p>
                <p className={styles.weather_condition}>맑음</p>
                <p className={styles.weather_temp}>25°C</p>
                <p className={styles.weather_humidity}>습도 60%</p>
              </div>
              <div className={styles.weather_item}>
                <div className={styles.weather_item_icon}>
                  <FontAwesomeIcon icon={faCloudRain} />
                </div>
                <p className={styles.weather_day}>내일</p>
                <p className={styles.weather_condition}>소나기</p>
                <p className={styles.weather_temp}>22°C</p>
                <p className={styles.weather_humidity}>습도 80%</p>
              </div>
              <div className={styles.weather_item}>
                <div className={styles.weather_item_icon}>
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <p className={styles.weather_day}>모레</p>
                <p className={styles.weather_condition}>흐림</p>
                <p className={styles.weather_temp}>20°C</p>
                <p className={styles.weather_humidity}>습도 70%</p>
              </div>
              <div className={styles.weather_item}>
                <div className={styles.weather_item_icon}>
                  <FontAwesomeIcon icon={faSun} />
                </div>
                <p className={styles.weather_day}>3일후</p>
                <p className={styles.weather_condition}>맑음</p>
                <p className={styles.weather_temp}>26°C</p>
                <p className={styles.weather_humidity}>습도 55%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
