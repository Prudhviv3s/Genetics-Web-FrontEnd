import React from 'react';
import { UserCircle, Stethoscope, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';

export default function DashboardSelectionScreen() {
  const navigate = useNavigate();

  const handleRoleSelection = (role: 'patient' | 'doctor') => {
    // Store the selected role in sessionStorage temporarily
    sessionStorage.setItem('selectedRole', role);
    navigate('/login');
  };

  return (
    <MobileContainer>
      <Header title="Select Dashboard" showBack onBack={() => navigate('/welcome')} />
      
      <div className="p-6 flex flex-col min-h-[calc(100vh-64px)]">
        <div className="flex-1">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Choose Your Dashboard
            </h2>
            <p className="text-gray-600">
              Select how you want to use the app
            </p>
          </div>

          <div className="space-y-4">
            {/* Patient Dashboard Option */}
            <button
              onClick={() => handleRoleSelection('patient')}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-600 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-100 rounded-xl group-hover:bg-blue-600 transition-all">
                  <UserCircle size={32} className="text-blue-600 group-hover:text-white transition-all" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Patient Dashboard
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage your family data and view pedigree analysis
                  </p>
                </div>
                <ArrowRight size={24} className="text-gray-400 group-hover:text-blue-600 transition-all" />
              </div>
            </button>

            {/* Doctor Dashboard Option */}
            <button
              onClick={() => handleRoleSelection('doctor')}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-green-600 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-green-100 rounded-xl group-hover:bg-green-600 transition-all">
                  <Stethoscope size={32} className="text-green-600 group-hover:text-white transition-all" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Doctor Dashboard
                  </h3>
                  <p className="text-sm text-gray-600">
                    Review patient data and analyze inheritance patterns
                  </p>
                </div>
                <ArrowRight size={24} className="text-gray-400 group-hover:text-green-600 transition-all" />
              </div>
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Note:</span> You can switch between dashboards at any time from the settings menu.
            </p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}