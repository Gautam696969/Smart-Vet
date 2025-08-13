import React, { useState } from "react";


interface EmployeeModalProps {
  onClose: () => void;
  onSubmit: ( data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    timezone: string;
  } ) => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ( { onClose, onSubmit } ) => {
  console.log( 'test', onSubmit )
  const [firstName, setFirstName] = useState( "" );
  const [lastName, setLastName] = useState( "" );
  const [email, setEmail] = useState( "" );
  const [phone, setPhone] = useState( "" );
  const [timezone, setTimezone] = useState( "" );



  const handleSubmit = () => {
    onSubmit( { firstName, lastName, email, phone, timezone } );

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add New Employee</h2>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={( e ) => setFirstName( e.target.value )}
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={( e ) => setLastName( e.target.value )}
          className="border p-2 w-full mb-3"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={( e ) => setEmail( e.target.value )}
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={( e ) => {
            let value = e.target.value;
            if ( /^[0-9]{0,10}$/.test( value ) ) {
              setPhone( value );
            }
          }}
          className="border p-2 w-full mb-3"
        />
        <select
          value={timezone}
          onChange={( e ) => setTimezone( e.target.value )}
          className="border p-2 w-full mb-3"
        >
          <option value="">Select Timezone</option>
          <option value="UTC">London</option>
          <option value="GMT">USA</option>
          <option value="EST">DELHI</option>
          <option value="CST">AMERICA</option>
          <option value="MST">Dubai</option>
          <option value="PST">Rajkot</option>
        </select>

        <div className="flex justify-end gap-2">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>


    </div>
  );
};

export default EmployeeModal;
