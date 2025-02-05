# 수요자 맞춤형 공공정보 제공 서비스

## 개발 환경
 - **언어** : JavaScript
 - **라이브러리/프레임워크**
  - **프론트엔드** : react(useEffect, useState, Link, useNavigate
  - **백엔드** : node.js(express, exec), Python(aiohttp, asyncio, BeautifulSoup)
 - **데이터베이스** : MySQL
 - **개발 도구** : Visual Studio Code, HeidiSQL

## 주요 기능
### 프론트엔드
- **사용자 페이지**
1. 사용자 로그인 및 회원가입, ID/PW 찾기
2. 사업공고 크롤링 및 조회
3. 게시판 조회 및 게시판 상세 페이지 CRUD
4. 찜 목록 조회
5. 뉴스 페이지 조회
6. 마이페이지 조회 및 비밀번호 변경
7. 각 게시판별 페이징 처리

 - **관리자 페이지**
1. 유저 정보 CRUD
2. 유저 문의 CRUD
3. 광고 CRUD

### 백엔드
 - **크롤링** 

1. 2개 사이트 비동기적 크롤링
2. DB 저장

 - **서버**

1. 사용자 요청 처리
2. JSON파일 전달 처리
3. 이미지파일 base64 인코딩 후 전달
