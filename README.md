# Gomi Pixel Manager API

## 시작하기

### 1. 프로젝트 클론
```
git clone https://github.com/gomicorp/gomi-pixel-manager-api.git
```

### 2. 환경변수 설정
이 프로젝트를 실행하기 위해서는 최상위 디렉토리에 위치한 `.env` 파일의 환경변수 정의가 필요합니다. 이 프로젝트의 메인테이너(`@fred`)에게 문의해 파일을 전달받아 주세요.

### 3. 패키지 설치
```
yarn install
```

### 4. 데이터베이스 셋업
```
sequelize-cli db:create
sequelize-cli db:migrate
sequelize-cli db:seed
```

### 5. 서버 시작
```
yarn start
```

---

## Spec
### 기본 웹프레임워크
Fastify

### Environments

#### 필수항목
이 프로젝트를 실행하기 위해서는 최상위 디렉토리에 위치한 `.env` 파일의 환경변수 정의가 필요합니다. 이 프로젝트의 메인테이너에게 문의해 파일을 전달받아 주세요.

#### 환경구분
다음과 같은 세 가지 환경을 사용하고 있으며, 이외에도 테스트 유닛을 도입하게 되면 test 환경이 추가될 예정입니다.
- development
- staging
- production

### Database
MySQL or mariaDB

### ORM
Sequelize & Sequelize CLI

쿼리 및 관계형 모델과 스키마, 마이그레이션은 이 두 가지 라이브러리를 전적으로 따르고 있습니다.

이 프로젝트에 맞게 커스터마이즈 된 부분은 최상위 디렉토리의 `.sequelizerc` 파일에 정의된 내용이 전부이며, 나머지 부분의 사용방법은 전적으로 공식문서를 참고하고 있습니다.

#### 문서는 여기를 참고하세요.
- [Sequelize](https://sequelize.org/master)
- [Sequelize CLI](https://github.com/sequelize/cli)

