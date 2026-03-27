import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { API_BASE_URL } from '../config';

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch(`${API_BASE_URL}/api/doctor/patients/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = await res.json();
        if (data.status && data.patients) {
          const mapped = data.patients.map((p: any) => ({
            id: p.id.toString(), // The numeric DB id for routing
            patient_id_display: p.patient_id.toLowerCase(), // The PT1004 string for display
            name: p.full_name,
            email: p.email,
            age: p.age,
            gender: p.gender || 'Unknown',
            status: 'pending' // Defaulting to pending as backend API might not have status here
          }));
          setPatients(mapped);
        }
      } catch (err) {
        console.error("Failed to load patients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <DesktopLayout title="Patient List" defaultUserRole="doctor">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="relative mb-4">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading patients...</div>
        ) : (
          <div className="grid gap-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => navigate(`/patient-detail/${patient.id}`)}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{patient.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{patient.email}</p>
                  </div>

                </div>
                <div className="flex gap-6 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                  <span>Age: {patient.age}</span>
                  <span>Gender: {patient.gender}</span>
                  <span>ID: #{patient.patient_id_display.toUpperCase()}</span>
                </div>
              </div>
            ))}

            {filteredPatients.length === 0 && (
              <div className="text-center py-10 text-gray-500 bg-white border border-gray-200 rounded-xl">
                No patients found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
    </DesktopLayout>
  );
}
