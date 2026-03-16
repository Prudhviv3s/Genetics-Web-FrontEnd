import React from 'react';
import { User, Mail, Phone, Calendar, Edit } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { PageContainer } from '../components/PageContainer';

export default function PatientProfilePage() {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useAppContext();

  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    if (!userRole) {
      setUserRole('patient');
    }
  }, [userRole, setUserRole]);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/me/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = await res.json();
        if (data.status) {
          setProfile(data.profile);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <Sidebar userRole={userRole} />
      <TopBar title="My Profile" userName={currentUser?.name || 'Sarah Johnson'} userRole={userRole} />

      <PageContainer>
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <User size={64} className="text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{profile?.full_name || 'Loading...'}</h1>
                  <p className="text-blue-100 text-lg">
                    {userRole === 'doctor'
                      ? `Doctor ID: ${String(profile?.doctor_id || 'DR0000').replace(/^#/, '')}`
                      : `Patient ID: ${String(profile?.patient_id || 'PT0000').replace(/^#/, '')}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/edit-profile')}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Edit size={20} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={20} className="text-blue-600" />
                  <div className="text-sm text-gray-500">Email Address</div>
                </div>
                <div className="text-gray-900 font-medium">{profile?.email || 'N/A'}</div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Phone size={20} className="text-blue-600" />
                  <div className="text-sm text-gray-500">Phone Number</div>
                </div>
                <div className="text-gray-900 font-medium">{profile?.phone || 'N/A'}</div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar size={20} className="text-blue-600" />
                  <div className="text-sm text-gray-500">Date of Birth</div>
                </div>
                <div className="text-gray-900 font-medium">{profile?.dob || 'N/A'}</div>
                <div className="text-sm text-gray-600">{profile?.age ? `${profile.age} years old` : ''}</div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <User size={20} className="text-blue-600" />
                  <div className="text-sm text-gray-500">Gender</div>
                </div>
                <div className="text-gray-900 font-medium">{profile?.gender || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}