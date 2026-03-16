import React from 'react';
import { LayoutGrid, GitBranch, BarChart3, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

interface BottomNavigationProps {
  userRole?: 'patient' | 'doctor';
}

export function BottomNavigation({ userRole = 'patient' }: BottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const patientTabs = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: LayoutGrid, 
      path: '/patient-dashboard',
      active: isActive('/patient-dashboard') || isActive('/home-dashboard')
    },
    { 
      id: 'pedigree', 
      label: 'Pedigree', 
      icon: GitBranch, 
      path: '/pedigree-builder',
      active: isActive('/pedigree-builder') || isActive('/family-overview')
    },
    { 
      id: 'analysis', 
      label: 'Analysis', 
      icon: BarChart3, 
      path: '/patient-results',
      active: isActive('/patient-results')
    },
    { 
      id: 'more', 
      label: 'More', 
      icon: Menu, 
      path: '/patient-settings',
      active: isActive('/patient-settings') || isActive('/help') || isActive('/profile-settings')
    },
  ];

  const doctorTabs = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: LayoutGrid, 
      path: '/doctor-home',
      active: isActive('/doctor-home') || isActive('/home-dashboard')
    },
    { 
      id: 'pedigree', 
      label: 'Pedigree', 
      icon: GitBranch, 
      path: '/visual-analysis',
      active: isActive('/visual-analysis') || isActive('/pedigree-chart')
    },
    { 
      id: 'analysis', 
      label: 'Analysis', 
      icon: BarChart3, 
      path: '/my-inheritance-analysis',
      active: isActive('/my-inheritance-analysis') || isActive('/analysis-results')
    },
    { 
      id: 'more', 
      label: 'More', 
      icon: Menu, 
      path: '/doctor-settings',
      active: isActive('/doctor-settings') || isActive('/help') || isActive('/profile-settings')
    },
  ];

  const tabs = userRole === 'doctor' ? doctorTabs : patientTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all min-w-[60px] ${
                  tab.active
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon 
                  size={24} 
                  className={`mb-1 ${tab.active ? 'stroke-[2.5]' : 'stroke-2'}`}
                />
                <span className={`text-xs ${tab.active ? 'font-semibold' : 'font-medium'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}