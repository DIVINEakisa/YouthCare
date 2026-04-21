import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const { register, user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Navigate to dashboard once user is set
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
    setLocalLoading(true);

    try {
      await register(
        formData.name, 
        Number(formData.age), 
        formData.gender, 
        formData.email, 
        formData.password
      );
      // Don't navigate here - let useEffect handle it after user state updates
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#3f6212' }}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#3f6212' }}>YouthCare+</h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Account</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              style={{ borderColor: 'var(--border-color)', '--border-color': '#ccc' }}
              onFocus={(e) => e.target.style.borderColor = '#3f6212'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              style={{ borderColor: 'var(--border-color)', '--border-color': '#ccc' }}
              onFocus={(e) => e.target.style.borderColor = '#3f6212'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
              placeholder="18"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              style={{ borderColor: 'var(--border-color)', '--border-color': '#ccc' }}
              onFocus={(e) => e.target.style.borderColor = '#3f6212'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

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
            disabled={localLoading || authLoading}
            className="w-full text-white font-semibold py-2 rounded-lg transition disabled:bg-gray-400"
            style={{ background: localLoading || authLoading ? '#ccc' : '#3f6212' }}
            onMouseEnter={(e) => !localLoading && !authLoading && (e.target.style.background = '#2d4a0e')}
            onMouseLeave={(e) => !localLoading && !authLoading && (e.target.style.background = '#3f6212')}
          >
            {localLoading || authLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account? <Link to="/login" className="font-semibold hover:underline" style={{ color: '#3f6212' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
