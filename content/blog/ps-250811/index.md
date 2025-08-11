---
title: "[Programmers] 베스트 앨범 "
date: "2025-08-11T12:00:00.000+09:00"
description: "프로그래머스 Level.3 베스트 앨범 풀이"
category: "PS"
---
# 문제
스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다. 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.

1. 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
2. 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.

노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때, 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.

## 제한사항
- genres[i]는 고유번호가 i인 노래의 장르입니다.
- plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
- genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.
- 장르 종류는 100개 미만입니다.
- 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
- 모든 장르는 재생된 횟수가 다릅니다.

## 입출력 예
|genres|plays|return|
|---|---|---|
["classic", "pop", "classic", "classic", "pop"]|[500, 600, 150, 800, 2500]|[4, 1, 3, 0]|

## 입출력 예 설명
classic 장르는 1,450회 재생되었으며, classic 노래는 다음과 같습니다.

- 고유 번호 3: 800회 재생
- 고유 번호 0: 500회 재생
- 고유 번호 2: 150회 재생

pop 장르는 3,100회 재생되었으며, pop 노래는 다음과 같습니다.

- 고유 번호 4: 2,500회 재생
- 고유 번호 1: 600회 재생

따라서 pop 장르의 [4, 1]번 노래를 먼저, classic 장르의 [3, 0]번 노래를 그다음에 수록합니다.

- 장르별로 가장 많이 재생된 노래를 최대 두 개까지 모아 베스트 앨범을 출시하므로 2번 노래는 수록되지 않습니다.

# 키워드
해시

# 풀이

```python
def solution(genres, plays):
    answer = []
    # 속한 노래가 많이 재생된 장르 먼저 수록
    # 장르 내에서 많이 재생된 노래 먼저 수록
    # 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래 먼저 수록
    # 장르별로 가장 많이 재생된 노래를 최대 두 개까지 모음
    # {'classic': [(0, 500), (2, 300)], }
    
    genre_dict = {genre: [] for genre in set(genres)}
    genre_play = {genre: 0 for genre in set(genres)}
    
    for i, (gen, play) in enumerate(zip(genres, plays)):
        genre_dict[gen].append((i, play))
        genre_play[gen] += play
    
    sorted_data = {}
    for genre, plays in genre_dict.items():
        sorted_data[genre] = sorted(plays, key=lambda x: x[1], reverse=True)

    for genre, _ in sorted(genre_play.items(), key=lambda x: -x[1]):
        for i in range(2):
            try:
                answer.append(sorted_data[genre][i][0])
            except:
                break
    return answer
```

1. 장르 내 노래 정렬 조건의 구체화
문제의 세 번째 조건은 "장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다"입니다.
현재 코드의 이 부분은,
code
Python
sorted_data[genre] = sorted(plays, key=lambda x: x[1], reverse=True)
재생 횟수(x[1])를 기준으로만 내림차순 정렬하고 있습니다. 파이썬의 sorted 함수는 기본적으로 안정 정렬(stable sort)을 지원하기 때문에 우연히 테스트 케이스를 통과할 수도 있지만, 이 조건을 명시적으로 코드에 반영해주는 것이 더 안전하고 정확합니다.
개선 아이디어:
key 값으로 튜플(tuple)을 사용하면 여러 기준으로 정렬할 수 있습니다. 예를 들어 key=lambda x: (정렬 기준 1, 정렬 기준 2)와 같이 사용합니다.
첫 번째 기준: 재생 횟수 (내림차순)
두 번째 기준: 고유 번호 (오름차순)
재생 횟수는 내림차순, 고유 번호는 오름차순으로 정렬하려면 어떻게 람다 함수를 구성해야 할지 고민해보세요. (힌트: 숫자의 부호를 바꾸면 정렬 순서가 반대가 됩니다.)
2. 상위 2개 노래 선택 로직 간소화
앨범에 수록할 노래를 선택하는 아래의 코드는 try-except 구문을 사용하여 장르에 노래가 하나만 있을 경우 발생하는 IndexError를 처리하고 있습니다.
code
Python
for i in range(2):
    try:
        answer.append(sorted_data[genre][i][0])
    except:
        break
이 방법도 작동하지만, 더 간결하고 파이썬스러운 방법이 있습니다.
개선 아이디어:
리스트 슬라이싱(slicing)을 활용해보세요. my_list[:2]는 리스트의 처음부터 최대 2개의 요소를 가져옵니다. 만약 리스트에 요소가 하나뿐이라면, 그 하나만 가져오므로 try-except가 필요 없어집니다.
3. 데이터 구조의 통합
현재 코드는 장르별 노래 목록을 담는 genre_dict와 장르별 총 재생 수를 담는 genre_play라는 두 개의 딕셔너리를 만들어 사용하고 있습니다. 이후에 sorted_data라는 세 번째 딕셔너리도 생성합니다.
개선 아이디어:
초기 데이터 처리 단계에서 이 정보들을 하나의 데이터 구조로 통합하여 관리하면 변수의 수를 줄이고 코드의 흐름을 더 명확하게 만들 수 있습니다. 예를 들어, 다음과 같은 구조를 생각해볼 수 있습니다.
code
Code
{
    'pop': {'total_plays': 3100, 'songs': [(4, 2500), (1, 600)]},
    'classic': {'total_plays': 1450, 'songs': [(3, 800), (0, 500), (2, 150)]}
}
이러한 구조를 처음부터 만들어두면 나중에 장르를 정렬할 때와 노래를 선택할 때 조금 더 편리하게 데이터를 다룰 수 있습니다. collections 모듈의 defaultdict를 사용하면 이 과정을 더 쉽게 구현할 수도 있습니다.
요약