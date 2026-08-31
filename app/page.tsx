import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  MessageCircle,
  ShieldCheck,
  Video,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Photos",
    description:
      "Découvre les informations personnelles qu'une simple photo peut révéler.",
    href: "/photo",
  },
  {
    icon: Video,
    title: "Vidéos",
    description:
      "Apprends à repérer les détails qui peuvent révéler ta vie privée.",
    href: "/conseils",
  },
  {
    icon: MessageCircle,
    title: "Conversations",
    description:
      "Apprends à repérer les comportements suspects et les tentatives de manipulation.",
    href: "/conversations",
  },
  {
    icon: ShieldCheck,
    title: "Vie privée",
    description:
      "Adopte les bons réflexes avant de publier ou partager quelque chose.",
    href: "/conseils",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
                <ShieldCheck size={17} />
                Apprendre à se protéger en ligne
              </div>

              <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
                INTERNET
                <br />
                <span className="text-indigo-600">
                  N'OUBLIE PAS.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
                Avant de poster. Avant d'envoyer. Avant de répondre.
                Apprends à repérer les pièges d'Internet et à mieux
                protéger ta vie privée.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-7 py-4 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-1 hover:bg-indigo-700"
                >
                  🎮 Tester mes réflexes
                  <ArrowRight size={20} />
                </Link>

                <Link
                  href="/conseils"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-7 py-4 font-bold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
                >
                  Découvrir les risques
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <Image
                src="/hero.png"
                alt="INTERNET N'OUBLIE PAS"
                width={500}
                height={500}
                className="w-full max-w-md rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <p className="font-bold text-indigo-600">
              COMPRENDRE
            </p>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Chaque détail peut compter.
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Une photo, une vidéo ou une conversation peuvent
              révéler plus d'informations que tu ne le penses.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-black">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-indigo-600">
                    Découvrir
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <div className="rounded-[2rem] bg-indigo-600 p-10 text-white md:p-16">
          <h2 className="text-3xl font-black md:text-5xl">
            Tu penses être prudent sur Internet ?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-indigo-100">
            Teste tes réflexes avec des situations inspirées
            de la vie quotidienne.
          </p>

          <Link
            href="/quiz"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-black text-indigo-700 transition hover:-translate-y-1"
          >
            Commencer le test
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}