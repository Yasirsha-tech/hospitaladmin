import React, { useState } from 'react';
import { Building2, Phone, Mail, Ambulance, Image as ImageIcon, Save } from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  description: string;
}

const facilities: Facility[] = [
  { id: 'icu', name: 'ICU', description: 'Intensive Care Unit' },
  { id: 'xray', name: 'X-Ray', description: 'Radiological Imaging' },
  { id: 'lab', name: 'Laboratory', description: 'Medical Testing Facility' },
  { id: 'emergency', name: 'Emergency', description: '24/7 Emergency Services' },
  { id: 'operation', name: 'Operation Theatre', description: 'Surgical Facilities' },
  { id: 'pharmacy', name: 'Pharmacy', description: '24/7 Pharmacy Services' },
  { id: 'blood_bank', name: 'Blood Bank', description: 'Blood Storage & Supply' },
  { id: 'mri', name: 'MRI', description: 'Magnetic Resonance Imaging' },
  { id: 'ct_scan', name: 'CT Scan', description: 'Computerized Tomography' },
];

const HospitalProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'City General Hospital',
    address: '123 Healthcare Avenue, Medical District',
    phone: '+1 (555) 123-4567',
    email: 'info@citygeneralhospital.com',
    ambulance: '911',
    selectedFacilities: ['icu', 'emergency', 'pharmacy'],
    logo: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFacilityToggle = (facilityId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFacilities: prev.selectedFacilities.includes(facilityId)
        ? prev.selectedFacilities.filter(id => id !== facilityId)
        : [...prev.selectedFacilities, facilityId]
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hospital Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
            isEditing 
              ? 'bg-success hover:bg-green-600' 
              : 'bg-primary-500 hover:bg-primary-600'
          }`}
          disabled={isSaving}
        >
          {isSaving ? (
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </div>
          ) : (
            <>
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-card rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Hospital Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1">
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    disabled={!isEditing}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="ambulance" className="block text-sm font-medium text-gray-700">
                  Ambulance Service Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Ambulance className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="ambulance"
                    id="ambulance"
                    disabled={!isEditing}
                    value={formData.ambulance}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-card rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Available Facilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {facilities.map((facility) => (
                <div key={facility.id} className="relative">
                  <div className={`
                    p-4 rounded-lg border-2 transition-colors cursor-pointer
                    ${!isEditing && 'pointer-events-none'}
                    ${formData.selectedFacilities.includes(facility.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => handleFacilityToggle(facility.id)}
                  >
                    <h3 className="font-medium text-gray-900">{facility.name}</h3>
                    <p className="text-sm text-gray-500">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white shadow-card rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Hospital Logo</h2>
            <div className="space-y-4">
              <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center">
                {formData.logo ? (
                  <div className="relative w-full h-full">
                    <img
                      src={formData.logo}
                      alt="Hospital Logo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {isEditing && (
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, logo: '' }))}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label
                        htmlFor="file-upload"
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                          !isEditing && 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        Upload Logo
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        disabled={!isEditing}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData(prev => ({
                                ...prev,
                                logo: reader.result as string
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;