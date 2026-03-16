import React, { useState } from 'react';
import { Users, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';

export default function SelectRelationshipScreen() {
  const navigate = useNavigate();
  const { tempMemberData, setTempMemberData } = useAppContext();
  const [selected, setSelected] = useState('');

  const relationships = [
    { id: 'father', label: 'Father', icon: '👨' },
    { id: 'mother', label: 'Mother', icon: '👩' },
    { id: 'brother', label: 'Brother', icon: '👦' },
    { id: 'sister', label: 'Sister', icon: '👧' },
    { id: 'son', label: 'Son', icon: '👶' },
    { id: 'daughter', label: 'Daughter', icon: '👶' },
    { id: 'grandfather', label: 'Grandfather', icon: '👴' },
    { id: 'grandmother', label: 'Grandmother', icon: '👵' },
    { id: 'uncle', label: 'Uncle', icon: '👨' },
    { id: 'aunt', label: 'Aunt', icon: '👩' },
    { id: 'cousin', label: 'Cousin', icon: '👤' },
    { id: 'other', label: 'Other Relative', icon: '👥' },
  ];

  const handleNext = () => {
    setTempMemberData({ ...tempMemberData, relationship: selected });
    navigate('/select-status');
  };

  return (
    <DesktopLayout title="Select Relationship">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How is this person related to you?
            </h2>
            <p className="text-gray-600 text-lg">
              Select the relationship type to continue building your family tree
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {relationships.map((rel) => (
              <button
                key={rel.id}
                onClick={() => setSelected(rel.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selected === rel.id
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{rel.icon}</span>
                  {selected === rel.id && <Check size={24} className="text-blue-600" />}
                </div>
                <div className="text-base font-semibold text-gray-900 text-left">{rel.label}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/add-family-member')}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-semibold transition-all"
            >
              Back
            </button>
            <Button onClick={handleNext} fullWidth disabled={!selected}>
              Continue to Health Status
            </Button>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}