const Chat = require('../models/Chat');
const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for health advisor
const SYSTEM_PROMPT = `You are YouthCare+, a supportive and knowledgeable health advisor for young people. Your role is to:

1. Provide clear, accurate, and age-appropriate health information
2. Focus on reproductive health, mental wellness, nutrition, and general health topics
3. Use simple language that teens can understand
4. Be empathetic and supportive in your responses
5. Always encourage seeking professional help for serious concerns
6. Respect privacy and confidentiality
7. Be non-judgmental and inclusive
8. Provide practical, actionable advice when appropriate

Important: If someone mentions thoughts of self-harm or suicide, immediately encourage them to contact emergency services or a crisis helpline.

Remember to:
- Keep responses concise but informative
- Ask clarifying questions when needed
- Provide resources or suggest professional help when appropriate`;

// Send message to AI
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.userId;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message cannot be empty' });
    }

    // Get or create chat session
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = new Chat({
        userId,
        messages: [],
      });
    }

    // Add user message
    chat.messages.push({
      role: 'user',
      content: message,
    });

    let aiResponse;

    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }

      // Call OpenAI API with conversation history
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          ...chat.messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      aiResponse = response.choices[0].message.content;
      console.log('✅ OpenAI API response received');
    } catch (openaiError) {
      console.error('❌ OpenAI API error:', openaiError.message);
      return res.status(503).json({
        message: 'AI service temporarily unavailable. Please try again later.',
        error: openaiError.message,
      });
    }

    // Add AI response to chat
    chat.messages.push({
      role: 'assistant',
      content: aiResponse,
    });

    await chat.save();

    res.json({
      message: aiResponse,
      chatHistory: chat.messages,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get chat history
const getChatHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const chat = await Chat.findOne({ userId });
    
    if (!chat) {
      return res.json({ messages: [] });
    }

    res.json({ messages: chat.messages });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
};
