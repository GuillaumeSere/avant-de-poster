"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  RotateCcw,
  Shield,
  Trophy,
} from "lucide-react";

import {
  getProgress,
  resetProgress,
} from "@/lib/storage";

import type { Progress, QuizCategory } from "@/types";

const categories: {
  id: QuizCategory;
  title: string;
  emoji: string;
}[] = [
  {
    id: "photos",
    title: "Photos",
    emoji: "📸",
  },
  {
    id: "videos",
    title: "Vidéos",
    emoji: "🎥",
  },
  {
    id: "conversations",
    title: "Conversations",
    emoji: "💬",
  },
  {
    id: "vie-privee",
    title: "Vie privée",
    emoji: "🔐",
  },
  {
    id: "faux-profils",
    title: "Faux profils",
    emoji: "🕵️",
  },
  {
    id: "manipulation",
    title: "Manipulation",
    emoji: "⚠️",
  },
];

const badges = [
  {
    id: "premiers-reflexes",
    emoji: "🌱",
    title: "Premiers réflexes",
    description: "5 bonnes réponses",
  },
  {
    id: "vigilant",
    emoji: "👀",
    title: "Vigilant",
    description: "10 bonnes réponses",
  },
  {
    id: "expert-prudence",
    emoji: "🛡️",
    title: "Expert prudence",
    description: "20 bonnes réponses",
  },
  {
    id: "explorateur",
    emoji: "🧭",
    title: "Explorateur",
    description: "3 quiz terminés",
  },
  {
    id: "curieux",
    emoji: "🧠",
    title: "Curieux",
    description: "3 catégories découvertes",
  },
  {
    id: "bouclier",
    emoji: "🏆",
    title: "Bouclier",
    description: "Toutes les catégories terminées",
  },
];

export default function ProgressionPage() {
  const [progress, setProgress] =
    useState<Progress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        Chargement...
      </main>
    );
  }

  function handleReset() {
    const confirmed = window.confirm(
      "Es-tu sûr de vouloir supprimer toute ta progression ?"
    );

    if (!confirmed) return;

    resetProgress();
    setProgress(getProgress());
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20">
      <div className="max-w-3xl">
        <p className="font-black uppercase tracking-widest text-indigo-600">
          Ma progression
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Deviens plus vigilant sur Internet.
        </h1>

        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
          Ta progression est enregistrée uniquement sur ton
          appareil. Aucun compte n'est nécessaire.
        </p>
      </div>

      {/* SCORE GLOBAL */}

      <section className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-4xl bg-indigo-600 p-8 text-white shadow-xl shadow-indigo-600/20 sm:p-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-indigo-200">
                SCORE GLOBAL
              </p>

              <h2 className="mt-2 text-6xl font-black">
                {progress.totalScore}
                <span className="text-2xl text-indigo-200">
                  /100
                </span>
              </h2>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <Shield size={32} />
            </div>
          </div>

          <div className="mt-8 h-4 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{
                width: `${progress.totalScore}%`,
              }}
            />
          </div>

          <p className="mt-5 text-sm text-indigo-100">
            Continue à apprendre : les bons réflexes
            deviennent progressivement automatiques.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon="🎮"
            value={progress.quizzesCompleted}
            label="Quiz terminés"
          />

          <StatCard
            icon="✅"
            value={progress.correctAnswers}
            label="Bonnes réponses"
          />

          <StatCard
            icon="🏅"
            value={progress.badges.length}
            label="Badges"
          />

          <StatCard
            icon="📚"
            value={progress.totalAnswers}
            label="Questions"
          />
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mt-16">
        <div>
          <p className="font-black uppercase tracking-widest text-indigo-600">
            Mes réflexes
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Score par catégorie
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const data =
              progress.categories[category.id];

            return (
              <div
                key={category.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {category.emoji}
                    </span>

                    <h3 className="font-black">
                      {category.title}
                    </h3>
                  </div>

                  {data.completed && (
                    <CheckCircle2
                      size={20}
                      className="text-green-600"
                    />
                  )}
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <span className="text-3xl font-black">
                    {data.score}
                  </span>

                  <span className="text-sm text-slate-500">
                    {data.correctAnswers} bonne
                    {data.correctAnswers > 1
                      ? "s"
                      : ""}{" "}
                    réponse
                    {data.correctAnswers > 1
                      ? "s"
                      : ""}
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${data.score}%`,
                    }}
                  />
                </div>

                <Link
                  href={`/quiz/${category.id}`}
                  className="mt-5 flex items-center justify-between text-sm font-black text-indigo-600"
                >
                  {data.completed
                    ? "Rejouer"
                    : "Commencer"}

                  <ArrowRight size={17} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* BADGES */}

      <section className="mt-16">
        <div>
          <p className="font-black uppercase tracking-widest text-indigo-600">
            Récompenses
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Mes badges
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => {
            const unlocked =
              progress.badges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`rounded-3xl border p-6 transition ${
                  unlocked
                    ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/40"
                    : "border-slate-200 bg-slate-50 opacity-50 dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">
                    {badge.emoji}
                  </div>

                  <div>
                    <h3 className="font-black">
                      {badge.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {badge.description}
                    </p>
                  </div>

                  {unlocked && (
                    <Award
                      size={20}
                      className="ml-auto text-indigo-600"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}

      <section className="mt-16 rounded-4xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/40 sm:p-12">
        <Trophy
          size={42}
          className="mx-auto text-indigo-600"
        />

        <h2 className="mt-5 text-2xl font-black">
          Prêt à améliorer ton score ?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
          Chaque situation que tu comprends peut t'aider à
          prendre une meilleure décision en ligne.
        </p>

        <Link
          href="/quiz"
          className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-4 font-black text-white transition hover:bg-indigo-700"
        >
          Continuer les quiz
          <ArrowRight size={18} />
        </Link>
      </section>

      {/* RESET */}

      <div className="mt-10 text-center">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-red-600"
        >
          <RotateCcw size={15} />
          Réinitialiser ma progression
        </button>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: string;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="text-2xl">{icon}</div>

      <p className="mt-3 text-3xl font-black">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}