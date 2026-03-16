import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';

export default function HelpScreen() {
  const navigate = useNavigate();

  const helpTopics = [
    {
      icon: Book,
      title: 'Getting Started Guide',
      description: 'Learn the basics of using the app',
      action: () => {},
    },
    {
      icon: HelpCircle,
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions',
      action: () => navigate('/faq'),
    },
    {
      icon: MessageCircle,
      title: 'User Guides & Tutorials',
      description: 'Step-by-step instructions',
      action: () => {},
    },
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: 'Email Support',
      detail: 'support@geneticsapp.com',
      action: () => {},
    },
    {
      icon: Phone,
      title: 'Phone Support',
      detail: '+1 (555) 123-4567',
      action: () => {},
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      detail: 'Available Mon-Fri, 9am-5pm',
      action: () => {},
    },
  ];

  return (
    <DesktopLayout title="Help Center">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-4">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Help Center</h1>
              <p className="text-blue-100">
                Find answers, contact support, or learn more about using the app.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Help Topics</h3>
            <div className="space-y-3">
              {helpTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={index}
                    onClick={topic.action}
                    className="w-full bg-gray-50 rounded-lg border border-gray-200 p-4 hover:bg-blue-50 hover:border-blue-300 text-left transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 rounded-lg p-3">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{topic.title}</h4>
                        <p className="text-sm text-gray-600">{topic.description}</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Support</h3>
            <div className="space-y-3">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    onClick={option.action}
                    className="w-full bg-gray-50 rounded-lg border border-gray-200 p-4 hover:bg-green-50 hover:border-green-300 text-left transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 rounded-lg p-3">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{option.title}</h4>
                        <p className="text-sm text-gray-600">{option.detail}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate('/feedback')}
            fullWidth
          >
            <MessageCircle size={20} className="mr-2" />
            Send Feedback
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/faq')}
            fullWidth
          >
            <HelpCircle size={20} className="mr-2" />
            View FAQ
          </Button>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Application Information</h4>
              <p className="text-sm text-gray-600">Version 1.0.0</p>
              <p className="text-xs text-gray-500 mt-1">Last updated: January 2026</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all">
              Check for Updates
            </button>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}