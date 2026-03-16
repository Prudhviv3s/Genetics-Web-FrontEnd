import React from 'react';
import { RefreshCw, Clock, UserPlus, Edit, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';

export default function UpdatePedigreeScreen() {
  const navigate = useNavigate();

  const changes = [
    {
      type: 'Added Family Member',
      description: 'David Johnson (Son, Age 8)',
      time: '2 min ago',
      icon: UserPlus,
    },
    {
      type: 'Updated Status',
      description: 'Changed John Johnson from Unknown to Affected',
      time: '1 hour ago',
      icon: Edit,
    },
    {
      type: 'Modified Medical Notes',
      description: 'Added diagnosis information for Mary Johnson',
      time: 'Yesterday',
      icon: FileText,
    },
  ];

  return (
    <DesktopLayout title="Update Pedigree">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Recent Changes</h2>
            <p className="text-gray-600 text-lg">Review updates before saving to your pedigree</p>
          </div>

          <div className="space-y-4 mb-8">
            {changes.map((change, index) => {
              const Icon = change.icon;
              return (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-base font-semibold text-gray-900">{change.type}</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock size={14} />
                          {change.time}
                        </span>
                      </div>
                      <p className="text-gray-600">{change.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/version-history')}
              className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all"
            >
              View Version History
            </button>
            <button
              onClick={() => navigate('/save-pedigree')}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Update & Save
            </button>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
