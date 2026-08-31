import { NextResponse } from "next/server";
import exifr from "exifr";
import { groq } from "@/lib/groq";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "Aucune image reçue.",
        },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          error: "Le fichier doit être une image.",
        },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: "L'image ne doit pas dépasser 10 Mo.",
        },
        { status: 400 }
      );
    }

    // ------------------------------------------------
    // 1. Lecture des métadonnées EXIF
    // ------------------------------------------------

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    let metadata: any = {};

    try {
      metadata = await exifr.parse(buffer);
    } catch {
      metadata = {};
    }

    const hasGPS =
      typeof metadata?.latitude === "number" &&
      typeof metadata?.longitude === "number";

    const hasDeviceInformation =
      Boolean(
        metadata?.Make ||
          metadata?.Model
      );

    const hasDate =
      Boolean(
        metadata?.DateTimeOriginal
      );

    // ------------------------------------------------
    // 2. Conversion en base64
    // ------------------------------------------------

    const base64Image =
      buffer.toString("base64");

    const imageUrl =
      `data:${file.type};base64,${base64Image}`;

    // ------------------------------------------------
    // 3. Analyse visuelle avec Groq
    // ------------------------------------------------

    const completion =
      await groq.chat.completions.create({
       model: "qwen/qwen3.6-27b",

        temperature: 0.1,

        response_format: {
          type: "json_object",
        },

        messages: [
          {
            role: "system",
            content: `
Tu es un assistant pédagogique spécialisé dans
la protection de la vie privée des adolescents
sur Internet.

Tu analyses des photos AVANT leur publication.

Ton objectif est uniquement d'identifier les éléments
visibles pouvant révéler des informations personnelles
ou sensibles.

Tu ne dois PAS identifier les personnes présentes.

Tu ne dois PAS reconnaître leur identité.

Tu ne dois PAS deviner leur âge, leur nom,
leur adresse exacte ou leur identité.

Recherche notamment :

- plaques d'immatriculation
- adresse ou numéro de rue visible
- nom d'une école
- nom d'un établissement
- document administratif
- carte d'identité
- passeport
- billet
- ticket
- QR code
- code-barres
- écran de téléphone ou ordinateur
- numéro de téléphone
- adresse email
- compte de réseau social
- localisation reconnaissable
- panneau de rue
- uniforme scolaire
- informations professionnelles
- autres informations personnelles

IMPORTANT :

Ne recopie jamais les informations personnelles
que tu vois dans l'image.

Dis uniquement leur catégorie.

Exemple :

Correct :
"Une adresse est visible."

Incorrect :
"12 rue Victor Hugo est visible."

Le résultat doit être pédagogique,
simple et compréhensible par un adolescent.

Ne dis jamais :
"Cette personne est dangereuse."

Ne dis jamais :
"Cette personne est un prédateur."

Tu dois parler uniquement des risques liés
aux informations visibles.

Retourne UNIQUEMENT un JSON valide :

{
  "score": 0,
  "level": "low | medium | high | critical",
  "summary": "...",
  "detected": [
    {
      "type": "...",
      "risk": "low | medium | high | critical",
      "description": "..."
    }
  ],
  "advice": [
    "..."
  ]
}

Le score va de 0 à 100.

0 = aucun élément préoccupant.

100 = nombreuses informations personnelles
ou très sensibles visibles.

Le score représente le RISQUE DE CONFIDENTIALITÉ
de la photo, pas le danger représenté par une personne.
            `.trim(),
          },

          {
            role: "user",
            content: [
              {
                type: "text",
                text: `
Analyse cette photo avant publication.

Recherche uniquement les risques
liés à la vie privée.

Ne recopie aucune donnée personnelle.
                `.trim(),
              },

              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      });

    const content =
      completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error(
        "Groq n'a retourné aucun résultat."
      );
    }

    const visualAnalysis =
      JSON.parse(content);

    // ------------------------------------------------
    // 4. Ajouter les risques EXIF
    // ------------------------------------------------

    const detected = [
      ...(visualAnalysis.detected || []),
    ];

    if (hasGPS) {
      detected.push({
        type: "Localisation GPS",
        risk: "high",
        description:
          "La photo contient des coordonnées GPS dans ses métadonnées.",
      });
    }

    if (hasDeviceInformation) {
      detected.push({
        type: "Informations sur l'appareil",
        risk: "low",
        description:
          "La photo contient des informations concernant l'appareil utilisé.",
      });
    }

    if (hasDate) {
      detected.push({
        type: "Date de prise de vue",
        risk: "low",
        description:
          "La date de prise de vue est présente dans les métadonnées.",
      });
    }

    // ------------------------------------------------
    // 5. Score final
    // ------------------------------------------------

    let score =
      Number(visualAnalysis.score) || 0;

    if (hasGPS) {
      score += 25;
    }

    score = Math.min(100, score);

    let level:
      | "low"
      | "medium"
      | "high"
      | "critical";

    if (score >= 75) {
      level = "critical";
    } else if (score >= 50) {
      level = "high";
    } else if (score >= 25) {
      level = "medium";
    } else {
      level = "low";
    }

    return NextResponse.json({
      success: true,

      score,

      level,

      summary:
        visualAnalysis.summary ||
        "Quelques éléments de la photo méritent d'être vérifiés avant publication.",

      detected,

      advice: visualAnalysis.advice || [
        "Regarde attentivement l'arrière-plan.",
        "Vérifie qu'aucune information personnelle n'est visible.",
        "Pense à masquer les plaques et documents.",
        "Demande l'accord des autres personnes visibles.",
      ],

      metadata: {
        hasGPS,
        hasDeviceInformation,
        hasDate,
      },
    });
  } catch (error) {
    console.error(
      "===== PHOTO AI ERROR ====="
    );

    console.error(error);

    console.error(
      "=========================="
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible d'analyser la photo.",
      },
      {
        status: 500,
      }
    );
  }
}