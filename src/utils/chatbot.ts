const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getChatbotResponse = async (message: string) => {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI assistant');
    }

    const data = (await response.json()) as { text?: string };
    if (!data.text) {
      throw new Error('Empty response from AI assistant');
    }

    return data.text;
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    throw new Error('Failed to get response from AI assistant');
  }
};
