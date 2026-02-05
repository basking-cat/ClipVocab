# Design Document

## 1. Introduction and Overview

### Context

<!--
背景・状況を書く
なぜこのプロジェクトが必要になったのか
-->

英単語学習の際にモチベーションを維持するのが大変だと感じたことがあり、英単語学習のモチベーションを維持させるためのアプリケーションを作ろうと考えた。

### Problem

<!--
このアプリケーションで解決したい課題
現状の何が問題なのか
-->

- ただ単語を見て覚える単純作業の繰り返しでモチベーションが低下すること
- 単語帳で学習する多くの場合、リアルな文脈と切り離されていること
- ユーザが主体的に学ぶ単語を選択することのできる単語学習コンテンツが少ないこと

### Goals and Non-goals

#### Goals

<!--
このプロジェクトで達成したいこと
-->

- 英単語学習を楽しく＆実用的にする
- ユーザの好みに合わせたコンテンツで単語学習を可能にする
- AIを用いて効果的に復習ができるようにする
- クリップ作成から表示までをストレスなく行うUXを実現する

#### Non-goals

<!--
今回はやらないこと（スコープ外）
-->

- ユーザ間の連携機能

---

## 2. Evaluation Metrics

- 検索で提示されたクリップがユーザの好みに一致しているかを、再生開始率・視聴継続率（例: 一定秒数以上の視聴）・保存率で評価する
- 学習体験が途切れずに継続できているかを、セッションあたりの学習クリップ数・離脱率で評価する
- 復習（文章作成）機能の有効性を、AI判定スコアの推移（正確さ/自然さ）および復習後の再学習率で評価する
- 推薦（復習候補/関連単語）の妥当性を、提示後の実行率（復習開始率）・保存率で評価する

---

## 3. Requirements

### Functional Requirements

<!--
機能要件（ユーザーやシステムが「できること」）
箇条書きでOK
-->

#### Learning / Feed Experience

- ユーザは、入力した好み（Preference）に基づいてYouTube上の動画を探索し、学習に適したクリップを**feed形式（順次提示）**で学習できる
- 学習画面では一度に1クリップを表示し、次の学習候補へ容易に遷移できる（例: ボタンまたはスワイプ）
- 検索結果はすべて一覧表示せず、学習に適したクリップを順次提示する
- feedが途切れないよう、必要に応じて追加の学習候補を取得・生成する

#### Clip Definition / Playback (Copyright-safe)

- クリップは動画データを保存せず、**YouTubeの動画IDと再生区間（start/end）**のみを保持する
- クリップ再生は**YouTube公式プレイヤー**を用いて行い、指定した区間のみを再生する（再配布や自前配信は行わない）
- 同一動画から連続してクリップを提示しない

#### Clip Generation / Selection

- Preferenceに基づいて候補動画を探索し、その中から学習に適した区間を抽出してクリップ（start/end）を生成する
- クリップ抽出時は、学習単語を含む**文が完結している区間**を優先して切り出す
- 字幕が利用可能な動画のみを探索対象とする
- （優先度低）一定の品質基準（例: 字幕品質、音声の明瞭さ、過度なノイズがない等）を満たす動画を優先する

#### Search Strategy (Bounded but Endless UX)

- 動画探索は段階的に行い、初回は限定された件数の候補のみ取得する
- 学習単語を含む有効な例文（=クリップ候補）が一定数見つかった場合、それ以上の探索は行わない
- 残り件数などの明示的な数値は表示しない
- ユーザの操作（スキップ/保存/学習継続など）に応じて、学習候補（feed）は動的に更新される

#### Subtitle / Translation UI

- クリップ再生画面では、英語字幕と日本語訳を表示できる
- 英語字幕・日本語訳はそれぞれ表示/非表示を切り替え可能
- 学習対象の単語はハイライトなどによって視覚的に区別される

#### Review / Recall (AI-assisted)

- ユーザは過去に学習した単語を復習できる
- 復習では、ユーザが学習済み単語を用いた英文を作成し、AIが**正誤（意味的妥当性）**および**自然さ**を評価する
- 復習時の提示内容は、過去に学習したクリップの文脈（例文/字幕）を活用できる

#### History / Saved Items

- ユーザは学習した単語やクリップを保存できる
- ユーザは単語単位で、過去に保存した/学習したクリップを見返せる（例: 単語→クリップ一覧）
- 学習履歴は日付などの単位で閲覧できる

#### Recommendations

- 過去の学習履歴に基づいて、関連する単語をおすすめとして提示できる
- 視聴・復習が少ない単語を復習候補として推薦できる

#### Preferences

- ユーザはメイン画面（または設定画面）から好み（Preference）を更新できる

### Non-functional Requirements

<!--
非機能要件（性能・可用性・セキュリティなど）
-->

- 同時アクセス1000人まで安定

---

## 4. System Architecture

<!--
システム全体の構成
フロントエンド / バックエンド / DB / 外部サービスなど
図があれば貼る
-->

### High-level (Hybrid: Firebase + AWS Workers)

````mermaid
flowchart LR
%% ======================
%% Client
%% ======================
subgraph Client["Client (Web / Mobile)"]
UI["UI (Feed / Review / Settings)"]
YTPlayer["YouTube Official Player (Embed/SDK)"]
end

%% ======================
%% Firebase / GCP side
%% ======================
subgraph Firebase["Firebase / GCP (Lightweight app state)"]
Auth["Firebase Auth"]
FS["Firestore (User/Preference/Clip meta/SavedClip/StudyEvent/SearchSession)"]
CR["Cloud Run API (optional)"]
end

%% ======================
%% AWS side
%% ======================
subgraph AWS["AWS (Heavy processing)"]
SQS["SQS Queue (Job: search/generate/review-eval)"]
Fargate["ECS Fargate Worker (Clip candidate generation / AI eval)"]
CloudWatch_Logs["CloudWatch Logs"]
Secrets_Manager["Secrets Manager (Firebase Admin creds, API keys)"]
end

%% ======================
%% External services
%% ======================
subgraph External["External Services"]
YTAPI["YouTube Data APIs (search/meta/captions if available)"]
Translate["Translation API"]
LLM["LLM API (review evaluation / feedback)"]
end

%% ----------------------
%% Auth & app state
%% ----------------------
UI --> Auth
UI <--> FS

%% ----------------------
%% Search / feed generation
%% ----------------------
UI --> CR
CR --> FS
CR --> SQS
SQS --> Fargate

%% Worker reads secrets + calls external APIs
Fargate --> Secrets_Manager
Fargate --> YTAPI
Fargate --> Translate

%% Worker writes results back
Fargate --> FS
Fargate --> CloudWatch_Logs

%% Client listens for updates
UI <--> FS

%% ----------------------
%% Playback
%% ----------------------
UI --> YTPlayer

%% ----------------------
%% Review
%% ----------------------
UI --> FS
FS --> CR
CR --> SQS
Fargate --> LLM
Fargate --> FS
```


### Deployment / Hosting Strategy

- 軽量なアプリ機能（認証・ユーザデータ・学習履歴・feed状態）はFirebase（Auth/Firestore）で管理する
- 重い処理（動画探索、字幕処理、クリップ区間抽出、翻訳、LLM評価、推薦計算）はAWSの非同期ワーカーで実行する
- 非同期処理はSQSをキューとして利用し、ECS Fargate上のワーカーコンテナがジョブを処理する
- ワーカーは処理結果をFirestoreに書き戻し、クライアントはFirestoreの更新を読んでfeedを更新する
- Clip は動画データを保存せず、videoIdと再生区間（start/end）のみを保持し、再生はYouTube公式プレイヤーで行う

---

## 5. Data Design

<!--
データ構造・スキーマ設計
テーブル / コレクション / 主キー / インデックスなど
-->

### ERD

```mermaid
erDiagram
  USER ||--|| PREFERENCE : has
  PREFERENCE ||--o{ PREFERENCE_TOPIC : includes

  VIDEO ||--o{ CLIP : contains
  CLIP ||--o{ CLIP_OCCURRENCE : has
  WORD ||--o{ CLIP_OCCURRENCE : appears_in

  USER ||--o{ SAVED_CLIP : saves
  CLIP ||--o{ SAVED_CLIP : referenced_by
  WORD ||--o{ SAVED_CLIP : saved_as

  USER ||--o{ STUDY_EVENT : generates
  CLIP ||--o{ STUDY_EVENT : related_to
  WORD ||--o{ STUDY_EVENT : related_to
  SEARCH_SESSION ||--o{ STUDY_EVENT : context_of

  USER ||--o{ SEARCH_SESSION : starts
  SEARCH_SESSION ||--o{ SEARCH_RESULT_ITEM : produces
  CLIP ||--o{ SEARCH_RESULT_ITEM : candidate

  USER {
    string id PK
    string displayName
    datetime createdAt
    datetime updatedAt
  }

  PREFERENCE {
    string id PK
    string userId FK  "unique (1:1)"
    string languagePair
    string level
    datetime updatedAt
  }

  PREFERENCE_TOPIC {
    string id PK
    string preferenceId FK
    string label
    float weight
  }

  WORD {
    string id PK
    string text
    string normalized
    datetime createdAt
  }

  VIDEO {
    string id PK  "YouTube videoId"
    string title
    string channelId
    string channelTitle
    int durationSec
    datetime publishedAt
    string language
  }

  CLIP {
    string id PK
    string videoId FK
    float startSec
    float endSec
    string captionSnippetEn  "optional"
    string translationJa     "optional"
    string captionSource
    datetime createdAt
  }

  CLIP_OCCURRENCE {
    string id PK
    string clipId FK
    string wordId FK
    int startChar
    int endChar
    float confidence "optional"
  }

  SAVED_CLIP {
    string id PK
    string userId FK
    string clipId FK
    string wordId FK
    datetime savedAt
    string tags "optional"
  }

  STUDY_EVENT {
    string id PK
    string userId FK
    string clipId FK "nullable"
    string wordId FK "nullable"
    string searchSessionId FK "nullable"
    string eventType
    string source "optional"
    float watchedSec "optional"
    datetime createdAt
    string reviewType "optional"
    string prompt "optional"
    string userAnswer "optional"
    float aiScore "optional"
    string aiFeedback "optional"
  }

  SEARCH_SESSION {
    string id PK
    string userId FK
    string queryWord "optional"
    string preferenceSnapshot "optional"
    datetime createdAt
    string status
  }

  SEARCH_RESULT_ITEM {
    string id PK
    string searchSessionId FK
    string clipId FK
    int rank
    float score "optional"
    string reason "optional"
  }
```

### Deployment / Hosting Strategy

- 軽量なアプリ機能（認証・ユーザデータ・学習履歴・feed状態）はFirebase（Auth/Firestore）で管理する
- 重い処理（動画探索、字幕処理、クリップ区間抽出、翻訳、LLM評価、推薦計算）はAWSの非同期ワーカーで実行する
- 非同期処理はSQSをキューとして利用し、ECS Fargate上のワーカーコンテナがジョブを処理する
- ワーカーは処理結果をFirestoreに書き戻し、クライアントはFirestoreの更新を読んでfeedを更新する
- Clip は動画データを保存せず、videoIdと再生区間（start/end）のみを保持し、再生はYouTube公式プレイヤーで行う

## 6. APIs

### Endpoints

<!--
主要なAPIエンドポイント一覧
-->

### Authentication

<!--
認証・認可方式
-->

### Error Handling

<!--
エラー時のレスポンス方針
-->

---

## 7. User Interface Design

### Screens

<!--
画面一覧
-->

### Screen Transitions

<!--
画面遷移
-->

### Key Operations

<!--
主要なユーザー操作
-->

---

## 8. Assumptions and Dependencies

### Assumptions

<!--
前提条件
-->

### Dependencies

<!--
外部API・外部サービス・ライブラリなど
-->

- 軽い部分はFirebase, 重い処理（）

---

## 9. Alternatives Considered

<!--
検討した別案と、それを採用しなかった理由
-->

- このアプリの作成はAWSの学習も兼ねているため全てにAWSを採用することも考えたが、MVPの完成速度を優先したいためFirebaseとのハイブリッドにした。

---

## 10. Failure Cases / Limitations

<!--
想定される障害・制限事項・現在の限界
-->

- 学習に適した候補が一定数見つからない場合、学習セッションを終了する
- 外部APIの制約により、取得可能な候補数には上限がある
- 学習に適した候補が十分に見つからない場合、体験が限定される可能性がある
- 特定の単語やニッチな分野では、十分な例文が得られない可能性がある

## 11. Personal

- テスト、CI/CD、コンテナ、デプロイを経験する
````
