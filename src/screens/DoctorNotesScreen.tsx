import React, { useState, useEffect } from 'react';
import { FileText, Save, Clock, User, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';
import { API_BASE_URL } from '../config';

export default function DoctorNotesScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [observations, setObservations] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const state = location.state as { patientId?: string; patientName?: string; patientDisplayId?: string } | null;
  const patientId = state?.patientId;
  const patientName = state?.patientName || 'Unknown Patient';
  const patientDisplayId = state?.patientDisplayId || '';

  useEffect(() => {
    const fetchNotes = async () => {
      if (!patientId) {
        setError('No patient selected. Please access notes from a patient profile.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const cleanId = patientId.toString().replace(/[^0-9]/g, '');
        const res = await fetch(`${API_BASE_URL}/api/doctor/patient/${cleanId}/clinical-notes/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const data = await res.json();

        if (data.status && data.notes && data.notes.length > 0) {
          const latestNote = data.notes[0];

          // Split the saved 'observations' back into clinical notes and genetic observations if possible
          const savedObs = latestNote.observations || '';
          if (savedObs.includes('--- Genetic Analysis Observations ---')) {
            const parts = savedObs.split('--- Genetic Analysis Observations ---');
            setClinicalNotes(parts[0].replace('--- Clinical Notes ---\n', '').trim());
            setObservations(parts[1].trim());
          } else {
            setClinicalNotes(savedObs);
          }

          setRecommendations(latestNote.recommendations || '');
          setLastUpdated(new Date(latestNote.created_at).toLocaleDateString());
        }
      } catch (err) {
        console.error("Failed to load notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [patientId]);

  const handleSave = async () => {
    if (!patientId) return;

    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const cleanId = patientId.toString().replace(/[^0-9]/g, '');

      // Combine notes because backend schema only supports 'observations'
      const combinedObservations = `--- Clinical Notes ---\n${clinicalNotes}\n\n--- Genetic Analysis Observations ---\n${observations}`;

      const res = await fetch(`${API_BASE_URL}/api/doctor/patient/${cleanId}/clinical-notes/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          observations: combinedObservations,
          recommendations: recommendations
        })
      });

      const data = await res.json();
      if (data.status) {
        setSaved(true);
        setLastUpdated(new Date(data.note.created_at).toLocaleDateString());
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.message || 'Failed to save notes.');
      }
    } catch (err: any) {
      setError('Network error saving notes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DesktopLayout title="Doctor's Notes" defaultUserRole="doctor">
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout title="Doctor's Notes" defaultUserRole="doctor">
      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-red-900">Error</h4>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{patientName}</h3>
              {patientDisplayId && <p className="text-sm text-gray-600">Patient ID: {patientDisplayId.toUpperCase()}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Clock size={16} />
            <span>{lastUpdated ? `Last updated: ${lastUpdated}` : 'No previous notes found.'}</span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Clinical Notes
              </label>
              <textarea
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 min-h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter clinical observations and findings..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Genetic Analysis Observations
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 min-h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Document pedigree patterns and inheritance observations..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Recommendations
              </label>
              <textarea
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 min-h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter clinical recommendations and next steps..."
              />
            </div>
          </div>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <FileText className="text-green-600" size={20} />
            <span className="text-green-800 font-medium">Notes saved successfully!</span>
          </div>
        )}

        <div className="max-w-md mx-auto">
          <Button onClick={handleSave} fullWidth icon={saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} disabled={saving || !patientId}>
            {saving ? 'Saving...' : 'Save Notes'}
          </Button>
        </div>
      </div>
    </DesktopLayout>
  );
}
