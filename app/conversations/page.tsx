"use client";

import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Shield,
  Sparkles,
  XCircle,
} from "lucide-react";

import { useState } from "react";

const situations = [
  {
    id: 1,
    category: "Premier contact",
    icon: "👤",
    message:
      "Salut ! Je t'ai vu sur TikTok, tu as l'air super sympa 😊",
    question:
      "Tu ne connais pas cette personne. Que fais-tu ?",
    choices: [
      {
        text: "Je réponds et je lui donne mon prénom.",
        correct: false,
        explanation:
          "Tu n'es pas obligé de donner des informations personnelles à quelqu'un que tu ne connais pas.",
      },
      {
        text: "Je reste prudent et je ne donne aucune information personnelle.",
        correct: true,
        explanation:
          "Bonne réaction ! Tu peux discuter sans donner ton nom, ton adresse ou d'autres informations personnelles.",
      },
      {
        text: "Je lui donne directement mon numéro.",
        correct: false,
        explanation:
          "Ton numéro de téléphone est une information personnelle. Il vaut mieux ne pas le donner à un inconnu.",
      },
    ],
  },

  {
    id: 2,
    category: "Secret",
    icon: "🤫",
    message:
      "Ne dis surtout pas à tes parents qu'on parle ensemble. Ils ne comprendraient pas.",
    question:
      "Quel signal dois-tu remarquer ?",
    choices: [
      {
        text: "Aucun, c'est normal.",
        correct: false,
        explanation:
          "Demander à quelqu'un de cacher une relation à ses parents ou à un adulte de confiance est un signal auquel il faut être attentif.",
      },
      {
        text: "La personne essaie de créer un secret.",
        correct: true,
        explanation:
          "Exactement. Une personne qui insiste pour garder la conversation secrète cherche peut-être à t'isoler.",
      },
      {
        text: "C'est une preuve que cette personne est gentille.",
        correct: false,
        explanation:
          "Non. Une demande de secret ne prouve pas que quelqu'un est digne de confiance.",
      },
    ],
  },

  {
    id: 3,
    category: "Photo",
    icon: "📸",
    message:
      "Envoie-moi une photo de toi. T'inquiète, je t'enverrai la mienne après.",
    question:
      "Quelle est la meilleure réaction ?",
    choices: [
      {
        text: "J'envoie une photo pour voir la sienne.",
        correct: false,
        explanation:
          "Tu n'as aucune obligation d'envoyer une photo. Une personne peut utiliser cette promesse pour obtenir une image de toi.",
      },
      {
        text: "Je refuse et je peux bloquer la personne.",
        correct: true,
        explanation:
          "Très bonne réaction. Tu peux refuser, quitter la conversation et signaler le compte si nécessaire.",
      },
      {
        text: "Je demande d'abord son adresse.",
        correct: false,
        explanation:
          "Cela ne règle pas le problème. Le plus important est de ne pas partager tes informations ou tes images sous pression.",
      },
    ],
  },

  {
    id: 4,
    category: "Rendez-vous",
    icon: "📍",
    message:
      "On habite pas très loin. Viens me rejoindre demain, mais ne dis rien à personne.",
    question:
      "Quel est le principal problème ?",
    choices: [
      {
        text: "La personne demande un rendez-vous secret.",
        correct: true,
        explanation:
          "Exact. Un rendez-vous avec une personne connue uniquement sur Internet doit toujours être pris très au sérieux et discuté avec un adulte de confiance.",
      },
      {
        text: "Aucun problème si elle semble sympa.",
        correct: false,
        explanation:
          "Une personne rencontrée en ligne peut ne pas être celle qu'elle prétend être.",
      },
      {
        text: "Je lui donne mon adresse pour qu'elle vienne.",
        correct: false,
        explanation:
          "Ne partage jamais ton adresse avec un inconnu rencontré sur Internet.",
      },
    ],
  },
];

export default function ConversationsPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] =
    useState<number | null>(null);

  const situation = situations[current];

  const finished =
    current === situations.length - 1 &&
    selected !== null;

  function chooseAnswer(index: number) {
    if (selected !== null) return;

    setSelected(index);
  }

  function nextSituation() {
    if (current < situations.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    }
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950">
            <MessageCircle size={32} />
          </div>

          <p className="mt-6 font-black uppercase tracking-widest text-indigo-600">
            Mission conversations
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Et toi, tu ferais quoi ?
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            Sur Internet, certains messages peuvent
            sembler normaux au premier abord. À toi
            de repérer les petits signaux qui doivent
            te rendre vigilant.
          </p>
        </div>

        {/* PROGRESS */}

        <div className="mx-auto mt-10 max-w-xl">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>
              Situation {current + 1}
            </span>

            <span>
              {situations.length} situations
            </span>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{
                width: `${
                  ((current + 1) /
                    situations.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* SITUATION */}

        <section className="mx-auto mt-10 max-w-3xl">
          <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
            {/* CATEGORY */}

            <div className="border-b border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {situation.icon}
                </span>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
                    Situation
                  </p>

                  <p className="font-black">
                    {situation.category}
                  </p>
                </div>
              </div>
            </div>

            {/* CHAT */}

            <div className="p-6 sm:p-10">
              <div className="max-w-xl">
                <div className="flex items-end gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xl dark:bg-slate-800">
                    👤
                  </div>

                  <div className="rounded-3xl rounded-bl-md bg-slate-100 px-5 py-4 dark:bg-slate-800">
                    <p className="text-sm leading-6">
                      {situation.message}
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="mt-10 text-xl font-black">
                {situation.question}
              </h2>

              {/* CHOICES */}

              <div className="mt-6 space-y-3">
                {situation.choices.map(
                  (choice, index) => {
                    const isSelected =
                      selected === index;

                    const showCorrect =
                      selected !== null &&
                      choice.correct;

                    const showWrong =
                      isSelected &&
                      !choice.correct;

                    return (
                      <button
                        key={index}
                        onClick={() =>
                          chooseAnswer(index)
                        }
                        disabled={
                          selected !== null
                        }
                        className={`w-full rounded-2xl border p-5 text-left transition ${
                          showCorrect
                            ? "border-green-400 bg-green-50 dark:bg-green-950/30"
                            : showWrong
                              ? "border-red-400 bg-red-50 dark:bg-red-950/30"
                              : "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-800 dark:hover:bg-indigo-950/20"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-black">
                            {String.fromCharCode(
                              65 + index
                            )}
                          </div>

                          <p className="text-sm font-bold leading-6">
                            {choice.text}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="mt-4 border-t pt-4 text-sm leading-6">
                            {choice.correct ? (
                              <div className="flex gap-2 text-green-700 dark:text-green-400">
                                <CheckCircle2
                                  size={20}
                                  className="shrink-0"
                                />

                                <span>
                                  <strong>
                                    Bien joué !
                                  </strong>{" "}
                                  {
                                    choice.explanation
                                  }
                                </span>
                              </div>
                            ) : (
                              <div className="flex gap-2 text-red-700 dark:text-red-400">
                                <XCircle
                                  size={20}
                                  className="shrink-0"
                                />

                                <span>
                                  {
                                    choice.explanation
                                  }
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  }
                )}
              </div>

              {/* NEXT */}

              {selected !== null && (
                <div className="mt-8">
                  {current <
                  situations.length - 1 ? (
                    <button
                      onClick={
                        nextSituation
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-black text-white hover:bg-indigo-700"
                    >
                      Situation suivante
                      <ArrowRight
                        size={20}
                      />
                    </button>
                  ) : (
                    <div className="rounded-3xl bg-green-50 p-6 text-center dark:bg-green-950/30">
                      <div className="text-4xl">
                        🏆
                      </div>

                      <h3 className="mt-3 text-2xl font-black">
                        Mission terminée !
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        Tu connais maintenant
                        plusieurs signaux qui
                        doivent te rendre
                        vigilant sur Internet.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BOTTOM TIPS */}

        <section className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          <MiniTip
            icon="🔐"
            title="Ne partage pas"
            text="Adresse, téléphone, école ou mots de passe."
          />

          <MiniTip
            icon="🤫"
            title="Méfie-toi des secrets"
            text="Une personne de confiance ne devrait pas t'isoler."
          />

          <MiniTip
            icon="🆘"
            title="Parle-en"
            text="Un adulte de confiance peut t'aider."
          />
        </section>

        {/* IA */}

        <section className="mx-auto mt-10 max-w-3xl rounded-4xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/30 sm:p-8">
          <div className="flex items-start gap-4">
            <Sparkles
              className="shrink-0 text-indigo-600"
              size={24}
            />

            <div>
              <h2 className="font-black">
                Une vraie conversation te pose
                question ?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Tu peux utiliser notre analyse IA
                pour obtenir une explication plus
                détaillée d'une conversation.
              </p>

              <a
                href="/analyse"
                className="mt-4 inline-flex items-center gap-2 font-black text-indigo-600"
              >
                Analyser une conversation
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* PRIVACY */}

        <div className="mx-auto mt-8 flex max-w-3xl gap-3 rounded-2xl bg-slate-100 p-5 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400">
          <Shield
            size={20}
            className="shrink-0 text-indigo-600"
          />

          <p>
            <strong>
              Souviens-toi :
            </strong>{" "}
            tu as toujours le droit de quitter une
            conversation, de bloquer quelqu'un et
            de demander de l'aide.
          </p>
        </div>
      </div>
    </main>
  );
}

function MiniTip({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-3 font-black">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}