import React from 'react';
import { User, Bell, Lock, Globe, Accessibility, MessageSquare, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';

export default function PatientSettingsScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { label: 'My Profile', icon: User, path: '/patient-profile' },
        { label: 'Notifications', icon: Bell, path: '/notifications' },
        { label: 'Privacy & Security', icon: Lock, path: '/privacy-consent' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Language', icon: Globe, path: '/language' },
        { label: 'Accessibility', icon: Accessibility, path: '/accessibility' },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: HelpCircle, path: '/help' },
        { label: 'FAQ', icon: MessageSquare, path: '/faq' },
        { label: 'Send Feedback', icon: MessageSquare, path: '/feedback' },
      ],
    },
  ];

  return (
    <DesktopLayout title="Settings">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Settings & Preferences</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your account and application preferences
          </p>
        </div>

        <div className="space-y-8">
          {settingsSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {section.title}
              </h3>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={itemIndex}
                      onClick={() => navigate(item.path)}
                      className={`w-full p-5 flex items-center gap-4 hover:bg-blue-50 transition-all group ${
                        itemIndex !== section.items.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div className="bg-gray-100 group-hover:bg-blue-100 rounded-lg p-3 transition-colors">
                        <Icon size={22} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <span className="flex-1 text-left font-semibold text-gray-900 text-base">
                        {item.label}
                      </span>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mt-8 shadow-sm">
          <button
            onClick={() => navigate('/logout')}
            className="w-full bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-red-100 hover:border-red-600 transition-all group"
          >
            <LogOut size={22} className="text-red-600" />
            <span className="font-bold text-red-600 text-base">
              Logout
            </span>
          </button>
        </div>
      </div>
    </DesktopLayout>
  );
}