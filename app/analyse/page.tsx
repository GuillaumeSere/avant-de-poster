import ConversationAnalyzer from "@/components/ConversationAnalyzer";

export const metadata = {
  title: "Analyse IA",
  description:
    "Analyse une conversation en ligne et apprends à repérer les signaux d'alerte.",
};

export default function AnalysePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-5xl">🤖</span>

        <p className="mt-6 font-black uppercase tracking-widest text-indigo-600">
          Intelligence artificielle
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Analyse une conversation
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Tu as reçu un message qui te semble bizarre ?
          Découvre quels signaux d'alerte peuvent être
          présents.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <ConversationAnalyzer />
      </div>
    </main>
  );
}