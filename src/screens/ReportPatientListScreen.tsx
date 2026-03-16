import React, { useState, useEffect } from 'react';
import { Search, FileText, ChevronRight, User, Hash } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { API_BASE_URL } from '../config';

interface Patient {
  id: string; // the database PK ID or patient_id string
  patient_id_display: string; // The formatted #PT0000 key
  name: string;
  age: number;
}

export default function ReportPatientListScreen() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/api/doctor/report-patients/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        const data = await res.json();
        if (data.status && data.patients) {
          const mapped = data.patients.map((p: any) => ({
            id: p.id.toString(), // The numeric DB id for routing
            patient_id_display: p.patient_id.toLowerCase(), // The PT1004 text
            name: p.full_name,
            age: p.age
          }));
          setPatients(mapped);
        }
      } catch (err) {
        console.error("Failed to load report patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportPatients();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <DesktopLayout title="Patient Reports" showSearch={false} defaultUserRole="doctor">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Reports</h1>
          <p className="text-gray-600">View and manage patient inheritance pattern reports</p>
        </div>

        {/* Search Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by patient name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Patient Reports List */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">All Patient Reports ({filteredPatients.length})</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading patient reports...</div>
            ) : (
              filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => navigate(`/patient-report/${patient.id}`)}
                  className="p-6 hover:bg-gray-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="text-blue-600" size={28} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-3">{patient.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <span>ID: {patient.patient_id_display.toUpperCase()}</span>
                          </div>
                          <span>•</span>
                          <span>Age: {patient.age} years</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-4" size={24} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {!loading && filteredPatients.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 font-medium mb-2">No patient reports found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </DesktopLayout>
  );
}