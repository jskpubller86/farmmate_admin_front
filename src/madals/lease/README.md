# 임대차 계약서 모달

이 모달은 작성된 임대차 계약서를 보여주는 용도로 사용됩니다.

## 컴포넌트 구조

- `LeaseContractView.tsx` - 계약서 내용을 표시하는 메인 컴포넌트
- `LeaseContractModal.tsx` - 모달 래퍼 컴포넌트
- `leaseContractView.module.css` - 모달 스타일

## 사용법

### 1. 모달 열기

```tsx
import { useModal } from "../../hooks/useModal";
import LeaseContractModal from "../../madals/lease/LeaseContractModal";

const YourComponent = () => {
  const { openModal } = useModal();

  const handleOpenContract = () => {
    const modalId = Date.now(); // 고유한 모달 ID 생성

    const contractData = {
      tenantName: "홍길동",
      tenantContact: "010-1234-5678",
      tenantIdNumber: "123456-1234567",
      tenantAddress: "서울시 강남구 테헤란로 123",
      landlordName: "김부동산",
      landlordContact: "010-9876-5432",
      landlordIdNumber: "987654-9876543",
      landlordAddress: "서울시 강남구 역삼동 456",
      landName: "강남 토지",
      landLocation: "서울시 강남구 역삼동 789",
      landUse: "농업용",
      deposit: "1000",
      monthlyRent: "50",
      midPayment: "500",
      balance: "500",
      downPayment: "100",
      leaseStartDate: "2025-01-01",
      leaseEndDate: "2025-12-31",
      monthlyRentDate: "15",
      contractDate: "2024-12-15",
    };

    openModal(
      modalId,
      <LeaseContractModal modalId={modalId} contractData={contractData} />
    );
  };

  return <button onClick={handleOpenContract}>계약서 보기</button>;
};
```

### 2. 모달 닫기

모달은 자동으로 닫기 기능이 포함되어 있습니다:

- 모달 외부 영역 클릭
- ESC 키 입력

### 3. Props

#### LeaseContractModal Props

- `modalId: number` - 모달의 고유 ID
- `contractData?: object` - 계약서 데이터 (선택사항)

#### contractData 구조

```tsx
interface ContractData {
  tenantName?: string; // 임차인 이름
  tenantContact?: string; // 임차인 연락처
  tenantIdNumber?: string; // 임차인 주민등록번호
  tenantAddress?: string; // 임차인 주소
  landlordName?: string; // 임대인 이름
  landlordContact?: string; // 임대인 연락처
  landlordIdNumber?: string; // 임대인 주민등록번호
  landlordAddress?: string; // 임대인 주소
  landName?: string; // 토지 이름
  landLocation?: string; // 토지 위치
  landUse?: string; // 토지 용도
  deposit?: string; // 임대보증금
  monthlyRent?: string; // 월세
  midPayment?: string; // 중도금
  balance?: string; // 잔금
  downPayment?: string; // 계약금
  leaseStartDate?: string; // 임대차 시작일
  leaseEndDate?: string; // 임대차 종료일
  monthlyRentDate?: string; // 월세 지불일
  contractDate?: string; // 계약일
}
```

## 특징

- **읽기 전용**: 작성된 계약서를 보여주는 용도
- **반응형**: 다양한 화면 크기에 대응
- **스크롤**: 긴 계약서 내용을 스크롤로 확인 가능
- **출력 버튼**: 계약서 출력 기능 포함
- **기존 스타일 재사용**: LeaseContract 페이지와 동일한 디자인

## 스타일 커스터마이징

`leaseContractView.module.css` 파일에서 모달의 스타일을 수정할 수 있습니다:

- 모달 크기: `.modal_content`의 `max-height` 수정
- 헤더 스타일: `.modal_header` 관련 클래스 수정
- 테이블 스타일: 기존 `lease.module.css`와 동일한 클래스 사용
- 스크롤바: `.contract_content::-webkit-scrollbar` 관련 클래스 수정
