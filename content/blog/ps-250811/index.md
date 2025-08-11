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
## 구현
주어진 조건을 그대로 반영하려고 했다.

1. 속한 노래가 <u>많이 재생된 장르 먼저 수록</u>
    
    - 장르별 재생 횟수 저장 필요

2. 장르 내에서 <u>많이 재생된 노래 먼저 수록</u>

    - 장르 내에서 재생 횟수 내림차순 정렬 필요

3. 장르 내에서 재생 횟수가 같은 노래 중에서는 <u>고유 번호가 낮은 노래 먼저 수록</u>

    - 사실 이 조건은 문제 풀다가 까먹고 있었는데 운 좋게 통과가 된 것 같다.

    - Python **sorted 메서드의 stable한 특성(기존 순서를 유지하는 것)**을 고려하면 반례가 있었을수도 있다.

최종적으로 내가 작성한 코드는 아래와 같다.

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
## 개선
위 코드가 통과되긴 했지만 억지로 욱여넣은 try-except문과 여러 개의 딕셔너리에서 조잡한 코드의 기운이 강하게 느껴진다.

그래서 gemini에게 수정된 코드까지 알려주지 말고 개선해야 할 부분만 알려달라고 요청했고 3가지 피드백을 받을 수 있었다.

> 1. **장르 내 노래 정렬 조건 명시**

위에서도 말했듯이 내가 짠 코드는 3번째 조건을 전혀 반영하지 않고 있다. 람다 함수까지는 잘 써놓고 2% 아쉬운 부분이라고 할 수 있겠다.

첫 번째 기준인 재생 횟수는 내림차순으로, 두 번째 기준인 고유 번호는 오름차순으로 정렬해야 하기 때문에 람다 함수로 두 개의 정렬 조건을 한 번에 처리해줄 수 있다.

```python
sorted_data[genre] = sorted(plays, key=lambda x: (-x[1], x[0]))
```

   
> 2. **상위 2개 노래 선택 로직 간소화**

이건 gemini의 제안을 보자마자 '왜 리스트 슬라이싱 생각을 못했지?' 싶었다. 처음에 try-except문 없이 코드 짜고 이건 무조건 '한 장르에 한 곡 밖에 없는 TC에서 무조건 에러 나겠는데' 싶긴 했지만 런타임 에러 뜨는 케이스 보자마자 바로 예외처리 형식으로 수정했다.

수정하면서도 마음에 들지는 않았는데 저것 말고는 떠오르는 방식이 없었다.

리스트 슬라이싱이 엄청 고급 스킬도 아닌데 떠올리지 못했다는 게 너무 아쉬웠다. 알아서 가져올 수 있는 만큼만 가져오기 때문에 인덱스 에러를 만나지 않는다는 게 리스트 슬라이싱의 큰 장점이다.

```python
for genre, _ in sorted(genre_play.items(), key=lambda x: -x[1]):
    top_two_songs = sorted_data[genre][:2]
    
    for song in top_two_songs:
        answer.append(song[0])
```


> **3. 딕셔너리 최적화**

회사에서 일할 때 중첩 구조 딕셔너리 많이 쓰면서 아예 키 하나에 많은 값 저장할 생각을 못했다니 코테 문제를 오랜만에 봐서 그런 거라고 자기 최면을 거는 중이다. ~~이런 실수는 두 번 다시 없다~~

## 수정된 코드
```python
def solution(genres, plays):
    answer = []
    album_data = {}

    for i, (genre, play) in enumerate(zip(genres, plays)):
        if genre not in album_data:
            album_data[genre] = {'total_plays': 0, 'songs': []}
        
        album_data[genre]['total_plays'] += play
        album_data[genre]['songs'].append((i, play))
        
    sorted_genres_by_play = sorted(album_data.items(), key=lambda item: item[1]['total_plays'], reverse=True)

    for genre_name, genre_info in sorted_genres_by_play:
        songs_list = genre_info['songs']
        songs_list.sort(key=lambda song: (-song[1], song[0]))

        for song in songs_list[:2]:
            answer.append(song[0])
            
    return answer
```