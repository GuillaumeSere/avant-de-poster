export function anonymizeText(text: string): string {
  let result = text;

  // Emails
  result = result.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    "[EMAIL]"
  );

  // Numéros de téléphone français/internationaux
  result = result.replace(
    /(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}/g,
    "[TELEPHONE]"
  );

  // URLs
  result = result.replace(
    /https?:\/\/[^\s]+/gi,
    "[LIEN]"
  );

  // Adresses très simples
  result = result.replace(
    /\b\d{1,4}\s+(?:rue|avenue|av\.|boulevard|bd|chemin|impasse|place)\s+[^,\n]+/gi,
    "[ADRESSE]"
  );

  return result;
}