import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { PageContainer } from '../components/PageContainer';
import { API_BASE_URL } from '../config';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useAppContext();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    dob: '',
    gender: ''
  });
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (!userRole) {
      setUserRole('patient');
    }

    // Fetch profile
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
          setFormData({
            full_name: data.profile.full_name || '',
            email: data.profile.email || '',
            phone: data.profile.phone || '',
            dob: data.profile.dob || '',
            gender: data.profile.gender || ''
          });
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userRole, setUserRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]+$/.test(formData.full_name)) {
      alert("Full name must only contain letters and spaces");
      return;
    }
    if (!formData.email.match(/\.(com|in)$/i)) {
      alert("Email must end with .com or .in");
      return;
    }
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }
    try {

      const token = localStorage.getItem('token');
      // Calculate approximate age
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
      }

      await fetch(`${API_BASE_URL}/api/me/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          phone: formData.phone,
          dob: formData.dob,
          age: age,
          gender: formData.gender
        })
      });
      navigate('/patient-profile');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate('/patient-profile');
  };

  return (
    <>
      <Sidebar userRole={userRole} />
      <TopBar title="Edit Profile" userName={currentUser?.name || 'Sarah Johnson'} userRole={userRole} />

      <PageContainer>
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-6">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <User size={64} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Edit Your Profile</h1>
                <p className="text-blue-100 text-lg">Update your personal information</p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User size={18} className="text-blue-600" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail size={18} className="text-blue-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone size={18} className="text-blue-600" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setFormData({ ...formData, phone: value });
                      }
                    }}
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter 10-digit phone number"
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="dateOfBirth" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={18} className="text-blue-600" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User size={18} className="text-blue-600" />
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all flex items-center gap-2"
              >
                <X size={20} />
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Save size={20} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </PageContainer>
    </>
  );
}
