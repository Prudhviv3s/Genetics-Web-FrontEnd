import React, { useEffect } from 'react';
import { Loader2, Dna } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function ProcessingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/prediction-result');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Dna size={100} className="text-white animate-pulse" />
            <div className="absolute inset-0 bg-white opacity-20 rounded-full blur-xl animate-ping"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Analyzing Pedigree</h1>
        <p className="text-blue-100 text-xl mb-12">Running automated inheritance pattern detection...</p>
        
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-center gap-4 text-white text-lg">
            <Loader2 size={20} className="animate-spin" />
            <span>Processing family relationships...</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-white text-lg">
            <Loader2 size={20} className="animate-spin" />
            <span>Evaluating inheritance patterns...</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-white text-lg">
            <Loader2 size={20} className="animate-spin" />
            <span>Calculating probability scores...</span>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto bg-blue-700 rounded-full h-3">
          <div className="bg-white h-3 rounded-full animate-[progress_3s_ease-in-out]" style={{
            animation: 'progress 3s ease-in-out forwards',
          }}></div>
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
