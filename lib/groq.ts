import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error(
    "La variable GROQ_API_KEY est manquante."
  );
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});