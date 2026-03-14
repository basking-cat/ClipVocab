/**
 * Data model interfaces for ClipVocab.
 *
 * These types mirror the Firestore collections defined in firestore.rules
 * and the ERD documented in docs/design.md.
 *
 * Timestamp is compatible with firebase/firestore's Timestamp and is marked
 * with a TODO for when the firebase package is added.
 */

// TODO: Replace with `import { Timestamp } from "firebase/firestore"` once the
//       firebase package is added as a dependency.
export interface Timestamp {
  readonly seconds: number;
  readonly nanoseconds: number;
  toDate(): Date;
  toMillis(): number;
}

// ---------------------------------------------------------------------------
// User
// Collection: users/{userId}
// ---------------------------------------------------------------------------

export interface User {
  /** Firebase Auth UID */
  id: string;
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ---------------------------------------------------------------------------
// Preference
// Collection: preferences/{userId}  (document ID equals userId for easy lookup)
// ---------------------------------------------------------------------------

/** Language pair in "source-target" notation, e.g. "en-ja" */
export type LanguagePair = string;

/** Proficiency level of the learner */
export type ProficiencyLevel = "beginner" | "intermediate" | "advanced";

export interface Preference {
  id: string;
  /** References users/{userId} */
  userId: string;
  languagePair: LanguagePair;
  level: ProficiencyLevel;
  updatedAt: Timestamp;
}

// ---------------------------------------------------------------------------
// PreferenceTopic
// Collection: preferences/{userId}/topics/{topicId}
// ---------------------------------------------------------------------------

export interface PreferenceTopic {
  id: string;
  /** References preferences/{preferenceId} */
  preferenceId: string;
  label: string;
  /** Relative weight used when ranking candidates; higher = more preferred */
  weight: number;
}

// ---------------------------------------------------------------------------
// Word
// Collection: words/{wordId}
// ---------------------------------------------------------------------------

export interface Word {
  id: string;
  text: string;
  /** Lower-cased, stemmed, or lemmatised form for deduplication */
  normalized: string;
  createdAt: Timestamp;
}

// ---------------------------------------------------------------------------
// Video
// Collection: videos/{videoId}
// ---------------------------------------------------------------------------

export interface Video {
  /** YouTube video ID */
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  durationSec: number;
  publishedAt: Timestamp;
  /** BCP-47 language code, e.g. "en" */
  language: string;
}

// ---------------------------------------------------------------------------
// Clip
// Collection: clips/{clipId}
// ---------------------------------------------------------------------------

/** Where the caption text was sourced from */
export type CaptionSource = "youtube_auto" | "youtube_manual" | "whisper";

export interface Clip {
  id: string;
  /** References videos/{videoId} */
  videoId: string;
  startSec: number;
  endSec: number;
  /** English caption text for the clip segment */
  captionSnippetEn?: string;
  /** Japanese translation of the caption */
  translationJa?: string;
  captionSource: CaptionSource;
  createdAt: Timestamp;
}

// ---------------------------------------------------------------------------
// ClipOccurrence
// Collection: clipOccurrences/{occurrenceId}
// ---------------------------------------------------------------------------

export interface ClipOccurrence {
  id: string;
  /** References clips/{clipId} */
  clipId: string;
  /** References words/{wordId} */
  wordId: string;
  /** Character offset (inclusive) of the word in captionSnippetEn */
  startChar: number;
  /** Character offset (exclusive) of the word in captionSnippetEn */
  endChar: number;
  /** Confidence score from the extraction model (0.0 – 1.0) */
  confidence?: number;
}

// ---------------------------------------------------------------------------
// SavedClip
// Collection: users/{userId}/savedClips/{savedClipId}
// ---------------------------------------------------------------------------

export interface SavedClip {
  id: string;
  /** References users/{userId} */
  userId: string;
  /** References clips/{clipId} */
  clipId: string;
  /** References words/{wordId} — the word the user was studying */
  wordId: string;
  savedAt: Timestamp;
  /** Comma-separated or JSON-encoded user tags */
  tags?: string;
}

// ---------------------------------------------------------------------------
// StudyEvent
// Collection: users/{userId}/studyEvents/{eventId}
// ---------------------------------------------------------------------------

/** Broad category of user action recorded as a study event */
export type StudyEventType =
  | "view"
  | "save"
  | "skip"
  | "review_start"
  | "review_submit";

/** How the event was triggered */
export type StudyEventSource = "feed" | "saved" | "review" | "recommendation";

export interface StudyEvent {
  id: string;
  /** References users/{userId} */
  userId: string;
  /** References clips/{clipId}; null if the event is not clip-related */
  clipId: string | null;
  /** References words/{wordId}; null if the event is not word-related */
  wordId: string | null;
  /** References searchSessions/{sessionId}; null if outside a search session */
  searchSessionId: string | null;
  eventType: StudyEventType;
  source?: StudyEventSource;
  /** Seconds of clip actually watched */
  watchedSec?: number;
  createdAt: Timestamp;
  // --- Review-specific fields (present when eventType is "review_submit") ---
  /** Type of review exercise (e.g. "sentence_creation") */
  reviewType?: string;
  /** Prompt shown to the user during the review */
  prompt?: string;
  /** Text entered by the user as their answer */
  userAnswer?: string;
  /** Composite AI evaluation score (0.0 – 1.0) */
  aiScore?: number;
  /** Natural-language feedback returned by the AI */
  aiFeedback?: string;
}

// ---------------------------------------------------------------------------
// SearchSession
// Collection: users/{userId}/searchSessions/{sessionId}
// ---------------------------------------------------------------------------

/** Lifecycle status of a search session */
export type SearchSessionStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "failed";

export interface SearchSession {
  id: string;
  /** References users/{userId} */
  userId: string;
  /** The vocabulary word the user searched for */
  queryWord?: string;
  /** JSON snapshot of the user's preference at search time */
  preferenceSnapshot?: string;
  createdAt: Timestamp;
  status: SearchSessionStatus;
}

// ---------------------------------------------------------------------------
// SearchResultItem
// Collection: users/{userId}/searchSessions/{sessionId}/results/{resultId}
// ---------------------------------------------------------------------------

export interface SearchResultItem {
  id: string;
  /** References searchSessions/{sessionId} */
  searchSessionId: string;
  /** References clips/{clipId} */
  clipId: string;
  /** Display order within the session's feed */
  rank: number;
  /** Relevance score assigned by the worker (0.0 – 1.0) */
  score?: number;
  /** Human-readable explanation of why this clip was selected */
  reason?: string;
}
