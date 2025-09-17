# GitHub Actions 배포 설정 가이드

## 필요한 GitHub Secrets 설정

이 workflow를 사용하기 위해서는 GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 secrets를 설정해야 합니다:

### 1. OCI_HOST

-   OCI Rocky 서버의 IP 주소 또는 도메인 이름
-   예: `192.168.1.100` 또는 `your-server.example.com`

### 2. OCI_USERNAME

-   OCI Rocky 서버에 접속할 사용자 이름
-   예: `root` 또는 `ubuntu`

### 3. OCI_SSH_KEY

-   OCI Rocky 서버에 접속할 SSH 개인키 내용
-   전체 private key 내용을 복사하여 설정

### 4. OCI_PORT

-   SSH 접속 포트 (기본값: 22)
-   예: `22`

## Secrets 설정 방법

1. GitHub 저장소 페이지에서 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Secrets and variables** > **Actions** 클릭
3. **New repository secret** 버튼 클릭
4. 각 secret의 이름과 값을 입력하여 저장

## 배포 트리거

이 workflow는 다음 이벤트에서 자동으로 실행됩니다:

-   `main` 브랜치에 직접 push
-   `main` 브랜치로의 pull request가 closed (merge)될 때

## 배포 과정

1. **코드 체크아웃**: GitHub에서 최신 코드 다운로드
2. **Node.js 설정**: Node.js 18 버전 설정
3. **의존성 설치**: `npm ci` 명령으로 패키지 설치
4. **빌드**: `npm run build` 명령으로 프로덕션 빌드 생성
5. **서버 준비**: 기존 배포 디렉토리 백업 및 새 디렉토리 생성
6. **파일 업로드**: 빌드된 파일들을 서버로 전송
7. **권한 설정**: `chmod -R 755` 및 `chown -R nginx:nginx` 적용
8. **Nginx 재시작**: 설정 테스트 후 서비스 재시작

## 배포 위치

-   **배포 디렉토리**: `/var/www/farmmate`
-   **백업 디렉토리**: `/var/www/farmmate_backup` (이전 배포 버전)

## 주의사항

-   SSH 키는 반드시 서버에 등록된 공개키와 쌍을 이루는 개인키여야 합니다
-   서버 사용자는 `/var/www` 디렉토리에 쓰기 권한이 있어야 합니다
-   nginx 사용자(`nginx:nginx`)가 존재해야 합니다
