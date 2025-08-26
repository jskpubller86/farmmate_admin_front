import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./guide.module.css";
import { Button, Badge } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faGavel,
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
  faFileContract,
  faBalanceScale,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";

type GuideSection = {
  id: string;
  title: string;
  icon: any;
  content: React.ReactNode;
};

const LandGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("basics");

  const guideSections: GuideSection[] = [
    {
      id: "basics",
      title: "농지 임대 기초",
      icon: faBook,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>농지 임대란 무엇인가요?</h3>
              <p>
                농지 임대는 농지 소유자가 자신의 농지를 다른 사람에게 일정 기간
                동안 사용하게 하고 그 대가로 임대료를 받는 계약입니다. 농지법에
                따라 엄격하게 규제되며, 농업 생산성을 높이고 농지의 효율적
                이용을 목적으로 합니다.
              </p>
              <div className={styles.feature_list}>
                <div className={styles.feature_item}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    className={styles.feature_icon}
                  />
                  <span>농지 소유자와 임차인의 권리 보호</span>
                </div>
                <div className={styles.feature_item}>
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className={styles.feature_icon}
                  />
                  <span>농지의 효율적 이용과 보전</span>
                </div>
                <div className={styles.feature_item}>
                  <FontAwesomeIcon
                    icon={faFileContract}
                    className={styles.feature_icon}
                  />
                  <span>법적 보장을 받는 안전한 계약</span>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>농지 임대 과정 이해하기</h3>
              <div className={styles.process_steps}>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>1</div>
                  <div className={styles.step_content}>
                    <h4>농지 현황 파악</h4>
                    <p>임대할 농지의 위치, 면적, 토질 등을 확인합니다</p>
                  </div>
                </div>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>2</div>
                  <div className={styles.step_content}>
                    <h4>임대 계약 체결</h4>
                    <p>농지법에 따른 표준 임대차계약서를 작성합니다</p>
                  </div>
                </div>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>3</div>
                  <div className={styles.step_content}>
                    <h4>농지 임대 신고</h4>
                    <p>시군구청에 농지 임대 신고를 제출합니다</p>
                  </div>
                </div>
                <div className={styles.process_step}>
                  <div className={styles.step_number}>4</div>
                  <div className={styles.step_content}>
                    <h4>농업 경영 시작</h4>
                    <p>계약된 조건에 따라 농업 경영을 시작합니다</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "law",
      title: "주요 법규",
      icon: faGavel,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>농지법 핵심 조항</h3>
              <div className={styles.law_articles}>
                <div className={styles.law_article}>
                  <h4>제6조 (농지의 소유)</h4>
                  <p>
                    농지는 농업인 또는 농업법인이 소유하는 것을 원칙으로 하며,
                    농지 소유 상한은 3헥타르로 제한됩니다.
                  </p>
                </div>
                <div className={styles.law_article}>
                  <h4>제22조 (농지의 임대차)</h4>
                  <p>
                    농지의 임대차는 서면으로 계약을 체결하고, 계약 체결일부터
                    30일 이내에 시군구청장에게 신고해야 합니다.
                  </p>
                </div>
                <div className={styles.law_article}>
                  <h4>제23조 (임대차 기간)</h4>
                  <p>
                    농지 임대차의 기간은 1년 이상으로 하며, 최대 10년까지 연장할
                    수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>농지 보전 및 이용에 관한 법률</h3>
              <div className={styles.land_preservation}>
                <div className={styles.preservation_item}>
                  <h4>농지 전용 제한</h4>
                  <p>
                    농지는 원칙적으로 농업 목적으로만 사용해야 하며, 농지 전용
                    허가 없이는 다른 용도로 사용할 수 없습니다.
                  </p>
                </div>
                <div className={styles.preservation_item}>
                  <h4>농지 보전 의무</h4>
                  <p>
                    농지 소유자와 임차인은 농지의 생산성을 유지하고 보전하는
                    의무가 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "contract",
      title: "계약 관리",
      icon: faFileContract,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>표준 임대차계약서 주요 항목</h3>
              <div className={styles.contract_terms}>
                <div className={styles.contract_term}>
                  <h4>계약 당사자</h4>
                  <p>
                    임대인과 임차인의 성명, 주소, 연락처 등 기본 정보를 명확히
                    기록합니다.
                  </p>
                </div>
                <div className={styles.contract_term}>
                  <h4>임대 대상 농지</h4>
                  <p>
                    임대할 농지의 소재지, 지번, 면적, 토지이용계획 등을 상세히
                    명시합니다.
                  </p>
                </div>
                <div className={styles.contract_term}>
                  <h4>임대 기간 및 임대료</h4>
                  <p>
                    임대 시작일, 종료일, 임대료 금액, 지급 방법과 시기를 명확히
                    합니다.
                  </p>
                </div>
                <div className={styles.contract_term}>
                  <h4>계약 해지 조건</h4>
                  <p>
                    계약 해지 사유, 해지 통보 기간, 손해배상 등에 대한 규정을
                    포함합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>계약 체결 시 주의사항</h3>
              <div className={styles.contract_cautions}>
                <div className={styles.caution_item}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.caution_icon}
                  />
                  <div>
                    <h4>서면 계약 필수</h4>
                    <p>
                      구두 계약은 법적 효력이 없으므로 반드시 서면으로 작성해야
                      합니다
                    </p>
                  </div>
                </div>
                <div className={styles.caution_item}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.caution_icon}
                  />
                  <div>
                    <h4>농지 현황 확인</h4>
                    <p>
                      임대 전 농지의 실제 상태와 등기부등본을 반드시 확인해야
                      합니다
                    </p>
                  </div>
                </div>
                <div className={styles.caution_item}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.caution_icon}
                  />
                  <div>
                    <h4>신고 의무 준수</h4>
                    <p>계약 체결 후 30일 이내에 시군구청에 신고해야 합니다</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "rights",
      title: "권리와 의무",
      icon: faBalanceScale,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>임대인의 권리와 의무</h3>
              <div className={styles.rights_obligations}>
                <div className={styles.rights_section}>
                  <h4>임대인의 권리</h4>
                  <div className={styles.rights_list}>
                    <div className={styles.right_item}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={styles.right_icon}
                      />
                      <span>임대료 수령권</span>
                    </div>
                    <div className={styles.right_item}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={styles.right_icon}
                      />
                      <span>계약 해지권</span>
                    </div>
                    <div className={styles.right_item}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={styles.right_icon}
                      />
                      <span>농지 보전 감시권</span>
                    </div>
                  </div>
                </div>
                <div className={styles.obligations_section}>
                  <h4>임대인의 의무</h4>
                  <div className={styles.obligations_list}>
                    <div className={styles.obligation_item}>
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className={styles.obligation_icon}
                      />
                      <span>농지 인도 의무</span>
                    </div>
                    <div className={styles.obligation_item}>
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className={styles.obligation_icon}
                      />
                      <span>방해 행위 금지 의무</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>임차인의 권리와 의무</h3>
              <div className={styles.tenant_rights}>
                <div className={styles.tenant_rights_section}>
                  <h4>임차인의 권리</h4>
                  <div className={styles.tenant_rights_list}>
                    <div className={styles.tenant_right_item}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={styles.tenant_right_icon}
                      />
                      <span>농지 사용권</span>
                    </div>
                    <div className={styles.tenant_right_item}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={styles.tenant_right_icon}
                      />
                      <span>계약 갱신 요청권</span>
                    </div>
                    <div className={styles.tenant_right_item}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={styles.tenant_right_icon}
                      />
                      <span>임대료 인하 요청권</span>
                    </div>
                  </div>
                </div>
                <div className={styles.tenant_obligations_section}>
                  <h4>임차인의 의무</h4>
                  <div className={styles.tenant_obligations_list}>
                    <div className={styles.tenant_obligation_item}>
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className={styles.tenant_obligation_icon}
                      />
                      <span>임대료 지급 의무</span>
                    </div>
                    <div className={styles.tenant_obligation_item}>
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className={styles.tenant_obligation_icon}
                      />
                      <span>농지 보전 의무</span>
                    </div>
                    <div className={styles.tenant_obligation_item}>
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className={styles.tenant_obligation_icon}
                      />
                      <span>계약 종료 시 원상회복 의무</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "disputes",
      title: "분쟁 해결",
      icon: faShieldAlt,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>일반적인 분쟁 유형</h3>
              <div className={styles.dispute_types}>
                <div className={styles.dispute_type}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.dispute_icon}
                  />
                  <div>
                    <h4>임대료 분쟁</h4>
                    <p>임대료 인상 요구, 체불 등 임대료 관련 문제</p>
                    <div className={styles.dispute_solution}>
                      <strong>해결 방안:</strong> 표준 임대료 기준 확인, 중재
                      신청
                    </div>
                  </div>
                </div>
                <div className={styles.dispute_type}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.dispute_icon}
                  />
                  <div>
                    <h4>농지 사용 목적 위반</h4>
                    <p>농업 목적 외 사용, 농지 훼손 등</p>
                    <div className={styles.dispute_solution}>
                      <strong>해결 방안:</strong> 계약서 확인, 시정 요구, 계약
                      해지
                    </div>
                  </div>
                </div>
                <div className={styles.dispute_type}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={styles.dispute_icon}
                  />
                  <div>
                    <h4>계약 해지 분쟁</h4>
                    <p>일방적 계약 해지, 계약 기간 만료 등</p>
                    <div className={styles.dispute_solution}>
                      <strong>해결 방안:</strong> 법적 근거 확인, 중재 또는 소송
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>분쟁 해결 방법</h3>
              <div className={styles.dispute_resolution}>
                <div className={styles.resolution_method}>
                  <h4>1단계: 협의</h4>
                  <p>
                    계약 당사자 간 직접 대화를 통해 문제를 해결합니다. 가장
                    빠르고 비용이 적게 드는 방법입니다.
                  </p>
                </div>
                <div className={styles.resolution_method}>
                  <h4>2단계: 중재</h4>
                  <p>
                    농지관리위원회나 농업협동조합의 중재를 신청합니다. 전문가의
                    조언을 받을 수 있습니다.
                  </p>
                </div>
                <div className={styles.resolution_method}>
                  <h4>3단계: 소송</h4>
                  <p>
                    법원에 소송을 제기합니다. 최후의 수단이며, 전문 변호사의
                    도움이 필요합니다.
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
      title: "실무 팁",
      icon: faHandshake,
      content: (
        <div className={styles.section_content}>
          <div className={styles.content_grid}>
            <div className={styles.content_card}>
              <h3>농지 임대 시 체크리스트</h3>
              <div className={styles.checklist}>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="land_check1" />
                  <label htmlFor="land_check1">
                    농지의 소유권과 사용권을 확인했는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="land_check2" />
                  <label htmlFor="land_check2">
                    표준 임대차계약서를 사용했는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="land_check3" />
                  <label htmlFor="land_check3">
                    임대료가 시장 가격에 적정한가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="land_check4" />
                  <label htmlFor="land_check4">
                    농지 현황을 사진으로 기록했는가?
                  </label>
                </div>
                <div className={styles.checklist_item}>
                  <input type="checkbox" id="land_check5" />
                  <label htmlFor="land_check5">
                    시군구청에 임대 신고를 제출했는가?
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.content_card}>
              <h3>성공적인 농지 임대를 위한 조언</h3>
              <div className={styles.success_tips}>
                <div className={styles.success_tip}>
                  <div className={styles.tip_number}>01</div>
                  <div className={styles.tip_content}>
                    <h4>충분한 사전 조사</h4>
                    <p>
                      농지의 토질, 수질, 접근성 등을 철저히 조사하고, 주변
                      환경과 시장 상황도 파악합니다.
                    </p>
                  </div>
                </div>
                <div className={styles.success_tip}>
                  <div className={styles.tip_number}>02</div>
                  <div className={styles.tip_content}>
                    <h4>명확한 계약 조건</h4>
                    <p>
                      임대 기간, 임대료, 사용 목적, 보전 의무 등을 명확하게
                      정하고 서면으로 작성합니다.
                    </p>
                  </div>
                </div>
                <div className={styles.success_tip}>
                  <div className={styles.tip_number}>03</div>
                  <div className={styles.tip_content}>
                    <h4>정기적인 소통</h4>
                    <p>
                      임대인과 정기적으로 소통하여 문제를 사전에 예방하고 원활한
                      관계를 유지합니다.
                    </p>
                  </div>
                </div>
                <div className={styles.success_tip}>
                  <div className={styles.tip_number}>04</div>
                  <div className={styles.tip_content}>
                    <h4>법적 절차 준수</h4>
                    <p>
                      농지법과 관련 법규를 준수하여 안전하고 합법적인 임대
                      관계를 유지합니다.
                    </p>
                  </div>
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
            <FontAwesomeIcon icon={faGavel} className={styles.title_icon} />
            법률 가이드
          </h1>
          <p className={styles.page_subtitle}>
            농지 임대 관련 법규부터 실무 팁까지, 안전하고 합법적인 농지 임대를
            위한 모든 정보
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
          <h2>농지 임대에 대한 더 자세한 상담이 필요하신가요?</h2>
          <p>전문가와 상담하여 안전하고 합법적인 농지 임대를 진행해보세요</p>
          <div className={styles.action_buttons}>
            <Link to="/land_list">
              <Button className={styles.primary_action} color="point2">
                농지 둘러보기
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={styles.button_icon}
                />
              </Button>
            </Link>
            <Link to="/team_list">
              <Button className={styles.secondary_action} color="secondary">
                팀 모집 보기
                <FontAwesomeIcon
                  icon={faUsers}
                  className={styles.button_icon}
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandGuide;
