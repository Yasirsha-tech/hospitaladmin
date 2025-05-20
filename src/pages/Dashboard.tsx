import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, CalendarCheck, CalendarClock, UserRound } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import { appointments, dashboardSummary, doctors, slots, appointmentChartData, doctorPerformanceData } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Calculate appointment status statistics
  const appointmentStats = {
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
    noShow: appointments.filter(a => a.status === 'no-show').length,
  };

  const appointmentStatusData = [
    { name: 'Confirmed', value: appointmentStats.confirmed, color: '#0891b2' },
    { name: 'Completed', value: appointmentStats.completed, color: '#10b981' },
    { name: 'Cancelled', value: appointmentStats.cancelled, color: '#ef4444' },
    { name: 'No Show', value: appointmentStats.noShow, color: '#f59e0b' },
  ];

  const COLORS = ['#0891b2', '#10b981', '#ef4444', '#f59e0b'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Doctors"
          value={dashboardSummary.totalDoctors}
          icon={<Users size={24} />}
          trend={{ value: 12, label: 'since last month', positive: true }}
          color="primary"
        />
        <DashboardCard
          title="Today's Appointments"
          value={dashboardSummary.todayAppointments}
          icon={<CalendarCheck size={24} />}
          trend={{ value: 8, label: 'since yesterday', positive: true }}
          color="success"
        />
        <DashboardCard
          title="Available Slots"
          value={dashboardSummary.availableSlots}
          icon={<CalendarClock size={24} />}
          trend={{ value: 5, label: 'new slots added', positive: true }}
          color="secondary"
        />
        <DashboardCard
          title="Total Patients"
          value={dashboardSummary.totalPatients}
          icon={<UserRound size={24} />}
          trend={{ value: 18, label: 'since last month', positive: true }}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Appointments Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={appointmentChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#0891b2" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Appointment Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {appointmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Doctors Performance</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={doctorPerformanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#0891b2" />
              <Bar dataKey="patients" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Appointments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.slice(0, 5).map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.doctorName}</div>
                      <div className="text-xs text-gray-500">{appointment.specialization}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.date}</div>
                      <div className="text-xs text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                        appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top Doctors</h2>
          <div className="space-y-4">
            {doctors.slice(0, 3).map((doctor) => (
              <div key={doctor.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                  <div className="text-sm text-gray-500">{doctor.specialization}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-sm font-medium text-gray-900">{doctor.patients} Patients</div>
                  <div className="text-sm text-gray-500">{doctor.appointments} Appointments</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;