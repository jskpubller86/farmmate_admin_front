import React, { useState } from 'react';
import {Tabs, TabItemProps } from '../../../components/sets';
import styles from './TabsSample.module.css';

const TabsSample: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fund');

  // 펀드 관련 탭 데이터
  const fundTabs: TabItemProps[] = [
    { id: 'fund', label: '내 펀드' },
    { id: 'funding', label: '내 펀딩' },
    { id: 'history', label: '펀딩 히스토리' },
    { id: 'wish', label: '찜한 펀드' },
  ];

  // 땅 관련 탭 데이터
  const landTabs: TabItemProps[] = [
    { id: 'land', label: '내 땅' },
    { id: 'lease', label: '임대 현황' },
    { id: 'applications', label: '신청 내역' },
    { id: 'favorites', label: '찜한 땅' },
  ];

  // 콘텐츠가 있는 탭 데이터
  const contentTabs: TabItemProps[] = [
    { 
      id: 'overview', 
      label: '개요',
      content: (
        <div className={styles.content_box}>
          <h3>펀드 개요</h3>
          <p>이 펀드는 농업 기술 혁신을 위한 자금을 모집합니다.</p>
          <ul>
            <li>목표 금액: 1억원</li>
            <li>현재 달성률: 67%</li>
            <li>참여 인원: 150명</li>
          </ul>
        </div>
      )
    },
    { 
      id: 'details', 
      label: '상세정보',
      content: (
        <div className={styles.content_box}>
          <h3>상세 정보</h3>
          <p>펀드의 자세한 내용과 투자 계획을 확인할 수 있습니다.</p>
          <div className={styles.info_group}>
            <div className={styles.info_item}>
              <strong>펀드 기간:</strong> 2025.01.01 ~ 2025.12.31
            </div>
            <div className={styles.info_item}>
              <strong>최소 투자:</strong> 10,000원
            </div>
            <div className={styles.info_item}>
              <strong>예상 수익률:</strong> 연 8-12%
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'progress', 
      label: '진행상황',
      content: (
        <div className={styles.content_box}>
          <h3>진행 상황</h3>
          <div className={styles.progress_area}>
            <div className={styles.progress_bar}>
              <div className={styles.progress_fill} style={{ width: '67%' }}></div>
            </div>
            <p className={styles.progress_text}>67% 달성 (6,700만원 / 1억원)</p>
          </div>
        </div>
      )
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log('선택된 탭:', tabId);
  };

  return (
    <div className={styles.sample_container}>
      <div className={styles.sample_wrapper}>
        <h1 className={styles.sample_title}>Tabs 컴포넌트 예제</h1>
        
        {/* 기본 탭 예제 */}
        <section className={styles.example_area}>
          <h2 className={styles.example_title}>1. 기본 탭 (펀드)</h2>
          <Tabs 
            tabs={fundTabs} 
            defaultActiveTab="fund"
            onTabChange={handleTabChange}
          />
          <p className={styles.example_desc}>
            현재 선택된 탭: <strong>{activeTab}</strong>
          </p>
        </section>

        {/* 땅 관련 탭 예제 */}
        <section className={styles.example_area}>
          <h2 className={styles.example_title}>2. 땅 관련 탭</h2>
          <Tabs 
            tabs={landTabs} 
            defaultActiveTab="land"
            onTabChange={handleTabChange}
          />
        </section>

        {/* 콘텐츠가 있는 탭 예제 */}
        <section className={styles.example_area}>
          <h2 className={styles.example_title}>3. 콘텐츠가 있는 탭</h2>
          <Tabs 
            tabs={contentTabs} 
            defaultActiveTab="overview"
            showContent={true}
            onTabChange={handleTabChange}
          />
        </section>

        {/* 사용법 설명 */}
        <section className={styles.usage_area}>
          <h2 className={styles.usage_title}>사용법</h2>
          <div className={styles.usage_content}>
            <div className={styles.code_box}>
              <h4>기본 사용법:</h4>
              <pre className={styles.code_text}>
                    {`import Tabs, { TabItemProps } from '../components/Tabs';

                    const tabs: TabItemProps[] = [
                    { id: 'tab1', label: '탭 1' },
                    { id: 'tab2', label: '탭 2' },
                    ];

                    <Tabs 
                    tabs={tabs} 
                    defaultActiveTab="tab1"
                    onTabChange={(tabId) => console.log(tabId)}
                    />`}
              </pre>
            </div>
            
            <div className={styles.props_box}>
              <h4>Props:</h4>
              <ul className={styles.props_list}>
                <li><strong>tabs</strong>: 탭 아이템 배열 (필수)</li>
                <li><strong>defaultActiveTab</strong>: 기본 활성 탭 ID</li>
                <li><strong>onTabChange</strong>: 탭 변경 시 호출되는 콜백</li>
                <li><strong>className</strong>: 추가 CSS 클래스</li>
                <li><strong>showContent</strong>: 콘텐츠 영역 표시 여부</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TabsSample;
