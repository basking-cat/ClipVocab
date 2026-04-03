# design.md 分析レポート

## 1. 方向性のコンフリクト・不整合

### 1.1 学習フローの解釈の曖昧さ

- **要件**: 「Preferenceに基づいて動画を探索」かつ「ユーザが主体的に学ぶ単語を選択」
- **現状**: `SEARCH_SESSION.queryWord` が optional になっており、「単語を指定して検索」と「Preferenceのみで検索」の両方が許容されているが、どちらを主軸にするかが明文化されていない。
- **推奨**: 主シナリオを1つにしぼる（例: 単語を入力 → Preferenceでフィルタしたクリップをfeed）か、両シナリオを「検索モード」として要件・画面で明示する。

### 1.2 Cloud Run の「optional」と代替経路の未定義

- **図**: Cloud Run API が "(optional)" と記載されている。
- **問題**: optional の場合の代替（例: クライアント → 何か → SQS）が書かれておらず、実装方針が分からない。
- **推奨**: 「Cloud Run を使う」か「Firebase Cloud Functions で SQS に投入する」かなど、採用パスを1つに決めて図と Section 4 に明記する。

### 1.3 重複・誤配置

- **Section 5（Data Design）内の「Deployment / Hosting Strategy」**: Section 4 と同一の段落がそのまま Data Design 内にあり、配置ミス。
- **推奨**: Section 5 から削除し、Section 4 にのみ記載する。

### 1.4 未記載・未完成

- **Section 8 Dependencies**: 「軽い部分はFirebase, 重い処理（）」で文が途切れている。
- **推奨**: 「重い処理はAWS（SQS + Fargate ワーカー）で実行する」など、Section 4 と整合する一文で完了させる。

---

## 2. ER図の妥当性

### 2.1 妥当な点

- **USER ↔ PREFERENCE (1:1)**: ユーザごとに1設定で自然。
- **VIDEO → CLIP**: videoId と start/end のみ保持する要件と一致。
- **CLIP ↔ CLIP_OCCURRENCE ↔ WORD**: クリップ内の単語位置・ハイライト要件を表現できている。
- **SAVED_CLIP**: userId / clipId / wordId で「このユーザがこのクリップをこの単語用に保存」を一意に表現できている。
- **STUDY_EVENT**: 再生・復習・AI評価（reviewType, userAnswer, aiScore, aiFeedback）を格納でき、要件を満たしている。
- **SEARCH_SESSION → SEARCH_RESULT_ITEM → CLIP**: 検索結果の順序（rank）付きリストになっており、feed の元データとして妥当。

### 2.2 検討・補足した方がよい点

| 項目 | 内容 |
|------|------|
| **推薦（Recommendations）** | 要件では「関連単語」「復習候補」があるが、ER には推薦用エンティティがない。STUDY_EVENT / SAVED_CLIP から都度計算する前提なら、その旨を Data Design に1行で記載するとよい。 |
| **「学習単語」の主役** | Feed で「このクリップで学ぶ単語」は、`SEARCH_SESSION.queryWord` に対応する WORD か、CLIP_OCCURRENCE のいずれかになる。検索が「単語指定あり」の場合、feed の1クリップ＝その単語を含むクリップと対応づけると分かりやすい。 |
| **同一動画の連続禁止** | 要件「同一動画から連続してクリップを提示しない」は、SEARCH_RESULT_ITEM の並びや feed 生成ロジックで満たす想定。ER では表現しないが、Section 5 または API/フローに「feed 生成時は同一 videoId が連続しないよう並べ替え」と書いておくとよい。 |
| **Firestore のコレクション対応** | ER のエンティティ名がそのまま Firestore コレクション名になる想定か、命名規則（例: `users`, `preferences`）を Section 5 に短く書くと実装と揃いやすい。 |

### 2.3 軽微な点

- **PREFERENCE_TOPIC.weight**: 型を `float` としているが、Firestore では number で問題ない。用途（正規化するかどうか）をコメントで補足してもよい。
- **STUDY_EVENT の nullable**: clipId / wordId / searchSessionId が nullable で、汎用イベント（例: 復習開始のみ）を許容しており、設計として妥当。

---

## 3. アーキテクチャの妥当性

### 3.1 妥当な点

- **Firebase（認証・アプリ状態）と AWS（重い処理）の分担**: レイテンシに敏感な部分は Firestore/Auth、重い処理は非同期ワーカーで分離できている。
- **クリップはメタデータのみ**: 動画は保存せず videoId + start/end のみ保持し、再生は YouTube 公式プレイヤーという方針は、著作権・コストの面で一貫している。
- **SQS → Fargate → Firestore**: ワーカーが結果を Firestore に書き、クライアントが Firestore を購読する流れは、オフライン対応やスケールと相性が良い。
- **Secrets Manager**: Firebase Admin や API キーをワーカーで参照する構成は妥当。

### 3.2 検討・明確化した方がよい点

| 項目 | 内容 |
|------|------|
| **CR の役割** | Cloud Run を「API」としているが、具体的には「検索開始」「復習評価リクエスト」などを受け、SQS にジョブを投入する入口と解釈できる。その役割を Section 4 の短文で明示するとよい。 |
| **Firestore への書き込み主体** | ワーカーが Firestore に直接書く場合、Firebase Admin SDK を AWS 側で利用する必要がある。Dependencies に「Firebase Admin SDK（Fargate 内）」を追記すると分かりやすい。 |
| **推薦の計算場所** | 推薦は「Fargate の別ジョブ」「Cloud Run/Cloud Functions のオンデマンド」「クライアントから Firestore の集計」のいずれで行うかが未記載。負荷とレイテンシの想定に応じて1つに決め、図と短文で書くとよい。 |

### 3.3 図の表記

- アーキテクチャ図の Mermaid ブロックが **4 バッククォート** で開始されており、ER 図（3 バッククォート）と不統一。多くの Markdown では ` ```mermaid `（3つ）で統一する。
- 文末（Section 11 の後）に **余分な ` ``` `** があり、コードブロックの終端と誤解される可能性がある。削除するか、必要な閉じブロックに修正した方がよい。

---

## 4. 修正提案のまとめ

1. **Section 5**: 「Deployment / Hosting Strategy」の重複ブロックを削除する。
2. **Section 4**: Cloud Run を「optional」のままにするなら、代替経路（例: Cloud Functions → SQS）を1文で追記する。
3. **Section 8**: Dependencies の「重い処理（）」を「重い処理は AWS（SQS + Fargate）で実行する」などと完成させる。
4. **Mermaid / コードブロック**: アーキテクチャ図を ` ```mermaid `（3つ）に統一し、文末の余分な ` ``` ` を削除する。
5. **Data Design**: 「推薦は保存せず STUDY_EVENT / SAVED_CLIP から都度算出する」など、推薦の扱いを1行で追記する。
6. **要件または Section 5**: 学習フローの主シナリオ（単語指定の有無・Preference の使い方）を1〜2文で明文化する。

以上を反映すると、方向性のコンフリクトが減り、ER 図・アーキテクチャの意図が実装に伝わりやすくなります。
