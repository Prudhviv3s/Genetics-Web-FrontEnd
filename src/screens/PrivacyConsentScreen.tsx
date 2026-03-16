import React from 'react';
import { Shield, AlertCircle, FileText, Lock } from 'lucide-react';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';

export default function PrivacyConsentScreen() {
  const { currentUser } = useAppContext();

  return (
    <DesktopLayout title="Privacy & Security" defaultUserRole={currentUser?.role || 'patient'}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Privacy & Security</h2>
          <p className="text-gray-600 mt-2">
            Manage your privacy settings and understand how we protect your data
          </p>
        </div>

        {/* Important Notice Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 rounded-lg p-3 flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Important Notice</h3>
              <p className="text-gray-700">
                This app is designed to assist with genetic analysis. Always consult with a healthcare professional for medical decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-6">
          {/* Privacy Policy */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Privacy Policy</h3>
                <p className="text-gray-600">
                  We protect your genetic data with industry-standard encryption and never share it without your consent.
                </p>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Medical Disclaimer</h3>
                <p className="text-gray-600">
                  This tool provides genetic analysis but does not replace professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Data Usage */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Data Usage & Sharing</h3>
                <p className="text-gray-600">
                  Your data will be used to generate pedigree analysis and may be shared with your healthcare provider if you choose. We maintain strict confidentiality and comply with healthcare data protection regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}