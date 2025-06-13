import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const generate = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    setResponse(data.result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>GPT Генерація</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Введи запит..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <br />
      <button onClick={generate}>Згенерувати</button>
      <pre>{response}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);