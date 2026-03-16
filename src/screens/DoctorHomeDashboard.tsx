import React, { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp, ClipboardList, Activity, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';

export default function DoctorHomeDashboard() {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useAppContext();

  const [stats, setStats] = useState({
    active_patients: 0,
    pending_analysis: 0,
    total_pedigrees: 0,
    reports_generated: 0
  });
  const [loading, setLoading] = useState(true);

  // Set userRole to doctor if not already set & fetch stats
  useEffect(() => {
    if (!userRole) {
      setUserRole('doctor');
    }

    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${API_BASE_URL}/api/doctor/dashboard/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = await response.json();
        if (data.status) {
          // Robust mapping: check for stats in data.stats or at the root of data
          const s = data.stats || data;
          setStats({
            active_patients: s.active_patients || 0,
            pending_analysis: s.pending_analysis || 0,
            total_pedigrees: s.total_pedigrees || 0,
            reports_generated: s.reports_generated || 0
          });
        }
      } catch (err) {
        console.error("Failed to load doctor dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [userRole, setUserRole]);

  return (
    <DesktopLayout title="Home" defaultUserRole="doctor">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome, {currentUser?.full_name ? `Dr. ${currentUser.full_name}` : (currentUser?.name ? `Dr. ${currentUser.name}` : 'Doctor')}
          </h2>
          <p className="text-gray-600 mt-2">Review and analyze patient genetic data</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <Users size={28} className="text-blue-600" />
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.active_patients}</div>
            <div className="text-sm text-gray-600 mt-1">Active Patients</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <Activity size={28} className="text-orange-600" />
              <ClipboardList size={20} className="text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.pending_analysis}</div>
            <div className="text-sm text-gray-600 mt-1">Pending Analysis</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <GitBranch size={28} className="text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.total_pedigrees}</div>
            <div className="text-sm text-gray-600 mt-1">Total Pedigrees</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <FileText size={28} className="text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.reports_generated}</div>
            <div className="text-sm text-gray-600 mt-1">Reports Generated</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/doctor-patients')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 flex items-center gap-4 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            <Users size={28} />
            <div className="flex-1 text-left">
              <div className="font-semibold text-lg">Patient List</div>
              <div className="text-sm opacity-90 mt-1">View all patients</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/report-patients')}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center gap-4 hover:border-blue-600 hover:shadow-md transition-all"
          >
            <FileText size={28} className="text-blue-600" />
            <div className="flex-1 text-left">
              <div className="font-semibold text-lg text-gray-900">Reports</div>
              <div className="text-sm text-gray-600 mt-1">Generate patient reports</div>
            </div>
          </button>
        </div>
      </div>
    </DesktopLayout>
  );
}