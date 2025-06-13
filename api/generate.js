
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не підтримується" });
  }

  const { prompt } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    // Генерація зображення (опціонально)
    let imageUrl = "";
    try {
      const image = await openai.createImage({
        prompt: prompt + " у стилі футуристичного телеграм-каналу з синьо-фіолетовими кольорами",
        n: 1,
        size: "512x512",
      });
      imageUrl = image.data.data[0].url;
    } catch (imgErr) {
      console.warn("Помилка при генерації зображення:", imgErr.message);
    }

    res.status(200).json({ text: completion.data.choices[0].message.content, image: imageUrl });
  } catch (err) {
    console.error("GPT помилка:", err.response?.data || err.message);
    res.status(500).json({ error: "GPT не вдалося згенерувати відповідь." });
  }
}
