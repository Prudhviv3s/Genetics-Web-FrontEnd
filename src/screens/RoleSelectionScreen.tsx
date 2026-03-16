import React, { useState, useEffect } from 'react';
import { User, Stethoscope, GitBranch } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAppContext } from '../context/AppContext';

export default function RoleSelectionScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserRole } = useAppContext();
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | null>(null);
  
  // Get the action from URL params (signin or signup)
  const action = searchParams.get('action') || 'signup';

  const handleRoleSelect = (role: 'patient' | 'doctor') => {
    setSelectedRole(role);
    setUserRole(role);
    
    // Immediately navigate based on the action parameter
    if (action === 'signin') {
      navigate('/login');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <GitBranch className="text-white" size={32} />
          </div>
          <span className="text-3xl font-bold text-gray-900">Genetics</span>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Select Your Role
            </h2>
            <p className="text-gray-600 text-lg">
              Choose your role to {action === 'signin' ? 'sign in' : 'get started'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <button
              onClick={() => handleRoleSelect('patient')}
              className={`bg-white border-2 rounded-2xl p-8 hover:border-blue-600 hover:shadow-lg transition-all group ${
                selectedRole === 'patient' ? 'border-blue-600 shadow-lg ring-4 ring-blue-100' : 'border-blue-200'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all ${
                  selectedRole === 'patient' 
                    ? 'bg-blue-600' 
                    : 'bg-blue-100 group-hover:bg-blue-600'
                }`}>
                  <User size={48} className={`transition-all ${
                    selectedRole === 'patient' 
                      ? 'text-white' 
                      : 'text-blue-600 group-hover:text-white'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Patient</h3>
                <p className="text-sm text-gray-600 text-center">
                  Build your family tree and track genetic health information
                </p>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect('doctor')}
              className={`bg-white border-2 rounded-2xl p-8 hover:border-blue-600 hover:shadow-lg transition-all group ${
                selectedRole === 'doctor' ? 'border-blue-600 shadow-lg ring-4 ring-blue-100' : 'border-blue-200'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all ${
                  selectedRole === 'doctor' 
                    ? 'bg-blue-600' 
                    : 'bg-blue-100 group-hover:bg-blue-600'
                }`}>
                  <Stethoscope size={48} className={`transition-all ${
                    selectedRole === 'doctor' 
                      ? 'text-white' 
                      : 'text-blue-600 group-hover:text-white'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Doctor</h3>
                <p className="text-sm text-gray-600 text-center">
                  Analyze patient data and predict inheritance patterns
                </p>
              </div>
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center mt-6">
            Click on your role to continue to {action === 'signin' ? 'sign in' : 'create your account'}
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/landing')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
