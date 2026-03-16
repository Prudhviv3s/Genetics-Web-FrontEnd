import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MapPin, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAppContext } from '../context/AppContext';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
}

export default function ConsultationScheduleScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'Sarah Johnson',
      date: '2026-02-12',
      time: '09:00 AM',
      type: 'video',
      status: 'scheduled'
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      date: '2026-02-12',
      time: '10:30 AM',
      type: 'in-person',
      status: 'scheduled',
      location: 'Clinic Room 203'
    },
    {
      id: '3',
      patientName: 'Emily Rodriguez',
      date: '2026-02-13',
      time: '02:00 PM',
      type: 'video',
      status: 'scheduled'
    },
    {
      id: '4',
      patientName: 'David Wilson',
      date: '2026-02-14',
      time: '11:00 AM',
      type: 'in-person',
      status: 'scheduled',
      location: 'Clinic Room 105'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={16} className="text-blue-600" />;
      case 'in-person':
        return <MapPin size={16} className="text-green-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video Call';
      case 'in-person':
        return 'In-Person';
      case 'phone':
        return 'Phone Call';
      default:
        return type;
    }
  };

  const groupedAppointments = appointments.reduce((acc, apt) => {
    const date = apt.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(apt);
    return acc;
  }, {} as Record<string, Appointment[]>);

  return (
    <MobileContainer>
      <Header title="Consultation Schedule" showBack onBack={() => navigate(-1)} />

      <div className="p-4 pb-24 space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Schedule</h2>
          <p className="text-gray-600 mt-1">
            Manage your upcoming consultations and appointments
          </p>
        </div>

        {/* Add Appointment Button */}
        <button
          onClick={() => { }}
          className="w-full bg-blue-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
        >
          <Plus size={20} />
          <span className="font-semibold">Schedule New Appointment</span>
        </button>

        {/* Appointments by Date */}
        <div className="space-y-4">
          {Object.entries(groupedAppointments).map(([date, apts]) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h3>
              <div className="space-y-3">
                {apts.map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => { }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{apt.patientName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">{apt.time}</span>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(apt.type)}
                        <span className="text-sm text-gray-700">{getTypeLabel(apt.type)}</span>
                      </div>
                      {apt.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-600">{apt.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Calendar className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Schedule Management</h4>
              <p className="text-sm text-blue-800">
                You'll receive notifications 24 hours and 1 hour before each scheduled consultation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation userRole={userRole ?? undefined} />
    </MobileContainer>
  );
}
