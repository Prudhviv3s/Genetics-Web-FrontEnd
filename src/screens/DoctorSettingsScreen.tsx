import React from 'react';
import { User, Bell, Lock, Globe, Accessibility, MessageSquare, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';

export default function DoctorSettingsScreen() {
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
    <DesktopLayout title="Settings" defaultUserRole="doctor">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Settings & Preferences</h2>
          <p className="text-gray-600 mt-2">
            Manage your professional account and app preferences
          </p>
        </div>

        <div className="space-y-8">
          {settingsSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                {section.title}
              </h3>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={itemIndex}
                      onClick={() => navigate(item.path)}
                      className={`w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-all ${
                        itemIndex !== section.items.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <Icon size={22} className="text-gray-600" />
                      <span className="flex-1 text-left font-medium text-gray-900 text-base">
                        {item.label}
                      </span>
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => navigate('/logout')}
          className="w-full mt-8 bg-white border border-red-200 rounded-xl p-5 flex items-center gap-4 hover:border-red-600 hover:shadow-md transition-all"
        >
          <LogOut size={22} className="text-red-600" />
          <span className="flex-1 text-left font-semibold text-red-600 text-base">
            Logout
          </span>
        </button>
      </div>
    </DesktopLayout>
  );
}
