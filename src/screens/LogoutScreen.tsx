import React, { useEffect } from 'react';
import { LogOut, CheckCircle, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';

export default function LogoutScreen() {
  const navigate = useNavigate();
  const { setCurrentUser, setUserRole } = useAppContext();

  useEffect(() => {
    // Clear user data
    setCurrentUser(null);
    setUserRole(null);

    // Redirect to landing page after a short delay
    const timer = setTimeout(() => {
      navigate('/landing');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, setCurrentUser, setUserRole]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-6">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <GitBranch className="text-white" size={32} />
          </div>
        </div>

        {/* Success Icon */}
        <div className="bg-white rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center shadow-2xl">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-white mb-3">Logged Out Successfully</h2>
        <p className="text-blue-100 text-lg mb-8">
          Thank you for using Genetics
        </p>

        {/* Redirecting */}
        <div className="flex items-center justify-center gap-3 text-white">
          <div className="animate-spin">
            <LogOut className="w-6 h-6" />
          </div>
          <span className="text-lg">Redirecting...</span>
        </div>
      </div>
    </div>
  );
}
