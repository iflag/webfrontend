# iflag

🏴‍☠️ 내가 쓰려고 만드는 통합 북마크 관리자 🏴‍☠️

![iflag](https://user-images.githubusercontent.com/68256639/123691680-e1326a80-d890-11eb-8959-bcd984334b9c.JPG)

## Why

필자는 보통 Safari, Firefox, Chrome, DuckDuckGo(Mobile) 4 종류의 브라우저를 사용한다.

보통 Safari 북마크 기능을 사용해서 소중하고 유익한 자료들이 담긴 링크들을 저장한다.

하지만 Safari와 Firefox, Chrome, DuckDuckGo 서로 북마크 가져오기가 쉽지 않다.

(Safari에서 Chrome 북마크 가져오기, FireFox와 Chrome 연동은 되지만 가장 중요한 Chrome에서 Safari 북마크 가져오기 기능은 없다. 개인정보 보호 목적으로 모바일에서는 DuckDuckGo 브라우저를 사용하는데 이 또한 북마크를 전역으로 공유하는 것이 힘들다.)

그리고 최근에 팀원들에게 인터넷 자료들을 공유할 일이 있었는데 하나하나 복사 붙여 넣기 해서 공유를 했다. 이 과정에서 인터넷 자료(링크)들을 편리하게 묶어서 공유하고 싶다는 생각이 들었다.

따라서 인터넷이라는 넓은 바다에서 찾은 보물 같은 **웹 링크**(자료)들을 장소와 디바이스에 구애받지 않고

안전하게 저장하고 사용하고 공유할 수 있는 소프트웨어를 만들고 싶다는 생각이 들어서 바로 프로젝트를 기획했다.

(쓰면서 드는 아이디어인데 만들고 괜찮으면 아이디와 비밀번호, 할 일 등 모두 한 번에 저장하고 관리할 수 있도록 확장할 생각도 들었다!)

---

## What

실제로 이 아이디어를 가지고 시장에 출시된 여러 제품들이 있었다.

하지만 무료로 간단하게 직관적으로 링크들을 보관하고 바로 묶어서 카톡에 전송하든지 공유를 하는 등의 제품들은 찾기가 어려웠다. (거의 구독형 유료 서비스, 마음에 안 드는 UI,...)

그래서 바로 만들기로 하고 일어나자마자 레포지토리를 만들었다. :0는

프로젝트의 포인트는 **간단한 UI**, **언제 어디서든 사용 가능 한 링크 자료들**, **편하게 공유 가능한 기능** 이 세 가지에 맞추었다.

---

## 기술 개요

- blueprint

  - [using lucidchart](https://lucid.app/lucidchart/invitations/accept/47411011-97da-41da-beac-9841bf51c03b)

- frontend

  - React
  - TypeScript

  - styled-component
  - mobx

- backend

  - Django
  - Django Rest Framework

- database

  - prod : PostgreSQL
  - dev : sqlite

- infra
  - Docker
  - AWS S3
  - Oracle cloud

---
