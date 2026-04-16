import React, { useState, useEffect, useRef } from 'react';
import { chatAPI } from '../utils/api';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
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

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-emerald-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-800 flex flex-col">
      <div className="bg-emerald-900 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">AI Health Advisor 💬</h1>
        <p className="text-emerald-100 text-sm">Ask questions about your health and wellness</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-emerald-100">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-lg mb-2">Welcome to YouthCare+ Chat!</p>
              <p className="text-sm max-w-md">Ask me anything about reproductive health, mental wellness, or general health questions. I'm here to help!</p>
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-white text-emerald-800'
                  : 'bg-emerald-100 text-emerald-900'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-emerald-100 text-emerald-900 px-4 py-2 rounded-lg">
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
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-800"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-emerald-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-900 transition disabled:bg-gray-400"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
