import React from 'react';
import { Award, TrendingUp, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

export default function PredictionResultScreen() {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <Header title="Analysis Results" />
      
      <div className="p-6 pb-24">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Award size={40} />
            <div>
              <h2 className="text-2xl font-bold">Analysis Complete</h2>
              <p className="text-sm opacity-90">Inheritance pattern identified</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-green-300 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Primary Pattern</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">High Confidence</span>
          </div>
          <div className="mb-4">
            <h4 className="text-2xl font-bold text-blue-600 mb-2">Autosomal Dominant</h4>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: '78%' }}></div>
              </div>
              <span className="text-lg font-bold text-gray-900">78%</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Strong evidence supports autosomal dominant inheritance with 4 out of 5 classical criteria met.
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-gray-900">Alternative Patterns</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">Autosomal Recessive</span>
              <span className="text-sm text-gray-600">42%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">X-Linked</span>
              <span className="text-sm text-gray-600">15%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="h-2 bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto space-y-3">
          <Button onClick={() => navigate('/confidence-score')} fullWidth icon={<TrendingUp size={20} />}>
            View Confidence Score
          </Button>
          <Button onClick={() => navigate('/generate-report')} variant="outline" fullWidth icon={<FileText size={20} />}>
            Generate Report
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
}