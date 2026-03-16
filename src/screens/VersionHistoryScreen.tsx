import React from 'react';
import { Clock, Eye, RotateCcw, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';

export default function VersionHistoryScreen() {
  const navigate = useNavigate();

  const versions = [
    { id: 1, name: 'Version 3', date: 'March 5, 2026 - 2:30 PM', changes: 5, isCurrent: true },
    { id: 2, name: 'Version 2', date: 'March 3, 2026 - 10:15 AM', changes: 3, isCurrent: false },
    { id: 3, name: 'Version 1', date: 'March 1, 2026 - 4:00 PM', changes: 8, isCurrent: false },
  ];

  return (
    <DesktopLayout title="Version History">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Pedigree Versions</h2>
            <p className="text-gray-600 text-lg">View and restore previous versions of your family pedigree</p>
          </div>

          <div className="space-y-4">
            {versions.map((version) => (
              <div 
                key={version.id} 
                className={`border-2 rounded-lg p-6 hover:shadow-md transition-all ${
                  version.isCurrent ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      version.isCurrent ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <GitBranch size={24} className={version.isCurrent ? 'text-green-600' : 'text-blue-600'} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{version.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Clock size={16} />
                        <span>{version.date}</span>
                      </div>
                    </div>
                  </div>
                  {version.isCurrent && (
                    <span className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-full font-medium">
                      Current
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4">{version.changes} changes made in this version</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/compare-changes')}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium transition-all"
                  >
                    <Eye size={18} />
                    View Details
                  </button>
                  {!version.isCurrent && (
                    <button className="px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 font-medium transition-all">
                      <RotateCcw size={18} />
                      Restore
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
