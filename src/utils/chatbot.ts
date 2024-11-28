import Anthropic from '@anthropic-ai/sdk';

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.error('Anthropic API key is missing');
}

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

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

export const getChatbotResponse = async (message: string) => {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('Anthropic API key is missing');
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }],
      system: SYSTEM_PROMPT,
      temperature: 0.7,
    });
    
    return response.content[0].text;
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    throw new Error('Failed to get response from AI assistant');
  }
};