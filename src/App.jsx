import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const generate = async () => {
    setResponse("Генерація...");
    const res = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setResponse(data.result || "Помилка");
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>GPT Генерація</h1>
      <textarea
        rows={4}
        placeholder="Введи запит..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <br />
      <button onClick={generate}>Згенерувати</button>
      <pre>{response}</pre>
    </div>
  );
}

export default App;
