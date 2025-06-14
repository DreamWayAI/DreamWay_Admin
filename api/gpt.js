
export default async function handler(req, res) {
  const { prompt } = await req.json();
  const key = process.env.OPENAI_API_KEY;
  const completion = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await completion.json();
  return new Response(JSON.stringify({ text: data.choices?.[0]?.message?.content || "Немає відповіді" }), {
    headers: { "Content-Type": "application/json" }
  });
}
