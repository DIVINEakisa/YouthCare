const Chat = require('../models/Chat');
const axios = require('axios');

// Mock AI responses for demonstration (when API key not available)
const getMockAIResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();

  const responses = {
    reproductive: [
      'It\'s important to understand your body. Menstruation is a natural process that typically lasts 3-7 days. If you have concerns, consult a healthcare provider.',
      'Good hygiene during your period is essential. Change sanitary products regularly, wash hands before and after, and use clean water to maintain cleanliness.',
      'Period cramps can be managed with rest, warm water, light exercise, or over-the-counter pain relief. Consult a doctor if pain is severe.',
    ],
    mental: [
      'It\'s okay to feel different emotions. Taking care of your mental health is as important as physical health. Consider talking to someone you trust.',
      'When stressed, try deep breathing exercises or spend time doing things you enjoy. If you\'re struggling, don\'t hesitate to seek help from a counselor.',
      'Your feelings are valid. Remember that it\'s normal to have ups and downs. Reach out to friends, family, or professionals when you need support.',
    ],
    general: [
      'I\'m here to help with your health questions. Feel free to ask about reproductive health, mental wellness, or general health topics.',
      'Remember to take care of yourself! Eat healthy, stay hydrated, exercise regularly, and get enough sleep.',
      'Your health matters. If you have concerns that need professional attention, please visit a clinic or health center.',
    ],
  };

  if (lowerMessage.includes('period') || lowerMessage.includes('menstruat') || lowerMessage.includes('cycle')) {
    return responses.reproductive[Math.floor(Math.random() * responses.reproductive.length)];
  } else if (lowerMessage.includes('mental') || lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('sad')) {
    return responses.mental[Math.floor(Math.random() * responses.mental.length)];
  } else {
    return responses.general[Math.floor(Math.random() * responses.general.length)];
  }
};

// Send message to AI
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.userId;

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

    // Get AI response
    let aiResponse;
    
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a supportive health advisor for youth. Provide simple, clear answers about reproductive health, mental health, and wellness. Always encourage seeking professional help for serious concerns.',
              },
              ...chat.messages.map(msg => ({
                role: msg.role,
                content: msg.content,
              })),
            ],
            max_tokens: 150,
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        aiResponse = response.data.choices[0].message.content;
      } catch (error) {
        console.log('OpenAI API error, using mock response');
        aiResponse = getMockAIResponse(message);
      }
    } else {
      aiResponse = getMockAIResponse(message);
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
