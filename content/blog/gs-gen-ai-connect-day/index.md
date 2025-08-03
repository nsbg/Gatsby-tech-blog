---
title: GS GenAI Connect Day #3: AI 에이전트의 현재와 미래
date: "2025-06-05T12:00:00.000+09:00"
description: This is a custom description for SEO and Open Graph purposes, rather than the default generated excerpt. Simply add a description field to the frontmatter.
category: "Insight"
---

9/8~9/9 gs gen ai 해커톤

GS -> AI Agent에 초점 맞추고 있는 듯

# MCP 정말 안전하게 쓸 수 있을까?
52g 리드 엔지니어 허영수(GS)

- MCP 근황
    - 앤트로픽 내부에서 쓰려고 시작했다가 유명해진 케이스

- MCP 설계 철학
    - 정보 사일로 해소 -> 새로운 데이터 소스마다 맞춤 구현이 필요하기 때문에 어려움이 있음

- 실사례
    - 토스페이먼츠: 개발자 문서 조회 MCP 서버 공개
    - Notion: Beta 버전 공식 오픈소스 공개 -> 용도에 맞게 구조 개선 필요
    - AWS: 공식 깃허브에 다 공개돼있음 -> 용도에 맞게 구조 개선 필요
    - 비공식 오픈소스들
         - 대부분 기존 API를 그대로 감싼 형태라 정보 불충분, 에이전트 입력 토큰 낭비 요소, 보안 취약성 존재

- MCP는 왜 보안에 취약할까?
    - 개방형 확장성 우선 설계
    - 분산된 책임 구조
    - 생태계 수준의 구조적 문제 -> Slack link unfurling 취약점, SQLite SQL injection 버그
    - 검증 메커니즘 부족 -> 도구 진위성 검증 부족, 지속적 무결성 검사 부재

- 엔터프라이즈 적용 방향
    - MCP 서버 운영 지침
        - 컨테이너 격리, 샌드박스 환경 실행
        - 기반서비스에 대한 최소권한 부여
        - 포괄적 모니터링
    - 충분한 테스트 기간 확보 및 점진적 적용
        - 도구, 정책, 사용자 역량 안정화 기간 필요
        - 외부 공개 정보 -> 사내 일반 정보 -> 사내 민감 정보

Q. MCP 서버에 연결된 툴이 많으면 llm이 제대로 못 찾는 문제 -> 어떻게 다루고 있는지
A. 툴 제한은 따로 하고 있지 않지만, 가드레일을 입혀서 관리함. 코드 생성하는 툴이 가장 위험하다고 생각함

# Scaling Enterprise GenAI Applications Across Industries
Craig Doden Head of Strategic Partnerships & Business Development(Articul8)

- A8 platform
    - 기업이 다양한 파일 형식을 즉시 처리할 수 있게 함

# 비즈니스 적용 고군분투
테디노트
- LLM 어플리케이션 개발 트렌드 변화
    - ChatGPT -> RAG -> Agent
    - 문서가 많아졌을 때 RAG 성능이 떨어지는 문제, 할루시네이션을 완전히 제거하는 것에 대한 어려움 여전히 존재
    - 랭그래프 도입해서 사용 중

인터럽트 -> 사용자의 신뢰를 얻는 과정, 사유가 중요함

mcp -> 사내 프로세스 개선툴에 매우 적합하다고 생각

멀티쿼리

# Shaping the future of AI assited development
Klaire Baek(Microsoft Github, Copilot Engineering)

ai를 빠르게 도입하는 게 중요한 게 아님, 도입 목적이 중요함 -> 코파일럿팀에서는 팀 내에서 매뉴얼하게 진행하는 작업 다 모아서 분석한 후 ai로 바꿀 수 있겠다 싶은 부분을 찾음

devops -> 개인이 공부는 할 수 있지만 실무에서 써보지 않으면 경험 쌓기가 어려운 분야임

triage

자칭 ai expert가 많음 -> ai 현업에서 사활을 걸고 일하는 엔지니어는 링크드인이나 유튜브에 뭘 올릴 시간이 없다는 걸 명심하기

코드를 배우기 좋은 시기다.

DS, 알고리즘도 중요함

자기가 좋아하는 분야를 정하고 깊게 파라