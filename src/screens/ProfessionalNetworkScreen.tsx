import React, { useState } from 'react';
import { Users, UserPlus, MessageCircle, Mail, Briefcase, Award } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAppContext } from '../context/AppContext';

interface Colleague {
  id: string;
  name: string;
  specialty: string;
  institution: string;
  certification: string;
  status: 'connected' | 'pending' | 'suggested';
}

export default function ProfessionalNetworkScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const [colleagues] = useState<Colleague[]>([
    {
      id: '1',
      name: 'Dr. Jennifer Martinez',
      specialty: 'Clinical Genetics',
      institution: 'Mayo Clinic',
      certification: 'ABMG Board Certified',
      status: 'connected'
    },
    {
      id: '2',
      name: 'Dr. Robert Chang',
      specialty: 'Cancer Genetics',
      institution: 'MD Anderson Cancer Center',
      certification: 'ABMG Board Certified',
      status: 'connected'
    },
    {
      id: '3',
      name: 'Dr. Patricia Williams',
      specialty: 'Pediatric Genetics',
      institution: 'Children\'s Hospital Boston',
      certification: 'ABMG Board Certified',
      status: 'pending'
    },
    {
      id: '4',
      name: 'Dr. Michael Thompson',
      specialty: 'Metabolic Genetics',
      institution: 'Stanford Medical Center',
      certification: 'ABMG Board Certified',
      status: 'suggested'
    },
    {
      id: '5',
      name: 'Dr. Lisa Anderson',
      specialty: 'Cardiovascular Genetics',
      institution: 'Cleveland Clinic',
      certification: 'ABMG Board Certified',
      status: 'suggested'
    }
  ]);

  const connectedColleagues = colleagues.filter(c => c.status === 'connected');
  const pendingRequests = colleagues.filter(c => c.status === 'pending');
  const suggestions = colleagues.filter(c => c.status === 'suggested');

  return (
    <MobileContainer>
      <Header title="Professional Network" showBack onBack={() => navigate(-1)} />

      <div className="p-4 pb-24 space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Professional Network</h2>
          <p className="text-gray-600 mt-1">
            Connect with genetics professionals and colleagues
          </p>
        </div>

        {/* Network Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Your Network</p>
              <p className="text-3xl font-bold">{connectedColleagues.length}</p>
              <p className="text-blue-100 text-sm mt-1">Connected Professionals</p>
            </div>
            <Users size={48} className="text-white/30" />
          </div>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Pending Requests ({pendingRequests.length})
            </h3>
            <div className="space-y-3">
              {pendingRequests.map((colleague) => (
                <div key={colleague.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users size={24} className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{colleague.name}</h4>
                      <p className="text-sm text-gray-600">{colleague.specialty}</p>
                      <p className="text-xs text-gray-500 mt-1">{colleague.institution}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { }}
                      className="flex-1 bg-blue-600 text-white rounded-lg py-2 px-3 text-sm font-medium hover:bg-blue-700 transition-all"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => { }}
                      className="flex-1 bg-gray-100 text-gray-700 rounded-lg py-2 px-3 text-sm font-medium hover:bg-gray-200 transition-all"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connected Colleagues */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Your Connections ({connectedColleagues.length})
          </h3>
          <div className="space-y-3">
            {connectedColleagues.map((colleague) => (
              <div key={colleague.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{colleague.name}</h4>
                    <p className="text-sm text-gray-600">{colleague.specialty}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Briefcase size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{colleague.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Award size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{colleague.certification}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => { }}
                    className="flex-1 bg-blue-50 text-blue-600 rounded-lg py-2 px-3 flex items-center justify-center gap-2 hover:bg-blue-100 transition-all"
                  >
                    <MessageCircle size={16} />
                    <span className="text-sm font-medium">Message</span>
                  </button>
                  <button
                    onClick={() => { }}
                    className="flex-1 bg-gray-50 text-gray-700 rounded-lg py-2 px-3 flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
                  >
                    <Mail size={16} />
                    <span className="text-sm font-medium">Email</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Connections */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Suggested Connections
          </h3>
          <div className="space-y-3">
            {suggestions.map((colleague) => (
              <div key={colleague.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={24} className="text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{colleague.name}</h4>
                    <p className="text-sm text-gray-600">{colleague.specialty}</p>
                    <p className="text-xs text-gray-500 mt-1">{colleague.institution}</p>
                  </div>
                </div>
                <button
                  onClick={() => { }}
                  className="w-full bg-blue-600 text-white rounded-lg py-2 px-3 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                >
                  <UserPlus size={16} />
                  <span className="text-sm font-medium">Connect</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Users className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Build Your Network</h4>
              <p className="text-sm text-blue-800">
                Connect with genetics professionals to collaborate, share insights, and stay updated on best practices.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation userRole={userRole ?? undefined} />
    </MobileContainer>
  );
}
