import React, { useState, useEffect } from 'react';
import { Bell, FileText, Users, CheckCircle, Clock, AlertCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const { setUnreadCount } = useAppContext();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCountLocal, setUnreadCountLocal] = useState(0);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/api/notifications/?tab=${filter}`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await response.json();
      if (data.status) {
        setNotifications(data.notifications);
        setUnreadCountLocal(data.new_count);
        setUnreadCount(data.new_count);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const handleMarkAsRead = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/api/notifications/${id}/read/`, {
        method: 'PATCH',
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await response.json();
      if (data.status) {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        setUnreadCountLocal(data.new_count);
        setUnreadCount(data.new_count);
      }
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/api/notifications/read-all/`, {
        method: 'PATCH',
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await response.json();
      if (data.status) {
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        setUnreadCountLocal(0);
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Failed to mark all notifications as read", err);
    }
  };

  const handleNotificationClick = async (notification: any) => {
    // 1. Mark as read if unread
    if (!notification.is_read) {
      await handleMarkAsRead(notification.id);
    }

    // 2. Navigate based on data
    const data = notification.data || {};
    const screen = data.screen;

    switch (screen) {
      case 'patient_detail':
        if (data.patient_id) navigate(`/patient-detail/${data.patient_id}`);
        break;
      case 'analysis_detail':
        if (data.patient_id) navigate(`/inheritance-detection/${data.patient_id}`);
        else navigate('/patient-results');
        break;
      case 'family_overview':
        navigate('/family-overview');
        break;
      case 'my_results':
        navigate('/patient-results');
        break;
      case 'pedigree-builder':
        navigate('/pedigree-builder');
        break;
      default:
        // No navigation for unknown screens
        break;
    }
  };

  const getNotifUI = (type: string) => {
    switch (type.toLowerCase()) {
      case 'analysis':
        return { icon: FileText, color: 'blue' };
      case 'family':
        return { icon: Users, color: 'green' };
      case 'pedigree':
        return { icon: CheckCircle, color: 'purple' };
      case 'appointment':
        return { icon: Clock, color: 'orange' };
      case 'review':
        return { icon: AlertCircle, color: 'red' };
      case 'general':
      case 'info':
        return { icon: Info, color: 'blue' };
      default:
        return { icon: Info, color: 'blue' };
    }
  };

  const getColorClasses = (color: string, type: 'bg' | 'text') => {
    const classes = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' },
    };
    return classes[color as keyof typeof classes]?.[type] || classes.blue[type];
  };

  return (
    <DesktopLayout title="Notifications">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {unreadCountLocal > 0 ? `${unreadCountLocal} New Notification${unreadCountLocal > 1 ? 's' : ''}` : 'All caught up!'}
                </h3>
                <p className="text-gray-600">Stay updated with your genetic analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {unreadCountLocal > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Mark all as read
                </button>
              )}
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'unread'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Unread ({unreadCountLocal})
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading notifications...</p>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => {
              const { icon: NotifIcon, color } = getNotifUI(notification.notif_type);
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl border p-6 cursor-pointer transition-all ${!notification.is_read ? 'border-blue-300 shadow-md hover:shadow-lg' : 'border-gray-200 hover:border-blue-200 hover:shadow-md'
                    }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${getColorClasses(color, 'bg')}`}>
                      <NotifIcon className={`w-7 h-7 ${getColorClasses(color, 'text')}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{notification.title}</h4>
                        {!notification.is_read && (
                          <span className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{notification.time_ago}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">
                You're all caught up!
              </p>
            </div>
          )}
        </div>
      </div>
    </DesktopLayout>
  );
}