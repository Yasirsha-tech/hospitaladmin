import React, { useState } from 'react';
import { PlusCircle, Search, Filter, Clock } from 'lucide-react';
import Modal from '../components/Modal';
import { slots as initialSlots, doctors, Slot } from '../data/mockData';

const SlotManagement: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    status: 'available',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedDoctor = doctors.find(d => d.id === formData.doctorId);
    
    if (!selectedDoctor) {
      alert('Please select a doctor');
      return;
    }
    
    const newSlot: Slot = {
      id: `s${slots.length + 1}`,
      doctorId: formData.doctorId,
      doctorName: selectedDoctor.name,
      date: formData.date,
      time: formData.time,
      status: formData.status as 'available' | 'booked',
    };
    
    setSlots([...slots, newSlot]);
    setIsModalOpen(false);
  };

  const toggleSlotSelection = (slotId: string) => {
    setSelectedSlots(prev => 
      prev.includes(slotId)
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const filteredSlots = slots.filter(slot => {
    const matchesQuery = 
      slot.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slot.date.includes(searchQuery) ||
      slot.time.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDoctor = selectedDoctor === 'all' || slot.doctorId === selectedDoctor;
    const matchesDate = !selectedDate || slot.date === selectedDate;
    
    return matchesQuery && matchesDoctor && matchesDate;
  });

  // Group slots by time for grid layout
  const timeSlots = Array.from(new Set(filteredSlots.map(slot => slot.time))).sort();
  const doctorsList = selectedDoctor === 'all' 
    ? doctors 
    : doctors.filter(d => d.id === selectedDoctor);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Slot Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Slot
        </button>
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
                placeholder="Search slots..."
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

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-success rounded mr-2"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-error rounded mr-2"></div>
                <span className="text-sm text-gray-600">Booked</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Unavailable</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-primary-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>
            </div>
          </div>

          {doctorsList.map(doctor => (
            <div key={doctor.id} className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{doctor.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {timeSlots.map(time => {
                  const slot = filteredSlots.find(s => 
                    s.doctorId === doctor.id && s.time === time
                  );

                  if (!slot) return null;

                  const isSelected = selectedSlots.includes(slot.id);
                  const isAvailable = slot.status === 'available';
                  const isBooked = slot.status === 'booked';

                  return (
                    <button
                      key={`${doctor.id}-${time}`}
                      onClick={() => isAvailable && toggleSlotSelection(slot.id)}
                      disabled={!isAvailable}
                      className={`
                        relative p-4 rounded-lg transition-all transform hover:scale-105
                        ${isSelected ? 'bg-primary-500 text-white' : 
                          isAvailable ? 'bg-success bg-opacity-20 text-success hover:bg-opacity-30' :
                          isBooked ? 'bg-error bg-opacity-20 text-error' : 'bg-gray-200 text-gray-500'
                        }
                        ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}
                      `}
                    >
                      <Clock className="h-5 w-5 mx-auto mb-2" />
                      <div className="text-sm font-medium">{time}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Slot"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">
              Doctor
            </label>
            <select
              id="doctorId"
              name="doctorId"
              required
              value={formData.doctorId}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select Doctor</option>
              {doctors.filter(d => d.status === 'active').map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} ({doctor.specialization})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              value={formData.time}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SlotManagement;