import React, { useState } from 'react';

function EmployeeModal( { onClose, onAdd } ) {
  const [FirstName, setFirstName] = useState( '' );
  const [LastName, setLastName] = useState( '' );
  const [position, setPosition] = useState( '' );
  const [phone, setPhone] = useState( '' );
  const [avatar, setAvatar] = useState( '' );
  const [Email, setEmail] = useState( '' );
  const [TimeZone, setTimeZone] = useState( '' );

  const handleAddEmployee = () => {
    if ( !FirstName || !LastName || !Email || !phone || !TimeZone ) {
      alert( 'Please fill in all fields.' );
      return;
    }
    const newEmployee = { id: Date.now(), FirstName, LastName, position, phone, avatar, Email };
    onAdd( newEmployee );
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md">
        <h2 className="text-lg mb-4">Create New Employee</h2>

        {/* Form Start */}
        <form
          onSubmit={( e ) => {
            e.preventDefault(); // stop page reload
            handleAddEmployee(); // call your function
          }}
        >
          <input
            type="text"
            placeholder="First Name"
            className="border p-2 w-full mb-3"
            value={FirstName}
            onChange={( e ) => setFirstName( e.target.value )}
          />

          <input
            type="text"
            placeholder="Last Name"
            className="border p-2 w-full mb-3"
            value={LastName}
            onChange={( e ) => setLastName( e.target.value )}
          />

          <input
            type="email"
            placeholder="Enter email"
            className="border p-2 w-full mb-3"
            value={Email}
            onChange={( e ) => setEmail( e.target.value )}
          />

          <input
            type="number"
            placeholder="Phone"
            className="border p-2 w-full mb-3"
            value={phone}
            onChange={( e ) => {
              const value = e.target.value;
              if ( /^\d{0,10}$/.test( value ) ) {
                setPhone( value );
              }
            }}
          />

          <select
            className="border p-2 w-full mb-3"
            value={TimeZone}
            onChange={( e ) => setTimeZone( e.target.value )}
          >
            <option value="">Select Timezone</option>
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
        {/* Form End */}
      </div>
    </div>
  );
}

export default EmployeeModal;
