import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
  Home, 
  Users, 
  GitBranch, 
  Settings, 
  HelpCircle,
  LogOut,
  Activity,
  BarChart3,
  Bell,
  User
} from 'lucide-react';
import logo from '../assets/logo.png';

interface SidebarProps {
  userRole: 'patient' | 'doctor' | null;
}

export function Sidebar({ userRole }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const patientMenuItems = [
    { icon: Home, label: 'Home', path: '/patient-dashboard' },
    { icon: GitBranch, label: 'Pedigree Builder', path: '/pedigree-builder' },
    { icon: Activity, label: 'My Analysis', path: '/patient-inheritance-results' },
    { icon: Settings, label: 'Settings', path: '/patient-settings' },
  ];

  const doctorMenuItems = [
    { icon: Home, label: 'Home', path: '/doctor-home' },
    { icon: BarChart3, label: 'Pedigree Chart', path: '/visual-analysis' },
    { icon: Activity, label: 'Analysis', path: '/inheritance-detection' },
    { icon: Settings, label: 'Settings', path: '/doctor-settings' },
  ];

  const menuItems = userRole === 'doctor' ? doctorMenuItems : patientMenuItems;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg">Genetics</h1>
            <p className="text-xs text-gray-500">
              {userRole === 'doctor' ? 'Doctor Portal' : 'Patient Portal'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} className={active ? 'text-blue-700' : 'text-gray-500'} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => navigate('/logout')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
