import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAuthFetch } from "../../../shared/hooks/useAuthFetch";
import { useApiStatus } from "../../../shared/context/ApiStatusContext";
import Loader from "../../../shared/components/Loader";
import ErrorSnackbar from "../../../shared/components/ErrorSnackbar";

interface User {
  id: number;
  email: string;
  full_name?: string;
  mobile?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  date_of_birth?: string;
}

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "email", headerName: "Email", width: 180 },
  { field: "full_name", headerName: "Full Name", width: 160 },
  { field: "mobile", headerName: "Mobile", width: 130 },
  { field: "address_line1", headerName: "Address Line 1", width: 160 },
  { field: "address_line2", headerName: "Address Line 2", width: 160 },
  { field: "city", headerName: "City", width: 120 },
  { field: "state", headerName: "State", width: 120 },
  { field: "postal_code", headerName: "Postal Code", width: 120 },
  { field: "country", headerName: "Country", width: 120 },
  { field: "date_of_birth", headerName: "Date of Birth", width: 140 },
  {
    field: "actions",
    headerName: "Actions",
    width: 110,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <div>
        <IconButton
          aria-label="edit"
          size="small"
          color="primary"
          onClick={() => alert(`Edit user ${params.row.id}`)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          color="error"
          onClick={() => alert(`Delete user ${params.row.id}`)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    ),
  },
];

const MUPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const authFetch = useAuthFetch();
  const { loading } = useApiStatus();

  useEffect(() => {
    const fetchUsers = async () => {
      setError(null);
      try {
        const apiPage = paginationModel.page + 1;
        const apiLimit = paginationModel.pageSize;
        const url = `http://localhost:3000/v1/users?page=${apiPage}&limit=${apiLimit}`;
        const response = await authFetch(url, {
          headers: {
            accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        const apiUsers = result?.data?.data || [];
        setUsers(
          apiUsers.map((u: any) => ({
            id: u.id,
            email: u.email,
            full_name: u.full_name,
            mobile: u.mobile,
            address_line1: u.address_line1,
            address_line2: u.address_line2,
            city: u.city,
            state: u.state,
            postal_code: u.postal_code,
            country: u.country,
            date_of_birth: u.date_of_birth,
          }))
        );
        setRowCount(result?.data?.total || 0);
      } catch (err: any) {
        const msg = err.message || "Failed to fetch users";
        setError(msg);
        if (msg === "Failed to fetch") {
          setShowSnackbar(true);
          setTimeout(() => {
            setShowSnackbar(false);
          }, 2000);
        }
      }
    };
    fetchUsers();
    // eslint-disable-next-line
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">MU Page</h2>
      <div className="mb-4">
        <p>Welcome to the MU section. This is a placeholder page.</p>
      </div>
      <div style={{ height: 500, width: "100%", background: "#fff", position: "relative" }}>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255,255,255,0.7)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.5rem",
            }}
          >
            <Loader />
          </div>
        )}
        <DataGrid
          rows={users}
          columns={columns}
          pagination
          paginationMode="server"
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </div>
      <ErrorSnackbar
        message={showSnackbar && error === "Failed to fetch" ? "Failed to fetch users." : ""}
        onClose={() => setShowSnackbar(false)}
      />
      {error && error !== "Failed to fetch" && (
        <div className="p-4 text-red-600">Error: {error}</div>
      )}
    </div>
  );
};

export default MUPage;