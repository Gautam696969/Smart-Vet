import { log } from 'console';
import React, { useEffect, useState } from 'react';
import { FaStar, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getClient } from 'shared/utils/graphqlFetch';
import EmployeeModal from './EmplyeeModel';

type Employee = {
  id: string;
  name: string;
  featured: boolean;
  consulting: boolean;
  avatar: string;
  view: boolean;
  clock: boolean;
  position: string;
};

const Employees: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>( [] );
  const [loading, setLoading] = useState( true );
  const [error, setError] = useState<string | null>( null );
  const token = localStorage.getItem( 'authToken' );
  const [query, setQuery] = useState<string>( '' );
  const [search, setSearch] = useState<string>( '' );
  const filterEmployees = employees.filter( ( employee ) =>
    employee.name.toLowerCase().includes( search.toLowerCase() )
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>( false );

  const mapApiToEmployees = ( apiData: any[] ): Employee[] => {

    return apiData.map( ( emp ) => ( {
      id: emp.id,
      name: emp.name || `${emp.first_name || ''} ${emp.last_name || ''}`.trim(),
      featured: Math.random() > 0.5,
      consulting: Math.random() > 0.5,
      avatar: emp.avatar || '',
      phone: emp.phone_number || '',
      view: true,
      clock: false,
      position: emp.position || emp.profession || ''
    } ) );
  };

  const fetchEmployees = async () => {
    if ( !token ) {
      setError( 'Token is not passed.' );
      return;
    }

    try {
      const res = await getClient( 2, false, 1, 20, '', token );
      console.log( 'API Response:', res );
      const apiData = res?.data?.getClient?.data || [];
      const mappedEmployees = mapApiToEmployees( apiData );
      setEmployees( mappedEmployees );

    } catch ( err ) {
      console.error( err );
      setError( 'Failed to load employees' );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    fetchEmployees();
  }, [] );

  if ( loading ) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if ( error ) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (

    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setIsModalOpen( true )}
        >
          New Employee
        </button>
        <input
          type="text"
          placeholder="Search employees..."
          value={query}
          onChange={( e ) => setQuery( e.target.value )}
          className="p-2 border rounded w-2/4 mx-auto border-green-400"
        />

      </div>

      <div className="min-h-screen bg-gray-50 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {employees.filter( ( employee ) =>
            employee.name.toLowerCase().includes( query )
          ).map( ( emp ) => (
            <div
              key={emp.id}
              className="bg-white shadow rounded-lg flex flex-col justify-between hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div className="flex items-center p-4 border-b">
                <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center text-white text-2xl mr-3 overflow-hidden">
                  {emp.avatar ? (
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : emp.clock ? (
                    <FaClock className="text-gray-600" />
                  ) : (
                    <span>👤</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-semibold text-lg">{emp.name}</span>
                    {emp.featured && <FaStar className="text-red-500 ml-2" />}
                  </div>
                  {emp.position && (
                    <div className="text-xs text-gray-500">{emp.position}</div>
                  )}

                  {emp.phone && (
                    <div className="text-xs text-gray-500">{emp.phone}</div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 px-4 py-3 border-b">
                <span
                  className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${emp.featured
                    ? 'bg-gray-300 text-gray-700'
                    : 'bg-gray-300 text-gray-700 opacity-50'
                    }`}
                >
                  Featured <FaStar className="ml-1 text-gray-500" />
                </span>
                <span
                  className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${emp.consulting
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-700 opacity-50'
                    }`}
                >
                  Consulting User <FaStar className="ml-1" />
                </span>
              </div>

              {/* View Button */}
              <div className="px-4 py-3 text-right">
                <button
                  className="text-gray-700 font-semibold hover:underline"
                  onClick={() => navigate( `/employees/${emp.id}` )}
                >
                  VIEW
                </button>
              </div>
            </div>
          ) )}
        </div>
      </div>
      {isModalOpen && (
        <EmployeeModal
          onClose={() => setIsModalOpen( false )}
          onSubmit={( data ) => {
            console.log( "New Employee Data:", data );
            // Optionally API call karke refresh
            setEmployees( ( prev ) => [...prev, { id: Date.now().toString(), ...data, featured: false, consulting: false, avatar: '', view: true, clock: false }] );
          }}
        />
      )}
    </div>
  );
};

export default Employees;
