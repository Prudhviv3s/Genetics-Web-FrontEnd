import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

export default function PatientProfileScreen() {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <Header title="My Profile" />
      
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
            <User size={48} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Sarah Johnson</h2>
          <p className="text-gray-600">Patient ID: PT12345</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-400" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Email</div>
                <div className="text-gray-900">sarah.johnson@email.com</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-gray-400" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Phone</div>
                <div className="text-gray-900">+1 (555) 123-4567</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-400" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Date of Birth</div>
                <div className="text-gray-900">January 15, 1988 (35 years old)</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-400" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Gender</div>
                <div className="text-gray-900">Female</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-400" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Location</div>
                <div className="text-gray-900">San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={() => navigate('/patient-settings')} variant="outline" fullWidth icon={<Edit size={20} />}>
          Edit Profile
        </Button>
      </div>
    </MobileContainer>
  );
}