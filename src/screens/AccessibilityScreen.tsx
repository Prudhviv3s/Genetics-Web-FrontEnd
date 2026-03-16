import React, { useState } from 'react';
import { Eye, Type, Contrast, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

export default function AccessibilityScreen() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false,
    screenReader: false,
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof settings]
    }));
  };

  const fontSizes = [
    { value: 'small', label: 'Small', example: 'text-sm' },
    { value: 'medium', label: 'Medium', example: 'text-base' },
    { value: 'large', label: 'Large', example: 'text-lg' },
    { value: 'xlarge', label: 'Extra Large', example: 'text-xl' },
  ];

  return (
    <DesktopLayout title="Accessibility">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-3">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Accessibility Settings</h3>
              <p className="text-sm text-gray-600">
                Customize the app to better suit your needs.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">Text Size</h3>
          <RadioGroup
            value={settings.fontSize}
            onValueChange={(value) => setSettings({ ...settings, fontSize: value })}
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              {fontSizes.map((size) => (
                <label
                  key={size.value}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Type className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="font-medium text-gray-900">{size.label}</span>
                      <p className={`${size.example} text-gray-600`}>Sample text</p>
                    </div>
                  </div>
                  <RadioGroupItem value={size.value} />
                </label>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">Display Options</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-full p-3">
                  <Contrast className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">High Contrast</h4>
                  <p className="text-sm text-gray-600">Increase text and color contrast</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={() => toggleSetting('highContrast')}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-3">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Reduce Motion</h4>
                  <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.reduceMotion}
                onChange={() => toggleSetting('reduceMotion')}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">Screen Reader</h3>
          <label className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 rounded-full p-3">
                <Volume2 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Enable Screen Reader</h4>
                <p className="text-sm text-gray-600">Optimize for screen reader users</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.screenReader}
              onChange={() => toggleSetting('screenReader')}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-3">About Accessibility</h4>
          <p className="text-sm text-gray-600">
            We're committed to making this app accessible to everyone. If you encounter any 
            accessibility issues, please contact our support team.
          </p>
        </div>
      </div>
    </DesktopLayout>
  );
}
