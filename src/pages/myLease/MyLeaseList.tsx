import React, { useState } from 'react';
import { LandCard } from '../../components/sets';
import styles from './MyLeaseList.module.css';



interface MyLeaseListItemProps {
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

interface MyLeaseListProps {
}

const MyLeaseList: React.FC<MyLeaseListProps> = () => {
  const mockData: MyLeaseListItemProps[] = [
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

  const filteredData = mockData;

  return (
    <div className={styles.container}>
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

export default MyLeaseList;
