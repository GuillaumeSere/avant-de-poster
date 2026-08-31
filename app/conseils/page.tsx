"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Lock,
  MessageCircle,
  Shield,
  Smartphone,
  UserRound,
  XCircle,
} from "lucide-react";

import { useState } from "react";

const conseils = [
  {
    icon: "🔐",
    title: "Protège tes informations",
    color: "indigo",
    intro:
      "Tout ce que tu publies peut donner des informations sur toi.",
    points: [
      "Ne partage jamais ton mot de passe.",
      "Évite de publier ton adresse ou ton numéro de téléphone.",
      "Fais attention au nom de ton école ou de ton lieu de travail.",
      "Vérifie les informations visibles sur tes photos.",
    ],
  },
  {
    icon: "📸",
    title: "Réfléchis avant de poster",
    color: "pink",
    intro:
      "Une photo peut révéler beaucoup plus que ce que tu imagines.",
    points: [
      "Regarde l'arrière-plan.",
      "Vérifie les plaques d'immatriculation.",
      "Fais attention aux documents visibles.",
      "Demande l'accord des personnes présentes sur la photo.",
    ],
  },
  {
    icon: "💬",
    title: "Avec les inconnus",
    color: "violet",
    intro:
      "Une personne rencontrée en ligne n'est pas forcément celle qu'elle prétend être.",
    points: [
      "Ne donne pas rapidement ta confiance.",
      "Ne partage pas d'informations personnelles.",
      "Méfie-toi des demandes de secret.",
      "Ne rencontre jamais quelqu'un rencontré en ligne sans en parler à un adulte de confiance.",
    ],
  },
  {
    icon: "📍",
    title: "Attention à ta localisation",
    color: "cyan",
    intro:
      "Ta localisation peut permettre de savoir où tu habites, où tu vas ou où tu te trouves.",
    points: [
      "Évite de publier ta position en temps réel.",
      "Vérifie les réglages de localisation de tes applications.",
      "Attention aux photos montrant ton domicile.",
      "Pense aux métadonnées de tes photos.",
    ],
  },
  {
    icon: "🎭",
    title: "Les faux profils",
    color: "orange",
    intro:
      "Un profil peut utiliser une fausse photo, un faux prénom ou une fausse histoire.",
    points: [
      "Ne considère pas une photo de profil comme une preuve d'identité.",
      "Méfie-toi des histoires qui changent.",
      "Une personne peut utiliser plusieurs comptes.",
      "En cas de doute, arrête la conversation.",
    ],
  },
  {
    icon: "🚨",
    title: "Quand quelque chose te met mal à l'aise",
    color: "red",
    intro:
      "Tu n'as jamais besoin de rester dans une conversation qui te met mal à l'aise.",
    points: [
      "Arrête de répondre.",
      "Fais des captures d'écran si nécessaire.",
      "Bloque le compte.",
      "Signale le compte à la plateforme.",
      "Parle-en à un adulte de confiance.",
    ],
  },
];

const quiz = [
  {
    question:
      "Quelqu'un que tu connais uniquement sur Internet te demande ton adresse. Que fais-tu ?",
    answers: [
      "Je lui donne parce qu'il semble gentil.",
      "Je refuse de donner mon adresse.",
      "Je lui donne celle d'un ami.",
    ],
    correct: 1,
    explanation:
      "Ton adresse est une information personnelle. Un inconnu n'a pas besoin de la connaître.",
  },
  {
    question:
      "Un inconnu te demande de garder votre conversation secrète. Que dois-tu penser ?",
    answers: [
      "C'est forcément quelqu'un de confiance.",
      "Ce n'est pas important.",
      "C'est un signal qui doit me rendre vigilant.",
    ],
    correct: 2,
    explanation:
      "Une demande de secret peut être une façon de t'isoler. Parle-en à une personne de confiance.",
  },
  {
    question:
      "Avant de publier une photo, quelle bonne habitude adopter ?",
    answers: [
      "Regarder uniquement si je suis beau/belle dessus.",
      "Vérifier ce que la photo révèle sur moi.",
      "La publier immédiatement.",
    ],
    correct: 1,
    explanation:
      "Regarde l'arrière-plan, les documents, les plaques, les lieux et les autres personnes visibles.",
  },
];

export default function ConseilsPage() {
  const [openCard, setOpenCard] =
    useState<number | null>(null);

  const [quizIndex, setQuizIndex] =
    useState(0);

  const [quizAnswer, setQuizAnswer] =
    useState<number | null>(null);

  const [score, setScore] = useState(0);

  const [quizFinished, setQuizFinished] =
    useState(false);

  const currentQuiz = quiz[quizIndex];

  function answerQuiz(index: number) {
    if (quizAnswer !== null) return;

    setQuizAnswer(index);

    if (index === currentQuiz.correct) {
      setScore((value) => value + 1);
    }
  }

  function nextQuiz() {
    if (quizIndex < quiz.length - 1) {
      setQuizIndex((value) => value + 1);
      setQuizAnswer(null);
    } else {
      setQuizFinished(true);
    }
  }

  function restartQuiz() {
    setQuizIndex(0);
    setQuizAnswer(null);
    setScore(0);
    setQuizFinished(false);
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-14 text-center text-white sm:px-10 md:py-20">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="relative">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
              <Shield size={32} />
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-indigo-300">
              Le guide des bons réflexes
            </p>

            <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Sur Internet, protège-toi
              <br />
              comme dans la vraie vie.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Quelques bonnes habitudes peuvent
              faire une grande différence. Découvre
              les réflexes à adopter quand tu postes,
              discutes ou rencontres quelqu'un en ligne.
            </p>

          </div>
        </section>

        {/* QUICK RULES */}

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <QuickRule
            icon="🤔"
            number="01"
            title="Réfléchis"
            text="Avant de publier, demande-toi ce que ta publication révèle."
          />

          <QuickRule
            icon="🔒"
            number="02"
            title="Protège"
            text="Garde tes informations personnelles pour toi."
          />

          <QuickRule
            icon="🚩"
            number="03"
            title="Repère"
            text="Apprends à reconnaître les comportements inquiétants."
          />

          <QuickRule
            icon="🆘"
            number="04"
            title="Demande de l'aide"
            text="Tu n'as pas à gérer une situation difficile seul."
          />

        </section>

        {/* CONSEILS */}

        <section className="mt-16">

          <div className="max-w-2xl">
            <p className="font-black uppercase tracking-widest text-indigo-600">
              Les essentiels
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              6 réflexes à connaître
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              Clique sur une carte pour découvrir
              les conseils.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            {conseils.map((conseil, index) => {

              const isOpen =
                openCard === index;

              return (
                <div
                  key={conseil.title}
                  className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
                >

                  <button
                    onClick={() =>
                      setOpenCard(
                        isOpen ? null : index
                      )
                    }
                    className="flex w-full items-center gap-5 p-6 text-left"
                  >

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl dark:bg-slate-900">
                      {conseil.icon}
                    </div>

                    <div className="flex-1">

                      <p className="text-xs font-black uppercase tracking-widest text-indigo-500">
                        Conseil {index + 1}
                      </p>

                      <h3 className="mt-1 text-xl font-black">
                        {conseil.title}
                      </h3>

                    </div>

                    <ChevronDown
                      size={22}
                      className={`transition-transform ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />

                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-200 px-6 pb-6 pt-5 dark:border-slate-800">

                      <p className="leading-7 text-slate-600 dark:text-slate-400">
                        {conseil.intro}
                      </p>

                      <div className="mt-5 space-y-3">

                        {conseil.points.map(
                          (point) => (
                            <div
                              key={point}
                              className="flex gap-3"
                            >
                              <CheckCircle2
                                size={19}
                                className="mt-1 shrink-0 text-green-600"
                              />

                              <p className="text-sm leading-6">
                                {point}
                              </p>
                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </section>

        {/* GOLDEN RULE */}

        <section className="mt-16 overflow-hidden rounded-[2.5rem] border border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/30">

          <div className="grid md:grid-cols-2">

            <div className="p-8 sm:p-10">

              <div className="text-5xl">
                🧠
              </div>

              <p className="mt-6 text-sm font-black uppercase tracking-widest text-indigo-600">
                La règle d'or
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Si quelque chose te semble bizarre...
              </h2>

              <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                ...tu as le droit de t'arrêter.
                Tu n'as pas besoin d'être certain que
                quelque chose est dangereux pour demander
                de l'aide.
              </p>

            </div>

            <div className="flex items-center p-8 sm:p-10">

              <div className="w-full space-y-3">

                <ActionStep
                  number="1"
                  text="Arrête la conversation"
                />

                <ActionStep
                  number="2"
                  text="Bloque ou signale le compte"
                />

                <ActionStep
                  number="3"
                  text="Garde les preuves si nécessaire"
                />

                <ActionStep
                  number="4"
                  text="Parle à une personne de confiance"
                />

              </div>

            </div>

          </div>

        </section>

        {/* QUIZ */}

        <section className="mt-16">

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
              <Smartphone size={28} />
            </div>

            <p className="mt-5 font-black uppercase tracking-widest text-indigo-600">
              Petit défi
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Est-ce que tu as les bons réflexes ?
            </h2>

          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-4xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-950 sm:p-10">

            {!quizFinished ? (

              <>
                <div className="flex items-center justify-between text-sm font-bold text-slate-500">

                  <span>
                    Question {quizIndex + 1}
                    {" / "}
                    {quiz.length}
                  </span>

                  <span>
                    Score : {score}
                  </span>

                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">

                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${
                        ((quizIndex + 1) /
                          quiz.length) *
                        100
                      }%`,
                    }}
                  />

                </div>

                <h3 className="mt-10 text-2xl font-black leading-tight">
                  {currentQuiz.question}
                </h3>

                <div className="mt-7 space-y-3">

                  {currentQuiz.answers.map(
                    (answer, index) => {

                      const selected =
                        quizAnswer === index;

                      const correct =
                        index ===
                        currentQuiz.correct;

                      let className =
                        "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-800 dark:hover:bg-indigo-950/20";

                      if (
                        quizAnswer !== null &&
                        correct
                      ) {
                        className =
                          "border-green-400 bg-green-50 dark:bg-green-950/30";
                      }

                      if (
                        selected &&
                        !correct
                      ) {
                        className =
                          "border-red-400 bg-red-50 dark:bg-red-950/30";
                      }

                      return (
                        <button
                          key={answer}
                          onClick={() =>
                            answerQuiz(index)
                          }
                          disabled={
                            quizAnswer !== null
                          }
                          className={`w-full rounded-2xl border p-5 text-left transition ${className}`}
                        >

                          <div className="flex gap-4">

                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-black">
                              {String.fromCharCode(
                                65 + index
                              )}
                            </span>

                            <span className="text-sm font-bold leading-6">
                              {answer}
                            </span>

                          </div>

                        </button>
                      );
                    }
                  )}

                </div>

                {quizAnswer !== null && (

                  <div className="mt-6">

                    <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">

                      <div className="flex gap-3">

                        {quizAnswer ===
                        currentQuiz.correct ? (
                          <CheckCircle2
                            className="shrink-0 text-green-600"
                          />
                        ) : (
                          <XCircle
                            className="shrink-0 text-red-600"
                          />
                        )}

                        <p className="text-sm leading-6">
                          {
                            currentQuiz.explanation
                          }
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={nextQuiz}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-black text-white hover:bg-indigo-700"
                    >
                      {quizIndex ===
                      quiz.length - 1
                        ? "Voir mon résultat"
                        : "Question suivante"}

                      <ArrowRight size={19} />
                    </button>

                  </div>

                )}

              </>

            ) : (

              <div className="py-8 text-center">

                <div className="text-6xl">
                  {score === quiz.length
                    ? "🏆"
                    : score >= 2
                      ? "👏"
                      : "💪"}
                </div>

                <p className="mt-6 text-sm font-black uppercase tracking-widest text-indigo-600">
                  Ton résultat
                </p>

                <h3 className="mt-2 text-4xl font-black">
                  {score} / {quiz.length}
                </h3>

                <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
                  {score === quiz.length
                    ? "Excellent ! Tu connais les principaux réflexes pour te protéger en ligne."
                    : score >= 2
                      ? "Très bien ! Tu as déjà de bons réflexes. Continue à rester vigilant."
                      : "Pas grave ! Le plus important est maintenant de connaître ces bons réflexes."}
                </p>

                <button
                  onClick={restartQuiz}
                  className="mt-7 rounded-2xl border border-slate-300 px-6 py-3 font-black hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
                >
                  Recommencer
                </button>

              </div>

            )}

          </div>

        </section>

        {/* HELP */}

        <section className="mt-16 rounded-[2.5rem] bg-slate-950 p-8 text-white sm:p-10">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <MessageCircle size={28} />
            </div>

            <h2 className="mt-5 text-3xl font-black">
              Tu as besoin d'en parler ?
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Si une situation en ligne te fait peur,
              te met mal à l'aise ou te fait subir des
              pressions, ne reste pas seul.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-bold">
                <UserRound size={18} />
                Adulte de confiance
              </div>

              <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-bold">
                <Shield size={18} />
                Plateforme de signalement
              </div>

            </div>

          </div>

        </section>

        {/* FINAL */}

        <div className="mt-10 flex items-center justify-center gap-3 text-center text-sm font-bold text-slate-500">

          <Lock size={18} />

          Tes informations personnelles
          doivent rester sous ton contrôle.

        </div>

      </div>
    </main>
  );
}

function QuickRule({
  icon,
  number,
  title,
  text,
}: {
  icon: string;
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">

      <div className="flex items-center justify-between">

        <span className="text-3xl">
          {icon}
        </span>

        <span className="text-xs font-black text-slate-300">
          {number}
        </span>

      </div>

      <h3 className="mt-5 font-black">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}

function ActionStep({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-950">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">
        {number}
      </div>

      <p className="text-sm font-bold">
        {text}
      </p>

    </div>
  );
}