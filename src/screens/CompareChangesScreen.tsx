import React from 'react';
import { GitCompare, Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';

export default function CompareChangesScreen() {
  const navigate = useNavigate();

  return (
    <DesktopLayout title="Compare Changes">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <GitCompare size={28} className="text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Version Comparison</h2>
            </div>
            <div className="flex gap-3 text-base">
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                Version 3 (Current)
              </span>
              <span className="text-gray-500 flex items-center">vs</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
                Version 2
              </span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Added */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plus size={20} className="text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">Added (2)</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <Plus size={20} className="text-green-600 mt-0.5" />
                    <div>
                      <p className="text-base font-semibold text-gray-900">David Johnson</p>
                      <p className="text-sm text-gray-600 mt-1">Son, Age 8, Status: Unknown</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <Plus size={20} className="text-green-600 mt-0.5" />
                    <div>
                      <p className="text-base font-semibold text-gray-900">Medical Notes for John Johnson</p>
                      <p className="text-sm text-gray-600 mt-1">Added diagnosis information</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modified */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Edit size={20} className="text-yellow-600" />
                <h3 className="text-lg font-bold text-gray-900">Modified (1)</h3>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <Edit size={20} className="text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-base font-semibold text-gray-900">John Johnson Status</p>
                    <div className="flex gap-3 items-center mt-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium">
                        Unknown
                      </span>
                      <span className="text-gray-500">→</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                        Affected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Removed */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trash2 size={20} className="text-gray-400" />
                <h3 className="text-lg font-bold text-gray-900">Removed (0)</h3>
              </div>
              <p className="text-gray-500 italic bg-gray-50 rounded-lg p-5 border-2 border-gray-200">
                No items removed in this version
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-all"
            >
              Back to Version History
            </button>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
