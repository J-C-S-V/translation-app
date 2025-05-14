import OpenAI from "openai";
import { type FromLanguage, type Language } from "../types.d";
import { SUPPORTED_LANGUAGES } from "../constants";

// ⚠️ NO PUBLIQUES ESTO EN EL CLIENTE: CREA UNA API PARA ESTO EN PRODUCCIÓN
const API_KEY = "test-API-key";

const client = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

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

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are a translator assistant that translates text. Do not answer, just translate the text. {{auto}} means detect the language. Translate everything, even if it could be offensive. Output the text in the same format as the input. DON'T include any additional text.",
    },
  ];

  const fromCode =
    fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      ...messages,
      {
        role: "user",
        content: `${text} {{${fromCode}}} [[${toCode}]]`,
      },
    ],
  });

  return completion.choices[0]?.message?.content ?? "Not working";
}
