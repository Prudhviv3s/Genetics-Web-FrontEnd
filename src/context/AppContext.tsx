import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { API_BASE_URL } from '../config';

interface FamilyMember {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  relationship: string;
  status: 'affected' | 'unaffected' | 'carrier' | 'unknown';
  health_status?: string;
  medicalNotes?: string;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  familyMembers: FamilyMember[];
  pedigreeData?: any;
  analysisResults?: any;
}

interface AppContextType {
  userRole: 'patient' | 'doctor' | null;
  setUserRole: (role: 'patient' | 'doctor' | null) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
  patients: Patient[];
  setPatients: (patients: Patient[]) => void;
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  familyMembers: FamilyMember[];
  setFamilyMembers: (members: FamilyMember[]) => void;
  tempMemberData: Partial<FamilyMember>;
  setTempMemberData: (data: Partial<FamilyMember>) => void;
  pedigreeVersions: any[];
  setPedigreeVersions: (versions: any[]) => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  refreshGlobalData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'p1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      age: 35,
      gender: 'Female',
      familyMembers: [
        { id: 'fm1', name: 'Robert Johnson', gender: 'male', age: 68, relationship: 'Father', status: 'affected' },
        { id: 'fm2', name: 'Mary Johnson', gender: 'female', age: 65, relationship: 'Mother', status: 'unaffected' },
        { id: 'fm3', name: 'John Johnson', gender: 'male', age: 38, relationship: 'Brother', status: 'carrier' },
        { id: 'fm4', name: 'Emma Johnson', gender: 'female', age: 32, relationship: 'Sister', status: 'unaffected' },
      ],
    },
    {
      id: 'p2',
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      age: 42,
      gender: 'Male',
      familyMembers: [
        { id: 'fm5', name: 'David Chen', gender: 'male', age: 72, relationship: 'Father', status: 'unaffected' },
        { id: 'fm6', name: 'Lisa Chen', gender: 'female', age: 70, relationship: 'Mother', status: 'affected' },
        { id: 'fm7', name: 'Amy Chen', gender: 'female', age: 45, relationship: 'Sister', status: 'carrier' },
      ],
    },
    {
      id: 'p3',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      age: 28,
      gender: 'Female',
      familyMembers: [
        { id: 'fm8', name: 'Carlos Rodriguez', gender: 'male', age: 58, relationship: 'Father', status: 'affected' },
        { id: 'fm9', name: 'Maria Rodriguez', gender: 'female', age: 56, relationship: 'Mother', status: 'unaffected' },
        { id: 'fm10', name: 'Sofia Rodriguez', gender: 'female', age: 30, relationship: 'Sister', status: 'affected' },
        { id: 'fm11', name: 'Diego Rodriguez', gender: 'male', age: 26, relationship: 'Brother', status: 'unaffected' },
      ],
    },
  ]);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [tempMemberData, setTempMemberData] = useState<Partial<FamilyMember>>({});
  const [pedigreeVersions, setPedigreeVersions] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const refreshGlobalData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      // Fetch Profile
      const profileRes = await fetch(`${API_BASE_URL}/api/me/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const profileData = await profileRes.json();
      if (profileData.status && profileData.profile) {
        setCurrentUser({
          ...profileData.profile,
          name: profileData.profile.full_name,
          role: profileData.profile.role
        });
        if (profileData.profile.role) {
          setUserRole(profileData.profile.role.toLowerCase() as 'patient' | 'doctor');
        }
      }

      // Fetch Notifications Count
      const notifRes = await fetch(`${API_BASE_URL}/api/notifications/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const notifData = await notifRes.json();
      if (notifData.status) {
        setUnreadCount(notifData.new_count || 0);
      }
    } catch (err) {
      console.error("Failed to fetch global data in AppContext:", err);
    }
  }, []);

  // Fetch and sync user profile globally on mount
  React.useEffect(() => {
    refreshGlobalData();
  }, [refreshGlobalData]);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentUser,
        setCurrentUser,
        patients,
        setPatients,
        currentPatient,
        setCurrentPatient,
        familyMembers,
        setFamilyMembers,
        tempMemberData,
        setTempMemberData,
        pedigreeVersions,
        setPedigreeVersions,
        unreadCount,
        setUnreadCount,
        refreshGlobalData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};