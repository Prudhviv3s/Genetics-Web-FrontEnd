import React from 'react';
import { GitBranch } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
              <GitBranch size={64} className="text-white" />
            </div>
            <div className="absolute inset-0 bg-white opacity-10 rounded-2xl blur-2xl"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Genetics
        </h1>
        <p className="text-blue-100 text-xl mb-2">
          Algorithm for Automated Pedigree Analysis
        </p>
        <p className="text-blue-100 text-xl">
          and Inheritance Pattern Prediction
        </p>
        <div className="mt-16">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
