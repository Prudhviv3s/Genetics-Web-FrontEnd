import React, { useState, useEffect } from 'react';
import { Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { API_BASE_URL } from '../config';

interface InheritancePatient {
  id: string; // The numeric DB id for routing
  displayId: string; // The formatted #PT0000 key without #
  name: string;
  reportReady: boolean;
  inheritancePattern: string;
}

export default function InheritanceDetectionListScreen() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<InheritancePatient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Using the report-patients endpoint since Inheritance Patterns are bundled there
        const res = await fetch(`${API_BASE_URL}/api/doctor/report-patients/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        const data = await res.json();
        if (data.status && data.patients) {
          const mapped = data.patients.map((p: any) => ({
            id: p.id.toString(), // DB id for routing
            displayId: p.patient_id.toLowerCase(), // Formatted PT id without #
            name: p.full_name,
            reportReady: p.report_ready,
            inheritancePattern: p.inheritance_pattern
          }));
          setPatients(mapped);
        }
      } catch (err) {
        console.error("Failed to load inheritance patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <DesktopLayout title="Inheritance Detection" defaultUserRole="doctor">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Inheritance Pattern Analysis</h2>
          <p className="text-gray-600 mt-2">
            Select a patient to analyze their inheritance patterns and genetic data
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Activity size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Select Patient for Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Choose a patient to detect and analyze inheritance patterns from their genetic data.
              </p>
            </div>
          </div>
        </div>

        {/* Patient Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {patients.length} patient{patients.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Patient List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => navigate(`/inheritance-detection/${patient.id}`)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{patient.name}</h3>
                    {patient.reportReady && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Report Ready</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>ID: {patient.displayId.toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Activity size={24} className="text-blue-600" />
                  <ChevronRight size={24} className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {patients.length === 0 && (
          <div className="text-center py-20">
            <Activity size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2 text-xl">No patients found</h3>
            <p className="text-gray-600">
              No patients available for analysis
            </p>
          </div>
        )}
      </div>
    </DesktopLayout>
  );
}