import React from 'react';
import { Zap, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';

export default function MitochondrialScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    patientName = 'Patient', 
    patientDisplayId = '---', 
    patternScore = 8 
  } = (location.state as any) || {};

  return (
    <DesktopLayout title="Mitochondrial Inheritance" defaultUserRole="doctor">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{patientName}</h3>
                <p className="text-red-100 uppercase">ID: {patientDisplayId.replace(/^#/, '')}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Zap size={40} />
            <div>
              <h2 className="text-3xl font-bold">Mitochondrial Inheritance</h2>
              <p className="text-red-100 text-lg mt-2">Probability: {patternScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Pattern Characteristics</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <span>Transmitted through maternal line only</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <span>Affects both males and females</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <span>Males cannot transmit to offspring</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <span>All children of affected mothers at risk</span>
            </li>
          </ul>
        </div>
      </div>
    </DesktopLayout>
  );
}
