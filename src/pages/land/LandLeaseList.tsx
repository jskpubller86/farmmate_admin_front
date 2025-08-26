import React, { useState } from 'react';
import { Button, Select, Input, Avatar, LikeIt } from '../../components/ui';
import { LandCard, Tabs, SortTabs } from '../../components/sets';
import styles from './LandLeaseList.module.css';

interface LandLeaseItemProps {
  id: string;
  landName: string;
  landImageUrl?: string | null;
  landOwnerName: string;
  landOwnerImageUrl?: string | null;
  startDatetime: string;
  endDatetime: string;
  addr: string;
  detailAddr: string;
  currentPercent: number;
  currentMember: number;
  endMember: number;
  status: 'recruiting' | 'contracting' | 'completed';
  statusText: string;
  isLiked: boolean;
}

interface LandLeaseListProps {
}

const LandLeaseList: React.FC<LandLeaseListProps> = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // Tabs 데이터
  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'recruiting', label: '모집중' },
    { id: 'contracting', label: '계약중' },
    { id: 'completed', label: '계약완료' },
  ];

  // 정렬 옵션 데이터
  const sortOptions = ['최신순', '마감임박순'];

  const mockData: LandLeaseItemProps[] = [
    {
      id: '1',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'recruiting',
      statusText: '모집중',
      isLiked: false,
    },
    {
      id: '2',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'contracting',
      statusText: '계약중',
      isLiked: true,
    },
    {
      id: '3',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'completed',
      statusText: '계약완료',
      isLiked: false,
    },
    {
      id: '4',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'recruiting',
      statusText: '모집중',
      isLiked: false,
    },
    {
      id: '5',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'recruiting',
      statusText: '모집중',
      isLiked: false,
    },
    {
      id: '6',
      landName: '땅 내놓는다. 1000 / 50에 24평',
      landImageUrl: '/images/tw01.jpg',
      landOwnerName: '테스형',
      landOwnerImageUrl: '/images/img_profile.svg',
      addr: '서울특별시 강남구 삼성로 154',
      detailAddr: '대치동, 강남구의회, 강남구민회관',
      startDatetime: '2025-05-31T07:00:10',
      endDatetime: '2025-06-01T07:00:10',
      currentPercent: 67,
      currentMember: 10,
      endMember: 15,
      status: 'recruiting',
      statusText: '모집중',
      isLiked: false,
    },
  ];



  const handleSearch = () => {
    console.log('검색:', { searchCategory, searchKeyword });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSortChange = (value: string, index: number) => {
    setSortBy(value);
    console.log('정렬 변경:', value, index);
  };

  const filteredData = activeTab === 'all' 
    ? mockData 
    : mockData.filter(item => item.status === activeTab);

  return (
    <div className={styles.container}>
      {/* 제목 */}
      <h1 className={styles.title}>임대목록</h1>

      {/* Tabs 영역 */}
      <Tabs 
        tabs={tabs}
        defaultActiveTab="all"
        onTabChange={handleTabChange}
      />

      {/* 검색 영역 */}
      <div className={styles.search_container}>
        <Select
          className={styles.search_select}
          value={searchCategory}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchCategory(e.target.value)}
        >
          <option value="">카테고리 선택</option>
          <option value="agriculture">농업</option>
          <option value="horticulture">원예</option>
          <option value="livestock">축산</option>
        </Select>
        
        <Input
          className={styles.search_input}
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
        />
        
        <Button type='button'>
          검색
        </Button>
      </div>

      {/* 정렬 옵션 */}
      <SortTabs
        items={sortOptions}
        value={sortBy}
        defaultValue="최신순"
        onChange={handleSortChange}
      />
      
      {/* 계약 카드 목록 */}
      <div className={styles.cards_grid}>
        {filteredData.map((item) => (
          <LandCard
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default LandLeaseList;
