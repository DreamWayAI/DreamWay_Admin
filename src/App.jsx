import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await axios.post('https://dreamway-server-production.up.railway.app/generate', { prompt });
      setResponse(res.data.text || 'No text');
      setImageUrl(res.data.image || '');
    } catch (error) {
      setResponse('Помилка генерації');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>✨ Dreamway Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Введи ідею для поста..."
        rows={4}
        style={{ width: '100%', padding: 10 }}
      />
      <button onClick={handleGenerate} style={{ marginTop: 10 }}>Згенерувати</button>
      {response && <div style={{ marginTop: 20 }}><h3>GPT Текст:</h3><p>{response}</p></div>}
      {imageUrl && <div style={{ marginTop: 20 }}><h3>AI Зображення:</h3><img src={imageUrl} alt="AI" style={{ maxWidth: '100%' }} /></div>}
    </div>
  );
}