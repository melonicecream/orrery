<div align="center">
  <img src="src/assets/icon-512.png" alt="Orrery" width="256" />
  <h1>Orrery — 혼천의(渾天儀)</h1>
</div>

> **📢 AGPL-3.0 고지 및 변경 사항 (Modifications)**
>
> 본 프로젝트는 원본 Orrery를 포크하여 다음과 같은 기능을 추가 및 수정하였습니다. AGPL-3.0 라이선스에 따라 모든 변경 사항은 본 저장소를 통해 공개됩니다.
>
> 1. **API 서버 구현 (`server.ts`)**: 클라이언트 전용이었던 계산 엔진을 HTTP API로 호출할 수 있도록 Bun 기반 서버를 추가했습니다.
> 2. **LLM 최적화 (TOON 포맷)**: LLM 분석 시 토큰을 절약하고 구조적 이해를 돕기 위해 `@toon-format/toon` 인코딩 기능을 통합했습니다.
> 3. **데이터 시각화 지원**: 프론트엔드 시각화를 위해 TOON 포맷 외에도 원본 JSON 데이터를 함께 반환하도록 API 응답 구조를 개선했습니다.
> 4. **환경 구성**: 비공개 서비스와의 통합을 위해 `.gitignore` 및 의존성 설정을 조정했습니다.
>
> *최종 수정일: 2026년 2월 21일*

---

브라우저 기반 명리학 도구. 사주팔자(四柱八字), 자미두수(紫微斗數), 서양 점성술 출생차트(Natal Chart)를 백엔드 없이 클라이언트에서 계산합니다.

**[라이브 데모 →](https://rath.github.io/orrery/)**

## 크레딧

- **사주 만세력** — 고영창님의 Perl [진짜만세력](http://afnmp3.homeip.net/~kohyc/calendar/cal20000.html)을 김정균님이 [PHP로 포팅](https://github.com/OOPS-ORG-PHP/Lunar)한 것을, 2018년 11월 황장호가 Java와 Python으로 포팅하여 사용해오다가, 2026년 2월 Claude Code (Opus 4.6)로 TypeScript로 포팅
- **자미두수 명반** — [lunar-javascript](https://www.npmjs.com/package/lunar-javascript) 라이브러리 기반으로 Claude (Opus 4.5)가 중국어 문헌을 리서치하며 구현
- **점성술 출생차트** — [Swiss Ephemeris](https://www.astro.com/swisseph/)의 Moshier 이론을 순수 TypeScript로 포팅

## 기능

### 사주팔자 (四柱八字)
- 60갑자 기반 4주 계산 (시주, 일주, 월주, 년주)
- 십신, 12운성, 지장간
- 합충형파해 관계 분석 (삼합, 반합, 방합 포함)
- 신살 (양인살, 백호살, 괴강살)
- 대운 10개 (순행/역행 판단)
- 일운/월운 트랜짓 (합/충/형 감지)

### 자미두수 (紫微斗數)
- 음력 자동 변환
- 명궁/신궁 계산
- 14주성 배치 (紫微계 + 天府계)
- 보성/살성 배치
- 사화 (化祿/化權/化科/化忌)
- 성요 밝기 (廟/旺/得/利/平/陷)
- 전통 4×4 명반 그리드 레이아웃
- 대한 12개
- 유년 운세 (유년명궁, 유년사화, 12유월)

### 출생차트 (Natal Chart)
- Swiss Ephemeris Moshier 이론 기반 행성 위치 계산 (순수 TypeScript)
- 10개 행성 + 키론 + 남/북교점 위치 (별자리, 도수, 역행)
- 하우스 시스템 선택 (Placidus 기본, 10종 지원)
- ASC/MC/DESC/IC 앵글
- 5대 메이저 애스펙트 (합, 육합, 스퀘어, 트라인, 충)
- 출생 위치 입력 (위도/경도, 서울 기본값)

### 공통
- **[NEW]** API 서버 모드 지원 (`bun run server.ts`)
- **[NEW]** LLM 최적화 TOON 데이터 출력
- AI 에이전트용 텍스트 복사 (사주 + 자미두수 + 출생차트 일괄 복사)
- 사용 가이드 및 용어 설명
- 시간 모름 모드 (3주 계산)
- 모바일 반응형

## 사용법

```bash
# 의존성 설치
bun install

# 개발 서버 (Frontend)
bun dev

# API 서버 실행 (New)
bun run server.ts

# 빌드
bun run build

# 테스트
bun test
```

## 기술 스택

- React 19 + TypeScript 5
- Vite 7
- Tailwind CSS 4
- Bun (Server runtime)
- lunar-javascript (음력 변환)
- @toon-format/toon (LLM Optimized notation)
- Vitest (테스트)

## `@orrery/core` 맛보기

계산 엔진을 npm 패키지로 사용할 수 있습니다. → [`@orrery/core`](https://www.npmjs.com/package/@orrery/core)

```typescript
import { calculateSaju } from '@orrery/core/saju'
import { createChart } from '@orrery/core/ziwei'
import { calculateNatal } from '@orrery/core/natal'

const input = { year: 1993, month: 3, day: 12, hour: 9, minute: 45, gender: 'M' as const }

// 사주팔자
const saju = calculateSaju(input)
saju.pillars.forEach(p => console.log(p.pillar.ganzi)) // 乙巳, 壬辰, 乙卯, 癸酉

// 자미두수 명반
const ziwei = createChart(1993, 3, 12, 9, 45, true)
console.log(ziwei.mingGongZhi)  // 명궁 지지
console.log(ziwei.wuXingJu.name) // 오행국

// 서양 점성술 출생차트
const natal = await calculateNatal(input)
natal.planets.forEach(p => console.log(`${p.id}: ${p.sign} ${p.degreeInSign.toFixed(1)}°`))
console.log(`ASC: ${natal.angles.asc.sign}`)
```

## 라이선스

[AGPL-3.0](LICENSE)

<details>
<summary>AGPL-3.0이 뭔가요? (쉬운 설명)</summary>

### 자유롭게 할 수 있는 것

- **개인적으로 사용** — 본인 컴퓨터에서 마음대로 실행하고 수정해도 됩니다.
- **소스 코드를 읽고 공부** — 코드를 보고 배우는 건 언제든 환영합니다.
- **수정·개선 후 재배포** — 코드를 고쳐서 다시 배포할 수 있습니다. 단, 아래 조건을 지켜야 합니다.

### 반드시 지켜야 하는 것

- **같은 라이선스(AGPL-3.0) 유지** — 이 코드를 수정하거나 포함해서 배포할 때, 그 결과물도 반드시 AGPL-3.0으로 공개해야 합니다.
- **소스 코드 공개 의무** — 일반적인 GPL과 달리, AGPL은 **웹 서비스로 제공하는 경우에도** 소스 코드를 공개해야 합니다. 예를 들어 이 코드를 수정해서 웹사이트로 운영하면, 사용자가 요청할 때 수정된 소스 코드를 제공해야 합니다.
- **변경 사항 명시** — 원본에서 무엇을 바꿨는지 알 수 있도록 표시해야 합니다.
- **저작권 표시 유지** — 원본의 저작권 표시와 라이선스 문구를 지우면 안 됩니다.

### 할 수 없는 것

- **소스 비공개 상태로 서비스 운영** — 이 코드를 수정해서 웹 서비스를 만들면서 소스를 공개하지 않는 것은 라이선스 위반입니다.
- **다른 라이선스로 변경** — AGPL 코드를 MIT, Apache 등 더 허용적인 라이선스로 바꿔서 배포할 수 없습니다.

### 한줄 요약

> 마음껏 쓰되, 수정하거나 서비스로 제공할 경우 소스 코드를 AGPL-3.0으로 공개하세요.

</details>
