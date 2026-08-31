export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-black">
              Avant de Poster
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Réfléchis. Protège-toi. Parle-en.
            </p>
          </div>

          <div>
            <h4 className="font-bold">Explorer</h4>

            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
              <a href="/quiz">Quiz</a>
              <a href="/photo">Photos</a>
              <a href="/analyse">Analyse IA</a>
              <a href="/conseils">Conseils</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold">À retenir</h4>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Tu as le droit de dire non, de bloquer quelqu'un
              et de demander de l'aide.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800">
          © 2026 Avant de Poster
        </div>
      </div>
    </footer>
  );
}