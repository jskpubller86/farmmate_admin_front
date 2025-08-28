import React, { useState } from 'react';
import { Button, Select, Input, Avatar } from '../../components/ui';
import { Pagination, PageInfoProps } from '../../components/sets';
import styles from './MyContractList.module.css';
import { useModal } from '../../hooks';
import LeaseContractModal from '../../madals/lease/LeaseContractModal';

interface MyContractItemProps {
  id: string;
  name: string;
  avatarUrl?: string;
  gender: '남성' | '여성';
  age: number;
}

const MyContractList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [searchCategory, setSearchCategory] = useState('text');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { openModal, closeModal } = useModal();
  
  // 페이지 정보
  const pageInfo: PageInfoProps = {
    totalItems: 50,
    totalPages: 5,
    currentPage: currentPage,
    startPage: 1,
    endPage: 5,
  };

  // 내 계약 목록 데이터
  const myContracts: MyContractItemProps[] = [
    { id: '1', name: '성이름', gender: '여성', age: 20 },
    { id: '2', name: '성이름', gender: '남성', age: 30 },
    { id: '3', name: '성이름', gender: '남성', age: 40 },
    { id: '4', name: '성이름', gender: '여성', age: 50 },
    { id: '5', name: '성이름', gender: '남성', age: 60 },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    console.log('검색:', { searchCategory, searchKeyword });
  };

  return (
    <div className={styles.container}>
      {/* Body 레이아웃 */}
      <div className={styles.body_wrap}>
        <div className={styles.body_inner}>
          {/* 내 계약 목록 테이블 */}
          <div className={styles.my_contract_table}>
            <div className={styles.table_header}>
              <div className={styles.table_row}>
                <div className={`${styles.table_cell} ${styles.number_cell}`}>
                  <strong>순번</strong>
                </div>
                <div className={styles.table_cell}>
                  <strong>임대인</strong>
                </div>
                <div className={styles.table_cell}>
                  <strong>보증금</strong>
                </div>
                <div className={styles.table_cell}>
                  <strong>임대비</strong>
                </div>
                <div className={`${styles.table_cell} ${styles.action_cell}`}>
                  <strong>계약서</strong>
                </div>
              </div>
            </div>

            {/* 내 계약 행들 */}
            {myContracts.map((contract, index) => (
              <div
                key={contract.id}
                className={`${styles.table_row} ${index === myContracts.length - 1 ? '' : styles.row_border}`}
              >
                <div className={`${styles.table_cell} ${styles.number_cell}`}>
                  {myContracts.length - index}
                </div>
                <div className={styles.table_cell}>
                  <Avatar />
                  <span>아무개</span>
                </div>
                <div className={styles.table_cell}>
                  300,000원
                </div>
                <div className={styles.table_cell}>
                  연 3,000원
                </div>
                <div className={`${styles.table_cell} ${styles.action_cell}`}>
                  <Button
                    className={styles.contract_btn}
                    onClick={() => openModal(1, <LeaseContractModal modalId={1} />)}
                  >
                    계약서 보기
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <Pagination
            page={pageInfo}
            onPageChange={handlePageChange}
            showFirstLast={true}
            showPrevNext={true}
            maxVisiblePages={5}
          />
        </div>
      </div>
    </div>
  );
};

export default MyContractList;
