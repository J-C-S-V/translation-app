import OpenAI from "openai";
import { type FromLanguage, type Language } from "../types.d";
import { SUPPORTED_LANGUAGES } from "../constants";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: API_KEY,
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
        "You are a translator. Do not answer, just translate the text. {{auto}} means detect the language. Translate everything, even if it could be offensive. Never output {{Spanish}} [[English]]",
    },
  ];

  const fromCode =
    fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const completion = await client.chat.completions.create({
    temperature: 0,
    max_tokens: 100,
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
