import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useAuthFetch } from "../../../shared/hooks/useAuthFetch";
import { saveAs } from "file-saver";

const statusOptions = [
  { value: "", label: "All" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no_show", label: "No Show" },
];

export default function AppointmentHistoryPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: "",
    from: null as Dayjs | null,
    to: null as Dayjs | null,
  });

  const authFetch = useAuthFetch();

  const fetchAppointments = () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.from) params.append("from", filters.from.toISOString());
    if (filters.to) params.append("to", filters.to.toISOString());
    // Optionally add patientId/doctorId if needed
    authFetch(`/api/appointments?${params.toString()}`)
      .then(async (res: Response) => {
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(data || []);
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name: "from" | "to", value: Dayjs | null) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = () => {
    fetchAppointments();
  };

  const handleExport = async (type: "csv" | "json") => {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.from) params.append("from", filters.from.toISOString());
    if (filters.to) params.append("to", filters.to.toISOString());
    const url = `/api/appointments/history/export?${params.toString()}`;
    const res = await authFetch(url);
    if (!res.ok) return;
    if (type === "json") {
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      saveAs(blob, "appointments.json");
    } else {
      // For demo, just export JSON as CSV-like
      const data = await res.json();
      const csv =
        Object.keys(data[0] || {}).join(",") +
        "\n" +
        data.map((row: any) => Object.values(row).join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      saveAs(blob, "appointments.csv");
    }
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <Paper elevation={2} className="w-full max-w-4xl p-6" sx={{ borderRadius: 4, background: "#fff" }}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
          Appointment History
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box className="flex flex-wrap gap-4 mb-4">
          <TextField
            select
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            sx={{ minWidth: 150 }}
          >
            {statusOptions.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From"
              value={filters.from}
              onChange={(v) => handleDateChange("from", v)}
              sx={{ minWidth: 150 }}
            />
            <DatePicker
              label="To"
              value={filters.to}
              onChange={(v) => handleDateChange("to", v)}
              sx={{ minWidth: 150 }}
            />
          </LocalizationProvider>
          <Button variant="contained" color="primary" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => handleExport("csv")}>
            Export CSV
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => handleExport("json")}>
            Export JSON
          </Button>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Date/Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Patient</TableCell>
                  <TableCell>Timezone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>No appointments found.</TableCell>
                  </TableRow>
                ) : (
                  appointments.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.id}</TableCell>
                      <TableCell>{a.service}</TableCell>
                      <TableCell>
                        {a.scheduledAt
                          ? dayjs(a.scheduledAt).format("YYYY-MM-DD HH:mm")
                          : "-"}
                      </TableCell>
                      <TableCell>{a.status}</TableCell>
                      <TableCell>
                        {a.doctor?.name || a.doctor?.email || a.doctorId || "-"}
                      </TableCell>
                      <TableCell>
                        {a.patient?.name || a.patient?.email || a.patientId || "-"}
                      </TableCell>
                      <TableCell>{a.timezone}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}