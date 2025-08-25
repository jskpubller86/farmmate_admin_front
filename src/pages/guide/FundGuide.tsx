import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./guide.module.css";
import { Button, Badge } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartLine,
  faLightbulb,
  faShieldAlt,
  faCalculator,
  faHandshake,
  faExclamationTriangle,
  faCheckCircle,
  faArrowRight,
  faStar,
  faUsers,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

type GuideSection = {
  id: string;
  title: string;
  icon: any;
  content: React.ReactNode;
};

const FundGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("basics");

  const guideSections: GuideSection[] = [
    {
      id: "basics",
      title: "펀드 투자 기초",
      icon: faBook,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>펀드란 무엇인가요?</h3>
              <p>
                펀드는 여러 투자자들이 모여서 전문가가 관리하는 투자 상품입니다.
                농업 펀드의 경우, 농작물 재배나 농장 운영에 필요한 자금을 모으고
                수익을 공유하는 방식으로 운영됩니다.
              </p>
              <div className={styles.feature_list}>
                <div className={styles.feature_item}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    className={styles.feature_icon}
                  />
                  <span>공동 투자로 위험 분산</span>
                </div>
                <div className={styles.feature_item}>
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className={styles.feature_icon}
                  />
                  <span>전문가 관리로 안정성 확보</span>
                </div>
                <div className={styles.feature_item}>
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className={styles.feature_icon}
                  />
                  <span>투명한 수익 공유</span>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>투자 과정 이해하기</h3>
              <div className={styles.process_steps}>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>1</div>
                  <div className={styles.step_content}>
                    <h4>펀드 선택</h4>
                    <p>투자하고 싶은 농작물과 농장을 선택합니다</p>
                  </div>
                </div>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>2</div>
                  <div className={styles.step_content}>
                    <h4>투자 신청</h4>
                    <p>원하는 금액을 입력하고 투자를 신청합니다</p>
                  </div>
                </div>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>3</div>
                  <div className={styles.step_content}>
                    <h4>운영 모니터링</h4>
                    <p>펀드 진행 상황을 실시간으로 확인합니다</p>
                  </div>
                </div>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>4</div>
                  <div className={styles.step_content}>
                    <h4>수익 분배</h4>
                    <p>수확 후 투자 비율에 따라 수익을 받습니다</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "strategy",
      title: "투자 전략",
      icon: faLightbulb,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>포트폴리오 구성 전략</h3>
              <div className={styles.strategy_tips}>
                <div className={styles.strategy_tip}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={styles.tip_icon}
                  />
                  <div>
                    <h4>다양화 전략</h4>
                    <p>여러 농작물과 농장에 분산 투자하여 위험을 줄입니다</p>
                  </div>
                </div>
                <div className={styles.strategy_tip}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={styles.tip_icon}
                  />
                  <div>
                    <h4>계절별 투자</h4>
                    <p>
                      계절에 따라 다른 농작물에 투자하여 연중 수익을
                      안정화합니다
                    </p>
                  </div>
                </div>
                <div className={styles.strategy_tip}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={styles.tip_icon}
                  />
                  <div>
                    <h4>지역 분산</h4>
                    <p>다양한 지역의 농장에 투자하여 기후 위험을 분산합니다</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>투자 타이밍 전략</h3>
              <div className={styles.timing_strategy}>
                <div className={styles.timing_item}>
                  <FontAwesomeIcon
                    icon={faClock}
                    className={styles.timing_icon}
                  />
                  <div>
                    <h4>장기 투자</h4>
                    <p>1년 이상의 장기 투자로 안정적인 수익을 추구합니다</p>
                  </div>
                </div>
                <div className={styles.timing_item}>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={styles.timing_icon}
                  />
                  <div>
                    <h4>프리미엄 상품</h4>
                    <p>고품질 농작물과 검증된 농장에 우선 투자합니다</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "risk",
      title: "위험 관리",
      icon: faShieldAlt,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>주요 위험 요소</h3>
              <div className={styles.risk_factors}>
                <div className={styles.risk_factor}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.risk_icon}
                  />
                  <div>
                    <h4>기후 위험</h4>
                    <p>가뭄, 홍수, 태풍 등 자연재해로 인한 수확량 감소</p>
                    <div className={styles.risk_mitigation}>
                      <strong>대응 방안:</strong> 다양한 지역에 분산 투자
                    </div>
                  </div>
                </div>
                <div className={styles.risk_factor}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.risk_icon}
                  />
                  <div>
                    <h4>시장 위험</h4>
                    <p>농산물 가격 변동으로 인한 수익성 변화</p>
                    <div className={styles.risk_mitigation}>
                      <strong>대응 방안:</strong> 안정적인 수요가 있는 작물 선택
                    </div>
                  </div>
                </div>
                <div className={styles.risk_factor}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.risk_icon}
                  />
                  <div>
                    <h4>운영 위험</h4>
                    <p>농장 운영자의 경험과 능력에 따른 성과 차이</p>
                    <div className={styles.risk_mitigation}>
                      <strong>대응 방안:</strong> 검증된 농장과 경험 있는 농장주
                      선택
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>위험 관리 방법</h3>
              <div className={styles.risk_management}>
                <div className={styles.management_method}>
                  <h4>투자 한도 설정</h4>
                  <p>
                    전체 자산의 일정 비율만 펀드에 투자하여 위험을 제한합니다
                  </p>
                  <div className={styles.recommendation}>
                    <strong>권장 비율:</strong> 전체 자산의 20-30%
                  </div>
                </div>
                <div className={styles.management_method}>
                  <h4>단계별 투자</h4>
                  <p>
                    처음에는 소액으로 시작하여 점진적으로 투자 금액을 늘립니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "calculation",
      title: "수익 계산",
      icon: faCalculator,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>수익률 계산 방법</h3>
              <div className={styles.calculation_example}>
                <div className={styles.example_scenario}>
                  <h4>투자 시나리오 예시</h4>
                  <div className={styles.scenario_details}>
                    <div className={styles.detail_item}>
                      <span className={styles.detail_label}>투자 금액:</span>
                      <span className={styles.detail_value}>100만원</span>
                    </div>
                    <div className={styles.detail_item}>
                      <span className={styles.detail_label}>투자 기간:</span>
                      <span className={styles.detail_value}>12개월</span>
                    </div>
                    <div className={styles.detail_item}>
                      <span className={styles.detail_label}>예상 수익률:</span>
                      <span className={styles.detail_value}>15%</span>
                    </div>
                    <div className={styles.detail_item}>
                      <span className={styles.detail_label}>예상 수익:</span>
                      <span className={styles.detail_value}>15만원</span>
                    </div>
                  </div>
                </div>
                <div className={styles.calculation_formula}>
                  <h4>수익률 공식</h4>
                  <div className={styles.formula}>
                    수익률 = (수익금액 ÷ 투자금액) × 100
                  </div>
                  <div className={styles.formula_example}>
                    예시: (15만원 ÷ 100만원) × 100 = 15%
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>수익에 영향을 주는 요소</h3>
              <div className={styles.profit_factors}>
                <div className={styles.profit_factor}>
                  <h4>농작물 종류</h4>
                  <p>
                    작물별로 수익성이 다르며, 시장 수요와 공급에 따라 가격이
                    결정됩니다
                  </p>
                </div>
                <div className={styles.profit_factor}>
                  <h4>농장 위치</h4>
                  <p>
                    토질, 기후, 물 공급 등 환경 조건이 수확량과 품질에 영향을
                    줍니다
                  </p>
                </div>
                <div className={styles.profit_factor}>
                  <h4>운영 효율성</h4>
                  <p>
                    농장주의 경험과 기술력이 수익성에 직접적인 영향을 미칩니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tips",
      title: "투자 팁",
      icon: faHandshake,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>초보자를 위한 투자 팁</h3>
              <div className={styles.beginner_tips}>
                <div className={styles.tip_item}>
                  <div className={styles.tip_number}>01</div>
                  <div className={styles.tip_content}>
                    <h4>작은 금액으로 시작하기</h4>
                    <p>
                      처음에는 10-50만원 정도의 소액으로 시작하여 펀드 투자에
                      익숙해집니다
                    </p>
                  </div>
                </div>
                <div className={styles.tip_item}>
                  <div className={styles.tip_number}>02</div>
                  <div className={styles.tip_content}>
                    <h4>다양한 정보 확인하기</h4>
                    <p>
                      농장 정보, 작물 정보, 시장 동향 등 다양한 정보를
                      종합적으로 검토합니다
                    </p>
                  </div>
                </div>
                <div className={styles.tip_item}>
                  <div className={styles.tip_number}>03</div>
                  <div className={styles.tip_content}>
                    <h4>장기적 관점 유지하기</h4>
                    <p>
                      단기적인 가격 변동보다는 장기적인 성장 가능성을 고려합니다
                    </p>
                  </div>
                </div>
                <div className={styles.tip_item}>
                  <div className={styles.tip_number}>04</div>
                  <div className={styles.tip_content}>
                    <h4>정기적인 모니터링</h4>
                    <p>
                      투자한 펀드의 진행 상황을 정기적으로 확인하고 필요시
                      조정합니다
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>성공적인 투자를 위한 체크리스트</h3>
              <div className={styles.checklist}>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="check1" />
                  <label htmlFor="check1">
                    투자 목표와 기간을 명확히 설정했는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="check2" />
                  <label htmlFor="check2">
                    투자 가능한 금액을 현실적으로 산정했는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="check3" />
                  <label htmlFor="check3">
                    선택한 펀드의 위험도를 이해하고 있는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="check4" />
                  <label htmlFor="check4">
                    다양한 펀드에 분산 투자하고 있는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="check5" />
                  <label htmlFor="check5">
                    정기적으로 투자 현황을 점검하고 있는가?
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className={styles.guide_container}>
      {/* 헤더 */}
      <div className={styles.guide_header}>
        <div className={styles.header_content}>
          <h1 className={styles.page_title}>
            <FontAwesomeIcon icon={faBook} className={styles.title_icon} />
            투자 가이드
          </h1>
          <p className={styles.page_subtitle}>
            펀드 투자 기초부터 전략까지, 안전하고 수익성 있는 투자를 위한 모든
            정보
          </p>
        </div>
      </div>

      {/* 네비게이션 탭 */}
      <div className={styles.guide_navigation}>
        {guideSections.map((section) => (
          <button
            key={section.id}
            className={`${styles.nav_tab} ${
              activeSection === section.id ? styles.nav_tab_active : ""
            }`}
            onClick={() => handleSectionChange(section.id)}
          >
            <FontAwesomeIcon icon={section.icon} className={styles.tab_icon} />
            {section.title}
          </button>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className={styles.guide_content}>
        {guideSections.find((section) => section.id === activeSection)?.content}
      </div>

      {/* 액션 영역 */}
      <div className={styles.action_section}>
        <div className={styles.action_content}>
          <h2>지금 바로 펀드 투자를 시작해보세요</h2>
          <p>투자 가이드를 통해 배운 지식을 바탕으로 첫 투자를 시작해보세요</p>
          <div className={styles.action_buttons}>
            <Link to="/fund_list/all">
              <Button className={styles.primary_action} color="point2">
                펀드 둘러보기
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={styles.button_icon}
                />
              </Button>
            </Link>
            <Link to="/fund_rank">
              <Button className={styles.secondary_action} color="secondary">
                인기 펀드 보기
                <FontAwesomeIcon icon={faStar} className={styles.button_icon} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundGuide;
