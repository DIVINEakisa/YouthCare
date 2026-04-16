import React, { useState, useEffect } from 'react';
import { cycleTrackerAPI } from '../utils/api';

export default function CycleTracker() {
  const [formData, setFormData] = useState({
    lastPeriodDate: '',
    cycleLength: 28,
  });
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  const tips = [
    { title: '💧 Hydration', content: 'Drink plenty of water to stay hydrated during your period' },
    { title: '🥗 Nutrition', content: 'Eat iron-rich foods like beans, spinach, and meat to prevent anemia' },
    { title: '🛌 Rest', content: 'Get adequate sleep and rest when you need it' },
    { title: '💪 Light Exercise', content: 'Gentle exercise like walking can help reduce cramps' },
    { title: '🧘 Stress Relief', content: 'Practice deep breathing or meditation to reduce stress' },
  ];

  useEffect(() => {
    loadCycleData();
  }, []);

  const loadCycleData = async () => {
    try {
      const response = await cycleTrackerAPI.getCycleTracker();
      if (response.data.tracker) {
        setFormData({
          lastPeriodDate: response.data.tracker.lastPeriodDate.split('T')[0],
          cycleLength: response.data.tracker.cycleLength,
        });
        setPredictions(response.data.predictions);
      }
    } catch (error) {
      console.error('Error loading cycle data:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cycleLength' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const response = await cycleTrackerAPI.updateCycleTracker(formData);
      setPredictions(response.data.predictions);
      setSuccess('Cycle data updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating cycle tracker:', error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-emerald-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading cycle tracker...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-800 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Menstrual Cycle Tracker 📅</h1>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-emerald-800 mb-4">Track Your Cycle</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Last Period Date</label>
                <input
                  type="date"
                  name="lastPeriodDate"
                  value={formData.lastPeriodDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Cycle Length (days)</label>
                <input
                  type="number"
                  name="cycleLength"
                  value={formData.cycleLength}
                  onChange={handleChange}
                  min="20"
                  max="40"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-800"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-800 text-white font-semibold py-2 rounded-lg hover:bg-emerald-900 transition disabled:bg-gray-400"
              >
                {loading ? 'Updating...' : 'Update Cycle Info'}
              </button>
            </form>
          </div>

          {/* Predictions */}
          {predictions && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-emerald-800 mb-4">Predictions</h2>
              
              <div className="space-y-3">
                <div className="border-l-4 border-emerald-800 pl-4">
                  <p className="text-gray-600 text-sm">Next Period</p>
                  <p className="text-lg font-semibold text-emerald-800">{predictions.nextPeriod}</p>
                </div>
                
                <div className="border-l-4 border-pink-500 pl-4">
                  <p className="text-gray-600 text-sm">Ovulation Day</p>
                  <p className="text-lg font-semibold text-pink-600">{predictions.ovulationDay}</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="text-gray-600 text-sm">Fertility Window</p>
                  <p className="text-lg font-semibold text-purple-600">
                    {predictions.fertilityStart} to {predictions.fertilityEnd}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Daily Tips */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">Self-Care Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <div key={index} className="border-2 border-emerald-800 rounded-lg p-4">
                <h3 className="font-semibold text-emerald-800 mb-2">{tip.title}</h3>
                <p className="text-gray-700 text-sm">{tip.content}</p>
              </div>
            ))}
          </div>

          {/* Pain Management */}
          <div className="mt-6 bg-emerald-50 rounded-lg p-4">
            <h3 className="font-semibold text-emerald-800 mb-2">💊 Pain Management</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• Use a heating pad on your abdomen or lower back</li>
              <li>• Take over-the-counter pain relief as directed</li>
              <li>• Try gentle yoga or stretching</li>
              <li>• Massage your lower abdomen gently</li>
              <li>• Limit caffeine and salt</li>
            </ul>
          </div>
        </div>

        {/* Notification */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold text-emerald-800 mb-3">📬 Notifications</h2>
          <button
            onClick={() => {
              if (predictions) {
                alert(`Reminder: Your next period is expected on ${predictions.nextPeriod}`);
              }
            }}
            className="bg-emerald-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-900 transition"
          >
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
}
