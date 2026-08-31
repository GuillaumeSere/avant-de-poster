"use client";

import {
    AlertTriangle,
    CheckCircle2,
    ImagePlus,
    Loader2,
    Shield,
    Upload,
} from "lucide-react";

import { useEffect, useState } from "react";

interface PhotoAnalysis {
    success: boolean;
    risk: "low" | "medium" | "high" | "critical";
    level: "low" | "medium" | "high" | "critical";
    score: number;
    metadata: {
        hasGPS: boolean;
        hasDeviceInformation: boolean;
        hasDate: boolean;
    };
    detected: Array<{
        type: string;
        risk: "low" | "medium" | "high" | "critical";
        description: string;
    }>;
    advice: string[];
}

export default function PhotoAnalyzer() {
    const [file, setFile] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState<string | null>(null);

    const [analysis, setAnalysis] =
        useState<PhotoAnalysis | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    function handleFile(
        selectedFile: File | undefined
    ) {
        if (!selectedFile) return;

        setError("");
        setAnalysis(null);

        if (!selectedFile.type.startsWith("image/")) {
            setError(
                "Sélectionne uniquement une image."
            );
            return;
        }

        if (selectedFile.size > 15 * 1024 * 1024) {
            setError(
                "L'image ne doit pas dépasser 15 Mo."
            );
            return;
        }

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setFile(selectedFile);

        setPreview(
            URL.createObjectURL(selectedFile)
        );
    }

    async function analyze() {
        if (!file) return;

        setLoading(true);
        setError("");
        setAnalysis(null);

        try {
            const formData = new FormData();

            formData.append("file", file);

            const response = await fetch(
                "/api/groq/analyse",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const contentType =
                response.headers.get("content-type");

            if (!contentType?.includes("application/json")) {
                const text = await response.text();

                console.error(
                    "Réponse serveur non JSON :",
                    text
                );

                throw new Error(
                    `Le serveur a retourné une réponse inattendue (${response.status}).`
                );
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Impossible d'analyser la photo."
                );
            }

            setAnalysis(data);
        } catch (error) {
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
        },
        medium: {
            emoji: "🟠",
            title: "Reste vigilant",
        },
        high: {
            emoji: "🔴",
            title: "Attention avant de poster",
        },
        critical: {
            emoji: "🚨",
            title: "Informations sensibles détectées",
        },

    };

    return (
        <div className="space-y-8">
            {/* UPLOAD */}

            <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950">
                        <ImagePlus size={24} />
                    </div>

                    <div>
                        <h2 className="text-xl font-black">
                            Vérifie ta photo avant de la publier
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Une photo peut parfois révéler
                            beaucoup plus d'informations qu'on ne
                            le pense.
                        </p>
                    </div>
                </div>

                <label
                    htmlFor="photo"
                    className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 px-6 py-12 text-center transition hover:border-indigo-500 hover:bg-indigo-50/50 dark:border-slate-700 dark:hover:bg-indigo-950/20"
                >
                    <Upload
                        size={36}
                        className="text-indigo-600"
                    />

                    <p className="mt-4 font-black">
                        Clique pour choisir une photo
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        JPG, PNG ou WebP — 15 Mo maximum
                    </p>

                    <input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) =>
                            handleFile(
                                event.target.files?.[0]
                            )
                        }
                    />
                </label>

                {preview && (
                    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
                        <img
                            src={preview}
                            alt="Photo sélectionnée"
                            className="max-h-4xl w-full object-contain"
                        />
                    </div>
                )}

                {file && (
                    <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-900">
                        <p className="font-bold">
                            📷 {file.name}
                        </p>

                        <p className="mt-1 text-slate-500">
                            {(file.size / 1024 / 1024).toFixed(2)} Mo
                        </p>
                    </div>
                )}

                {file && (
                    <button
                        type="button"
                        onClick={analyze}
                        disabled={loading}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-black text-white transition hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    size={19}
                                    className="animate-spin"
                                />

                                Vérification...
                            </>
                        ) : (
                            <>
                                <Shield size={19} />

                                Vérifier avant de poster
                            </>
                        )}
                    </button>
                )}

                <div className="mt-5 flex gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">
                    <Shield
                        size={20}
                        className="shrink-0"
                    />

                    <p>
                        <strong>Ta photo reste privée.</strong>{" "}
                        Cette première vérification recherche
                        notamment les métadonnées de l'image.
                    </p>
                </div>

                {error && (
                    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                        {error}
                    </div>
                )}
            </section>

            {/* RESULT */}

            {analysis && (
                <section className="space-y-5">
                    <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 dark:border-slate-800 dark:bg-slate-950">
                        <div className="flex items-center gap-5">
                            <span className="text-5xl">
                                {riskConfig[analysis.level || analysis.risk]?.emoji}
                            </span>

                            <div>
                                <p className="text-sm font-black uppercase tracking-widest text-slate-500">
                                    Résultat
                                </p>

                                <h2 className="mt-1 text-3xl font-black">
                                    {riskConfig[analysis.level || analysis.risk]?.title}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col items-center justify-center rounded-3xl bg-slate-50 p-8 text-center dark:bg-slate-900">
                        <p className="text-sm font-black uppercase tracking-widest text-slate-500">
                            Score de confidentialité
                        </p>

                        <div className="mt-4 text-7xl font-black">
                            {analysis.score}
                            <span className="text-3xl text-slate-400">
                                /100
                            </span>
                        </div>

                        <p className="mt-3 max-w-lg text-sm text-slate-500">
                            Plus le score est élevé, plus ta photo
                            contient potentiellement des informations
                            que tu devrais vérifier avant de la publier.
                        </p>
                    </div>

                    {/* METADATA */}

                    <div className="grid gap-4 sm:grid-cols-3">
                        <InfoCard
                            emoji="📍"
                            title="Localisation"
                            detected={
                                analysis.metadata.hasGPS
                            }
                        />

                        <InfoCard
                            emoji="📱"
                            title="Appareil"
                            detected={
                                analysis.metadata
                                    .hasDeviceInformation
                            }
                        />

                        <InfoCard
                            emoji="📅"
                            title="Date"
                            detected={
                                analysis.metadata.hasDate
                            }
                        />
                    </div>

                    {/* RISKS */}

                    {analysis.detected.length >
                        0 && (
                            <div className="rounded-4xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-900 dark:bg-orange-950/30 sm:p-8">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle
                                        className="text-orange-600"
                                    />

                                    <h3 className="text-xl font-black">
                                        Ce qu'il faut vérifier
                                    </h3>
                                </div>

                                <div className="mt-6 space-y-4">
                                    {analysis.detected.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-3"
                                            >
                                                <AlertTriangle
                                                    size={19}
                                                    className="mt-1 shrink-0 text-orange-600"
                                                />

                                                <div>
                                                    <p className="text-sm font-bold leading-6">
                                                        {item.type}
                                                    </p>
                                                    <p className="text-sm leading-6 text-slate-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                    {/* ADVICE */}

                    <div className="rounded-4xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950/30 sm:p-8">
                        <h3 className="text-xl font-black">
                            🛡️ Avant de publier
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
                </section>
            )}
        </div>
    );
}

function InfoCard({
    emoji,
    title,
    detected,
}: {
    emoji: string;
    title: string;
    detected: boolean;
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="text-3xl">{emoji}</div>

            <h3 className="mt-4 font-black">
                {title}
            </h3>

            <p
                className={`mt-2 text-sm font-bold ${detected
                    ? "text-orange-600"
                    : "text-green-600"
                    }`}
            >
                {detected
                    ? "⚠️ Détecté"
                    : "✓ Rien détecté"}
            </p>
        </div>
    );
}