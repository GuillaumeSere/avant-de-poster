import { notFound } from "next/navigation";
import { quizzes } from "@/data/quizzes";
import QuizGame from "@/components/QuizGame";
import type { QuizCategory } from "@/types";

const validCategories: QuizCategory[] = [
  "photos",
  "videos",
  "conversations",
  "vie-privee",
  "faux-profils",
  "manipulation",
];

const categoryNames: Record<QuizCategory, string> = {
  photos: "Photos",
  videos: "Vidéos",
  conversations: "Conversations",
  "vie-privee": "Vie privée",
  "faux-profils": "Faux profils",
  manipulation: "Manipulation",
};

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  if (!validCategories.includes(category as QuizCategory)) {
    notFound();
  }

  const categoryQuizzes = quizzes.filter(
    (quiz) => quiz.category === category
  );

  if (categoryQuizzes.length === 0) {
    notFound();
  }

  return (
    <QuizGame
      category={category as QuizCategory}
      title={categoryNames[category as QuizCategory]}
      questions={categoryQuizzes}
    />
  );
}