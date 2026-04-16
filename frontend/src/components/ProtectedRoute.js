import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return children;
}
