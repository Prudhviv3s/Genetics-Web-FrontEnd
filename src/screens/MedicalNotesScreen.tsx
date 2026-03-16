import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';

export default function MedicalNotesScreen() {
  const navigate = useNavigate();
  const { tempMemberData, setTempMemberData, familyMembers, setFamilyMembers } = useAppContext();
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitFamilyMember = async (finalNotes: string) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No token found");

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
        throw new Error(createData.message || JSON.stringify(createData.errors) || 'Failed to create family member base profile');
      }

      const memberId = createData.member_id;

      // Step 2: Update Relationship, Status, Notes
      const updateRes = await fetch(`${API_BASE_URL}/api/patient/family-members/${memberId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          // Make sure relationship matches backend valid choices if any, or general 'Other'
          relationship: tempMemberData.relationship ? tempMemberData.relationship.charAt(0).toUpperCase() + tempMemberData.relationship.slice(1) : 'Other Relative',
          health_status: tempMemberData.health_status ? tempMemberData.health_status.charAt(0).toUpperCase() + tempMemberData.health_status.slice(1) : 'Unknown',
          medical_notes: finalNotes || ''
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

  const handleSave = () => submitFamilyMember(notes);
  const handleSkip = () => submitFamilyMember('');

  return (
    <DesktopLayout title="Medical Notes">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Additional Medical Information
            </h2>
            <p className="text-gray-600 text-lg">
              Add any relevant medical notes to help with genetic analysis (optional)
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Medical Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter any symptoms, diagnoses, test results, or other relevant medical information..."
              rows={10}
              maxLength={500}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-base"
            />
            <p className="text-xs text-gray-500 mt-2">
              {notes.length}/500 characters
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-yellow-900">
              <strong>Privacy Notice:</strong> All medical information is encrypted and securely stored in compliance with healthcare regulations.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/select-status')}
              disabled={loading}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-semibold transition-all disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleSkip}
              disabled={loading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-semibold transition-all disabled:opacity-50"
            >
              Skip & Save
            </button>
            <Button onClick={handleSave} fullWidth disabled={loading}>
              {loading ? 'Saving...' : 'Save Family Member'}
            </Button>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}