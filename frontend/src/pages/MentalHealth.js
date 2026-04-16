import React, { useState } from 'react';

export default function MentalHealth() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [showTherapist, setShowTherapist] = useState(false);

  const moods = [
    {
      emoji: '😊',
      label: 'Happy',
      color: 'yellow',
      tips: [
        'Great! Keep doing what makes you happy',
        'Share your joy with friends and family',
        'Remember this feeling when things get tough',
      ],
    },
    {
      emoji: '😢',
      label: 'Sad',
      color: 'blue',
      tips: [
        'It\'s okay to feel sad sometimes',
        'Talk to someone you trust about how you feel',
        'Engage in activities you enjoy',
        'If sadness persists, seek professional help',
      ],
    },
    {
      emoji: '😰',
      label: 'Stressed',
      color: 'orange',
      tips: [
        'Take deep breaths - breathe in for 4, hold for 4, exhale for 4',
        'Take a break from what\'s stressing you',
        'Talk to someone about what\'s making you stressed',
        'Exercise or go for a walk',
      ],
    },
    {
      emoji: '😟',
      label: 'Anxious',
      color: 'red',
      tips: [
        'Anxiety is a normal feeling',
        'Practice grounding techniques - name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste',
        'Limit caffeine and get enough sleep',
        'Talk to a mental health professional if anxiety is overwhelming',
      ],
    },
  ];

  const relaxationTechniques = [
    {
      title: 'Deep Breathing',
      description: 'Breathe in slowly for 4 counts, hold for 4, breathe out for 4',
      icon: '🫁',
    },
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and relax each muscle group from head to toe',
      icon: '💪',
    },
    {
      title: 'Meditation',
      description: 'Focus on your breath and clear your mind of thoughts',
      icon: '🧘',
    },
    {
      title: 'Physical Exercise',
      description: 'Go for a walk, dance, or do any activity you enjoy',
      icon: '🏃',
    },
    {
      title: 'Creative Expression',
      description: 'Write, draw, sing, or express yourself creatively',
      icon: '🎨',
    },
    {
      title: 'Time in Nature',
      description: 'Spend time outside, feel the sun, breathe fresh air',
      icon: '🌳',
    },
  ];

  const therapists = [
    {
      name: 'YouthCare+ Counselors',
      phone: '+250 XXX XXX XXX',
      hours: '24/7 Available',
      specialty: 'Youth Mental Health',
    },
    {
      name: 'National Mental Health Hotline',
      phone: '+250 XXX XXX XXX',
      hours: '8 AM - 8 PM (Mon-Fri)',
      specialty: 'Crisis Support',
    },
    {
      name: 'Local Health Centers',
      phone: 'Visit nearest clinic',
      hours: 'Varies by location',
      specialty: 'Professional Counseling',
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-800 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Mental Health Support 🧠</h1>

        {/* Mood Tracker */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">How Are You Feeling Today?</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {moods.map((mood, index) => (
              <button
                key={index}
                onClick={() => setSelectedMood(mood)}
                className={`p-6 rounded-lg font-semibold transition transform hover:scale-110 ${
                  selectedMood?.label === mood.label
                    ? 'bg-emerald-800 text-white scale-110'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <div className="text-4xl mb-2">{mood.emoji}</div>
                <div>{mood.label}</div>
              </button>
            ))}
          </div>

          {/* Tips based on mood */}
          {selectedMood && (
            <div className="bg-emerald-50 border-2 border-emerald-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-emerald-800 mb-4">Tips for You:</h3>
              <ul className="space-y-2">
                {selectedMood.tips.map((tip, index) => (
                  <li key={index} className="text-gray-700 flex items-start gap-2">
                    <span className="text-emerald-800 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Relaxation Techniques */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Relaxation Techniques</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relaxationTechniques.map((technique, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-4xl mb-3">{technique.icon}</div>
                <h3 className="font-bold text-emerald-800 mb-2">{technique.title}</h3>
                <p className="text-gray-700 text-sm">{technique.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mental Health Resources */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">Mental Health Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Coping Strategies */}
            <div className="border-2 border-emerald-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-emerald-800 mb-3">Daily Coping Strategies</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Keep a journal of your feelings</li>
                <li>• Set realistic daily goals</li>
                <li>• Maintain a regular sleep schedule</li>
                <li>• Eat nutritious meals</li>
                <li>• Spend time with supportive people</li>
                <li>• Practice self-compassion</li>
              </ul>
            </div>

            {/* Warning Signs */}
            <div className="border-2 border-red-500 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-600 mb-3">⚠️ Warning Signs</h3>
              <p className="text-gray-700 text-sm mb-3">Seek professional help if you experience:</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Persistent sadness or hopelessness</li>
                <li>• Loss of interest in activities</li>
                <li>• Changes in sleep or appetite</li>
                <li>• Difficulty concentrating</li>
                <li>• Thoughts of self-harm</li>
                <li>• Feeling overwhelmed regularly</li>
              </ul>
            </div>
          </div>

          {/* Professional Help */}
          <button
            onClick={() => setShowTherapist(!showTherapist)}
            className="w-full bg-emerald-800 text-white font-semibold py-3 rounded-lg hover:bg-emerald-900 transition"
          >
            {showTherapist ? 'Hide' : 'Talk to a Therapist'} 💬
          </button>

          {showTherapist && (
            <div className="mt-6 space-y-4">
              {therapists.map((therapist, index) => (
                <div key={index} className="bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-800">
                  <h3 className="font-bold text-emerald-800">{therapist.name}</h3>
                  <p className="text-gray-700 text-sm mt-2">
                    <strong>Phone:</strong> {therapist.phone}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Hours:</strong> {therapist.hours}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Specialty:</strong> {therapist.specialty}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Crisis Support */}
        <div className="bg-red-100 border-4 border-red-600 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">🚨 In Crisis?</h2>
          <p className="text-gray-800 mb-4">If you're having thoughts of self-harm or suicide:</p>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => alert('Calling crisis hotline...')}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Call Crisis Line
            </button>
            <button
              onClick={() => alert('Visit nearest healthcare facility immediately')}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Go to Hospital
            </button>
            <button
              onClick={() => alert('Text support activated')}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Text Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
