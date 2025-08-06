import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  CircularProgress,
  Alert,
  Button as MuiButton,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../../shared/hooks/useAuthFetch";
import { ITEMS_PER_PAGE_OPTIONS } from '../../shared/utils/constants/paginationConstants'
// Local green theme for this page only
const greenTheme = createTheme({
  palette: {
    primary: {
      main: '#219653', // Green
      contrastText: '#fff',
    },
    success: {
      main: '#27ae60',
      contrastText: '#fff',
    },
  },
});

const statusColors: Record<string, "success" | "warning" | "default"> = {
  Open: "success",
  Closed: "warning",
  Canceled: "warning",
};

const typeIcons: Record<string, React.ReactNode> = {
  "Home Health service": <HomeIcon fontSize="small" />,
  "Phone Consultation with a Veterinarian": <PhoneIcon fontSize="small" />,
  "Video Consultation with a Veterinarian": <VideocamIcon fontSize="small" />,
};

const columns = [
  { label: "Actions", minWidth: 60 },
  { label: "Type", minWidth: 120 },
  { label: "Date Opened", minWidth: 160 },
  { label: "Appointment Date", minWidth: 160 },
  { label: "Client Name", minWidth: 120 },
  { label: "Professional", minWidth: 120 },
  { label: "Status", minWidth: 80 },
  { label: "Payment", minWidth: 100 },
];


const DEMO_ROWS = 40;


const AppointmentHistoryPage: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [sortBy, setSortBy] = useState<string>('dateOpened');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      // Generate more demo data
      const demo = [];
      const services = [
        "Home Health service",
        "Phone Consultation with a Veterinarian",
        "Video Consultation with a Veterinarian",
      ];
      const professionals = ["Rajesh Desai", "John Morrision", "Not Assigned"];
      const clients = ["dj cloudpeak", "Harshad Mehta", "Arman Malik", "Jaydev Vara", "Test User Test User Last name", "Harish C. Mirchandani"];
      const statuses = ["Open", "Closed", "Canceled"];
      for (let i = 1; i <= DEMO_ROWS; i++) {
        demo.push({
          id: i,
          service: services[i % services.length],
          dateOpened: `2025-07-${(20 + (i % 10)).toString().padStart(2, '0')}T${(8 + (i % 12)).toString().padStart(2, '0')}:00:00`,
          scheduledAt: `2025-07-${(25 + (i % 5)).toString().padStart(2, '0')}T${(10 + (i % 12)).toString().padStart(2, '0')}:00:00`,
          clientName: clients[i % clients.length],
          professional: professionals[i % professionals.length],
          status: statuses[i % statuses.length],
          payment: "No Charge",
        });
      }
      setAppointments(demo);
      setLoading(false);
    }, 1000);
  }, []);


  // Searching
  const filtered = appointments.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.service?.toLowerCase().includes(q) ||
      a.clientName?.toLowerCase().includes(q) ||
      a.professional?.toLowerCase().includes(q) ||
      a.status?.toLowerCase().includes(q)
    );
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    if (sortBy === 'dateOpened' || sortBy === 'scheduledAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const paginated = sorted.slice(page * rowsPerPage, (page + 1) * rowsPerPage);


  return (
    <ThemeProvider theme={greenTheme}>
      <Box className="min-h-screen bg-gray-50 py-6 px-2">
        <Typography variant="h4" fontWeight={700} color="primary" mb={1}>
          Appointment History
        </Typography>
        <Typography mb={2}>
          The following section contains a complete list of all appointments, past & present. Please click on the action icon to start a new appointment or access the past appointment.
        </Typography>
        <Paper elevation={2} className="w-full overflow-x-auto p-4" sx={{ borderRadius: 4, background: "#fff" }}>
          <Box className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <TextField
              size="small"
              placeholder="Search"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0); }}
              InputProps={{
                startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
              }}
              sx={{ minWidth: 250 }}
            />
            <Box className="flex gap-2">
              <MuiButton variant="contained" color="primary" startIcon={<FilterListIcon />}>
                FILTER
              </MuiButton>
              <MuiButton variant="contained" color="primary" startIcon={<CloudDownloadIcon />}>
                EXPORT
              </MuiButton>
            </Box>
          </Box>
          {loading ? (
            <Box className="flex justify-center py-8">
              <CircularProgress color="primary" />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((col, idx) => (
                      <TableCell
                        key={col.label}
                        style={{ minWidth: col.minWidth, cursor: idx > 0 ? 'pointer' : undefined }}
                        onClick={idx > 0 ? () => {
                          const key = [
                            null,
                            'service',
                            'dateOpened',
                            'scheduledAt',
                            'clientName',
                            'professional',
                            'status',
                            'payment',
                          ][idx];
                          if (key) {
                            if (sortBy === key) {
                              setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortBy(key);
                              setSortDir('asc');
                            }
                          }
                        } : undefined}
                        sx={{ color: idx > 0 && sortBy === [
                          null,
                          'service',
                          'dateOpened',
                          'scheduledAt',
                          'clientName',
                          'professional',
                          'status',
                          'payment',
                        ][idx] ? greenTheme.palette.primary.main : undefined }}
                      >
                        {col.label}
                        {idx > 0 && sortBy === [
                          null,
                          'service',
                          'dateOpened',
                          'scheduledAt',
                          'clientName',
                          'professional',
                          'status',
                          'payment',
                        ][idx] && (
                          <span style={{ fontSize: 12, marginLeft: 2 }}>
                            {sortDir === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginated.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        No appointments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginated.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`/appointments/${row.id}`)}
                            aria-label="View details"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          {typeIcons[row.service] || null} {row.service}
                        </TableCell>
                        <TableCell>
                          {row.dateOpened ? new Date(row.dateOpened).toLocaleString() : "-"}
                        </TableCell>
                        <TableCell>
                          {row.scheduledAt ? new Date(row.scheduledAt).toLocaleString() : row.status === "Pending" ? "Pending" : "-"}
                        </TableCell>
                        <TableCell>{row.clientName}</TableCell>
                        <TableCell>{row.professional}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            color={statusColors[row.status] || "default"}
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.payment || "No Charge"}
                            color="success"
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {/* Table Footer Pagination using MUI TablePagination */}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
                colSpan={columns.length}
                count={sorted.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_e, newPage) => setPage(newPage)}
                onRowsPerPageChange={e => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                labelRowsPerPage="Rows per page:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                sx={{ border: 0, '.MuiTablePagination-toolbar': { justifyContent: 'flex-end' } }}
              />
            </TableRow>
          </TableFooter>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default AppointmentHistoryPage;
