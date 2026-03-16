import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';

export default function DeleteConfirmationScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    // Delete logic here
    navigate('/family-overview');
  };

  return (
    <DesktopLayout title="Delete Confirmation">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={48} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Delete Family Member?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Are you sure you want to delete <strong>John Johnson</strong>? This will also remove them from the pedigree chart.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-yellow-900">
                <strong>Warning:</strong> This action cannot be undone. All associated medical notes and relationships will be permanently deleted.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/family-overview')}
                className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
