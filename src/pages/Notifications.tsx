import React, { useState } from 'react';
import { Bell, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { notifications as initialNotifications, Notification } from '../data/mockData';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Bell className="h-5 w-5 text-primary-500" />;
      case 'cancellation':
        return <XCircle className="h-5 w-5 text-error" />;
      case 'system':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-secondary-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary-500" />;
    }
  };

  const displayedNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => !notification.read);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        {notifications.some(n => !n.read) && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-primary-500 hover:text-primary-600 font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white shadow-card rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'all'
                  ? 'border-b-2 border-primary-500 text-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All
              <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                {notifications.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'unread'
                  ? 'border-b-2 border-primary-500 text-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Unread
              <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                {notifications.filter(n => !n.read).length}
              </span>
            </button>
          </nav>
        </div>

        <div className="divide-y divide-gray-200">
          {displayedNotifications.length > 0 ? (
            displayedNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 transition-colors ${notification.read ? '' : 'bg-blue-50'}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-gray-900 font-semibold'}`}>
                        {notification.title}
                      </p>
                      <p className="ml-2 flex-shrink-0 text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <div className="mt-2">
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center text-xs font-medium text-primary-500 hover:text-primary-600"
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Mark as read
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === 'all' ? 'You have no notifications' : 'You have no unread notifications'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;