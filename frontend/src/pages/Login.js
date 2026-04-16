import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#3f6212' }}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#3f6212' }}>YouthCare+</h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              style={{ borderColor: 'var(--border-color)', '--border-color': '#ccc' }}
              onFocus={(e) => e.target.style.borderColor = '#3f6212'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              style={{ borderColor: 'var(--border-color)', '--border-color': '#ccc' }}
              onFocus={(e) => e.target.style.borderColor = '#3f6212'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-2 rounded-lg transition disabled:bg-gray-400"
            style={{ background: loading ? '#ccc' : '#3f6212' }}
            onMouseEnter={(e) => !loading && (e.target.style.background = '#2d4a0e')}
            onMouseLeave={(e) => !loading && (e.target.style.background = '#3f6212')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <Link to="/register" className="font-semibold hover:underline" style={{ color: '#3f6212' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
