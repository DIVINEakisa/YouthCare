const Chat = require("../models/Chat");
const { OpenAI } = require("openai");

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

// Fallback mock responses when API is not available
const getMockAIResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();

  const responses = {
    reproductive: [
      "It's important to understand your body. Menstruation is a natural process that typically lasts 3-7 days. If you have concerns, consult a healthcare provider.",
      "Good hygiene during your period is essential. Change sanitary products regularly, wash hands before and after, and use clean water to maintain cleanliness.",
      "Period cramps can be managed with rest, warm water, light exercise, or over-the-counter pain relief. Consult a doctor if pain is severe.",
      "Understanding your cycle helps you prepare. Track your period to notice patterns and predict when it might start.",
    ],
    mental: [
      "It's okay to feel different emotions. Taking care of your mental health is as important as physical health. Consider talking to someone you trust.",
      "When stressed, try deep breathing exercises or spend time doing things you enjoy. If you're struggling, don't hesitate to seek help from a counselor.",
      "Your feelings are valid. Remember that it's normal to have ups and downs. Reach out to friends, family, or professionals when you need support.",
      "Anxiety is when you feel worried or nervous. Some anxiety is normal, but if it interferes with daily life, professional help is available.",
    ],
    general: [
      "I'm here to help with your health questions. Feel free to ask about reproductive health, mental wellness, or general health topics.",
      "Remember to take care of yourself! Eat healthy, stay hydrated, exercise regularly, and get enough sleep.",
      "Your health matters. If you have concerns that need professional attention, please visit a clinic or health center.",
      "Welcome! Ask me anything about health, wellness, nutrition, or any concerns you have.",
    ],
  };

  if (
    lowerMessage.includes("period") ||
    lowerMessage.includes("menstruat") ||
    lowerMessage.includes("cycle") ||
    lowerMessage.includes("cramp") ||
    lowerMessage.includes("period")
  ) {
    return responses.reproductive[Math.floor(Math.random() * responses.reproductive.length)];
  } else if (
    lowerMessage.includes("mental") ||
    lowerMessage.includes("stress") ||
    lowerMessage.includes("anxiety") ||
    lowerMessage.includes("sad") ||
    lowerMessage.includes("depression")
  ) {
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

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
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
      role: "user",
      content: message,
    });

    let aiResponse;
    let usingOpenAI = false;

    // Try OpenAI first if API key is available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== "") {
      try {
        // Call OpenAI API with conversation history
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            ...chat.messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          ],
          max_tokens: 500,
          temperature: 0.7,
        });

        aiResponse = response.choices[0].message.content;
        usingOpenAI = true;
        console.log("✅ OpenAI API response received");
      } catch (openaiError) {
        console.error("⚠️ OpenAI API error:", openaiError.message);
        console.log("📌 Falling back to mock responses");
        aiResponse = getMockAIResponse(message);
      }
    } else {
      // Fallback to mock responses if API key not configured
      console.log("📌 OpenAI API key not configured, using mock responses");
      aiResponse = getMockAIResponse(message);
    }

    // Add AI response to chat
    chat.messages.push({
      role: "assistant",
      content: aiResponse,
    });

    await chat.save();

    res.json({
      message: aiResponse,
      chatHistory: chat.messages,
      usingMockAI: !usingOpenAI,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
};
