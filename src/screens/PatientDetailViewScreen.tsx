import React, { useState, useEffect } from 'react';
import { User, Calendar, Mail, Phone, FileText, GitBranch } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';
import { API_BASE_URL } from '../config';

export default function PatientDetailViewScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!id) return;
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/api/doctor/patient/${id}/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = await res.json();

        if (data.status && data.patient) {
          // Map backend to expected frontend format
          setPatient({
            userId: id, // The database ID from URL
            displayId: data.patient.patient_id.toLowerCase(),
            name: data.patient.full_name,
            email: data.patient.email,
            age: data.patient.age,
            gender: data.patient.gender || 'Unknown'
          });
        } else {
          setError('Patient not found');
        }
      } catch (err) {
        console.error("Failed to fetch patient details:", err);
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  // Handle Loading View
  if (loading) {
    return (
      <DesktopLayout title="Patient Details" defaultUserRole="doctor">
        <div className="max-w-4xl mx-auto text-center py-20 text-gray-500">
          Loading patient details...
        </div>
      </DesktopLayout>
    );
  }

  // If no patient found, show error
  if (!patient) {
    return (
      <DesktopLayout title="Patient Details" defaultUserRole="doctor">
        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-gray-600 mb-4 text-lg">Patient not found</p>
          <p className="text-gray-500 text-sm mb-4">Looking for patient ID: {id}</p>
          {error && <p className="text-red-500 text-sm mb-6">{error}</p>}
          <Button onClick={() => navigate('/doctor-patients')}>
            Back to Patient List
          </Button>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout title="Patient Details" defaultUserRole="doctor">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{patient.name}</h2>
              <p className="text-lg opacity-90 mt-1">Patient ID: {patient.displayId.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <Mail size={24} className="text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Email</div>
                <div className="text-gray-900 font-medium">{patient.email}</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <Calendar size={24} className="text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Age</div>
                <div className="text-gray-900 font-medium">{patient.age} years old</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <User size={24} className="text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Gender</div>
                <div className="text-gray-900 font-medium">{patient.gender}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => navigate(`/visual-analysis/${patient.userId}`)} fullWidth icon={<GitBranch size={20} />}>
            View Pedigree Chart
          </Button>
          <Button onClick={() => navigate('/dna-report-analysis', { state: { patientId: patient.userId, patientName: patient.name, patientDisplayId: patient.displayId, patientAge: patient.age, patientGender: patient.gender } })} variant="outline" fullWidth icon={<FileText size={20} />}>
            Start Analysis
          </Button>
          <Button onClick={() => navigate('/doctor-notes', { state: { patientId: patient.userId || patient.id, patientName: patient.name, patientDisplayId: patient.displayId } })} variant="outline" fullWidth>
            Add Clinical Notes
          </Button>
        </div>
      </div>
    </DesktopLayout>
  );
}