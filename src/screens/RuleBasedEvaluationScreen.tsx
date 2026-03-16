import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

export default function RuleBasedEvaluationScreen() {
  const navigate = useNavigate();

  const rules = [
    { rule: 'Affects multiple generations', status: 'pass', description: '3 generations affected' },
    { rule: 'Both genders affected equally', status: 'pass', description: '2 males, 2 females affected' },
    { rule: 'No skipped generations', status: 'pass', description: 'Consistent vertical transmission' },
    { rule: 'Male-to-male transmission', status: 'pass', description: 'Grandfather → Father' },
    { rule: 'All children of affected parent are affected', status: 'fail', description: 'Some unaffected offspring' },
    { rule: 'Consanguinity present', status: 'unknown', description: 'Information not provided' },
  ];

  const getIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle size={20} className="text-green-600" />;
      case 'fail': return <XCircle size={20} className="text-red-600" />;
      default: return <AlertCircle size={20} className="text-gray-400" />;
    }
  };

  return (
    <MobileContainer>
      <Header title="Rule-Based Evaluation" />
      
      <div className="p-6 pb-24">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Autosomal Dominant Criteria</h2>
          <p className="text-gray-600">Evaluating pedigree against established genetic rules</p>
        </div>

        <div className="space-y-3 mb-6">
          {rules.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                {getIcon(item.status)}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.rule}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-900 mb-2">Evaluation Summary</h3>
          <div className="text-sm text-green-800">
            <p className="mb-2"><strong>Score:</strong> 4/5 criteria met</p>
            <p><strong>Conclusion:</strong> Strong evidence for autosomal dominant inheritance pattern</p>
          </div>
        </div>

        <div className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto">
          <Button onClick={() => navigate('/prediction-result')} fullWidth>
            View Full Report
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
}