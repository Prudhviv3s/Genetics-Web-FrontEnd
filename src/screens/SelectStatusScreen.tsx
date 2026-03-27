import React, { useState } from 'react';
import { Activity, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';

export default function SelectStatusScreen() {
  const navigate = useNavigate();
  const { tempMemberData, setTempMemberData } = useAppContext();
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const statuses = [
    {
      id: 'affected',
      label: 'Affected',
      description: 'Shows symptoms of the genetic condition',
      color: 'red',
    },
    {
      id: 'unaffected',
      label: 'Unaffected',
      description: 'Does not show symptoms',
      color: 'green',
    },
    {
      id: 'carrier',
      label: 'Carrier',
      description: 'Carries the gene but no symptoms',
      color: 'yellow',
    },
    {
      id: 'unknown',
      label: 'Unknown',
      description: 'Status not yet determined',
      color: 'gray',
    },
  ];

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No token found. Please log in again.");

      // Step 1: Create Basic Info
      const createRes = await fetch(`${API_BASE_URL}/api/patient/family-members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          full_name: tempMemberData.name,
          gender: tempMemberData.gender === 'male' ? 'Male' : tempMemberData.gender === 'female' ? 'Female' : 'Other',
          age: parseInt((tempMemberData.age as any) || '0', 10)
        })
      });

      const createData = await createRes.json();
      if (!createData.status) {
        throw new Error(createData.message || JSON.stringify(createData.errors) || 'Failed to create family member profile');
      }

      const memberId = createData.member.id;

      // Step 2: Update Relationship and Status
      const updateRes = await fetch(`${API_BASE_URL}/api/patient/family-members/${memberId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          relationship: tempMemberData.relationship ? tempMemberData.relationship.charAt(0).toUpperCase() + tempMemberData.relationship.slice(1) : 'Other Relative',
          health_status: selected.charAt(0).toUpperCase() + selected.slice(1),
          side_of_family: tempMemberData.side_of_family || 'None',
          medical_notes: '' // No longer collecting notes
        })
      });

      const updateData = await updateRes.json();
      if (!updateData.status) {
        console.warn("Update may have failed partially:", updateData.errors);
      }

      setTempMemberData({});
      navigate('/family-overview');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const colorClasses = {
    red: 'border-red-600 bg-red-50',
    green: 'border-green-600 bg-green-50',
    yellow: 'border-yellow-600 bg-yellow-50',
    gray: 'border-gray-600 bg-gray-50',
  };

  return (
    <DesktopLayout title="Health Status">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Select Health Status
            </h2>
            <p className="text-gray-600 text-lg">
              Choose the genetic condition status for this family member
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-8">
            {statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelected(status.id)}
                disabled={loading}
                className={`w-full p-6 rounded-xl border-2 transition-all text-left ${selected === status.id
                    ? colorClasses[status.color as keyof typeof colorClasses] + ' shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 mb-2 text-lg">{status.label}</div>
                    <div className="text-sm text-gray-600">{status.description}</div>
                  </div>
                  {selected === status.id && <Check size={24} className="text-blue-600" />}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> You can update this status later as more information becomes available. This helps build an accurate genetic pedigree for analysis.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/select-relationship')}
              disabled={loading}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-semibold transition-all disabled:opacity-50"
            >
              Back
            </button>
            <Button onClick={handleSave} fullWidth disabled={!selected || loading} icon={loading ? <Loader2 size={20} className="animate-spin" /> : undefined}>
              {loading ? 'Saving member...' : 'Save and Complete'}
            </Button>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}