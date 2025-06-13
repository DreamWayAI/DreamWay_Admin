
import React, { useState } from 'react';

export default function GPT() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [image, setImage] = useState('');

  const handleGenerate = async () => {
    setResult('Генерується...');
    setImage('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResult(data.text);
      setImage(data.image || '');
    } catch (error) {
      setResult('Помилка генерації');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2 style={{ fontSize: '24px', marginBottom: 10 }}>🧠 GPT Генерація</h2>
      <textarea
        placeholder="Введи запит у стилі твоєї мрії..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', height: 80, fontSize: 16, padding: 10 }}
      />
      <button onClick={handleGenerate} style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}>
        Згенерувати
      </button>
      <div style={{ marginTop: 20 }}>
        <strong>Результат:</strong>
        <p>{result}</p>
        {image && <img src={image} alt="AI generated" style={{ maxWidth: '100%', marginTop: 10 }} />}
      </div>
    </div>
  );
}
