import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, Circle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAppContext } from '../context/AppContext';

interface Specialization {
  id: string;
  name: string;
  category: string;
  selected: boolean;
}

export default function SpecializationScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const [specializations, setSpecializations] = useState<Specialization[]>([
    { id: '1', name: 'Clinical Genetics', category: 'Primary', selected: true },
    { id: '2', name: 'Medical Genetics', category: 'Primary', selected: true },
    { id: '3', name: 'Cancer Genetics', category: 'Subspecialty', selected: true },
    { id: '4', name: 'Cardiovascular Genetics', category: 'Subspecialty', selected: false },
    { id: '5', name: 'Neurogenetics', category: 'Subspecialty', selected: false },
    { id: '6', name: 'Metabolic Genetics', category: 'Subspecialty', selected: true },
    { id: '7', name: 'Prenatal Genetics', category: 'Subspecialty', selected: false },
    { id: '8', name: 'Pediatric Genetics', category: 'Subspecialty', selected: false },
    { id: '9', name: 'Pharmacogenomics', category: 'Additional Expertise', selected: false },
    { id: '10', name: 'Genomic Medicine', category: 'Additional Expertise', selected: true },
  ]);

  const toggleSpecialization = (id: string) => {
    setSpecializations(prev =>
      prev.map(spec =>
        spec.id === id ? { ...spec, selected: !spec.selected } : spec
      )
    );
  };

  const categories = Array.from(new Set(specializations.map(s => s.category)));

  const handleSave = () => {
    // Save specializations
    navigate(-1);
  };

  return (
    <MobileContainer>
      <Header title="Specialization & Expertise" showBack onBack={() => navigate(-1)} />

      <div className="p-4 pb-24 space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Areas of Expertise</h2>
          <p className="text-gray-600 mt-1">
            Select your specializations and areas of expertise
          </p>
        </div>

        {/* Specializations by Category */}
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {category}
            </h3>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
              {specializations
                .filter(spec => spec.category === category)
                .map((spec, index, arr) => (
                  <button
                    key={spec.id}
                    onClick={() => toggleSpecialization(spec.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-all ${index !== arr.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                  >
                    {spec.selected ? (
                      <CheckCircle2 size={24} className="text-blue-600 flex-shrink-0" />
                    ) : (
                      <Circle size={24} className="text-gray-300 flex-shrink-0" />
                    )}
                    <span className={`flex-1 text-left font-medium ${spec.selected ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                      {spec.name}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        ))}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Stethoscope className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Specialization Guidance</h4>
              <p className="text-sm text-blue-800">
                Your selected specializations help match you with relevant patients and cases. You can update these at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white rounded-xl p-4 font-semibold hover:bg-blue-700 transition-all"
        >
          Save Specializations
        </button>
      </div>

      <BottomNavigation userRole={userRole ?? undefined} />
    </MobileContainer>
  );
}
