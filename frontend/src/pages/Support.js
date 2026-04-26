import React, { useState } from 'react';

export default function Support() {
  const [ussdSimulation, setUssdSimulation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const supportChannels = [
    {
      icon: '💬',
      title: 'USSD/Text Support',
      description: 'No internet required - works on all phones',
      feature: 'Dial *123*1#',
      details: [
        'Menu-based navigation',
        'Works offline',
        '24/7 Available',
        'Free service',
      ],
      action: 'Simulate USSD',
    },
    {
      icon: '☎️',
      title: 'Call Support',
      description: 'Speak with a health counselor',
      feature: '+250 788 XXX XXX',
      details: [
        'Live counselor',
        'Confidential',
        '8 AM - 8 PM Daily',
        'Cost: Local rate',
      ],
      action: 'Call Now',
    },
    {
      icon: '💬',
      title: 'Chat Support (App)',
      description: 'Chat with AI or human counselor',
      feature: 'In-app',
      details: [
        'Instant responses',
        '24/7 Available',
        'AI + Human support',
        'Free with app',
      ],
      action: 'Go to Chat',
    },
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Send detailed questions',
      feature: 'support@youthcare.rw',
      details: [
        'Response in 24h',
        'Detailed guidance',
        'Confidential',
        'Free',
      ],
      action: 'Send Email',
    },
  ];

  const ussdMenu = [
    {
      id: 1,
      title: 'Reproductive Health',
      subMenu: [
        { id: '1.1', label: 'Period Information' },
        { id: '1.2', label: 'Contraception' },
        { id: '1.3', label: 'STI Prevention' },
      ],
    },
    {
      id: 2,
      title: 'Mental Health',
      subMenu: [
        { id: '2.1', label: 'Stress Management' },
        { id: '2.2', label: 'Depression Support' },
        { id: '2.3', label: 'Crisis Helpline' },
      ],
    },
    {
      id: 3,
      title: 'Find Services',
      subMenu: [
        { id: '3.1', label: 'Nearby Clinics' },
        { id: '3.2', label: 'Youth Centers' },
        { id: '3.3', label: 'Counselors' },
      ],
    },
    {
      id: 4,
      title: 'Health Tips',
      subMenu: [
        { id: '4.1', label: 'Nutrition' },
        { id: '4.2', label: 'Exercise' },
        { id: '4.3', label: 'Sleep' },
      ],
    },
  ];

  const handleSimulateUSSD = () => {
    setUssdSimulation(true);
    setSelectedOption(null);
  };

  const handleBackToHome = () => {
    setUssdSimulation(false);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen p-4" style={{ background: '#3f6212' }}>
      <div className="max-w-6xl mx-auto">
        {!ussdSimulation ? (
          <>
            <h1 className="text-3xl font-bold text-white mb-2">Get Support 🆘</h1>
            <p className="text-white mb-8" style={{ color: '#d4f34d' }}>
              Choose how you want to connect with YouthCare+
            </p>

            {/* Info Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#3f6212' }}>
                Why Multiple Channels?
              </h2>
              <p className="text-gray-700 mb-4">
                We offer different ways to reach support because everyone has different needs:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span style={{ color: '#3f6212' }}>✓</span>
                  <span>
                    <strong>No internet?</strong> Use USSD - works on any phone
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#3f6212' }}>✓</span>
                  <span>
                    <strong>Want to talk?</strong> Call our counselors directly
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#3f6212' }}>✓</span>
                  <span>
                    <strong>Prefer typing?</strong> Use the app chat
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#3f6212' }}>✓</span>
                  <span>
                    <strong>Time to explain?</strong> Email us with details
                  </span>
                </li>
              </ul>
            </div>

            {/* Support Channels */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {supportChannels.map((channel, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-5xl mb-3">{channel.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#3f6212' }}>
                    {channel.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{channel.description}</p>
                  
                  <div className="bg-blue-50 rounded p-2 mb-3">
                    <p className="text-sm font-mono font-bold text-blue-900">
                      {channel.feature}
                    </p>
                  </div>

                  <ul className="space-y-1 text-sm text-gray-700 mb-4">
                    {channel.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span style={{ color: '#3f6212' }}>•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      if (channel.action === 'Simulate USSD') {
                        handleSimulateUSSD();
                      } else {
                        alert(`${channel.action} - Coming soon in full deployment`);
                      }
                    }}
                    className="w-full text-white font-semibold py-2 rounded-lg transition"
                    style={{ background: '#3f6212' }}
                    onMouseEnter={(e) => (e.target.style.background = '#2d4a0e')}
                    onMouseLeave={(e) => (e.target.style.background = '#3f6212')}
                  >
                    {channel.action}
                  </button>
                </div>
              ))}
            </div>

            {/* Emergency Info */}
            <div className="bg-red-100 border-4 border-red-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-700 mb-3">🚨 Emergency?</h2>
              <p className="text-gray-800 mb-3">
                If you're in immediate danger or having a medical emergency:
              </p>
              <div className="space-y-2">
                <p className="font-bold text-gray-800">Call: <span className="text-2xl">999</span> (Emergency)</p>
                <p className="font-bold text-gray-800">Go to: Nearest hospital</p>
              </div>
            </div>
          </>
        ) : (
          // USSD Simulator
          <div className="max-w-md mx-auto">
            <div className="bg-black rounded-3xl shadow-2xl overflow-hidden">
              {/* Phone Header */}
              <div className="bg-gray-900 text-white p-4 text-center">
                <p className="text-sm font-semibold">Dial *123*1#</p>
              </div>

              {/* Phone Screen */}
              <div className="bg-gray-800 p-6 min-h-96 flex flex-col justify-between text-white">
                {!selectedOption ? (
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-center">
                      Welcome to YouthCare+ USSD
                    </h2>
                    <p className="text-sm text-gray-300 mb-6 text-center">
                      Select an option:
                    </p>

                    <div className="space-y-2">
                      {ussdMenu.map((menu) => (
                        <button
                          key={menu.id}
                          onClick={() => setSelectedOption(menu.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded text-sm text-left font-semibold transition"
                        >
                          {menu.id}. {menu.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => setSelectedOption(null)}
                      className="text-sm text-gray-400 hover:text-white mb-4"
                    >
                      ← Back
                    </button>

                    <h3 className="text-lg font-bold mb-4">
                      {ussdMenu.find((m) => m.id === selectedOption)?.title}
                    </h3>

                    <div className="space-y-2">
                      {ussdMenu
                        .find((m) => m.id === selectedOption)
                        ?.subMenu.map((sub, i) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              alert(`Selected: ${sub.label}\n\nInformation sent to your phone.`);
                              handleBackToHome();
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded text-sm text-left font-semibold transition"
                          >
                            {sub.id}. {sub.label}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Footer */}
              <div className="bg-gray-900 text-white p-4 flex justify-between gap-2">
                <button
                  onClick={handleBackToHome}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded text-sm font-semibold transition"
                >
                  End Call
                </button>
                <button
                  onClick={handleBackToHome}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded text-sm font-semibold transition"
                >
                  Menu
                </button>
              </div>
            </div>

            <p className="text-white text-center mt-6 text-sm">
              This is a simulation. In production, this would connect to the USSD gateway.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
