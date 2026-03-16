import React from 'react';
import { Dna, Users, LineChart, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Button } from '../components/Button';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <MobileContainer className="bg-gradient-to-b from-blue-50 to-white">
      <div className="p-6 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <Dna size={64} className="text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Pedigree Analysis
            </h1>
            <p className="text-gray-600 text-sm px-4">
              Automated Pedigree Analysis and Inheritance Pattern Prediction
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
              <Users size={24} className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Family Tree Building</h3>
                <p className="text-sm text-gray-600">
                  Easily add and manage family member information
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
              <LineChart size={24} className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Pattern Analysis</h3>
                <p className="text-sm text-gray-600">
                  AI-powered inheritance pattern detection
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
              <Shield size={24} className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Secure & Private</h3>
                <p className="text-sm text-gray-600">
                  Your genetic data is protected and confidential
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 pb-6">
          <Button onClick={() => navigate('/role-selection')} fullWidth>
            Get Started
          </Button>
          <Button onClick={() => navigate('/dashboard-selection')} fullWidth>
            Sign In
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
}