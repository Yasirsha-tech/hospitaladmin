// Types
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  timings: string;
  status: 'active' | 'inactive';
  image: string;
  patients: number;
  appointments: number;
}

export interface Slot {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'available' | 'booked';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  specialization: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  appointments: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'cancellation' | 'system' | 'reminder';
}

// Mock data
export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    timings: '9:00 AM - 5:00 PM',
    status: 'active',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    patients: 42,
    appointments: 12
  },
  {
    id: 'd2',
    name: 'Dr. Sarah Johnson',
    specialization: 'Neurology',
    timings: '10:00 AM - 6:00 PM',
    status: 'active',
    image: 'https://images.pexels.com/photos/5214961/pexels-photo-5214961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    patients: 38,
    appointments: 8
  },
  {
    id: 'd3',
    name: 'Dr. Michael Chen',
    specialization: 'Pediatrics',
    timings: '8:00 AM - 4:00 PM',
    status: 'active',
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    patients: 65,
    appointments: 15
  },
  {
    id: 'd4',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Dermatology',
    timings: '11:00 AM - 7:00 PM',
    status: 'inactive',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    patients: 29,
    appointments: 0
  },
  {
    id: 'd5',
    name: 'Dr. Robert Wilson',
    specialization: 'Orthopedics',
    timings: '9:00 AM - 5:00 PM',
    status: 'active',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    patients: 51,
    appointments: 10
  }
];

export const slots: Slot[] = [
  { id: 's1', doctorId: 'd1', doctorName: 'Dr. John Smith', date: '2025-03-15', time: '9:00 AM', status: 'available' },
  { id: 's2', doctorId: 'd1', doctorName: 'Dr. John Smith', date: '2025-03-15', time: '10:00 AM', status: 'booked' },
  { id: 's3', doctorId: 'd1', doctorName: 'Dr. John Smith', date: '2025-03-15', time: '11:00 AM', status: 'available' },
  { id: 's4', doctorId: 'd2', doctorName: 'Dr. Sarah Johnson', date: '2025-03-15', time: '10:00 AM', status: 'available' },
  { id: 's5', doctorId: 'd2', doctorName: 'Dr. Sarah Johnson', date: '2025-03-15', time: '11:00 AM', status: 'booked' },
  { id: 's6', doctorId: 'd3', doctorName: 'Dr. Michael Chen', date: '2025-03-16', time: '9:00 AM', status: 'available' },
  { id: 's7', doctorId: 'd3', doctorName: 'Dr. Michael Chen', date: '2025-03-16', time: '10:00 AM', status: 'available' },
  { id: 's8', doctorId: 'd5', doctorName: 'Dr. Robert Wilson', date: '2025-03-16', time: '2:00 PM', status: 'booked' },
  { id: 's9', doctorId: 'd5', doctorName: 'Dr. Robert Wilson', date: '2025-03-16', time: '3:00 PM', status: 'available' },
  { id: 's10', doctorId: 'd1', doctorName: 'Dr. John Smith', date: '2025-03-16', time: '4:00 PM', status: 'available' }
];

export const appointments: Appointment[] = [
  { 
    id: 'a1', 
    patientId: 'p1', 
    patientName: 'James Wilson', 
    doctorId: 'd1', 
    doctorName: 'Dr. John Smith', 
    date: '2025-03-15', 
    time: '10:00 AM',
    status: 'confirmed',
    specialization: 'Cardiology'
  },
  { 
    id: 'a2', 
    patientId: 'p2', 
    patientName: 'Maria Garcia', 
    doctorId: 'd2', 
    doctorName: 'Dr. Sarah Johnson', 
    date: '2025-03-15', 
    time: '11:00 AM',
    status: 'confirmed',
    specialization: 'Neurology'
  },
  { 
    id: 'a3', 
    patientId: 'p3', 
    patientName: 'Robert Brown', 
    doctorId: 'd5', 
    doctorName: 'Dr. Robert Wilson', 
    date: '2025-03-16', 
    time: '2:00 PM',
    status: 'confirmed',
    specialization: 'Orthopedics'
  },
  { 
    id: 'a4', 
    patientId: 'p4', 
    patientName: 'Jennifer Lee', 
    doctorId: 'd1', 
    doctorName: 'Dr. John Smith', 
    date: '2025-03-14', 
    time: '3:00 PM',
    status: 'completed',
    specialization: 'Cardiology'
  },
  { 
    id: 'a5', 
    patientId: 'p5', 
    patientName: 'David Miller', 
    doctorId: 'd3', 
    doctorName: 'Dr. Michael Chen', 
    date: '2025-03-14', 
    time: '9:00 AM',
    status: 'no-show',
    specialization: 'Pediatrics'
  },
  { 
    id: 'a6', 
    patientId: 'p6', 
    patientName: 'Susan Martinez', 
    doctorId: 'd2', 
    doctorName: 'Dr. Sarah Johnson', 
    date: '2025-03-14', 
    time: '2:00 PM',
    status: 'cancelled',
    specialization: 'Neurology'
  },
  { 
    id: 'a7', 
    patientId: 'p1', 
    patientName: 'James Wilson', 
    doctorId: 'd3', 
    doctorName: 'Dr. Michael Chen', 
    date: '2025-03-17', 
    time: '10:00 AM',
    status: 'confirmed',
    specialization: 'Pediatrics'
  }
];

export const patients: Patient[] = [
  { id: 'p1', name: 'James Wilson', phone: '555-123-4567', email: 'james.wilson@example.com', appointments: 2 },
  { id: 'p2', name: 'Maria Garcia', phone: '555-234-5678', email: 'maria.garcia@example.com', appointments: 1 },
  { id: 'p3', name: 'Robert Brown', phone: '555-345-6789', email: 'robert.brown@example.com', appointments: 1 },
  { id: 'p4', name: 'Jennifer Lee', phone: '555-456-7890', email: 'jennifer.lee@example.com', appointments: 1 },
  { id: 'p5', name: 'David Miller', phone: '555-567-8901', email: 'david.miller@example.com', appointments: 1 },
  { id: 'p6', name: 'Susan Martinez', phone: '555-678-9012', email: 'susan.martinez@example.com', appointments: 1 }
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    title: 'New Appointment',
    message: 'James Wilson scheduled an appointment with Dr. John Smith for March 15, 10:00 AM',
    time: '2 hours ago',
    read: false,
    type: 'appointment'
  },
  {
    id: 'n2',
    title: 'Appointment Cancelled',
    message: 'Susan Martinez cancelled her appointment with Dr. Sarah Johnson on March 14',
    time: '4 hours ago',
    read: true,
    type: 'cancellation'
  },
  {
    id: 'n3',
    title: 'System Maintenance',
    message: 'System will undergo maintenance tonight from 2 AM to 4 AM',
    time: '1 day ago',
    read: false,
    type: 'system'
  },
  {
    id: 'n4',
    title: 'Doctor Status Update',
    message: 'Dr. Emily Rodriguez is now inactive',
    time: '2 days ago',
    read: true,
    type: 'system'
  },
  {
    id: 'n5',
    title: 'Appointment Reminder',
    message: 'Remind Dr. Michael Chen about his appointments tomorrow',
    time: '2 days ago',
    read: false,
    type: 'reminder'
  }
];

// Analytics data
export const appointmentChartData = [
  { name: 'Jan', value: 42 },
  { name: 'Feb', value: 55 },
  { name: 'Mar', value: 70 },
  { name: 'Apr', value: 65 },
  { name: 'May', value: 80 },
  { name: 'Jun', value: 90 },
  { name: 'Jul', value: 85 },
];

export const doctorPerformanceData = [
  { name: 'Dr. Smith', appointments: 32, patients: 42 },
  { name: 'Dr. Johnson', appointments: 28, patients: 38 },
  { name: 'Dr. Chen', appointments: 25, patients: 65 },
  { name: 'Dr. Wilson', appointments: 20, patients: 51 },
];

// Dashboard summary data
export const dashboardSummary = {
  totalDoctors: 5,
  todayAppointments: 3,
  availableSlots: 6,
  totalPatients: 6,
};