import React from 'react';
import { Bell, Search, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';

interface TopBarProps {
  title?: string;
  showSearch?: boolean;
  userName?: string;
  userRole?: 'patient' | 'doctor' | null;
}

export function TopBar({ title, showSearch = false, userName = 'John Doe', userRole }: TopBarProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const { unreadCount } = useAppContext();

  return (
    <div className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Title or Search */}
        <div className="flex-1">
          {showSearch ? (
            <div className="max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patients, records, or analysis..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          )}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole || 'User'}</p>
            </div>
            <button
              onClick={() => navigate(userRole === 'doctor' ? '/doctor-settings' : '/patient-profile')}
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}