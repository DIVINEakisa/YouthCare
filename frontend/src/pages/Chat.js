import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { chatAPI } from '../utils/api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const response = await chatAPI.getChatHistory();
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setLoading(true);

    // Add user message to UI immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await chatAPI.sendMessage(userMessage);
      setMessages(response.data.chatHistory);
      
      // Extract relevant content recommendations based on message
      await fetchRecommendations(userMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async (userMessage) => {
    // Map keywords to categories
    const categoryMap = {
      'period|menstrual|menstruation|cramp|period': 'reproductive',
      'stress|anxiety|depression|mood|mental|sad|worry': 'mental',
      'nutrition|food|eat|diet|weight': 'nutrition',
      'safety|protection|safe|abuse|violence': 'safety',
      'confidence|self|body|puberty|teen|young': 'youth',
    };

    let detectedCategory = null;
    
    // Check which category the message relates to
    for (const [keywords, category] of Object.entries(categoryMap)) {
      const keywordPattern = new RegExp(keywords, 'i');
      if (keywordPattern.test(userMessage)) {
        detectedCategory = category;
        break;
      }
    }

    if (detectedCategory) {
      try {
        const response = await axios.get(
          `${API_URL}/notifications/recommendations?category=${detectedCategory}&limit=3`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );

        if (response.data.success && response.data.recommendations) {
          setRecommendations(response.data.recommendations);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setRecommendations([]);
      }
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#3f6212' }}>
        <div className="text-white text-xl">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#3f6212' }}>
      <div className="text-white p-4 shadow-lg" style={{ background: '#2d4a0e' }}>
        <h1 className="text-2xl font-bold">AI Health Advisor 💬</h1>
        <p className="text-sm" style={{ color: '#f0fde8' }}>Ask questions about your health and wellness</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center" style={{ color: '#f0fde8' }}>
              <div className="text-6xl mb-4">💬</div>
              <p className="text-lg mb-2">Welcome to YouthCare+ Chat!</p>
              <p className="text-sm max-w-md">Ask me anything about reproductive health, mental wellness, or general health questions. I'm here to help!</p>
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index}>
            <div
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-white'
                    : 'text-white'
                }`}
                style={msg.role === 'user' ? { color: '#3f6212' } : { background: '#2d4a0e' }}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>

            {/* Show recommendations after assistant message */}
            {msg.role === 'assistant' && index === messages.length - 1 && recommendations.length > 0 && (
              <div className="mt-4 ml-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#3f6212' }}>
                    💡 Related Content for You
                  </h4>
                  <div className="space-y-2">
                    {recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded border-l-4" style={{ borderColor: '#3f6212' }}>
                        <span className="text-lg mt-1">
                          {rec.type === 'video' ? '🎥' : rec.type === 'resource' ? '🔗' : '📄'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm" style={{ color: '#3f6212' }}>{rec.title}</p>
                          <p className="text-xs text-gray-600">{rec.source}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Go to Learn & Grow to explore more content</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg text-white" style={{ background: '#2d4a0e' }}>
              <p className="text-sm">Typing...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="bg-white p-4 shadow-lg m-4 rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            style={{ borderColor: 'var(--border-color)', '--border-color': '#ccc' }}
            onFocus={(e) => e.target.style.borderColor = '#3f6212'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="text-white px-6 py-2 rounded-lg font-semibold transition disabled:bg-gray-400"
            style={{ background: loading || !input.trim() ? '#ccc' : '#3f6212' }}
            onMouseEnter={(e) => !loading && input.trim() && (e.target.style.background = '#2d4a0e')}
            onMouseLeave={(e) => !loading && input.trim() && (e.target.style.background = '#3f6212')}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
