const Chat = require("../models/Chat");
const { OpenAI } = require("openai");

// OpenAI init
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt
const SYSTEM_PROMPT = `You are YouthCare+, a supportive health assistant for young people.

Rules:
- Be simple and clear
- Focus on reproductive, mental, and general health
- Be supportive and non-judgmental
- Encourage professional help when needed
- Do not give harmful advice`;

// Mock fallback
const getMockAIResponse = (message) => {
  const lower = message.toLowerCase();

  if (/period|cycle|cramp|menstruat/.test(lower)) {
    return "Period pain can be managed with rest, warm compress, and hydration. If it's severe, consult a healthcare provider.";
  }

  if (/stress|anxiety|sad|depress/.test(lower)) {
    return "It's okay to feel this way. Try talking to someone you trust or doing something relaxing. Support is always available.";
  }

  return "I'm here to help with your health questions. Ask me anything 😊";
};

// Controller: Send message
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.userId;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    const sanitizedMessage = message.trim().slice(0, 1000);

    // Safety check
    if (/suicide|self-harm|kill myself/i.test(sanitizedMessage)) {
      return res.json({
        message:
          "I'm really sorry you're feeling this way. Please reach out to someone you trust or a professional immediately. You're not alone.",
        usingMockAI: true,
      });
    }

    // Get or create chat
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = new Chat({ userId, messages: [] });
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: sanitizedMessage,
      createdAt: new Date(),
    });

    // Limit history
    const recentMessages = chat.messages.slice(-10);

    let aiResponse = "";
    let usingOpenAI = false;

    // Check API key
    if (
      process.env.OPENAI_API_KEY &&
      process.env.OPENAI_API_KEY.trim() !== ""
    ) {
      try {
        console.log("🤖 Calling OpenAI...");

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            ...recentMessages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          ],
        });

        console.log("RAW OPENAI RESPONSE:", JSON.stringify(response, null, 2));

        // ✅ SAFE EXTRACTION
        aiResponse = response.choices[0]?.message?.content ||
          "Sorry, I couldn't respond properly.";

        usingOpenAI = true;

        console.log("✅ OpenAI response success");
      } catch (err) {
        console.error("⚠️ OpenAI error:", err.message);
        aiResponse = getMockAIResponse(sanitizedMessage);
      }
    } else {
      console.log("📌 No API key, using mock AI");
      aiResponse = getMockAIResponse(sanitizedMessage);
    }

    // Save assistant message
    chat.messages.push({
      role: "assistant",
      content: aiResponse,
      createdAt: new Date(),
    });

    await chat.save();

    res.json({
      reply: aiResponse,
      message: aiResponse,
      chatHistory: chat.messages,
      usingMockAI: !usingOpenAI,
    });
  } catch (error) {
    console.error("❌ Chat error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
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
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
};
