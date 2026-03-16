import React from 'react';
import { Minimize2, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';

export default function YLinkedScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    patientName = 'Patient', 
    patientDisplayId = '---', 
    patternScore = 5 
  } = (location.state as any) || {};

  return (
    <DesktopLayout title="Y-Linked Inheritance" defaultUserRole="doctor">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{patientName}</h3>
                <p className="text-green-100 uppercase">ID: {patientDisplayId.replace(/^#/, '')}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Minimize2 size={40} />
            <div>
              <h2 className="text-3xl font-bold">Y-Linked Inheritance</h2>
              <p className="text-green-100 text-lg mt-2">Probability: {patternScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Pattern Characteristics</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <span>Only affects males</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <span>Passed from father to all sons</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <span>Never transmitted to daughters</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <span>Appears in every generation of males</span>
            </li>
          </ul>
        </div>
      </div>
    </DesktopLayout>
  );
}
