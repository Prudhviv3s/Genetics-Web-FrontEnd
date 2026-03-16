import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, GitBranch, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';

export default function LoginPage() {
  const navigate = useNavigate();
  const { userRole, refreshGlobalData } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Connecting to backend login endpoint
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);

        // Sync global data immediately after getting token
        await refreshGlobalData();

        // Save user role and navigate
        if (data.role) {
          localStorage.setItem('userRole', data.role.toLowerCase());

          const role = data.role.toLowerCase();
          if (role === 'patient') {
            navigate('/patient-dashboard');
          } else if (role === 'doctor') {
            navigate('/doctor-home');
          } else {
            navigate('/role-selection');
          }
        } else {
          // Fallback if role is not returned but context has one
          if (userRole === 'patient') {
            navigate('/patient-dashboard');
          } else if (userRole === 'doctor') {
            navigate('/doctor-home');
          } else {
            navigate('/role-selection');
          }
        }
      } else {
        // Handle login failure
        if (data.errors) {
          const firstError = Object.values(data.errors).flat()[0];
          setError(typeof firstError === 'string' ? String(firstError) : "Validation failed");
        } else {
          setError(data.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please ensure the backend server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <GitBranch size={28} />
              </div>
              <span className="text-2xl font-bold">Genetics</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-xl text-blue-100 mb-8">
              Continue your genetic analysis journey. Access your pedigree data and insights.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Secure & Private</h4>
                  <p className="text-sm text-blue-100">Your genetic data is encrypted and HIPAA compliant</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Advanced Analysis</h4>
                  <p className="text-sm text-blue-100">AI-powered inheritance pattern detection</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Comprehensive Reports</h4>
                  <p className="text-sm text-blue-100">Detailed insights and clinical recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GitBranch className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">Genetics</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
          <p className="text-gray-600 mb-8">
            Access your account to continue
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold transition-all shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
