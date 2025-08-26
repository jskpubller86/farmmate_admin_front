import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./guide.module.css";
import { Button, Badge } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faSeedling,
  faLeaf,
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
  faWater,
  faSun,
  faThermometerHalf,
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
      title: "농업 기초 지식",
      icon: faBook,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>농업이란 무엇인가요?</h3>
              <p>
                농업은 식량 생산을 위한 가장 기본적인 산업으로, 토지에서 작물을
                재배하고 가축을 사육하여 인간의 생존에 필요한 식량을 제공합니다.
                현대 농업은 과학적 지식과 기술을 바탕으로 지속가능한 발전을
                추구합니다.
              </p>
              <div className={styles.feature_list}>
                <div className={styles.feature_item}>
                  <FontAwesomeIcon
                    icon={faSeedling}
                    className={styles.feature_icon}
                  />
                  <span>지속가능한 식량 생산</span>
                </div>
                <div className={styles.feature_item}>
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className={styles.feature_icon}
                  />
                  <span>환경 보호와 생태계 유지</span>
                </div>
                <div className={styles.feature_item}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    className={styles.feature_icon}
                  />
                  <span>농촌 지역 활성화</span>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>농작물 재배 과정 이해하기</h3>
              <div className={styles.process_steps}>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>1</div>
                  <div className={styles.step_content}>
                    <h4>토양 준비</h4>
                    <p>작물 재배에 적합한 토양을 준비하고 비료를 시비합니다</p>
                  </div>
                </div>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>2</div>
                  <div className={styles.step_content}>
                    <h4>씨앗 파종</h4>
                    <p>적절한 시기에 씨앗을 심거나 모종을 심습니다</p>
                  </div>
                </div>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>3</div>
                  <div className={styles.step_content}>
                    <h4>재배 관리</h4>
                    <p>물주기, 병해충 방제, 잡초 제거 등을 관리합니다</p>
                  </div>
                </div>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>4</div>
                  <div className={styles.step_content}>
                    <h4>수확</h4>
                    <p>적절한 시기에 수확하여 품질 좋은 농산물을 얻습니다</p>
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
      title: "재배 전략",
      icon: faLeaf,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>작물 선택 전략</h3>
              <div className={styles.strategy_tips}>
                <div className={styles.strategy_tip}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={styles.tip_icon}
                  />
                  <div>
                    <h4>지역별 적합 작물</h4>
                    <p>기후와 토질에 맞는 작물을 선택하여 생산성을 높입니다</p>
                  </div>
                </div>
                <div className={styles.strategy_tip}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={styles.tip_icon}
                  />
                  <div>
                    <h4>계절별 작물 배치</h4>
                    <p>
                      계절에 따라 다른 작물을 재배하여 연중 생산을 안정화합니다
                    </p>
                  </div>
                </div>
                <div className={styles.strategy_tip}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={styles.tip_icon}
                  />
                  <div>
                    <h4>시장 수요 분석</h4>
                    <p>소비자 선호도와 시장 가격을 고려한 작물을 선택합니다</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>재배 계획 수립</h3>
              <div className={styles.timing_strategy}>
                <div className={styles.timing_item}>
                  <FontAwesomeIcon
                    icon={faClock}
                    className={styles.timing_icon}
                  />
                  <div>
                    <h4>장기 계획</h4>
                    <p>3-5년 단위로 작물 순환과 토양 관리를 계획합니다</p>
                  </div>
                </div>
                <div className={styles.timing_item}>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={styles.timing_icon}
                  />
                  <div>
                    <h4>품질 중심 재배</h4>
                    <p>양보다는 질을 중시하여 고품질 농산물을 생산합니다</p>
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
                    <p>가뭄, 홍수, 태풍, 서리 등 자연재해로 인한 작물 피해</p>
                    <div className={styles.risk_mitigation}>
                      <strong>대응 방안:</strong> 기상 정보 모니터링 및 보험
                      가입
                    </div>
                  </div>
                </div>
                <div className={styles.risk_factor}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.risk_icon}
                  />
                  <div>
                    <h4>병해충 위험</h4>
                    <p>작물 질병과 해충으로 인한 수확량 감소</p>
                    <div className={styles.risk_mitigation}>
                      <strong>대응 방안:</strong> 예방적 방제와 친환경 농법 적용
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
                      <strong>대응 방안:</strong> 다양한 작물 재배와 계약 재배
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>위험 관리 방법</h3>
              <div className={styles.risk_management}>
                <div className={styles.management_method}>
                  <h4>다양화 전략</h4>
                  <p>
                    여러 작물을 동시에 재배하여 특정 작물의 위험을 분산합니다
                  </p>
                  <div className={styles.recommendation}>
                    <strong>권장 방법:</strong> 3-5개 작물 동시 재배
                  </div>
                </div>
                <div className={styles.management_method}>
                  <h4>기술 개발 투자</h4>
                  <p>
                    최신 농업 기술과 장비를 도입하여 생산성과 안정성을 높입니다
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
      title: "수익성 분석",
      icon: faCalculator,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>수익성 계산 방법</h3>
              <div className={styles.calculation_example}>
                <div className={styles.example_scenario}>
                  <h4>재배 시나리오 예시</h4>
                  <div className={styles.scenario_details}>
                    <div className={styles.detail_item}>
                      <span className={styles.detail_label}>재배 면적:</span>
                      <span className={styles.detail_value}>1,000㎡</span>
                    </div>
                    <div className={styles.detail_item}>
                      <span className={styles.detail_label}>재배 기간:</span>
                      <span className={styles.detail_value}>6개월</span>
                    </div>
                    <div className={styles.detail_item}>
                      <span className={styles.detail_label}>예상 수확량:</span>
                      <span className={styles.detail_value}>3톤</span>
                    </div>
                    <div className={styles.detail_item}>
                      <span className={styles.detail_label}>예상 수익:</span>
                      <span className={styles.detail_value}>450만원</span>
                    </div>
                  </div>
                </div>
                <div className={styles.calculation_formula}>
                  <h4>수익성 공식</h4>
                  <div className={styles.formula}>순수익 = 총수익 - 총비용</div>
                  <div className={styles.formula_example}>
                    예시: 450만원 - 200만원 = 250만원
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>수익에 영향을 주는 요소</h3>
              <div className={styles.profit_factors}>
                <div className={styles.profit_factor}>
                  <h4>작물 종류</h4>
                  <p>
                    작물별로 수익성이 다르며, 시장 수요와 공급에 따라 가격이
                    결정됩니다
                  </p>
                </div>
                <div className={styles.profit_factor}>
                  <h4>재배 환경</h4>
                  <p>
                    토질, 기후, 물 공급 등 환경 조건이 수확량과 품질에 영향을
                    줍니다
                  </p>
                </div>
                <div className={styles.profit_factor}>
                  <h4>재배 기술</h4>
                  <p>
                    농업인의 경험과 기술력이 수익성에 직접적인 영향을 미칩니다
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
      title: "재배 팁",
      icon: faHandshake,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>초보자를 위한 재배 팁</h3>
              <div className={styles.beginner_tips}>
                <div className={styles.tip_item}>
                  <div className={styles.tip_number}>01</div>
                  <div className={styles.tip_content}>
                    <h4>작은 면적으로 시작하기</h4>
                    <p>
                      처음에는 100-200㎡ 정도의 작은 면적으로 시작하여 재배에
                      익숙해집니다
                    </p>
                  </div>
                </div>
                <div className={styles.tip_item}>
                  <div className={styles.tip_number}>02</div>
                  <div className={styles.tip_content}>
                    <h4>기초 정보 학습하기</h4>
                    <p>
                      토양, 기후, 작물 특성 등 기초적인 농업 지식을 충분히
                      학습합니다
                    </p>
                  </div>
                </div>
                <div className={styles.tip_item}>
                  <div className={styles.tip_number}>03</div>
                  <div className={styles.tip_content}>
                    <h4>지역 농업인과 소통하기</h4>
                    <p>
                      경험 있는 지역 농업인과의 소통을 통해 실용적인 지식을
                      얻습니다
                    </p>
                  </div>
                </div>
                <div className={styles.tip_item}>
                  <div className={styles.tip_number}>04</div>
                  <div className={styles.tip_content}>
                    <h4>정기적인 모니터링</h4>
                    <p>
                      작물의 생육 상황을 정기적으로 확인하고 필요시 관리 조치를
                      취합니다
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>성공적인 재배를 위한 체크리스트</h3>
              <div className={styles.checklist}>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="check1" />
                  <label htmlFor="check1">
                    재배 목표와 계획을 명확히 설정했는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="check2" />
                  <label htmlFor="check2">
                    토양 상태와 기후 조건을 파악했는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="check3" />
                  <label htmlFor="check3">
                    적합한 작물과 품종을 선택했는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="check4" />
                  <label htmlFor="check4">
                    필요한 자재와 장비를 준비했는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="check5" />
                  <label htmlFor="check5">
                    정기적인 관리 계획을 수립했는가?
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
            농업 가이드
          </h1>
          <p className={styles.page_subtitle}>
            농업 기초부터 재배 전략까지, 지속가능하고 수익성 있는 농업을 위한
            모든 정보
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
          <h2>지금 바로 농업을 시작해보세요</h2>
          <p>농업 가이드를 통해 배운 지식을 바탕으로 첫 재배를 시작해보세요</p>
          <div className={styles.action_buttons}>
            <Link to="/land_list/all">
              <Button className={styles.primary_action} color="point2">
                농지 둘러보기
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={styles.button_icon}
                />
              </Button>
            </Link>
            <Link to="/guide/land">
              <Button className={styles.secondary_action} color="secondary">
                농지 가이드 보기
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
