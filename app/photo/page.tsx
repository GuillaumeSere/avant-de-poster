import PhotoAnalyzer from "@/components/PhotoAnalyzer";

export const metadata = {
  title: "Avant de poster une photo",
  description:
    "Découvre les informations qu'une photo peut révéler avant de la publier sur Internet.",
};

export default function PhotoPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-5xl">📸</span>

        <p className="mt-6 font-black uppercase tracking-widest text-indigo-600">
          Avant de poster
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Que révèle ta photo ?
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Une photo peut montrer ton environnement,
          ta localisation ou des informations
          personnelles sans que tu t'en rendes compte.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <PhotoAnalyzer />
      </div>
    </main>
  );
}