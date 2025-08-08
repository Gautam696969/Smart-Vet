import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clinic } from "../types/types";
import TablePagination from '@mui/material/TablePagination';

const ClinicTable: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>( [] );
  const [currentPage, setCurrentPage] = useState( 1 );
  const [totalPages, setTotalPages] = useState( 1 );
  const [loading, setLoading] = useState( true );
  const [page, setPage] = React.useState( 2 );
  const [rowsPerPage, setRowsPerPage] = React.useState( 10 );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage( newPage );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage( parseInt( event.target.value, 10 ) );
    setPage( 0 );
  };

  const getData = async () => {
    setLoading( true );

    try {
      localStorage.getItem( `eyJpdiI6ImVhY1BpSzJMWGozVDNkTmltSDJJdVE9PSIsInZhbHVlIjoiazBvdXNVeUxOeU9VeXRvSVl5ejJaeGRnMC8razl4d2s3WmVLNS85RlRRa1RmVVVNek9NczZFNW8xQTltdU1CakxqTTdKc1ltZ2hGWk9sVzMwWDJJRm5oZGZRYTRuNUlVenVwanl6cXVrYi9PdTIrOEZLWG5nMEFDM2RjVFV2NW8iLCJtYWMiOiI4NDFiM2Q3ZDM1NGI3ZjA2Njk2MWNiYTA5NDVlMzIwOTQ0ZDM0MDIwMjcwNzhjYzkxOGRjYzE4NmQ5NTY5Y2IxIiwidGFnIjoiIn0%3D` );
      const res = await axios.get( `/api/clinics?page=${currentPage}` );
      console.log( res, "api data" );
      setClinics( res.data.clinics || [] );
      setTotalPages( res.data.totalPages || 1 );
      console.log( res, "api data" );
    } catch ( err ) {
      setClinics( [] );

    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    getData();
  }, [currentPage] );

  return (
    <div className="mt-5 px-2 sm:px-4">
      {loading ? (
        <p className="text-center text-lg font-medium">Loading...</p>
      ) : (
        <>
          <div className="w-full overflow-x-auto rounded-md shadow-sm bg-white dark:bg-gray-900">
            <table className="min-w-[600px] w-full table-auto border-collapse">
              <thead>
                <tr className="text-left border border-gray-500 ">
                  <th className="p-3 font-normal text-sm text-gray-600">Name</th>
                  <th className="p-3 font-normal text-sm text-gray-600">Email</th>
                  <th className="p-3 font-normal text-sm text-gray-600">Phone</th>
                  <th className="p-3 font-normal text-sm text-gray-600">Address</th>
                  <th className="p-3 font-normal text-sm text-gray-600">Status</th>
                  <th className="p-3 font-normal text-sm text-gray-600">Actions</th>
                </tr>
                <tr className="text-left border border-gray-500">
                  <th className="p-3 font-normal">Pal Gautam</th>
                  <th className="p-3 font-normal">palgautam69@gmail.com</th>
                  <th className="p-3 font-normal">0953737583</th>
                  <th className="p-3 font-normal">AJI Dem, Rajkot</th>
                  <th className="p-3 font-normal"></th>
                  <th className="p-3 font-normal">
                    <td className="p-3 space-x-2">
                      <span className="text-red-600 hover:text-red-800 cursor-pointer text-lg">🗑️</span>
                      <span className="text-teal-600 hover:text-teal-800 cursor-pointer text-lg">✏️</span>
                    </td>
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-4 text-white">
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                '& .MuiTablePagination-toolbar': {
                  color: 'grey',
                },
                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                  color: 'grey',
                },
                '& .MuiSelect-icon': {
                  color: 'grey',
                },
                '& .MuiPaginationItem-root': {
                  color: 'grey',
                },
                '& .Mui-selected': {
                  backgroundColor: '#1f2937 !important',
                  color: '#00ffff',
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ClinicTable;
