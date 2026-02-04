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

- 検索結果がユーザの好みに一致しているかを、クリック率や再生完了率で評価する
- 振り返り機能で提示された単語が、過去の学習履歴に対して適切かを確認する
- ユーザが推薦されたコンテンツを実際に視聴・保存した割合を指標とする

## 3. Requirements

### Functional Requirements

<!--
機能要件（ユーザーやシステムが「できること」）
箇条書きでOK
-->

- ユーザが、入力した好みと単語に基づいたyoutube上のコンテンツから生成したクリップで単語学習ができる
- 入力した好みに基づいたyoutube上の動画を探し、その中から入力した単語が含まれる部分の前後数秒を切り取りクリップを生成。切り取る際には文が完結している箇所で切る。
- クリップ再生画面では、クリップと英語字幕と日本語訳を表示。字幕と訳はそれぞれ表示・非表示選択可能。単語は色でハイライト。
- 検索時には十分な数の候補動画を取得し、その中から学習に適したクリップを選定する
- 検索結果はすべて一覧表示せず、学習に適したクリップを順次提示する
- 動画検索は段階的に行い、初回は限定された件数のみ取得する
- ユーザーの操作に応じて、学習候補は動的に更新される
- 学習画面では一度に1クリップを表示し、次の学習候補へ容易に遷移できる
- 残り件数などの明示的な数値は表示しない
- 字幕が利用可能な動画のみを探索対象とする
- 一定の品質基準を満たす動画を優先する
- 学習単語を含む有効な例文が一定数見つかった場合、それ以上の探索は行わない
- 同一動画から連続してクリップを提示しない

- AIを用いた過去に学習した単語の振り返り機能
- 復習画面から、単語単位で過去に見たクリップを見返し・保存出来る（過去に学習した単語一覧を表示し、単語をクリックするとその単語のクリップ一覧が表示される）。日付ごとに一覧を表示。
- 過去の学習履歴から関連のある単語をおすすめとして表示
- 過去の学習履歴の中で再視聴回数が少ない単語を復習候補として推薦
- 復習機能では、視聴したクリップに含まれる文を利用？

- メイン画面から好みの再設定が可能

(Memo 後で消す)

- 検索結果を表示するんじゃなくてインスタのリールみたいに次々と出てくる形式の方がいい気がしてきた。もしくは左右に矢印ボタンをつけて簡単に遷移できるように

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

---

## 5. Data Design

<!--
データ構造・スキーマ設計
テーブル / コレクション / 主キー / インデックスなど
-->

### Entities

> 方針：まずは「学習体験（検索→学習→保存→復習）」に必要な最小エンティティで固める。  
> クリップ生成や推薦は、あとから強化できるよう 検索セッション / 学習イベント を置いて拡張性を確保する。

---

#### User

- **relations**
  - User は **1つの Preference** を持つ（1:1）
  - User は **複数の SavedClip** を持つ（1:N）
  - User は **複数の StudyEvent** を持つ（1:N）
  - User は **複数の SearchSession** を持つ（1:N）
- **fields (例)**
  - `id`
  - `displayName`
  - `createdAt`, `updatedAt`

---

#### Preference

- **relations**
  - Preference は **1人の User** に属する（N:1）
  - Preference は **複数の PreferenceTopic** を持つ（1:N）※配列でもOK
- **fields (例)**
  - `id`
  - `userId`
  - `languagePair`（例: `en-ja`）
  - `level`（例: `beginner/intermediate/advanced`）
  - `updatedAt`
- **notes**
  - 好みは「自由入力の文章」でも良いが、検索に使うなら内部では **トピック配列 + 重み** に寄せると後々強い。

---

#### PreferenceTopic（任意：Preference内の要素として配列でも可）

- **relations**
  - PreferenceTopic は **1つの Preference** に属する（N:1）
- **fields (例)**
  - `id`
  - `preferenceId`
  - `label`（例: `tech`, `music`, `fashion`, `study abroad`）
  - `weight`（0.0〜1.0）

---

#### Word

- **relations**
  - Word は **複数の ClipOccurrence** を持つ（1:N）
  - Word は **複数の SavedClip** から参照されうる（N:M）※SavedClip側で保持でもOK
- **fields (例)**
  - `id`
  - `text`（例: `overwhelmed`）
  - `normalized`（小文字化など）
  - `createdAt`

---

#### Video

- **relations**
  - Video は **複数の Clip** を持つ（1:N）
- **fields (例)**
  - `id`（YouTube videoId）
  - `title`
  - `channelId`, `channelTitle`
  - `durationSec`
  - `publishedAt`
  - `language`（推定でも可）
- **notes**
  - Video は「外部参照」なので、まずは最低限メタデータだけ保存してOK。

---

#### Clip

- **relations**
  - Clip は **1つの Video** に属する（N:1）
  - Clip は **複数の ClipOccurrence** を持つ（1:N）
  - Clip は **複数の SavedClip** から参照されうる（1:N）
- **fields (例)**
  - `id`
  - `videoId`
  - `startSec`, `endSec`
  - `captionTextEn`（取得できる場合）
  - `captionTextJa`（翻訳済み or 外部翻訳結果）
  - `captionSource`（`youtube` / `whisper` / etc）
  - `createdAt`
- **notes**
  - 「文が完結している箇所で切る」は Clip 生成ロジックで担保し、Clip には結果のみ入れる。

---

#### ClipOccurrence（Clip内でどの単語がどこに出たか）

- **relations**
  - ClipOccurrence は **1つの Clip** に属する（N:1）
  - ClipOccurrence は **1つの Word** を参照する（N:1）
- **fields (例)**
  - `id`
  - `clipId`
  - `wordId`
  - `startChar`, `endChar`（字幕テキスト上の位置）
  - `confidence`（任意）

---

#### SavedClip（ユーザが保存した学習単位）

- **relations**
  - SavedClip は **1人の User** に属する（N:1）
  - SavedClip は **1つの Clip** を参照する（N:1）
  - SavedClip は **1つの Word** を参照する（N:1）※「どの単語として保存したか」
- **fields (例)**
  - `id`
  - `userId`
  - `clipId`
  - `wordId`
  - `savedAt`
  - `tags`（任意）
- **notes**
  - 「単語→クリップ一覧」表示は SavedClip を wordId でグルーピングすれば実現できる。

---

#### StudyEvent（視聴や学習のログ：推薦/復習の材料）

- **relations**
  - StudyEvent は **1人の User** に属する（N:1）
  - StudyEvent は **1つの Clip** を参照する（N:1）
  - StudyEvent は **1つの Word** を参照しても良い（任意）（N:1）
- **fields (例)**
  - `id`
  - `userId`
  - `clipId`
  - `wordId`（任意）
  - `eventType`（`view` / `complete` / `save` / `skip`）
  - `watchedSec`（任意）
  - `createdAt`

---

#### SearchSession（検索1回分：feed生成の単位）

- **relations**
  - SearchSession は **1人の User** に属する（N:1）
  - SearchSession は **複数の SearchResultItem** を持つ（1:N）
- **fields (例)**
  - `id`
  - `userId`
  - `queryWord`（検索単語）
  - `queryPreferenceSnapshot`（Preferenceのスナップショット：任意）
  - `createdAt`
  - `status`（`pending` / `ready` / `failed`）

---

#### SearchResultItem（feedに流す候補の1件）

- **relations**
  - SearchResultItem は **1つの SearchSession** に属する（N:1）
  - SearchResultItem は **1つの Clip** を参照する（N:1）
- **fields (例)**
  - `id`
  - `searchSessionId`
  - `clipId`
  - `rank`
  - `score`（任意）
  - `reason`（任意：なぜおすすめか）
- **notes**
  - 「無限探索」問題は SearchSession 単位で **候補数に上限** を持たせ、足りなければ追加バッチを作る設計にしやすい。

---

### Relationships Summary

- User (1) --- (1) Preference
- User (1) --- (N) SavedClip --- (1) Clip --- (N) ClipOccurrence --- (1) Word
- User (1) --- (N) StudyEvent --- (1) Clip
- User (1) --- (N) SearchSession --- (N) SearchResultItem --- (1) Clip
- Video (1) --- (N) Clip

---

### 最小構成

- User / Preference
- Word
- Video / Clip
- SavedClip
- StudyEvent（最低 `view` と `save` だけでも）
- SearchSession / SearchResultItem（feed形式にするなら）

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

- AWS

---

## 9. Alternatives Considered

<!--
検討した別案と、それを採用しなかった理由
-->

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
