import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: ( clinic: any ) => void; // callback to update parent
};

const ClinicModal: React.FC<Props> = ( { isOpen, onClose, onSubmitSuccess } ) => {
  const [formData, setFormData] = useState( {
    name: "",
    country: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    postalCode: "",
  } );

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
    setFormData( { ...formData, [e.target.name]: e.target.value } );
  };

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault();

    // 💡 Normally yahan API call hoti hai
    const newClinic = { ...formData, id: Date.now() }; // temp ID
    onSubmitSuccess( newClinic ); // send data to parent
    onClose(); // close modal
  };

  if ( !isOpen ) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition: all 0.3s ease-in-out;">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">New Clinic</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-b border-gray-300 py-2 outline-none"
          />

          <div className="flex gap-4">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
               className="w-1/2 border-b border-gray-300 py-2 outline-none"
            >
              <option value="">Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-1/2 border-b border-gray-300 py-2 outline-none"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b border-orange-500 py-2 outline-none text-orange-600"
          />

          <input
            name="address1"
            placeholder="Address Line 1"
            onChange={handleChange}
            value={formData.address1}
            className="w-full border-b border-gray-300 py-2 outline-none"
          />
          <input
            name="address2"
            placeholder="Address Line 2"
            onChange={handleChange}
            value={formData.address2}
            className="w-full border-b border-gray-300 py-2 outline-none"
          />
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={formData.city}
            className="w-full border-b border-gray-300 py-2 outline-none"
          />
          <input
            name="province"
            placeholder="Province"
            onChange={handleChange}
            value={formData.province}
            className="w-full border-b border-gray-300 py-2 outline-none"
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            onChange={handleChange}
            value={formData.postalCode}
            className="w-full border-b border-gray-300 py-2 outline-none"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClinicModal;
