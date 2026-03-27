import React, { useState } from 'react';
import { Mail, KeyRound, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router';
import { API_BASE_URL } from '../config';

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendLink = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/forgot-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to reset password and pass email to be used there
        navigate('/reset-password', { state: { email } });
      } else {
        if (data.errors) {
          const firstError = Object.values(data.errors).flat()[0];
          setError(typeof firstError === 'string' ? String(firstError) : "Validation failed");
        } else {
          setError(data.message || 'Failed to send reset link');
        }
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Network error. Please ensure the backend server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/src/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-bold text-gray-900">Genetics</span>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <KeyRound size={40} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h2>
            <p className="text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-sm text-red-700 font-medium">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleSendLink}
              disabled={isLoading}
              className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold transition-all shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                }`}
            >
              {isLoading ? 'Sending...' : 'Reset Password'}
            </button>

            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-blue-600 font-medium hover:text-blue-700"
              >
                ← Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
