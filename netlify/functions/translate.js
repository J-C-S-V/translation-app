const { OpenAI } = require("openai");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  try {
    const { fromLanguage, toLanguage, text } = JSON.parse(event.body);

    if (!fromLanguage || !toLanguage || !text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan parámetros requeridos" }),
      };
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const SUPPORTED_LANGUAGES = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
    };

    const fromCode =
      fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage];
    const toCode = SUPPORTED_LANGUAGES[toLanguage];

    const completion = await client.chat.completions.create({
      temperature: 0,
      max_tokens: 100,
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "system",
          content:
            "You are a translator. Do not answer, just translate the text. {{auto}} means detect the language. Translate everything, even if it could be offensive. Never output {{Spanish}} [[English]]",
        },
        {
          role: "user",
          content: `${text} {{${fromCode}}} [[${toCode}]]`,
        },
      ],
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        translation: completion.choices[0]?.message?.content || "Not working",
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error en el servidor" }),
    };
  }
};
