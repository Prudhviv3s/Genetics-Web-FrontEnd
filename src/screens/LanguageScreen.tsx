import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';

export default function LanguageScreen() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ];

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    // In a real app, this would update the app's language
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

  return (
    <DesktopLayout title="Language">
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Globe className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Select Language</h3>
              <p className="text-base text-gray-700">
                Choose your preferred language for the app interface.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`bg-white rounded-xl border-2 p-6 text-left transition-all shadow-sm ${
                selectedLanguage === language.code
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 text-base">{language.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{language.nativeName}</p>
                </div>
                {selectedLanguage === language.code && (
                  <div className="bg-blue-600 rounded-full p-2">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <p className="text-base text-gray-700">
            <strong className="text-gray-900">Note:</strong> Changing the language will update all app text. 
            Medical terms will be translated where appropriate, but scientific terminology may remain in English for accuracy.
          </p>
        </div>
      </div>
    </DesktopLayout>
  );
}
