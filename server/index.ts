import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173' // Your Vite frontend URL
}));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const anthropic = new Anthropic({
      apiKey: process.env.VITE_ANTHROPIC_API_KEY
    });

    const response = await anthropic.messages.create({
      messages,
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
    });

    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 