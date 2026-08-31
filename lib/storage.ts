import type {
  CategoryProgress,
  Progress,
  QuizCategory,
} from "@/types";

const STORAGE_KEY = "avant-de-poster-progress";

const categoryIds: QuizCategory[] = [
  "photos",
  "videos",
  "conversations",
  "vie-privee",
  "faux-profils",
  "manipulation",
];

function createDefaultCategories(): Record<
  QuizCategory,
  CategoryProgress
> {
  return {
    photos: {
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      completed: false,
    },
    videos: {
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      completed: false,
    },
    conversations: {
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      completed: false,
    },
    "vie-privee": {
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      completed: false,
    },
    "faux-profils": {
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      completed: false,
    },
    manipulation: {
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      completed: false,
    },
  };
}

const defaultProgress: Progress = {
  totalScore: 0,
  quizzesCompleted: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  badges: [],
  categories: createDefaultCategories(),
};

export function getProgress(): Progress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultProgress;
    }

    const parsed = JSON.parse(stored);

    return {
      ...defaultProgress,
      ...parsed,
      categories: {
        ...createDefaultCategories(),
        ...(parsed.categories ?? {}),
      },
    };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: Progress) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress)
  );
}

function calculateBadges(progress: Progress): string[] {
  const badges = new Set(progress.badges);

  if (progress.correctAnswers >= 5) {
    badges.add("premiers-reflexes");
  }

  if (progress.correctAnswers >= 10) {
    badges.add("vigilant");
  }

  if (progress.correctAnswers >= 20) {
    badges.add("expert-prudence");
  }

  if (progress.quizzesCompleted >= 3) {
    badges.add("explorateur");
  }

  const completedCategories = categoryIds.filter(
    (category) =>
      progress.categories[category]?.completed
  );

  if (completedCategories.length >= 3) {
    badges.add("curieux");
  }

  if (completedCategories.length === 6) {
    badges.add("bouclier");
  }

  return Array.from(badges);
}

export function addScore(
  category: QuizCategory,
  points: number,
  correct: boolean
): Progress {
  const progress = getProgress();

  const categoryProgress =
    progress.categories[category];

  const updatedCategory: CategoryProgress = {
    ...categoryProgress,
    score: Math.min(
      100,
      categoryProgress.score + points
    ),
    correctAnswers:
      categoryProgress.correctAnswers +
      (correct ? 1 : 0),
    totalAnswers:
      categoryProgress.totalAnswers + 1,
  };

  const updated: Progress = {
    ...progress,

    totalScore: Math.min(
      100,
      progress.totalScore + points
    ),

    correctAnswers:
      progress.correctAnswers +
      (correct ? 1 : 0),

    totalAnswers:
      progress.totalAnswers + 1,

    categories: {
      ...progress.categories,
      [category]: updatedCategory,
    },
  };

  updated.badges = calculateBadges(updated);

  saveProgress(updated);

  return updated;
}

export function completeQuiz(
  category: QuizCategory
): Progress {
  const progress = getProgress();

  const updatedCategory = {
    ...progress.categories[category],
    completed: true,
  };

  const updated: Progress = {
    ...progress,

    quizzesCompleted:
      progress.quizzesCompleted + 1,

    categories: {
      ...progress.categories,
      [category]: updatedCategory,
    },
  };

  updated.badges = calculateBadges(updated);

  saveProgress(updated);

  return updated;
}

export function resetProgress() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}