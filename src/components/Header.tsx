import React from 'react';
import { ArrowLeft, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
  onBack?: () => void;
}

export const Header = ({
  title,
  showBack = true,
  showNotifications = false,
  showSettings = false,
  onBack,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="bg-blue-600 text-white px-4 py-3 pt-safe flex items-center justify-between sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showBack && (
          <button onClick={handleBack} className="p-1.5 hover:bg-blue-700 rounded-full transition-colors flex-shrink-0">
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-lg font-semibold truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {showNotifications && (
          <button
            onClick={() => navigate('/notifications')}
            className="p-2 hover:bg-blue-700 rounded-full relative"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}
        {showSettings && (
          <button
            onClick={() => navigate('/accessibility')}
            className="p-2 hover:bg-blue-700 rounded-full"
          >
            <Settings size={20} />
          </button>
        )}
      </div>
    </div>
  );
};