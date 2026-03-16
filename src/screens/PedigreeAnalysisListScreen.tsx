import React, { useState, useEffect } from 'react';
import { Search, GitBranch, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { API_BASE_URL } from '../config';

interface Patient {
  id: string; // The numeric DB id for routing
  displayId: string; // The formatted #PT0000 key without #
  name: string;
  email: string;
  age: number;
  gender: string;
}

export default function PedigreeAnalysisListScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedigreePatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/api/doctor/pedigree-patients/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        const data = await res.json();
        if (data.status && data.patients) {
          const mapped = data.patients.map((p: any) => ({
            id: p.id.toString(), // DB id for routing
            displayId: p.patient_id.toLowerCase(), // Display id
            name: p.full_name,
            email: p.email,
            age: p.age,
            gender: p.gender || 'Unknown'
          }));
          setPatients(mapped);
        }
      } catch (err) {
        console.error("Failed to load pedigree patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPedigreePatients();
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.displayId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DesktopLayout title="Pedigree Analysis" defaultUserRole="doctor">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Pedigree Analysis</h2>
          <p className="text-gray-600 mt-2">
            Select a patient to view their pedigree chart and perform inheritance pattern analysis
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name, email or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <GitBranch size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Select Patient for Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Choose a patient to view their pedigree chart and perform inheritance pattern analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Patient Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Patient List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => navigate(`/visual-analysis/${patient.id}`)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{patient.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{patient.email}</p>
                  <div className="flex gap-6 text-sm text-gray-500">
                    <span>Age: {patient.age}</span>
                    <span>Gender: {patient.gender}</span>
                    <span>ID: {patient.displayId.toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GitBranch size={24} className="text-blue-600" />
                  <ChevronRight size={24} className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <div className="text-center py-20">
            <GitBranch size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2 text-xl">No patients found</h3>
            <p className="text-gray-600">
              Try adjusting your search query
            </p>
          </div>
        )}
      </div>
    </DesktopLayout>
  );
}
