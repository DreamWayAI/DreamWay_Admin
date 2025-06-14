
import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('Очікує');

  const generate = async () => {
    setStatus('Генерується...');
    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.text);
    setStatus('Готово');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>GPT Генерація</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Введи запит..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={generate}>Згенерувати</button>
      <p><strong>Статус:</strong> {status}</p>
      <p><strong>Результат:</strong></p>
      <pre>{response}</pre>
    </div>
  );
}

export default App;
