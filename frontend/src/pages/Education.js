import React, { useState } from 'react';

export default function Education() {
  const [selectedCategory, setSelectedCategory] = useState('reproductive');

  const content = {
    reproductive: {
      title: 'Reproductive Health',
      articles: [
        {
          title: 'Understanding Your Period',
          content: 'Menstruation is a natural monthly cycle where the uterus sheds its lining. It typically lasts 3-7 days and occurs about every 28 days. If your flow is very heavy or cycle is irregular, consult a healthcare provider.',
          icon: '📖',
        },
        {
          title: 'Contraception Methods',
          content: 'There are many contraception methods available including pills, condoms, and IUDs. Each has different effectiveness rates and benefits. Talk to a healthcare provider to find the best option for you.',
          icon: '💊',
        },
        {
          title: 'STI Prevention',
          content: 'Sexually transmitted infections can be prevented through safe sex practices like using condoms, regular testing, and having open conversations with partners.',
          icon: '🛡️',
        },
        {
          title: 'Puberty Changes',
          content: 'Puberty brings physical and emotional changes. Body hair, breast development, and mood swings are normal. These changes happen at different ages for everyone.',
          icon: '🌱',
        },
      ],
      videos: [
        { title: 'Puberty 101', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        { title: 'Reproductive Health Basics', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      ],
    },
    mental: {
      title: 'Mental Health',
      articles: [
        {
          title: 'Managing Stress',
          content: 'Stress is a normal part of life, but managing it is important. Try deep breathing, exercise, talking to friends, or meditation. If stress feels overwhelming, reach out to a counselor.',
          icon: '😌',
        },
        {
          title: 'Understanding Anxiety',
          content: 'Anxiety is when you feel worried or nervous. Some anxiety is normal, but if it interferes with daily life, professional help is available.',
          icon: '😟',
        },
        {
          title: 'Depression Support',
          content: 'Depression is a serious condition that affects mood and energy. If you\'re feeling sad or hopeless for weeks, please talk to a healthcare provider or counselor.',
          icon: '💙',
        },
        {
          title: 'Self-Care Tips',
          content: 'Take care of yourself by sleeping well, eating healthy, exercising, spending time with friends, and doing activities you enjoy.',
          icon: '🌟',
        },
      ],
      videos: [
        { title: 'Coping with Anxiety', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        { title: 'Mental Wellness Tips', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      ],
    },
    youth: {
      title: 'Youth Education',
      articles: [
        {
          title: 'Healthy Relationships',
          content: 'Healthy relationships are built on respect, trust, and communication. Take time to know yourself and maintain your independence.',
          icon: '💝',
        },
        {
          title: 'Digital Safety',
          content: 'Stay safe online by protecting your privacy, being careful with personal information, and reporting harmful content.',
          icon: '🔒',
        },
        {
          title: 'Decision Making',
          content: 'Make good decisions by thinking about consequences, seeking advice when needed, and trusting your instincts.',
          icon: '⚖️',
        },
        {
          title: 'Nutrition and Fitness',
          content: 'Eat a balanced diet, stay hydrated, and exercise regularly. These habits support physical and mental health.',
          icon: '🥗',
        },
      ],
      videos: [
        { title: 'Teen Wellness', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        { title: 'Life Skills for Youth', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      ],
    },
  };

  const current = content[selectedCategory];

  return (
    <div className="min-h-screen bg-emerald-800 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Educational Content 📚</h1>

        {/* Category Selector */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {Object.entries(content).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selectedCategory === key
                  ? 'bg-white text-emerald-800'
                  : 'bg-emerald-700 text-white hover:bg-emerald-600'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Articles */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Articles</h2>
            <div className="space-y-4">
              {current.articles.map((article, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{article.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-emerald-800 mb-2">{article.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{article.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Videos</h2>
            <div className="space-y-4">
              {current.videos.map((video, index) => (
                <a
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-lg p-4 block hover:shadow-xl transition"
                >
                  <div className="text-2xl mb-2">🎥</div>
                  <h3 className="font-semibold text-emerald-800">{video.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">Click to watch on YouTube</p>
                </a>
              ))}
            </div>

            {/* Quick Facts */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-emerald-800 mb-3">💡 Did You Know?</h3>
              <div className="space-y-2 text-sm text-gray-700">
                {selectedCategory === 'reproductive' && (
                  <>
                    <p>• The average menstrual cycle is 28 days</p>
                    <p>• Periods can last 3-7 days</p>
                    <p>• Hormones affect your mood and energy</p>
                  </>
                )}
                {selectedCategory === 'mental' && (
                  <>
                    <p>• Mental health is as important as physical health</p>
                    <p>• Everyone feels anxious sometimes</p>
                    <p>• Talking helps - reach out to someone you trust</p>
                  </>
                )}
                {selectedCategory === 'youth' && (
                  <>
                    <p>• Your brain is still developing until age 25</p>
                    <p>• Healthy habits now build a better future</p>
                    <p>• It's okay to ask for help when you need it</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
