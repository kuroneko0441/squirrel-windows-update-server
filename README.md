# squirrel-windows-update-server

## Usage

#### Environment variables
`PORT`: 서버가 응답할 포트\
`OWNER`: 깃헙 사용자\
`REPO`: 레포지토리 이름

이 레포의 경우에는 `OWNER=kuroneko0441`, `REPO=squirrel-windows-update-server`가 됨.

env 설정 후에 `npm start`로 실행

## Endpoints
`/update`: 릴리즈 파일들을 다운로드할 수 있음. (ex: `/update/RELEASES`, `/update/ScheduleQueue-0.0.5-full.nupkg`)
`/download`: `.exe` 파일(설치 파일)을 다운로드할 수 있음. 앱 설치파일 배포용으로 사용 가능

## 개요
[일렉트론](https://electronjs.org) 앱이 업데이트시에 [autoUpdater](https://electronjs.org/docs/api/auto-updater) 모듈에서 참조하는 링크를 분석해봄.

#### URL 형태
##### 형식
```http
GET /RELEASES?id=[앱 이름]&localVersion=[현재 앱 버전]&arch=[현재 아키텍쳐]
```
##### 예
```http
GET /RELEASES?id=ScheduleQueue&localVersion=0.0.4&arch=amd64
```

#### `RELEASES` 파일의 형태
##### 형식
```
[해시값A] [파일명].nupkg [해시값B]
```
##### 예
```
316820F743415680877F21E284D96E54708C6E87 ScheduleQueue-0.0.4-full.nupkg 50075714
```

여기서 현재 앱의 nupkg 이름(예: `ScheduleQueue-0.0.4-full.nupkg`)가\
`RELEASES` 파일에 있는 이름과 다르다면(버전이 높은지 낮은지는 판단 안되는듯?)\
해당 파일을 불러옴

##### 달라진 `RELEASE` 파일
```
F1158D1D4AF41D16F1590B9F0995B530A18AAD1F ScheduleQueue-0.0.5-full.nupkg 50109503
```

##### `ScheduleQueue-0.0.5-full.nupkg` 파일 다운로드
```http
GET /ScheduleQueue-0.0.5-full.nupkg
```

파일을 모두 다운로드하면 일렉트론 앱이 알아서 업데이트하고, 재시작 시 적용됨

## Github Release 사용
깃헙에는 [Release](https://help.github.com/articles/about-releases) 라는 기능이 있다. 태그를 지정하고 파일 업로드를 하면 정리해주는 시스템.

당연히 [API](https://developer.github.com/v3/repos/releases)도 있는데, 여기서 [Lastest Release](https://developer.github.com/v3/repos/releases/#get-the-latest-release)를 사용해서 가장 최근 릴리즈를 받아올 수 있음.

이 API에서 릴리즈와 같이 올라온 파일도 볼 수 있고, 파일 다운로드 링크도 볼 수 있음. 요거를 사용해서 가장 최근 릴리즈의 파일들을 다운로드할수 있게 도와줌
