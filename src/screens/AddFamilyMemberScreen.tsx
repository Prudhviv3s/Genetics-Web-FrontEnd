import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';

export default function AddFamilyMemberScreen() {
  const navigate = useNavigate();
  const { setTempMemberData } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    age: '',
  });

  const handleNext = () => {
    setTempMemberData(formData as any);
    navigate('/select-relationship');
  };

  return (
    <DesktopLayout title="Add Family Member">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Basic Information
            </h2>
            <p className="text-gray-600 text-lg">
              Enter the family member's details to add them to your pedigree
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name *
              </label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Gender *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Male', val: 'male' },
                  { label: 'Female', val: 'female' },
                  { label: 'Other', val: 'other' }
                ].map(({ label, val }) => (
                  <button
                    key={val}
                    onClick={() => setFormData({ ...formData, gender: val as 'male' | 'female' | 'other' })}
                    className={`py-4 px-6 rounded-lg border-2 transition-all font-medium ${formData.gender === val
                      ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Age *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Enter age"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-sm text-blue-900">
                <strong>Next steps:</strong> You'll be able to select the relationship and health status in the following screens.
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => navigate('/family-overview')}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-semibold transition-all"
            >
              Cancel
            </button>
            <Button
              onClick={handleNext}
              fullWidth
              disabled={!formData.name || !formData.gender || !formData.age}
            >
              Continue to Relationship
            </Button>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}