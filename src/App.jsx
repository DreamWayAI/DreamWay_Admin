import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;
    const res = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });
    setResponse(res.data.choices[0].message.content);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>GPT Генерація</h1>
      <textarea
        placeholder="Введи запит..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows="4"
        style={{ width: "100%" }}
      />
      <button onClick={handleGenerate}>Згенерувати</button>
      <pre>{response}</pre>
    </div>
  );
}

export default App;