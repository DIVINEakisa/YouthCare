import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-emerald-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-bold">YouthCare+</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-emerald-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
