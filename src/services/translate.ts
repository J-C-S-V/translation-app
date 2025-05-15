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

    const rawText = await response.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      return "Invalid server response.";
    }

    if (!response.ok) {
      throw new Error(data.error || "Translation error");
    }

    return data.translation;
  } catch (error) {
    console.error("Translation error:", error);
    return "Translation error. Please try again later.";
  }
}
