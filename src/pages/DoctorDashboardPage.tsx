import { useNavigate } from 'react-router';
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';
import { ArrowLeft, Search } from 'lucide-react';

export default function DoctorDashboardPage() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [allPatients, setAllPatients] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/doctor/patients/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = await res.json();
        if (data.status && data.patients) {
          // Map backend patient format to frontend needs
          const mapped = data.patients.map((p: any) => ({
            id: p.id,
            displayId: p.patient_id.toLowerCase(),
            name: p.full_name,
            email: p.email,
            age: p.age,
            gender: p.gender || 'Unknown',
            status: 'pending' // Defaulting to pending as backend API might not have status here, or we can update later
          }));
          setAllPatients(mapped);
        }
      } catch (err) {
        console.error("Failed to load patients", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'analyzed': return 'bg-green-100 text-green-700';
      case 'priority': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    };
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'analyzed': return 'Analyzed';
      case 'priority': return 'Priority';
      default: return status;
    };
  };

  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || patient.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header */}
      <div className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/doctor-home')}
            className="hover:bg-blue-700 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Patient List</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${activeFilter === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${activeFilter === 'pending'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveFilter('analyzed')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${activeFilter === 'analyzed'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Analyzed
          </button>
          <button
            onClick={() => setActiveFilter('priority')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${activeFilter === 'priority'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Priority
          </button>
        </div>

        {/* Patient Cards */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => navigate(`/patient-detail/${patient.id}`)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{patient.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{patient.email}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Age: {patient.age}</span>
                    <span>Gender: {patient.gender}</span>
                    <span>ID: {patient.displayId.toUpperCase()}</span>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(patient.status)}`}>
                  {getStatusLabel(patient.status)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-600">No patients found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}