import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 3001);
app.set('trust proxy', 1);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors({ origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173'] }));
app.use(express.json({ limit: '30kb' }));

// Small in-memory per-IP throttle. Use a managed rate limiter for production scale.
const hits = new Map();
app.use('/api/', (req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  const record = hits.get(key) || { count: 0, reset: now + 60_000 };
  if (now > record.reset) { record.count = 0; record.reset = now + 60_000; }
  record.count += 1;
  hits.set(key, record);
  if (record.count > 12) return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
  next();
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'FlowPilot AI API', configured: Boolean(process.env.GROQ_API_KEY) }));

app.post('/api/assistant', async (req, res) => {
  const { task, tone = 'Professional', context = '', category = 'Customer support' } = req.body || {};
  if (typeof task !== 'string' || task.trim().length < 3) return res.status(400).json({ error: 'Please enter a task or customer message (at least 3 characters).' });
  if (task.length > 6000 || String(context).length > 3000) return res.status(413).json({ error: 'Your message is too long. Please shorten it and try again.' });
  if (!process.env.GROQ_API_KEY) return res.status(503).json({ error: 'Groq is not connected yet. Add GROQ_API_KEY to your server environment, then restart the server.' });

  const system = `You are FlowPilot AI, a careful AI work assistant built as a portfolio demonstration by Morgtech. Help with practical workflow and customer-operations tasks. Be accurate, concise, useful, and transparent about uncertainty. Never claim to have sent messages, changed records, accessed systems, or executed external actions. You only draft, analyze, classify, summarize, and recommend. Do not invent policies, prices, facts, or commitments. If information is missing, state the assumption or ask for it. For customer messages, protect privacy and avoid requesting passwords, OTPs, or full payment-card details. Return a clear answer with useful headings when appropriate.`;
  const prompt = `Task category: ${category}\nPreferred tone: ${tone}\nAdditional context: ${context || 'None provided'}\n\nUser request or customer message:\n${task.trim()}`;

  try {
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: system }, { role: 'user', content: prompt }],
        max_tokens: 900,
        temperature: 0.4
      })
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data?.error?.message || 'Groq API request failed.';
      return res.status(response.status >= 500 ? 502 : response.status).json({ error: message });
    }
    const answer = (data.choices?.[0]?.message?.content || '').trim();
    if (!answer) return res.status(502).json({ error: 'Groq returned an empty response. Please try again.' });
    res.json({ answer, model });
  } catch (error) {
    console.error('Groq request error:', error.message);
    res.status(502).json({ error: 'Could not reach Groq right now. Check your connection and try again.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, '../dist');
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}
app.listen(PORT, '0.0.0.0', () => console.log(`Morgtech server listening on port ${PORT}`));
