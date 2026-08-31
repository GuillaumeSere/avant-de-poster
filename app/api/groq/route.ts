import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { anonymizeText } from "@/lib/anonymize";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const conversation = body.conversation;
    const anonymizedConversation =
  anonymizeText(conversation);

    if (
      typeof conversation !== "string" ||
      !conversation.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Aucune conversation n'a été fournie.",
        },
        {
          status: 400,
        }
      );
    }

    if (conversation.length > 12000) {
      return NextResponse.json(
        {
          error:
            "La conversation est trop longue.",
        },
        {
          status: 400,
        }
      );
    }

    const completion =
      await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",

        temperature: 0.2,

        response_format: {
          type: "json_object",
        },

        messages: [
          {
            role: "system",
            content: `
Tu es un assistant pédagogique spécialisé dans la sensibilisation
des jeunes aux risques liés aux conversations sur Internet.

Ton objectif est d'aider un jeune à identifier des signaux de danger
dans une conversation avec une personne inconnue.

IMPORTANT :

- Tu ne dois jamais affirmer avec certitude qu'une personne est
  dangereuse ou qu'un compte est faux.
- Tu dois parler de "signaux d'alerte", "comportements suspects"
  ou "éléments nécessitant de la prudence".
- Ne fais jamais de diagnostic psychologique.
- Ne demande jamais d'informations personnelles supplémentaires.
- Ne reproduis pas inutilement les informations privées présentes
  dans la conversation.
- Si la conversation contient un nom, numéro, adresse, école,
  localisation ou autre donnée personnelle, signale sa présence
  sans la recopier.
- Le ton doit être rassurant, simple et adapté à un adolescent.
- Ne culpabilise jamais le jeune.
- Rappelle qu'il peut arrêter la conversation, bloquer la personne,
  signaler le compte et parler à un adulte ou une personne de confiance.
- En cas de menace, chantage, demande de rencontre, demande de photos
  intimes ou autre situation potentiellement grave, recommande de
  demander rapidement l'aide d'un adulte de confiance et, si nécessaire,
  des services d'urgence ou d'aide adaptés au pays.

Tu dois répondre UNIQUEMENT avec un objet JSON valide ayant exactement
cette structure :

{
  "risk": "low | medium | high | critical",
  "confidence": <un nombre entre 0 et 100 indiquant à quel point les signaux
    détectés sont clairement présents dans le texte. IMPORTANT : ce nombre ne
    représente PAS la probabilité que la personne soit dangereuse. Il représente
    uniquement la clarté des signaux détectés dans la conversation.>,
  "summary": "résumé pédagogique très court",
  "signals": [
    {
      "type": "type du signal",
      "description": "explication simple"
    }
  ],
  "personalInformation": [
    "type d'information personnelle détectée"
  ],
  "manipulation": [
    "technique ou comportement de pression détecté"
  ],
  "advice": [
    "conseil concret"
  ]
}
            `.trim(),
          },

          {
            role: "user",
            content: `
Analyse cette conversation.

Ne révèle pas les informations personnelles présentes.
Signale uniquement leur type.

Conversation :

${anonymizedConversation}
            `.trim(),
          },
        ],
      });

    const content =
      completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        {
          error:
            "L'analyse n'a pas produit de résultat.",
        },
        {
          status: 500,
        }
      );
    }

    const analysis = JSON.parse(content);

    return NextResponse.json(analysis);
  } catch (error) {
   console.error("===== GROQ ERROR =====");
    console.error(error);
    console.error("======================");

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur inconnue avec Groq.",
      },
      {
        status: 500,
      }
    );
  }
}