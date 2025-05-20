import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserRound, 
  CalendarClock, 
  Calendar, 
  Bell, 
  Menu, 
  X, 
  LogOut,
  ActivitySquare,
  Building2
} from 'lucide-react';

interface AppLayoutProps {
  onLogout: () => void;
}

const AppLayout = ({ onLogout }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/doctors', name: 'Doctors', icon: <UserRound size={20} /> },
    { path: '/slots', name: 'Slots', icon: <CalendarClock size={20} /> },
    { path: '/appointments', name: 'Appointments', icon: <Calendar size={20} /> },
    { path: '/notifications', name: 'Notifications', icon: <Bell size={20} /> },
    { path: '/profile', name: 'Hospital Profile', icon: <Building2 size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 transition-opacity bg-gray-800 bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition-all transform bg-white border-r border-gray-200 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex items-center">
            <ActivitySquare className="w-8 h-8 text-primary-500" />
            <span className="ml-2 text-xl font-semibold text-gray-800">MediAdmin</span>
          </div>
          <button
            onClick={closeSidebar}
            className="p-1 text-gray-600 rounded-md lg:hidden hover:text-primary-500 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-5 px-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeSidebar}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'text-primary-500 bg-primary-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={toggleSidebar}
              className="p-1 text-gray-600 rounded-md lg:hidden hover:text-primary-500 focus:outline-none"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 lg:flex lg:justify-between lg:items-center">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  {navLinks.find(link => link.path === location.pathname)?.name || 'Dashboard'}
                </h1>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-600 rounded-full hover:text-primary-500 focus:outline-none">
                  <Bell size={20} />
                </button>
                <div className="relative">
                  <span className="inline-block w-8 h-8 overflow-hidden rounded-full bg-gray-200">
                    <span className="flex items-center justify-center h-full text-gray-700">
                      A
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;