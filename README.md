# Forwarding

법인 간 협업과 FCL·LCL·완성차 운송을 다루는 로컬 중심 포트폴리오 프로젝트.

## 현재 구현
- Spring Boot / Java 17, React / TypeScript 기본 프로젝트
- PostgreSQL Docker Compose와 Flyway 법인 테이블 마이그레이션
- API·DB 연결 상태 확인 화면
- GitHub Actions: 백엔드 검증, PostgreSQL 통합 테스트, 프런트 lint·build

로그인, 법인별 권한, 주문 및 정산 기능은 다음 단계이며 아직 구현되지 않았습니다.
실제 고객 데이터나 인증정보를 입력하지 마세요. 클라우드 배포는 아직 구성하지 않았습니다.

## 준비
JDK 17+, Node.js 24, Docker Desktop(Compose 포함). Maven은 저장소의 Wrapper를 사용합니다.

## 실행 (PowerShell)
저장소 루트에서:
```powershell
Copy-Item .env.example .env
docker compose --env-file .env -f infra/compose.yaml up -d --wait
```

백엔드 터미널:
```powershell
cd backend
$env:DB_PASSWORD='local_demo_only' # .env의 POSTGRES_PASSWORD와 동일하게 설정
.\mvnw.cmd spring-boot:run
```

프런트 터미널:
```powershell
cd frontend
npm ci
npm run dev
```

웹: http://localhost:5173 · API 상태: http://127.0.0.1:8080/actuator/health
`.env`는 Compose에만 전달됩니다. 백엔드는 위 환경 변수를 별도로 설정해야 합니다.
기본 DB명·사용자를 변경하면 DB_URL·DB_USER도 설정하세요.
기본 바인딩은 로컬 전용입니다. 인터넷 공개 전 인증과 배포 구성이 필요합니다.

## 검증
```powershell
cd backend
.\mvnw.cmd verify
# DB 통합 테스트: DB 실행 후 아래 변수를 설정하고 다시 verify
$env:DB_PASSWORD='local_demo_only'
$env:DB_INTEGRATION_TEST='true'
.\mvnw.cmd verify
```
DB_INTEGRATION_TEST가 없으면 DB 통합 테스트는 명시적으로 건너뜁니다.
CI는 PostgreSQL을 실행하고 이 테스트를 활성화합니다.

프런트 디렉터리에서 `npm run lint`, `npm run build`를 실행합니다.

## 종료
앱 터미널에서 Ctrl+C, 루트에서:
```powershell
docker compose --env-file .env -f infra/compose.yaml down
```
DB 볼륨은 유지됩니다. `down -v`는 데이터까지 삭제하므로 초기화할 때만 사용하세요.

## 다음 단계
1. 한국·미국 법인과 데모 계정, 로그인·권한 검증
2. 운송 주문 등록·조회와 법인 간 접근 차단 테스트
3. FCL·LCL·완성차 실행 모델
4. 필요할 때 생성·삭제하는 수동 트리거 데모 배포

[설계 결정](docs/architecture.md)

[요구사항 및 개발 현황](docs/project-status.md) · [프로젝트 작업·커밋 규칙](AGENTS.md)
