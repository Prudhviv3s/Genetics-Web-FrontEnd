import React, { useState } from 'react';
import { BarChart3, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAppContext } from '../context/AppContext';

export default function AnalysisPreferencesScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const [preferences, setPreferences] = useState({
    autoDetectInheritance: true,
    showConfidenceScores: true,
    highlightAnomalies: true,
    includeCarrierAnalysis: true,
    generateAutomatedNotes: false,
    defaultPedigreeView: 'compact',
    inheritancePriority: 'autosomal-dominant',
    minimumConfidenceThreshold: 70,
  });

  const handleToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    // Save preferences
    navigate(-1);
  };

  return (
    <MobileContainer>
      <Header title="Analysis Preferences" showBack onBack={() => navigate(-1)} />

      <div className="p-4 pb-24 space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Analysis Settings</h2>
          <p className="text-gray-600 mt-1">
            Configure default settings for pedigree and inheritance analysis
          </p>
        </div>

        {/* Analysis Options */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Automated Analysis
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Auto-Detect Inheritance</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Automatically identify inheritance patterns
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.autoDetectInheritance}
                  onChange={() => handleToggle('autoDetectInheritance')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Show Confidence Scores</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Display confidence percentages in results
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.showConfidenceScores}
                  onChange={() => handleToggle('showConfidenceScores')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Highlight Anomalies</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Mark unusual patterns in pedigree charts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.highlightAnomalies}
                  onChange={() => handleToggle('highlightAnomalies')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Include Carrier Analysis</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Analyze potential carriers in pedigree
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.includeCarrierAnalysis}
                  onChange={() => handleToggle('includeCarrierAnalysis')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Generate Automated Notes</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Auto-create clinical notes from analysis
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.generateAutomatedNotes}
                  onChange={() => handleToggle('generateAutomatedNotes')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Display Preferences */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Display Settings
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => { }}
              className="w-full p-4 flex items-center justify-between border-b border-gray-200 hover:bg-gray-50"
            >
              <div className="text-left flex-1">
                <h4 className="font-medium text-gray-900">Default Pedigree View</h4>
                <p className="text-sm text-gray-600 mt-1">Compact</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button
              onClick={() => { }}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="text-left flex-1">
                <h4 className="font-medium text-gray-900">Inheritance Priority</h4>
                <p className="text-sm text-gray-600 mt-1">Autosomal Dominant</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Threshold Setting */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Analysis Thresholds
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-3">Minimum Confidence Threshold</h4>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={preferences.minimumConfidenceThreshold}
                onChange={(e) => setPreferences(prev => ({ ...prev, minimumConfidenceThreshold: Number(e.target.value) }))}
                className="flex-1"
              />
              <span className="font-semibold text-blue-600 min-w-[3rem] text-right">
                {preferences.minimumConfidenceThreshold}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Results below this threshold will be flagged for review
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <BarChart3 className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Analysis Preferences</h4>
              <p className="text-sm text-blue-800">
                These settings will be applied to all new analysis sessions. You can override them for individual cases.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white rounded-xl p-4 font-semibold hover:bg-blue-700 transition-all"
        >
          Save Preferences
        </button>
      </div>

      <BottomNavigation userRole={userRole ?? undefined} />
    </MobileContainer>
  );
}
