export type DangerLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type QuizCategory =
  | "photos"
  | "videos"
  | "conversations"
  | "vie-privee"
  | "faux-profils"
  | "manipulation";

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  danger: DangerLevel;
}

export interface CategoryProgress {
  score: number;
  correctAnswers: number;
  totalAnswers: number;
  completed: boolean;
}

export interface Progress {
  totalScore: number;
  quizzesCompleted: number;
  correctAnswers: number;
  totalAnswers: number;
  badges: string[];
  categories: Record<QuizCategory, CategoryProgress>;
}

export interface AnalysisSignal {
  type: string;
  description: string;
}

export interface ConversationAnalysis {
  risk: DangerLevel;
  confidence: number;
  summary: string;
  signals: AnalysisSignal[];
  personalInformation: string[];
  manipulation: string[];
  advice: string[];
}

export interface PhotoDetection {
  type: string;
  risk:
    | "low"
    | "medium"
    | "high"
    | "critical";
  description: string;
}

export interface PhotoAnalysis {
  success: boolean;

  score: number;

  level:
    | "low"
    | "medium"
    | "high"
    | "critical";

  summary: string;

  detected: PhotoDetection[];

  advice: string[];

  metadata: {
    hasGPS: boolean;
    hasDeviceInformation: boolean;
    hasDate: boolean;
  };
}

export interface AnalysisSignal {
  type: string;
  level: DangerLevel;
  description: string;
}

export interface ConversationAnalysis {
  risk: DangerLevel;
  confidence: number;
  summary: string;
  signals: AnalysisSignal[];
  personalInformation: string[];
  manipulation: string[];
  advice: string[];
}