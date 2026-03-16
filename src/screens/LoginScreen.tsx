import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { setUserRole, setCurrentUser } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Get the selected role from sessionStorage
    const selectedRole = sessionStorage.getItem('selectedRole') as 'patient' | 'doctor' || 'patient';
    
    // Mock login
    setCurrentUser({ email, name: 'User' });
    setUserRole(selectedRole);
    
    // Clear the stored role
    sessionStorage.removeItem('selectedRole');
    
    navigate('/home-dashboard');
  };

  return (
    <MobileContainer>
      <Header title="Sign In" showBack onBack={() => navigate('/welcome')} />
      
      <div className="p-6 flex flex-col min-h-[calc(100vh-64px)]">
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to continue to your account
            </p>
          </div>

          <div className="space-y-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3 pb-6">
          <Button onClick={handleLogin} fullWidth>
            Sign In
          </Button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/role-selection')}
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </MobileContainer>
  );
}