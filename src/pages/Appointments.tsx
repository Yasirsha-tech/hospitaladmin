import React, { useState } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import TableHeader from '../components/TableHeader';
import { appointments as initialAppointments, doctors, Appointment } from '../data/mockData';

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [viewingAppointment, setViewingAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  const openViewModal = (appointment: Appointment) => {
    setViewingAppointment(appointment);
    setIsModalOpen(true);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesQuery = 
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDoctor = selectedDoctor === 'all' || appointment.doctorId === selectedDoctor;
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
    const matchesDate = !selectedDate || appointment.date === selectedDate;
    
    return matchesQuery && matchesDoctor && matchesStatus && matchesDate;
  });

  const updateAppointmentStatus = (appointmentId: string, newStatus: 'confirmed' | 'completed' | 'cancelled' | 'no-show') => {
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentId
        ? { ...appointment, status: newStatus }
        : appointment
    ));
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'patient', label: 'Patient' },
    { key: 'doctor', label: 'Doctor' },
    { key: 'date', label: 'Date & Time' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions', className: 'text-right' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
      </div>

      <div className="bg-white shadow-card rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search appointments..."
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <select
                  className="pl-4 pr-10 py-2 border rounded-md w-full appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  <option value="all">All Doctors</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="pl-4 pr-10 py-2 border rounded-md w-full appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no-show">No Show</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <input
                  type="date"
                  className="pl-4 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader columns={columns} />
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.doctorName}</div>
                    <div className="text-xs text-gray-500">{appointment.specialization}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.date}</div>
                    <div className="text-xs text-gray-500">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={appointment.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openViewModal(appointment)}
                      className="text-primary-500 hover:text-primary-600 inline-flex items-center"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="ml-1 hidden sm:inline">View</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Appointment Details"
      >
        {viewingAppointment && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Patient</h3>
                <p className="mt-1 text-sm text-gray-900">{viewingAppointment.patientName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Doctor</h3>
                <p className="mt-1 text-sm text-gray-900">{viewingAppointment.doctorName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Specialization</h3>
                <p className="mt-1 text-sm text-gray-900">{viewingAppointment.specialization}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                <p className="mt-1 text-sm text-gray-900">{viewingAppointment.date} at {viewingAppointment.time}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-1">
                  <StatusBadge status={viewingAppointment.status} />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Appointment ID</h3>
                <p className="mt-1 text-sm text-gray-900">{viewingAppointment.id}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateAppointmentStatus(viewingAppointment.id, 'confirmed')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    viewingAppointment.status === 'confirmed'
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => updateAppointmentStatus(viewingAppointment.id, 'completed')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    viewingAppointment.status === 'completed'
                      ? 'bg-success text-white'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => updateAppointmentStatus(viewingAppointment.id, 'cancelled')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    viewingAppointment.status === 'cancelled'
                      ? 'bg-error text-white'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  Cancelled
                </button>
                <button
                  onClick={() => updateAppointmentStatus(viewingAppointment.id, 'no-show')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    viewingAppointment.status === 'no-show'
                      ? 'bg-warning text-white'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  No Show
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Appointments;