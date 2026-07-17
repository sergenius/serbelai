import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5';

const SYSTEM_PROMPT = `You are SerbelAI Assistant, a professional AI consulting expert. Your purpose is to help potential clients understand our AI consulting services and capabilities.

Focus areas:
1. AI Strategy Development
2. Custom AI Solutions
3. Data Analysis & Management
4. AI Implementation
5. Natural Language Processing
6. Ethical AI & Compliance
7. Training & Support

Guidelines:
- Keep responses professional, clear, and concise
- Focus only on AI consulting and related services
- Provide specific examples of how AI can benefit different industries
- Avoid technical jargon unless specifically asked
- If asked about topics outside AI consulting, politely redirect to relevant services
- Maintain a helpful and knowledgeable tone

Remember: You represent a professional AI consulting firm. Your responses should reflect our expertise and commitment to delivering value through AI solutions.`;

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
);
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'Anthropic API key is not configured' });
      return;
    }

    const { message, messages } = req.body as {
      message?: string;
      messages?: Array<{ role: 'user' | 'assistant'; content: string }>;
    };

    const chatMessages =
      messages ??
      (message?.trim()
        ? [{ role: 'user' as const, content: message.trim() }]
        : null);

    if (!chatMessages?.length) {
      res.status(400).json({ error: 'message or messages is required' });
      return;
    }

    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: chatMessages,
      temperature: 0.7,
    });

    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('\n')
      .trim();

    res.json({ text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
