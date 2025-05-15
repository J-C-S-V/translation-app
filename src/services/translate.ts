import { type FromLanguage, type Language } from "../types.d";

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) {
  if (fromLanguage === toLanguage) return text;

  try {
    // Llamar a nuestra función serverless en lugar de directamente a OpenAI
    const response = await fetch("/.netlify/functions/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromLanguage,
        toLanguage,
        text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la traducción");
    }

    const data = await response.json();
    return data.translation;
  } catch (error) {
    console.error("Error de traducción:", error);
    return "Error en la traducción. Inténtalo de nuevo más tarde.";
  }
}
