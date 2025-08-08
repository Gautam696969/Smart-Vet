import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';

type Employee = {
  id: number;
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

  const fetchEmployees = async (): Promise<Employee[]> => {
    localStorage.setItem( 'token', 'EmployeeData' );
    const token = localStorage.getItem( 'token' );
    const { data } = await axios.get( 'https://jeremy.smart.vet/professionals?per_page=12', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } );
    return ( data?.data || [] ).map( ( emp: any ) => ( {
      id: emp.id,
      name: emp.name || emp.full_name || 'Unknown',
      featured: !!emp.featured,
      consulting: !!emp.is_consulting,
      avatar: emp.avatar_url || '',
      view: true,
      clock: false,
      position: emp.profession || emp.specialization || '',
    } ) );
  };

  useEffect( () => {
    const loadEmployees = async () => {
      try {
        const mapped = await fetchEmployees();
        setEmployees( mapped );
      } catch ( err ) {
        setError( 'Failed to load employees' );
      } finally {
        setLoading( false );
      }
    };
    loadEmployees();
  }, [] );

  if ( loading ) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if ( error ) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map( ( emp ) => (
          <div
            key={emp.id}
            className="bg-white shadow rounded-lg flex flex-col justify-between hover:shadow-xl transition-all"
          >
            {/* Header */}
            <div className="flex items-center p-4 border-b">
              <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center text-white text-2xl mr-3">
                {emp.avatar ? (
                  <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full object-cover" />
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
                {emp.position && <div className="text-xs text-gray-500">{emp.position}</div>}
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 px-4 py-3 border-b">
              {emp.featured && (
                <span className="flex items-center bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  Featured <FaStar className="ml-1 text-gray-500" />
                </span>
              )}
              <span
                className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${emp.consulting ? 'bg-green-400 text-white' : 'bg-gray-300 text-gray-700'
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
  );
};

export default Employees;
