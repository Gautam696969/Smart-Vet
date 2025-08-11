import React, { useState } from 'react';

function EmployeeModal( { onClose, onAdd } ) {
  const [name, setName] = useState( '' );
  const [position, setPosition] = useState( '' );

  const handleAddEmployee = () => {
    if ( !name || !position ) return alert( "Please fill all fields" );
    const newEmployee = { id: Date.now(), name, position };
    onAdd( newEmployee );
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add New Employee</h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={( e ) => setName( e.target.value )}
        />
        <input
          type="text"
          placeholder="Position"
          className="border p-2 w-full mb-3"
          value={position}
          onChange={( e ) => setPosition( e.target.value )}
        />

        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full mb-3"
          value={position}
          onChange={( e ) => setPosition( e.target.value )}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddEmployee}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeModal;
