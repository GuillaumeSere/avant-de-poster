"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { addScore, completeQuiz } from "@/lib/storage";
import type { QuizCategory, QuizQuestion } from "@/types";

interface QuizGameProps {
    category: QuizCategory;
    title: string;
    questions: QuizQuestion[];
}

export default function QuizGame({
    category,
    title,
    questions,
}: QuizGameProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
        null
    );
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [finished, setFinished] = useState(false);

    const question = questions[currentQuestion];

    useEffect(() => {
        setSelectedAnswer(null);
    }, [currentQuestion]);

    function handleAnswer(answerIndex: number) {
        if (selectedAnswer !== null) return;

        const correct = answerIndex === question.correctAnswer;

        setSelectedAnswer(answerIndex);

        if (correct) {
            setScore((value) => value + question.points);
            setCorrectAnswers((value) => value + 1);
        }

        addScore(
            category,
            correct ? question.points : 0,
            correct
        );
    }

    function nextQuestion() {
        if (currentQuestion === questions.length - 1) {
            completeQuiz(category);
            setFinished(true);
            return;
        }

        setCurrentQuestion((value) => value + 1);
    }

    function restart() {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setCorrectAnswers(0);
        setFinished(false);
    }

    if (finished) {
        const percentage = Math.round(
            (correctAnswers / questions.length) * 100
        );

        let level = "À améliorer";
        let emoji = "🟠";

        if (percentage >= 85) {
            level = "Excellent réflexe";
            emoji = "🛡️";
        } else if (percentage >= 70) {
            level = "Bon réflexe";
            emoji = "🟢";
        } else if (percentage >= 50) {
            level = "Bon début";
            emoji = "🟡";
        } else {
            level = "Il faut rester vigilant";
            emoji = "⚠️";
        }

        return (
            <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
                <div className="rounded-4xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-6xl">{emoji}</div>

                    <p className="mt-6 font-black uppercase tracking-widest text-indigo-600">
                        Quiz terminé
                    </p>

                    <h1 className="mt-3 text-4xl font-black">
                        {level}
                    </h1>

                    <div className="mx-auto mt-10 flex h-40 w-40 items-center justify-center rounded-full border-8 border-indigo-600">
                        <div>
                            <div className="text-4xl font-black">
                                {percentage}%
                            </div>

                            <div className="text-sm text-slate-500">
                                {correctAnswers}/{questions.length}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                        <p className="text-sm text-slate-500">
                            Points gagnés
                        </p>

                        <p className="mt-1 text-3xl font-black text-indigo-600">
                            +{score}
                        </p>
                    </div>

                    <p className="mt-8 leading-7 text-slate-600 dark:text-slate-400">
                        Le but n'est pas d'être parfait. Chaque question
                        est une occasion de comprendre les risques et
                        d'améliorer tes réflexes.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={restart}
                            className="flex-1 rounded-2xl bg-indigo-600 px-6 py-4 font-black text-white transition hover:bg-indigo-700"
                        >
                            Recommencer
                        </button>

                        <Link
                            href="/quiz"
                            className="flex-1 rounded-2xl border border-slate-300 px-6 py-4 font-black transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
                        >
                            Autres quiz
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-16">
            <Link
                href="/quiz"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-indigo-600"
            >
                <ArrowLeft size={17} />
                Tous les quiz
            </Link>

            <div className="mt-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-indigo-600">
                            Quiz {title}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Question {currentQuestion + 1} sur{" "}
                            {questions.length}
                        </p>
                    </div>

                    <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-black text-indigo-600 dark:bg-indigo-950">
                        {score} pts
                    </div>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                        className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="mt-8 rounded-4xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase dark:bg-slate-900">
                        {question.category}
                    </span>

                    <span className="text-sm font-bold text-slate-500">
                        +{question.points} points
                    </span>
                </div>

                <h1 className="mt-8 text-2xl font-black leading-tight sm:text-3xl">
                    {question.question}
                </h1>

                <div className="mt-8 space-y-3">
                    {question.answers.map((answer, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect =
                            index === question.correctAnswer;

                        let className =
                            "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-800 dark:hover:bg-indigo-950/40";

                        if (selectedAnswer !== null) {
                            if (isCorrect) {
                                className =
                                    "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-950/30";
                            } else if (isSelected) {
                                className =
                                    "border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-950/30";
                            } else {
                                className =
                                    "border-slate-200 opacity-60 dark:border-slate-800";
                            }
                        }

                        return (
                            <button
                                key={answer}
                                type="button"
                                disabled={selectedAnswer !== null}
                                onClick={() => handleAnswer(index)}
                                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${className}`}
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-black dark:bg-slate-900">
                                    {String.fromCharCode(65 + index)}
                                </span>

                                <span className="flex-1 font-semibold">
                                    {answer}
                                </span>

                                {selectedAnswer !== null && isCorrect && (
                                    <Check
                                        size={21}
                                        className="text-green-600"
                                    />
                                )}

                                {selectedAnswer !== null &&
                                    isSelected &&
                                    !isCorrect && (
                                        <X
                                            size={21}
                                            className="text-red-600"
                                        />
                                    )}
                            </button>
                        );
                    })}
                </div>

                {selectedAnswer !== null && (
                    <div
                        className={`mt-6 rounded-2xl p-5 ${selectedAnswer === question.correctAnswer
                            ? "bg-green-50 dark:bg-green-950/30"
                            : "bg-orange-50 dark:bg-orange-950/30"
                            }`}
                    >
                        <div className="font-black">
                            {selectedAnswer === question.correctAnswer
                                ? "✅ BON RÉFLEXE !"
                                : "⚠️ ATTENTION !"}
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                            {question.explanation}
                        </p>
                    </div>
                )}

                {selectedAnswer !== null && (
                    <button
                        type="button"
                        onClick={nextQuestion}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-black text-white transition hover:bg-indigo-700"
                    >
                        {currentQuestion === questions.length - 1
                            ? "Voir mon résultat"
                            : "Question suivante"}

                        <ArrowRight size={19} />
                    </button>
                )}
            </div>
        </main>
    );
}