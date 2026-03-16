import React, { useState } from 'react';
import { Send, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

export default function SubmitPedigreeScreen() {
  const navigate = useNavigate();
  const [doctorEmail, setDoctorEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    navigate('/processing');
  };

  return (
    <MobileContainer>
      <Header title="Submit for Analysis" />
      
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Submit Pedigree to Doctor</h2>
          <p className="text-gray-600">Send your family tree for professional analysis</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor's Email Address *
            </label>
            <input
              type="email"
              value={doctorEmail}
              onChange={(e) => setDoctorEmail(e.target.value)}
              placeholder="doctor@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message to Doctor (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add any specific questions or concerns..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What will be shared:</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Complete family pedigree chart</li>
              <li>• Family member health statuses</li>
              <li>• Medical notes (if added)</li>
              <li>• Your contact information</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Your doctor will receive a notification and can review your pedigree within the app.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button onClick={handleSubmit} fullWidth icon={<Send size={20} />} disabled={!doctorEmail}>
            Submit to Doctor
          </Button>
          <Button onClick={() => navigate(-1)} variant="outline" fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
}