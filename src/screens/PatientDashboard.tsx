import React from 'react';
import { Users, GitBranch, FileText, Activity, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useAppContext();

  const [resultsCompleted, setResultsCompleted] = React.useState(0);

  // Set userRole to patient if not already set
  React.useEffect(() => {
    if (!userRole) {
      setUserRole('patient');
    }
  }, [userRole, setUserRole]);

  React.useEffect(() => {
    const fetchAnalysisStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch(`${API_BASE_URL}/api/dna/latest-analysis/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const data = await res.json();
        if (data.status && data.analysis) {
          setResultsCompleted(1);
        }
      } catch (err) {
        console.error("Failed to fetch analysis status", err);
      }
    };
    fetchAnalysisStatus();
  }, []);

  return (
    <DesktopLayout title="Home" defaultUserRole="patient">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Manage your family health information</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <Users size={28} className="text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-600 mt-1">Family Members</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <GitBranch size={28} className="text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-600 mt-1">Generations</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <Activity size={28} className="text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-600 mt-1">Active Traits</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <FileText size={28} className="text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{resultsCompleted}</div>
            <div className="text-sm text-gray-600 mt-1">Results Completed</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/add-family-member')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 flex items-center gap-4 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={28} />
            <div className="flex-1 text-left">
              <div className="font-semibold text-lg">Add Family Member</div>
              <div className="text-sm opacity-90 mt-1">Add a new family member</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/pedigree-builder')}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center gap-4 hover:border-blue-600 hover:shadow-md transition-all"
          >
            <img src="/src/assets/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
            <div className="flex-1 text-left">
              <div className="font-semibold text-lg text-gray-900">Pedigree Builder</div>
              <div className="text-sm text-gray-600 mt-1">Build your family tree</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/family-overview')}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center gap-4 hover:border-blue-600 hover:shadow-md transition-all"
          >
            <Users size={28} className="text-blue-600" />
            <div className="flex-1 text-left">
              <div className="font-semibold text-lg text-gray-900">Family Overview</div>
              <div className="text-sm text-gray-600 mt-1">View all family members</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/patient-profile')}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center gap-4 hover:border-blue-600 hover:shadow-md transition-all"
          >
            <Activity size={28} className="text-blue-600" />
            <div className="flex-1 text-left">
              <div className="font-semibold text-lg text-gray-900">My Profile</div>
              <div className="text-sm text-gray-600 mt-1">View personal information</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/my-inheritance-analysis')}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center gap-4 hover:border-blue-600 hover:shadow-md transition-all"
          >
            <FileText size={28} className="text-blue-600" />
            <div className="flex-1 text-left">
              <div className="font-semibold text-lg text-gray-900">Analysis</div>
              <div className="text-sm text-gray-600 mt-1">View inheritance analysis</div>
            </div>
          </button>
        </div>
      </div>
    </DesktopLayout>
  );
}