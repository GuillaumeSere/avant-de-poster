import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Film,
  LockKeyhole,
  MessageCircle,
  ShieldAlert,
  UserRoundSearch,
} from "lucide-react";
import { quizzes } from "@/data/quizzes";
import type { QuizCategory } from "@/types";

const categories: {
  id: QuizCategory;
  title: string;
  description: string;
  icon: typeof Camera;
  emoji: string;
}[] = [
  {
    id: "photos",
    title: "Photos",
    description: "Ce que tes photos peuvent révéler.",
    icon: Camera,
    emoji: "📸",
  },
  {
    id: "videos",
    title: "Vidéos",
    description: "Les informations cachées dans tes vidéos.",
    icon: Film,
    emoji: "🎥",
  },
  {
    id: "conversations",
    title: "Conversations",
    description: "Les pièges dans les discussions en ligne.",
    icon: MessageCircle,
    emoji: "💬",
  },
  {
    id: "vie-privee",
    title: "Vie privée",
    description: "Les bons réflexes pour protéger tes informations.",
    icon: LockKeyhole,
    emoji: "🔐",
  },
  {
    id: "faux-profils",
    title: "Faux profils",
    description: "Apprends à repérer les profils suspects.",
    icon: UserRoundSearch,
    emoji: "🕵️",
  },
  {
    id: "manipulation",
    title: "Manipulation",
    description: "Reconnais les techniques utilisées pour te mettre sous pression.",
    icon: ShieldAlert,
    emoji: "⚠️",
  },
];

export default function QuizPage() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-5xl">🎮</span>

          <p className="mt-6 font-black uppercase tracking-widest text-indigo-600">
            Teste tes réflexes
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Es-tu vraiment vigilant sur Internet ?
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Choisis une catégorie et découvre comment tu réagirais
            face à des situations que tu peux rencontrer en ligne.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            const questionCount = quizzes.filter(
              (quiz) => quiz.category === category.id
            ).length;

            return (
              <Link
                key={category.id}
                href={`/quiz/${category.id}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950">
                    <Icon size={27} />
                  </div>

                  <span className="text-3xl">
                    {category.emoji}
                  </span>
                </div>

                <h2 className="mt-7 text-2xl font-black">
                  {category.title}
                </h2>

                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {questionCount} question
                    {questionCount > 1 ? "s" : ""}
                  </span>

                  <span className="flex items-center gap-2 text-sm font-black text-indigo-600">
                    Commencer
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-black">
            🛡️ Pas de jugement ici
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
            Le but n'est pas d'être parfait. Le quiz est là pour
            t'aider à reconnaître les situations à risque et
            améliorer tes réflexes.
          </p>
        </div>
      </section>
    </div>
  );
}