import React, { useState } from 'react';
import { Award, Plus, Edit2, Trash2, Calendar, Building } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAppContext } from '../context/AppContext';

interface Credential {
  id: string;
  type: string;
  number: string;
  institution: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
}

export default function MedicalCredentialsScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const [credentials] = useState<Credential[]>([
    {
      id: '1',
      type: 'Medical License',
      number: 'MD-2023-45678',
      institution: 'State Medical Board',
      issueDate: '2023-01-15',
      expiryDate: '2026-01-15',
      status: 'active'
    },
    {
      id: '2',
      type: 'Board Certification - Medical Genetics',
      number: 'ABMG-2024-1234',
      institution: 'American Board of Medical Genetics',
      issueDate: '2024-03-20',
      expiryDate: '2034-03-20',
      status: 'active'
    },
    {
      id: '3',
      type: 'DEA Registration',
      number: 'DEA-AB1234567',
      institution: 'Drug Enforcement Administration',
      issueDate: '2023-06-10',
      expiryDate: '2026-06-10',
      status: 'active'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MobileContainer>
      <Header title="Medical Credentials" showBack onBack={() => navigate(-1)} />

      <div className="p-4 pb-24 space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Credentials & Certifications</h2>
          <p className="text-gray-600 mt-1">
            Manage your professional licenses and certifications
          </p>
        </div>

        {/* Add New Credential Button */}
        <button
          onClick={() => { }}
          className="w-full bg-blue-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
        >
          <Plus size={20} />
          <span className="font-semibold">Add New Credential</span>
        </button>

        {/* Credentials List */}
        <div className="space-y-3">
          {credentials.map((credential) => (
            <div key={credential.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{credential.type}</h3>
                  <p className="text-sm text-gray-600 mt-1">ID: {credential.number}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(credential.status)}`}>
                  {credential.status.charAt(0).toUpperCase() + credential.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Building size={16} className="text-gray-400" />
                  <span>{credential.institution}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Issued: {new Date(credential.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Expires: {new Date(credential.expiryDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => { }}
                  className="flex-1 bg-blue-50 text-blue-600 rounded-lg py-2 px-3 flex items-center justify-center gap-2 hover:bg-blue-100 transition-all"
                >
                  <Edit2 size={16} />
                  <span className="text-sm font-medium">Edit</span>
                </button>
                <button
                  onClick={() => { }}
                  className="flex-1 bg-red-50 text-red-600 rounded-lg py-2 px-3 flex items-center justify-center gap-2 hover:bg-red-100 transition-all"
                >
                  <Trash2 size={16} />
                  <span className="text-sm font-medium">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Award className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Keep Your Credentials Updated</h4>
              <p className="text-sm text-blue-800">
                Ensure all your credentials are current and valid. You'll receive notifications 60 days before expiration.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation userRole={userRole ?? undefined} />
    </MobileContainer>
  );
}
