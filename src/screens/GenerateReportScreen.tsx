import React, { useState } from 'react';
import { FileText, Download, AlertCircle, CheckSquare, Square } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';

export default function GenerateReportScreen() {
  const navigate = useNavigate();
  const [selectedSections, setSelectedSections] = useState({
    patientInfo: true,
    familyHistory: true,
    pedigreeChart: true,
    inheritanceAnalysis: true,
    confidenceScores: true,
    doctorNotes: true,
    recommendations: true,
  });

  const [format, setFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSection = (section: keyof typeof selectedSections) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const selectAll = () => {
    const allSelected = Object.values(selectedSections).every(v => v);
    const newValue = !allSelected;
    setSelectedSections({
      patientInfo: newValue,
      familyHistory: newValue,
      pedigreeChart: newValue,
      inheritanceAnalysis: newValue,
      confidenceScores: newValue,
      doctorNotes: newValue,
      recommendations: newValue,
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/export-report');
    }, 2000);
  };

  const sections = [
    { id: 'patientInfo', label: 'Patient Information', icon: '👤', description: 'Name, age, gender, contact details' },
    { id: 'familyHistory', label: 'Family History', icon: '👨‍👩‍👧‍👦', description: 'Complete family member records' },
    { id: 'pedigreeChart', label: 'Pedigree Chart', icon: '🌳', description: 'Visual family tree diagram' },
    { id: 'inheritanceAnalysis', label: 'Inheritance Analysis', icon: '🧬', description: 'Detailed pattern analysis' },
    { id: 'confidenceScores', label: 'Confidence Scores', icon: '📊', description: 'Statistical likelihood scores' },
    { id: 'doctorNotes', label: "Doctor's Notes", icon: '📝', description: 'Clinical observations' },
    { id: 'recommendations', label: 'Recommendations', icon: '💡', description: 'Treatment and counseling advice' },
  ];

  const selectedCount = Object.values(selectedSections).filter(Boolean).length;

  return (
    <DesktopLayout title="Generate Report" defaultUserRole="doctor">
      <div className="max-w-5xl mx-auto">
        <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <FileText className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Customize Your Report</h3>
              <p className="text-base text-gray-700">
                Select the sections you want to include in the final report. You can download it or share with healthcare providers.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-medium text-gray-700">
              {selectedCount} of {sections.length} sections selected
            </span>
            <button
              onClick={selectAll}
              className="text-base text-blue-600 font-medium hover:underline"
            >
              {selectedCount === sections.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(selectedCount / sections.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">Report Sections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => {
              const isSelected = selectedSections[section.id as keyof typeof selectedSections];
              return (
                <label
                  key={section.id}
                  className={`flex items-start gap-4 rounded-xl border-2 p-5 cursor-pointer transition-all shadow-sm ${isSelected
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                >
                  <span className="text-3xl flex-shrink-0">{section.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className={`font-medium text-base ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                          {section.label}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <CheckSquare className="w-6 h-6 text-blue-600" />
                        ) : (
                          <Square className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSection(section.id as keyof typeof selectedSections)}
                    className="hidden"
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">Export Format</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setFormat('pdf')}
              className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all shadow-sm ${format === 'pdf'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
            >
              <FileText className={`w-10 h-10 ${format === 'pdf' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-base font-medium ${format === 'pdf' ? 'text-blue-600' : 'text-gray-700'}`}>
                PDF
              </span>
              <span className="text-sm text-gray-500">Recommended</span>
            </button>
            <button
              onClick={() => setFormat('word')}
              className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all shadow-sm ${format === 'word'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
            >
              <FileText className={`w-10 h-10 ${format === 'word' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-base font-medium ${format === 'word' ? 'text-blue-600' : 'text-gray-700'}`}>
                Word
              </span>
              <span className="text-sm text-gray-500">Editable</span>
            </button>
          </div>
        </div>

        {selectedCount === 0 && (
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200 mb-6">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900 mb-2">No sections selected</h4>
                <p className="text-base text-orange-700">
                  Please select at least one section to generate a report.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="primary"
            onClick={handleGenerate}
            disabled={selectedCount === 0 || isGenerating}
            fullWidth
          >
            {isGenerating ? (
              <>
                <div className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                Generating Report...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Generate Report ({selectedCount} sections)
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            disabled={isGenerating}
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </div>
    </DesktopLayout>
  );
}
