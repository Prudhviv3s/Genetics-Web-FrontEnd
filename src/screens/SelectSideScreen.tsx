import React, { useState } from 'react';
import { Users, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';

export default function SelectSideScreen() {
  const navigate = useNavigate();
  const { tempMemberData, setTempMemberData } = useAppContext();
  const [selected, setSelected] = useState(tempMemberData.side_of_family || '');

  const sides = [
    { 
      id: 'Father Side', 
      label: 'Father Side', 
      description: 'Paternal relative',
      icon: '👨‍👦' 
    },
    { 
      id: 'Mother Side', 
      label: 'Mother Side', 
      description: 'Maternal relative',
      icon: '👩‍👦' 
    },
  ];

  const handleNext = () => {
    setTempMemberData({ ...tempMemberData, side_of_family: selected });
    navigate('/select-status');
  };

  return (
    <DesktopLayout title="Side of Family">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center md:text-left">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Which side of the family?
            </h2>
            <p className="text-gray-600 text-lg">
              Is this relative from your father's side or your mother's side?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {sides.map((side) => (
              <button
                key={side.id}
                onClick={() => setSelected(side.id)}
                className={`p-8 rounded-2xl border-2 transition-all group flex flex-col items-center md:items-start ${
                  selected === side.id
                    ? 'border-blue-600 bg-blue-50 shadow-md ring-4 ring-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <div className={`p-4 rounded-xl text-3xl ${
                    selected === side.id ? 'bg-blue-600 grayscale-0' : 'bg-gray-100 grayscale hover:grayscale-0'
                  } transition-all`}>
                    {side.icon}
                  </div>
                  {selected === side.id && (
                    <div className="bg-blue-600 rounded-full p-1 text-white">
                      <Check size={20} />
                    </div>
                  )}
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">{side.label}</div>
                <div className="text-gray-500 text-sm">{side.description}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate('/select-relationship')}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-bold transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <Button 
              onClick={handleNext} 
              fullWidth 
              disabled={!selected}
              size="lg"
              className="py-4 shadow-lg hover:shadow-xl transition-all"
            >
              <span className="flex items-center gap-2">
                Continue to Health Status
                <ArrowRight size={20} />
              </span>
            </Button>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
            <div className="w-8 h-2 rounded-full bg-blue-200"></div>
            <div className="w-8 h-2 rounded-full bg-blue-200"></div>
            <div className="w-16 h-2 rounded-full bg-blue-600"></div>
            <div className="w-8 h-2 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </DesktopLayout>
  );
}
