"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Shield,
  UserRound,
} from "lucide-react";

import { useState } from "react";

interface AnalysisSignal {
  type: string;
  level:
    | "low"
    | "medium"
    | "high"
    | "critical";
  description: string;
}

interface ConversationAnalysis {
  risk:
    | "low"
    | "medium"
    | "high"
    | "critical";

  confidence: number;

  summary: string;

  signals: AnalysisSignal[];

  personalInformation: string[];

  manipulation: string[];

  advice: string[];
}

export default function ConversationAnalyzer() {
  const [conversation, setConversation] =
    useState("");

  const [analysis, setAnalysis] =
    useState<ConversationAnalysis | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function analyzeConversation() {
    if (!conversation.trim()) {
      setError(
        "Colle d'abord une conversation à analyser."
      );

      return;
    }

    if (conversation.trim().length < 20) {
      setError(
        "La conversation est trop courte pour être analysée."
      );

      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch(
        "/api/groq",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            conversation,
          }),
        }
      );

      const contentType =
        response.headers.get(
          "content-type"
        );

      if (
        !contentType?.includes(
          "application/json"
        )
      ) {
        const text =
          await response.text();

        console.error(
          "Réponse serveur non JSON :",
          text
        );

        throw new Error(
          `Le serveur a retourné une réponse inattendue (${response.status}).`
        );
      }

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Impossible d'analyser la conversation."
        );
      }

      setAnalysis(data);
    } catch (error) {
      console.error(
        "Erreur analyse conversation :",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  const riskConfig = {
    low: {
      emoji: "🟢",
      title: "Plutôt rassurant",
      description:
        "Peu de signaux préoccupants ont été détectés.",
    },

    medium: {
      emoji: "🟠",
      title: "Reste vigilant",
      description:
        "Quelques éléments méritent ton attention.",
    },

    high: {
      emoji: "🔴",
      title: "Attention",
      description:
        "Plusieurs signaux nécessitent de la prudence.",
    },

    critical: {
      emoji: "🚨",
      title: "Très préoccupant",
      description:
        "Cette conversation présente plusieurs signaux importants.",
    },
  };

  return (
    <div className="space-y-8">
      {/* INTRODUCTION */}

      <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950">
            <MessageCircle size={24} />
          </div>

          <div>
            <h2 className="text-xl font-black">
              Une conversation te paraît bizarre ?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tu peux la copier ici pour découvrir
              les signaux auxquels tu devrais faire
              attention.
            </p>
          </div>
        </div>

        {/* TEXTAREA */}

        <textarea
          value={conversation}
          onChange={(event) =>
            setConversation(
              event.target.value
            )
          }
          placeholder={`Exemple :

Inconnu : Salut, tu as quel âge ?

Moi : 15 ans

Inconnu : Tu habites où ?

Moi : Pourquoi ?

Inconnu : C'est juste pour faire connaissance. Tu peux me faire confiance.`}
          rows={14}
          className="mt-8 w-full resize-none rounded-3xl border border-slate-300 bg-slate-50 p-5 text-sm leading-7 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900"
        />

        {/* PRIVACY */}

        <div className="mt-5 flex gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">
          <Shield
            size={20}
            className="shrink-0"
          />

          <p>
            <strong>
              Protège ta vie privée.
            </strong>{" "}
            Avant l'analyse, certaines informations
            comme les emails, téléphones, adresses
            et liens sont automatiquement masquées.
          </p>
        </div>

        {/* BUTTON */}

        <button
          type="button"
          onClick={analyzeConversation}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-black text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />

              Analyse en cours...
            </>
          ) : (
            <>
              <Shield size={20} />

              Analyser la conversation
            </>
          )}
        </button>

        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}
      </section>

      {/* RESULT */}

      {analysis && (
        <section className="space-y-5">
          {/* SCORE */}

          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 dark:border-slate-800 dark:bg-slate-950">
            <div className="text-center">
              <span className="text-6xl">
                {
                  riskConfig[
                    analysis.risk
                  ].emoji
                }
              </span>

              <p className="mt-5 text-sm font-black uppercase tracking-widest text-slate-500">
                Résultat de l'analyse
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {
                  riskConfig[
                    analysis.risk
                  ].title
                }
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                {
                  riskConfig[
                    analysis.risk
                  ].description
                }
              </p>

              <div className="mt-8">
                <div className="text-6xl font-black">
                  {analysis.confidence}
                  <span className="text-2xl text-slate-400">
                    /100
                  </span>
                </div>

                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Clarté des signaux détectés
                </p>
              </div>
            </div>
          </div>

          {/* SUMMARY */}

          <div className="rounded-4xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/30 sm:p-8">
            <h3 className="text-xl font-black">
              🧠 Ce qu'il faut comprendre
            </h3>

            <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
              {analysis.summary}
            </p>
          </div>

          {/* SIGNALS */}

          {analysis.signals.length > 0 && (
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-950 sm:p-8">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-orange-600" />

                <h3 className="text-xl font-black">
                  🚩 Signaux à surveiller
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                {analysis.signals.map(
                  (signal, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-black">
                          {signal.type}
                        </p>

                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">
                          {signal.level ===
                          "critical"
                            ? "CRITIQUE"
                            : signal.level ===
                                "high"
                              ? "ÉLEVÉ"
                              : signal.level ===
                                  "medium"
                                ? "MOYEN"
                                : "FAIBLE"}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {signal.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* PERSONAL INFORMATION */}

          {analysis.personalInformation
            .length > 0 && (
            <div className="rounded-4xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30 sm:p-8">
              <h3 className="text-xl font-black">
                🔐 Informations personnelles
              </h3>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Voici les catégories
                d'informations personnelles que la
                personne semble chercher à obtenir.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {analysis.personalInformation.map(
                  (item, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm dark:bg-slate-950"
                    >
                      🔒 {item}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {/* MANIPULATION */}

          {analysis.manipulation.length > 0 && (
            <div className="rounded-4xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-900 dark:bg-orange-950/30 sm:p-8">
              <h3 className="text-xl font-black">
                🎭 Techniques de manipulation
              </h3>

              <div className="mt-5 space-y-3">
                {analysis.manipulation.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <AlertTriangle
                        size={19}
                        className="mt-1 shrink-0 text-orange-600"
                      />

                      <p className="text-sm leading-6">
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* ADVICE */}

          <div className="rounded-4xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950/30 sm:p-8">
            <h3 className="text-xl font-black">
              🛡️ Que faire ?
            </h3>

            <div className="mt-6 space-y-4">
              {analysis.advice.map(
                (advice, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <p className="text-sm leading-6">
                      {advice}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* FINAL MESSAGE */}

          <div className="rounded-4xl bg-slate-950 p-8 text-center text-white">
            <UserRound
              size={32}
              className="mx-auto"
            />

            <h3 className="mt-4 text-2xl font-black">
              Tu as un doute ?
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
              Tu n'es jamais obligé de répondre à
              quelqu'un qui te met mal à l'aise.
              Parle-en à un adulte ou à une personne
              de confiance.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}