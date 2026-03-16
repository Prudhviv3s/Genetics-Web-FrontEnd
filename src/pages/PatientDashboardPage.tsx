import React from 'react';
import { useNavigate } from 'react-router';
import { Users, GitBranch, FileText, Activity, Plus, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { PageContainer } from '../components/PageContainer';

export default function PatientDashboardPage() {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useAppContext();

  const [dashboardStats, setDashboardStats] = React.useState({
    family_members: 0,
    generations: 0,
    active_traits: 0,
    results_completed: 0,
  });

  React.useEffect(() => {
    if (!userRole) {
      setUserRole('patient');
    }
  }, [userRole, setUserRole]);

  React.useEffect(() => {
    const fetchHomeStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/api/patient/home/`, {
          headers: { 'Authorization': `Token ${token}` }
        });

        const data = await res.json();

        if (data.status) {
          // Robust mapping: check for dashboard stats in data.dashboard or at root
          const d = data.dashboard || data;
          
          // Fetch live analysis status for Results Completed
          let resultsCompletedCount = 0;
          try {
            const analysisRes = await fetch(`${API_BASE_URL}/api/dna/latest-analysis/`, {
              headers: { 'Authorization': `Token ${token}` }
            });
            const analysisData = await analysisRes.json();
            if (analysisData.status && analysisData.analysis) {
              resultsCompletedCount = 1;
            }
          } catch (e) {
            console.error("Failed to fetch latest analysis for dashboard", e);
          }

          setDashboardStats({
            family_members: d.family_members || 0,
            generations: d.generations || 0,
            active_traits: d.active_traits || 0,
            results_completed: resultsCompletedCount,
          });
        }
      } catch (err) {
        console.error("Failed to load patient home stats", err);
      }
    };
    fetchHomeStats();
  }, []);

  const stats = [
    { icon: Users, label: 'Family Members', value: dashboardStats.family_members.toString(), color: 'blue', trend: '+2 this month' },
    { icon: GitBranch, label: 'Generations', value: dashboardStats.generations.toString(), color: 'purple', trend: 'Complete' },
    { icon: Activity, label: 'Active Traits', value: dashboardStats.active_traits.toString(), color: 'green', trend: '2 inherited' },
    { icon: FileText, label: 'Results Completed', value: dashboardStats.results_completed.toString(), color: 'orange', trend: 'Latest Result' },
  ];

  return (
    <>
      <Sidebar userRole={userRole} />
      <TopBar title="Home" userName={currentUser?.full_name || currentUser?.name || 'Patient'} userRole={userRole} />

      <PageContainer>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-6">
          <h2 className="text-3xl font-bold mb-2">
            Welcome Back, {(currentUser?.full_name || currentUser?.name || 'Patient').split(' ')[0]}
          </h2>
          <p className="text-blue-100 text-lg">
            Manage your family health information and track genetic inheritance patterns
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              purple: 'from-purple-500 to-purple-600',
              green: 'from-green-500 to-green-600',
              orange: 'from-orange-500 to-orange-600',
            };

            return (
              <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.trend}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/add-family-member')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 flex items-center gap-3 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={24} />
              <div className="text-left">
                <div className="font-semibold">Add Family Member</div>
                <div className="text-sm opacity-90">Add a new family member</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/family-overview')}
              className="bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center gap-3 hover:border-blue-600 hover:shadow-md transition-all"
            >
              <Users size={24} className="text-blue-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Family Overview</div>
                <div className="text-sm text-gray-600">View all family members</div>
              </div>
            </button>
          </div>
        </div>
      </PageContainer>
    </>
  );
}