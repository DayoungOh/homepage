# 패커스 대시보드 프로토타입

### 기본 환경설정

* 개발 환경에 requirements 파일에 있는 패키지 설치
 
### static 파일 설정 - webpack 등

* `static` 디렉토리 안에서 `npm install` 실행

* webpack을 통한 static 파일 빌드(`package.json` 파일이 있는 static 디렉토리 안에서 명령 실행)
  * `$ npm run build`: 현재 static 파일들을 한번 빌드
  * `$ npm run start`: webpack 서버를 띄우고 static 파일에 변화가 있을 때마다 자동으로 빌드 실행

* 참고: 현재 설정상 새로운 js 파일을 만들 때마다 webpack 설정 새로운 entry를 생성해야 함.

### 로컬에서 테스트 서버 띄우기

* `packus/start_local_http.py` 파일 실행
  * `packus` 디렉토리 안에서 `$ run start_local_http.py` 명령어 실행
  * 기본적으로 `5000`번 포트 사용. `http://localhost:5000`에 접속하면 확인 가능. 