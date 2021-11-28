# 아주 간단하고 아름다운 게시판 만들기

## 목차

1. [의도](#의도)
2. [테이블 구조](#테이블-구조)
3. [유의사항](#수정-시-유의사항)
4. [실행방법](#실행방법)

### 의도

[ x ] 1. 네프A 수행평가 프레임 만들기(Node.js)  
[x] 2. 네프B 수행평가 프레임 만들기(테이블 3개 이상)  
[ ] 3. RxJS를 적용해보고싶어서  
[x] 4. TypeOrm을 써보고싶어서  
[x] 5. 선생님들이 못알아보는 코드를 짜기위해서  
[ ] 6. jest와 supertest를 써보고싶어서

### 테이블 구조

1. 유저
2. 게시물
3. 댓글

### 수정 시 유의사항

1. DB 연결 코드는 `./src/app.module.ts`에 있습니다.

### 실행방법

1. 해당 프로젝트를 pull 받던지, 클론 하던지
2. yarn을 통해 패키지를 다운받던지
3. `yarn build`를 통해 `dist` 폴더에 작업 파일을 만들던지
4. `yarn start:prod`를 통해 빌드된 파일을 실행하던지
   > 물론 개발을 할거면 3~4번 필요 없이 `yarn start:dev` 치면 되긴 함
