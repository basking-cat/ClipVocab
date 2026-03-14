import { Timestamp } from "firebase/firestore";

/**
 * USER
 */
export interface User {
  id: string; // PK
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * PREFERENCE
 * 1:1の関係なので、users/{userId}/preferences/settingsとして保存
 */
export interface Preference {
  languagePair: string; // "en-ja"
  level: string; // "beginner"
  updatedAt: Timestamp;
  topics: PreferenceTopic[];
}

export interface PreferenceTopic {
  label: string;
  weight: number;
}

/**
 * WORD
 */
export interface Word {
  id: string; // PK
  text: string;
  normalized: string;
  createdAt: Timestamp;
}

/**
 * VIDEO
 */
export interface Video {
  id: string; // YouTube videoId (PK)
  title: string;
  channelId: string;
  channelTitle: string;
  durationSec: number;
  publishedAt: Timestamp;
  language: string;
}

/**
 * CLIP
 * videos/{videoId}/clips/{clipId}のサブコレクションを想定
 */
export interface Clip {
  id: string; // PK
  videoId: string; // FK
  startSec: number;
  endSec: number;
  captionSnippetEn?: string;
  translationJa?: string;
  captionSource: string;
  createdAt: Timestamp;
  occurrences: ClipOccurrence[];
}

/**
 * CLIP OCCURRENCE
 */
export interface ClipOccurrence {
  wordId: string; // FK
  startChar: number;
  endChar: number;
  confidence?: number;
}

/**
 * SAVED_CLIP
 * users/{userId}/savedClips/{id}
 */
export interface SavedClip {
  id: string; // PK
  userId: string; // FK
  clipId: string; // FK
  wordId: string; // FK
  savedAt: Timestamp;
  tags?: string;
}

/**
 * STUDY_EVENT: for study log
 */
export interface StudyEvent {
  id: string; // PK
  userId: string; // FK
  clipId?: string; // FK (Nullable)
  wordId?: string; // FK (Nullable)
  searchSessionId?: string; // FK (Nullable)
  eventType: "view" | "review" | "skip";
  source?: string;
  watchedSec?: number;
  createdAt: Timestamp;
  // ↓↓for review↓↓
  reviewType?: string;
  prompt?: string;
  userAnswer?: string;
  aiScore?: number;
  aiFeedback?: string;
}

/**
 * SEARCH_SESSION / SEARCH_RESULT_ITEM
 */
export interface SearchSession {
  id: string; // PK
  userId: string; // FK
  queryWord?: string;
  preferenceSnapshot?: string; // JSON文字列またはPartial<Preference>
  createdAt: Timestamp;
  status: "searching" | "completed" | "failed";
  results: SearchResultItem[];
}

export interface SearchResultItem {
  clipId: string; // FK
  rank: number;
  score?: number;
  reason?: string;
}
