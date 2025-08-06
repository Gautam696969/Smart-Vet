import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCamera, FiSave, FiX } from 'react-icons/fi';
import i18next from 'i18next';

const ClientEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In a real app, fetch client data by id and populate form
  const [firstName, setFirstName] = useState('Arman');
  const [lastName, setLastName] = useState('Malik');
  const [email, setEmail] = useState('midixa1060@forexru.com');
  const [country, setCountry] = useState('Australia (+61)');
  const [phone, setPhone] = useState('40-1545-5788');
  const [timezone, setTimezone] = useState('Hawaii Time');
  const [idNumber, setIdNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addressCountry, setAddressCountry] = useState('');
  // Add state for image file and preview
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('https://via.placeholder.com/100');

  const handleSave = () => {
    // Save logic here (API call)
    // For demo, include image file name if selected
    alert(
      `Client ${id} saved:\n` +
      `Name: ${firstName} ${lastName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Date of Birth: ${dateOfBirth}\n` +
      `Gender: ${gender}\n` +
      `Occupation: ${occupation}\n` +
      `Image: ${imageFile ? imageFile.name : 'No change'}`
    );
    navigate(`/clients/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="w-full px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 text-gray-700 dark:text-gray-300 font-medium"
            >
              <FiArrowLeft className="text-lg" />
              {i18next.t('common.back')}
            </button>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {i18next.t('client.editClient')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {i18next.t('client.updateInfo')}
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full px-6 py-8">
        <div className="w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Profile Image Section */}
              <div className="lg:w-1/3 h-fit bg-gradient-to-br from-[#145824] to-[#1a6b2e] flex flex-col items-center justify-center p-8">
                <h2 className="text-xl font-semibold text-white mb-6">{i18next.t('common.profileImage')}</h2>
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Client"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <FiCamera className="text-white text-2xl" />
                    </div>
                  </div>
                  <div className="text-center">
                    <label className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#145824] px-6 py-3 rounded-xl font-medium cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg w-full">
                      <FiCamera className="text-lg" />
                      {i18next.t('common.chooseImage')}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImageFile(file);
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              if (ev.target?.result) setImagePreview(ev.target.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <p className="text-white text-sm mt-3 opacity-90">
                      {i18next.t('common.chooseImageInfo')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Form Content */}
              <div className="lg:w-2/3 p-8">
                {/* Personal Information */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  {i18next.t('client.personalInformation')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="firstName">
                      {i18next.t('common.firstName')} *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="lastName">
                      {i18next.t('common.lastName')} *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="email">
                      {i18next.t('common.email')} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="country">
                      {i18next.t('common.country')} *
                    </label>
                    <select
                      id="country"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      <option>Australia (+61)</option>
                      <option>USA (+1)</option>
                      <option>UK (+44)</option>
                      <option>India (+91)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="phone">
                      {i18next.t('common.phoneNumber')} *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="timezone">
                      {i18next.t('common.selectTimezone')} *
                    </label>
                    <select
                      id="timezone"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      required
                    >
                      <option>Hawaii Time</option>
                      <option>Pacific Time</option>
                      <option>Mountain Time</option>
                      <option>Central Time</option>
                      <option>Eastern Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="idNumber">
                      ID Number
                    </label>
                    <input
                      id="idNumber"
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="dateOfBirth">
                      {i18next.t('common.dob')}
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="gender">
                      {i18next.t('common.gender')}
                    </label>
                    <select
                      id="gender"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="occupation">
                      {i18next.t('common.occupation')}
                    </label>
                    <input
                      id="occupation"
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {i18next.t('common.addressInformation')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="addressLine1">
                        {i18next.t('common.addressLine1')}
                      </label>
                      <input
                        id="addressLine1"
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="addressLine2">
                        {i18next.t('common.addressLine2')}
                      </label>
                      <input
                        id="addressLine2"
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="city">
                        {i18next.t('common.city')}
                      </label>
                      <input
                        id="city"
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="province">
                        {i18next.t('common.provience')}
                      </label>
                      <input
                        id="province"
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="postalCode">
                        {i18next.t('common.postalCode')}
                      </label>
                      <input
                        id="postalCode"
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="addressCountry">
                        {i18next.t('common.country')}
                      </label>
                      <input
                        id="addressCountry"
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                        value={addressCountry}
                        onChange={(e) => setAddressCountry(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-200"
                  >
                    <FiX className="text-lg" />
                    {i18next.t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#145824] to-[#1a6b2e] hover:from-[#1a6b2e] hover:to-[#145824] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <FiSave className="text-lg" />
                    {i18next.t('common.saveChanges')}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientEditPage;