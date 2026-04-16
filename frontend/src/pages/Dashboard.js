import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'AI Chatbot', path: '/chat', icon: '💬' },
    { name: 'Educational Content', path: '/education', icon: '📚' },
    { name: 'Mental Health', path: '/mental-health', icon: '🧠' },
    { name: 'Clinic Finder', path: '/clinics', icon: '🏥' },
    { name: 'Youth Centers', path: '/youth-centers', icon: '👥' },
    { name: 'Device Info', path: '/device-info', icon: '⚙️' },
  ];

  // Add cycle tracker for female users
  if (user?.gender === 'Female') {
    menuItems.splice(1, 0, { name: 'Cycle Tracker', path: '/cycle-tracker', icon: '📅' });
  }

  return (
    <div className="min-h-screen bg-emerald-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user?.name}! 👋</h1>
          <p className="text-emerald-100">Your health, your wellness, your journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-left"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold text-emerald-800">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-2">Access {item.name.toLowerCase()}</p>
            </button>
          ))}
        </div>

        {/* USSD and Call Support Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">Access YouthCare+ Anywhere</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-emerald-800 rounded-lg p-6">
              <div className="text-3xl mb-3">☎️</div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">Call Support</h3>
              <p className="text-gray-700 mb-3">Dial: <strong>+250 XXX XXX XXX</strong></p>
              <p className="text-gray-600 text-sm">Available 24/7 for health support and guidance</p>
            </div>
            <div className="border-2 border-emerald-800 rounded-lg p-6">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">USSD Access</h3>
              <p className="text-gray-700 mb-3">Dial: <strong>*123#</strong></p>
              <p className="text-gray-600 text-sm">Access basic features without internet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
