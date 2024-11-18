# lunch-api

전국 학교 급식 조회 및 학교 조회 API

1. [소개](#소개)
2. [사용방법](#사용방법)
   - [급식조회](#급식조회)
   - [학교조회](#학교조회)


## 소개

일반 나이스 API는 복잡하고 json으로 추출하면 api 포멧이 틀리게 되어있음을 방지하기 위해<br/>
만들어진 간단한 API입니다.

## 사용방법

# 급식조회

```
https://lunch-api.vercel.app/lunch?region=[지역코드]&code=[학교코드]&date=[급식을 가져올 날짜 (YYMMDD)]
```

예시:
```
https://lunch-api.vercel.app/lunch?region=X12&code=3456789&date=241118
```

결과

```json
{
  "mealData": [
    "찰현미밥(동) ",
    "소고기무국 (5.6.13.16)",
    "동부묵김가루무침 (13)",
    "감자크로켓 (1.2.5.6)",
    "배추김치(동) (9.13)",
    "눈꽃치즈돈육불고기 (5.6.10.13)"
  ],
  "ntrInfo": [
    "... 생략"
  ],
  "origin": [
    "... 생략"
  ],
  "calories": "... 생략"
}
```

# 학교조회

```
https://lunch-api.vercel.app/school?name=[학교이름]
```

예시:
```
https://lunch-api.vercel.app/school?name=깃헙초등학교
```

결과: 
```json
[
  {
    "regionCode": "X12",
    "schoolCode": "3456789",
    "schoolName": "깃헙초등학교",
    "schoolWebsite": "https://github.com",
    "schoolFax": "010-1234-5678",
    "schoolAddress": "88 Colin P Kelly Jr St"
  }
]
```
