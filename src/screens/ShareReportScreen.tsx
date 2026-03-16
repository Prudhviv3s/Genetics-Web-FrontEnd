import React, { useState } from 'react';
import { Share2, Mail, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';
import { API_BASE_URL } from '../config';

export default function ShareReportScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState('');

  const state = location.state as { patientId?: string, analysisId?: string } | null;
  const patientId = state?.patientId;
  const analysisId = state?.analysisId;

  const handleShare = async () => {
    if (!email) {
      setError('Please enter a recipient email address.');
      return;
    }
    if (!patientId && !analysisId) {
      setError('No report context provided to share.');
      return;
    }

    setIsSharing(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const payload: any = {
        recipient_email: email,
        message: message
      };

      if (patientId) payload.patient_id = patientId;
      if (analysisId) payload.analysis_id = analysisId;

      const res = await fetch(`${API_BASE_URL}/api/reports/share/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.status) {
        setShareSuccess(true);
        setTimeout(() => {
          navigate(-1);
        }, 2500);
      } else {
        setError(data.message || 'Failed to share report');
      }
    } catch (err: any) {
      setError('Network error sharing report.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <DesktopLayout title="Share Report">
      <div className="max-w-3xl mx-auto">
        {error && (
          <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200 mb-6 flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-900 text-lg">Error</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}
        {shareSuccess && (
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 mb-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-900 text-lg">Report Shared!</h4>
                <p className="text-sm text-green-700 mt-1">
                  The report has been sent successfully.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Share2 className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-xl mb-2">Share Your Report</h3>
              <p className="text-gray-600">
                Send your genetic analysis report to healthcare providers or family members.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Recipient Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal message..."
                rows={5}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">Quick Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Dr. Sarah Johnson', email: 'sarah.johnson@clinic.com', specialty: 'Genetic Counselor' },
              { name: 'Dr. Michael Chen', email: 'michael.chen@hospital.com', specialty: 'Clinical Geneticist' },
            ].map((contact, index) => (
              <button
                key={index}
                onClick={() => setEmail(contact.email)}
                className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:bg-gray-50 hover:border-blue-500 text-left transition-all"
              >
                <div className="font-semibold text-gray-900 mb-1">{contact.name}</div>
                <div className="text-sm text-gray-600 mb-1">{contact.email}</div>
                <div className="text-xs text-gray-500">{contact.specialty}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200 mb-8">
          <p className="text-sm text-gray-700">
            <strong className="text-gray-900 font-semibold">Privacy Notice:</strong> Your report contains sensitive health information.
            Only share with trusted healthcare providers or family members.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="flex-1 !py-4 !text-base"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleShare}
            disabled={!email || isSharing}
            className="flex-1 !py-4 !text-base"
          >
            {isSharing ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Send className="w-5 h-5 mr-2" />
            )}
            {isSharing ? 'Sending...' : 'Send Report'}
          </Button>
        </div>
      </div>
    </DesktopLayout>
  );
}
