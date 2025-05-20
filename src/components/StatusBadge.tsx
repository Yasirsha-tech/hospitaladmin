import React from 'react';

type StatusType = 
  | 'active' 
  | 'inactive' 
  | 'available' 
  | 'booked' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled' 
  | 'no-show';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return 'bg-success bg-opacity-10 text-success';
      case 'available':
        return 'bg-success bg-opacity-10 text-success';
      case 'confirmed':
        return 'bg-primary-500 bg-opacity-10 text-primary-500';
      case 'completed':
        return 'bg-success bg-opacity-10 text-success';
      case 'inactive':
        return 'bg-gray-200 text-gray-600';
      case 'booked':
        return 'bg-primary-500 bg-opacity-10 text-primary-500';
      case 'cancelled':
        return 'bg-error bg-opacity-10 text-error';
      case 'no-show':
        return 'bg-warning bg-opacity-10 text-warning';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  const getStatusText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;